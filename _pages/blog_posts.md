---
title: "Blog Posts"
layout: archive      # or 'page' depending on your setup
permalink: /blog_posts/
author_profile: true
---


I will now show that, even in the case where the easy gates have a gate dependent error model, the effective dressed cycle is equivalent to a cycle in which the noise in between the hard and easy cycles is going to be a Pauli twirled noise where the noise from the easy gates is going to be given by Equation \ref{avg_noise}, which is a gate-independent.

\[
\begin{aligned}
    \nu_{\text{drs.}}^{\text{eff.}}(H_i,E_i)
    &:= \left\langle \phi(T_i)\,\nu(H_i)\,\nu(E'_i)\,\phi^\dagger(T_{i-1}) \right\rangle_{T_i,T_{i-1}}\\
    &= \left\langle \phi(T_i)\,\phi(H_i)\,\Lambda(H_i)\,\Lambda(E_i')\,\phi(E'_i)\,\phi^\dagger(T_{i-1}) \right\rangle_{T_i,T_{i-1}}\\
    &= \left\langle \phi(H_i)\,\phi^\dagger(T_i^c)\,\Lambda(H_i)\,\Lambda(E_i')\,\phi(E'_i)\,\phi^\dagger(T_{i-1}) \right\rangle_{T_i,T_{i-1}}\\
    &= \left\langle \phi(H_i)\,\phi^\dagger(T_i^c)\,\Lambda(H_i)\,\Lambda(T_i^c E_i T_{i-1})\,\phi(T_i^c E_i T_{i-1})\,\phi^\dagger(T_{i-1}) \right\rangle_{T_i,T_{i-1}}\\
    &= \phi(H_i)\,\left\langle \phi^\dagger(T_i^c)\,\Lambda(H_i)\,\Lambda(T_i^c E_i T_{i-1})\,\phi(T_i^c) \right\rangle_{T_i,T_{i-1}}\,\phi(E_i)\\
    &= \phi(H_i)\,\left\langle \phi^\dagger(T_i^c)\,\Lambda(H_i)\, \left\langle \Lambda(T_i^c E_i T_{i-1}) \right\rangle_{T_{i-1}}\,\phi(T_i^c) \right\rangle_{T_i}\,\phi(E_i)\\
    &= \phi(H_i)\,\left\langle \phi^\dagger(T_i^c)\,\Lambda(H_i)\, \langle \Lambda(E'_i) \rangle_{E'_i}\,\phi(T_i^c) \right\rangle_{T_i}\,\phi(E_i)\\
    &= \phi(H_i)\,\left\langle \phi^\dagger(T_i^c)\,\Lambda(H_i)\, \Lambda_i^\textbf{T}\,\phi(T_i^c) \right\rangle_{T_i}\,\phi(E_i)\\
    &= \phi(H_i)\, S_i\, \phi(E_i)
\end{aligned}
\]

where \(S_i\) is a stochastic Pauli channel.

A circuit with gate-dependent noise on the easy gates in the RC paper is defined as \(\mathcal{C}_\text{GD}\) . In the CER paper, a circuit with any arbitrary noise model is described as \(\left \langle \mathcal{C}_\text{RC}(\vec{T})\right \rangle_{\vec{T}}\) . Therefore, in our case, we have that \(\mathcal{C}_\text{GD} \equiv \left \langle \mathcal{C}_\text{RC}(\vec{T})\right \rangle_\vec{T}\) .

This is the cool part. A circuit with gate-independent noise is defined in the RC paper as \(\mathcal{C}_\text{GI}\) and its gate-independent error model on the easy gates is given by equation \ref{avg_noise}. Since the noise on the easy gates is gate-independent, then from the proof of Lemma 1 of the CER paper, this circuit exactly factorizes as the product of effective dressed cycles; that is,

\[
\begin{aligned}
    \mathcal{C}_\text{GI}
    &= \nu_{m:0}^\text{eff} \\
    &= \nu_{\text{drs}.}^\text{eff.}(E_m)\nu_{\text{drs}.}^\text{eff.}(H_{m-1},E_{m-1})\ldots \nu_{\text{drs}.}^\text{eff.}(H_0,E_0)
\end{aligned}
\]

And recall that!

\[
\begin{aligned}
\left\langle \mathcal{C}_{\mathrm{RC}}(\vec{T}) \right\rangle_{\vec{T}}
        &= \left\langle \nu_{m:0}^{\mathrm{adj.}} \right\rangle \\
        &= \nu_{m:0}^{\mathrm{eff.}} 
             + \sum_{i=1}^{m} \nu_{m:i+1}^{\mathrm{adj.}}
                 \left\langle \delta_i \delta_{i-1} \nu_{i-2:0}^{\mathrm{adj.}} \right\rangle
\end{aligned}
\]

Therefore

\[
\begin{aligned}
    \mathcal{C}_\text{GD} - \mathcal{C}_\text{GI}
    &= \left\langle \mathcal{C}_{\mathrm{RC}}(\vec{T}) \right\rangle_{\vec{T}} -  \nu_{m:0}^{\mathrm{eff.}} \\
    &= \sum_{i=1}^{m} \nu_{m:i+1}^{\mathrm{adj.}}
         \left\langle \delta_i \delta_{i-1} \nu_{i-2:0}^{\mathrm{adj.}} \right\rangle
\end{aligned}
\]

and from Theorem 2 of the RC paper

\[
\begin{aligned}
    \left\|\mathcal{C}_\text{GD} - \mathcal{C}_\text{GI} \right\|_\diamond
    &= \left\| \sum_{i=1}^{m} \nu_{m:i+1}^{\mathrm{adj.}}
         \left\langle \delta_i \delta_{i-1} \nu_{i-2:0}^{\mathrm{adj.}} \right\rangle \right\|_\diamond \\
    &\leq \underbrace{\sum_{i=1}^{m} \left \langle \left\| \Lambda(E'_i) - \Lambda_i^\textbf{T}\right\|_\diamond \right \rangle_{T_1,\ldots, T_{m-1}}}_{\text{from the RC paper}}
\end{aligned}
\]

We can also go the other route and apply the triangle inequality.

\[
\begin{aligned}
    \left\|\mathcal{C}_\text{GD} - \mathcal{C}_\text{GI} \right\|_\diamond
    &= \left\| \sum_{i=1}^{m} \nu_{m:i+1}^{\mathrm{adj.}}
        \left\langle \delta_i \delta_{i-1} \nu_{i-2:0}^{\mathrm{adj.}} \right\rangle \right\|_\diamond \\
    &\leq \underbrace{\sum_{i=1}^{m}\left\|  \nu_{m:i+1}^{\mathrm{adj.}}
        \left\langle \delta_i \delta_{i-1} \nu_{i-2:0}^{\mathrm{adj.}} \right\rangle \right\|_\diamond}_{\text{from the triangle inequality}}
\end{aligned}
\]

So essentially I have translated Theorem 2 from the RC paper in terms of the definitions from the CER paper. Clearly there is an upper bound in the perturbation terms of the CER paper; the higher the variance in the error rates of the easy gates the looser the bound is. But the only conclusion is that more variance \(\implies\) looser upper bound.