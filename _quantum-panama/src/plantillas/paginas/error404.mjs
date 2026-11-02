import { boton, enlaceFlecha } from '../componentes.mjs';
import { iconoArea } from '../graficos.mjs';

// Se publica como 404.html. Sus enlaces usan la ruta base del sitio
// (no relativa), porque el servidor la muestra en cualquier dirección.
export const ruta = '404.html';

export function render(ctx) {
  const r = ctx.raiz;
  const cuerpo = `
<section class="seccion seccion--sin-borde error">
  <div class="envoltura error__rejilla">
    <div class="error__icono">${iconoArea('control')}</div>
    <div>
      <p class="etiqueta">Error 404</p>
      <h1>No encontramos esta página</h1>
      <p class="entrada">Puede que la dirección esté mal escrita o que la página haya cambiado de lugar.</p>
      <div class="acciones">
        ${boton(r, 'Ir al inicio')}
        ${boton(`${r}temas/`, 'Ver los temas de tesis', 'secundario')}
      </div>
      <p>${enlaceFlecha(`${r}contacto/`, 'Escríbenos si algo no funciona')}</p>
    </div>
  </div>
</section>`;

  return { titulo: 'Página no encontrada', descripcion: 'La página que buscas no existe o cambió de lugar.', cuerpo };
}
