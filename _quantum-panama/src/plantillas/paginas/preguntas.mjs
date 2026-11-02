import { preguntas } from '../../contenido/preguntas.mjs';
import { cabeceraPagina, boton } from '../componentes.mjs';
import { parrafos } from '../utilidades.mjs';

export const ruta = 'preguntas/';

export function render(ctx) {
  const r = ctx.raiz;
  const cuerpo = `
${cabeceraPagina({
  etiqueta: 'Participar',
  titulo: 'Preguntas frecuentes',
  entrada: 'Respuestas breves a lo que más nos preguntan. Si tu caso es distinto, escríbenos: la mayoría de las respuestas dependen del proyecto.',
})}

<section class="seccion seccion--sin-borde">
  <div class="envoltura lateral">
    <nav class="lateral__titulo indice indice--vertical" aria-label="Preguntas">
      <ul>${preguntas.map((p) => `<li><a href="#${p.id}">${p.pregunta}</a></li>`).join('')}</ul>
    </nav>
    <div class="lateral__cuerpo preguntas">
      ${preguntas.map((p) => `<section class="pregunta" aria-labelledby="${p.id}">
        <h2 id="${p.id}">${p.pregunta}</h2>
        <div class="prosa">${parrafos(p.respuesta, ctx)}</div>
      </section>`).join('')}
      <div class="acciones">${boton(`${r}contacto/`, 'Hacer otra pregunta')}</div>
    </div>
  </div>
</section>`;

  return {
    titulo: 'Preguntas frecuentes',
    descripcion: '¿Necesito saber cuántica? ¿Puedo participar desde un centro regional? ¿Puedo hacer mi tesis con ustedes? Respuestas breves para estudiantes y docentes.',
    cuerpo,
  };
}
