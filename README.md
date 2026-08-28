# Axiom Journals — Next.js

A pixel-accurate Next.js (App Router) + TypeScript rewrite of the original static
Axiom Journals HTML site. Same layout, same visuals, same hover/mobile-menu
animations — rebuilt with a modern, secure, component-based stack.

## Stack

- **Next.js 16** (App Router, Server Components)
- **React 19**
- **TypeScript** (strict mode)
- Self-hosted Google Fonts via `next/font` (no external font requests — faster
  and more private than the original `@import`)
- Zero runtime dependencies beyond `next`, `react`, and `react-dom`, so there is
  no third-party dependency surface to carry vulnerabilities

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config, `next/core-web-vitals` + `next/typescript`)
- `npm run typecheck` — TypeScript project check with no emit

## What changed vs. the original static HTML

The visual design, copy, colors, type, spacing, and interactions (sticky header,
hover/click dropdowns, mobile menu, journal search & filter, demo forms, print
button) are all preserved exactly. Structurally, this version is stronger:

- **Real routing** instead of one shared `journal-detail.html` / `article.html`
  for every journal/article: each journal (`/journals/[slug]`) and article
  (`/articles/[slug]`) now has its own page and metadata, driven by a small
  typed data file (`src/data/journals.ts`).
- **Server Components by default** — only the interactive bits (header menu,
  journal filter, the two demo forms, print button) are Client Components.
- **Security headers** set in `next.config.ts` (`X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **Per-page `<title>`/`<meta description>`** via the Next.js Metadata API.
- Fonts are self-hosted at build time instead of fetched from Google Fonts at
  request time.

The submission and contact forms are still **demo-only**, exactly like the
original (`README.txt` said the same) — wire them up to your real backend/email
service before going live.

## Project structure

```
src/
  app/
    layout.tsx            Root layout (fonts, Header, Footer)
    page.tsx               Home
    globals.css             Full site stylesheet (converted 1:1 from style.css)
    journals/page.tsx        All journals + search/filter
    journals/[slug]/page.tsx Journal detail
    articles/page.tsx        All articles
    articles/[slug]/page.tsx Article reading page
    submit/page.tsx           Manuscript submission
    about/page.tsx
    contact/page.tsx
    policies/page.tsx
    not-found.tsx             404
  components/
    Header.tsx     Sticky nav, dropdowns, mobile menu (Client Component)
    Footer.tsx
    JournalFilter.tsx  Search/filter for the journals list (Client Component)
    SubmissionForm.tsx  (Client Component)
    ContactForm.tsx     (Client Component)
    PrintButton.tsx     (Client Component)
  data/
    journals.ts   Typed journal + article data
```

## Notes

- Sample journal/article/policy copy is unchanged from the original template
  and should be replaced with your official content before production use.
- Run `npm audit` after `npm install` to confirm zero known vulnerabilities in
  your resolved lockfile — this package.json intentionally has only three
  runtime dependencies (`next`, `react`, `react-dom`).
