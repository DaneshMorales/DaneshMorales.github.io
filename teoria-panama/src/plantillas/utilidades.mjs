// Funciones auxiliares compartidas por las plantillas.

const ENTIDADES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

// Escapa texto para usarlo dentro de HTML o de un atributo.
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ENTIDADES[c]);

// Quita etiquetas HTML (para títulos, descripciones y búsqueda).
export const texto = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// Texto en minúsculas y sin tildes, para la búsqueda del catálogo.
export const normalizar = (s) => texto(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const formatoFecha = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const fechaLarga = (iso) => formatoFecha.format(new Date(`${iso}T00:00:00Z`));

// Une fragmentos de HTML, ignorando los vacíos.
export const unir = (partes, sep = '') => partes.filter(Boolean).join(sep);

// Sustituye {{raiz}} en textos de contenido por la ruta a la raíz del sitio.
export const conRaiz = (html, ctx) => String(html ?? '').replaceAll('{{raiz}}', ctx.raiz);

// Párrafos a partir de un texto o una lista de textos.
export const parrafos = (valor, ctx) => [].concat(valor ?? []).map((p) => `<p>${conRaiz(p, ctx)}</p>`).join('');

// Enlace externo: abre en la misma pestaña (decisión del lector) y avisa del idioma si se indica.
export const enlaceExterno = (url, contenido, { clase = '', lang = '' } = {}) =>
  `<a href="${esc(url)}"${clase ? ` class="${clase}"` : ''}${lang ? ` hreflang="${lang}"` : ''} rel="noopener">${contenido}</a>`;

export const tamanoArchivo = (bytes) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
};

export const minutos = (segundos) => {
  const m = Math.floor(segundos / 60), s = segundos % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
