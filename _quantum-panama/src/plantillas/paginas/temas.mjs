import { temas, intereses, tiposTrabajo, productos } from '../../contenido/temas.mjs';
import { cabeceraPagina, migas, filaTema, etiquetasTema, referencia, boton, enlaceFlecha, nota } from '../componentes.mjs';
import { redTorica } from '../graficos.mjs';
import { texto } from '../utilidades.mjs';

const avisoPuntoDePartida =
  'Este tema es una propuesta inicial: el alcance se ajusta contigo según tu preparación, tu tiempo y los requisitos de tu universidad. No es una plaza abierta ni garantiza un resultado novedoso; parte del trabajo consiste en situarlo en la literatura.';

// Catálogo: /temas/
export const catalogo = {
  ruta: 'temas/',
  render(ctx) {
    const r = ctx.raiz;
    const casillas = (nombre, opciones) => Object.entries(opciones).map(([valor, etiqueta]) =>
      `<label class="filtro"><input type="checkbox" name="${nombre}" value="${valor}"><span>${etiqueta}</span></label>`).join('');

    const cuerpo = `
${cabeceraPagina({
  etiqueta: 'Investigar',
  titulo: 'Temas posibles de tesis',
  entrada: `${temas.length} puntos de partida en información cuántica, pensados para una tesis de licenciatura. Cada uno parte de una pregunta acotada y se ajusta a tu preparación, tu tiempo y los requisitos de tu universidad.`,
})}

<section class="seccion seccion--sin-borde">
  <div class="envoltura catalogo">
    <div class="catalogo__principal">
      <form class="filtros" data-filtros hidden role="search" aria-label="Buscar y filtrar temas">
        <div class="filtros__busqueda">
          <label for="buscar-temas">Buscar en los temas</label>
          <input id="buscar-temas" type="search" name="q" placeholder="Por ejemplo: Haar, lectura, topología" autocomplete="off" spellcheck="false">
        </div>
        <fieldset class="filtros__grupo">
          <legend>Encaja con</legend>
          <div class="filtros__opciones">${casillas('interes', intereses)}</div>
        </fieldset>
        <fieldset class="filtros__grupo">
          <legend>Tipo de trabajo</legend>
          <div class="filtros__opciones">${casillas('tipo', tiposTrabajo)}</div>
        </fieldset>
        <div class="filtros__estado">
          <p data-conteo role="status">Se muestran los ${temas.length} temas.</p>
          <button class="boton-texto" type="button" data-limpiar hidden>Limpiar filtros</button>
        </div>
      </form>

      <ol class="lista-temas" data-catalogo>
        ${temas.map((t) => filaTema(t, ctx, { nivel: 'h2', datos: true })).join('')}
      </ol>

      <div class="sin-resultados" data-sin-resultados hidden>
        <p class="destacado">Ningún tema coincide con la búsqueda y los filtros elegidos.</p>
        <p><button class="boton boton--secundario" type="button" data-limpiar>Limpiar filtros</button></p>
        <p>¿Tienes otra idea? <a href="${r}contacto/?tema=otro">Propón tu propio tema</a>.</p>
      </div>
    </div>

    <aside class="catalogo__lateral">
      <figure class="lamina lamina--pequena">
        ${redTorica({ id: 'toro-catalogo' })}
        <figcaption>Código tórico (<a href="${r}temas/codigo-torico/">tema 3</a>): los bordes opuestos de la red se pegan como en un toro. Un ciclo que rodea una cara es producto de estabilizadores y no daña la información; uno que da la vuelta completa actúa como operador lógico.</figcaption>
      </figure>
      <div class="catalogo__ayuda">
        <h2 class="subtitulo">Cómo leer el catálogo</h2>
        <ul class="lista-simple">
          <li><strong>Encaja con</strong> indica para qué intereses está pensado cada tema.</li>
          <li><strong>Tipo de trabajo</strong> distingue teoría, simulación, análisis de datos y una posible ejecución en IBM.</li>
          <li><strong>Buena entrada</strong> marca los temas que el documento original recomienda para empezar.</li>
        </ul>
        <p>${avisoPuntoDePartida}</p>
        ${ctx.materiales.has('materiales/temas-tesis-informacion-cuantica.pdf') ? `<p>${enlaceFlecha(`${r}materiales/temas-tesis-informacion-cuantica.pdf`, 'Descargar los 14 temas en PDF')}</p>` : ''}
        <p>¿Ninguno te convence? <a href="${r}contacto/?tema=otro">Cuéntanos tu idea</a>.</p>
      </div>
    </aside>
  </div>
</section>`;

    return {
      titulo: 'Temas posibles de tesis',
      descripcion: 'Catorce temas de tesis de licenciatura en información cuántica, con su pregunta, alcance, preparación útil y bibliografía. Busca y filtra por interés y tipo de trabajo.',
      cuerpo,
    };
  },
};

