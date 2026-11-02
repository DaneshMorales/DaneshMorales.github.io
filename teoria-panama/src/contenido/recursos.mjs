// Recursos para comenzar, organizados según el objetivo del estudiante.
//
// Oportunidades con fechas: indica siempre `fuente` (URL oficial) y `revisado`
// (AAAA-MM-DD). Si `cierre` (AAAA-MM-DD) ya pasó, el sitio sustituye
// automáticamente `estado` por `estadoCerrado`. `idiomaNombre: 'en'` marca un
// nombre completo en inglés (para lectores de pantalla). Si no se puede comprobar la
// vigencia de una convocatoria, deja `estado` vacío y enlaza solo al programa.

export const grupos = [
  {
    id: 'fundamentos',
    titulo: 'Aprender fundamentos',
    entrada:
      'En muchas líneas de información cuántica basta con álgebra lineal para empezar: vectores, matrices y valores propios permiten trabajar con qubits y sistemas de dimensión finita. Lo demás se incorpora según el proyecto.',
    recursos: [
      {
        nombre: 'IBM Quantum Learning',
        url: 'https://quantum.cloud.ibm.com/learning',
        descripcion:
          'Cursos gratuitos en línea. «Basics of quantum information», de John Watrous, parte del álgebra lineal; «Foundations of quantum error correction» cubre estabilizadores, códigos CSS y el código tórico.',
        enlaces: [
          { texto: 'Basics of quantum information', url: 'https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information' },
          { texto: 'Foundations of quantum error correction', url: 'https://quantum.cloud.ibm.com/learning/en/courses/foundations-of-quantum-error-correction' },
        ],
        idioma: 'En inglés',
      },
      {
        nombre: 'Qiskit',
        url: 'https://www.ibm.com/quantum/qiskit',
        descripcion:
          'Biblioteca de Python, de código abierto, para construir, simular y ejecutar circuitos cuánticos. Es la herramienta de varios temas del catálogo.',
        enlaces: [{ texto: 'Documentación', url: 'https://quantum.cloud.ibm.com/docs/en/guides' }],
        idioma: 'En inglés',
      },
      {
        nombre: 'Nielsen y Chuang, «Quantum Computation and Quantum Information»',
        url: 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE',
        descripcion:
          'Edición del décimo aniversario (Cambridge University Press, 2010). El texto de referencia más usado del área; sus primeros capítulos repasan el álgebra lineal y la mecánica cuántica necesarias.',
        idioma: 'En inglés',
      },
      {
        nombre: 'John Watrous, «The Theory of Quantum Information»',
        url: 'https://cs.uwaterloo.ca/~watrous/TQI/',
        descripcion:
          'Cambridge University Press, 2018. Más avanzado y matemático; útil cuando ya te sientes cómodo con el álgebra lineal. El autor ofrece en su página el manuscrito del libro para uso personal.',
        idioma: 'En inglés',
      },
    ],
  },
  {
    id: 'explorar',
    titulo: 'Explorar un área',
    entrada:
      'Seguir lo que se publica ayuda a encontrar preguntas y a reconocer a quién investiga qué. Ninguna de estas herramientas sustituye la lectura crítica: un artículo popular no es necesariamente un buen artículo.',
    recursos: [
      {
        nombre: 'arXiv',
        url: 'https://arxiv.org/',
        descripcion:
          'Repositorio abierto de artículos científicos, muchos antes de su revisión por pares. La sección quant-ph reúne cada día hábil los trabajos nuevos en física cuántica.',
        enlaces: [{ texto: 'Novedades de quant-ph', url: 'https://arxiv.org/list/quant-ph/new' }],
      },
      {
        nombre: 'SciRate',
        url: 'https://scirate.com/',
        descripcion:
          'Muestra los artículos nuevos de arXiv ordenados por los votos de sus usuarios. Sirve para ver qué se está discutiendo; un voto indica interés, no calidad científica.',
      },
      {
        nombre: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/',
        descripcion:
          'Buscador académico gratuito. Permite seguir las citas y referencias de un artículo para encontrar trabajos relacionados y recientes.',
      },
    ],
  },
];

// Consejos para preparar una tesis (sección «Preparar una tesis»).
export const consejosTesis = [
  {
    titulo: 'Leer un artículo',
    texto:
      'Empieza por el resumen, la introducción, las figuras y las conclusiones. Identifica la pregunta, las hipótesis y el resultado principal antes de entrar en los detalles técnicos. Anota lo que no entiendes: esas dudas suelen convertirse en buenas preguntas.',
  },
  {
    titulo: 'Reproducir un resultado',
    texto:
      'Reproducir una figura o un cálculo es la mejor forma de entender un artículo y un punto de partida natural para una tesis. Después cambia una sola cosa —una hipótesis, el modelo de ruido, el número de qubits— y compara.',
  },
  {
    titulo: 'Formular una pregunta acotada',
    texto:
      'Una buena pregunta de licenciatura puede responderse con el tiempo y las herramientas disponibles. Si suena a «estudiar X en general», delimítala: un caso particular, un parámetro, una comparación concreta.',
  },
  {
    titulo: 'Conectar con investigación reciente',
    texto:
      'Una tesis relacionada con artículos recientes te obliga a conocer el estado del área y puede llamar la atención de posibles supervisores. Trabajar sobre un artículo también facilita escribir a sus autores con una duda concreta.',
  },
  {
    titulo: 'Usar inteligencia artificial con criterio',
    texto:
      'La IA puede ayudar a buscar bibliografía, programar o revisar cálculos y argumentos. Decide tú qué pregunta importa y qué quieres comunicar, verifica cada paso antes de continuar —los errores se acumulan— y no le delegues la generación de un proyecto o de un artículo completo.',
  },
];

