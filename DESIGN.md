# DESIGN.md

Design system for **shahir ahmed · portfolio** — Variation C (dark, monospace-forward, engineering-drawing-adjacent). This file is the source of truth for tokens, components, and motion. If the implementation disagrees with this file, fix the implementation.

---

## 0. Philosophy

A personal engineering portfolio, not a SaaS landing page. Dark by default. Typography does most of the work — one characterful display face (Bricolage Grotesque) against an extensive mono (JetBrains Mono) body. Accent orange is used structurally, never decoratively. Depth comes from hairline rules and negative space, never shadows. Motion is functional — it clarifies state changes and nothing else.

The single rule that governs every decision: **every design element must justify its existence by communicating something concrete.** If a gradient, an animation, or a pill doesn't carry information, cut it.

---

## 1. Typography

### 1.1 Font stack

| Role | Family | Weights used | Notes |
|---|---|---|---|
| Display | Bricolage Grotesque | 400, 500, 600, 700 | Variable font; uses `opsz` (12–96) and `wdth` axes. |
| Body / Mono | JetBrains Mono | 400, 500, 600 | Used for all non-display text — prose, metadata, nav, footer. Full mono commitment is intentional. |

No other typefaces. No system fallbacks beyond generic sans/mono.

```css
font-family: 'Bricolage Grotesque', -apple-system, sans-serif;   /* display */
font-family: 'JetBrains Mono', ui-monospace, monospace;          /* everything else */
```

### 1.2 Google Fonts import

Add to `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet">
```

For Astro production, prefer self-hosted `@fontsource-variable/bricolage-grotesque` and `@fontsource-variable/jetbrains-mono`. Google Fonts CDN is fine for prototyping only.

### 1.3 Type scale

All sizes in px. `line-height` is unitless. `letter-spacing` applied per-token because sans at large sizes requires tighter tracking than small mono. Sizes use `clamp()` where responsive.

| Token | Family | Size (desktop / mobile) | Weight | Line-height | Tracking | Variable axes |
|---|---|---|---|---|---|---|
| `display` | Bricolage | `clamp(64px, 11vw, 128px)` | 500 | 0.92 | −0.045em | `opsz` 96, `wdth` 100 |
| `h1` | Bricolage | 56 / 40 | 500 | 1.0 | −0.035em | `opsz` 72 |
| `h2` | Bricolage | 44 / 32 | 500 | 1.0 | −0.035em | `opsz` 64 |
| `h3` | Bricolage | 28 / 24 | 500 | 1.08 | −0.025em | `opsz` 48 |
| `index` | Bricolage | `clamp(56px, 8vw, 96px)` | 500 | 0.88 | −0.04em | `opsz` 96, `wdth` 85 |
| `lede` | Mono | 15 / 14 | 400 | 1.6 | 0 | — |
| `body` | Mono | 14 | 400 | 1.65 | 0 | — |
| `meta` | Mono | 13 | 500 | 1.5 | +0.01em | — |
| `nav` | Mono | 13 | 500 | 1 | +0.04em | — |
| `micro` | Mono | 10 | 500 | 1 | +0.14em (uppercase) | — |
| `coord` | Mono | 11 | 400 | 1 | +0.12em (uppercase) | — |

**Rules.**

- Negative tracking on display is **non-negotiable**. Bricolage at 128px with default tracking reads as amateurish.
- Positive tracking on mono is only applied to uppercase runs. Lowercase mono keeps tracking at 0.
- Display text never wraps mid-word — set `text-wrap: balance` on headings ≥ 44px.
- Max prose line length: `60ch`. Body paragraphs exceeding this must be broken up.

---

## 2. Color

### 2.1 Tokens

Root-level CSS custom properties. Dark is the only theme; if a light mode is added later, it is a separate file and these values do not change.

```css
:root {
  /* Surfaces */
  --bg: #050505;            /* Page background. Not #000 — pure black produces harsh contrast on OLED. */
  --bg-elevated: #0D0D0D;   /* Cards, elevated surfaces, code blocks */
  --bg-subtle: #141414;     /* Hover fills on interactive rows */

  /* Rules */
  --rule: #1F1F1F;          /* Standard hairline — section dividers, card borders */
  --rule-strong: #2E2E2E;   /* Emphasized hairlines — input borders, focus rings */

  /* Foreground */
  --fg: #F5F5F5;            /* Primary text. Not #FFF — pure white vibrates on dark bg. */
  --fg-secondary: #A8A8A8;  /* Body secondary — role descriptions, paragraph body */
  --fg-muted: #5A5A5A;      /* Metadata — timestamps, coord markers, footer */

  /* Accent */
  --accent: #F97316;        /* Orange-500 — used for signals of momentum only */
  --accent-dim: #A13F00;    /* Hover/pressed states on accent surfaces */

  /* Functional */
  --focus: var(--accent);   /* Focus ring color — always accent orange */
}
```

