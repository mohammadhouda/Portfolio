# Mohammad Houda Portfolio

Personal portfolio built with Next.js 16 App Router. Editorial layout, GSAP
scroll animation over Lenis smooth scroll, and an interactive architecture
explorer on the case-study pages.

**Live:** [mohammadhouda.dev](https://mohammadhouda.dev) &nbsp;·&nbsp; **GitHub:** [github.com/mohammadhouda](https://github.com/mohammadhouda)

---

## Design

Deep charcoal ground, off-white text, a single warm-ember accent, and
hairline rules carrying a 12-column grid. All sans: Archivo at 800 does the
display work uppercase and very tightly tracked, so emphasis comes from
weight and size rather than from a contrasting serif. Inter carries body
copy; IBM Plex Mono is reserved for metadata labels, dates, indices and
never used for prose.

Every step of the text scale passes WCAG AA (4.5:1) against the background,
including the lightest, since those tones carry the small uppercase labels.
There is no grain or texture overlay: a flat ground keeps small text crisp.

---

## Motion

### Section stack

Reaching the end of a section pins it briefly; it recedes scaling down and
dimming while the next section slides up and covers it.

GSAP's pin switches the outgoing panel to `position: fixed`. Three details
make that read as depth rather than as a glitch:

- **`pinSpacing: false`.** With spacing on, GSAP inserts a spacer as long as
  the pin, so the outgoing panel dims against empty space and the next one
  only arrives afterwards. With it off, no space is added and the next panel
  scrolls straight up over the pinned one which is the whole effect.
- **Ascending `z-index` per panel.** A fixed element paints above static
  siblings regardless of DOM order, so without this the pinned panel would
  sit on top of the section meant to cover it.
- **`transform-origin: 50% calc(100% - 50svh)`.** While pinned, a panel's
  bottom edge rests on the bottom of the viewport, so this point lands
  exactly on screen centre for a short panel and a very tall one alike.
  Scaling from anywhere else drags visible content off-screen as it shrinks.

The transform goes on an inner element, never the panel itself: pin writes
position and inset onto the panel, and a transform there would also create a
containing block that breaks the fixed positioning. The whole effect is
gated behind `(min-width: 900px)` via `gsap.matchMedia` on short viewports
the transition eats too much of the screen, and mobile browsers resize on
address-bar show/hide, which invalidates pin measurements constantly.

### Everything else

- **Lenis** drives smooth scrolling, stepped from `gsap.ticker` rather than
  its own rAF loop. Two independent loops is what makes most smooth-scroll
  sites jitter ScrollTrigger reads the scroll position on one frame while
  Lenis writes it on another.
- **GSAP ScrollTrigger** handles every reveal. All triggers share one scroll
  handler and write transforms straight to the DOM, so scrolling never
  re-renders React.
- **Headline reveals** split text into lines and slide each out from behind a
  mask (`src/lib/splitLines.ts` a small stand-in for the paid SplitText
  plugin). Splitting waits on `document.fonts.ready`, because splitting
  against fallback metrics produces the wrong line breaks.
- **`prefers-reduced-motion`** is honoured throughout: Lenis never starts,
  and every reveal renders in its final state.
- Content is hidden pre-reveal by a `.js` class set in a blocking inline
  script, with a 2.5s failsafe that removes it if the motion chunk never
  loads so a failed bundle degrades to a plain visible page rather than a
  blank one.

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | Next.js 16.2.3 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Smooth scroll | Lenis v1 |
| Animation | GSAP v3 + ScrollTrigger |
| Diagram | @xyflow/react v12 |
| Fonts | Archivo · Inter · IBM Plex Mono |
| Deployment | Vercel |

### A note on CSS layers

Custom rules in `globals.css` live inside `@layer base` / `@layer components`
on purpose. Tailwind v4 emits utilities into `@layer utilities`, and an
**unlayered** rule beats a layered one regardless of specificity so a bare
`body > *` selector will silently defeat every utility class on a direct
child of `body`. Keep new global rules inside a layer.

---

## Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx              # Fonts, metadata, JS bootstrap + failsafe
│   ├── page.tsx                # Home section order, Person JSON-LD
│   ├── globals.css             # Tokens, layered base/components, Lenis CSS
│   ├── icon.tsx                # Generated favicon
│   ├── opengraph-image.tsx     # Social card, generated at build time
│   └── projects/[slug]/        # Case-study pages (SSG)
├── src/
│   ├── lib/
│   │   ├── profile.ts          # Bio, timeline, certifications, stack
│   │   ├── projects.ts         # Project data, featured/archive split
│   │   ├── gsap.ts             # Plugin registration, shared easings
│   │   ├── splitLines.ts       # Line splitter for headline reveals
│   │   └── scroll.ts           # Lenis-aware scrollTo + scroll lock
│   ├── types/global.d.ts       # window.__lenis
│   └── components/
│       ├── Nav.tsx  Hero.tsx  Work.tsx  About.tsx
│       ├── Career.tsx  Contact.tsx  Footer.tsx
│       ├── SectionHead.tsx  ProjectVisual.tsx
│       ├── ProjectDetail.tsx  Lightbox.tsx
│       ├── motion/
│       │   ├── SectionStack.tsx    # Pinned section recede + overlap
│       │   ├── SmoothScroll.tsx    # Lenis ↔ GSAP ticker bridge
│       │   ├── Reveal.tsx          # Fade + rise on scroll
│       │   ├── SplitReveal.tsx     # Masked per-line headline reveal
│       │   ├── Parallax.tsx        # Scroll-linked image drift
│       │   └── Rule.tsx            # Self-drawing hairline
│       └── architecture/
│           ├── ArchitectureExplorerLoader.tsx  # ssr:false boundary
│           ├── Explorer.tsx        # Shared, data-driven explorer
│           ├── HopeLinkExplorer.tsx / DocAgentExplorer.tsx
│           ├── CustomNode.tsx
│           ├── palette.ts          # Node colour toning + edge strokes
│           └── nodeData.ts / docAgentNodeData.ts
└── public/
    └── Mohammad.Houda_CV.pdf
```

---

## Content

All copy lives in two files nothing is hardcoded in components:

- `src/lib/profile.ts` bio, career timeline, certifications, skills, contact
- `src/lib/projects.ts` projects, with `featured: true` promoting one to a
  full row and case study, and `featured: false` demoting it to the archive
  list

---

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```
