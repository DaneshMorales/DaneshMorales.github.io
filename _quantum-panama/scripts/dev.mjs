// Servidor local con recompilación automática. Uso: node scripts/dev.mjs
// Abre http://localhost:4321 (cambia el puerto con PUERTO=8080).

import http from 'node:http';
import { spawnSync } from 'node:child_process';
import { watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(RAIZ, 'dist');
const PUERTO = Number(process.env.PUERTO || process.env.PORT || 4321);

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};

function compilar() {
  // Se compila en un proceso aparte para que los cambios en los módulos de contenido se lean de nuevo.
  const r = spawnSync(process.execPath, [path.join(RAIZ, 'scripts', 'build.mjs')], { stdio: 'inherit', env: { ...process.env, RUTA_BASE: '/', SALIDA: 'dist' } });
  return r.status === 0;
}

compilar();

let pendiente;
watch(path.join(RAIZ, 'src'), { recursive: true }, () => {
  clearTimeout(pendiente);
  pendiente = setTimeout(() => { console.log('Cambios detectados, recompilando…'); compilar(); }, 150);
});

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let ruta = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let archivo = path.join(DIST, ruta);
  if (!archivo.startsWith(DIST)) { res.writeHead(403).end(); return; }
  try {
    const info = await stat(archivo);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith('/')) { res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end(); return; }
      archivo = path.join(archivo, 'index.html');
    }
    const cuerpo = await readFile(archivo);
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(cuerpo);
  } catch {
    const cuerpo = await readFile(path.join(DIST, '404.html')).catch(() => 'No encontrado');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(cuerpo);
  }
}).listen(PUERTO, () => {
  console.log(`\nSitio disponible en http://localhost:${PUERTO}/  (Ctrl+C para detener)\n`);
});
