// Configuración general del sitio.
// Cambia aquí el nombre, el descriptor, el dominio y los enlaces de contacto:
// todas las páginas los toman de este archivo.

export const sitio = {
  nombre: 'Quantum Panama',
  // Idioma del nombre, para que los lectores de pantalla lo pronuncien bien ('' si es español).
  idiomaNombre: 'en',
  descriptor: 'Física, matemática e información cuántica',

  // Descripción por defecto para buscadores y vistas previas en redes.
  descripcion:
    'Iniciativa académica en formación para que estudiantes en Panamá investiguen en física y matemática teóricas, con orientación, recursos y temas de tesis en información cuántica.',

  // Frase de presentación del pie de página.
  presentacion:
    'Iniciativa académica en formación de Danesh Morales Hashemi y Marc Urcia para fortalecer la investigación teórica en Panamá.',

  // Dominio donde se publica, sin barra final (p. ej. 'https://ejemplo.org').
  // Si está vacío no se generan URL absolutas, sitemap ni imagen social absoluta.
  url: 'https://daneshmorales.github.io',

  // Ruta donde se publica el sitio dentro del dominio. '/' si ocupa todo el
  // dominio. La usan la página 404 y las URL absolutas. El servidor local
  // (npm run dev) usa siempre '/'.
  rutaBase: '/quantum-panama/',

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
