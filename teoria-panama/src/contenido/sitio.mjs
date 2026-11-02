// Configuración general del sitio.
// Cambia aquí el nombre, el descriptor, el dominio y los enlaces de contacto:
// todas las páginas los toman de este archivo.

export const sitio = {
  nombre: 'Teoría Panamá',
  descriptor: 'Física, matemática e información cuántica',

  // Descripción por defecto para buscadores y vistas previas en redes.
  descripcion:
    'Iniciativa académica en formación para que estudiantes en Panamá investiguen en física y matemática teóricas, con orientación, recursos y temas de tesis en información cuántica.',

  // Frase de presentación del pie de página.
  presentacion:
    'Iniciativa académica en formación de Danesh Morales Hashemi y Marc Urcia para fortalecer la investigación teórica en Panamá.',

  // Dominio definitivo, sin barra final (p. ej. 'https://ejemplo.org').
  // Mientras esté vacío no se generan URL absolutas, sitemap ni imagen social absoluta.
  url: '',

  // Ruta donde se publica el sitio. '/' si ocupa todo el dominio;
  // '/teoria-panama/' si se publica en un subdirectorio. Solo la usa la página 404.
  // También se puede fijar con la variable de entorno RUTA_BASE al compilar.
  rutaBase: '/',

  // Fecha de la última revisión del contenido (AAAA-MM-DD). Se muestra en el pie.
  revisado: '2026-11-01',

  // Invitación al grupo de WhatsApp anunciado en la charla.
  // Vacío = no se muestra ningún botón ni enlace.
  whatsapp: '',
};

// Menú principal. `ruta` es relativa a la raíz del sitio.
export const navegacion = [
  { ruta: 'vision/', texto: 'Visión' },
  { ruta: 'equipo/', texto: 'Equipo' },
  { ruta: 'mentoria/', texto: 'Mentoría' },
  { ruta: 'temas/', texto: 'Temas' },
  { ruta: 'recursos/', texto: 'Recursos' },
  { ruta: 'charla/', texto: 'Charla' },
  { ruta: 'preguntas/', texto: 'Preguntas' },
];
