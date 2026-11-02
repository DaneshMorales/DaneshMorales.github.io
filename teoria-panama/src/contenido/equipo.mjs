// Página «Quiénes somos». Los perfiles están en personas.mjs.

export const equipo = {
  titulo: 'Quiénes somos',
  entrada:
    'Somos dos estudiantes panameños de maestría en la Universidad de Waterloo. Trabajamos en dos caras del mismo problema: entender el ruido de los dispositivos cuánticos y proteger la información de él.',
  aviso:
    'Las afiliaciones describen nuestra formación y nuestro trabajo; no implican que estas instituciones patrocinen la iniciativa.',

  complementariedad: {
    titulo: 'Caracterizar y corregir',
    texto: [
      'Ningún dispositivo cuántico está libre de ruido. <strong>Caracterizar errores</strong> significa medir y modelar ese ruido para saber qué le ocurre a la información y evaluar con qué fiabilidad se ejecuta un proceso. <strong>Corregir errores</strong> significa codificar la información de forma redundante para detectar los errores y revertirlos antes de que la destruyan.',
      'Las dos tareas se necesitan: un código protege mejor cuando sabe contra qué ruido lo hace, y la caracterización indica si la protección funciona.',
    ],
    pasos: [
      { titulo: 'Dispositivo ruidoso', texto: 'Los qubits interactúan con su entorno y las operaciones son imperfectas.' },
      { titulo: 'Caracterizar', texto: '¿Qué ruido hay? ¿Con qué fiabilidad se ejecuta un proceso?', persona: 'marc' },
      { titulo: 'Corregir', texto: 'Codificar, detectar con mediciones de síndrome y recuperar la información.', persona: 'danesh' },
    ],
  },
};
