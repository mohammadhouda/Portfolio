# Mohammad Houda — Portfolio

Personal developer portfolio built with Next.js 16 App Router. Features a live API playground, an interactive architecture explorer, and smooth scroll-reveal animations.

**Live:** [mohammadhouda.dev](https://mohammadhouda.dev) &nbsp;·&nbsp; **GitHub:** [github.com/mohammadhouda](https://github.com/mohammadhouda)

---

## Features

- **Live API Playground** — Hit real REST endpoints directly from the browser. Split-panel UI with JSON syntax highlighting, response time, and status badges.
- **Architecture Explorer** — Interactive React Flow diagram for the HopeLink project. Click any node for an inline detail panel explaining the design decision.
- **Typewriter Terminal** — Animated terminal snippet cycling through backend commands in the hero section.
- **Scroll Reveal** — GPU-composited fade-up animations via Framer Motion `useInView`.
- **Project case studies** — Dedicated pages for each project with stack, highlights, and external links.
- **Responsive** — Two-column grids collapse to single-column on mobile; playground grid stacks vertically.

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | Next.js 16.2.3 (App Router) |
| Language | TypeScript |
| Styling | CSS variables + `globals.css` (no Tailwind) |
| Animation | Framer Motion v12 |
| Diagram | @xyflow/react v12 |
| Fonts | JetBrains Mono · Plus Jakarta Sans (Google Fonts) |
| Deployment | Vercel |

---

## Project Structure

```
my-portfolio/
├── app/
│   ├── layout.tsx              # Fonts, metadata, OpenGraph
│   ├── page.tsx                # Home page — section order
│   ├── globals.css             # Design tokens, animations, media queries
│   ├── projects/[slug]/        # Dynamic project detail pages
│   └── api/
│       ├── health/route.ts     # GET  /api/health
│       ├── projects/route.ts   # GET  /api/projects
│       ├── stack/route.ts      # GET  /api/stack
│       └── contact/route.ts    # POST /api/contact
├── src/
│   ├── lib/
│   │   └── projects.ts         # Project data + getProject()
│   └── components/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Contact.tsx
│       ├── ProjectCard.tsx
│       ├── ProjectDetail.tsx
│       ├── TerminalSnippet.tsx
│       ├── ScrollReveal.tsx
│       ├── Navbar.tsx
│       ├── SectionLabel.tsx
│       ├── playground/
│       │   ├── ApiPlayground.tsx
│       │   ├── EndpointSelector.tsx
│       │   ├── RequestPanel.tsx
│       │   ├── ResponsePanel.tsx
│       │   └── JsonHighlighter.tsx
│       └── architecture/
│           ├── ArchitectureExplorerLoader.tsx  # Client boundary for ssr:false
│           ├── ArchitectureExplorer.tsx
│           ├── CustomNode.tsx
│           └── nodeData.ts
└── public/
    ├── noise.svg               # Grain overlay texture
    └── Mohammad.Houda_CV.pdf   # CV download (add manually)
```

---

## API Routes

All routes are live — the playground section hits them in real time.

### `GET /api/health`
Returns server status, uptime, version, and current timestamp.

```json
{
  "status": "ok",
  "uptime": 42.3,
  "version": "1.0.0",
  "timestamp": "2025-07-15T10:00:00.000Z",
  "region": "local"
}
```

### `GET /api/projects`
Returns all portfolio projects with title, description, stack, and links.

### `GET /api/stack`
Returns the full tech stack grouped by category: backend, frontend, tools & cloud, AI.

### `POST /api/contact`
Accepts a contact message payload. Validates `name`, `email`, and `message` (≥ 10 chars).

```json
{ "name": "Jane Doe", "email": "jane@example.com", "message": "Let's work together!" }
```
