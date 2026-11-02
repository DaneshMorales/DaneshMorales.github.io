// Gráficos originales en SVG, generados como texto. Los colores se aplican
// desde la hoja de estilos mediante clases (g-*), así el SVG hereda la paleta.

const r2 = (n) => Math.round(n * 100) / 100;
const sub = (base, indice) => `${base}<tspan class="g-sub" dy="3">${indice}</tspan>`;

// Circuito de extracción de síndromes del código de repetición de tres qubits:
// dos qubits auxiliares miden las paridades Z₀Z₁ y Z₁Z₂ mediante CNOT.
export function circuitoRepeticion({ id = 'circuito' } = {}) {
  const datos = [30, 70, 110];
  const auxiliares = [166, 210];
  const x0 = 70, xFin = 400, xMedida = 332;
  const puertas = [
    [140, 0, 0], // control q0 -> auxiliar a0
    [190, 1, 0],
    [240, 1, 1],
    [290, 2, 1],
  ];

  const hilos = [
    ...datos.map((y) => `<path class="g-hilo g-trazo" pathLength="1" d="M${x0} ${y}H${xFin}"/>`),
    ...auxiliares.map((y) => `<path class="g-hilo g-trazo" pathLength="1" d="M${x0 + 34} ${y}H${xMedida - 14}"/>`),
    ...auxiliares.map((y) => `<path class="g-clasico" d="M${xMedida + 14} ${y - 2}H${xFin}M${xMedida + 14} ${y + 2}H${xFin}"/>`),
  ].join('');

  const etiquetas = [
    ...datos.map((y, i) => `<text class="g-texto" x="${x0 - 10}" y="${y + 5}" text-anchor="end">${sub('q', i)}</text>`),
    ...auxiliares.map((y, i) => `<text class="g-texto" x="${x0 - 10}" y="${y + 5}" text-anchor="end">${sub('a', i)}</text>`
      + `<text class="g-texto g-ket" x="${x0 + 4}" y="${y + 5}">|0⟩</text>`),
    ...auxiliares.map((y, i) => `<text class="g-texto g-pequeno" x="${xFin}" y="${y - 9}" text-anchor="end">${sub('s', i)}</text>`),
  ].join('');

  const cnots = puertas.map(([x, d, a], i) => {
    const yc = datos[d], yt = auxiliares[a];
    return `<g class="g-puerta" style="--i:${i}">`
      + `<path class="g-enlace" d="M${x} ${yc}V${yt + 10}"/>`
      + `<circle class="g-control" cx="${x}" cy="${yc}" r="4.5"/>`
      + `<circle class="g-objetivo" cx="${x}" cy="${yt}" r="10"/>`
      + `<path class="g-enlace" d="M${x - 10} ${yt}H${x + 10}M${x} ${yt - 10}V${yt + 10}"/>`
      + `</g>`;
  }).join('');

  const medidas = auxiliares.map((y, i) => `<g class="g-puerta" style="--i:${4 + i}">`
    + `<rect class="g-medida" x="${xMedida - 14}" y="${y - 12}" width="28" height="24" rx="3"/>`
    + `<path class="g-aguja" d="M${xMedida - 8} ${y + 5}a8 8 0 0 1 16 0M${xMedida} ${y + 6}l6 -10"/>`
    + `</g>`).join('');

  return `<svg class="grafico grafico--circuito" viewBox="0 0 410 236" role="img" aria-labelledby="${id}-t ${id}-d">`
    + `<title id="${id}-t">Circuito de un código de repetición de tres qubits</title>`
    + `<desc id="${id}-d">Tres qubits de datos, q0, q1 y q2, y dos qubits auxiliares, a0 y a1, preparados en el estado cero. Cuatro compuertas CNOT copian en a0 la paridad de q0 y q1, y en a1 la paridad de q1 y q2. Al medir los auxiliares se obtienen los bits de síndrome s0 y s1 sin medir los qubits de datos.</desc>`
    + `<rect class="g-banda" x="${x0 + 30}" y="${auxiliares[0] - 22}" width="${xFin - x0 - 30}" height="${auxiliares[1] - auxiliares[0] + 44}" rx="6"/>`
    + hilos + cnots + medidas + etiquetas
    + `</svg>`;
}

