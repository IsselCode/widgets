import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { compile } from '@mdx-js/mdx';
import { listFiles, projectRoot, withoutMarkdownCode } from './sync-docs.mjs';

export function navigationPages(value) {
  if (!value || typeof value !== 'object') return [];
  const result = [];
  if (Array.isArray(value.pages)) {
    for (const entry of value.pages) {
      if (typeof entry === 'string') result.push(entry);
      else result.push(...navigationPages(entry));
    }
  }
  for (const [key, child] of Object.entries(value)) {
    if (key === 'pages') continue;
    if (Array.isArray(child)) child.forEach((entry) => result.push(...navigationPages(entry)));
    else if (child && typeof child === 'object') result.push(...navigationPages(child));
  }
  return result;
}

export async function checkDocs(root = projectRoot) {
  const files = (await listFiles(root)).filter((file) => file.endsWith('.mdx'));
  const routes = new Set(files.map((file) => path.relative(root, file).replaceAll('\\', '/').replace(/\.mdx$/, '')));
  const errors = [];
  const config = JSON.parse(await readFile(path.join(root, 'docs.json'), 'utf8'));
  const validateTarget = async (href, source) => {
    if (!href || href.startsWith('#') || href.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(href)) return;
    let target;
    try { target = decodeURIComponent(href.split(/[?#]/)[0]).replaceAll('\\', '/'); }
    catch { errors.push(`${source}: enlace inválido ${href}`); return; }
    if (target.split('/').includes('..')) { errors.push(`${source}: enlace con traversal ${href}`); return; }
    if (!target.startsWith('/')) { errors.push(`${source}: usa una ruta raíz para ${href}`); return; }
    target = target.slice(1);
    if (routes.has(target.replace(/\.mdx?$/, ''))) return;
    try { await access(path.join(root, target)); }
    catch { errors.push(`${source}: destino inexistente ${href}`); }
  };
  for (const page of navigationPages(config.navigation)) {
    if (!routes.has(page.replace(/^\//, '').replace(/\.mdx$/, ''))) errors.push(`docs.json: página inexistente ${page}`);
  }
  for (const file of files) {
    const relative = path.relative(root, file).replaceAll('\\', '/');
    const content = await readFile(file, 'utf8');
    const frontmatter = content.match(/^---\n([^]*?)\n---\n/);
    if (!frontmatter || !/^title:\s*\S/m.test(frontmatter[1]) || !/^description:\s*\S/m.test(frontmatter[1])) {
      errors.push(`${relative}: falta frontmatter con title y description`);
    }
    const body = content.replace(/^---\n[^]*?\n---\n/, '');
    try { await compile(body, { development: false }); }
    catch (error) { errors.push(`${relative}: MDX inválido: ${error.message}`); }
    const hrefs = new Set();
    marked.walkTokens(marked.lexer(body), (token) => {
      if (token.type === 'link' || token.type === 'image') hrefs.add(token.href);
    });
    const prose = withoutMarkdownCode(body);
    for (const match of prose.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/g)) hrefs.add(match[1]);
    for (const href of hrefs) await validateTarget(href, relative);
  }
  // Validate brand assets and other declarative href/src values in site configuration.
  const configLinks = [];
  const visitConfig = (value, key = '') => {
    if (typeof value === 'string' && ['href', 'src', 'favicon', 'light', 'dark'].includes(key) && value.startsWith('/')) configLinks.push(value);
    else if (Array.isArray(value)) value.forEach((child) => visitConfig(child));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, child]) => visitConfig(child, childKey));
  };
  visitConfig(config);
  for (const href of new Set(configLinks)) await validateTarget(href, 'docs.json');
  if (errors.length) throw new Error(errors.join('\n'));
  return { pages: files.length, navigation: new Set(navigationPages(config.navigation)).size };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await checkDocs();
    console.log(`MDX y enlaces válidos: ${result.pages} páginas, ${result.navigation} destinos de navegación.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
