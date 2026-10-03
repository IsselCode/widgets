import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, access, rename, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { compile } from '@mdx-js/mdx';
import { markdownToMdx, normalizeLink, sourceToRoute, syncDocs } from './sync-docs.mjs';

const routes = new Map([
  ['README.md', 'recursos'],
  ['guia/02-instalacion.md', 'guia/instalacion'],
  ['ejemplos/01-primera-app.md', 'ejemplos/primera-app'],
  ['referencia/README.md', 'referencia/componentes'],
]);

test('normaliza enlaces entre guías y rutas reubicadas conservando query y hash', () => {
  assert.equal(normalizeLink('02-instalacion.md#agregar-el-paquete', 'assets/guia/01-introduccion.md', routes), '/guia/instalacion#agregar-el-paquete');
  assert.equal(normalizeLink('../../../../../Desktop/issel_code_widgets/docs/ejemplos/01-primera-app.md?lang=es#arranque', 'assets/guia/01-introduccion.md', routes), '/ejemplos/primera-app?lang=es#arranque');
  assert.equal(normalizeLink('../../../../../Desktop/issel_code_widgets/docs/images/desktop-light-v4.png', 'assets/guia/01-introduccion.md', routes), '/assets/images/desktop-light-v4.png');
  assert.equal(normalizeLink('https://dart.dev/tools/pub/dependencies#git-packages', 'assets/guia/02-instalacion.md', routes), 'https://dart.dev/tools/pub/dependencies#git-packages');
  assert.equal(sourceToRoute('assets/referencia/README.md'), 'referencia/componentes');
  assert.equal(sourceToRoute('assets/referencia/widgets/issel-button.md'), 'componentes/issel-button');
  assert.equal(sourceToRoute('assets/notas/configuracion.md'), 'notas/configuracion');
});

test('rechaza Markdown desconocido y enlaces fuera de assets', () => {
  assert.throws(() => normalizeLink('../missing.md', 'assets/guia/01-introduccion.md', routes), /destino Markdown desconocido/);
  assert.throws(() => normalizeLink('../../../secrets.txt', 'assets/guia/01-introduccion.md', routes), /sale de assets/);
});

test('conserva Dart, Mermaid y código inline exactamente, escapando sólo sintaxis MDX de prosa', async () => {
  const dart = '```dart\nFuture<AppResult<String>> load() async {\n  return AppResult.success("{name}");\n}\n```';
  const mermaid = '```mermaid\nflowchart LR\n  A[Entrada] --> B{"¿Listo?"}\n```';
  const source = 'Contrato {name} con <T>. Usa `AppResult<T>` y `{value}`.\n\n' + dart + '\n\n' + mermaid + '\n\n<!-- dart-file: lib/demo.dart -->\n[Instalar](02-instalacion.md#paso)\n';
  const result = markdownToMdx(source, 'assets/guia/01-introduccion.md', routes);
  assert.ok(result.includes(dart));
  assert.ok(result.includes(mermaid));
  assert.ok(result.includes('`AppResult<T>` y `{value}`'));
  assert.ok(result.includes('Contrato &#123;name&#125; con &lt;T>.'));
  assert.ok(result.includes('[Instalar](/guia/instalacion#paso)'));
  assert.ok(!result.includes('dart-file'));
  await compile(result);
});

test('no reescribe enlaces de ejemplo dentro de código y sí reescribe imágenes', () => {
  const source = '```text\n[Ejemplo](missing.md)\n```\n\n![Escritorio](../images/desktop-light-v4.png)\n';
  const result = markdownToMdx(source, 'assets/guia/01-introduccion.md', routes);
  assert.ok(result.includes('[Ejemplo](missing.md)'));
  assert.ok(result.includes('![Escritorio](/assets/images/desktop-light-v4.png)'));
});

