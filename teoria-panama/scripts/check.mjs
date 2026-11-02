// Comprueba el sitio compilado en dist/. Uso:
//   node scripts/check.mjs              enlaces internos, anclas y metadatos
//   node scripts/check.mjs --externos   además, comprueba los enlaces externos

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(RAIZ, 'dist');
const externos = process.argv.includes('--externos');

async function htmlEn(dir) {
  const salida = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) salida.push(...await htmlEn(p));
    else if (e.name.endsWith('.html')) salida.push(p);
  }
  return salida;
}

const existe = (p) => stat(p).then(() => true, () => false);
const atributos = (html, nombre) => [...html.matchAll(new RegExp(`\\s${nombre}="([^"]*)"`, 'g'))].map((m) => m[1].replaceAll('&amp;', '&'));
const ids = (html) => new Set(atributos(html, 'id'));

const errores = [];
const avisos = [];
const titulos = new Map();
const urlsExternas = new Map();
const paginas = await htmlEn(DIST);
const cache = new Map();
const leer = async (p) => { if (!cache.has(p)) cache.set(p, await readFile(p, 'utf8')); return cache.get(p); };

for (const archivo of paginas) {
  const rel = path.relative(DIST, archivo);
  const html = await leer(archivo);
  const es404 = rel === '404.html';

  // Metadatos básicos
  const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!titulo) errores.push(`${rel}: falta <title>`);
  else if (titulos.has(titulo)) errores.push(`${rel}: título repetido con ${titulos.get(titulo)}`);
  else titulos.set(titulo, rel);
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) errores.push(`${rel}: falta una meta descripción suficiente`);
  if (!/<html lang="es"/.test(html)) errores.push(`${rel}: falta lang="es"`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errores.push(`${rel}: tiene ${h1} elementos <h1>`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\salt="/.test(img)) errores.push(`${rel}: imagen sin alt`);
  for (const id of atributos(html, 'id')) if (html.split(`id="${id}"`).length > 2) errores.push(`${rel}: id repetido «${id}»`);
  if (/<button\b(?![^>]*type=)/.test(html)) errores.push(`${rel}: <button> sin type`);

  // Enlaces y recursos
  const refs = [...atributos(html, 'href'), ...atributos(html, 'src')];
  for (const ref of refs) {
    if (/^(mailto:|tel:|data:)/.test(ref)) continue;
    if (/^https?:\/\//.test(ref)) { if (!urlsExternas.has(ref)) urlsExternas.set(ref, rel); continue; }
    if (es404) continue; // usa rutas absolutas desde la ruta base; se comprueba al publicar
    const [sinAncla, ancla] = ref.split('#');
    const limpio = sinAncla.split('?')[0];
    let destino = limpio ? path.resolve(path.dirname(archivo), limpio) : archivo;
    if (limpio.endsWith('/') || (await existe(destino) && (await stat(destino)).isDirectory())) destino = path.join(destino, 'index.html');
    if (!destino.startsWith(DIST)) { errores.push(`${rel}: enlace fuera del sitio «${ref}»`); continue; }
    if (!await existe(destino)) { errores.push(`${rel}: enlace roto «${ref}»`); continue; }
    if (ancla && destino.endsWith('.html') && !ids(await leer(destino)).has(ancla)) errores.push(`${rel}: ancla inexistente «${ref}»`);
  }
}

if (externos) {
  console.log(`Comprobando ${urlsExternas.size} enlaces externos…`);
  const agente = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
  const comprobar = async ([url, origen]) => {
    for (const metodo of ['HEAD', 'GET']) {
      try {
        const r = await fetch(url, { method: metodo, redirect: 'follow', headers: { 'User-Agent': agente }, signal: AbortSignal.timeout(20000) });
        if (r.ok) return;
        if (metodo === 'GET') {
          // Algunos sitios bloquean peticiones automáticas (403/429) aunque funcionen en el navegador.
          (r.status === 403 || r.status === 429 ? avisos : errores).push(`${origen}: ${url} respondió ${r.status}`);
        }
      } catch (e) {
        if (metodo === 'GET') errores.push(`${origen}: ${url} no respondió (${e.cause?.code || e.name})`);
      }
    }
  };
  const cola = [...urlsExternas];
  await Promise.all(Array.from({ length: 6 }, async () => { while (cola.length) await comprobar(cola.shift()); }));
}

for (const a of avisos) console.warn(`Aviso: ${a}`);
if (errores.length) {
  console.error(`\n${errores.length} problema(s):\n  - ${errores.join('\n  - ')}`);
  process.exit(1);
}
console.log(`Correcto: ${paginas.length} páginas revisadas${externos ? `, ${urlsExternas.size} enlaces externos` : ''}.`);
