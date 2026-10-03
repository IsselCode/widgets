import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const posix = path.posix;
const metadata = {
  recursos: ['Recursos', 'Explora las guías, los ejemplos y la referencia de Issel Code Widgets.'],
  'guia/introduccion': ['Introducción', 'Conoce el paquete Flutter, la skill y cómo se complementan.'],
  'guia/instalacion': ['Instalación', 'Agrega el paquete, elige los imports y prepara la skill.'],
  'guia/uso-de-la-skill': ['Usar la skill', 'Describe interfaces y aprende el flujo de implementación con la skill.'],
  'guia/arquitectura': ['Arquitectura', 'Organiza features, presentación MVVM, dominio y datos.'],
  'guia/tema-y-configuracion': ['Tema y configuración', 'Configura paletas, tipografía, superficies y apariencia.'],
  'guia/navegacion': ['Navegación', 'Gestiona rutas, resultados tipados y retroceso.'],
  'guia/escritorio': ['Escritorio', 'Compón caption, menú y breadcrumbs con adaptación móvil.'],
  'guia/formularios-y-estados': ['Formularios y estados', 'Integra validación, selección, carga, errores y guardado.'],
  'guia/preguntas-frecuentes': ['Preguntas frecuentes', 'Resuelve problemas de instalación, layout, estado y navegación.'],
  'ejemplos/primera-app': ['Primera app', 'Construye una aplicación con configuración mutable, tema y controles Issel.'],
  'ejemplos/formulario-clientes': ['Formulario de clientes', 'Conecta entidad, repositorio, controlador y formulario en una feature completa.'],
  'ejemplos/componentes-reutilizables': ['Componentes reutilizables', 'Compón superficies, estados, búsqueda, tablas y acciones de guardado.'],
  'ejemplos/recetas': ['Recetas de integración', 'Integra imágenes, assets, fuentes, búsqueda remota y diálogos.'],
  'referencia/componentes': ['Componentes', 'Encuentra el constructor, las propiedades y los límites de cada componente.'],
  'referencia/api-transversal': ['API transversal', 'Consulta las APIs públicas de app, tema, navegación, escritorio y core.'],
};

export async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(absolute) : [absolute];
  }));
  return nested.flat().sort();
}