test('conserva enlaces automáticos y normaliza definiciones de enlaces de referencia', () => {
  const source = 'Visita <https://dart.dev>.\n\n[Instalar][setup]\n\n[setup]: 02-instalacion.md#paso "Instalación"\n';
  const result = markdownToMdx(source, 'assets/guia/01-introduccion.md', routes);
  assert.ok(result.includes('[https://dart.dev](https://dart.dev)'));
  assert.ok(result.includes('[setup]: /guia/instalacion#paso "Instalación"'));
});

test('preserva sólo anchors exactos de ID seguro fuera de código', async () => {
  const source = '<a id="introduccion"></a>\n\n[Introducción](#introduccion)\n\n<a id="unsafe" onclick="alert(1)"></a>\n\n```html\n<a id="example"></a>\n```\n';
  const result = markdownToMdx(source, 'assets/guia/01-introduccion.md', routes);
  assert.ok(result.includes('<a id="introduccion"></a>'));
  assert.ok(result.includes('&lt;a id="unsafe" onclick="alert(1)">&lt;/a>'));
  assert.ok(result.includes('```html\n<a id="example"></a>\n```'));
  await compile(result);
});

test('sync retira sólo rutas obsoletas y conserva el sitio si una fuente falla', async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'issel-docs-test-'));
  try {
    await mkdir(path.join(temporaryRoot, 'assets/guia'), { recursive: true });
    await writeFile(path.join(temporaryRoot, 'assets/README.md'), '# Recursos\n\nÍndice.\n');
    await writeFile(path.join(temporaryRoot, 'assets/guia/01-demo.md'), '# Demo\n\nCONTENIDO_ACTUAL\n');
    await writeFile(path.join(temporaryRoot, 'manual.mdx'), 'Página manual que debe conservarse.\n');
    await syncDocs(temporaryRoot);
    assert.ok((await readFile(path.join(temporaryRoot, 'guia/demo.mdx'), 'utf8')).includes('CONTENIDO_ACTUAL'));
    const beforeRename = await readFile(path.join(temporaryRoot, 'content-map.json'), 'utf8');
    await rename(path.join(temporaryRoot, 'assets/guia/01-demo.md'), path.join(temporaryRoot, 'assets/guia/01-actualizado.md'));
    await writeFile(path.join(temporaryRoot, 'assets/guia/02-roto.md'), '# Enlace roto\n\n[Desconocido](missing.md)\n');
    await assert.rejects(syncDocs(temporaryRoot), /destino Markdown desconocido/);
    await access(path.join(temporaryRoot, 'guia/demo.mdx'));
    await assert.rejects(access(path.join(temporaryRoot, 'guia/actualizado.mdx')), { code: 'ENOENT' });
    assert.equal(await readFile(path.join(temporaryRoot, 'content-map.json'), 'utf8'), beforeRename);
    await rm(path.join(temporaryRoot, 'assets/guia/02-roto.md'));
    await syncDocs(temporaryRoot);
    await assert.rejects(access(path.join(temporaryRoot, 'guia/demo.mdx')), { code: 'ENOENT' });
    await access(path.join(temporaryRoot, 'guia/actualizado.mdx'));
    assert.equal(await readFile(path.join(temporaryRoot, 'manual.mdx'), 'utf8'), 'Página manual que debe conservarse.\n');
    const manifest = JSON.parse(await readFile(path.join(temporaryRoot, 'content-map.json'), 'utf8'));
    manifest.push({ source: 'assets/unsafe.md', route: '../outside' });
    await writeFile(path.join(temporaryRoot, 'content-map.json'), JSON.stringify(manifest));
    await assert.rejects(syncDocs(temporaryRoot), /ruta generada insegura/);
  } finally {
    // Verify this recursive cleanup is confined to the exact test directory
    // created under the OS temporary directory before removing it.
    const resolved = path.resolve(temporaryRoot);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
    assert.ok(path.basename(resolved).startsWith('issel-docs-test-'));
    await rm(resolved, { recursive: true, force: true });
  }
});
