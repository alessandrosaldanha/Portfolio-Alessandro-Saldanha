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
  components/           # Header (com menu mobile), Footer — layout persistente; OrlaMarquee — carrossel da home;
                        # SocialIcon — ícones das redes no Footer/Contato; FloatingTags — tags decorativas ao redor de uma foto,
                        # com faíscas animadas no topo de cada pill (CSS puro, respeita prefers-reduced-motion);
                        # 6 tags ao total, 2 delas (--ml/--mr) ocultas abaixo de 640px para não estourar a viewport;
                        # GalleryLightbox — dialog acessível pra ampliar imagem de galeria (Esc/fundo/botão fecha,
                        # setas navegam, focus trap, foco volta ao thumbnail ao fechar), usado por ProjetoDetalhe
  pages/                # uma página por rota
  data/                 # conteúdo real (projetos, posts, empresas, etc.), JS puro
  styles/
    tokens/              # tokens do design system da Orla (cores, tipografia, espaçamento...)
    site.css             # classes de layout/componente do site

reference/              # material do Claude Design, fora do build — ver seção abaixo
docs/
  AUDITORIA-ESTRUTURA.md # auditoria da estrutura do projeto e histórico da migração
  CONTEUDO.md            # fonte da verdade do conteúdo (trajetória, projetos próprios, stack real) — ler antes de editar texto
