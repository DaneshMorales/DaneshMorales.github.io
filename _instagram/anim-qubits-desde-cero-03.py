#!/usr/bin/env python3
"""Vídeos de Qubits desde cero · 03.

Lee qubits-desde-cero-03.tex, toma cada diapositiva marcada con
"% @anim sNN" y la compila una vez por fotograma, cambiando sus perillas
\\an... (opacidades, átomos, contadores).  Así cada vídeo usa exactamente el
mismo tema, fuentes y diagramas que la diapositiva fija.

    python3 anim-qubits-desde-cero-03.py          # todos los vídeos
    python3 anim-qubits-desde-cero-03.py s08      # solo uno

Resultado: build/qubits-desde-cero-03-carrusel/01.png, 02.mp4, ...
listo para subir en ese orden.  Necesita pdflatex, pdftoppm y ffmpeg.
"""
import bisect
import math
import pathlib
import random
import re
import shutil
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

HERE = pathlib.Path(__file__).resolve().parent
NAME = "qubits-desde-cero-03"
SRC = HERE / f"{NAME}.tex"
WORK = HERE / "build" / f"{NAME}-anim"
OUT = HERE / "build" / f"{NAME}-carrusel"
FPS = 30
TOTAL = 11                 # diapositivas del carrusel
SPEED = 16.0               # velocidad de los átomos, en mm de diagrama por segundo
MAGNET = 14.0              # recorrido oculto dentro de un imán

src = SRC.read_text()
PREAMBLE = src[:src.index("\\begin{document}")]
BODIES = dict(re.findall(r"% @anim (s\d\d)[^\n]*\n(.*?)% @end", src, re.S))


# --- tiempo -------------------------------------------------------------------
def ease(x):
    x = min(1.0, max(0.0, x))
    return x * x * (3 - 2 * x)


def fade(t, start, dur=0.6):
    return ease((t - start) / dur)


# --- trayectorias -------------------------------------------------------------
def bezier(p0, p1, p2, p3, n=40):
    pts = []
    for i in range(n + 1):
        u = i / n
        a, b, c, d = (1 - u) ** 3, 3 * u * (1 - u) ** 2, 3 * u * u * (1 - u), u ** 3
        pts.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
                    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return pts


class Route:
    """Una polilínea con tramos visibles y tramos ocultos (dentro de un imán)."""

    def __init__(self):
        self.pieces = []          # (longitud, [puntos] o None si está oculto)

    def line(self, a, b):
        self.pieces.append((math.dist(a, b), [a, b]))
        return self

    def curve(self, p0, p1, p2, p3):
        pts = bezier(p0, p1, p2, p3)
        self.pieces.append((sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1)), pts))
        return self

    def hidden(self, length=MAGNET):
        self.pieces.append((length, None))
        return self

    @property
    def length(self):
        return sum(l for l, _ in self.pieces)

    def at(self, d):
        """Posición a distancia d del inicio, o None si el átomo no se ve."""
        if d < 0 or d >= self.length:
            return None
        for length, pts in self.pieces:
            if d < length:
                if pts is None:
                    return None
                seg = [math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]
                for (a, b), s in zip(zip(pts, pts[1:]), seg):
                    if d <= s:
                        f = d / s if s else 0
                        return (a[0] + f * (b[0] - a[0]), a[1] + f * (b[1] - a[1]))
                    d -= s
                return pts[-1]
            d -= length
        return None


class Atom:
    def __init__(self, t0, route, outcome=None):
        self.t0, self.route, self.outcome = t0, route, outcome

    @property
    def arrival(self):
        return self.t0 + self.route.length / SPEED

    def pos(self, t):
        return self.route.at((t - self.t0) * SPEED)


def atoms_tex(atoms, t):
    out = []
    for a in atoms:
        p = a.pos(t)
        if p:
            out.append(f"\\atom{{{p[0]:.2f}}}{{{p[1]:.2f}}}")
    return "".join(out)


def spawn_times(start, end, dt, rng):
    t, times = start, []
    while t < end:
        times.append(t + rng.uniform(-0.25, 0.25) * dt)
        t += dt
    return times


def out_route(cx, up):
    s = 1 if up else -1
    return (cx + 7, 2.1 * s), (cx + 10, 4.5 * s)


def pct(n_up, n_dn):
    n = n_up + n_dn
    if n == 0:
        return "\\textendash", "\\textendash"
    up = round(100 * n_up / n)
    return f"{up}\\,\\%", f"{100 - up}\\,\\%"


