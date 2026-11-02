// Página «Nuestra visión para Panamá».
// Fuentes: diapositivas 2 a 13 y 15 a 18, y resumen de la charla.

export const vision = {
  titulo: 'Nuestra visión para Panamá',
  entrada:
    'Panamá cuenta con instituciones que hacen investigación experimental y aplicada. La investigación teórica en física y matemática puede complementar ese trabajo, formar especialistas y abrir líneas nuevas.',

  contexto: {
    titulo: 'Un punto de partida',
    texto: [
      'Entre los centros que investigan en el país están la Universidad Tecnológica de Panamá (UTP), el Instituto de Investigaciones Científicas y Servicios de Alta Tecnología (INDICASAT AIP), el Instituto Conmemorativo Gorgas de Estudios de la Salud, el Instituto Smithsonian de Investigaciones Tropicales (STRI, por sus siglas en inglés) y el Instituto de Innovación Agropecuaria de Panamá (IDIAP).',
      'Muchos proyectos teóricos pueden comenzar con una computadora, bibliografía y acceso a internet. No necesitan un laboratorio, pero sí estudio, tiempo y alguien con quien discutir las dudas. Ese acompañamiento es lo que queremos facilitar.',
    ],
  },

  objetivos: [
    {
      titulo: 'Investigar desde la licenciatura',
      texto:
        'Facilitar que estudiantes de segundo o tercer año participen en investigación mediante preguntas bien delimitadas y mentoría, sin esperar al posgrado.',
      ejemplo:
        'Partir de un artículo publicado, reproducir uno de sus resultados con una simulación y luego cambiar una sola hipótesis —el modelo de ruido o el número de qubits— para ver qué se mantiene y por qué.',
    },
    {
      titulo: 'Conectar personas e instituciones',
      texto:
        'Conectar estudiantes y docentes de distintas universidades, centros regionales y grupos internacionales. La investigación teórica se presta a colaborar a distancia.',
      ejemplo:
        'Quien estudia en un centro regional puede trabajar con un docente de su universidad y, a la vez, recibir orientación remota de alguien que investiga el tema en otro país, en una coasesoría coordinada.',
    },
    {
      titulo: 'Complementar la investigación experimental',
      texto:
        'Los modelos, las demostraciones, las simulaciones y el análisis de datos ayudan a interpretar experimentos, anticipar resultados y decidir qué vale la pena medir.',
      ejemplo:
        'En su tesis de licenciatura (2023), Rafael Alegretti simuló el flujo de un fluido entre dos cilindros coaxiales en rotación —el fenómeno de Couette–Taylor— e identificó vórtices móviles no reportados en la literatura. Resultados así pueden motivar experimentos.',
    },
    {
      titulo: 'Formar talento',
      texto:
        'Formar personas que puedan contribuir a nuevas líneas de investigación y, con el tiempo, orientar a las siguientes generaciones.',
      ejemplo:
        'Una tesis también puede dejar material para otros: la de Marc Urcia (2023) produjo una herramienta didáctica sobre formas diferenciales en mecánica analítica y electromagnetismo. Quien aprende a investigar durante la licenciatura puede después acompañar a otros estudiantes.',
    },
    {
      titulo: 'Empezar por la información cuántica, sin limitarnos a ella',
      texto:
        'La información cuántica reúne física, matemática, química e ingeniería, y es el área en la que hoy podemos orientar directamente. La visión, sin embargo, abarca la física y la matemática teóricas en general.',
      ejemplo:
        'Un mismo problema —proteger un qubit del ruido— puede abordarse con álgebra lineal y teoría de grupos, con probabilidad y estadística, o con la mecánica cuántica de sistemas abiertos. Por eso el catálogo tiene temas para perfiles de Matemática y de Física.',
    },
  ],

  areas: {
    titulo: 'Investigación teórica con aplicaciones',
    entrada:
      'Estos ejemplos, presentados en la charla, muestran cómo problemas matemáticos o físicos teóricos se conectan con aplicaciones y necesidades reales.',
    lista: [
      {
        id: 'control',
        titulo: 'Teoría de control y sistemas dinámicos',
        texto:
          'Modelos para decidir cómo operar un sistema que cambia en el tiempo: el control de bombas en redes de distribución de agua o la coordinación de energía solar, baterías y riego agrícola. Las mismas herramientas se aplican en epidemiología y robótica.',
        referencias: ['aguaControl', 'microrredAgricola'],
      },
      {
        id: 'geometria',
        titulo: 'Geometría diferencial',
        texto:
          'Curvatura, geodésicas y métricas sirven para planificar trayectorias eficientes de robots. En física, la misma geometría describe órbitas en relatividad general: en su tesis de 2022, Luis Afranchi resolvió numéricamente las ecuaciones orbitales en el espacio-tiempo de Schwarzschild.',
        referencias: ['geodesicasRobotica'],
      },
      {
        id: 'materia',
        titulo: 'Física de materia condensada',
        texto:
          'El diseño teórico de arquitecturas de qubits en semiconductores: cómo disponer y acoplar qubits de espín para reducir la interferencia entre ellos.',
        referencias: ['spinhex'],
      },
      {
        id: 'cuantica',
        titulo: 'Información cuántica',
        texto:
          'La corrección de errores cuánticos: cómo codificar la información para protegerla del ruido y qué necesita saber un decodificador sobre ese ruido.',
        referencias: ['decodificadorMemoria'],
      },
    ],
  },

  semiconductores: {
    etiqueta: 'Por explorar',
    titulo: 'Semiconductores y C-TASC',
    texto: [
      'La UTP alberga, en su Laboratorio de Investigación e Innovación, el Centro de Tecnología Avanzada de Semiconductores (C-TASC). Los qubits de espín en silicio son una de las plataformas que se estudian para la computación cuántica, y su diseño, desarrollo y caracterización combinan materia condensada, información cuántica e ingeniería de semiconductores.',
      'Vemos ahí una posible conexión con la investigación teórica. Hoy no existe una colaboración: explorarla requeriría conocer las capacidades disponibles y formar especialistas.',
    ],
  },

  horizonte: {
    titulo: 'Lo que hacemos ahora y hacia dónde vamos',
    ahora: {
      titulo: 'Ahora',
      lista: [
        'Orientamos a estudiantes que nos escriben, tengan o no un tema.',
        'Ofrecemos un catálogo de 14 temas posibles de tesis en información cuántica.',
        'Reunimos recursos y oportunidades para empezar.',
        'Compartimos la grabación y los materiales de la charla del 31 de octubre de 2026.',
        'Propusimos una próxima reunión, más específica, sobre áreas de la computación cuántica, problemas abiertos y proyectos posibles.',
      ],
    },
    despues: {
      titulo: 'A largo plazo',
      texto:
        'Una comunidad de investigación teórica en Panamá más amplia y estable: más mentores y docentes involucrados, más áreas además de la cuántica, y estudiantes que, tras su propia formación, acompañen a quienes vienen detrás.',
    },
  },
};
