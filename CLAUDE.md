# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Alessandro Saldanha, built with React 19 + Vite. The project was just scaffolded from the official `create-vite` React template — architecture, pages, and content are still to be defined.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — lint with Oxlint

There is no test runner configured yet. If tests are added later, document the run/single-test commands here.

## Architecture

- Entry point: [src/main.jsx](src/main.jsx) mounts [src/App.jsx](src/App.jsx) into `index.html`.
- Bundler config: [vite.config.js](vite.config.js) uses `@vitejs/plugin-react` (Oxc-based, not the SWC variant).
- Linting: Oxlint, configured in [.oxlintrc.json](.oxlintrc.json) with the `react` and `oxc` plugins; `react/rules-of-hooks` is an error.
- Plain JavaScript (JSX), no TypeScript — a TS template exists upstream if this project migrates later.
- `.claude/skills/` and `.claude/.agentes/` are reserved for project-specific Claude Code skills and agent definitions, currently empty scaffolds.
