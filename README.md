# Portfolio Alessandro Saldanha

Portfolio pessoal de Alessandro Saldanha, construído com React 19 + Vite (JavaScript puro, sem TypeScript), roteado no cliente com React Router e estilizado com os tokens do design system da Orla.

## Desenvolvimento

```bash
npm install
npm run dev       # servidor de desenvolvimento com HMR
npm run build     # build de produção
npm run preview   # preview do build de produção
npm run lint      # lint com Oxlint
```

## Estrutura

```
src/
  main.jsx              # monta <App/> em <BrowserRouter>
  App.jsx               # rotas + estado de tema (claro/escuro)
  index.css             # importa tokens + site.css, nesta ordem
  components/           # Header (com menu mobile), Footer — layout persistente; OrlaMarquee — carrossel da home
  pages/                # uma página por rota
  data/                 # conteúdo real (projetos, posts, empresas, etc.), JS puro
  styles/
    tokens/              # tokens do design system da Orla (cores, tipografia, espaçamento...)
    site.css             # classes de layout/componente do site

reference/              # material do Claude Design, fora do build — ver seção abaixo
docs/
  AUDITORIA-ESTRUTURA.md # auditoria da estrutura do projeto e histórico da migração
```

Convenção de imports: existe o alias `@/` → `src/` (configurado em `jsconfig.json` e `vite.config.js`), reservado para imports que sobem dois níveis ou mais. Imports de irmão direto (`./Foo`) e de um nível (`../data/x`) continuam relativos — é o que existe hoje em todo o projeto.

## `reference/`

Material extraído do Claude Design ao iniciar este projeto — **não faz parte do build** (nenhum arquivo é importado por `src/`, confirmado e reverificado a cada fase da migração; está fora do lint, do watcher do Vite e da busca do editor).

- `reference/mockup/` — o protótipo visual original (`Portfolio Alessandro.dc.html` + `support.js` + `thumbnail.webp`). Ainda serve de referência visual para seções do mockup que não foram migradas para `src/` (ver `docs/AUDITORIA-ESTRUTURA.md`, Fase 6).
- `reference/design-system/` — os tokens e o bundle de componentes do design system da Orla, de onde `src/styles/tokens/` foi copiado (e depois enxugado — ver abaixo).
- `reference/handoff-proposal/README.md` — uma proposta de arquitetura (Next.js + TypeScript) que não foi adotada; o site foi construído direto em `src/`.

## Adicionar um projeto novo

1. Adicione uma entrada em `src/data/projects.js`, seguindo o formato dos projetos existentes (`slug`, `name`, `tagline`, `overview`, `decisions`, `features`, `challenge`, `results`, `gallery` — os últimos quatro são opcionais e cada seção só renderiza se tiver conteúdo).
2. Marque `featured: true` se quiser que apareça na home.
3. Pronto — a listagem em `/projetos`, os filtros, a navegação anterior/próximo e a home se atualizam sozinhos. Nenhuma mudança de layout é necessária.

## Adicionar um post novo

1. Adicione uma entrada em `src/data/posts.js` com `slug`, `title`, `excerpt`, `date`, `read`, `tags` e `body` (array de blocos `{ kind: 'text' | 'heading' | 'code' | 'callout' | 'todo', text }`).
2. Pronto — o post entra em `/blog`, nos filtros de tag, e o sumário (TOC) da página do post é gerado automaticamente a partir dos blocos `heading`.

## Adicionar uma empresa/projeto no carrossel da home

Edite `src/data/companies.js` e adicione `{ name: 'Nome da Empresa' }` ao array `orlaProjects`. Os nomes aparecem como wordmarks tipográficos (mesma fonte, peso e cor para todos, sem logos). O carrossel (`src/components/OrlaMarquee.jsx`) mede a largura do conjunto em tempo de execução e calcula quantas cópias renderizar e a duração da animação, então o loop continua infinito e sem vão vazio conforme a lista cresce — não é preciso mexer em CSS.

## Pontos de preenchimento pendentes

- `src/data/social.js` — número de WhatsApp, usuário do GitHub, perfis de Facebook e Instagram (hoje `TODO`/placeholder).
- Fotos e screenshots reais de projetos, galeria e `/sobre` (hoje `"TODO: thumbnail"` / `"TODO: screenshot"` / `"TODO: foto"`).

## Estratégia de branches

- **`main`** — branch de produção. Só recebe merge de código já validado.
- **`hmg`** — branch de homologação, usada para validar mudanças antes de irem para produção.

Fluxo: features → `hmg` (homologação) → `main` (produção).

## Releases

Releases são geradas automaticamente pelo [release-please](https://github.com/googleapis/release-please) a cada push na `main`. A action lê os commits no padrão [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.), abre um PR de release com o changelog e a versão atualizada em `package.json`, e cria a tag/release no GitHub quando esse PR é mergeado.

Configuração em [release-please-config.json](release-please-config.json) e workflow em [.github/workflows/release-please.yml](.github/workflows/release-please.yml).
