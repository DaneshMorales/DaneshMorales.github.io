# Guía para el agente: elegir tema y escribir carruseles

Esta guía es para un agente que prepara carruseles de Instagram para
**@quantum_danesh**. Cada post es un documento Beamer (LaTeX) con tipografía
Palatino, páginas 4:5 que se exportan a 1080 × 1350 px, y textos en español.
Hay **11 temas** y todos usan los mismos comandos, así que solo cambia la
línea `\usetheme{…}`.

Tu trabajo, para cada post:

1. Elegir un tema con las reglas de la sección 1.
2. Escribir el `.tex` siguiendo las secciones 3 y 4.
3. Compilar y revisar con la lista de la sección 5.
4. Entregar en el formato de la sección 6.

Los archivos están en el repositorio `DaneshMorales/DaneshMorales.github.io`,
rama `claude/eager-edison-pm23zw`, carpeta `_instagram/`. Para compilar hacen
falta `igpost.sty` y el `beamertheme<tema>.sty` elegido junto al `.tex`.
Cada tema tiene un post de ejemplo (`example-<tema>.tex`): úsalo como modelo
de estilo y de cantidad de contenido por diapositiva.

---

## 1. Cómo elegir el tema

Aplica las reglas en este orden y quédate con la primera que encaje.

### Regla 1: la serie manda

Si el post pertenece a una serie que ya tiene tema, usa ese tema aunque
otro encaje un poco mejor. La coherencia visual de una serie importa más.

| Serie | Tema |
|---|---|
| Qubits desde cero | `igsignature` |
| Notas de artículos | `igpreprint` |
| Ejercicios resueltos | `ignotebook` |
| Quiz cuántico | `igflashcard` |
| Historia cuántica | `igarchive` |
| Fórmula destacada | `ignocturne` |
| Protocolos | `igblueprint` |

Si el usuario crea una serie nueva, elige su tema con la regla 2 y
mantenlo en todos los posts de esa serie.

### Regla 2: el formato principal del post

Pregúntate qué es el post *sobre todo*:

| Si el post es… | Tema |
|---|---|
| El resumen de **un artículo concreto** (autores, revista, año) | `igpreprint` |
| Una **pregunta al público** con opciones y respuesta | `igflashcard` |
| Un **ejercicio** con enunciado y solución por apartados | `ignotebook` |
| Una **derivación** algebraica que se construye línea a línea | `igchalkboard` |
| Un **protocolo, algoritmo o circuito** con pasos numerados, o con una gráfica de datos | `igblueprint` |
| Una **definición formal y un teorema**, quizá con demostración corta | `igtextbook` |
| **Historia**: fechas, personas, citas, línea de tiempo | `igarchive` |
| **Una sola fórmula** analizada a fondo, término a término | `ignocturne` |
| **Un concepto** con varias propiedades, una idea por diapositiva y poco texto | `igposter` |
| **Intuición para principiantes**, con analogías y casi sin formalismo | `igsorbet` |
| Un **experimento o diagrama** explicado con dibujos (estilo de la serie principal) | `igsignature` |

### Regla 3: desempates

Si dos temas encajan por igual:

- **Público.** Principiantes: `igsorbet`, `igsignature`, `igposter`.
  Gente con formación: `igpreprint`, `igtextbook`, `ignocturne`.
- **Densidad de matemáticas.** Mucha: `ignocturne`, `igchalkboard`,
  `igtextbook`. Poca: `igposter`, `igsorbet`.
- **Texto por diapositiva.** Mucho: `igpreprint`, `igtextbook`.
  Muy poco: `igposter`.
- **Diagramas TikZ.** `igsignature` o `igblueprint`.
- **Variedad.** Si el post no es de una serie, evita repetir el tema de
  los dos posts anteriores cuando otro encaje casi igual de bien.

### Regla 4: si sigues sin decidir

Usa `igsignature`: es el estilo de la casa.

### Ejemplos de decisión

| Idea de post | Tema | Por qué |
|---|---|---|
| "Resumen de Google Willow (Nature 2024)" | `igpreprint` | Un artículo concreto |
| "¿Cuántos parámetros reales tiene un qubit? (A) 1 (B) 2 (C) 3" | `igflashcard` | Pregunta con opciones |
| "Calcula la matriz de Choi del canal de dephasing" | `ignotebook` | Ejercicio con solución |
| "Deriva la ecuación de Lindblad para un qubit" | `igchalkboard` | Derivación línea a línea |
| "El algoritmo de Grover en 4 pasos" | `igblueprint` | Procedimiento numerado con circuito |
| "Teorema de Stinespring con demostración" | `igtextbook` | Definición, teorema y prueba |
| "1982: el experimento de Aspect" | `igarchive` | Historia |
| "La fórmula de Born, a fondo" | `ignocturne` | Una fórmula, término a término |
| "Qué es un observable, en 5 diapositivas" | `igposter` | Un concepto, una idea por página |
| "¿Qué es la superposición? (sin matemáticas)" | `igsorbet` | Intuición para principiantes |
| "Qubits desde cero 06: la esfera de Bloch" | `igsignature` | Serie principal |

