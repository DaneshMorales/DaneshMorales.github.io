// Página «Mentoría y asesoría».

export const mentoria = {
  titulo: 'Mentoría y asesoría',
  entrada:
    'Puedes escribirnos aunque todavía no tengas un tema definido. La primera conversación sirve justamente para eso: conocer tus intereses y ver qué tipo de proyecto tendría sentido para ti.',

  proceso: {
    titulo: 'Cómo empezamos',
    pasos: [
      {
        titulo: 'Cuéntanos de ti',
        texto: 'Comparte tus intereses, tu carrera y universidad, las materias que has cursado y cualquier experiencia relevante: un curso, un proyecto, algo que hayas programado.',
      },
      {
        titulo: 'Conversamos sobre preparación y tiempo',
        texto: 'Hablamos de lo que ya sabes, de lo que tendrías que aprender y del tiempo que puedes dedicar cada semana. No hace falta saberlo todo para empezar.',
      },
      {
        titulo: 'Delimitamos una pregunta y un primer ejercicio',
        texto: 'Elegimos una pregunta acotada y un primer ejercicio concreto: leer una sección de un artículo, completar una demostración o reproducir una simulación.',
      },
      {
        titulo: 'Evaluamos la viabilidad',
        texto: 'Revisamos si el proyecto es viable con el tiempo y los recursos disponibles. Si va a convertirse en tesis, lo coordinamos con un docente de tu universidad y según sus requisitos.',
      },
    ],
  },

  modalidades: {
    titulo: 'Tres formas de colaborar',
    entrada: 'No todas las conversaciones terminan en una tesis, y está bien. Distinguimos tres modalidades:',
    columnas: ['Para qué sirve', 'Qué implica', 'Qué requiere'],
    lista: [
      {
        titulo: 'Orientación inicial',
        filas: [
          'Aclarar intereses, elegir lecturas, delimitar una pregunta o preparar una solicitud a un programa.',
          'Una o varias conversaciones, normalmente por videollamada.',
          'Solo tus ganas de explorar.',
        ],
      },
      {
        titulo: 'Colaboración en un proyecto',
        filas: [
          'Trabajar de forma sostenida sobre una pregunta concreta, antes de una tesis o independientemente de ella.',
          'Reuniones a distancia y revisión de avances durante un periodo acordado.',
          'Tiempo semanal estable y una pregunta viable.',
        ],
      },
      {
        titulo: 'Coasesoría formal',
        filas: [
          'Que el proyecto sea tu tesis de licenciatura.',
          'Coordinación con un docente de tu universidad como asesor o coasesor.',
          'Que tu universidad lo permita; los requisitos, la inscripción y la evaluación dependen de cada institución.',
        ],
      },
    ],
  },

  claridad: {
    titulo: 'Lo que conviene saber',
    lista: [
      'Nuestra disponibilidad se conversa caso por caso: también somos estudiantes de posgrado, con nuestras propias investigaciones.',
      'Un tema del catálogo no es una plaza abierta. Es un punto de partida que ajustamos contigo.',
      'No podemos garantizar publicaciones, admisión a un posgrado, financiación ni reconocimiento académico. Lo que sí ofrecemos es orientación, revisión de avances y conexión con recursos y personas.',
      'Cualquier asesoría formal requiere coordinación con tu universidad.',
    ],
  },

  otros: [
    {
      titulo: 'Si eres docente',
      texto: 'Si te interesa coasesorar, proponer preguntas o conectar a tus estudiantes con estos temas, escríbenos. La coordinación con la universidad es indispensable para cualquier tesis.',
    },
    {
      titulo: 'Si haces un posgrado',
      texto: 'Si estudias un posgrado en física o matemática y quieres contribuir a la mentoría, en cuántica o en otras áreas, nos interesa conversar.',
    },
  ],
};
