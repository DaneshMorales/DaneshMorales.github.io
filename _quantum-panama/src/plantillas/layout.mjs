// Documento HTML común: metadatos, cabecera con menú, pie de página.

import { sitio, navegacion } from '../contenido/sitio.mjs';
import { personas } from '../contenido/personas.mjs';
import { esc, fechaLarga } from './utilidades.mjs';
import { marca } from './graficos.mjs';

const idiomaNombre = () => (sitio.idiomaNombre ? ` lang="${esc(sitio.idiomaNombre)}"` : '');

export function documento(ctx, { titulo, descripcion, cuerpo, clase = '' }) {
  const tituloCompleto = titulo ? `${titulo} · ${sitio.nombre}` : `${sitio.nombre} · ${sitio.descriptor}`;
  const desc = descripcion || sitio.descripcion;
  const absoluta = sitio.url && ctx.ruta !== '404.html' ? `${sitio.url}${sitio.rutaBase}${ctx.ruta}` : '';
  const imagenSocial = sitio.url ? `${sitio.url}${sitio.rutaBase}img/social.png` : '';

  return `<!doctype html>
<html lang="es" class="sin-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tituloCompleto)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#f7f3eb">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_PA">
<meta property="og:site_name" content="${esc(sitio.nombre)}">
<meta property="og:title" content="${esc(titulo || sitio.nombre)}">
<meta property="og:description" content="${esc(desc)}">
${absoluta ? `<link rel="canonical" href="${esc(absoluta)}">\n<meta property="og:url" content="${esc(absoluta)}">\n` : ''}${imagenSocial ? `<meta property="og:image" content="${esc(imagenSocial)}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="Circuito cuántico sobre fondo marfil con el lema «Investigar en física y matemática desde Panamá».">\n<meta name="twitter:card" content="summary_large_image">\n` : ''}<link rel="icon" href="${ctx.raiz}img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="${ctx.raiz}img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${ctx.raiz}img/apple-touch-icon.png">
<link rel="preload" href="${ctx.raiz}fuentes/source-sans-3-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.raiz}fuentes/domitian-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ctx.raiz}css/estilos.css?v=${ctx.versiones.css}">
<script>document.documentElement.className='js'</script>
<script src="${ctx.raiz}js/sitio.js?v=${ctx.versiones.js}" defer></script>
</head>
<body class="${esc(clase)}">
<a class="saltar" href="#contenido">Saltar al contenido</a>
${cabecera(ctx)}
<main id="contenido" tabindex="-1">
${cuerpo}
</main>
${pie(ctx)}
</body>
</html>
`;
}

function cabecera(ctx) {
  const enlaces = navegacion.map(({ ruta, texto }) => {
    const exacta = ctx.ruta === ruta;
    const seccion = !exacta && ctx.ruta.startsWith(ruta);
    return `<li><a href="${ctx.raiz}${ruta}"${exacta ? ' aria-current="page"' : ''}${seccion ? ' class="activo"' : ''}>${texto}</a></li>`;
  }).join('');
  const enContacto = ctx.ruta === 'contacto/';
  return `<header class="cabecera">
  <div class="envoltura cabecera__fila">
    <a class="marca" href="${ctx.raiz}"${ctx.ruta === '' ? ' aria-current="page"' : ''}>
      ${marca()}
      <span class="marca__texto"><span class="marca__nombre"${idiomaNombre()}>${esc(sitio.nombre)}</span><span class="marca__descriptor">${esc(sitio.descriptor)}</span></span>
    </a>
    <button class="menu-boton" type="button" aria-expanded="false" aria-controls="menu-principal" data-menu-boton>
      <span class="menu-boton__icono" aria-hidden="true"></span>Menú
    </button>
    <nav id="menu-principal" class="menu" aria-label="Principal">
      <ul class="menu__lista">${enlaces}</ul>
      <a class="boton boton--pequeno menu__contacto" href="${ctx.raiz}contacto/"${enContacto ? ' aria-current="page"' : ''}>Contacto</a>
    </nav>
  </div>
</header>`;
}

function pie(ctx) {
  const columna = (titulo, items) => `<div class="pie__columna"><h2 class="pie__titulo">${titulo}</h2><ul>${items.map(([ruta, t]) => `<li><a href="${ctx.raiz}${ruta}">${t}</a></li>`).join('')}</ul></div>`;
  return `<footer class="pie">
  <div class="envoltura pie__rejilla">
    <div class="pie__marca">
      <p class="pie__nombre"${idiomaNombre()}>${esc(sitio.nombre)}</p>
      <p class="pie__descriptor">${esc(sitio.descriptor)}</p>
      <p>${esc(sitio.presentacion)}</p>
    </div>
    <nav class="pie__nav" aria-label="Pie de página">
      ${columna('Explorar', [['temas/', 'Temas de tesis'], ['recursos/', 'Recursos'], ['charla/', 'La charla']])}
      ${columna('Participar', [['mentoria/', 'Mentoría'], ['preguntas/', 'Preguntas frecuentes'], ['contacto/', 'Contacto']])}
      ${columna('La iniciativa', [['vision/', 'Visión'], ['equipo/', 'Quiénes somos']])}
    </nav>
    <div class="pie__columna">
      <h2 class="pie__titulo">Escríbenos</h2>
      <ul>${personas.map((p) => `<li><a href="mailto:${esc(p.correo)}">${esc(p.correo)}</a></li>`).join('')}</ul>
    </div>
  </div>
  <div class="envoltura pie__legal">
    <p>Las afiliaciones mencionadas describen a las personas y no implican patrocinio institucional.</p>
    <p>Contenido revisado el ${fechaLarga(sitio.revisado)}.</p>
  </div>
</footer>`;
}