---

## 2. Qué ofrece cada tema

Úsalo para aprovechar los rasgos propios de cada tema. Lo que no está en
la lista funciona igual en todos.

**`igsignature`**: oscuro, líneas turquesa y realces ámbar (el estilo
actual de la cuenta).
- `\hl{…}` pinta el texto en ámbar, sin fondo; `\key{…}` lo pinta en turquesa.
- `\mhl{…}` hace una etiqueta ámbar, como las de "50 %".
- El contenido queda centrado verticalmente.
- Encaja con diagramas TikZ: líneas `igAccentB`, cajas `fill=igPanel`,
  etiquetas `fill=igHL, text=igAccent`.
- El kicker es una etiqueta corta en mayúsculas ("El experimento").

**`igpreprint`**: página de revista científica.
- Texto justificado.
- Usa `equation` para tener ecuaciones numeradas.
- `\coverblurb{…}` sale como "Resumen" en la portada (máx. 60 palabras).
- El título de portada es el título original del artículo (puede ir en
  inglés); el subtítulo lleva autores y revista.
- Kicker: `\S1`, `\S2`, …
- Referencias al final, en `{\footnotesize\color{igMuted} … \par}`.

**`igchalkboard`**: pizarra.
- Pensado para `align*` con `\uncover<n->{…}` en cada línea: cada línea
  nueva es una diapositiva más.
- Pon las derivaciones en `{\large …}`.
- `\hl` es un subrayado de tiza amarilla; `\mhl` dibuja una caja de tiza.
- Kicker: "Datos", "Derivación", "Verificación", "Tarea".

**`ignocturne`**: azul noche con oro y títulos en cursiva centrados.
- Brilla con `\explain<2->{…}{…}`, notas que aparecen una por diapositiva.
- `\keyeq` sale en un marco dorado.
- Máximo dos ecuaciones grandes por diapositiva.

**`igblueprint`**: plano de ingeniería.
- `enumerate` sale como globos numerados.
- Gráficas con `\begin{axis}[ig axis, …]`, `\addplot[ig curve, igAccentB]`
  y `\addplot[ig data]`.
- El cajetín inferior quita espacio: pon menos contenido por diapositiva
  que en otros temas.
- Kicker: "Paso 01", "Paso 02", … o "Especificación".
- `\igissue` admite códigos como `RB-01`.

**`ignotebook`**: cuaderno cuadriculado.
- Kicker: "Ejercicio 2.4", "Apartado (a)".
- Usa `\begin{enumerate}[(a)]` para los apartados.
- `\aside{\checkmark\ correcto}` añade una nota en boli rojo al margen derecho.
- `\keyeq` es la respuesta enmarcada a mano.
- `notebox[Ojo]` es un pósit para errores típicos.

**`igposter`**: estilo suizo, una idea por diapositiva.
- Patrón por diapositiva: `{\huge \[ … \]}%` y luego `{\large una frase.\par}`.
- Máximo 25 palabras por diapositiva.
- El kicker nombra el concepto ("Lineal", "Positivo").
- El título de portada puede ser muy corto ("CPTP").

**`igtextbook`**: libro de texto.
- Kicker: número de sección ("4.1", "4.2").
- `defbox[Definición 4.1]`, `thmbox[Teorema 4.2 (Nombre)]`,
  `notebox[Observación 4.4]`.
- `\begin{igproof} … \end{igproof}` termina en ∎ (solo existe en este tema).
- Portada: kicker "Capítulo N" y `\coverblurb` como "En este capítulo"
  (máx. 25 palabras).

**`igsorbet`**: tarjetas pastel, tono amable.
- Kicker: "Paso 1", "Intuición".
- `notebox` lleva automáticamente el título "Idea" con una bombilla.
- Máximo 50 palabras por diapositiva.

**`igarchive`**: libro antiguo.
- Kicker: año o fecha ("Mayo de 1935").
- Títulos en versalitas: menos de 26 caracteres para que quepan en una línea.
- Primera frase con capitular: `\lettrine{E}{instein}, Podolsky…` (solo en este tema).
- Citas con `\begin{pullquote}{Autor, año (traducción)} … \end{pullquote}`.
- Las líneas de tiempo en TikZ quedan muy bien (mira el ejemplo).

**`igflashcard`**: fichas sobre una mesa.
- El kicker sale en la pestaña: "Pregunta", "Pista", "Respuesta",
  "Por qué", "Para recordar".
- Opciones con `\begin{enumerate}[(A)]`.
- En la diapositiva de respuesta: la correcta con `\hl{…}` y
  `{\color{igAccent}\checkmark}`; las demás con `{\color{igMuted}…}`.
- `notebox` es la pista (título "Pista" automático).
- Tiene menos espacio vertical: poco contenido por ficha.

---

## 3. Plantilla del archivo