# --- un imán con fuente: s02 y s03 ------------------------------------------------
def single_magnet(start, beam_end, cx, duration, dt, seed):
    rng = random.Random(seed)
    atoms = []
    for t0 in spawn_times(-3.0, duration, dt, rng):
        up = rng.random() < 0.5
        r = Route().line((start, 0), (beam_end, 0)).hidden()
        r.line(*out_route(cx, up))
        atoms.append(Atom(t0, r))
    return atoms


def s02(t, atoms):
    return {"anAtomsA": atoms_tex(atoms, t),
            "anSistema": fade(t, 1.2), "anEstado": fade(t, 3.0)}


def s03(t, atoms):
    return {"anAtomsB": atoms_tex(atoms, t), "anLabels": fade(t, 2.2, 0.8),
            "anNombre": fade(t, 3.0), "anBase": fade(t, 4.6)}


def s05(t, _):
    return {"anLineB": fade(t, 1.0), "anLineC": fade(t, 2.4), "anRows": fade(t, 3.2),
            "anHl": fade(t, 3.9, 0.5), "anAmp": fade(t, 4.8)}


def s07(t, _):
    return {"anSqA": fade(t, 0.9, 0.5), "anSqB": fade(t, 1.4, 0.5),
            "anPctA": fade(t, 2.1, 0.4), "anPctB": fade(t, 2.5, 0.4),
            "anBar": min(1.0, max(0.0, (t - 3.1) / 1.4)) ** 0.85,
            "anBarLbl": fade(t, 4.6), "anNota": fade(t, 5.3)}


# --- filtro +z: s08 ----------------------------------------------------------------
def chain_z(duration, seed):
    rng = random.Random(seed)
    atoms = []
    for t0 in spawn_times(-3.6, duration, 0.22, rng):
        r = Route().line((0, 0), (8, 0)).hidden()
        if rng.random() < 0.5:                       # sale por +z del primer imán
            r.curve((22, 2.1), (26, 2.1), (32, 0), (36, 0)).hidden()
            r.line(*out_route(43, True))
            atoms.append(Atom(t0, r, "up"))
        else:                                        # -z: se bloquea
            r.line((22, -2.1), (25, -2.1))
            atoms.append(Atom(t0, r, "block"))
    return atoms


def s08(t, atoms):
    up = sum(1 for a in atoms if a.outcome == "up" and 0 <= a.arrival <= t)
    u, d = pct(up, 0)
    return {"anAtomsC": atoms_tex(atoms, t), "anUpC": u, "anDnC": d,
            "anTxtA": fade(t, 3.4), "anTxtB": fade(t, 5.0)}


