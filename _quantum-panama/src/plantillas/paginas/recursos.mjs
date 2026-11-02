import { grupos, consejosTesis, oportunidades, consejosPosgrado } from '../../contenido/recursos.mjs';
import { cabeceraPagina, boton } from '../componentes.mjs';
import { esc, enlaceExterno, fechaLarga, unir } from '../utilidades.mjs';

export const ruta = 'recursos/';

export function render(ctx) {
  const r = ctx.raiz;
  const hoy = ctx.fechaCompilacion;

  const recurso = (x) => `<li class="recurso">
  <h3 class="recurso__nombre">${enlaceExterno(x.url, x.nombre)}</h3>
  <p>${x.descripcion}</p>
  ${unir([
    x.enlaces?.length && `<p class="recurso__enlaces">${x.enlaces.map((e) => enlaceExterno(e.url, `<span lang="en">${e.texto}</span>`)).join(' · ')}</p>`,
    x.idioma && `<p class="recurso__meta">${x.idioma}</p>`,
  ])}
</li>`;

  const oportunidad = (o) => {
    const cerrada = o.cierre && hoy > o.cierre;
    const estado = o.estado
      ? `<p class="oportunidad__estado${cerrada ? ' es-cerrada' : ''}"${o.cierre ? ` data-cierre="${o.cierre}" data-texto-cerrado="${esc(o.estadoCerrado ?? 'El plazo indicado ya pasó. Consulta la página oficial.')}"` : ''}>${cerrada ? o.estadoCerrado : o.estado}</p>`
      : '';
    const fuente = o.fuente
      ? `<p class="recurso__meta">Fuente: ${enlaceExterno(o.fuente, 'página oficial')}, revisada el ${fechaLarga(o.revisado)}.</p>`
      : '';
    return `<li class="oportunidad">
  <h3 class="recurso__nombre">${enlaceExterno(o.url, o.nombre)}</h3>
  ${o.nombreCompleto ? `<p class="oportunidad__completo"${o.idiomaNombre ? ` lang="${o.idiomaNombre}"` : ''}>${o.nombreCompleto}</p>` : ''}
  <p class="recurso__meta">${o.organiza}</p>
  <p>${o.descripcion}</p>
  ${estado}
  ${fuente}
</li>`;
  };

  const consejos = (lista) => `<dl class="consejos">${lista.map((c) => `<div><dt>${c.titulo}</dt><dd>${c.texto}</dd></div>`).join('')}</dl>`;

  const cuerpo = `
${cabeceraPagina({
  etiqueta: 'Investigar',
  titulo: 'Recursos para comenzar',
  entrada: 'Una selección breve, organizada según lo que buscas. Casi todos los recursos están en inglés; es parte del trabajo de investigar y se gana soltura con la práctica.',
  extra: `<nav class="indice" aria-label="Secciones de esta página"><ul>
    <li><a href="#fundamentos">Aprender fundamentos</a></li>
    <li><a href="#explorar">Explorar un área</a></li>
    <li><a href="#tesis">Preparar una tesis</a></li>
    <li><a href="#oportunidades">Buscar oportunidades</a></li>
  </ul></nav>`,
})}

${grupos.map((g, i) => `<section class="seccion${i === 0 ? ' seccion--sin-borde' : ''}" aria-labelledby="${g.id}">
  <div class="envoltura lateral">
    <div class="lateral__titulo">
      <h2 id="${g.id}">${g.titulo}</h2>
      <p class="lateral__nota">${g.entrada}</p>
    </div>
    <ul class="lateral__cuerpo recursos">${g.recursos.map(recurso).join('')}</ul>
  </div>
</section>`).join('')}

<section class="seccion seccion--tinte" aria-labelledby="tesis">
  <div class="envoltura lateral">
    <div class="lateral__titulo">
      <h2 id="tesis">Preparar una tesis</h2>
      <p class="lateral__nota">Consejos de la charla y de nuestra experiencia.</p>
    </div>
    <div class="lateral__cuerpo">
      ${consejos(consejosTesis)}
      <div class="acciones">${boton(`${r}temas/`, 'Ver los temas de tesis', 'secundario')}</div>
    </div>
  </div>
</section>

<section class="seccion" aria-labelledby="oportunidades">
  <div class="envoltura lateral">
    <div class="lateral__titulo">
      <h2 id="oportunidades">Buscar oportunidades</h2>
      <p class="lateral__nota">Escuelas, pasantías e iniciativas mencionadas en la charla. Las fechas cambian cada año: confírmalas siempre en la página oficial.</p>
    </div>
    <div class="lateral__cuerpo">
      <ul class="recursos">${oportunidades.map(oportunidad).join('')}</ul>
      <h3 class="subtitulo subtitulo--separado">Antes de solicitar un posgrado</h3>
      ${consejos(consejosPosgrado)}
    </div>
  </div>
</section>`;

  return {
    titulo: 'Recursos para comenzar',
    descripcion: 'Cursos, libros, herramientas para seguir la literatura, consejos para preparar una tesis y oportunidades de formación en física teórica e información cuántica.',
    cuerpo,
  };
}
