// Bibliografía. Las claves de la primera parte coinciden con las del
// documento «Temas_tesis_cuantica_Panama.tex» y se usan en temas.mjs.
// Las de la segunda parte ilustran las áreas de la página «Visión».
//
// Campos: autores, anio, titulo, fuente (revista o editorial), doi, arxiv, url,
// nota (texto breve en español), idioma ('en' si el título está en inglés).

export const referencias = {
  css: {
    autores: 'A. R. Calderbank y P. W. Shor',
    anio: 1996,
    titulo: 'Good quantum error-correcting codes exist',
    fuente: '<em>Physical Review A</em> <strong>54</strong>, 1098',
    doi: '10.1103/PhysRevA.54.1098',
    arxiv: 'quant-ph/9512032',
  },
  ibmqec: {
    autores: 'IBM Quantum Learning',
    titulo: 'Foundations of quantum error correction',
    fuente: 'Curso en línea',
    url: 'https://quantum.cloud.ibm.com/learning/en/courses/foundations-of-quantum-error-correction',
    nota: 'Estabilizadores, códigos CSS y código tórico. En inglés.',
  },
  adapted: {
    autores: 'A. S. Fletcher, P. W. Shor y M. Z. Win',
    anio: 2008,
    titulo: 'Structured near-optimal channel-adapted quantum error correction',
    fuente: '<em>Physical Review A</em> <strong>77</strong>, 012320',
    doi: '10.1103/PhysRevA.77.012320',
    arxiv: '0708.3658',
  },
  toric: {
    autores: 'A. Yu. Kitaev',
    anio: 2003,
    titulo: 'Fault-tolerant quantum computation by anyons',
    fuente: '<em>Annals of Physics</em> <strong>303</strong>, 2–30',
    doi: '10.1016/S0003-4916(02)00018-0',
    arxiv: 'quant-ph/9707021',
  },
  tomography: {
    autores: 'I. L. Chuang y M. A. Nielsen',
    anio: 1997,
    titulo: 'Prescription for experimental determination of the dynamics of a quantum black box',
    fuente: '<em>Journal of Modern Optics</em> <strong>44</strong>, 2455–2467',
    doi: '10.1080/09500349708231894',
    arxiv: 'quant-ph/9610001',
  },
  rb: {
    autores: 'E. Magesan, J. M. Gambetta y J. Emerson',
    anio: 2011,
    titulo: 'Scalable and Robust Randomized Benchmarking of Quantum Processes',
    fuente: '<em>Physical Review Letters</em> <strong>106</strong>, 180504',
    doi: '10.1103/PhysRevLett.106.180504',
    arxiv: '1009.3639',
  },
  readout: {
    autores: 'F. B. Maciejewski, Z. Zimborás y M. Oszmaniec',
    anio: 2020,
    titulo: 'Mitigation of readout noise in near-term quantum devices by classical post-processing based on detector tomography',
    fuente: '<em>Quantum</em> <strong>4</strong>, 257',
    doi: '10.22331/q-2020-04-24-257',
    arxiv: '1907.08518',
  },
  wootton: {
    autores: 'J. R. Wootton y D. Loss',
    anio: 2018,
    titulo: 'Repetition code of 15 qubits',
    fuente: '<em>Physical Review A</em> <strong>97</strong>, 052313',
    doi: '10.1103/PhysRevA.97.052313',
    arxiv: '1709.00990',
  },
  ibmrep: {
    autores: 'IBM Quantum Documentation',
    titulo: 'Repetition codes',
    fuente: 'Tutorial de circuitos dinámicos',
    url: 'https://quantum.cloud.ibm.com/docs/en/tutorials/repetition-codes',
    nota: 'Recurso web consultado el 1 de noviembre de 2026. En inglés.',
  },
  rc: {
    autores: 'J. J. Wallman y J. Emerson',
    anio: 2016,
    titulo: 'Noise tailoring for scalable quantum computation via randomized compiling',
    fuente: '<em>Physical Review A</em> <strong>94</strong>, 052325',
    doi: '10.1103/PhysRevA.94.052325',
    arxiv: '1512.01098',
  },
  memory: {
    autores: 'O. Oreshkov y T. A. Brun',
    anio: 2007,
    titulo: 'Continuous quantum error correction for non-Markovian decoherence',
    fuente: '<em>Physical Review A</em> <strong>76</strong>, 022318',
    doi: '10.1103/PhysRevA.76.022318',
    arxiv: '0705.2342',
  },
  dd: {
    autores: 'L. Viola y S. Lloyd',
    anio: 1998,
    titulo: 'Dynamical suppression of decoherence in two-state quantum systems',
    fuente: '<em>Physical Review A</em> <strong>58</strong>, 2733–2744',
    doi: '10.1103/PhysRevA.58.2733',
    arxiv: 'quant-ph/9803057',
  },
  haar: {
    autores: 'F. Mezzadri',
    anio: 2007,
    titulo: 'How to generate random matrices from the classical compact groups',
    fuente: '<em>Notices of the AMS</em> <strong>54</strong>, 592–604',
    arxiv: 'math-ph/0609050',
  },
  designs: {
    autores: 'C. Dankert, R. Cleve, J. Emerson y E. Livine',
    anio: 2009,
    titulo: 'Exact and approximate unitary 2-designs and their application to fidelity estimation',
    fuente: '<em>Physical Review A</em> <strong>80</strong>, 012304',
    doi: '10.1103/PhysRevA.80.012304',
    arxiv: 'quant-ph/0606161',
  },
  dfs: {
    autores: 'D. A. Lidar',
    anio: 2012,
    titulo: 'Review of Decoherence Free Subspaces, Noiseless Subsystems, and Dynamical Decoupling',
    fuente: 'Preprint',
    arxiv: '1208.5791',
  },
  randomstates: {
    autores: 'O. Giraud',
    anio: 2006,
    titulo: 'Distribution of bipartite entanglement for random pure states',
    fuente: 'Preprint',
    arxiv: 'quant-ph/0611285',
  },

  // --- Ejemplos de áreas (página «Visión», diapositivas 5 a 8) ---
  aguaControl: {
    autores: 'S. A. Putri, F. Moazeni y J. Khazaei',
    anio: 2024,
    titulo: 'Data-driven predictive control strategies of water distribution systems using sparse regression',
    fuente: '<em>Journal of Water Process Engineering</em> <strong>59</strong>, 104885',
    doi: '10.1016/j.jwpe.2024.104885',
  },
  microrredAgricola: {
    autores: 'P. Brown y M. Göl',
    anio: 2026,
    titulo: 'Bayesian probabilistic photovoltaic power forecasting and stochastic model-predictive control for an agricultural microgrid',
    fuente: '<em>Solar Energy</em> <strong>304</strong>, 114197',
    doi: '10.1016/j.solener.2025.114197',
  },
  geodesicasRobotica: {
    autores: 'Y. Li, J. Qiu y S. Calinon',
    anio: 2024,
    titulo: 'A Riemannian Take on Distance Fields and Geodesic Flows in Robotics',
    fuente: 'Preprint',
    arxiv: '2412.05197',
  },
  spinhex: {
    autores: 'R. M. Otxoa, J. Etxezarreta Martinez, P. Schnabl, J. Oliva del Moral, N. Mertig, C. Smith y F. Martins',
    anio: 2026,
    titulo: 'SpinHex: A low-crosstalk, spin-qubit architecture based on multielectron couplers',
    fuente: '<em>Physical Review Research</em> <strong>8</strong>',
    doi: '10.1103/t2ry-ll9n',
    arxiv: '2504.03149',
  },
  decodificadorMemoria: {
    autores: 'D. Morales-Hashemi, G. Smith y N. Cao',
    anio: 2026,
    titulo: 'What Must a Quantum-Memory Decoder Know About Temporally Correlated Noise?',
    fuente: 'Preprint',
    arxiv: '2610.03545',
  },
};

// Todas las referencias de esta lista tienen el título en inglés.
for (const ref of Object.values(referencias)) ref.idioma ??= 'en';
