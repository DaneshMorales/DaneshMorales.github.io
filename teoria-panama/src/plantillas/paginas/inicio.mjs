import { inicio as c } from '../../contenido/inicio.mjs';
import { personas } from '../../contenido/personas.mjs';
import { temas, destacados } from '../../contenido/temas.mjs';
import { charla } from '../../contenido/charla.mjs';
import { boton, enlaceFlecha, filaTema, retrato } from '../componentes.mjs';
import { circuitoRepeticion } from '../graficos.mjs';
import { parrafos, fechaLarga } from '../utilidades.mjs';

export const ruta = '';

export function render(ctx) {
  const r = ctx.raiz;
  const temasPortada = destacados.map((slug) => temas.find((t) => t.slug === slug));

  const cuerpo = `
<section class="portada">
  <div class="envoltura portada__rejilla">
    <div class="portada__texto">
      <p class="etiqueta">${c.etiqueta}</p>
      <h1>${c.titulo}</h1>
      <p class="entrada">${c.entrada}</p>
      <div class="acciones">
        ${boton(`${r}temas/`, c.accionPrincipal)}
        ${boton(`${r}contacto/`, c.accionSecundaria, 'secundario')}
      </div>
      <p class="portada__charla"><a href="${r}charla/"><span class="icono-play" aria-hidden="true"></span>${c.accionCharla}</a> <span class="tenue">· ${charla.duracion.toLowerCase()}</span></p>
    </div>
    <figure class="portada__figura lamina">
      ${circuitoRepeticion({ id: 'circuito-portada' })}
      <figcaption>Dos qubits auxiliares comparan la paridad de qubits vecinos sin medir los datos: así se detecta un error sin destruir la información. Es el punto de partida del <a href="${r}temas/codigo-repeticion-ibm/">tema 7</a>.</figcaption>
    </figure>
  </div>
</section>

<section class="seccion" aria-labelledby="quienes">
  <div class="envoltura lateral">
    <h2 id="quienes" class="lateral__titulo">${c.quienes.titulo}</h2>
    <div class="lateral__cuerpo">
      <ul class="duo">
        ${personas.map((p) => `<li class="duo__persona">${retrato(p, ctx)}<span><strong>${p.nombre}</strong><span class="tenue">${p.especialidad}</span></span></li>`).join('')}
      </ul>
      <p>${c.quienes.texto}</p>
      ${enlaceFlecha(`${r}equipo/`, c.quienes.enlace)}
    </div>
  </div>
</section>

<section class="seccion" aria-labelledby="queremos">
  <div class="envoltura lateral">
    <h2 id="queremos" class="lateral__titulo">${c.queremos.titulo}</h2>
    <div class="lateral__cuerpo prosa">
      ${parrafos(c.queremos.texto, ctx)}
      ${enlaceFlecha(`${r}vision/`, c.queremos.enlace)}
    </div>
  </div>
</section>

<section class="seccion" aria-labelledby="participar">
  <div class="envoltura lateral">
    <h2 id="participar" class="lateral__titulo">${c.participar.titulo}</h2>
    <div class="lateral__cuerpo">
      <p class="destacado">${c.participar.texto}</p>
      <dl class="publicos">
        ${c.participar.publicos.map((p) => `<div><dt>${p.titulo}</dt><dd>${p.texto}</dd></div>`).join('')}
      </dl>
      ${enlaceFlecha(`${r}preguntas/`, c.participar.enlace)}
    </div>
  </div>
</section>

<section class="seccion seccion--tinte" aria-labelledby="investigar">
  <div class="envoltura lateral">
    <h2 id="investigar" class="lateral__titulo">${c.investigar.titulo}</h2>
    <div class="lateral__cuerpo">
      <p>${c.investigar.texto}</p>
      <ol class="lista-temas lista-temas--portada">
        ${temasPortada.map((t) => filaTema(t, ctx)).join('')}
      </ol>
      ${boton(`${r}temas/`, c.investigar.enlace, 'secundario')}
    </div>
  </div>
</section>

<section class="seccion" aria-labelledby="primer-paso">
  <div class="envoltura lateral">
    <h2 id="primer-paso" class="lateral__titulo">${c.primerPaso.titulo}</h2>
    <div class="lateral__cuerpo">
      <ol class="pasos-cortos">
        ${c.primerPaso.pasos.map((p) => `<li><h3>${p.titulo}</h3><p>${p.texto}</p></li>`).join('')}
      </ol>
      <div class="acciones">
        ${boton(`${r}contacto/`, c.accionSecundaria)}
        ${enlaceFlecha(`${r}mentoria/`, c.primerPaso.enlace)}
      </div>
    </div>
  </div>
</section>

<section class="banda" aria-labelledby="la-charla">
  <div class="envoltura banda__rejilla">
    <div>
      <p class="etiqueta etiqueta--clara">${c.charla.etiqueta} · ${fechaLarga(charla.fecha)}</p>
      <h2 id="la-charla">${charla.titulo}</h2>
    </div>
    <div>
      <p>${c.charla.texto}</p>
      <div class="acciones">
        ${boton(`${r}charla/`, 'Ver la charla y los materiales', 'claro')}
      </div>
    </div>
  </div>
</section>`;

  return { titulo: '', descripcion: '', cuerpo, clase: 'pagina-inicio' };
}
