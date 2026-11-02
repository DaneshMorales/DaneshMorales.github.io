// Compila el sitio en dist/. Uso: node scripts/build.mjs
// Sin dependencias: solo Node.js 18 o posterior.

import { mkdir, writeFile, rm, cp, readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { sitio } from '../src/contenido/sitio.mjs';
import { temas, intereses, tiposTrabajo, productos, destacados } from '../src/contenido/temas.mjs';
import { referencias } from '../src/contenido/referencias.mjs';
import { personas } from '../src/contenido/personas.mjs';
import { vision } from '../src/contenido/vision.mjs';
import { charla } from '../src/contenido/charla.mjs';
import { documento } from '../src/plantillas/layout.mjs';
import * as inicio from '../src/plantillas/paginas/inicio.mjs';
import * as visionPagina from '../src/plantillas/paginas/vision.mjs';
import * as equipo from '../src/plantillas/paginas/equipo.mjs';
import * as mentoria from '../src/plantillas/paginas/mentoria.mjs';
import { catalogo, fichas } from '../src/plantillas/paginas/temas.mjs';
import * as recursos from '../src/plantillas/paginas/recursos.mjs';
import * as charlaPagina from '../src/plantillas/paginas/charla.mjs';
import * as preguntas from '../src/plantillas/paginas/preguntas.mjs';
import * as contacto from '../src/plantillas/paginas/contacto.mjs';
import * as error404 from '../src/plantillas/paginas/error404.mjs';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ESTATICO = path.join(RAIZ, 'src', 'estatico');
const DIST = path.join(RAIZ, 'dist');

const paginas = [inicio, visionPagina, equipo, mentoria, catalogo, ...fichas, recursos, charlaPagina, preguntas, contacto, error404];

// --- Validación del contenido -------------------------------------------
function validar() {
  const errores = [];
  const slugs = new Set();
  for (const t of temas) {
    if (slugs.has(t.slug)) errores.push(`Slug repetido: ${t.slug}`);
    slugs.add(t.slug);
    if (!/^[a-z0-9-]+$/.test(t.slug)) errores.push(`Slug no válido: ${t.slug}`);
    for (const campo of ['titulo', 'pregunta', 'resumen', 'trabajo', 'producto', 'perfil']) {
      if (!t[campo]) errores.push(`Tema ${t.slug}: falta «${campo}»`);
    }
    for (const campo of ['alcance', 'productos', 'preparacion', 'seAprende', 'intereses', 'tipos', 'referencias']) {
      if (!t[campo]?.length) errores.push(`Tema ${t.slug}: «${campo}» está vacío`);
    }
    t.intereses.forEach((k) => intereses[k] || errores.push(`Tema ${t.slug}: interés desconocido «${k}»`));
    t.tipos.forEach((k) => tiposTrabajo[k] || errores.push(`Tema ${t.slug}: tipo desconocido «${k}»`));
    t.productos.forEach((k) => productos[k] || errores.push(`Tema ${t.slug}: producto desconocido «${k}»`));
    t.referencias.forEach((k) => referencias[k] || errores.push(`Tema ${t.slug}: referencia desconocida «${k}»`));
    if (t.tipos.includes('ibm') && !t.ibm) errores.push(`Tema ${t.slug}: contempla IBM pero no tiene nota «ibm»`);
  }
  destacados.forEach((s) => slugs.has(s) || errores.push(`Tema destacado desconocido: ${s}`));
  personas.forEach((p) => p.temas.forEach((s) => slugs.has(s) || errores.push(`${p.nombre}: tema desconocido «${s}»`)));
  vision.areas.lista.forEach((a) => a.referencias.forEach((k) => referencias[k] || errores.push(`Área ${a.id}: referencia desconocida «${k}»`)));
  if (errores.length) {
    console.error(`El contenido tiene ${errores.length} error(es):\n  - ${errores.join('\n  - ')}`);
    process.exit(1);
  }
}

// --- Utilidades ------------------------------------------------------------
const huella = async (archivo) => createHash('sha256').update(await readFile(archivo)).digest('hex').slice(0, 10);

async function archivosEn(dir, base = dir) {
  const salida = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) salida.push(...await archivosEn(p, base));
    else if (!e.name.startsWith('.')) salida.push(path.relative(base, p).split(path.sep).join('/'));
  }
  return salida;
}

function raizRelativa(ruta) {
  const profundidad = ruta.split('/').filter(Boolean).length;
  return profundidad ? '../'.repeat(profundidad) : './';
}

// --- Compilación -------------------------------------------------------------
async function construir() {
  validar();
  const rutaBase = process.env.RUTA_BASE || sitio.rutaBase || '/';
  if (!rutaBase.startsWith('/') || !rutaBase.endsWith('/')) {
    console.error(`La ruta base debe empezar y terminar en «/»: ${rutaBase}`);
    process.exit(1);
  }
  sitio.rutaBase = rutaBase;

  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  await cp(ESTATICO, DIST, { recursive: true, filter: (src) => !path.basename(src).startsWith('.') });
  await writeFile(path.join(DIST, '.nojekyll'), '');

  // Materiales disponibles (para mostrar solo descargas que existen).
  const materiales = new Map();
  for (const rel of await archivosEn(path.join(ESTATICO, 'materiales'), ESTATICO).catch(() => [])) {
    materiales.set(rel, (await stat(path.join(ESTATICO, rel))).size);
  }
  for (const m of charla.materiales) {
    if (!materiales.has(m.archivo)) console.warn(`Aviso: falta src/estatico/${m.archivo}; se omite su enlace de descarga.`);
  }

  const versiones = {
    css: await huella(path.join(ESTATICO, 'css', 'estilos.css')),
    js: await huella(path.join(ESTATICO, 'js', 'sitio.js')),
  };
  const fechaCompilacion = new Date().toISOString().slice(0, 10);

  const rutas = [];
  for (const pagina of paginas) {
    const es404 = pagina.ruta === '404.html';
    const ctx = {
      ruta: pagina.ruta,
      raiz: es404 ? rutaBase : raizRelativa(pagina.ruta),
      versiones, materiales, fechaCompilacion,
    };
    const html = documento(ctx, pagina.render(ctx));
    const destino = es404 ? path.join(DIST, '404.html') : path.join(DIST, pagina.ruta, 'index.html');
    await mkdir(path.dirname(destino), { recursive: true });
    await writeFile(destino, html);
    if (!es404) rutas.push(pagina.ruta);
  }

  // robots.txt y sitemap.xml solo con dominio definitivo.
  if (sitio.url) {
    const base = `${sitio.url}${rutaBase}`;
    await writeFile(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rutas.map((r) => `  <url><loc>${base}${r}</loc></url>`).join('\n')}\n</urlset>\n`);
    await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
  }

  console.log(`Sitio compilado en dist/: ${rutas.length} páginas y 404.html (ruta base «${rutaBase}»).`);
}

await construir();