### 2.2 Distribution

Strict ratio. Violating this ratio is how a minimal design becomes noisy.

| Token | Target surface share |
|---|---|
| `--bg` + `--fg` | ~88% |
| `--rule` + `--fg-secondary` | ~11% |
| `--accent` | **< 1%** |

### 2.3 Accent usage rules

`--accent` is reserved for the following, and nothing else:

1. `INCOMING` and `IN PROGRESS` badges.
2. The period after the wordmark and the period after the `Projects` heading (signature punctuation).
3. The index numerals on project blocks (`01`, `02`, `03`).
4. The active-page dot in the nav.
5. The 1px rule that separates hero from projects (`.accent-rule`).
6. The triangle glyph in the nav wordmark (`◢`).
7. Focus rings.

**Never** use `--accent` for:

- Body links (they use underline-on-hover against `--fg`)
- Button fills or button borders (buttons are outlined with `--fg-secondary`)
- Section headings
- Icons outside the nav wordmark
- Charts, dataviz, or figures

If you need a second accent, you don't — revisit the design.

---

## 3. Spacing

### 3.1 Base unit

4px. All spacing is a multiple of 4.

### 3.2 Scale

Tailwind-compatible. Values given in px / rem for reference.

| Token | px | rem | Typical use |
|---|---|---|---|
| `space-1` | 4 | 0.25 | Icon-to-text gap |
| `space-2` | 8 | 0.5 | Tight stacks, badge padding |
| `space-3` | 12 | 0.75 | Inline clusters |
| `space-4` | 16 | 1.0 | Paragraph spacing |
| `space-5` | 20 | 1.25 | Small section gap |
| `space-6` | 24 | 1.5 | Metadata row spacing |
| `space-8` | 32 | 2.0 | Card inner padding |
| `space-10` | 40 | 2.5 | Project block padding (vertical) |
| `space-12` | 48 | 3.0 | Between related sections |
| `space-14` | 56 | 3.5 | — |
| `space-16` | 64 | 4.0 | Subsection spacing |
| `space-20` | 80 | 5.0 | Hero bottom padding (mobile) |
| `space-24` | 96 | 6.0 | Hero bottom padding (desktop) |
| `space-28` | 112 | 7.0 | Between major sections |
| `space-32` | 128 | 8.0 | Reserved for page-level gaps |

### 3.3 Section rhythm

- Between major sections (hero → projects → contact): **112px desktop / 72px mobile**
- Within a section (heading → content): **40px**
- Between sibling items in a list (project → project): **0 padding + hairline separator**, content inside each item pads `40px` top/bottom

---

## 4. Layout

### 4.1 Containers

| Token | Max-width | Inner padding |
|---|---|---|
| `container` | 1200px | 32px (desktop), 24px (mobile) |
| `container-prose` | 680px | (same) |

Never center prose in the full container — center it in `container-prose` inside `container`.

### 4.2 Background grid

The page background carries a **48px × 48px** dot/line grid at `rgba(255,255,255,0.018)` opacity. This is ambient texture — it must be barely perceptible. If users notice it before noticing the name, the opacity is too high.

```css
body {
  background-color: var(--bg);
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 48px 48px;
}
```

### 4.3 Breakpoints

Tailwind defaults. Design is mobile-first.

| Name | Min-width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Hero typography uses `clamp()` and scales fluidly; card grids switch at `md`.

---

## 5. Borders, radii, shadows

### 5.1 Borders

All borders are 1px. Default color `--rule`. Emphasized borders use `--rule-strong`. Focus state uses `--accent`.

```css
border: 1px solid var(--rule);
```

No dashed borders. No double borders except as intentional editorial devices (not used in this design — reserved for future decoration if ever needed).

### 5.2 Radii

```css
--radius-none: 0;      /* Default. Use on cards, content regions, containers. */
--radius-sm: 2px;      /* Tags, badges (optional — in this design badges are square). */
--radius: 4px;         /* Buttons, inputs. Maximum radius in this system. */
```

**Rule:** content regions are never rounded. Cards have square corners. The only things that round are buttons and inputs.

### 5.3 Shadows

