# Teoría Panamá

Sitio de la iniciativa de Danesh Morales Hashemi y Marc Urcia para fortalecer la investigación teórica en física y matemática en Panamá. Es un sitio estático: no tiene servidor, cuentas, bases de datos, analítica ni servicios externos (el video de YouTube solo se carga si alguien pulsa «Reproducir»).

## Ejecutar

Solo hace falta [Node.js](https://nodejs.org/) 18 o posterior. No hay dependencias que instalar.

```sh
cd teoria-panama
npm run dev        # compila y abre un servidor en http://localhost:4321 que recompila al guardar
npm run build      # compila el sitio en dist/
npm run check      # compila y comprueba enlaces internos, anclas, títulos y metadatos
npm run check:externos   # además comprueba los enlaces externos (requiere internet)
```

`dist/` es el resultado: una carpeta de archivos HTML, CSS y JS que se puede subir a cualquier alojamiento estático.

## Dónde se edita cada cosa

Todo el texto está en `src/contenido/`. Las plantillas (`src/plantillas/`) solo contienen el marcado y no hace falta tocarlas para cambiar contenido. Los textos admiten HTML sencillo (`<em>`, `<strong>`, `<a>`). Después de editar, `npm run dev` muestra el cambio y `npm run check` confirma que no se rompió nada.

| Qué | Archivo |
| --- | --- |
| Nombre, descriptor, dominio, WhatsApp, menú | `src/contenido/sitio.mjs` |
| Perfiles, correos y fotos | `src/contenido/personas.mjs` |
| Los 14 temas (catálogo, fichas, filtros y contacto) | `src/contenido/temas.mjs` |
| Bibliografía | `src/contenido/referencias.mjs` |
| Recursos, oportunidades y consejos | `src/contenido/recursos.mjs` |
| Charla, capítulos y materiales | `src/contenido/charla.mjs` |
| Preguntas frecuentes | `src/contenido/preguntas.mjs` |
| Textos de portada, visión, equipo, mentoría y contacto | `src/contenido/inicio.mjs`, `vision.mjs`, `equipo.mjs`, `mentoria.mjs`, `contacto.mjs` |
| Estilos | `src/estatico/css/estilos.css` (colores y tipografía al principio, en `:root`) |

Notas útiles:

- **Nombre y descriptor.** Cambiarlos en `sitio.mjs` los cambia en cabecera, pie, títulos de página y asunto de los correos.
- **Fotos.** Copia la imagen (cuadrada, mínimo 400 × 400 px) en `src/estatico/img/personas/` y pon su ruta en `foto` dentro de `personas.mjs`, por ejemplo `foto: 'img/personas/danesh.jpg'`. Sin foto se muestra un monograma con las iniciales.
- **Temas.** Cada tema tiene un `slug` que forma su URL (`/temas/<slug>/`); no lo cambies una vez publicado. Las etiquetas de los filtros se definen al principio de `temas.mjs`. La compilación avisa si falta un campo o si una referencia no existe.
- **Oportunidades con fecha.** Indica `fuente` y `revisado`. Si añades `cierre` (AAAA-MM-DD), el sitio muestra `estadoCerrado` cuando la fecha pasa.
- **WhatsApp.** Pega la invitación en `whatsapp` dentro de `sitio.mjs`; mientras esté vacío no aparece ningún botón.
- **Materiales.** Los PDF están en `src/estatico/materiales/` y se listan en `charla.mjs`. Si falta un archivo, su enlace no se muestra.
- **Documentos de origen.** `referencias/` guarda los documentos con los que se redactó el contenido.

## Publicar

El sitio aún no está publicado. Dos opciones:

1. **Repositorio propio en GitHub (recomendado).** Copia esta carpeta como raíz de un repositorio nuevo, activa *Settings → Pages → Source: GitHub Actions* y ejecuta a mano el workflow «Publicar en GitHub Pages» (`.github/workflows/publicar.yml`). La ruta base del sitio se configura sola.
2. **Cualquier alojamiento estático** (Netlify, Cloudflare Pages, un servidor universitario). Ejecuta `npm run build` y sube el contenido de `dist/`. Si el sitio vive en un subdirectorio, compila con `RUTA_BASE=/subdirectorio/ npm run build` para que la página 404 enlace bien.

Cuando haya dominio definitivo, escríbelo en `url` dentro de `sitio.mjs`: se activarán las URL canónicas, la imagen para redes sociales, `sitemap.xml` y `robots.txt`.

## Datos pendientes

- Retratos de Danesh y Marc (por ahora, monogramas).
- Nombre definitivo de la iniciativa («Teoría Panamá» es provisional).
- Dominio o dirección de publicación.
- Invitación al grupo de WhatsApp.
- Decidir si se publican las diapositivas tal como están: incluyen capturas de correos (diapositivas 20 y 21) y el código QR del grupo de WhatsApp (diapositiva 28).

## Fuentes tipográficas

Domitian (titulares, derivada de Palatino) y Source Sans 3 (texto), ambas bajo la SIL Open Font License y alojadas en `src/estatico/fuentes/` con sus licencias.
