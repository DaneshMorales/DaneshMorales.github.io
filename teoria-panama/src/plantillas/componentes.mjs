// Componentes reutilizables.

import { referencias } from '../contenido/referencias.mjs';
import { intereses, tiposTrabajo } from '../contenido/temas.mjs';
import { esc, normalizar, enlaceExterno, unir } from './utilidades.mjs';
import { monograma } from './graficos.mjs';

export const boton = (href, contenido, variante = 'primario') =>
  `<a class="boton boton--${variante}" href="${href}">${contenido}</a>`;

export const enlaceFlecha = (href, contenido) =>
  `<a class="enlace-flecha" href="${href}">${contenido}<span aria-hidden="true"> →</span></a>`;

// Encabezado de página interior.
export function cabeceraPagina({ etiqueta, titulo, entrada, migas, extra = '' }) {
  return `<header class="cabecera-pagina">
  <div class="envoltura">
    ${migas ?? ''}
    ${etiqueta ? `<p class="etiqueta">${etiqueta}</p>` : ''}
    <h1>${titulo}</h1>
    ${entrada ? `<p class="entrada">${entrada}</p>` : ''}
    ${extra}
  </div>
</header>`;
}

export function migas(items) {
  return `<nav class="migas" aria-label="Ruta de navegación"><ol>${items.map(([href, t], i) =>
    i === items.length - 1 ? `<li><span aria-current="page">${t}</span></li>` : `<li><a href="${href}">${t}</a></li>`).join('')}</ol></nav>`;
}

// Etiquetas de interés y tipo de trabajo de un tema.
export function etiquetasTema(tema, { compactas = false } = {}) {
  const i = tema.intereses.map((k) => `<li class="chip chip--interes">${intereses[k]}</li>`);
  const t = tema.tipos.map((k) => `<li class="chip chip--tipo${k === 'ibm' ? ' chip--ibm' : ''}">${tiposTrabajo[k]}</li>`);
  return `<ul class="chips${compactas ? ' chips--compactas' : ''}" aria-label="Etiquetas">${[...i, ...t].join('')}</ul>`;
}

// Fila de tema para el catálogo y la portada. `datos` añade atributos de filtrado.
export function filaTema(tema, ctx, { nivel = 'h3', datos = false } = {}) {
  const atributos = datos
    ? ` data-tema data-intereses="${tema.intereses.join(' ')}" data-tipos="${tema.tipos.join(' ')}" data-texto="${esc(normalizar(unir([
      tema.titulo, tema.pregunta, tema.resumen, tema.preparacion.join(' '), tema.seAprende.join(' '),
      tema.intereses.map((k) => intereses[k]).join(' '), tema.tipos.map((k) => tiposTrabajo[k]).join(' '),
    ], ' ')))}"`
    : '';
  return `<li class="fila-tema"${atributos}>
  <span class="fila-tema__numero" aria-hidden="true">${String(tema.numero).padStart(2, '0')}</span>
  <div class="fila-tema__cuerpo">
    <${nivel} class="fila-tema__titulo"><a href="${ctx.raiz}temas/${tema.slug}/"><span class="visualmente-oculto">Tema ${tema.numero}: </span>${tema.titulo}</a></${nivel}>
    <p class="fila-tema__pregunta">${tema.pregunta}</p>
    ${etiquetasTema(tema, { compactas: true })}
    ${tema.entrada ? `<p class="fila-tema__nota">Buena entrada</p>` : ''}
  </div>
</li>`;
}

// Referencia bibliográfica.
export function referencia(clave) {
  const r = referencias[clave];
  if (!r) throw new Error(`Referencia desconocida: ${clave}`);
  const titulo = `<cite${r.idioma === 'en' ? ' lang="en"' : ''}>${r.titulo}</cite>`;
  const enlaces = unir([
    r.doi && enlaceExterno(`https://doi.org/${r.doi}`, 'DOI'),
    r.arxiv && enlaceExterno(`https://arxiv.org/abs/${r.arxiv}`, `arXiv:${r.arxiv}`),
    r.url && enlaceExterno(r.url, 'Abrir recurso'),
  ], ' · ');
  return `<li class="referencia">
  <span class="referencia__autores">${r.autores}${r.anio ? ` (${r.anio})` : ''}.</span>
  ${titulo}.
  ${r.fuente ? `<span class="referencia__fuente">${r.fuente}.</span>` : ''}
  ${r.nota ? `<span class="referencia__nota">${r.nota}</span>` : ''}
  ${enlaces ? `<span class="referencia__enlaces">${enlaces}</span>` : ''}
</li>`;
}

// Retrato: fotografía si existe, monograma si no.
export function retrato(persona, ctx) {
  if (persona.foto) {
    return `<img class="retrato" src="${ctx.raiz}${esc(persona.foto)}" alt="Fotografía de ${esc(persona.nombre)}" width="240" height="240" loading="lazy">`;
  }
  return `<span class="retrato retrato--monograma">${monograma(persona.iniciales)}</span>`;
}

// Bloque de nota.
export const nota = (contenido, { titulo = '', clase = '' } = {}) =>
  `<aside class="nota${clase ? ` ${clase}` : ''}">${titulo ? `<p class="nota__titulo">${titulo}</p>` : ''}${contenido}</aside>`;
