---
title: "Blog Posts"
layout: archive      # or 'page' depending on your setup
permalink: /blog_posts/
author_profile: true
---

<script>
window.MathJax = {
  tex: {
    tags: 'ams'   // automatic equation numbering
  }
};
</script>

<script id="MathJax-script" async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

# My Page

Here is an equation:

\[
E = mc^2
\]

I am testing some things
$$
this is a test
$$

$$
\begin{equation}
a = b+C
\end{equation}
$$

\begin{equation}
hello
\end{equation}


$$
\begin{aligned}
    \nu_{\text{drs.}}^{\text{eff.}}(H_i,E_i)
    &:= \left\langle \phi(T_i)\,\nu(H_i)\,\nu(E'_i)\,\phi^\dagger(T_{i-1}) \right\rangle_{T_i,T_{i-1}}\\
    &= \left\langle \phi(T_i)\,\phi(H_i)\,\Lambda(H_i)\,\Lambda(E_i')\,\phi(E'_i)\,\phi^\dagger(T_{i-1}) \right\rangle_{T_i,T_{i-1}}\\
    &= \left\langle \phi(H_i)\,\phi(T_i^c)\,\Lambda(H_i)\,\Lambda(E_i')\,\phi(E'_i)\,\phi^\dagger(T_{i-1}) \right\rangle_{T_i,T_{i-1}}\\
    &= \left\langle \phi(H_i)\,\phi(T_i^c)\,\Lambda(H_i)\,\Lambda(T_i^c E_i T_{i-1})\,\phi(T_i^c E_i T_{i-1})\,\phi^\dagger(T_{i-1}) \right\rangle_{T_i,T_{i-1}}\\
    &= \phi(H_i)\,\left\langle \phi(T_i^c)\,\Lambda(H_i)\,\Lambda(T_i^c E_i T_{i-1})\,\phi(T_i^c) \right\rangle_{T_i,T_{i-1}}\,\phi(E_i)\\
    &= \phi(H_i)\,\left\langle \phi(T_i^c)\,\Lambda(H_i)\, \left\langle \Lambda(T_i^c E_i T_{i-1}) \right\rangle_{T_{i-1}}\,\phi(T_i^c) \right\rangle_{T_i}\,\phi(E_i)\\
    &= \phi(H_i)\,\left\langle \phi(T_i^c)\,\Lambda(H_i)\, \langle \Lambda(E'_i) \rangle_{E'_i}\,\phi(T_i^c) \right\rangle_{T_i}\,\phi(E_i)\\
    &= \phi(H_i)\,\left\langle \phi(T_i^c)\,\Lambda(H_i)\, \Lambda_i^\textbf{T}\,\phi(T_i^c) \right\rangle_{T_i}\,\phi(E_i)\\
    &= \phi(H_i)\, S_i\, \phi(E_i)\\
\end{aligned}
$$