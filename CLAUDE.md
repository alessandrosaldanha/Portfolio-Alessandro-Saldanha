# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Alessandro Saldanha: React 19 + Vite (JS, not TypeScript), client-side routed with React Router, styled with the Orla design system tokens (see Reference material below). Content (projects, posts, timeline, socials) is real, ported from the original design mockup.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — lint with Oxlint (ignores [reference/](reference/) via `ignorePatterns` in [.oxlintrc.json](.oxlintrc.json) — that folder is reference material, not app code)

There is no test runner configured yet. If tests are added later, document the run/single-test commands here.

## Architecture

- Entry point: [src/main.jsx](src/main.jsx) wraps [src/App.jsx](src/App.jsx) in `BrowserRouter` and mounts it into `index.html`.
- [src/App.jsx](src/App.jsx) owns the route table and the dark/light theme state (persisted to `localStorage`, applied as `data-theme` on `<html>`, defaulting to dark) and renders the persistent `Header`/`Footer` around each page.
- Routes → pages in [src/pages/](src/pages/): `/` (Home), `/projetos` + `/projetos/:slug` (list/detail), `/blog` + `/blog/:slug` (list/detail), `/sobre`, `/contato`.
- Content lives in [src/data/](src/data/) as plain JS modules (`projects.js`, `posts.js`, `companies.js`, `timeline.js`, `stack.js`, `social.js`) — no CMS or backend. To add a project, post, or marquee company, add an entry to the relevant array (see README.md); listing pages, filters, and prev/next navigation update automatically.
- `src/data/social.js` has `TODO` placeholders (WhatsApp number, GitHub/Facebook/Instagram handles) — fill these in with real values before treating the site as launch-ready.
- **A project's description has exactly one field: `tagline`.** `Home.jsx`, `Projetos.jsx`, and `ProjetoDetalhe.jsx` all read `p.tagline` for the card/row/header description. There used to be a second field (`outcome`) read only by the home card, and it drifted out of sync with `tagline` for more than one project before being deleted. Never add a second description field (`outcome`, `summary`, or similar) — if the home card needs different copy than `/projetos`, that's a sign the single `tagline` needs to be rewritten, not a reason to fork it.
- Styling is global CSS, not CSS-in-JS or Tailwind: [src/styles/tokens/](src/styles/tokens/) are the Orla design system's token files (colors, typography, spacing, effects, fonts, base), and [src/styles/site.css](src/styles/site.css) has the component/layout classes built on those tokens. Both are imported once via [src/index.css](src/index.css). `spacing.css` and `effects.css` currently define no tokens (see below) but are kept as empty files in the import chain.
- **Tokens are trimmed, not the full design system.** Only the ~44 custom properties actually consumed by `src/` were kept in `src/styles/tokens/*.css` (verified by grep — see `docs/AUDITORIA-ESTRUTURA.md`, Fase 4). Before adding a new component that might want a color/spacing/shadow value not currently defined, check [reference/design-system/tokens/](reference/design-system/tokens/) for the full original Orla set and copy the specific token(s) needed into `src/styles/tokens/` — don't import from `reference/` directly, and don't restore the whole file wholesale.
- `src/styles/tokens/base.css` also defines 9 `.orla-*` utility classes (`.orla-display`, `.orla-h1`–`.orla-h4`, `.orla-body`, `.orla-small`, `.orla-eyebrow`, `.orla-mono`) that no page currently uses — `site.css` has its own component classes instead. Kept deliberately (not orphaned) because they may be useful for sections of the mockup not yet migrated (see below).
- Import alias: `@/` → `src/` is configured in `jsconfig.json` and `vite.config.js` (`resolve.alias`), reserved for imports that climb two or more directory levels. Nothing in the codebase currently needs it — every existing import is a sibling (`./Foo`) or one level up (`../data/x`); don't convert those to `@/` just for the sake of using the alias.
- Bundler config: [vite.config.js](vite.config.js) uses `@vitejs/plugin-react` (Oxc-based, not the SWC variant); `server.watch.ignored` excludes `reference/**` so editing reference material doesn't trigger HMR.
- `.claude/skills/` and `.claude/.agentes/` hold project-specific Claude Code skills and agent definitions.
- **Media assets are never loose at the project root.** Logos live in `src/assets/logos/`, per-project case screenshots in `src/assets/<slug>/` (e.g. `src/assets/nexus/`), files served as-is (favicon) in `public/`. `.gitignore` has a root-scoped pattern (`/*.png`, `/*.jpg`, `/*.svg`, etc. — not `src/assets/**`) so a stray file dropped at the root isn't tracked until it's actually organized. A file received with a problem (wrong format, duplicate/mismatched content) goes to `_pending-assets/` at the repo root (gitignored, never committed) while waiting for a corrected version — see `docs/CONTEUDO.md` for what's pending and why.
- **Never reuse the same image across different feature blocks in a project case** ([src/pages/ProjetoDetalhe.jsx](src/pages/ProjetoDetalhe.jsx)'s `features` rendering, data in [src/data/projects.js](src/data/projects.js)). Two adjacent blocks showing the identical screenshot reads as a mistake, not a design choice. If two blocks would share the same illustration, that's a signal they're one block, not two — merge the text and use one image.
- **Before using any received screenshot, check it for real personal data** (name + email together, CPF/CNPJ, phone, address, real financial transaction detail) — screenshots of internal admin/dashboard screens routinely carry this even when the product itself is real and legitimate. If anything like that is visible, stop and ask the user whether it's real or test/demo data before publishing the image anywhere on the site; don't assume either way. See `docs/CONTEUDO.md` under the affected project for a precedent (Contabilidade Reformada — confirmed test data).
- **A gallery image never opens the raw file.** `gallery` items with `src` in a project's data ([src/data/projects.js](src/data/projects.js)) open in [GalleryLightbox](src/components/GalleryLightbox.jsx) — an in-page accessible dialog (Esc/backdrop-click/close-button to dismiss, arrow-key and on-screen navigation between all of that case's gallery images, position indicator, visible caption from `alt`, focus trap, focus returns to the clicked thumbnail on close, body scroll locked while open) — never `<a href target="_blank">` straight to the `.webp` file. The gallery grid itself stays a grid, not a carousel; the lightbox is where slide-through navigation lives. Elements positioned over the lightbox image (`.lightbox-nav`, `.lightbox-close`) need an explicit `z-index` — without one, DOM order decides paint order, and `.lightbox-prev` (declared before `.lightbox-figure`) silently loses to the image while `.lightbox-next` (declared after) doesn't; this already broke once, don't reintroduce it.
- **Gallery never shows a light/dark duplicate of the same screen.** If a screenshot exists in both themes, keep only the light version in `gallery` (matches the site's own light-leaning look) and don't reference the dark file from any project data — but don't delete the dark asset either, in case a future project actually needs a dark-mode screenshot on its own merits.
- **Case screenshots are contained and proportional to the text, never full-bleed.** `.feature-shot`/`.feature-shot-img` in [site.css](src/styles/site.css) sit inside `.feature-row`'s grid (`repeat(auto-fit, minmax(220px, 1fr))`, an even split with the text column) and must never exceed the content column's max-width — the image is a visual reference, not the main content; whoever wants the real product has the "Ver ao vivo" link. `<img>` is a replaced element: without explicit `width: 100%; max-width: 100%; min-width: 0` on `.feature-shot-img`, a screenshot renders at its own intrinsic pixel size and can overflow the grid column regardless of the column's own width constraint — this bit the project once (see git history), don't reintroduce it. A plain `<div class="feature-shot">` placeholder never has this problem (no intrinsic content size), so it's not a reliable way to sanity-check a real `<img>` in the same class.
- **`aspect-ratio` on an `<img>` itself does not work when the element also has HTML `width`/`height` attributes** (which this project always sets, for anti-CLS). Reproduced and confirmed with Playwright: with `width: 100%; aspect-ratio: 4/3` on the `<img>` and `width`/`height` attributes present, Chromium ignores both the aspect-ratio and the scaled width and renders the image at the literal attribute pixel height instead — this broke `.project-card-thumb` (thumbnails on the home "Projetos em destaque" cards) once (see git history), producing visibly different thumbnail heights per card and misaligned titles/tags below them. The fix, and the required pattern anywhere an image needs a fixed crop ratio (home thumbnails, `.gallery-item`/`.gallery-item-img`, and any future `.feature-shot`-style crop): put `aspect-ratio` on a **wrapper container**, not the `<img>`, and have the `<img>` fill it with `width: 100%; height: 100%; object-fit: cover` (`.gallery-item-img img` already did this correctly, which is why it never hit the bug). Never put `aspect-ratio` directly on an `<img>` that keeps its `width`/`height` attributes.

## Reference material

[reference/](reference/) holds material extracted from Claude Design — reference only, not imported by the build, excluded from lint/watcher/editor search:

- `reference/mockup/Portfolio Alessandro.dc.html` + `support.js` + `thumbnail.webp` — the original visual mockup/prototype (a declarative template with `{{ }}` bindings and `<sc-if>`/`<sc-for>` custom elements, not runnable as-is; opens correctly via `file://` if you need to check it — its relative asset paths were fixed after the folder move). `src/pages/` + `src/styles/site.css` are a hand-built React port of the sections that exist; check the mockup before assuming a section is fully covered.
- `reference/design-system/` — the Orla design system the mockup is built on (full token set, bundled components, `readme.md`). `src/styles/tokens/` started as a copy of `tokens/*.css` from here, then was trimmed to what's actually used (see Architecture above).
- `reference/handoff-proposal/README.md` — a _proposed_ alternative architecture (Next.js 14 App Router + TypeScript strict + Tailwind + MDX) that was **not** taken; the site was built directly into the existing Vite + JS setup instead. Its `data/*.ts` scaffold files were deleted (empty/never populated) — the real content is in `src/data/*.js`.

This folder is the design system of Orla (orla.tech), the user's employer — used here as the visual foundation for the portfolio, not to be reused outside this project without checking, and worth keeping in mind since this repo is public.

`reference/` is intentionally versioned (not in `.gitignore`) — it's the audit trail for how the port was done, referenced directly from this file and from `docs/AUDITORIA-ESTRUTURA.md`.

The full migration history (what was audited, decided, and executed phase by phase) is in [docs/AUDITORIA-ESTRUTURA.md](docs/AUDITORIA-ESTRUTURA.md).

### VS Code Problems panel noise

Most Problems-panel items in this repo (previously ~240, mostly on `src/styles/site.css` and `reference/mockup/Portfolio Alessandro.dc.html`) come from the **Microsoft Edge Tools** extension's bundled `webhint` linter, not from Oxlint, the build, or the built-in CSS/HTML language service — those stay clean (`npm run build` and `npm run lint` both pass). Its config lives in [.hintrc](.hintrc) at the repo root.

`webhint` has no per-folder/per-file scoping (no `overrides`, no inline disable comments — confirmed against its docs and issue tracker), so `.hintrc` is necessarily project-wide. In practice this only mutes real noise: `compat-api/css` (browser-support warnings for `text-wrap: balance/pretty`, which degrade gracefully by design), `compat-api/html`, `no-inline-styles`, and `button-type` (the last two only ever fired on the generated `reference/mockup/*.dc.html`, which uses inline-style template bindings and non-interactive `<button>`s by construction — `index.html` and the JSX components already satisfy these hints natively).

Left un-silenced, on purpose:

- The "`transform`/`opacity` triggers Composite/Paint inside `@keyframes`" performance hints — inherent to any translate/opacity-based CSS animation (used by the marquee, rise-in, and mobile-nav-in animations); no webhint hint ID or documented VS Code setting was found to disable this specific check, and it's informational only (no build/runtime impact).
- A handful of HTML best-practice hints on `reference/mockup/*.dc.html` (`<title>`, `lang` attribute, `sc-for`/`sc-if` custom elements inside `<ul>`) — that file is a frozen, generated Figma/dc-runtime artifact (see above), not hand-authored markup, so it isn't rewritten to satisfy a validator.

## Convenções de escrita

- **Regra permanente, sem exceção**: nenhum texto voltado ao usuário usa travessão (—). Nenhuma página, nenhum case, nenhum post, nenhuma tagline, nenhuma meta tag, nenhum JSON-LD. Onde o travessão apareceria, usar vírgula, dois-pontos, ponto final, ou reescrever a frase.
- Evitar "não apenas X, mas também Y", "além disso" como abertura de frase, e adjetivos em fileira de três ("robusto, escalável e eficiente").
- Frases curtas e diretas. Se uma frase precisa de vírgula pra encaixar duas ideias, considerar quebrar em duas frases.
- Antes de qualquer commit que adicione ou edite texto voltado ao usuário, rodar `grep -rn "—" src/ index.html` e confirmar que retorna vazio. O `index.html` da raiz entra porque carrega texto de usuário de verdade (`<title>`, meta description) fora de `src/`; qualquer outro arquivo de marcação na raiz que ganhe texto de usuário no futuro entra na mesma checagem. Comentários técnicos em CSS/JS (ex.: `src/styles/tokens/*.css`, `src/components/OrlaMarquee.jsx`) são exceção esperada e não texto de usuário — se o grep só pegar esses, revise manualmente antes de assumir que há uma pendência real. `docs/CONTEUDO.md`, este arquivo e o `README.md` são documentação interna, não texto do site, e ficam fora dessa checagem.
- Nunca escrever contexto de origem ("nasceu porque X", "o cliente não tinha Y", "a empresa enfrentava Z") sem que o Alessandro tenha fornecido esse contexto explicitamente. Se faltar informação para justificar por que um projeto existe, deixar a descrição mais curta em vez de preencher o vazio com uma suposição plausível.

## Conteúdo do portfólio

[docs/CONTEUDO.md](docs/CONTEUDO.md) é a fonte da verdade do conteúdo do portfólio (trajetória,
projetos próprios, stack real). Antes de escrever ou alterar qualquer texto de projeto,
trajetória ou stack, leia `docs/CONTEUDO.md`. Nunca deduza feature a partir do código nem
invente métrica, número ou resultado. Se um fato não estiver em `docs/CONTEUDO.md`, pergunte em
vez de assumir.

Nenhum TODO deve chegar ao HTML renderizado. Placeholder de imagem é visual e sem texto de
tarefa.

## Branches and releases

- `main` is production; `hmg` is homologation/staging. Land features in `hmg` before merging to `main`.
- Releases on `main` are automated by release-please ([.github/workflows/release-please.yml](.github/workflows/release-please.yml), [release-please-config.json](release-please-config.json)) — it parses Conventional Commits to bump the version and generate `CHANGELOG.md`. Commit messages must follow `feat:`, `fix:`, `chore:`, etc. for this to work correctly.

## Custom Commands

### /cleanup

Quando eu digitar /cleanup, faça o seguinte:

1. Analise todos os arquivos da pasta raiz e subpastas.
2. Identifique arquivos HTML/CSS/JS soltos ou mal posicionados.
3. Sugira uma estrutura limpa de diretórios (ex: /src, /public, /components).
4. Identifique trechos de código acumulados ou desnecessários.
5. Apresente um resumo e peça minha autorização antes de mover ou deletar arquivos.
