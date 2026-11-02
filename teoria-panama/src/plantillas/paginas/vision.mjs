import { vision as c } from '../../contenido/vision.mjs';
import { cabeceraPagina, referencia, enlaceFlecha, boton } from '../componentes.mjs';
import { iconoArea } from '../graficos.mjs';
import { parrafos } from '../utilidades.mjs';

export const ruta = 'vision/';

export function render(ctx) {
  const r = ctx.raiz;
  const cuerpo = `
${cabeceraPagina({ etiqueta: 'La iniciativa', titulo: c.titulo, entrada: c.entrada })}

<section class="seccion" aria-labelledby="contexto">
  <div class="envoltura lateral">
    <h2 id="contexto" class="lateral__titulo">${c.contexto.titulo}</h2>
    <div class="lateral__cuerpo prosa">${parrafos(c.contexto.texto, ctx)}</div>
  </div>
</section>

<section class="seccion" aria-labelledby="objetivos">
  <div class="envoltura">
    <h2 id="objetivos" class="titulo-seccion">Cinco objetivos</h2>
    <ol class="objetivos">
      ${c.objetivos.map((o) => `<li class="objetivo">
        <h3>${o.titulo}</h3>
        <p>${o.texto}</p>
        <p class="objetivo__ejemplo"><span class="objetivo__etiqueta">Por ejemplo</span> ${o.ejemplo}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>

<section class="seccion seccion--tinte" aria-labelledby="areas">
  <div class="envoltura">
    <h2 id="areas" class="titulo-seccion">${c.areas.titulo}</h2>
    <p class="entrada-seccion">${c.areas.entrada}</p>
    <div class="areas">
      ${c.areas.lista.map((a) => `<article class="area">
        <div class="area__icono">${iconoArea(a.id)}</div>
        <div>
          <h3>${a.titulo}</h3>
          <p>${a.texto}</p>
          <details class="area__refs">
            <summary>${a.referencias.length === 1 ? 'Artículo de ejemplo' : 'Artículos de ejemplo'}</summary>
            <ul class="referencias">${a.referencias.map(referencia).join('')}</ul>
          </details>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="seccion" aria-labelledby="semiconductores">
  <div class="envoltura lateral">
    <div class="lateral__titulo">
      <p class="etiqueta">${c.semiconductores.etiqueta}</p>
      <h2 id="semiconductores">${c.semiconductores.titulo}</h2>
    </div>
    <div class="lateral__cuerpo prosa">${parrafos(c.semiconductores.texto, ctx)}</div>
  </div>
</section>

<section class="seccion" aria-labelledby="horizonte">
  <div class="envoltura">
    <h2 id="horizonte" class="titulo-seccion">${c.horizonte.titulo}</h2>
    <div class="horizonte">
      <div class="horizonte__ahora">
        <h3>${c.horizonte.ahora.titulo}</h3>
        <ul class="lista-marcada">${c.horizonte.ahora.lista.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>
      <div class="horizonte__flecha" aria-hidden="true"></div>
      <div class="horizonte__despues">
        <h3>${c.horizonte.despues.titulo}</h3>
        <p>${c.horizonte.despues.texto}</p>
      </div>
    </div>
    <div class="acciones acciones--separadas">
      ${boton(`${r}temas/`, 'Explorar temas de tesis')}
      ${enlaceFlecha(`${r}equipo/`, 'Quiénes somos')}
    </div>
  </div>
</section>`;

  return {
    titulo: c.titulo,
    descripcion: 'Cinco objetivos para fortalecer la investigación teórica en física y matemática en Panamá, ejemplos de áreas con aplicaciones y lo que estamos construyendo ahora.',
    cuerpo,
  };
}