```latex
\documentclass[12pt]{beamer}
\usetheme{igsignature}            % el tema elegido

\ighandle{@quantum_danesh}
\igseries{Qubits desde cero}      % nombre de la serie
\igissue{06}                      % número del post, con dos cifras
% \iglang{en}                     % solo si el post es en inglés

\begin{document}

% \coverblurb{…}                  % opcional; lo usan Preprint y Textbook
\coverslide{Kicker}{Título}{Subtítulo de una línea.}

\begin{frame}{Título de la diapositiva}{Kicker}
  …
\end{frame}

% … más diapositivas …

\closingslide{Frase final corta}{Una frase: qué viene después o una invitación a comentar.}
\end{document}
```

Siempre hay portada (`\coverslide`) y cierre (`\closingslide`). El tema
pone solo el handle, el contador `06 / 08`, la serie, el "desliza →" y la
barra de progreso: no los escribas a mano.

## 4. Reglas de escritura

### Comandos disponibles en todos los temas

| Comando | Uso |
|---|---|
| `\hl{texto}` | Resaltar texto corrido (una o dos veces por diapositiva) |
| `\key{texto}` | Palabra clave en color de acento |
| `\mhl{x}`, `\mhl*{x}` | Resaltar un término dentro de una ecuación (dos colores) |
| `\explain{x}{nota}` | Llave inferior con una nota corta (máx. 5 palabras) |
| `\keyeq{x}` | La ecuación principal de la diapositiva, en su caja |
| `defbox`, `thmbox`, `notebox`, `eqbox` | Cajas, con `[título]` opcional |
| `pullquote{autor}` | Cita textual |
| `\aside{…}` | Nota corta alineada a la derecha, al final de un párrafo |
| `\refmark{1}` | Marca de referencia |
| `\ket`, `\bra`, `\braket`, `\mel`, `\ketbra`, `\expect`, `\Tr`, `\Vec`, `\id` | Notación física (`\ketbra{x}` es el proyector) |

Todos los resaltados aceptan capas de animación: `\hl<2->{…}`,
`\mhl<3->{…}`, `\explain<2->{…}{…}`, `\key<2>{…}`, y también `\pause` y
`\uncover<2->{…}`. Al aparecer, no mueven la ecuación.

### Límites por diapositiva

- Unas 60 palabras como máximo (menos en Poster, Sorbet y Flashcard).
- Una o dos ecuaciones grandes.
- Una idea por diapositiva.
- Entre 6 y 10 diapositivas por post. **Instagram admite 20 como máximo, y
  cada paso de animación cuenta como una diapositiva.**
- Títulos de diapositiva de menos de unos 30 caracteres; kickers de 1 a 3 palabras.

### Matemáticas legibles en el móvil

- En ecuaciones destacadas usa `\frac`, no `\tfrac`.
- Si una ecuación no cabe en el ancho, pártela con `align*` o `gather*`.
  Nunca dejes que se salga del margen.
- Para la ecuación clave de una diapositiva usa `\keyeq{…}` o
  `{\large \[ … \]}`.
- Después de un bloque `{\large \[ … \]}` pon `%` al final de la línea para
  no meter un espacio extra.

### Colores en dibujos

En TikZ usa siempre los nombres del tema, para que el dibujo cambie con él:
`igBG` (fondo), `igFG` (texto), `igMuted` (gris), `igAccent` y `igAccentB`
(acentos), `igHL` e `igHLB` (resaltados). No definas colores nuevos ni
cargues paquetes de fuentes o `babel`: el núcleo ya los carga.

### Contenido

- Escribe en español neutro, con frases cortas y directas.
- Revisa que la física sea correcta: fórmulas, convenciones y referencias.
  No inventes citas textuales. Si traduces una cita, márcala con "(traducción)".
- Cita los artículos con autores, revista, volumen, página y año.

## 5. Antes de entregar

1. Compila con `latexmk -pdf post.tex` (o en Overleaf con pdfLaTeX). Hacen
   falta dos pasadas para el contador y la barra; latexmk y Overleaf las hacen solos.
2. Busca en el `.log` cualquier `Overfull \vbox`: significa que una
   diapositiva se desborda. Recorta texto o parte la diapositiva hasta que no quede ninguno.
3. Comprueba que el PDF tiene 20 páginas o menos.
4. Exporta las imágenes: `./build.sh post.tex` las guarda en
   `build/post/01.png, 02.png, …` a 1080 × 1350. Sin `build.sh`, usa
   `pdftoppm -png -scale-to-x 1080 -scale-to-y 1350 post.pdf slide`.
5. Mira al menos la portada y la diapositiva más densa: que no se
   solapen textos y que nada toque el pie de página.

## 6. Formato de entrega

Empieza la respuesta con este bloque:

```
TEMA: igXXXX
MOTIVO: una frase que diga qué regla de la sección 1 decidió
SERIE: Nombre de la serie · NN
DIAPOSITIVAS: N (incluyendo los pasos de animación)
```

Después, el `.tex` completo y, si las generaste, las imágenes en orden.
