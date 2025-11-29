---
title: "Blog Posts"
layout: archive      # or 'page' depending on your setup
permalink: /blog_posts/
author_profile: true
---
Below are some different ways of writing math.
If MathJax is working you should **not** see any backslashes in the formulas.

---

## 1. Inline math

HTML block so Kramdown doesn’t interfere:

<p>
Inline Pythagoras: \(a^2 + b^2 = c^2\).
</p>

---

## 2. Display math with $$ ... $$

This one uses `$$`:

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

---

## 3. Another display example with \[ ... \]

\[
\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
\]

---

## 4. Inline math inside a list

1. First item: \(f(x) = x^2\)  
2. Second item: \(e^{i\pi} + 1 = 0\)

---

## 5. Check that code blocks do *not* render math

```tex
This is a code block, so it should NOT render:

\(a^2 + b^2 = c^2\)
\[
\int_0^1 x^2\,dx = \frac{1}{3}
\]