# --- filtro +x: s09 ----------------------------------------------------------------
def chain_x(duration, seed):
    rng = random.Random(seed)
    plans = []
    for t0 in spawn_times(-5.0, duration, 0.11, rng):
        a_up, b_up = rng.random() < 0.5, rng.random() < 0.5
        plans.append([t0, a_up, b_up])

    def route(a_up, b_up, c_up):
        r = Route().line((-2, 0), (0, 0)).hidden()
        if not a_up:
            return r.line((14, -2.1), (17, -2.1))
        r.curve((14, 2.1), (18, 2.1), (20, 0), (24, 0)).hidden()
        if not b_up:
            return r.line((38, -2.1), (41, -2.1))
        r.curve((38, 2.1), (42, 2.1), (44, 0), (48, 0)).hidden()
        return r.line(*out_route(55, c_up))

    # el último imán reparte 50/50: mismo número de +z y -z dentro del vídeo
    full_len = route(True, True, True).length
    arriving = [p for p in plans if p[1] and p[2] and 0 <= p[0] + full_len / SPEED <= duration]
    if len(arriving) % 2:
        arriving[-1][1] = False
        arriving = arriving[:-1]
    outcomes = [True, False] * (len(arriving) // 2)
    rng.shuffle(outcomes)
    c_of = {id(p): o for p, o in zip(arriving, outcomes)}
    atoms = []
    for p in plans:
        c_up = c_of.get(id(p), rng.random() < 0.5)
        tag = ("up" if c_up else "down") if p[1] and p[2] else "block"
        atoms.append(Atom(p[0], route(p[1], p[2], c_up), tag))
    return atoms


def s09(t, atoms):
    up = sum(1 for a in atoms if a.outcome == "up" and 0 <= a.arrival <= t)
    dn = sum(1 for a in atoms if a.outcome == "down" and 0 <= a.arrival <= t)
    u, d = pct(up, dn)
    return {"anAtomsD": atoms_tex(atoms, t), "anUpD": u, "anDnD": d,
            "anTxtC": fade(t, 4.5), "anTxtD": fade(t, 6.5)}


# slide -> (posición en el carrusel, duración en s, fotograma, átomos)
VIDEOS = {
    "s02": (2, 7.0, s02, lambda d: single_magnet(5.5, 25, 32, d, 0.30, 2)),
    "s03": (3, 8.0, s03, lambda d: single_magnet(0, 21, 28, d, 0.28, 3)),
    "s05": (5, 7.0, s05, lambda d: None),
    "s07": (7, 8.0, s07, lambda d: None),
    "s08": (8, 8.5, s08, lambda d: chain_z(d, 8)),
    "s09": (9, 10.0, s09, lambda d: chain_x(d, 9)),
}


def knob_defs(values):
    out = []
    for k, v in values.items():
        out.append(f"\\def\\{k}{{{v:.2f}}}" if isinstance(v, float) else f"\\def\\{k}{{{v}}}")
    return "".join(out)


def transparency_aux():
    """The aux lines the transparent package would write on a first run.

    \\transparent only takes effect once its value is listed in the .aux, so
    we list every opacity 0.00 ... 1.00 up front and need a single run.
    """
    lines = ["\\relax", "\\providecommand{\\transparent@use}[1]{}"]
    for k in range(101):
        v = "0" if k == 0 else "1" if k == 100 else ("%.2f" % (k / 100)).rstrip("0")[1:]
        lines.append(f"\\transparent@use{{{v}}}")
    return "\n".join(lines) + "\n"


def make_video(key):
    slot, duration, frame, make_atoms = VIDEOS[key]
    atoms = make_atoms(duration)
    n = round(duration * FPS)
    body = BODIES[key]
    pages = [knob_defs(frame(i / FPS, atoms)) + "\n" + body for i in range(n)]
    work = WORK / key
    shutil.rmtree(work, ignore_errors=True)
    (work / "frames").mkdir(parents=True)
    tex = work / f"{key}.tex"
    (work / f"{key}.aux").write_text(transparency_aux())
    tex.write_text(PREAMBLE + f"\\igslidenumber{{{slot}}}{{{TOTAL}}}\n\\begin{{document}}\n"
                   + "\n".join(pages) + "\n\\end{document}\n")
    env = {"TEXINPUTS": f"{HERE}//:", "PATH": "/usr/bin:/bin:/usr/local/bin"}
    subprocess.run(["pdflatex", "-interaction=batchmode", "-halt-on-error", tex.name],
                   cwd=work, env=env, check=True, stdout=subprocess.DEVNULL)
    subprocess.run(["pdftoppm", "-png", "-scale-to-x", "1080", "-scale-to-y", "1350",
                    f"{key}.pdf", "frames/f"], cwd=work, check=True)
    mp4 = OUT / f"{slot:02d}.mp4"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS),
                    "-pattern_type", "glob", "-i", str(work / "frames" / "f-*.png"),
                    "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
                    "-shortest", "-c:v", "libx264", "-preset", "slow", "-crf", "17",
                    "-pix_fmt", "yuv420p", "-r", str(FPS), "-movflags", "+faststart",
                    "-c:a", "aac", "-b:a", "128k", str(mp4)], check=True)
    return f"{key} -> {mp4.relative_to(HERE)} ({n} fotogramas)"


def main():
    keys = sys.argv[1:] or list(VIDEOS)
    OUT.mkdir(parents=True, exist_ok=True)
    # las diapositivas fijas salen del build normal
    subprocess.run([str(HERE / "build.sh"), f"{NAME}.tex"], cwd=HERE, check=True)
    animated = {slot for slot, *_ in VIDEOS.values()}
    for png in sorted((HERE / "build" / NAME).glob("*.png")):
        slot = int(png.stem)
        target = OUT / png.name
        if slot in animated:
            target = OUT / f"{png.stem}-portada.png"   # último fotograma, por si hace falta
        shutil.copy(png, target)
    with ThreadPoolExecutor(max_workers=3) as pool:
        for line in pool.map(make_video, keys):
            print(line)


if __name__ == "__main__":
    main()
