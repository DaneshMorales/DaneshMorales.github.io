import { equipo as c } from '../../contenido/equipo.mjs';
import { personas } from '../../contenido/personas.mjs';
import { temas } from '../../contenido/temas.mjs';
import { cabeceraPagina, retrato, boton } from '../componentes.mjs';
import { parrafos, esc, enlaceExterno } from '../utilidades.mjs';

export const ruta = 'equipo/';

export function render(ctx) {
  const r = ctx.raiz;
  const nombre = (id) => personas.find((p) => p.id === id)?.nombreCorto;

  const perfil = (p) => `<article class="perfil" aria-labelledby="perfil-${p.id}">
  <header class="perfil__cabecera">
    ${retrato(p, ctx)}
    <div>
      <h2 id="perfil-${p.id}">${p.nombre}</h2>
      <p class="perfil__especialidad">${p.especialidad}</p>
    </div>
  </header>
  <div class="prosa">${parrafos(p.bio, ctx)}</div>
  <h3 class="subtitulo">Formación</h3>
  <ul class="lista-simple">${p.formacion.map((f) => `<li>${f}</li>`).join('')}</ul>
  <h3 class="subtitulo">Intereses</h3>
  <ul class="chips">${p.intereses.map((i) => `<li class="chip chip--interes">${i}</li>`).join('')}</ul>
  ${p.trabajos?.length ? `<h3 class="subtitulo">Trabajos</h3>
  <ul class="lista-simple">${p.trabajos.map((t) => `<li>${t.texto}${t.url ? ` ${enlaceExterno(t.url, t.etiqueta ?? 'Enlace')}` : ''}</li>`).join('')}</ul>` : ''}
  <h3 class="subtitulo">Temas del catálogo cercanos a su trabajo</h3>
  <ul class="lista-simple lista-simple--compacta">${p.temas.map((slug) => {
    const t = temas.find((x) => x.slug === slug);
    return `<li><a href="${r}temas/${t.slug}/">${t.numero}. ${t.titulo}</a></li>`;
  }).join('')}</ul>
  <p class="perfil__contacto"><span class="tenue">Correo:</span> <a href="mailto:${esc(p.correo)}">${esc(p.correo)}</a></p>
</article>`;

  const cuerpo = `
${cabeceraPagina({ etiqueta: 'La iniciativa', titulo: c.titulo, entrada: c.entrada })}

<section class="seccion seccion--sin-borde">
  <div class="envoltura perfiles">
    ${personas.map(perfil).join('')}
  </div>
  <div class="envoltura"><p class="aviso-pequeno">${c.aviso}</p></div>
</section>

<section class="seccion seccion--tinte" aria-labelledby="complementariedad">
  <div class="envoltura lateral">
    <h2 id="complementariedad" class="lateral__titulo">${c.complementariedad.titulo}</h2>
    <div class="lateral__cuerpo">
      <div class="prosa">${parrafos(c.complementariedad.texto, ctx)}</div>
      <ol class="flujo" aria-label="Del ruido a la información protegida">
        ${c.complementariedad.pasos.map((p) => `<li class="flujo__paso">
          <p class="flujo__titulo">${p.titulo}</p>
          <p>${p.texto}</p>
          ${p.persona ? `<p class="flujo__persona">${nombre(p.persona)}</p>` : ''}
        </li>`).join('')}
      </ol>
    </div>
  </div>
</section>

<section class="seccion">
  <div class="envoltura centrado">
    <p class="destacado">¿Te interesa alguna de estas líneas?</p>
    <div class="acciones acciones--centradas">
      ${boton(`${r}contacto/`, 'Conversemos sobre tu proyecto')}
      ${boton(`${r}temas/`, 'Explorar temas de tesis', 'secundario')}
    </div>
  </div>
</section>`;

  return {
    titulo: c.titulo,
    descripcion: 'Danesh Morales Hashemi y Marc Urcia: dos panameños que investigan en corrección y caracterización de errores cuánticos en la Universidad de Waterloo.',
    cuerpo,
  };
}