// Fichas: /temas/<slug>/
export const fichas = temas.map((tema, i) => ({
  ruta: `temas/${tema.slug}/`,
  render(ctx) {
    const r = ctx.raiz;
    const anterior = temas[i - 1], siguiente = temas[i + 1];
    const contactar = `${r}contacto/?tema=${tema.slug}`;

    const cuerpo = `
<article class="ficha">
${cabeceraPagina({
  migas: migas([[r, 'Inicio'], [`${r}temas/`, 'Temas'], ['', `Tema ${tema.numero}`]]),
  etiqueta: `Tema ${tema.numero} de ${temas.length}`,
  titulo: tema.titulo,
  extra: `<p class="ficha__pregunta"><span class="ficha__pregunta-etiqueta">Pregunta de investigación</span>${tema.pregunta}</p>
    ${etiquetasTema(tema)}
    <div class="acciones">${boton(contactar, 'Me interesa este tema')}</div>`,
})}

<div class="envoltura ficha__rejilla">
  <section class="ficha__resumen" aria-labelledby="pocas-palabras">
    <h2 id="pocas-palabras">En pocas palabras</h2>
    <p class="destacado">${tema.resumen}</p>
  </section>

  <aside class="ficha__lateral" aria-label="Preparación y encaje">
    <section class="ficha__bloque" aria-labelledby="preparacion">
      <h2 id="preparacion">Materias y conocimientos útiles</h2>
      <h3 class="subtitulo">Para empezar</h3>
      <ul class="lista-simple">${tema.preparacion.map((p) => `<li>${p}</li>`).join('')}</ul>
      <h3 class="subtitulo">Se aprende durante el proyecto</h3>
      <ul class="lista-simple">${tema.seAprende.map((p) => `<li>${p}</li>`).join('')}</ul>
      <p class="ficha__perfil"><span class="tenue">Pensado para:</span> ${tema.perfil}</p>
      ${tema.entrada ? `<p class="ficha__entrada"><strong>Buena entrada.</strong> ${tema.entrada}</p>` : ''}
    </section>
    <section class="ficha__bloque" aria-labelledby="encaje">
      <h2 id="encaje">Encaja con</h2>
      <ul class="chips">${tema.intereses.map((k) => `<li class="chip chip--interes">${intereses[k]}</li>`).join('')}</ul>
      <h2 class="ficha__bloque-titulo">Tipo de trabajo</h2>
      <ul class="chips">${tema.tipos.map((k) => `<li class="chip chip--tipo${k === 'ibm' ? ' chip--ibm' : ''}">${tiposTrabajo[k]}</li>`).join('')}</ul>
    </section>
    <div class="ficha__bloque ficha__accion">
      <p>¿Te interesa? Escríbenos con este tema ya indicado en el mensaje.</p>
      ${boton(contactar, 'Me interesa este tema')}
    </div>
  </aside>

  <div class="ficha__principal">
    <section aria-labelledby="que-harias">
      <h2 id="que-harias">Qué harías</h2>
      <p>${tema.trabajo}</p>
      <h3 class="subtitulo">Cómo se limita el alcance</h3>
      <ul class="lista-marcada">${tema.alcance.map((a) => `<li>${a}</li>`).join('')}</ul>
    </section>

    <section aria-labelledby="producto">
      <h2 id="producto">Producto esperado</h2>
      <p>${tema.producto}</p>
      <ul class="chips" aria-label="Tipo de producto">${tema.productos.map((p) => `<li class="chip chip--producto">${productos[p]}</li>`).join('')}</ul>
    </section>

    ${tema.ibm ? nota(`<p>${tema.ibm}</p>`, { titulo: 'Sobre la ejecución en IBM', clase: 'nota--aviso' }) : ''}

    <section aria-labelledby="bibliografia">
      <h2 id="bibliografia">Artículos y recursos iniciales</h2>
      <ol class="referencias">${tema.referencias.map(referencia).join('')}</ol>
    </section>

    ${nota(`<p>${avisoPuntoDePartida}</p>`, { titulo: 'Un punto de partida' })}

    <div class="ficha__bloque ficha__accion ficha__accion--final">
      <p>¿Te interesa? Escríbenos con este tema ya indicado en el mensaje.</p>
      ${boton(contactar, 'Me interesa este tema')}
    </div>
  </div>
</div>

<nav class="envoltura ficha__vecinos" aria-label="Otros temas">
  ${anterior ? `<a class="vecino vecino--anterior" href="${r}temas/${anterior.slug}/"><span class="vecino__etiqueta">← Tema ${anterior.numero}</span><span class="vecino__titulo">${anterior.titulo}</span></a>` : '<span></span>'}
  <a class="vecino vecino--todos" href="${r}temas/">Todos los temas</a>
  ${siguiente ? `<a class="vecino vecino--siguiente" href="${r}temas/${siguiente.slug}/"><span class="vecino__etiqueta">Tema ${siguiente.numero} →</span><span class="vecino__titulo">${siguiente.titulo}</span></a>` : '<span></span>'}
</nav>
</article>`;

    return {
      titulo: tema.titulo,
      descripcion: `Tema ${tema.numero} de tesis en información cuántica. ${texto(tema.pregunta)} ${texto(tema.resumen)}`,
      cuerpo,
    };
  },
}));
