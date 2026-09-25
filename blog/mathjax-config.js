/* =============================================
   Shared MathJax configuration for blog posts
   =============================================
   Load in the post <head>, BEFORE the MathJax script:

     <script src="../mathjax-config.js"></script>
     <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" async></script>

   Post-specific macros can be added in between:

     <script>Object.assign(MathJax.tex.macros, { C: '{\\mathcal{C}}' });</script>
   ============================================= */
window.MathJax = {
  tex: {
    tags: 'ams',
    inlineMath:  [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    macros: {
      /* Physics-package equivalents */
      ket:    ['{\\left| #1 \\right\\rangle}', 1],
      bra:    ['{\\left\\langle #1 \\right|}', 1],
      braket: ['{\\left\\langle #1 \\mid #2 \\right\\rangle}', 2],
      mel:    ['{\\left\\langle #1 \\right| #2 \\left| #3 \\right\\rangle}', 3],
      ketbra: ['{\\left| #1 \\right\\rangle\\!\\left\\langle #1 \\right|}', 1],
      expect: ['{\\left\\langle #1 \\right\\rangle}', 1],
      Tr:     '{\\operatorname{Tr}}',
      Vec:    ['{\\vec{#1}}', 1],
      /* dsfont equivalent (\mathds{1} for the identity) */
      mathds: ['{\\mathbb{#1}}', 1],
    }
  },
  options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'] }
};
