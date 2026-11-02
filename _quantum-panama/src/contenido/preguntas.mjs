// Preguntas frecuentes. `id` se usa como ancla: /preguntas/#<id>
// Las respuestas admiten HTML sencillo. Para enlazar a otra página del sitio
// usa {{raiz}}, que se sustituye por la ruta correcta: {{raiz}}temas/

export const preguntas = [
  {
    id: 'cuantica',
    pregunta: '¿Necesito saber cuántica?',
    respuesta: [
      'No para empezar. En muchas líneas basta con álgebra lineal para trabajar con qubits y sistemas de dimensión finita. La mecánica cuántica y otras herramientas, como la teoría de grupos, se aprenden según lo que pida cada proyecto.',
      'La preparación sí depende del tema: algunos, como el de la <a href="{{raiz}}temas/medida-haar/">medida de Haar</a>, casi no requieren formación cuántica; otros, como el de <a href="{{raiz}}temas/desacoplamiento-dinamico/">desacoplamiento dinámico</a>, piden mecánica cuántica desde el principio.',
    ],
  },
  {
    id: 'centro-regional',
    pregunta: '¿Puedo participar desde un centro regional?',
    respuesta: [
      'Sí. La investigación teórica requiere pocos recursos materiales y la orientación puede ser a distancia. Si el proyecto se convierte en tesis, se coordinaría con un docente de tu centro o de tu universidad.',
    ],
  },
  {
    id: 'otro-tema',
    pregunta: '¿Puedo proponer otro tema?',
    respuesta: [
      'Sí. Los temas del catálogo son puntos de partida. Si te interesa otra pregunta, cuéntanos: veremos si podemos orientarte o si conviene buscar a alguien con más experiencia en esa área. Nuestra orientación directa se concentra hoy en información cuántica, caracterización del ruido y corrección de errores.',
    ],
  },
  {
    id: 'programar',
    pregunta: '¿Necesito programar?',
    respuesta: [
      'Depende del tema. Algunos son sobre todo teóricos —desarrollo matemático y demostraciones— y otros se apoyan en simulaciones, normalmente en Python. Si nunca has programado, puedes empezar por un tema más teórico y aprender en el camino. En el <a href="{{raiz}}temas/">catálogo</a> puedes filtrar por tipo de trabajo.',
    ],
  },
  {
    id: 'tesis',
    pregunta: '¿Puedo hacer mi tesis con ustedes?',
    respuesta: [
      'Podemos orientarte y, según el caso, colaborar en tu proyecto. Una tesis requiere un asesor reconocido por tu universidad, así que cualquier coasesoría formal tendría que coordinarse con un docente local y cumplir los requisitos de la institución. Nuestra disponibilidad se conversa caso por caso.',
    ],
  },
  {
    id: 'computadora-cuantica',
    pregunta: '¿Puedo ejecutar experimentos en una computadora cuántica?',
    respuesta: [
      'Algunos temas contemplan una ejecución pequeña en equipos de IBM a través de la nube. Eso depende del acceso y de las capacidades disponibles en el momento, por lo que todos esos temas pueden completarse también mediante simulación.',
    ],
  },
  {
    id: 'posgrado',
    pregunta: '¿Puede servir para preparar un posgrado?',
    respuesta: [
      'Puede ayudar. Un proyecto de investigación te enseña a leer artículos, formular preguntas y comunicar resultados, y te da algo concreto de qué hablar con posibles supervisores. No garantiza una admisión ni una beca: eso depende de cada programa.',
      'Tampoco hace falta que tu tesis sea del mismo tema que tu futuro posgrado. La de Marc, por ejemplo, trató sobre formas diferenciales en física clásica; se acercó a la cuántica después, mediante cursos y comunidades académicas.',
    ],
  },
  {
    id: 'primer-mensaje',
    pregunta: '¿Qué incluyo en mi primer mensaje?',
    respuesta: [
      'Tu nombre, universidad o centro regional, carrera, materias cursadas e intereses, y el tema que te llamó la atención si ya tienes uno. El <a href="{{raiz}}contacto/">formulario de contacto</a> te ayuda a redactarlo. No envíes documentos de identidad, expedientes, contraseñas ni otros datos sensibles.',
    ],
  },
];
