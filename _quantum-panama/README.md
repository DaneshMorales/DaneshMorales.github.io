# Quantum Panama

Sitio de la iniciativa de Danesh Morales Hashemi y Marc Urcia para fortalecer la investigación teórica en física y matemática en Panamá. Es un sitio estático: no tiene servidor, cuentas, bases de datos, analítica ni servicios externos (el video de YouTube solo se carga si alguien pulsa «Reproducir»).

## Organización dentro de este repositorio

El sitio vive dentro del repositorio de la web personal `DaneshMorales.github.io`, en dos carpetas:

| Carpeta | Qué contiene | ¿Se publica? |
| --- | --- | --- |
| `_quantum-panama/` | Esta carpeta: contenido, plantillas y scripts. Aquí se edita todo. | No. GitHub Pages (Jekyll) ignora las carpetas que empiezan por `_`. |
| `quantum-panama/` | El sitio generado por `npm run publicar`. No se edita a mano: se borra y se vuelve a generar en cada compilación. | Sí, en https://daneshmorales.github.io/quantum-panama/ |

## Ejecutar

Solo hace falta [Node.js](https://nodejs.org/) 18 o posterior. No hay dependencias que instalar.

```sh
cd _quantum-panama
npm run dev        # vista local en http://localhost:4321 que recompila al guardar (en dist/, ignorada por git)
npm run check      # compila en dist/ y comprueba enlaces internos, anclas, títulos y metadatos
npm run check:externos   # además comprueba los enlaces externos (requiere internet)
npm run publicar   # genera ../quantum-panama/ (la versión que se publica) y la comprueba
```

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

## Publicar un cambio

El sitio está en **https://daneshmorales.github.io/quantum-panama/** y se publica junto con la web personal, al hacer push a `main`:

```sh
cd _quantum-panama
npm run publicar                      # regenera ../quantum-panama/ y comprueba los enlaces
cd ..
git add _quantum-panama quantum-panama
git commit -m "Quantum Panama: describe el cambio"
git push
```

Si `npm run publicar` encuentra un enlace roto, se detiene: corrígelo antes de hacer commit. GitHub Pages tarda uno o dos minutos en mostrar el cambio.

El script solo vacía `quantum-panama/` si la generó él (la reconoce por el archivo `.generado-por-quantum-panama`), así que nunca borra otras carpetas de la web personal. Si algún día el sitio se muda a un dominio propio, cambia `url` y `rutaBase` en `sitio.mjs` (por ejemplo, `url: 'https://quantumpanama.org'` y `rutaBase: '/'`).

## Datos pendientes

- Retratos de Danesh y Marc (por ahora, monogramas).
- Invitación al grupo de WhatsApp.
- Decidir si se publican las diapositivas tal como están: incluyen capturas de correos (diapositivas 20 y 21) y el código QR del grupo de WhatsApp (diapositiva 28).

## Fuentes tipográficas

Domitian (titulares, derivada de Palatino) y Source Sans 3 (texto), ambas bajo la SIL Open Font License y alojadas en `src/estatico/fuentes/` con sus licencias.
