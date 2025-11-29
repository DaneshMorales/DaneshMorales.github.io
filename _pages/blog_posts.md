---
title: "Math Rendering Test"
layout: post      # or 'page' depending on your setup
permalink: /blog_posts/
author_profile: true
---

# Math Rendering Test

If everything is working, all the LaTeX below should render nicely and **not** show raw `\` or `$` symbols.

---

## 1. Inline math

This is an inline formula using `\(...\)`:

- Pythagoras: \(a^2 + b^2 = c^2\)
- Exponential: \(e^{i\pi} + 1 = 0\)
- Fraction: \(\frac{1}{1 - x} = 1 + x + x^2 + \dots\)

---

## 2. Display math with `$$ ... $$`

You should see centered equations:

$$
E = mc^2
$$

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

---

## 3. Display math with `\[ ... \]`

\[
\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
\]

\[
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
\]

---

## 4. Math in lists

1. First item: \(f(x) = x^2\)
2. Second item:

   $$
   f'(x) = 2x
   $$

3. Third item: \(\lim_{x \to 0} \frac{\sin x}{x} = 1\)

---

## 5. Check that math is NOT rendered inside code blocks

You should see raw text below (no rendering):

```tex
This is a code block, so it should NOT render:

\(a^2 + b^2 = c^2\)

$$
E = mc^2
$$
