import { contacto as c } from '../../contenido/contacto.mjs';
import { personas } from '../../contenido/personas.mjs';
import { temas, intereses } from '../../contenido/temas.mjs';
import { sitio } from '../../contenido/sitio.mjs';
import { cabeceraPagina } from '../componentes.mjs';
import { esc } from '../utilidades.mjs';

export const ruta = 'contacto/';

export function render(ctx) {
  const listaIntereses = [...Object.values(intereses), ...c.interesesExtra];
  const campo = (id, etiqueta, { tipo = 'text', ayuda = '', requerido = false, autocompletar = 'off', area = false, filas = 4 } = {}) => `
    <div class="campo">
      <label for="${id}">${etiqueta}${requerido ? ' <span class="requerido">(obligatorio)</span>' : ' <span class="opcional">(opcional)</span>'}</label>
      ${ayuda ? `<p class="campo__ayuda" id="${id}-ayuda">${ayuda}</p>` : ''}
      ${area
        ? `<textarea id="${id}" name="${id}" rows="${filas}"${ayuda ? ` aria-describedby="${id}-ayuda"` : ''}></textarea>`
        : `<input id="${id}" name="${id}" type="${tipo}" autocomplete="${autocompletar}"${requerido ? ' required aria-required="true"' : ''}${ayuda ? ` aria-describedby="${id}-ayuda"` : ''}>`}
    </div>`;

  const cuerpo = `
${cabeceraPagina({ etiqueta: 'Participar', titulo: c.titulo, entrada: c.entrada })}

<section class="seccion seccion--sin-borde">
  <div class="envoltura contacto">
    <div class="contacto__formulario">
      <form class="formulario" data-contacto data-requiere-js data-sitio="${esc(sitio.nombre)}" novalidate>
        <fieldset>
          <legend>Sobre ti</legend>
          ${campo('nombre', 'Nombre', { requerido: true, autocompletar: 'name' })}
          <div class="campos-dobles">
            ${campo('universidad', 'Universidad o centro regional', { autocompletar: 'organization' })}
            ${campo('carrera', 'Carrera')}
          </div>
          ${campo('nivel', 'Año o semestre que cursas', { ayuda: 'Por ejemplo: tercer año, último semestre, egresado.' })}
          ${campo('formacion', 'Materias cursadas y experiencia relevante', { area: true, ayuda: 'Cursos, proyectos o programación que te parezcan útiles. No hace falta adjuntar nada.' })}
        </fieldset>

        <fieldset>
          <legend>Qué te interesa</legend>
          <div class="campo">
            <label for="tema">Tema</label>
            <select id="tema" name="tema">
              <option value="sin-tema">${c.temaSinDefinir}</option>
              <optgroup label="Temas del catálogo">
                ${temas.map((t) => `<option value="${t.slug}">${t.numero}. ${esc(t.titulo)}</option>`).join('')}
              </optgroup>
              <option value="otro">${c.temaPropio}</option>
            </select>
          </div>
          <fieldset class="grupo-opciones">
            <legend>Motivo del mensaje</legend>
            ${c.motivos.map((m, i) => `<label class="opcion"><input type="radio" name="motivo" value="${m.id}"${i === 0 ? ' checked' : ''}><span>${m.texto}</span></label>`).join('')}
          </fieldset>
          <fieldset class="grupo-opciones">
            <legend>Áreas de interés <span class="opcional">(opcional)</span></legend>
            ${listaIntereses.map((i) => `<label class="opcion"><input type="checkbox" name="intereses" value="${esc(i)}"><span>${i}</span></label>`).join('')}
          </fieldset>
        </fieldset>

        <fieldset>
          <legend>Tu mensaje</legend>
          ${campo('mensaje', 'Mensaje', { area: true, filas: 5, ayuda: 'Qué te gustaría conversar, qué dudas tienes o cuánto tiempo podrías dedicar.' })}
          <fieldset class="grupo-opciones">
            <legend>Para</legend>
            ${personas.map((p) => `<label class="opcion"><input type="checkbox" name="para" value="${esc(p.correo)}" data-nombre="${esc(p.nombreCorto)}" checked><span>${p.nombre}</span></label>`).join('')}
          </fieldset>
        </fieldset>

        <div class="vista-previa" aria-labelledby="vista-previa-titulo">
          <h2 id="vista-previa-titulo" class="subtitulo">Vista previa del mensaje</h2>
          <p class="vista-previa__linea"><span class="tenue">Para:</span> <span data-vista-para></span></p>
          <p class="vista-previa__linea"><span class="tenue">Asunto:</span> <span data-vista-asunto></span></p>
          <label class="visualmente-oculto" for="vista-cuerpo">Texto del mensaje</label>
          <textarea id="vista-cuerpo" class="vista-previa__cuerpo" rows="12" readonly></textarea>
        </div>

        <div class="formulario__acciones">
          <div class="formulario__accion">
            <button class="boton boton--primario" type="button" data-preparar>Preparar correo</button>
            <p class="campo__ayuda">${c.ayudaPreparar}</p>
          </div>
          <div class="formulario__accion">
            <button class="boton boton--secundario" type="button" data-copiar>Copiar mensaje</button>
            <p class="campo__ayuda">${c.ayudaCopiar}</p>
          </div>
        </div>
        <p class="estado" data-estado role="status" aria-live="polite"></p>
      </form>
      <noscript><p class="nota">Este formulario necesita JavaScript. Puedes escribirnos directamente a cualquiera de los correos de esta página.</p></noscript>
    </div>

    <aside class="contacto__lateral">
      <div class="contacto__bloque">
        <h2 class="subtitulo">Escríbenos directamente</h2>
        <ul class="lista-simple">
          ${personas.map((p) => `<li><strong>${p.nombre}</strong><br><a href="mailto:${esc(p.correo)}">${esc(p.correo)}</a></li>`).join('')}
        </ul>
      </div>
      <div class="contacto__bloque">
        <h2 class="subtitulo">Qué incluir</h2>
        <p>Nombre, universidad, carrera, materias cursadas, intereses y, si ya lo tienes, el tema que te llamó la atención.</p>
        <p class="tenue">${c.privacidad}</p>
      </div>
      ${sitio.whatsapp ? `<div class="contacto__bloque">
        <h2 class="subtitulo">Comunidad</h2>
        <p>Grupo de WhatsApp para estudiantes interesados en computación cuántica en Panamá, anunciado en la charla.</p>
        <a class="boton boton--secundario" href="${esc(sitio.whatsapp)}" rel="noopener">Unirme al grupo de WhatsApp</a>
      </div>` : ''}
    </aside>
  </div>
</section>`;

  return {
    titulo: 'Contacto',
    descripcion: 'Escríbenos aunque no tengas un tema: el formulario te ayuda a preparar un correo con tu universidad, carrera, intereses y el tema que te interesa.',
    cuerpo,
  };
}