```css
/* Intentionally empty */
```

This design uses **zero shadows**. Depth is conveyed through hairline borders, background shifts, and type hierarchy. Adding `box-shadow` anywhere — including subtle `0 1px 2px rgba(0,0,0,0.1)` — breaks the aesthetic. If a designer asks for a shadow, replace it with a border, a background shift, or more whitespace.

---

## 6. Motion

### 6.1 Tokens

```css
:root {
  --motion-fast: 120ms;
  --motion-base: 150ms;
  --motion-slow: 200ms;
  --motion-hold: 1500ms;   /* State-hold for copy-to-clipboard confirm */

  --ease-out: cubic-bezier(0.2, 0, 0, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Never use `ease-in-out` from the browser default. Always use a custom cubic-bezier — the defaults are too bouncy.

### 6.2 Transition rules

| Element | Property | Duration | Easing |
|---|---|---|---|
| Link hover underline | `transform: scaleX(0→1)` | `--motion-fast` | `--ease-out` |
| Nav link color | `color` | `--motion-fast` | `ease` |
| Route transition (View Transitions API) | crossfade | `--motion-base` | `--ease-out` |
| Theme toggle (if ever added) | `background-color`, `color` | `--motion-slow` | `--ease-in-out` |
| Button hover | `background-color`, `border-color` | `--motion-fast` | `ease` |
| Project row hover | `background-color` | `--motion-fast` | `ease` |
| Nav backdrop on scroll | `backdrop-filter`, `border-bottom` | `--motion-base` | `--ease-out` |
| Copy-to-clipboard confirm | text content swap + color | hold `--motion-hold`, transitions `--motion-fast` | `--ease-out` |

### 6.3 What does NOT animate

Explicit deny-list. None of these are permitted anywhere in the site:

- Scroll-triggered fade-up / reveal animations (`IntersectionObserver` opacity tricks).
- Parallax of any kind.
- Typewriter or CLI-prompt hero effects.
- Hover tilts, 3D transforms, or scale-on-hover for cards.
- Floating, bobbing, or mouse-follow effects.
- Animated SVG icons beyond static swap on state change.
- Loading spinners on static pages.
- Confetti, sparkles, or celebratory animations.
- Animated gradients.

### 6.4 `prefers-reduced-motion`

All non-essential motion is disabled under `prefers-reduced-motion: reduce`. Underline hovers become instant. Route transitions become instant. Backdrop blur still applies (it's a state indicator, not an animation).

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Components

### 7.1 Nav bar

**Anatomy.** Sticky top. 64px tall. Full-width with inner content in `container`. Hairline bottom border using `--rule`. Backdrop blur activates after 8px scroll.

**States.**

- Idle (above 8px scroll): transparent background, no border.
- Scrolled (≥ 8px): `background: rgba(5,5,5,0.72)`, `backdrop-filter: blur(10px)`, `border-bottom: 1px solid var(--rule)`.

**Left.** Wordmark — the glyph `◢` in `--accent`, followed by `SHAHIR.AHMED` in JetBrains Mono 13px, weight 500, `--fg`, tracking `+0.08em`. 12px gap between glyph and text.

**Right.** Link cluster — `ABOUT`, `RESEARCH`, `PROJECTS`, `CONTACT`. 32px gap. Mono 13px, weight 500, tracking `+0.04em`.

### 7.2 Nav link

```css
.nav-link {
  color: var(--fg-secondary);
  padding: 4px 0;
  transition: color var(--motion-fast) ease;
}
.nav-link:hover { color: var(--fg); }
.nav-link.active { color: var(--fg); }
.nav-link.active::before {
  content: '●';
  color: var(--accent);
  margin-right: 6px;
  font-size: 8px;
  position: relative;
  top: -3px;
}
.nav-link:focus-visible {
  outline: 1px solid var(--accent);
  outline-offset: 4px;
}
```

The orange dot on the active link is the ONLY state indicator — no underline, no pill, no box.

### 7.3 Button

Two variants. No filled / no solid accent buttons. Buttons are outlined against `--fg-secondary` to keep accent reserved for its seven approved uses.

**Primary (`.btn`).**

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 10px 16px;
  color: var(--fg);
  background: transparent;
  border: 1px solid var(--fg-secondary);
  border-radius: var(--radius);
  transition: border-color var(--motion-fast) ease, background-color var(--motion-fast) ease;
  cursor: pointer;
}
.btn:hover {
  border-color: var(--fg);
  background-color: var(--bg-subtle);
}
.btn:focus-visible {
  outline: 1px solid var(--accent);
  outline-offset: 2px;
}
.btn:disabled {
  color: var(--fg-muted);
  border-color: var(--rule);
  cursor: not-allowed;
}
```