// Código tórico en una red L × L con bordes opuestos identificados.
export function redTorica({ id = 'toro', L = 4 } = {}) {
  const m = 26, paso = 42, lado = paso * L, fin = m + lado;
  const lineas = [];
  for (let i = 0; i <= L; i++) {
    const p = m + i * paso;
    lineas.push(`M${m} ${p}H${fin}`, `M${p} ${m}V${fin}`);
  }
  const vertices = [];
  for (let i = 0; i < L; i++) for (let j = 0; j < L; j++) {
    vertices.push(`<circle class="g-vertice" cx="${m + j * paso}" cy="${m + i * paso}" r="2.6"/>`);
  }
  // Flechas que indican la identificación de bordes opuestos.
  const flecha = (x, y, rot, doble) => {
    const punta = 'M-5 -4L1 0L-5 4';
    const d = doble ? `${punta}M-1 -4L5 0L-1 4` : punta;
    return `<path class="g-flecha" transform="translate(${x} ${y}) rotate(${rot})" d="${d}"/>`;
  };
  const medio = m + lado / 2;
  const flechas = [
    flecha(medio, m, 0, true), flecha(medio, fin, 0, true),
    flecha(m, medio, 90, false), flecha(fin, medio, 90, false),
  ].join('');
  // Ciclo trivial: frontera de una cara. Ciclo no trivial: fila completa.
  const cx = m + paso, cy = m + paso;
  const trivial = `<path class="g-ciclo-trivial" d="M${cx} ${cy}h${paso}v${paso}h${-paso}z"/>`;
  const yLogico = m + 3 * paso;
  const logico = `<path class="g-ciclo-logico" d="M${m} ${yLogico}H${fin}"/>`;
  return `<svg class="grafico grafico--toro" viewBox="0 0 ${fin + m} ${fin + m}" role="img" aria-labelledby="${id}-t ${id}-d">`
    + `<title id="${id}-t">Red del código tórico</title>`
    + `<desc id="${id}-d">Una red cuadrada de ${L} por ${L} cuyos bordes opuestos se identifican, como en un toro. Una línea discontinua rodea una sola cara: es un ciclo trivial. Una línea gruesa recorre una fila completa de borde a borde: es un ciclo no trivial, que actúa como operador lógico.</desc>`
    + `<path class="g-red" d="${lineas.join('')}"/>`
    + `<rect class="g-borde" x="${m}" y="${m}" width="${lado}" height="${lado}"/>`
    + trivial + logico + vertices.join('') + flechas
    + `</svg>`;
}

