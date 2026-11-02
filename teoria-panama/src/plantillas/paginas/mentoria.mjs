import { mentoria as c } from '../../contenido/mentoria.mjs';
import { cabeceraPagina, boton, enlaceFlecha } from '../componentes.mjs';

export const ruta = 'mentoria/';

export function render(ctx) {
  const r = ctx.raiz;
  const cuerpo = `
${cabeceraPagina({ etiqueta: 'Participar', titulo: c.titulo, entrada: c.entrada })}

<section class="seccion seccion--sin-borde" aria-labelledby="proceso">
  <div class="envoltura lateral">
    <h2 id="proceso" class="lateral__titulo">${c.proceso.titulo}</h2>
    <div class="lateral__cuerpo">
      <ol class="proceso">
        ${c.proceso.pasos.map((p) => `<li class="proceso__paso"><h3>${p.titulo}</h3><p>${p.texto}</p></li>`).join('')}
      </ol>
      <div class="acciones">${boton(`${r}contacto/`, 'Empezar: escríbenos')}</div>
    </div>
  </div>
</section>

<section class="seccion seccion--tinte" aria-labelledby="modalidades">
  <div class="envoltura">
    <h2 id="modalidades" class="titulo-seccion">${c.modalidades.titulo}</h2>
    <p class="entrada-seccion">${c.modalidades.entrada}</p>
    <div class="tabla-contenedor">
      <table class="tabla-modalidades">
        <thead>
          <tr><th scope="col">Modalidad</th>${c.modalidades.columnas.map((col) => `<th scope="col">${col}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${c.modalidades.lista.map((m) => `<tr><th scope="row">${m.titulo}</th>${m.filas.map((celda, i) => `<td data-etiqueta="${c.modalidades.columnas[i]}">${celda}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="seccion" aria-labelledby="claridad">
  <div class="envoltura lateral">
    <h2 id="claridad" class="lateral__titulo">${c.claridad.titulo}</h2>
    <div class="lateral__cuerpo">
      <ul class="lista-marcada">${c.claridad.lista.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="seccion" aria-labelledby="otros">
  <div class="envoltura lateral">
    <h2 id="otros" class="lateral__titulo">Docentes y estudiantes de posgrado</h2>
    <div class="lateral__cuerpo dos-columnas">
      ${c.otros.map((o) => `<div><h3>${o.titulo}</h3><p>${o.texto}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="seccion">
  <div class="envoltura centrado">
    <div class="acciones acciones--centradas">
      ${boton(`${r}contacto/`, 'Conversemos sobre tu proyecto')}
      ${enlaceFlecha(`${r}preguntas/`, 'Preguntas frecuentes')}
    </div>
  </div>
</section>`;

  return {
    titulo: c.titulo,
    descripcion: 'Cómo empezar aunque no tengas un tema: un proceso en cuatro pasos y tres formas de colaborar, desde la orientación inicial hasta una posible coasesoría de tesis.',
    cuerpo,
  };
}