export const oportunidades = [
  {
    nombre: 'USEQIP',
    nombreCompleto: 'Undergraduate School on Experimental Quantum Information Processing',
    idiomaNombre: 'en',
    organiza: 'Institute for Quantum Computing, Universidad de Waterloo (Canadá)',
    url: 'https://uwaterloo.ca/institute-for-quantum-computing/outreach/useqip',
    descripcion:
      'Escuela de dos semanas con clases y prácticas de laboratorio sobre procesamiento experimental de información cuántica, sin costo para los estudiantes y con becas de viaje. Quienes postulan pueden solicitar además una estancia de investigación pagada en el IQC entre mayo y agosto.',
    estado: 'Edición 2027: del 31 de mayo al 11 de junio. Plazo de solicitud: 3 de enero de 2027.',
    cierre: '2027-01-03',
    estadoCerrado: 'El plazo de la edición 2027 cerró el 3 de enero de 2027. Consulta la página para la próxima edición.',
    fuente: 'https://uwaterloo.ca/institute-for-quantum-computing/outreach/useqip',
    revisado: '2026-11-01',
  },
  {
    nombre: 'PSI Start',
    nombreCompleto: 'Escuela de verano y PSI Start Research Internship',
    organiza: 'Perimeter Institute for Theoretical Physics (Waterloo, Canadá)',
    url: 'https://perimeterinstitute.ca/undergraduate-summer-programs',
    descripcion:
      'Escuela de verano de dos semanas en física teórica, sin costo y con viaje, alojamiento y comidas cubiertos. Algunos participantes realizan además una pasantía de investigación pagada de hasta 15 semanas. Para 2027 se pide conocer mecánica clásica y cuántica y planear un posgrado en física que comience en 2028 o después.',
    estado: 'Escuela 2027: del 14 al 25 de junio. Según la página oficial, las solicitudes abrirán a finales de 2026.',
    fuente: 'https://perimeterinstitute.ca/undergraduate-summer-programs',
    revisado: '2026-11-01',
  },
  {
    nombre: 'Journeys into Theoretical Physics',
    organiza: 'Perimeter Institute e ICTP-SAIFR/IFT-UNESP (São Paulo, Brasil)',
    url: 'https://journeys.ictp-saifr.org/',
    descripcion:
      'Escuela de una semana para estudiantes de Latinoamérica en el último año de la licenciatura, organizada por el Perimeter Institute y el Instituto Sudamericano de Investigación Fundamental del ICTP (ICTP-SAIFR) en el Instituto de Física Teórica de la Universidade Estadual Paulista (IFT-UNESP).',
    estado: 'La edición más reciente fue del 6 al 12 de julio de 2026. Consulta la página para la próxima convocatoria.',
    fuente: 'https://journeys.ictp-saifr.org/',
    revisado: '2026-11-01',
  },
  {
    nombre: 'Qiskit Global Summer School',
    organiza: 'IBM Quantum',
    url: 'https://www.ibm.com/quantum/blog/qiskit-summer-school-2026',
    descripcion:
      'Escuela de verano gratuita y en línea centrada en la computación cuántica, con clases y laboratorios para aprender a usar Qiskit y ejecutar circuitos en computadoras cuánticas de IBM.',
    estado: 'La edición de 2026 se celebró en julio y sus inscripciones están cerradas. Consulta el blog de IBM Quantum para la próxima.',
    fuente: 'https://www.ibm.com/quantum/blog/qiskit-summer-school-2026',
    revisado: '2026-11-01',
  },
  {
    nombre: 'Outsourcing Math Research',
    organiza: 'Iniciativa voluntaria coordinada por Roberto Hernández Palomares (Universidad de Waterloo)',
    url: 'https://sites.google.com/view/outsourcingmathresearch/home',
    descripcion:
      'Mentoría, seminarios e investigación colaborativa en matemática para estudiantes con recursos académicos limitados, en español y en inglés. Muestra cómo la mentoría a distancia puede impulsar la investigación matemática en Latinoamérica.',
  },
  {
    nombre: 'Escuela de matemáticas cuánticas 2027',
    organiza: 'Outsourcing Math Research y la Universidad del Sarre (Alemania)',
    url: 'https://sites.google.com/view/escuelacuantica2027/inicio',
    descripcion:
      'Tres etapas: un curso virtual en español de introducción a la información cuántica (enero a abril de 2027), proyectos en grupos pequeños con mentores (mayo y junio, en línea) y un taller presencial en Saarbrücken (26 al 30 de julio de 2027) para participantes seleccionados.',
    estado: 'Registro abierto hasta el 8 de noviembre de 2026.',
    cierre: '2026-11-08',
    estadoCerrado: 'El registro cerró el 8 de noviembre de 2026.',
    fuente: 'https://sites.google.com/view/escuelacuantica2027/inicio',
    revisado: '2026-11-01',
  },
];

// Consejos para buscar posgrado y escribir a supervisores.
export const consejosPosgrado = [
  {
    titulo: 'Escribir a posibles supervisores',
    texto:
      'Hay tres motivos habituales para escribir: una duda concreta sobre un artículo, una plaza de posgrado o una pasantía. Preséntate, explica en pocas líneas tu trabajo y tu interés, y formula una petición concreta. Si no hay respuesta, no lo tomes como algo personal: escribe a otras personas y aprovecha seminarios virtuales y comunidades académicas.',
  },
  {
    titulo: 'Financiación de un posgrado',
    texto:
      'Para una maestría o un doctorado de investigación no siempre hace falta una beca externa: algunas plazas tienen financiación del grupo o del programa. Depende de cada supervisor y de cada programa, así que conviene escribir antes de solicitar la admisión y confirmarlo en cada caso.',
  },
];
