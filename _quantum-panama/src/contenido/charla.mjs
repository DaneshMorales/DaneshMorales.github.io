// La charla del 31 de octubre de 2026 y sus materiales.
// Fuente: «Resumen_dialogo_investigacion_Panama» (referencias/).
//
// Los capítulos usan los tiempos aproximados del resumen, tomados del audio
// (1 h 13 min 40 s). El video publicado dura 1 h 13 min 41 s.
// `inicio` está en segundos; `tiempos` es el texto que se muestra.

export const charla = {
  titulo: 'Diálogo sobre el desarrollo de oportunidades de investigación teórica en Panamá',
  fecha: '2026-10-31',
  ponentes: 'Danesh Morales y Marc Urcia',
  duracion: 'Unos 74 minutos',
  youtubeId: 'kJAX_0uai8Y',
  descripcion: [
    'Una conversación sobre cómo fortalecer la investigación teórica en física y matemática en Panamá mediante proyectos accesibles, mentoría y colaboración nacional e internacional.',
    'Durante los primeros 35 minutos presentamos formas de comenzar desde la licenciatura, ejemplos de tesis y oportunidades en información cuántica. Después conversamos con los participantes sobre la preparación matemática, la búsqueda de supervisores, los experimentos remotos y el uso de la inteligencia artificial.',
  ],
  capitulos: [
    {
      inicio: 0, tiempos: '00:00–04:15', titulo: 'Contexto y propósito',
      texto: 'La investigación teórica como complemento de los grupos experimentales del país: muchos proyectos pueden comenzar con una computadora, bibliografía y acceso a internet, y admiten colaboración a distancia y mentoría desde segundo o tercer año de licenciatura.',
    },
    {
      inicio: 255, tiempos: '04:15–06:10', titulo: 'Áreas de investigación y aplicaciones',
      texto: 'Teoría de control para redes de agua, energía y riego; geometría diferencial para planificar movimientos de robots; materia condensada para arquitecturas de qubits semiconductores; información cuántica para corregir errores.',
    },
    {
      inicio: 370, tiempos: '06:10–12:30', titulo: 'Cómo comenzar y qué puede producir una tesis',
      texto: 'Revisar y sintetizar literatura, reproducir y extender simulaciones, estudiar casos particulares de problemas abiertos y analizar los límites de los modelos, con ejemplos de tesis de licenciatura.',
    },
    {
      inicio: 750, tiempos: '12:30–22:55', titulo: 'Información cuántica y colaboración en Panamá',
      texto: 'La computación cuántica como punto de encuentro entre física, matemática, química e ingeniería; la posible conexión con los semiconductores; la caracterización y la corrección de errores.',
    },
    {
      inicio: 1375, tiempos: '22:55–35:30', titulo: 'Formación, financiación y oportunidades',
      texto: 'Contactar a posibles supervisores antes de solicitar admisión, seguir artículos recientes y aprovechar escuelas de verano y pasantías.',
    },
    {
      inicio: 2130, tiempos: '35:30–45:05', titulo: 'Qué aprender para comenzar',
      texto: 'El álgebra lineal como punto de partida; otras herramientas según la especialidad; cursos de IBM y libros de Watrous y de Nielsen y Chuang; alternativas en ecuaciones diferenciales, sistemas dinámicos y control.',
    },
    {
      inicio: 2705, tiempos: '45:05–50:40', titulo: 'Proyectos y posible asesoría desde Panamá',
      texto: 'Partir de un artículo y modificar una hipótesis, el modelo de ruido o el número de qubits; complementar simulaciones con ejecuciones remotas; qué faltaría concretar para una coasesoría.',
    },
    {
      inicio: 3040, tiempos: '50:40–57:50', titulo: 'Cómo contactar investigadores',
      texto: 'Tres motivos para escribir —una duda sobre un artículo, una plaza de posgrado o una pasantía— y cómo redactar un mensaje con una petición concreta.',
    },
    {
      inicio: 3470, tiempos: '57:50–61:45 y 63:50–69:30', titulo: 'IA como apoyo a la investigación',
      texto: 'Experiencias usando IA para bibliografía, programación, cálculos y revisión de argumentos, y por qué conservar el criterio propio y verificar cada paso.',
    },
    {
      inicio: 3705, tiempos: '61:45–63:50 y 69:30–73:40', titulo: 'Continuidad y transición hacia un posgrado',
      texto: 'La propuesta de una próxima reunión más específica sobre computación cuántica, y cómo una tesis en otro tema no impide explorar una nueva especialidad.',
    },
  ],
  // Materiales descargables. Si un archivo no existe en src/estatico/, el
  // enlace se omite automáticamente (y la compilación avisa).
  materiales: [
    {
      titulo: 'Diapositivas',
      descripcion: 'Presentación de apoyo, 28 diapositivas.',
      archivo: 'materiales/diapositivas-investigacion-teorica-panama.pdf',
    },
    {
      titulo: 'Resumen de la charla',
      descripcion: 'Dos páginas, con los tiempos aproximados de cada parte.',
      archivo: 'materiales/resumen-dialogo-investigacion-panama.pdf',
    },
    {
      titulo: 'Propuestas de tesis',
      descripcion: 'Los 14 temas con su bibliografía.',
      archivo: 'materiales/temas-tesis-informacion-cuantica.pdf',
    },
  ],
};
