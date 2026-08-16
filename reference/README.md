# reference/

Material extraído do Claude Design ao iniciar este projeto — **não faz parte do build**. Nenhum arquivo dentro desta pasta é importado por `src/`, `index.html` ou `vite.config.js` (confirmado em `docs/AUDITORIA-ESTRUTURA.md`). Está fora do escopo de lint (`.oxlintrc.json`), do watcher do Vite (`vite.config.js`) e da busca/indexação do editor (`.vscode/settings.json`).

- **`mockup/`** — o protótipo visual original (`Portfolio Alessandro.dc.html` + `support.js` + `thumbnail.webp`). Ainda é a referência visual para seções do site que não foram migradas para `src/`. Pode ser aberto para consulta, mas não é código-fonte.
- **`design-system/`** — os tokens e o bundle de componentes do design system da Orla de onde `src/styles/tokens/` foi copiado. Fica aqui como registro de proveniência.
- **`handoff-proposal/`** — uma proposta de arquitetura (Next.js + TypeScript) que não foi adotada; o site foi construído direto em `src/` (Vite + React, JS).

Pode ser apagada quando a migração de conteúdo do mockup para `src/` estiver completa e ninguém mais precisar consultar o visual original.