```

Convenção de imports: existe o alias `@/` → `src/` (configurado em `jsconfig.json` e `vite.config.js`), reservado para imports que sobem dois níveis ou mais. Imports de irmão direto (`./Foo`) e de um nível (`../data/x`) continuam relativos — é o que existe hoje em todo o projeto.

## `reference/`

Material extraído do Claude Design ao iniciar este projeto — **não faz parte do build** (nenhum arquivo é importado por `src/`, confirmado e reverificado a cada fase da migração; está fora do lint, do watcher do Vite e da busca do editor).

- `reference/mockup/` — o protótipo visual original (`Portfolio Alessandro.dc.html` + `support.js` + `thumbnail.webp`). Ainda serve de referência visual para seções do mockup que não foram migradas para `src/` (ver `docs/AUDITORIA-ESTRUTURA.md`, Fase 6).
- `reference/design-system/` — os tokens e o bundle de componentes do design system da Orla, de onde `src/styles/tokens/` foi copiado (e depois enxugado — ver abaixo).
- `reference/handoff-proposal/README.md` — uma proposta de arquitetura (Next.js + TypeScript) que não foi adotada; o site foi construído direto em `src/`.

## Adicionar um projeto novo

Antes de escrever qualquer texto de projeto (contexto, papel, features), confira [docs/CONTEUDO.md](docs/CONTEUDO.md) — é a fonte da verdade dos fatos (trajetória, produtos próprios, escopo real de cada cliente). Não deduza feature a partir do código nem invente métrica ou resultado; se um fato não estiver lá, é melhor perguntar do que assumir.

1. Adicione uma entrada em `src/data/projects.js`, seguindo o formato dos projetos existentes (`slug`, `name`, `tagline`, `overview`, `decisions`, `features`, `challenge`, `results`, `gallery` — os últimos quatro são opcionais e cada seção só renderiza se tiver conteúdo).
2. Cada item de `features` aceita `href` opcional (troca o placeholder de screenshot por um link "Ver ao vivo") e/ou `image: { src, alt, width, height }` opcional (troca o placeholder por uma screenshot real; com os dois juntos, a imagem vira o link clicável), além de `highlight` opcional (uma tag curta ao lado do título, ex. "Entrega solo"). O título da seção "Funcionalidades principais" pode ser sobrescrito com `featuresLabel`, útil quando os itens são na verdade projetos distintos (ver o case `orla-corporativos`). `coverImage: { src, alt, width, height }` no projeto (não no feature) mostra uma imagem de capa logo abaixo do cabeçalho do case, e `thumb: { src, alt, width, height }` troca o placeholder do card de destaque na home por uma screenshot real. Cada item de `gallery` aceita uma string simples (vira botão de texto, sem imagem) ou `{ src, alt, width, height }` (vira thumbnail clicável que abre em [GalleryLightbox](src/components/GalleryLightbox.jsx), nunca o arquivo `.webp` direto). Todo campo de imagem precisa de `alt` descritivo, nunca `"screenshot"` ou vazio; nunca reaproveitar a mesma imagem em dois blocos diferentes do mesmo case, nem manter versão clara e escura da mesma tela na galeria (ver CLAUDE.md).
3. Marque `featured: true` se quiser que apareça na home.
4. Pronto — a listagem em `/projetos`, os filtros, a navegação anterior/próximo e a home se atualizam sozinhos. Nenhuma mudança de layout é necessária.

## Adicionar um post novo

1. Adicione uma entrada em `src/data/posts.js` com `slug`, `title`, `excerpt`, `date`, `read`, `tags` e `body` (array de blocos `{ kind: 'text' | 'heading' | 'code' | 'callout', text }`). O renderer também aceita `kind: 'todo'` por compatibilidade, mas não use: nenhum texto de tarefa (ex. "TODO: continuar...") pode chegar ao HTML renderizado.
2. Pronto — o post entra em `/blog`, nos filtros de tag, e o sumário (TOC) da página do post é gerado automaticamente a partir dos blocos `heading`.

## Adicionar uma empresa/projeto no carrossel da home

Edite `src/data/companies.js` e adicione `{ name: 'Nome da Empresa' }` ao array `orlaProjects`. Os nomes aparecem como wordmarks tipográficos (mesma fonte, peso e cor para todos, sem logos). O carrossel (`src/components/OrlaMarquee.jsx`) mede a largura do conjunto em tempo de execução e calcula quantas cópias renderizar e a duração da animação, então o loop continua infinito e sem vão vazio conforme a lista cresce — não é preciso mexer em CSS.

## Convenções de escrita

Texto voltado ao usuário (bio, cards de projeto, posts, meta description, alt text) não usa travessão (—) nem outros tiques comuns de escrita gerada por IA. Regras completas na seção "Convenções de escrita" do [CLAUDE.md](CLAUDE.md).

## Pontos de preenchimento pendentes

- Nexus (WeSafety), Maré de Estudos e Gestão de Escalas já têm screenshots reais (`coverImage`, `thumb`, imagem por `feature` e `gallery` — ver `src/assets/nexus/`, `src/assets/mare-estudos/` e `src/assets/escalas/`). Os demais projetos (Contabilidade Reformada, Sorria, IBR Maceió, IBR Maragogi, Supermercado Vital, `orla-corporativos`) ainda não têm foto real; os placeholders (`.project-card-thumb` na home, `.feature-shot` no case) são caixas vazias estilizadas, sem texto de tarefa — nenhum "TODO" deve aparecer renderizado (regra em [CLAUDE.md](CLAUDE.md)). A foto de `/sobre` já foi adicionada (`src/assets/perfil-alessandro.jpeg`).
- Link ao vivo de Gestão de Escalas ainda aponta para o ambiente do Vercel (`gestaodeescalas-seven.vercel.app`); sem domínio próprio confirmado até o momento (ver [docs/CONTEUDO.md](docs/CONTEUDO.md)).
- Três logos do marquee de clientes (Droga Raia, Papelzinho, FixInfra) seguem em texto — os arquivos recebidos falharam a validação de formato/duplicidade e estão em `_pending-assets/` (gitignorada) aguardando reenvio (ver [docs/CONTEUDO.md](docs/CONTEUDO.md)).

## Estratégia de branches

- **`main`** — branch de produção. Só recebe merge de código já validado.
- **`hmg`** — branch de homologação, usada para validar mudanças antes de irem para produção.

Fluxo: features → `hmg` (homologação) → `main` (produção).

## Releases

Releases são geradas automaticamente pelo [release-please](https://github.com/googleapis/release-please) a cada push na `main`. A action lê os commits no padrão [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.), abre um PR de release com o changelog e a versão atualizada em `package.json`, e cria a tag/release no GitHub quando esse PR é mergeado.

Configuração em [release-please-config.json](release-please-config.json) e workflow em [.github/workflows/release-please.yml](.github/workflows/release-please.yml).
