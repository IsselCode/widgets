import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const distances = [Math.abs(estimate - left), Math.abs(estimate - above), Math.abs(estimate - upperLeft)];
  return distances[0] <= distances[1] && distances[0] <= distances[2] ? left
    : distances[1] <= distances[2] ? above : upperLeft;
}

// Read the alpha channel of the supplied 8-bit RGBA PNGs. The original PNG bytes
// remain untouched; only the enclosing SVG viewport changes their presentation.
export function emblemBounds(png) {
  if (!png.subarray(0, 8).equals(pngSignature)) throw new Error('El recurso de marca debe ser PNG.');
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  if (png[24] !== 8 || png[25] !== 6 || png[28] !== 0) {
    throw new Error('Los recursos de marca requieren PNG RGBA de 8 bits sin interlace.');
  }
  const chunks = [];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    const type = png.toString('ascii', offset + 4, offset + 8);
    if (type === 'IDAT') chunks.push(png.subarray(offset + 8, offset + 8 + length));
    offset += length + 12;
  }
  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const filtered = inflateSync(Buffer.concat(chunks));
  if (filtered.length !== (stride + 1) * height) throw new Error('El PNG de marca contiene dimensiones inesperadas.');
  let previous = Buffer.alloc(stride);
  let firstRow = -1;
  let lastRow = -1;
  let leftEdge = width;
  let rightEdge = -1;
  for (let y = 0; y < height; y++) {
    const offset = y * (stride + 1);
    const filter = filtered[offset];
    const row = Buffer.allocUnsafe(stride);
    for (let index = 0; index < stride; index++) {
      const left = index >= bytesPerPixel ? row[index - bytesPerPixel] : 0;
      const above = previous[index];
      const upperLeft = index >= bytesPerPixel ? previous[index - bytesPerPixel] : 0;
      let prediction;
      switch (filter) {
        case 0: prediction = 0; break;
        case 1: prediction = left; break;
        case 2: prediction = above; break;
        case 3: prediction = Math.floor((left + above) / 2); break;
        case 4: prediction = paeth(left, above, upperLeft); break;
        default: throw new Error(`Filtro PNG desconocido: ${filter}`);
      }
      row[index] = (filtered[offset + 1 + index] + prediction) & 255;
    }
    let rowLeft = width;
    let rowRight = -1;
    for (let x = 0; x < width; x++) {
      if (row[x * bytesPerPixel + 3] === 0) continue;
      rowLeft = Math.min(rowLeft, x);
      rowRight = Math.max(rowRight, x);
    }
    if (rowRight >= 0) {
      if (firstRow === -1) firstRow = y;
      lastRow = y;
      leftEdge = Math.min(leftEdge, rowLeft);
      rightEdge = Math.max(rightEdge, rowRight);
    } else if (firstRow !== -1) {
      // The first continuous painted region is the emblem; the supplied white
      // resource also includes a separate wordmark below it.
      break;
    }
    previous = row;
  }
  if (firstRow === -1) throw new Error('El PNG de marca no tiene un emblema visible.');
  const x = Math.max(0, leftEdge - 1);
  const y = Math.max(0, firstRow - 1);
  const cropWidth = Math.min(width - x, rightEdge - x + 2);
  const cropHeight = Math.min(height - y, lastRow - y + 2);
  return { width, height, viewBox: `${x} ${y} ${cropWidth} ${cropHeight}` };
}

function imageElement(png, bounds) {
  return `<image width="${bounds.width}" height="${bounds.height}" href="data:image/png;base64,${png.toString('base64')}" />`;
}

export function validateBrandSvg(svg) {
  if (/<script\b|\bon\w+\s*=|<!DOCTYPE|<!ENTITY/i.test(svg)) throw new Error('El SVG de marca contiene contenido activo.');
  const references = [...svg.matchAll(/\b(?:href|src)\s*=\s*"([^"]+)"/g)];
  if (references.length !== 1 || !/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(references[0][1])) {
    throw new Error('El SVG de marca debe contener exactamente un PNG embebido y ninguna referencia externa.');
  }
  if (/url\s*\(|@import/i.test(svg)) throw new Error('El SVG de marca contiene una referencia de estilos externa.');
  return true;
}

function navbarLogo(png, bounds, dark) {
  const titleColor = dark ? '#F6F8FA' : '#0F172A';
  const labelColor = dark ? '#A8B3C7' : '#64748B';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="205" height="36" viewBox="0 0 205 36" role="img" aria-labelledby="brand-title">
  <title id="brand-title">Issel Code Docs</title>
  <svg x="0" y="0" width="36" height="36" viewBox="${bounds.viewBox}" preserveAspectRatio="xMidYMid meet">
    ${imageElement(png, bounds)}
  </svg>
  <text x="46" y="25" fill="${titleColor}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="20" font-weight="650" letter-spacing="-0.5">Issel Code</text>
  <text x="160" y="24" fill="${labelColor}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="13" font-weight="500">Docs</text>
</svg>
`;
}

export async function prepareBrand(project = root) {
  const lightPng = await readFile(path.join(project, 'assets/logos/issel_logo_2.png'));
  const darkPng = await readFile(path.join(project, 'assets/logos/png_blanco.png'));
  const lightBounds = emblemBounds(lightPng);
  const darkBounds = emblemBounds(darkPng);
  const outputs = [
    ['logo/light.svg', navbarLogo(lightPng, lightBounds, false)],
    ['logo/dark.svg', navbarLogo(darkPng, darkBounds, true)],
    ['favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="${lightBounds.viewBox}" role="img" aria-labelledby="favicon-title">
  <title id="favicon-title">Issel Code</title>
  ${imageElement(lightPng, lightBounds)}
</svg>
`],
  ];
  for (const [, svg] of outputs) validateBrandSvg(svg);
  await mkdir(path.join(project, 'logo'), { recursive: true });
  for (const [filename, svg] of outputs) await writeFile(path.join(project, filename), svg, 'utf8');
  return { files: outputs.map(([filename]) => filename), lightBounds, darkBounds };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await prepareBrand();
    console.log(`Marca preparada: ${result.files.join(', ')}. PNGs embebidos sin referencias externas.`);
    console.log(`ViewBox claro: ${result.lightBounds.viewBox}; oscuro: ${result.darkBounds.viewBox}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