**Ghost (`.btn-ghost`).**

Link-style action. Uppercase mono with hover underline. No border, no padding. Use for "all projects →" and similar.

```css
.btn-ghost {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--fg-secondary);
  position: relative;
}
.btn-ghost:hover { color: var(--fg); }
.btn-ghost:hover::after {
  content: '';
  position: absolute;
  left: 0; bottom: -2px;
  width: 100%; height: 1px;
  background: currentColor;
}
```

### 7.4 Badge (`INCOMING`, `IN PROGRESS`)

Square token in `--accent` with a 6×6 solid square mark before the label. The mark is what makes it recognizable from the nav dot (which is round).

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.badge::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--accent);
  display: inline-block;
}
```

Only two badges exist in the vocabulary: `INCOMING` and `IN PROGRESS`. Do not introduce a third. If a new state is needed, pick a different communication mechanism (inline text, metadata row).

### 7.5 Project block

The primary content card pattern. No background fill, no radius, no shadow. Structure is a grid with an index column (160px) and a content column (1fr), separated by a 32px gap. Hairline top border; the last block in a list also gets a hairline bottom border.

```
┌─────────────┬───────────────────────────────────────┐
│  01         │  Inertial Measurement Unit            │
│  [accent]   │  Six-axis breakout board...           │
│             │                                       │
│  Complete   │  ROLE / PCB DESIGN  TOOLS / ALTIUM    │
│  2025       │                                       │
└─────────────┴───────────────────────────────────────┘
```

- Index numeral: `index` scale, color `--accent`, weight 500.
- Below the numeral: status block — `badge` if `IN PROGRESS` or `INCOMING`, otherwise mono micro text "Complete" + year stacked.
- Right column: `h3` title, then `lede` paragraph (max `60ch`), then a metadata cluster.

### 7.6 Metadata cluster

Horizontal row of mono micro labels, separated by flex gap. Pattern: `LABEL / VALUE` with the slash in the same weight, always uppercase.

```html
<div class="meta-cluster">
  <span>ROLE / PCB DESIGN</span>
  <span>TOOLS / ALTIUM</span>
  <span>LAYERS / 4</span>
</div>
```

```css
.meta-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-muted);
}
```

### 7.7 Tick rule

Thin horizontal rule with vertical tick marks at 48px intervals. Used at the top of the page and above the footer. The ticks align with the background grid.

```css
.tick-rule {
  height: 14px;
  background-image: linear-gradient(to right, var(--rule-strong) 1px, transparent 1px);
  background-size: 48px 14px;
  background-position: 0 bottom;
  border-bottom: 1px solid var(--rule-strong);
}
```

Footer variant flips vertical direction (`background-position: 0 top; border-top;` / `border-bottom: none`).

### 7.8 Coordinate marker line

Hero opens with a mono coordinate line — small uppercase text at `--fg-muted`, `11px`, tracking `+0.12em`. Format: index on the left, latitude/longitude on the right.

```html
<div class="coord-line">
  <span>[ 00.00 ]  EE / MSU</span>
  <span>LAT 42.7370°N  LON 84.4839°W</span>
