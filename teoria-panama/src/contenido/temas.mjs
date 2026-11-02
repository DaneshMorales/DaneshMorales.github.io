// Temas posibles de tesis. Fuente: «Temas_tesis_cuantica_Panama» (referencias/).
// Esta es la única fuente de datos de los temas: el catálogo, los filtros,
// las fichas, la portada y el formulario de contacto se generan desde aquí.
//
// Campos de cada tema:
//   slug          identificador en la URL: /temas/<slug>/ (no cambiarlo una vez publicado)
//   titulo        título del documento
//   pregunta      pregunta de investigación del documento
//   resumen       una o dos frases de contexto en lenguaje sencillo (catálogo)
//   trabajo       qué harías (párrafo; admite HTML sencillo y fórmulas MathML)
//   alcance       lista: cómo se limita el proyecto
//   producto      producto esperado, según el documento
//   productos     claves de `productos` (abajo)
//   preparacion   lista: preparación inicial útil, según el documento
//   seAprende     lista: herramientas que se aprenderían durante el proyecto
//   perfil        para quién es adecuado, según el documento
//   intereses     claves de `intereses` (filtro «Encaja con»)
//   tipos         claves de `tiposTrabajo` (filtro «Tipo de trabajo»)
//   ibm           nota sobre la ejecución en IBM (solo si el tema la contempla)
//   entrada       si el documento lo señala como buena entrada, por qué
//   referencias   claves de referencias.mjs

// Etiquetas de los filtros. Cambiar el texto aquí lo cambia en todo el sitio.
export const intereses = {
  pura: 'Matemática pura',
  aplicada: 'Matemática aplicada',
  fisica: 'Física',
  programacion: 'Programación',
};

export const tiposTrabajo = {
  teoria: 'Teoría',
  simulacion: 'Simulación y cómputo',
  datos: 'Análisis de datos',
  ibm: 'Posible ejecución en IBM',
};

export const productos = {
  exposicion: 'Exposición rigurosa',
  demostraciones: 'Demostraciones',
  codigo: 'Código reproducible',
  simulaciones: 'Simulaciones',
  comparacion: 'Comparación de métodos',
  experimento: 'Experimento en IBM',
};

// Notación matemática en MathML: se muestra con fuentes matemáticas del
// navegador y la leen los lectores de pantalla.
const m = (contenido) => `<math>${contenido}</math>`;
const ket = (s) => m(`<mrow><mo stretchy="false">|</mo><mn>${s}</mn><mo stretchy="false">⟩</mo></mrow>`);
const pauliX = m('<mi>X</mi>');
const codigo513 = m('<mrow><mo>[</mo><mo>[</mo><mn>5</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>3</mn><mo>]</mo><mo>]</mo></mrow>');

const notaIBM =
  'La ejecución en equipos de IBM depende del acceso y de las capacidades disponibles en el momento del proyecto. El estudio puede completarse íntegramente con simulaciones.';

