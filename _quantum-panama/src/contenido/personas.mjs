// Perfiles del equipo. Información fechada: revisar cuando cambie.
//
// Fotografías: coloca la imagen en src/estatico/img/personas/ (cuadrada,
// al menos 400 × 400 px) y escribe su ruta en `foto`, p. ej.
//   foto: 'img/personas/danesh.jpg'
// Mientras `foto` sea null se muestra un monograma con las iniciales.
//
// `temas` enlaza con temas del catálogo cercanos al trabajo de cada persona
// (usa los `slug` de temas.mjs).

export const personas = [
  {
    id: 'danesh',
    nombre: 'Danesh Morales Hashemi',
    nombreCorto: 'Danesh',
    iniciales: 'DM',
    foto: null,
    correo: 'danesh.moraleshashemi@uwaterloo.ca',
    especialidad: 'Corrección de errores cuánticos',
    formacion: [
      'Licenciatura en Física Matemática, Universidad de Waterloo',
      'Maestría en Matemática Aplicada, especialización en Información Cuántica, Universidad de Waterloo (en curso)',
      'Vinculado al Institute for Quantum Computing (IQC)',
    ],
    bio: [
      'Danesh es panameño, de Chitré. Se formó en Física Matemática en la Universidad de Waterloo, en Canadá, donde cursa la maestría en Matemática Aplicada con especialización en Información Cuántica y está vinculado al Institute for Quantum Computing (IQC).',
      'Su investigación se centra en la corrección de errores cuánticos y, en particular, en cómo la memoria del entorno afecta la protección de la información: cuando el entorno conserva información de un instante a otro, los errores dejan de ser independientes en el tiempo y la corrección debe tenerlo en cuenta.',
    ],
    intereses: [
      'Códigos estabilizadores y decodificación',
      'Ruido temporalmente correlacionado',
      'Sistemas cuánticos abiertos',
      'Álgebra lineal y probabilidad',
    ],
    trabajos: [
      {
        texto:
          '<span lang="en">What Must a Quantum-Memory Decoder Know About Temporally Correlated Noise?</span> D. Morales-Hashemi, G. Smith y N. Cao (2026).',
        url: 'https://arxiv.org/abs/2610.03545',
        etiqueta: 'arXiv:2610.03545',
      },
      {
        texto:
          'Proyecto de licenciatura (2025) sobre <span lang="en">Circuit Benchmarking</span>, un protocolo para estimar la fiabilidad de circuitos cuánticos arbitrarios en plataformas ruidosas.',
      },
    ],
    temas: ['codigos-css', 'decodificacion-adaptada', 'codigo-torico', 'codigo-repeticion-ibm', 'memoria-entorno-qec', 'subespacios-libres-decoherencia'],
  },
  {
    id: 'marc',
    nombre: 'Marc Urcia',
    nombreCorto: 'Marc',
    iniciales: 'MU',
    foto: null,
    correo: 'marc.urciasoto@uwaterloo.ca',
    especialidad: 'Caracterización de errores cuánticos',
    formacion: [
      'Licenciatura en Física',
      'Maestría en Matemática Aplicada, especialización en Información Cuántica, Universidad de Waterloo (en curso)',
      'Vinculado al Institute for Quantum Computing (IQC)',
    ],
    bio: [
      'Marc es panameño y se formó en Física. Cursa la maestría en Matemática Aplicada con especialización en Información Cuántica en la Universidad de Waterloo y está vinculado al Institute for Quantum Computing (IQC).',
      'Trabaja en la caracterización de errores cuánticos: cómo describir el ruido de un dispositivo y evaluar con qué fiabilidad ejecuta un proceso. Su trabajo de licenciatura abordó las formas diferenciales y sus aplicaciones en física clásica; llegó a la información cuántica después, mediante cursos y comunidades académicas, y continuó esa formación en la maestría.',
    ],
    intereses: [
      'Benchmarking y tomografía de procesos',
      'Estadística e incertidumbre en la estimación',
      'Grupos y simetrías en la caracterización',
      'Geometría y formas diferenciales',
    ],
    trabajos: [
      {
        texto:
          'Trabajo de licenciatura (2023): «Aplicación de las formas diferenciales en física clásica», una herramienta didáctica para mecánica analítica y electromagnetismo.',
      },
    ],
    temas: ['tomografia-qubit', 'benchmarking-rendimiento', 'errores-lectura', 'compilacion-aleatorizada', 'desacoplamiento-dinamico', 'disenos-unitarios'],
  },
];