</div>
```

Do not invent fake coordinates. If a section has no real coordinate, drop the marker.

### 7.9 Accent rule

A solid 1px `--accent` horizontal line used as the separator between hero and projects. This is the only 100%-accent rule on the page. Do not reuse it elsewhere — using it twice breaks its rhythm.

```css
.accent-rule { height: 1px; background: var(--accent); }
```

### 7.10 Wordmark glyph

The `◢` (U+25E2 "BLACK LOWER RIGHT TRIANGLE") is the site's mark. It sits before `SHAHIR.AHMED` in the nav and nowhere else. Do not use it as a bullet, a divider, or a decoration. If a favicon is needed, render `◢` in `--accent` on `--bg`.

---

## 8. Signature details

These are the five decisions that make the design recognizable. Preserve them.

1. **The orange period.** After "Ahmed" in the hero and after "Projects" in the section heading. Same color (`--accent`), same size as the letter it follows.
2. **The `◢` wordmark.** Only in the nav, only in accent.
3. **Orange index numerals on projects.** `01 / 02 / 03` in the `index` type scale. They are the largest orange surface on the page.
4. **Real coordinates in the hero marker.** `LAT 42.7370°N LON 84.4839°W` — MSU's East Lansing coordinates. If the site is ever used from a different location, update the marker — do not leave stale coordinates.
5. **The faint background grid.** 48px, ~1.8% white opacity. Must be barely visible.

---

## 9. Anti-patterns

Hard "no" list. Do not add any of the following, even if asked, without a full design review and an explicit written exception in this document.

- Any gradient outside of CSS-default link underlines.
- Any `box-shadow` anywhere.
- Any accent color beyond `--accent` and `--accent-dim`. No second accent. No green, no blue, no purple.
- Any font beyond Bricolage Grotesque and JetBrains Mono.
- Terminal cosplay — fake `$`-prompts, blinking cursors, command-line framing.
- Skill bar charts, skill radar charts, self-rated proficiency percentages.
- Neon-green or matrix-green backgrounds or text.
- Hero-section metric cards ("1,000+ experiments" as a visual callout). Numbers belong inside research prose.
- Grandiose copy: "building the future," "at the intersection of," "exploring the frontier of."
- A stylized monogram logo. The mark is the `◢` glyph. That's it.
- `emoji` as UI decoration. Glyphs from Unicode geometric ranges (`◢ ● ■ →`) are permitted; emoji pictographs are not.

---

## 10. Tailwind config integration

Drop this into `tailwind.config.ts` (or `.js`) to surface the tokens as first-class utilities.

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050505',
          elevated: '#0D0D0D',
          subtle: '#141414',
        },
        rule: {
          DEFAULT: '#1F1F1F',
          strong: '#2E2E2E',
        },
        fg: {
          DEFAULT: '#F5F5F5',
          secondary: '#A8A8A8',
          muted: '#5A5A5A',
        },
        accent: {
          DEFAULT: '#F97316',
          dim: '#A13F00',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }]
        'display': ['clamp(4rem, 11vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.045em', fontWeight: '500' }],
        'h1':      ['3.5rem',                   { lineHeight: '1',    letterSpacing: '-0.035em', fontWeight: '500' }],
        'h2':      ['2.75rem',                  { lineHeight: '1',    letterSpacing: '-0.035em', fontWeight: '500' }],
        'h3':      ['1.75rem',                  { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '500' }],
        'index':   ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '0.88', letterSpacing: '-0.04em',  fontWeight: '500' }],
        'lede':    ['0.9375rem',                { lineHeight: '1.6',  letterSpacing: '0' }],
        'body':    ['0.875rem',                 { lineHeight: '1.65', letterSpacing: '0' }],
        'meta':    ['0.8125rem',                { lineHeight: '1.5',  letterSpacing: '0.01em' }],
        'nav':     ['0.8125rem',                { lineHeight: '1',    letterSpacing: '0.04em' }],
        'micro':   ['0.625rem',                 { lineHeight: '1',    letterSpacing: '0.14em' }],
        'coord':   ['0.6875rem',                { lineHeight: '1',    letterSpacing: '0.12em' }],
      },
      maxWidth: {
        container: '1200px',
        prose: '680px',
        ch60: '60ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0, 0, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '120ms',
        base: '150ms',
        slow: '200ms',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
    },
  },
  plugins: [],
} satisfies Config
```

Usage examples:

```html
<h1 class="font-display text-display text-fg">Shahir Ahmed<span class="text-accent">.</span></h1>
<p class="font-mono text-lede text-fg-secondary max-w-ch60">…</p>
<a class="font-mono text-nav text-fg-secondary hover:text-fg transition-colors duration-fast">ABOUT</a>
<div class="h-[14px] border-b border-rule-strong bg-grid bg-[length:48px_14px]"></div>
```

---

## 11. File / asset conventions

- Fonts: self-host via `@fontsource-variable` once in production. Google Fonts CDN is development-only.
- Icons: Unicode glyphs first (`◢ ● ■ →`). If an actual icon is required, use `lucide-react` sized at 14–16px, stroke-width 1.5, color `currentColor`.
- Images: none in the current design; if added later, they respect container widths and have no border radius. No shadows, no frames.
- Favicon: single `◢` glyph rendered to PNG at 32px/180px/512px, accent `#F97316` on `#050505`.

---

## 12. Deviation protocol

If a future page or component genuinely needs something outside this spec — a chart, a form, an image gallery — **add a new section to this document** describing the extension, with the same token/rule discipline. Do not silently introduce new colors, fonts, or motion into component code. The design system is the constraint that makes the site coherent; the alternative is drift.

---

*Last updated: 2026-04-20.*
