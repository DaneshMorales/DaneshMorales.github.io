// Página de contacto. Los correos se toman de personas.mjs y el grupo de
// WhatsApp de sitio.mjs. No hay servicio de formularios: el formulario solo
// ayuda a redactar un mensaje que el estudiante envía desde su propio correo.

export const contacto = {
  titulo: 'Conversemos sobre tu proyecto',
  entrada:
    'Escríbenos aunque todavía no tengas un tema. Este formulario no envía nada por sí mismo: te ayuda a redactar un mensaje que luego envías desde tu correo.',
  privacidad:
    'Lo que escribes aquí no se guarda ni se envía a ningún servidor. No incluyas documentos de identidad, expedientes, contraseñas ni otros datos sensibles.',

  motivos: [
    { id: 'orientacion', texto: 'Orientación inicial' },
    { id: 'proyecto', texto: 'Colaborar en un proyecto' },
    { id: 'tesis', texto: 'Explorar una posible tesis' },
    { id: 'docente', texto: 'Soy docente y me interesa colaborar' },
    { id: 'posgrado', texto: 'Estudio un posgrado y quiero contribuir a la mentoría' },
  ],

  // Opciones de tema además de los 14 del catálogo.
  temaSinDefinir: 'Aún no tengo un tema',
  temaPropio: 'Quiero proponer otro tema',

  // Intereses que se pueden marcar (además de las etiquetas del catálogo).
  interesesExtra: ['Análisis de datos', 'Otra área de física o matemática'],

  ayudaPreparar: 'Abre tu aplicación de correo con el mensaje ya escrito. Nada se envía hasta que tú lo envíes.',
  ayudaCopiar: 'Copia el asunto y el texto para pegarlos en cualquier correo, por ejemplo en el correo web de tu universidad.',
};