export const temas = [
  {
    slug: 'codigos-css',
    titulo: 'De códigos clásicos a códigos cuánticos: construcción CSS',
    pregunta: '¿Cómo se transforma un código corrector clásico en uno que protege información cuántica?',
    resumen:
      'Muchos códigos cuánticos se construyen a partir de dos códigos clásicos. Este tema recorre esa construcción, llamada CSS (Calderbank–Shor–Steane), con el código de Steane como ejemplo central.',
    trabajo:
      'Desarrollarías la teoría de códigos binarios, matrices de chequeo, estabilizadores y la construcción CSS, usando el código de Steane como ejemplo central. Implementarías un programa que verifique la conmutación de los estabilizadores, el número de qubits lógicos y la distancia en ejemplos pequeños. Como extensión, estudiarías un conjunto acotado de modificaciones de las matrices de chequeo.',
    alcance: [
      'Ejemplos pequeños, verificables por computadora.',
      'La extensión se limita a un conjunto acotado de modificaciones de las matrices de chequeo.',
    ],
    producto: 'Una exposición matemática rigurosa acompañada de una herramienta reproducible para analizar códigos.',
    productos: ['exposicion', 'codigo'],
    preparacion: ['Álgebra lineal', 'Algo de álgebra abstracta'],
    seAprende: ['Códigos lineales binarios y matrices de chequeo', 'Formalismo de estabilizadores', 'Construcción CSS y código de Steane'],
    perfil: 'Estudiantes de Matemática con álgebra lineal y algo de álgebra abstracta.',
    intereses: ['pura', 'programacion'],
    tipos: ['teoria', 'simulacion'],
    entrada: 'El documento lo señala como buena entrada para estudiantes de Matemática. El curso de IBM sobre corrección de errores es un punto de partida.',
    referencias: ['css', 'ibmqec'],
  },
  {
    slug: 'decodificacion-adaptada',
    titulo: 'Decodificación adaptada al ruido',
    pregunta: '¿Cuánto ayuda conocer las probabilidades de los errores para elegir una recuperación?',
    resumen:
      'Tras detectar un error, un decodificador debe decidir cómo corregirlo. Este tema compara una regla sencilla con otra que aprovecha lo que se sabe del ruido.',
    trabajo:
      `Trabajarías con el código ${codigo513} —cinco qubits físicos que protegen un qubit lógico y corrigen cualquier error en un solo qubit— y con ruido de Pauli. Enumerarías los errores y compararías la recuperación de peso mínimo con la de máxima probabilidad de la clase lógica, sumando los errores equivalentes por estabilizadores. Después variarías el sesgo del ruido y la precisión con que se conocen sus probabilidades.`,
    alcance: [
      'Un solo código, lo bastante pequeño para enumerar los errores de forma exhaustiva.',
      'Ruido de Pauli; el sesgo y la precisión del modelo son los parámetros que se varían.',
    ],
    producto: 'Un mapa de rendimiento y sensibilidad del decodificador al modelo de ruido.',
    productos: ['simulaciones', 'comparacion'],
    preparacion: ['Probabilidad', 'Álgebra lineal', 'Programación'],
    seAprende: ['Formalismo de estabilizadores', 'Decodificación de peso mínimo y de máxima probabilidad', 'Modelos de ruido de Pauli con sesgo'],
    perfil: 'Estudiantes de Matemática o Física con probabilidad, álgebra lineal y programación, interesados en algoritmos y decisiones basadas en datos.',
    intereses: ['aplicada', 'fisica', 'programacion'],
    tipos: ['teoria', 'simulacion'],
    referencias: ['adapted'],
  },
  {
    slug: 'codigo-torico',
    titulo: 'Topología y protección de información: el código tórico',
    pregunta: '¿Cómo se relacionan los ciclos de una superficie con los errores lógicos de un código cuántico?',
    resumen:
      'En el código tórico los qubits viven en las aristas de una red dibujada sobre un toro, y los errores lógicos son cadenas que dan la vuelta completa a la superficie.',
    trabajo:
      'Construirías el código tórico mediante vértices, aristas y caras. Explicarías por qué conmutan sus estabilizadores y la relación entre ciclos no triviales y operadores lógicos. Programarías ejemplos pequeños con matrices binarias y visualizaciones de cadenas de errores, sin almacenar el estado cuántico completo.',
    alcance: [
      'Redes pequeñas.',
      'Representación con matrices binarias: no se simula el estado cuántico completo.',
    ],
    producto: 'Un desarrollo matemático del código acompañado de una herramienta visual que verifique sus propiedades.',
    productos: ['exposicion', 'codigo'],
    preparacion: ['Álgebra lineal', 'Interés en topología y teoría de grafos'],
    seAprende: ['Homología elemental', 'Formalismo de estabilizadores', 'Visualización de cadenas de errores'],
    perfil: 'Estudiantes de Matemática con álgebra lineal e interés en topología y teoría de grafos; la homología elemental se aprendería durante el proyecto.',
    intereses: ['pura', 'programacion'],
    tipos: ['teoria', 'simulacion'],
    referencias: ['toric', 'ibmqec'],
  },
  {
    slug: 'tomografia-qubit',
    titulo: 'Tomografía de un qubit y modelos de ruido',
    pregunta: '¿Cuándo basta un modelo de errores de Pauli para describir un proceso cuántico?',
    resumen:
      'La tomografía reconstruye un proceso cuántico a partir de mediciones. Este tema compara un modelo sencillo del ruido con uno general y mide cuánto se pierde al simplificar.',
    trabajo:
      'Reconstruirías un canal de un qubit a partir de preparaciones y mediciones en distintas bases. Compararías un modelo de Pauli con un ajuste general físicamente válido, primero con datos simulados y luego, opcionalmente, en IBM. Evaluarías las predicciones en datos reservados y el efecto de los errores de preparación y lectura.',
    alcance: [
      'Un solo qubit.',
      'Los datos simulados son la ruta principal; la ejecución en IBM es opcional.',
    ],
    producto: 'Una comparación de precisión, costo de medición y límites del modelo.',
    productos: ['comparacion', 'simulaciones', 'experimento'],
    preparacion: ['Álgebra lineal', 'Estadística', 'Métodos numéricos'],
    seAprende: ['Canales cuánticos y tomografía de procesos', 'Ajustes con restricciones físicas (optimización convexa)', 'Validación con datos reservados'],
    perfil: 'Estudiantes de Matemática aplicada o Física con álgebra lineal, estadística y métodos numéricos, interesados en problemas inversos y optimización convexa.',
    intereses: ['aplicada', 'fisica'],
    tipos: ['simulacion', 'datos', 'ibm'],
    ibm: notaIBM,
    referencias: ['tomography'],
  },
  {
    slug: 'benchmarking-rendimiento',
    titulo: 'Benchmarking y predicción del rendimiento',
    pregunta: '¿Pueden dos modelos con infidelidad media similar producir resultados distintos en un circuito?',
    resumen:
      'El benchmarking resume el ruido de un dispositivo en un número promedio. Este tema examina cuándo ese número basta para anticipar el rendimiento de un circuito concreto.',
    trabajo:
      'Implementarías <span lang="en">randomized benchmarking</span> (benchmarking aleatorizado) de un qubit y compararías sobrerrotaciones coherentes con ruido estocástico. Ajustarías los decaimientos, estimarías su incertidumbre y estudiarías una familia pequeña de circuitos repetidos para determinar qué información aporta la métrica de benchmarking sobre su rendimiento.',
    alcance: [
      'Un solo qubit.',
      'Dos tipos de ruido contrastados: sobrerrotaciones coherentes y ruido estocástico.',
      'Una familia pequeña de circuitos repetidos.',
    ],
    producto: 'Ejemplos cuantitativos de la capacidad predictiva y los límites de una métrica promedio.',
    productos: ['simulaciones', 'comparacion'],
    preparacion: ['Estadística', 'Métodos numéricos', 'Mecánica cuántica básica'],
    seAprende: ['Randomized benchmarking', 'Errores coherentes frente a errores estocásticos', 'Ajuste de decaimientos e incertidumbre'],
    perfil: 'Estudiantes de Física con estadística, métodos numéricos y mecánica cuántica básica, interesados en caracterización experimental y análisis de datos.',
    intereses: ['fisica', 'programacion'],
    tipos: ['simulacion', 'datos'],
    referencias: ['rb'],
  },
  {
    slug: 'errores-lectura',
    titulo: 'Errores de lectura correlacionados y mitigación',
    pregunta: '¿Cuándo es insuficiente calibrar la lectura de cada qubit por separado?',
    resumen:
      'Al medir varios qubits a la vez, los errores de lectura pueden estar correlacionados. Este tema compara modelos para corregirlos según su precisión y su costo experimental.',
    trabajo:
      'Trabajarías con dos o tres qubits y compararías los datos sin mitigación, un modelo de lectura independiente por qubit y una matriz conjunta. Variarías las correlaciones y el número de mediciones, contabilizando tanto la calibración como la validación. Una ejecución pequeña en IBM permitiría contrastar los modelos con datos reales.',
    alcance: [
      'Dos o tres qubits.',
      'Se contabiliza el costo de calibración y de validación.',
      'La ejecución en IBM es pequeña y complementaria.',
    ],
    producto: 'Criterios para elegir un modelo de lectura según precisión y costo experimental.',
    productos: ['comparacion', 'simulaciones', 'experimento'],
    preparacion: ['Probabilidad', 'Álgebra lineal', 'Python'],
    seAprende: ['Matrices de confusión y mitigación de lectura', 'Estimación con un número finito de mediciones', 'Diseño de experimentos de calibración'],
    perfil: 'Estudiantes de Matemática o Física con probabilidad, álgebra lineal y Python, interesados en calibración, incertidumbre y análisis numérico.',
    intereses: ['aplicada', 'fisica', 'programacion'],
    tipos: ['simulacion', 'datos', 'ibm'],
    ibm: notaIBM,
    entrada: 'El documento lo señala como una entrada accesible.',
    referencias: ['readout'],
  },
  {
    slug: 'codigo-repeticion-ibm',
    titulo: 'Código de repetición en IBM: frecuencia de recuperación',
    pregunta: '¿Cuándo compensa corregir con mayor frecuencia el ruido añadido por la recuperación?',
    resumen:
      'Corregir errores también introduce errores. Con el código de repetición, el más sencillo, este tema busca el punto en que corregir más a menudo deja de ayudar.',
    trabajo:
      `Implementarías un código de repetición con tres qubits de datos y dos auxiliares. Compararías la decodificación al final con la recuperación durante el circuito, a duración total fija, primero en simulación y después en IBM. Estudiarías errores de tipo ${pauliX} y distinguirías la conservación de la información en la base computacional de la conservación de la coherencia.`,
    alcance: [
      'Cinco qubits: tres de datos y dos auxiliares.',
      `Errores de tipo ${pauliX}.`,
      'Duración total fija, para comparar las estrategias en igualdad de condiciones.',
    ],
    producto: 'Curvas de rendimiento que muestren cuándo ayuda la recuperación.',
    productos: ['simulaciones', 'experimento', 'comparacion'],
    preparacion: ['Programación', 'Álgebra lineal', 'Fundamentos de circuitos cuánticos'],
    seAprende: ['Medición de síndromes y circuitos dinámicos', 'Ejecución remota en procesadores de IBM', 'Diferencia entre proteger bits clásicos y proteger coherencia'],
    perfil: 'Estudiantes de Física o Matemática aplicada con programación, álgebra lineal y fundamentos de circuitos cuánticos, interesados en experimentación remota.',
    intereses: ['aplicada', 'fisica', 'programacion'],
    tipos: ['simulacion', 'ibm'],
    ibm: 'La recuperación durante el circuito requiere mediciones a mitad del circuito (circuitos dinámicos). Su ejecución en IBM depende del acceso y de las capacidades disponibles en ese momento; la simulación permite completar el estudio en cualquier caso.',
    referencias: ['wootton', 'ibmrep'],
  },
  {
    slug: 'compilacion-aleatorizada',
    titulo: 'Compilación aleatorizada y acumulación del error',
    pregunta: '¿Cómo cambia la acumulación del error al aleatorizar la implementación de un circuito?',
    resumen:
      'Los errores coherentes pueden sumarse de forma constructiva a lo largo de un circuito. La compilación aleatorizada los convierte en ruido estocástico, más predecible; este tema mide cuánto ayuda y cuánto cuesta.',
    trabajo:
      'Reproducirías la técnica de <span lang="en">randomized compiling</span> (compilación aleatorizada) en circuitos pequeños con sobrerrotaciones controladas. Verificarías que las operaciones aleatorias y sus compensaciones preservan el circuito ideal. Compararías el rendimiento y la variabilidad con y sin aleatorización, y estudiarías cuántas realizaciones hacen falta con un presupuesto total de mediciones fijo.',
    alcance: [
      'Circuitos pequeños.',
      'Sobrerrotaciones controladas como modelo de error.',
      'Presupuesto total de mediciones fijo.',
    ],
    producto: 'Una implementación reproducible y curvas de precisión frente a costo.',
    productos: ['codigo', 'simulaciones', 'comparacion'],
    preparacion: ['Álgebra lineal', 'Probabilidad', 'Nociones de grupos'],
    seAprende: ['Aleatorización de Pauli y adaptación del ruido', 'Errores coherentes frente a errores estocásticos', 'Variabilidad con un número finito de muestras'],
    perfil: 'Estudiantes de Matemática o Física con álgebra lineal, probabilidad y nociones de grupos, interesados en algoritmos aleatorios y control del error.',
    intereses: ['aplicada', 'fisica', 'programacion'],
    tipos: ['teoria', 'simulacion'],
    referencias: ['rc'],
  },
  {
    slug: 'memoria-entorno-qec',
    titulo: 'Memoria del entorno y eficacia de QEC',
    pregunta: '¿Cómo cambia la recuperación cuando el entorno conserva información entre dos intervalos?',
    resumen:
      'Los modelos habituales de corrección cuántica de errores (QEC, por sus siglas en inglés) suponen que el ruido no recuerda el pasado. Este tema estudia qué ocurre cuando el entorno sí guarda memoria.',
    trabajo:
      'Simularías un código pequeño acoplado a un qubit de entorno. Compararías dos intervalos con el mismo entorno frente a un control en el que el entorno se reinicializa, manteniendo una interacción elemental. Medirías la fidelidad lógica y las estadísticas de síndromes. El trabajo de Oreshkov y Brun sobre corrección continua serviría de antecedente conceptual.',
    alcance: [
      'Un código pequeño y un único qubit de entorno.',
      'Dos intervalos de tiempo y un control sin memoria.',
    ],
    producto: 'Un estudio delimitado del efecto de la memoria sobre la recuperación.',
    productos: ['simulaciones', 'comparacion'],
    preparacion: ['Mecánica cuántica', 'Álgebra lineal sólida', 'Programación científica'],
    seAprende: ['Sistemas cuánticos abiertos y ruido con memoria (no markoviano)', 'Fidelidad lógica y estadística de síndromes'],
    perfil: 'Estudiantes de Física o Matemática aplicada con mecánica cuántica, álgebra lineal sólida y programación científica, interesados en sistemas abiertos y dinámica.',
    intereses: ['aplicada', 'fisica', 'programacion'],
    tipos: ['teoria', 'simulacion'],
    referencias: ['memory'],
  },
  {
    slug: 'desacoplamiento-dinamico',
    titulo: 'Desacoplamiento dinámico durante tiempos de espera',
    pregunta: '¿Cuándo ayudan las secuencias de control a preservar la coherencia de un qubit?',
    resumen:
      'Mientras un qubit espera, se le puede aplicar una secuencia de pulsos que cancela parte del ruido. Este tema delimita cuándo esas secuencias ayudan y cuándo perjudican.',
    trabajo:
      'Compararías la espera libre, el eco y la secuencia XY4 bajo desfase cuasiestático o temporalmente correlacionado, manteniendo igual la duración total. Incluirías errores en las propias operaciones de control y estudiarías distintos estados iniciales. Una campaña pequeña en IBM podría complementar las simulaciones.',
    alcance: [
      'Un solo qubit.',
      'Tres estrategias: espera libre, eco y XY4.',
      'Duración total fija; la campaña en IBM es pequeña y opcional.',
    ],
    producto: 'Un mapa de los regímenes en los que las secuencias ayudan o perjudican.',
    productos: ['simulaciones', 'comparacion', 'experimento'],
    preparacion: ['Mecánica cuántica', 'Ecuaciones diferenciales', 'Programación'],
    seAprende: ['Desacoplamiento dinámico: eco y XY4', 'Modelos de desfase y ruido correlacionado en el tiempo', 'Efecto de pulsos de control imperfectos'],
    perfil: 'Estudiantes de Física con mecánica cuántica, ecuaciones diferenciales y programación, interesados en teoría de control y fenómenos de coherencia.',
    intereses: ['aplicada', 'fisica', 'programacion'],
    tipos: ['simulacion', 'ibm'],
    ibm: notaIBM,
    referencias: ['dd'],
  },
  {
    slug: 'medida-haar',
    titulo: 'Medida de Haar y operaciones cuánticas aleatorias',
    pregunta: '¿Qué significa elegir uniformemente una operación cuántica y cómo se genera esa distribución?',
    resumen:
      'Muchas técnicas de caracterización usan operaciones cuánticas «al azar». Este tema define con precisión qué significa eso y muestra un error común al generarlas.',
    trabajo:
      'Introducirías la invariancia de la medida de Haar y generarías matrices unitarias de dimensiones dos y cuatro mediante matrices gaussianas y factorización QR con corrección de fases. Compararías este procedimiento con un muestreo ingenuo de ángulos, usando momentos y pruebas numéricas de invariancia.',
    alcance: [
      'Dimensiones dos y cuatro.',
      'Comparación con un único procedimiento ingenuo.',
    ],
    producto: 'Una justificación matemática del algoritmo y una comparación reproducible entre muestreo correcto y sesgado.',
    productos: ['exposicion', 'codigo', 'comparacion'],
    preparacion: ['Álgebra lineal', 'Probabilidad', 'Interés en teoría de la medida y grupos'],
    seAprende: ['Medida de Haar en grupos unitarios', 'Factorización QR y muestreo de matrices aleatorias', 'Pruebas numéricas de invariancia'],
    perfil: 'Estudiantes de Matemática con álgebra lineal, probabilidad e interés en teoría de la medida y grupos.',
    intereses: ['pura', 'programacion'],
    tipos: ['teoria', 'simulacion'],
    entrada: 'No exige formación cuántica avanzada.',
    referencias: ['haar'],
  },
  {
    slug: 'disenos-unitarios',
    titulo: 'Diseños unitarios y estimación de fidelidad',
    pregunta: '¿Qué promedios de Haar puede reproducir un conjunto finito de operaciones?',
    resumen:
      'Promediar sobre todas las operaciones cuánticas posibles es costoso. Un diseño unitario es un conjunto finito que reproduce ciertos promedios de forma exacta, y sirve para estimar la fidelidad de un proceso.',
    trabajo:
      'Estudiarías los diseños unitarios de órdenes uno y dos, comparando las operaciones de Pauli y de Clifford para un qubit. Analizarías sus momentos y aplicarías los estados generados mediante operaciones de Clifford a la estimación de la fidelidad promedio de un canal. Distinguirías la igualdad exacta de momentos de la incertidumbre debida al muestreo finito.',
    alcance: [
      'Un solo qubit.',
      'Diseños de órdenes uno y dos.',
    ],
    producto: 'Una exposición con demostraciones y una comparación de estimadores.',
    productos: ['exposicion', 'demostraciones', 'comparacion'],
    preparacion: ['Álgebra lineal', 'Probabilidad', 'Algo de álgebra abstracta'],
    seAprende: ['Diseños unitarios y momentos', 'Grupos de Pauli y de Clifford', 'Fidelidad promedio de un canal'],
    perfil: 'Estudiantes de Matemática con álgebra lineal, probabilidad y algo de álgebra abstracta, interesados en sustituir integrales por conjuntos finitos y en conectar simetrías con caracterización.',
    intereses: ['pura', 'aplicada'],
    tipos: ['teoria', 'simulacion'],
    referencias: ['designs'],
  },
  {
    slug: 'subespacios-libres-decoherencia',
    titulo: 'Simetrías y subespacios libres de decoherencia',
    pregunta: '¿Cómo protege una simetría la información y qué ocurre cuando se rompe ligeramente?',
    resumen:
      'Si dos qubits sufren exactamente el mismo desfase, hay un subespacio de estados que no lo nota. Este tema demuestra esa protección y mide cuánto resiste cuando la simetría no es perfecta.',
    trabajo:
      `Analizarías dos qubits sujetos a desfase colectivo y demostrarías la protección del subespacio generado por ${ket('01')} y ${ket('10')}. Introducirías una pequeña desigualdad entre sus acoplamientos y estudiarías la pérdida de fidelidad, delimitando qué errores respeta la protección ideal.`,
    alcance: [
      'Dos qubits.',
      'Desfase colectivo con una pequeña asimetría en los acoplamientos.',
    ],
    producto: 'Una derivación de la protección por simetría y un estudio de su robustez.',
    productos: ['demostraciones', 'simulaciones'],
    preparacion: ['Álgebra lineal', 'Mecánica cuántica básica'],
    seAprende: ['Subespacios libres de decoherencia', 'Simetrías y subespacios invariantes', 'Sistemas cuánticos abiertos'],
    perfil: 'Estudiantes de Física o Matemática con álgebra lineal y mecánica cuántica básica, interesados en subespacios invariantes, representaciones y sistemas abiertos.',
    intereses: ['pura', 'fisica'],
    tipos: ['teoria', 'simulacion'],
    referencias: ['dfs'],
  },
  {
    slug: 'estados-aleatorios-entrelazamiento',
    titulo: 'Estados aleatorios y entrelazamiento bipartito',
    pregunta: '¿Cómo depende el entrelazamiento típico de un estado puro aleatorio de las dimensiones de sus subsistemas?',
    resumen:
      'Un estado cuántico elegido al azar suele estar entrelazado, y casi al máximo cuando sus partes son grandes. Este tema calcula cuánto, en promedio, según las dimensiones, y lo contrasta con simulaciones.',
    trabajo:
      'Generarías estados puros aleatorios según la medida de Haar, calcularías su descomposición de Schmidt y estudiarías la pureza de los estados reducidos. Derivarías la pureza media y la contrastarías con histogramas y promedios numéricos para dimensiones pequeñas. Como extensión, podrías analizar la entropía de von Neumann.',
    alcance: [
      'Dimensiones pequeñas.',
      'La entropía de von Neumann queda como extensión opcional.',
    ],
    producto: 'Una derivación analítica acompañada de simulaciones reproducibles.',
    productos: ['demostraciones', 'simulaciones'],
    preparacion: ['Álgebra lineal', 'Probabilidad'],
    seAprende: ['Descomposición de Schmidt y pureza', 'Estados aleatorios de Haar', 'Entropía de von Neumann (extensión)'],
    perfil: 'Estudiantes de Matemática o Física con álgebra lineal y probabilidad, interesados en matrices aleatorias, teoría de la información y propiedades típicas de sistemas cuánticos.',
    intereses: ['pura', 'fisica'],
    tipos: ['teoria', 'simulacion'],
    referencias: ['randomstates'],
  },
];

// Temas destacados en la portada (por slug).
export const destacados = ['codigos-css', 'errores-lectura', 'codigo-repeticion-ibm', 'medida-haar'];

// El número de cada tema es su posición en la lista (1 a 14).
temas.forEach((tema, i) => { tema.numero = i + 1; });
