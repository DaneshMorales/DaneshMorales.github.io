import { charla as c } from '../../contenido/charla.mjs';
import { cabeceraPagina, boton, enlaceFlecha } from '../componentes.mjs';
import { parrafos, fechaLarga, tamanoArchivo, esc } from '../utilidades.mjs';

export const ruta = 'charla/';

export function render(ctx) {
  const r = ctx.raiz;
  const urlVideo = (inicio = 0) => `https://www.youtube.com/watch?v=${c.youtubeId}${inicio ? `&t=${inicio}s` : ''}`;
  const materiales = c.materiales.filter((m) => ctx.materiales.has(m.archivo));

  const cuerpo = `
${cabeceraPagina({
  etiqueta: `Charla · ${fechaLarga(c.fecha)}`,
  titulo: c.titulo,
  entrada: `${c.ponentes} · ${c.duracion}`,
})}

<section class="seccion seccion--sin-borde">
  <div class="envoltura charla">
    <div class="charla__video">
      <div class="video" data-video="${esc(c.youtubeId)}" data-titulo="${esc(c.titulo)}">
        <a class="video__portada" href="${urlVideo()}" data-video-reproducir>
          <span class="video__titulo">${c.titulo}</span>
          <span class="video__meta">${c.ponentes} · ${fechaLarga(c.fecha)}</span>
          <span class="video__boton"><span class="icono-play" aria-hidden="true"></span>Reproducir la charla</span>
        </a>
      </div>
      <p class="video__aviso">Al reproducir se carga el reproductor de YouTube en modo de privacidad mejorada. También puedes <a href="${urlVideo()}">verla directamente en YouTube</a>.</p>
    </div>
    <div class="charla__texto prosa">
      ${parrafos(c.descripcion, ctx)}
      ${materiales.length ? `<h2 class="subtitulo">Materiales</h2>
      <ul class="descargas">${materiales.map((m) => `<li><a class="descarga" href="${r}${m.archivo}" download>
        <span class="descarga__titulo">${m.titulo}</span>
        <span class="descarga__meta">${m.descripcion} PDF, ${tamanoArchivo(ctx.materiales.get(m.archivo))}.</span>
      </a></li>`).join('')}</ul>` : ''}
    </div>
  </div>
</section>

<section class="seccion" aria-labelledby="capitulos">
  <div class="envoltura lateral">
    <div class="lateral__titulo">
      <h2 id="capitulos">Momentos de la charla</h2>
      <p class="lateral__nota">Tiempos aproximados, tomados del resumen. Al pulsar uno, el video empieza en ese punto.</p>
    </div>
    <ol class="lateral__cuerpo capitulos">
      ${c.capitulos.map((cap) => `<li class="capitulo">
        <a class="capitulo__tiempo" href="${urlVideo(cap.inicio)}" data-inicio="${cap.inicio}"><span class="visualmente-oculto">Ver desde </span>${cap.tiempos.split(' y ')[0].split('–')[0]}</a>
        <div>
          <h3>${cap.titulo}</h3>
          <p>${cap.texto}</p>
          <p class="capitulo__rango tenue">${cap.tiempos}</p>
        </div>
      </li>`).join('')}
    </ol>
  </div>
</section>

<section class="seccion seccion--tinte">
  <div class="envoltura centrado">
    <p class="destacado">¿Te quedaste con alguna pregunta?</p>
    <div class="acciones acciones--centradas">
      ${boton(`${r}contacto/`, 'Escríbenos')}
      ${enlaceFlecha(`${r}temas/`, 'Explorar temas de tesis')}
    </div>
  </div>
</section>`;

  return {
    titulo: 'La charla del 31 de octubre de 2026',
    descripcion: `Grabación, momentos destacados y materiales de «${c.titulo}», de ${c.ponentes}.`,
    cuerpo,
  };
}
