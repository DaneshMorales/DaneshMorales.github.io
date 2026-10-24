#!/usr/bin/env bash
# Compile posts and export each page as a 1080 x 1350 PNG for Instagram.
#
#   ./build.sh                     every example-*.tex in this folder
#   ./build.sh my-post.tex         just one post
#
# Needs latexmk (TeX Live / MacTeX) and pdftoppm (poppler).
# PNGs land in build/<post-name>/01.png, 02.png, ...
set -euo pipefail
cd "$(dirname "$0")"

posts=("$@")
[ ${#posts[@]} -eq 0 ] && posts=(example-*.tex)

for tex in "${posts[@]}"; do
  name="${tex%.tex}"
  out="build/$name"
  mkdir -p "$out"
  latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir=build "$tex" >/dev/null 2>&1 \
    || { echo "LaTeX failed on $tex, see build/$name.log"; exit 1; }
  rm -f "$out"/*.png
  pdftoppm -png -scale-to-x 1080 -scale-to-y 1350 "build/$name.pdf" "$out/p"
  # p-1.png -> 01.png, so Instagram uploads keep their order
  for f in "$out"/p-*.png; do
    n="${f##*-}"; n="${n%.png}"
    mv "$f" "$out/$(printf '%02d' "$((10#$n))").png"
  done
  echo "$tex -> $out ($(ls "$out" | wc -l | tr -d ' ') pages)"
done
