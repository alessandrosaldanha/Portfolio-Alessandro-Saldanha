# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Alessandro Saldanha: React 19 + Vite (JS, not TypeScript), client-side routed with React Router, styled with the Orla design system tokens (see Design reference below). Content (projects, posts, timeline, socials) is real, ported from the original design mockup.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — lint with Oxlint (ignores [design/](design/) via `ignorePatterns` in [.oxlintrc.json](.oxlintrc.json) — that folder is reference material, not app code)

There is no test runner configured yet. If tests are added later, document the run/single-test commands here.

## Architecture

- Entry point: [src/main.jsx](src/main.jsx) wraps [src/App.jsx](src/App.jsx) in `BrowserRouter` and mounts it into `index.html`.
- [src/App.jsx](src/App.jsx) owns the route table and the dark/light theme state (persisted to `localStorage`, applied as `data-theme` on `<html>`, defaulting to dark) and renders the persistent `Header`/`Footer` around each page.
- Routes → pages in [src/pages/](src/pages/): `/` (Home), `/projetos` + `/projetos/:slug` (list/detail), `/blog` + `/blog/:slug` (list/detail), `/sobre`, `/contato`.
- Content lives in [src/data/](src/data/) as plain JS modules (`projects.js`, `posts.js`, `companies.js`, `timeline.js`, `stack.js`, `social.js`) — no CMS or backend. To add a project or post, add an entry to the relevant array; listing pages, filters, and prev/next navigation update automatically.
- `src/data/social.js` has `TODO` placeholders (WhatsApp number, GitHub/Facebook/Instagram handles) — fill these in with real values before treating the site as launch-ready.
- Styling is global CSS, not CSS-in-JS or Tailwind: [src/styles/tokens/](src/styles/tokens/) are the Orla design system's token files (colors, typography, spacing, effects, fonts, base — copied verbatim from `design/_ds/`), and [src/styles/site.css](src/styles/site.css) has the component/layout classes built on those tokens. Both are imported once via [src/index.css](src/index.css).
- Bundler config: [vite.config.js](vite.config.js) uses `@vitejs/plugin-react` (Oxc-based, not the SWC variant).
- `.claude/skills/` and `.claude/.agentes/` hold project-specific Claude Code skills and agent definitions.

## Design reference

[design/](design/) holds material extracted from Claude Design — reference only, not imported by the build:

- `Portfolio Alessandro.dc.html` + `support.js` + `thumbnail.webp` — the original visual mockup/prototype (a declarative template with `{{ }}` bindings and `<sc-if>`/`<sc-for>` custom elements, not runnable as-is). `src/pages/` + `src/styles/site.css` are a hand-built React port of this.
- `_ds/ds-orla-.../` — the Orla design system the mockup is built on (tokens, bundled components, `readme.md`); `src/styles/tokens/` is a copy of its `tokens/*.css`. This is the design system of Orla (orla.tech), the user's employer — used here as the visual foundation for the portfolio, not to be reused outside this project without checking, and worth keeping in mind if this repo is ever made public.
- `handoff/README.md` — a *proposed* alternative architecture (Next.js 14 App Router + TypeScript strict + Tailwind + MDX) that was **not** taken; the site was built directly into the existing Vite + JS setup instead. Its `data/*.ts` files are schema scaffolds only (empty arrays) — the real content is in `src/data/*.js`, not there.

## Branches and releases

- `main` is production; `hmg` is homologation/staging. Land features in `hmg` before merging to `main`.
- Releases on `main` are automated by release-please ([.github/workflows/release-please.yml](.github/workflows/release-please.yml), [release-please-config.json](release-please-config.json)) — it parses Conventional Commits to bump the version and generate `CHANGELOG.md`. Commit messages must follow `feat:`, `fix:`, `chore:`, etc. for this to work correctly.
