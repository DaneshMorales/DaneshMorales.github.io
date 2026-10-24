# Palatino carousel templates

Beamer themes for Instagram carousels: 4:5 pages (1080 × 1350 px), Palatino
for text and maths, Spanish by default. All themes share one set of commands,
so you can switch a post's look by changing one line.

(The folder name starts with `_`, so GitHub Pages does not publish it.)

## The themes

| Theme | `\usetheme{…}` | Best for | Look |
|---|---|---|---|
| Signature | `igsignature` | The main series | Your current dark design, in Palatino |
| Preprint | `igpreprint` | Paper summaries, journal club | Journal page: running heads, numbered equations |
| Chalkboard | `igchalkboard` | Derivations, line by line | Slate board, chalk colours, hand-drawn boxes |
| Nocturne | `ignocturne` | One formula in depth | Night navy, gold frame, italic titles |
| Blueprint | `igblueprint` | Protocols, algorithms, circuits | Drawing sheet, grid, title block, numbered callouts |
| Notebook | `ignotebook` | Worked exercises | Squared paper, red margin, highlighter, boxed answers |
| Poster | `igposter` | One idea per slide | Swiss style, giant page number, one strong blue |
| Textbook | `igtextbook` | Definitions, theorems, proofs | Chapter opener, Definition and Theorem boxes |
| Sorbet | `igsorbet` | Intuition, beginners | Pastel gradients, white card, pill chips |
| Archive | `igarchive` | History, quotes, timelines | Parchment, ornaments, old-style numerals, drop caps |
| Flashcard | `igflashcard` | Quizzes | Index cards on a desk: question, hint, answer |

Each theme has a sample post, `example-<theme>.tex`. `starter.tex` is a short,
commented post that uses every command; copy it to start a new one.

`GUIA_AGENTE.md` (in Spanish) is a guide for another agent: which theme to pick
for which kind of post, how to write the `.tex`, and what to check before
delivering.

Every theme shows the same five things, each in its own style:
the handle, the `06 / 08` counter, the series line (`QUBITS DESDE CERO · 02`),
a `desliza →` cue (hidden on the last slide) and a progress bar that fills as
you swipe.

## Using it on Overleaf

1. Upload `igpost.sty`, the `beamertheme<name>.sty` files you want, and your post.
2. Compile with pdfLaTeX (the default). The counter and progress bar need two
   runs; Overleaf does that on its own.
3. Download the PDF and turn each page into a PNG (see below).

## Building locally

```sh
./build.sh                  # every example-*.tex
./build.sh my-post.tex      # one post
```

This needs `latexmk` (TeX Live or MacTeX) and `pdftoppm` (`brew install poppler`).
The PNGs land in `build/<post>/01.png, 02.png, …`, ready to upload in order.
To convert a PDF from Overleaf yourself:

```sh
pdftoppm -png -scale-to-x 1080 -scale-to-y 1350 post.pdf slide
```

## Writing a post

```latex
\documentclass[12pt]{beamer}
\usetheme{igsignature}

\ighandle{@quantum_danesh}
\igseries{Qubits desde cero}
\igissue{02}
% \iglang{en}      % English words and hyphenation instead of Spanish

\begin{document}
\coverslide{Kicker}{Title}{Subtitle}

\begin{frame}{Title}{Kicker}
  Text, $inline$ maths and display maths.
\end{frame}

\closingslide{Last headline}{One closing sentence.}
\end{document}
```

### Commands

| Command | What it does |
|---|---|
| `\coverslide{kicker}{title}{subtitle}` | First slide |
| `\coverblurb{text}` | Extra cover text (abstract, chapter summary); put it before `\coverslide` |
| `\closingslide{headline}{text}` | Last slide, with Guardar / Enviar / Seguir |
| `\begin{frame}{Title}{Kicker}` | A normal slide; the kicker is the small label above the title |
| `\hl{text}` | Highlight running text |
| `\key{text}` | Accent colour for a key word |
| `\mhl{x}` / `\mhl*{x}` | Highlight a term inside an equation (two colours) |
| `\explain{x}{note}` | Underbrace with a readable note |
| `\keyeq{x}` | Display equation in the key-result box |
| `defbox`, `thmbox`, `notebox`, `eqbox` | Themed boxes, each with an optional `[title]` |
| `pullquote{who}` | A quotation with attribution |
| `\aside{remark}` | Short remark pushed to the right margin |
| `\refmark{1}` | Small reference mark |
| `\igslidenumber{n}{total}` | Pin the counter and progress bar (for video frames) |
| `\begin{axis}[ig axis]` | pgfplots axes in the theme's colours (`ig curve`, `ig data` for plots) |

Physics shorthands match the blog's MathJax setup, so equations paste across
unchanged: `\ket`, `\bra`, `\braket`, `\mel`, `\ketbra`, `\expect`, `\Tr`,
`\Vec`, `\id` (𝟙).

### Animations

Overlays turn into extra slides, so you can build a derivation one swipe at a
time. Everything that highlights also takes an overlay:
`\hl<2->{…}`, `\mhl<3->{…}`, `\explain<2->{…}{…}`, `\key<2>{…}`, plus Beamer's
`\pause` and `\uncover<2->{…}`. Highlights and notes never move the equation
when they appear.

Instagram allows 20 slides per post, and every overlay step counts as one.

### Video slides

A slide can also become an MP4 (1080 × 1350, 30 fps) rendered from the same
`.tex`, so it matches the static slides exactly. `qubits-desde-cero-03.tex`
and `anim-qubits-desde-cero-03.py` show the pattern:

- Mark the slide with `% @anim sNN` … `% @end`.
- Put whatever moves behind "knob" macros (`\anSomething`) whose default is
  the final state, so the static build shows the last frame.
- Fade text with `\fade{opacity}{…}` and boxes with `\fadebox{opacity}{…}`.
- The script sets the knobs for every frame, compiles once, and joins the
  frames with ffmpeg. `\igslidenumber{5}{11}` pins the counter and the
  progress bar, so the video shows its place in the carousel.

### Keeping it readable on a phone

- Use `\frac` in display maths; `\tfrac` gets too small.
- One key equation per slide can go up a size: `{\large \[ … \]}`.
- Split long equations with `align*` instead of letting them run to the edge.
- Around 60 words per slide is plenty.
- The profile grid crops the cover to 3:4, about 3.5 mm off each side. All the
  themes keep their text inside that.