export function sourceToRoute(source) {
  const relative = source.replaceAll('\\', '/').replace(/^assets\//, '');
  if (relative === 'README.md') return 'recursos';
  if (relative === 'referencia/README.md') return 'referencia/componentes';
  if (/^(guia|ejemplos)\/[^/]+\.md$/.test(relative)) {
    return relative.replace(/\/(?:\d+-)/, '/').replace(/\.md$/, '');
  }
  if (/^referencia\/widgets\/[^/]+\.md$/.test(relative)) return relative.replace(/^referencia\/widgets\//, 'componentes/').replace(/\.md$/, '');
  if (/\.md$/.test(relative)) return relative.replace(/\.md$/, '');
  throw new Error(`No hay una ruta configurada para ${source}`);
}

function splitSuffix(href) {
  const index = href.search(/[?#]/);
  return index === -1 ? [href, ''] : [href.slice(0, index), href.slice(index)];
}

export function normalizeLink(href, source, routes) {
  if (!href || href.startsWith('#') || href.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(href)) return href;
  const [pathname, suffix] = splitSuffix(href);
  let target;
  let decoded;
  try { decoded = decodeURIComponent(pathname).replaceAll('\\', '/'); }
  catch { throw new Error(`${source}: enlace con codificación inválida: ${href}`); }
  const relocated = decoded.match(/(?:^|\/)Desktop\/issel_code_widgets\/docs\/(.*)$/i);
  const sourceRelative = source.replaceAll('\\', '/').replace(/^assets\//, '');
  if (relocated) target = relocated[1];
  else if (decoded.startsWith('/assets/')) target = decoded.slice('/assets/'.length);
  else if (decoded.startsWith('/')) target = decoded.slice(1);
  else target = posix.join(posix.dirname(sourceRelative), decoded);
  target = posix.normalize(target).replace(/^\.\//, '');
  if (target === '..' || target.startsWith('../') || target.startsWith('/') || target.includes('\0')) {
    throw new Error(`${source}: el enlace sale de assets: ${href}`);
  }
  const route = routes.get(target) ?? routes.get(`assets/${target}`);
  if (route) return `/${route}${suffix}`;
  if (/\.mdx?$/i.test(target)) throw new Error(`${source}: destino Markdown desconocido: ${href} (${target})`);
  const existingRoute = [...routes.values()].find((value) => value === target);
  if (existingRoute) return `/${existingRoute}${suffix}`;
  return `/assets/${target}${suffix}`;
}

function protectCode(markdown) {
  const protectedTokens = [];
  marked.walkTokens(marked.lexer(markdown), (token) => {
    if (token.type === 'code' || token.type === 'codespan') protectedTokens.push(token.raw);
  });
  // Protect whole blocks before inline spans, including any apparent links or braces in Dart.
  const snippets = [];
  let text = markdown;
  for (const raw of [...new Set(protectedTokens)].sort((a, b) => b.length - a.length)) {
    if (!text.includes(raw)) continue;
    const key = `\uE000ISSEL_CODE_${snippets.length}\uE001`;
    snippets.push([key, raw]);
    text = text.split(raw).join(key);
  }
  return { text, restore: (value) => snippets.reduce((result, [key, raw]) => result.split(key).join(raw), value) };
}

export function withoutMarkdownCode(markdown) {
  return protectCode(markdown).text;
}

function rewriteParsedLinks(markdown, source, routes) {
  const replacements = new Map();
  marked.walkTokens(marked.lexer(markdown), (token) => {
    if (token.type !== 'link' && token.type !== 'image' && token.type !== 'def') return;
    const href = normalizeLink(token.href, source, routes);
    if (token.type === 'link' && token.raw.startsWith('<') && token.raw.endsWith('>')) {
      replacements.set(token.raw, `[${token.text}](${href})`);
      return;
    }
    if (href === token.href) return;
    let updated;
    if (token.type === 'def') {
      updated = token.raw.replace(/(^\s*\[[^\]]+\]:\s*<?)([^\s>]+)/, (_, prefix) => `${prefix}${href}`);
    } else {
      const destination = token.raw.indexOf('](');
      // Reference-style links are resolved through their definition instead.
      if (destination === -1) return;
      const index = token.raw.indexOf(token.href, destination + 2);
      if (index === -1) throw new Error(`${source}: no se pudo reescribir el enlace ${token.raw}`);
      updated = token.raw.slice(0, index) + href + token.raw.slice(index + token.href.length);
    }
    replacements.set(token.raw, updated);
  });
  // Longest first prevents nested image links from being rewritten twice.
  let result = markdown;
  for (const [before, after] of [...replacements].sort(([a], [b]) => b.length - a.length)) {
    result = result.split(before).join(after);
  }
  // Marked resolves reference links through tokens.links; their definitions are not walked.
  result = result.replace(/^( {0,3}\[[^\]\n]+\]:[ \t]*<?)([^ \t\n>]+)(>?)/gm,
    (_, prefix, href, closing) => `${prefix}${normalizeLink(href, source, routes)}${closing}`);
  return result;
}

export function markdownToMdx(markdown, source, routes) {
  const protectedCode = protectCode(markdown.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n'));
  let body = rewriteParsedLinks(protectedCode.text, source, routes);
  body = body.replace(/<!--[^]*?-->/g, '');
  const anchors = [];
  body = body.replace(/<a id="([A-Za-z][A-Za-z0-9_-]*)"><\/a>/g, (anchor) => {
    const key = `\uE000ISSEL_ANCHOR_${anchors.length}\uE001`;
    anchors.push([key, anchor]);
    return key;
  });
  body = body.replaceAll('<', '&lt;').replaceAll('{', '&#123;').replaceAll('}', '&#125;');
  for (const [key, anchor] of anchors) body = body.split(key).join(anchor);
  return protectedCode.restore(body).trimEnd() + '\n';
}

function generatedDestination(root, route) {
  if (typeof route !== 'string' || !route || route.startsWith('/') || /[\\:\0?#]/.test(route)
      || route !== posix.normalize(route) || route.split('/').some((segment) => segment === '..' || segment === '.')) {
    throw new Error(`content-map.json: ruta generada insegura: ${String(route)}`);
  }
  const destination = path.resolve(root, `${route}.mdx`);
  const relative = path.relative(path.resolve(root), destination);
  if (relative.startsWith(`..${path.sep}`) || relative === '..' || path.isAbsolute(relative)) {
    throw new Error(`content-map.json: la ruta sale del proyecto: ${route}`);
  }
  return destination;
}

function plainText(value) {
  return value.replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\s+/g, ' ').trim();
}

function pageMetadata(markdown, source, route) {
  const tokens = marked.lexer(markdown);
  const heading = tokens.find((token) => token.type === 'heading' && token.depth === 1);
  if (!heading) throw new Error(`${source}: falta un título H1`);
  const title = plainText(heading.text);
  const paragraph = tokens.find((token) => token.type === 'paragraph');
  const [sidebarTitle, configuredDescription] = metadata[route] ?? [title];
  const summary = plainText(paragraph?.text ?? `Referencia de ${title}.`);
  const description = configuredDescription ?? (summary.length <= 190 ? summary : `${summary.slice(0, 187).trimEnd()}…`);
  const categoryMatch = route.startsWith('componentes/') ? markdown.match(/\*\*Categoría:\*\*\s*([^.*]+)\.?/) : null;
  const category = categoryMatch?.[1].trim() ?? (route === 'componentes/gradient-border-painter' ? 'Utilidades' : undefined);
  return {
    record: { source, route, title, description, sidebarTitle, ...(category ? { category } : {}) },
    body: markdown.replace(heading.raw, ''),
  };
}

export async function syncDocs(root = projectRoot) {
  const files = (await listFiles(path.join(root, 'assets'))).filter((file) => file.endsWith('.md'));
  const pages = await Promise.all(files.map(async (file) => {
    const source = path.relative(root, file).replaceAll('\\', '/');
    const route = sourceToRoute(source);
    const markdown = (await readFile(file, 'utf8')).replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
    return pageMetadata(markdown, source, route);
  }));
  const routes = new Map(pages.map(({ record }) => [record.source.replace(/^assets\//, ''), record.route]));
  if (new Set(routes.values()).size !== pages.length) throw new Error('Dos documentos tienen la misma ruta de salida.');
  // Transform every document before writing so an unknown link cannot leave a partial import.
  const processedPages = pages.map(({ record, body }) => ({ record, body: markdownToMdx(body.trimStart(), record.source, routes) }));
  const outputs = processedPages.map(({ record, body }) => {
    const frontmatter = ['title', 'description', 'sidebarTitle'].map((key) => `${key}: ${JSON.stringify(record[key])}`).join('\n');
    return { record, mdx: `---\n${frontmatter}\n---\n\n${body}` };
  });
  let previousManifest = [];
  try { previousManifest = JSON.parse(await readFile(path.join(root, 'content-map.json'), 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (!Array.isArray(previousManifest)) throw new Error('content-map.json: se esperaba una lista de documentos generados.');
  // Validate every previous ownership record before writing or removing anything.
  const currentRoutes = new Set(outputs.map(({ record }) => record.route));
  const staleFiles = previousManifest.map(({ route }) => ({ route, file: generatedDestination(root, route) }))
    .filter(({ route }) => !currentRoutes.has(route));
  for (const { record, mdx } of outputs) {
    const destination = generatedDestination(root, record.route);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, mdx, 'utf8');
  }
  // The previous manifest establishes generated ownership. Never scan or remove
  // unrecorded MDX files, and unlink stale files individually without recursion.
  for (const { file } of staleFiles) {
    try { await unlink(file); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  const manifest = outputs.map(({ record }) => record).sort((a, b) => a.route.localeCompare(b.route, 'es'));
  await writeFile(path.join(root, 'content-map.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const manifest = await syncDocs();
    console.log(`Importados ${manifest.length} documentos Markdown desde assets/.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