// Iconos de las cuatro áreas de la página «Visión».
export function iconoArea(area) {
  const abre = `<svg class="grafico grafico--area" viewBox="0 0 96 96" aria-hidden="true" focusable="false">`;
  if (area === 'control') {
    // Retrato de fase: trayectoria en espiral que converge a un equilibrio.
    const R = 38, b = Math.log(R / 3.5) / (4 * Math.PI);
    const pts = [];
    for (let k = 0; k <= 144; k++) {
      const t = (k / 144) * 4 * Math.PI, r = R * Math.exp(-b * t);
      pts.push(`${r2(48 + r * Math.cos(t))} ${r2(48 - r * Math.sin(t))}`);
    }
    return abre
      + `<path class="g-eje" d="M8 48H88M48 8V88"/>`
      + `<path class="g-curva" d="M${pts.join('L')}"/>`
      + `<path class="g-flecha-llena" transform="translate(${r2(48 + R * Math.cos(0.5) * Math.exp(-b * 0.5))} ${r2(48 - R * Math.sin(0.5) * Math.exp(-b * 0.5))}) rotate(-118)" d="M-5 -4L2 0L-5 4z"/>`
      + `<circle class="g-punto" cx="48" cy="48" r="3.5"/>`
      + `</svg>`;
  }
  if (area === 'geometria') {
    // Geodésica sobre una esfera: arco de círculo máximo entre dos puntos.
    const a = 36, bEje = 12, phi = (-28 * Math.PI) / 180;
    const punto = (t) => {
      const x = a * Math.cos(t), y = bEje * Math.sin(t);
      return [r2(48 + x * Math.cos(phi) - y * Math.sin(phi)), r2(48 + x * Math.sin(phi) + y * Math.cos(phi))];
    };
    const [x1, y1] = punto(Math.PI * 0.62), [x2, y2] = punto(Math.PI * 0.08);
    return abre
      + `<circle class="g-contorno" cx="48" cy="48" r="36"/>`
      + `<ellipse class="g-eje" cx="48" cy="48" rx="36" ry="9"/>`
      + `<ellipse class="g-eje" cx="48" cy="48" rx="14" ry="36"/>`
      + `<ellipse class="g-eje" cx="48" cy="48" rx="36" ry="12" transform="rotate(-28 48 48)"/>`
      + `<path class="g-curva g-curva--gruesa" d="M${x1} ${y1}A${a} ${bEje} -28 0 0 ${x2} ${y2}"/>`
      + `<circle class="g-punto" cx="${x1}" cy="${y1}" r="3.5"/><circle class="g-punto" cx="${x2}" cy="${y2}" r="3.5"/>`
      + `</svg>`;
  }
  if (area === 'materia') {
    // Red hexagonal: qubits en los vértices de una red tipo panal.
    const s = 13, ancho = Math.sqrt(3) * s;
    const centros = [];
    for (let fila = -2; fila <= 2; fila++) for (let col = -2; col <= 2; col++) {
      const x = 48 + col * ancho + (fila % 2 ? ancho / 2 : 0), y = 48 + fila * 1.5 * s;
      if (Math.hypot(x - 48, y - 48) < 30) centros.push([x, y]);
    }
    const aristas = new Set(), verts = new Map();
    for (const [cx, cy] of centros) {
      const v = [];
      for (let k = 0; k < 6; k++) {
        const ang = (Math.PI / 3) * k + Math.PI / 6;
        v.push([r2(cx + s * Math.cos(ang)), r2(cy + s * Math.sin(ang))]);
      }
      v.forEach((p, k) => {
        const q = v[(k + 1) % 6];
        const clave = [p.join(','), q.join(',')].sort().join(';');
        aristas.add(clave);
        verts.set(p.join(','), p);
      });
    }
    const d = [...aristas].map((c) => { const [p, q] = c.split(';'); return `M${p.replace(',', ' ')}L${q.replace(',', ' ')}`; }).join('');
    const puntos = [...verts.values()].map(([x, y], i) => `<circle class="${i % 3 === 0 ? 'g-punto' : 'g-vertice'}" cx="${x}" cy="${y}" r="${i % 3 === 0 ? 3.4 : 2.4}"/>`).join('');
    return abre + `<path class="g-red" d="${d}"/>` + puntos + `</svg>`;
  }
  // Información cuántica: esfera de Bloch con un estado. Proyección oblicua:
  // el ecuador se ve como una elipse de semiejes R y 10.
  const th = (52 * Math.PI) / 180, ph = (35 * Math.PI) / 180, R = 34;
  const vx = r2(48 + R * Math.sin(th) * Math.cos(ph)), vy = r2(48 - R * Math.cos(th) + 10 * Math.sin(th) * Math.sin(ph));
  return abre
    + `<circle class="g-contorno" cx="48" cy="48" r="${R}"/>`
    + `<path class="g-eje" d="M${48 - R} 48A${R} 10 0 0 1 ${48 + R} 48"/>`
    + `<path class="g-contorno" d="M${48 - R} 48A${R} 10 0 0 0 ${48 + R} 48"/>`
    + `<path class="g-eje" d="M48 ${48 - R}V${48 + R}"/>`
    + `<path class="g-curva g-curva--gruesa" d="M48 48L${vx} ${vy}"/>`
    + `<circle class="g-punto" cx="${vx}" cy="${vy}" r="3.5"/>`
    + `<circle class="g-vertice" cx="48" cy="48" r="2"/>`
    + `</svg>`;
}

// Monograma para perfiles sin fotografía: iniciales con una «órbita».
export function monograma(iniciales) {
  return `<svg class="monograma" viewBox="0 0 120 120" aria-hidden="true" focusable="false">`
    + `<circle class="m-fondo" cx="60" cy="60" r="58"/>`
    + `<ellipse class="m-orbita" cx="60" cy="60" rx="56" ry="17" transform="rotate(-22 60 60)"/>`
    + `<text class="m-letras" x="60" y="72" text-anchor="middle">${iniciales}</text>`
    + `</svg>`;
}

// Marca: una compuerta CNOT. Dos hilos de qubit; el control (punto) está en
// el superior y el objetivo (⊕) en el inferior. El hilo inferior forma la barra
// horizontal del ⊕ y la línea de control, la vertical.
export function marca() {
  return `<svg class="marca__icono" viewBox="0 0 32 32" aria-hidden="true" focusable="false">`
    + `<rect width="32" height="32" rx="7" class="mi-fondo"/>`
    + `<path class="mi-hilo" d="M0 9.5H32M0 20.25H32"/>`
    + `<path class="mi-trazo" d="M16 9.5V25.5M10.75 20.25H21.25"/>`
    + `<circle class="mi-objetivo" cx="16" cy="20.25" r="5.25"/>`
    + `<circle class="mi-control" cx="16" cy="9.5" r="2.5"/>`
    + `</svg>`;
}
