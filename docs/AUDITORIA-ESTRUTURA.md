# Auditoria de estrutura — Portfolio Alessandro Saldanha

Data: 2026-08-16. Auditoria somente-leitura — nenhum arquivo foi alterado, movido ou apagado na execução desta tarefa.

## 1. Resumo executivo

O app real é pequeno, correto e **não tem duplicação funcional**: `index.html` → `src/main.jsx` → `src/App.jsx` → `pages/`/`components/`/`data/`/`styles/` é a única cadeia que o Vite serve, e todo arquivo dentro de `src/` é alcançável a partir dela — não há órfãos em `src/`. A confusão visual vem de coexistir, na raiz do repo, uma pasta `design/` com **151 KB de artefatos do Claude Design** (o mockup `.dc.html`, o runtime `support.js`, o bundle de componentes `_ds_bundle.js`, um manifesto JSON e um handoff `.ts` nunca populado) que **não é importada por nada** — nem por `vite.config.js`, nem por `index.html`, nem por qualquer arquivo em `src/` (grep confirma zero ocorrências fora de um comentário). O `npm run lint` do projeto já reporta **0 problemas** hoje, porque `.oxlintrc.json` tem `ignorePatterns: ["design/**"]`. Os "456 problemas" do painel do editor não vêm do lint do projeto — não consegui reproduzir esse número exato pelo terminal (ver seção 5), mas a causa mais provável e verificável é o editor analisando arquivos dentro de `design/` que o lint do projeto ignora: `design/handoff/data/projects.ts` importa `zod`, que **não está instalado** (confirmei em `package.json`/`package-lock.json`/`node_modules`), e as ~18 ocorrências de `text-wrap`/`backdrop-filter`/`color-mix` dentro do HTML de 894 linhas do mockup provavelmente geram avisos de compatibilidade de navegador por atributo `style=""`. Nenhum desses arquivos afeta o build ou o site publicado. A ação recomendada não é reescrever nada — é mover `design/` para fora do escopo de análise do editor e formalizar a separação que já existe de fato.

## 2. Diagnóstico detalhado

### 2.1 Qual é a aplicação real hoje

Confirmado lendo os três arquivos:

- `index.html:12` → `<script type="module" src="/src/main.jsx"></script>` — único entrypoint servido pelo Vite.
- `vite.config.js` — configuração padrão do `create-vite` (`@vitejs/plugin-react`), sem `root`, `publicDir` ou `resolve.alias` customizados que pudessem apontar para `design/`.
- `src/main.jsx` → importa `./index.css` e `./App.jsx`, envolve `<App/>` em `<BrowserRouter>`.

`design/Portfolio Alessandro.dc.html` **não é servido, nem importado, nem referenciado por nenhum build step**. Não é standalone: seu `<head>` carrega `<script src="./support.js">` e, dentro do `<x-dc>`, faz `link rel="stylesheet"` para 6 arquivos em `_ds/.../tokens/*.css` + `_ds/.../styles.css` e `<script src="_ds/.../_ds_bundle.js">` — ou seja, só "roda" (como preview do Claude Design) se aberto no contexto do próprio Claude Design ou servido lado a lado com `support.js` e `_ds/`, o que este repo não faz. Verifiquei via grep (`design|_ds|dc\.html|handoff` em `src/`) que a única menção a `design/` dentro de `src/` é um **comentário** em `src/styles/site.css:4` ("ported from... see design/Portfolio Alessandro.dc.html"), não uma referência funcional.

Árvore de arquivos relevante (sem `node_modules/`, `.git/`), com tamanho:

```
.claude/.agentes/.gitkeep                                    0
.claude/skills/.gitkeep                                      0
.claude/skills/SKILL.md                                    4.0K
.github/workflows/release-please.yml                       1.0K
.gitignore                                                  1.0K
.oxlintrc.json                                              1.0K
.release-please-manifest.json                               1.0K
CLAUDE.md                                                   8.0K
README.md                                                   4.0K
design/Portfolio Alessandro.dc.html                          76K
design/_ds/ds-orla-.../_adherence.oxlintrc.json              20K
design/_ds/ds-orla-.../_ds_bundle.js                         72K
design/_ds/ds-orla-.../_ds_manifest.json                     20K
design/_ds/ds-orla-.../readme.md                            8.0K
design/_ds/ds-orla-.../styles.css                            4.0K
design/_ds/ds-orla-.../tokens/{base,colors,effects,fonts,spacing,typography}.css   4.0K cada (24K total)
design/handoff/README.md                                    8.0K
design/handoff/data/{companies,projects,social}.ts          4.0K cada (12K total)
design/support.js                                            72K
design/thumbnail.webp                                       4.0K
index.html                                                  1.0K
package-lock.json                                            44K
package.json                                                1.0K
public/favicon.svg                                           12K
public/logos/{anbima,droga-raia,drogasil,papelzinho}.svg     12–20K cada (60K total)
release-please-config.json                                  1.0K
src/App.jsx                                                 4.0K
src/components/{Footer,Header}.jsx                          4.0K cada
src/data/companies.js                                       4.0K
src/data/posts.js                                           8.0K
src/data/projects.js                                         20K
src/data/social.js                                          4.0K
src/data/stack.js                                           1.0K
src/data/timeline.js                                        4.0K
src/index.css                                                1.0K
src/main.jsx                                                 1.0K
src/pages/{Blog,Contato,Home,Post,ProjetoDetalhe,Projetos,Sobre}.jsx   4–8K cada
src/styles/site.css                                          28K
src/styles/tokens/{base,colors,effects,fonts,spacing,typography}.css   4.0K cada (24K total)
vite.config.js                                               1.0K
```

`design/` sozinha soma **~300 KB** contra **~110 KB** de `src/` — ela é fisicamente maior que o app, o que explica boa parte da sensação de "confuso" ao abrir o projeto no editor.

### 2.2 Grafo de dependências e arquivos órfãos

Grafo a partir de `src/main.jsx` (import estático, um nível por linha):

```
src/main.jsx
├── src/index.css
│     ├── styles/tokens/fonts.css
│     ├── styles/tokens/colors.css
│     ├── styles/tokens/typography.css
│     ├── styles/tokens/spacing.css
│     ├── styles/tokens/effects.css
│     ├── styles/tokens/base.css
│     └── styles/site.css
└── src/App.jsx
      ├── components/Header.jsx
      ├── components/Footer.jsx   → data/social.js
      ├── pages/Home.jsx          → data/companies.js, data/projects.js, data/posts.js, data/stack.js, data/social.js
      ├── pages/Projetos.jsx      → data/projects.js
      ├── pages/ProjetoDetalhe.jsx→ data/projects.js
      ├── pages/Blog.jsx          → data/posts.js
      ├── pages/Post.jsx          → data/posts.js
      ├── pages/Sobre.jsx         → data/timeline.js, data/stack.js
      └── pages/Contato.jsx       → data/social.js
```

`public/logos/*.svg` não aparecem no grafo de import porque são referenciados por **caminho absoluto de string** (`/logos/anbima.svg` etc.) em `src/data/companies.js`, servidos estaticamente pelo Vite a partir de `public/` — confirmei que os 4 arquivos citados existem exatamente com esses nomes em `public/logos/`. `public/favicon.svg` é referenciado do mesmo jeito em `index.html:6`.

Classificação de cada arquivo:

- **(a) Alcançável pelo entrypoint**: todo arquivo em `src/` (17 arquivos) + `public/favicon.svg` + `public/logos/*.svg` (4 arquivos). Nenhum órfão encontrado dentro de `src/` ou `public/` — todo módulo criado é importado por pelo menos um outro.
- **(b) Órfão**: nenhum dentro de `src/`. **Fora de `src/`**, todo o conteúdo de `design/` é órfão *do ponto de vista do bundler* (zero imports apontando para lá) — mas não é lixo, é (d).
- **(c) Infraestrutura**: `.github/workflows/release-please.yml`, `.oxlintrc.json`, `.gitignore`, `.release-please-manifest.json`, `release-please-config.json`, `vite.config.js`, `package.json`, `package-lock.json`, `CLAUDE.md`, `README.md`, `.claude/skills/SKILL.md` (skill genérico salvo pelo usuário, não é específico deste app), `.claude/.agentes/.gitkeep`, `.claude/skills/.gitkeep`.
- **(d) Artefato de handoff**: tudo em `design/` (mockup `.dc.html`, `support.js`, `thumbnail.webp`, `_ds/` inteiro, `handoff/README.md`, `handoff/data/*.ts`).

Tokens de `design/_ds/.../tokens/*.css` que **estão** de fato na cadeia do app: **nenhum diretamente** — eles não são importados por `src/`. O que está na cadeia é a **cópia** em `src/styles/tokens/*.css` (mesmos 6 arquivos, mesmo conteúdo — comparei linha a linha, são idênticos byte a byte no que pude verificar por leitura). Ou seja: os tokens originais em `design/_ds/` não têm papel funcional nenhum hoje; servem só de registro de onde `src/styles/tokens/` veio.

`design/handoff/data/` vs `src/data/`: **não têm o mesmo conteúdo, e isso é importante**:
- `design/handoff/data/projects.ts` — só schema Zod + `export const projects: Project[] = []` (array vazio, comentário dizendo "copie do design mockup ao popular"). **Não tem os 5 projetos.**
- `design/handoff/data/companies.ts` — 5 empresas com campo `logo` apontando para arquivos que não existem (`/logos/orla.svg`, `/logos/rd.svg`, `/logos/conviva.svg`, `/logos/sorria.svg` — nenhum desses existe em `public/logos/`, só `anbima`, `droga-raia`, `drogasil`, `papelzinho` existem).
- `design/handoff/data/social.ts` — populado (5 redes sociais, mesmos placeholders `TODO`/`55TODO`), mas com formato diferente do `src/data/social.js` (tem `key` tipado e falta os campos `short`/`hint` que `src/data/social.js` usa).
- `src/data/{companies,posts,projects,social,stack,timeline}.js` — **é a fonte de verdade real**, com os 5 projetos completos, 3 posts, timeline e stack, todos populados a partir do conteúdo embutido no `<script>` de `Portfolio Alessandro.dc.html`.

Conclusão: **não há cópia morta redundante** — `design/handoff/data/*.ts` é um scaffold que nunca foi preenchido, `src/data/*.js` é quem tem o conteúdo real. Mas o scaffold ficou desatualizado até no shape do dado (a divisão de `RD Group` em `Droga Raia`/`Drogasil` e a adição de `Papelzinho` só existem em `src/data/companies.js`).

### 2.3 Cobertura da migração

| Seção/componente no handoff HTML | Existe em `src/`? | Arquivo | Fidelidade |
|---|---|---|---|
| Header (nav, logo, toggle de tema, botão Contato) | Sim | `src/components/Header.jsx` | Alta — mesmos itens de nav, ícone de tema, botão |
| Footer (nome, localização, ícones sociais) | Sim | `src/components/Footer.jsx` | Alta |
| Home → Hero | Sim | `src/pages/Home.jsx` | Alta — texto idêntico |
| Home → Marquee de empresas | Sim | `src/pages/Home.jsx` + `src/data/companies.js` | Parcial — texto igual, mas **diverge do mock**: mock tem 5 empresas em texto; `src` tem 7 (RD Group virou 2 logos separados + Papelzinho foi adicionado, ausente no mock original) |
| Home → Projetos em destaque | Sim | `src/pages/Home.jsx` + `data/projects.js` | Alta |
| Home → Stack | Sim | `src/pages/Home.jsx` + `data/stack.js` | Alta |
| Home → Escrevendo (posts) | Sim | `src/pages/Home.jsx` + `data/posts.js` | Alta |
| Home → CTA band | Sim | `src/pages/Home.jsx` | Alta |
| `/projetos` (lista + filtros) | Sim | `src/pages/Projetos.jsx` | Alta |
| `/projetos/:slug` (detalhe completo) | Sim | `src/pages/ProjetoDetalhe.jsx` | Alta — decisões, features, challenge, results, gallery, nav prev/next |
| `/blog` (lista + filtro por tag) | Sim | `src/pages/Blog.jsx` | Alta |
| `/blog/:slug` (post + TOC) | Sim | `src/pages/Post.jsx` | Alta |
| `/sobre` (bio, timeline, ferramentas) | Sim | `src/pages/Sobre.jsx` | Alta |
| `/contato` (form + canais) | Sim | `src/pages/Contato.jsx` | Alta — envio é só local (`setState`), não integrado a nenhum serviço — igual ao mock, que também só simulava |
| `_ds_bundle.js` (Button/Card/Logo/Badge/Icon etc. como componentes React prontos) | **Não** | — | Decisão deliberada: são componentes empacotados pro runtime do Claude Design (`window.OrlaDesignSystem_5529f2`), não um pacote npm importável; recriei o visual com classes CSS próprias em `site.css` em vez de consumir o bundle |
| `support.js` (runtime `<x-dc>`, `<sc-for>`, `<sc-if>`, engine de hover via `style-hover`) | **Não, e não deveria** | — | É infraestrutura de autoria do Claude Design (equivalente ao "renderer" do mockup); React + JSX substitui isso nativamente |
| `thumbnail.webp` | **Não** | — | Nunca foi um asset do site — é a miniatura de preview do próprio arquivo de design; confirmei zero referências |
| Fotos/screenshots reais (projeto, galeria, `/sobre`) | **Não, mas não é regressão** | — | O mock já tinha só placeholders `"TODO: thumbnail"`/`"TODO: screenshot"`/`"TODO: foto"` — `src/` preserva os mesmos placeholders, não piorou nem resolveu |
| Números/perfis reais em `data/social.ts` (WhatsApp, GitHub, Facebook, Instagram) | **Não, herdado do mock** | `src/data/social.js` | Mock já tinha `55TODO`/`github.com/TODO` etc. — preservado como estava |

### 2.4 Sistema de estilos

Coexistem hoje **duas cópias do mesmo sistema de tokens**, não duas estratégias diferentes:

1. `design/_ds/.../tokens/*.css` + `design/_ds/.../styles.css` (barril que só faz `@import` dos tokens) — órfã, não importada por ninguém.
2. `src/styles/tokens/*.css` (cópia idêntica dos 6 arquivos acima) + `src/styles/site.css` (1312 linhas de classes de layout/componente escritas para este app) — importadas em cascata única via `src/index.css` (7 `@import` em sequência: fonts → colors → typography → spacing → effects → base → site).

Não há terceira estratégia: **não existe CSS-in-JS, não existe Tailwind, não existe CSS Module** — é CSS global puro em ambos os lugares. Não há conflito de nomes de variável entre as duas cópias porque são o mesmo arquivo duplicado, não sistemas diferentes — não há uma "guerra de tokens", há uma cópia excedente.

Não encontrei cadeia de import quebrada: os 7 `@import` de `src/index.css` resolvem todos para arquivos existentes em `src/styles/`; nenhum `@import`/`url()`/`src=` dentro de `src/` aponta para fora de `src/` ou `public/` (grep confirmou). O único `@import` remoto é a Google Fonts URL dentro de `tokens/fonts.css`, presente igual nas duas cópias.

### 2.5 Os 456 problemas

Rodei `npm run lint` (= `oxlint`, único linter configurado em `package.json`) no estado atual do repo:

```
> alessandro-saldanha@0.0.0 lint
> oxlint
EXIT: 0
```

**Zero problemas.** Isso é porque `.oxlintrc.json:4` tem `"ignorePatterns": ["design/**"]`. Antes dessa regra existir (verifiquei o histórico desta mesma sessão de trabalho), rodar oxlint sem o ignore produzia **29 avisos**, todos dentro de `design/`:
- 26 em `design/_ds/.../_ds_bundle.js` (13 ocorrências × 2 regras cada: `eslint(no-func-assign)` no helper `_extends` e `eslint(no-unused-expressions)` — código gerado/minificado do bundle de componentes, não escrito à mão)
- 3 em `design/support.js` (1 `react-hooks(exhaustive-deps)`, 2 `no-unused-expressions`)

Isso são **29, não 456** — o oxlint do projeto (CLI, via `.oxlintrc.json`) não explica o número que aparece no painel do editor. **Não consegui verificar diretamente o painel de Problemas do VS Code pelo terminal** — ele agrega diagnósticos de motores que não são o `oxlint` do projeto (linguagem CSS embutida, serviço de linguagem TS/JS embutido, possivelmente uma extensão de oxlint que analisa arquivo-aberto independente do `ignorePatterns` do projeto). Duas causas concretas que **verifiquei e são compatíveis com um número muito maior**:

1. **`zod` não está instalado**: `design/handoff/data/projects.ts:1` faz `import { z } from 'zod'`. Busquei `zod` em `package.json`, `package-lock.json` e `node_modules/` — não aparece em nenhum dos três. Se o editor tenta checar tipos desse `.ts` (mesmo sem `tsconfig.json` no repo, o serviço de linguagem embutido do VS Code faz aquisição de tipo em arquivos `.ts` abertos), isso gera erro de "módulo não encontrado" repetido pelas ~9 assinaturas de schema que usam `z.*` no arquivo.
2. **Avisos de compatibilidade de CSS em atributos `style=""` inline**: `design/Portfolio Alessandro.dc.html` (894 linhas) tem **18 ocorrências** de `text-wrap` (contra 14 em `src/styles/site.css`), mais `backdrop-filter`, `color-mix`, `mask-image`, `aspect-ratio` repetidos dezenas de vezes, cada um dentro de um atributo `style=""` diferente. Já vi esse padrão de diagnóstico neste mesmo editor durante a sessão anterior (ex.: `'text-wrap' is not supported by Chrome < 114` e `'text-wrap: pretty' is not supported by Firefox...` — dois avisos por ocorrência, em arquivos `.css`); em um HTML com dezenas de atributos `style` inline repetindo essas propriedades, o mesmo padrão multiplicado facilmente passa de 300+ ocorrências.

Não afirmo que a soma exata é 456 — não tenho como rodar o mecanismo de diagnóstico do editor pelo terminal para confirmar o número exato. O que dá para afirmar com confiança, porque é verificável por leitura: **nenhum desses avisos vem de `src/` nem afeta o app publicado** — a fonte é `design/`, e o motivo de aparecerem é o editor analisar arquivos que o `oxlint` do projeto já opta por ignorar.

Quantos desapareceriam se `design/` saísse do escopo do editor (não só do lint do projeto): pelas evidências acima, a esmagadora maioria — plausivelmente todos, exceto os que porventura já existam hoje dentro de `src/` (não encontrei nenhum rodando `oxlint` sobre `src/` isoladamente, que já está implícito no resultado "0 problemas" acima, já que `src/` não está no `ignorePatterns`).

### 2.6 Configuração e convenções

- **`vite.config.js`**: mínimo, padrão do template `create-vite` com `@vitejs/plugin-react`. Nada aponta para `design/`. Sem observações.
- **`.oxlintrc.json`**: plugins `react`+`oxc`, `ignorePatterns: ["design/**"]`, duas regras customizadas (`react/rules-of-hooks: error`, `react/only-export-components: warn`). Consistente com o que existe em `src/`.
- **`package.json`**: scripts (`dev`, `build`, `lint`, `preview`) todos batem com os comandos documentados em `CLAUDE.md`. Dependências de runtime: `react`, `react-dom`, `react-router-dom` — todas usadas (confirmei import em `src/`). Dev dependencies: `@vitejs/plugin-react`, `oxlint`, `vite` — usadas. **`@types/react` e `@types/react-dom` estão instaladas mas não há `tsconfig.json`/`jsconfig.json` no repo e não há nenhum arquivo `.ts`/`.tsx` dentro de `src/`** — são vestígio do template `create-vite`, sem efeito de build. **Reclassificado em 2026-08-16**: não são "sem uso ativo" — alimentam a aquisição automática de tipos do VS Code em `.jsx` mesmo sem `tsconfig`/`jsconfig`, então são "usadas apenas por tooling de editor". Decisão: manter (o custo de remover — perder autocomplete de props do React — é maior que o benefício de tirar duas devDependencies pequenas).
- **`.gitignore`**: `node_modules`, `dist`, `dist-ssr`, `*.local`, logs, pastas de editor (`.vscode/*` exceto `extensions.json`, `.idea`). **Não** ignora `design/` — está tudo versionado, incluindo o bundle de 72 KB e o webp — o que é uma escolha válida (é conteúdo de referência pequeno o bastante pra versionar), mas explica o peso do repo. Não encontrei nada sendo versionado que devesse estar no `.gitignore` (sem `.env`, sem chave, sem pasta de build).
- **`release-please-config.json`** / **`.release-please-manifest.json`** / **`.github/workflows/release-please.yml`**: consistentes entre si — o workflow aponta pro config e manifest corretos, `release-type: node` bate nos dois lugares, dispara em push pra `main`. Sem problema encontrado.
- **`CLAUDE.md`**: já documenta corretamente o estado atual (seções "Architecture" e "Design reference" descrevem exatamente a separação `src/` vs `design/` encontrada nesta auditoria, incluindo o aviso de que os dados do handoff são scaffold vazio). Não encontrei divergência entre o que o `CLAUDE.md` diz e o que o código faz.
- **`.claude/skills/SKILL.md`**: define um padrão genérico de monorepo `/frontend` + `/backend` com TypeScript — **não é aplicado neste projeto** (não há `/backend`, não há TypeScript em `src/`). Isso é esperado: é um skill de referência salvo pelo usuário, não uma diretriz específica deste repo; não é uma inconsistência de arquitetura, é um documento não relacionado ao escopo desta migração.

## 3. Inventário completo de arquivos

| Caminho | Classe | Ação recomendada | Justificativa |
|---|---|---|---|
| `index.html` | c | manter | Entrypoint real do Vite |
| `vite.config.js` | c | manter | Config mínima, correta |
| `package.json` / `package-lock.json` | c | manter | Deps de runtime todas em uso; `@types/react(-dom)` usadas só por tooling de editor (aquisição automática de tipos em `.jsx`) — decisão: manter |
| `.oxlintrc.json` | c | manter | `ignorePatterns` já resolve o lint do projeto |
| `.gitignore` | c | manter | Nada indevido versionado |
| `.release-please-manifest.json`, `release-please-config.json`, `.github/workflows/release-please.yml` | c | manter | Consistentes entre si |
| `CLAUDE.md`, `README.md` | c | manter | Já refletem o estado real |
| `.claude/skills/SKILL.md` | c | manter | Skill genérico do usuário, não específico deste repo |
| `.claude/.agentes/.gitkeep`, `.claude/skills/.gitkeep` | c | manter | Placeholders de pasta vazia |
| `src/main.jsx`, `src/App.jsx` | a | manter | Entrypoint/roteador, sem problema |
| `src/components/Header.jsx`, `Footer.jsx` | a | manter | Em uso |
| `src/pages/*.jsx` (7 arquivos) | a | manter | Todos em uso, mapeados na seção 2.3 |
| `src/data/*.js` (6 arquivos) | a | manter | Fonte de verdade do conteúdo |
| `src/styles/site.css` | a | manter | Única folha de estilo de layout do app |
| `src/styles/tokens/*.css` (6 arquivos) | a | mover (ver seção 4) | Correto em conteúdo; só muda de endereço na reorganização proposta |
| `public/favicon.svg`, `public/logos/*.svg` | a | manter | Referenciados e existentes |
| `design/Portfolio Alessandro.dc.html` | d | arquivar (mover, não apagar) | Órfã do bundler; referência histórica do que foi migrado |
| `design/support.js` | d | arquivar | Runtime do Claude Design, sem função fora dele |
| `design/thumbnail.webp` | d | arquivar | Preview do arquivo de design, nunca foi asset do site |
| `design/_ds/.../*` (tokens, bundle, manifest, readme, `_adherence.oxlintrc.json`) | d | arquivar | Duplicata de origem dos tokens hoje em `src/styles/tokens/`; bundle/manifest não são consumidos |
| `design/handoff/README.md` | d | arquivar | Proposta de arquitetura (Next.js/TS) não adotada; útil só como registro de decisão |
| `design/handoff/data/*.ts` | d | remover **ou** arquivar | Scaffold nunca populado, desatualizado até no shape do dado (não reflete `Droga Raia`/`Drogasil`/`Papelzinho`); risco de alguém futuramente confundir com fonte de verdade |

Não há nenhum arquivo em `src/` ou `public/` classificado como órfão (b) — todos os órfãos do repositório estão em `design/`, que é artefato de handoff (d) por definição, não lixo a esmo.

## 4. Arquitetura-alvo proposta

```
portfolio-alessandro-saldanha/
├── index.html
├── vite.config.js
├── package.json
├── CLAUDE.md
├── README.md
├── .oxlintrc.json
├── .gitignore
├── .github/
├── .claude/
├── public/
│   ├── favicon.svg
│   └── logos/*.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css                  (barril de @import, como hoje)
│   ├── styles/
│   │   ├── tokens/*.css           (fica onde está — já é o único lugar em uso)
│   │   └── site.css
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   └── *.jsx                  (como hoje)
│   └── data/
│       └── *.js                   (como hoje)
└── reference/                      (renomeado de design/)
    ├── README.md                   (novo — 3 linhas: "isto é histórico, não é importado por nada, ver CLAUDE.md")
    ├── mockup/
    │   ├── Portfolio Alessandro.dc.html
    │   ├── support.js
    │   └── thumbnail.webp
    ├── design-system/              (renomeado de _ds/ds-orla-.../)
    │   ├── readme.md
    │   ├── styles.css
    │   ├── tokens/*.css
    │   ├── _ds_bundle.js
    │   └── _ds_manifest.json
    └── handoff-proposal/           (renomeado de handoff/)
        └── README.md               (data/*.ts removido — ver decisão pendente na seção 6)
```

Por que isso e não outra coisa:

- **`src/` não muda de forma nenhuma.** Já está correto — zero órfãos, zero duplicação, convenção padrão de app Vite+React (`components/`, `pages/`, `data/`, `styles/`). Reescrever o que já funciona seria risco sem benefício; a tarefa pede reorganização estrutural, não redesenho.
- **Renomear `design/` → `reference/`** resolve o problema real, que é de **nome e escopo do editor**, não de import: `design/` soa como "onde o design vive", competindo visualmente com `src/styles/` e `src/pages/` no explorador de arquivos; `reference/` deixa claro que é material histórico read-only. Alternativa descartada: manter o nome `design/` e só adicionar um `.oxlintignore`/exclude no editor — resolve os avisos, mas não resolve a confusão de navegação que o pedido original descreve ("não sei se as duas versões coexistem duplicadas").
- **Excluir `reference/` da indexação do editor** (via configuração de workspace, não abordada aqui por não ser arquivo do repo) é o que efetivamente mata os falsos "problemas" — renomear sozinho não impede o language server de continuar analisando os arquivos se ainda estiverem dentro do workspace aberto.
- **Subpastas `mockup/`, `design-system/`, `handoff-proposal/`** em vez de despejar tudo solto: cada uma tem uma pergunta diferente que ela responde ("como era o design", "de onde vieram os tokens", "o que foi cogitado e não foi feito") — útil pra quem abrir o repo em 6 meses sem contexto desta conversa. Alternativa descartada: um único `archive.zip` — mais difícil de dar `grep`/ler depois; descartei por reduzir a própria utilidade de "referência".
- **Não remover `design/_ds/tokens/*.css` mesmo sendo idêntico a `src/styles/tokens/*.css`**: é o registro de proveniência (de onde os tokens vieram, com o nome original do design system `ds-orla-...`). Remover a cópia de referência economiza ~24 KB mas apaga rastreabilidade; trade-off que não vale a pena pelo tamanho envolvido.
- **`@types/react`/`@types/react-dom` não entram na árvore-alvo como ação obrigatória** — ficam como decisão em aberto (seção 6), porque removê-las é uma mudança de dependência, não de estrutura de pastas, e o pedido desta tarefa é só diagnóstico.

## 5. Plano de migração faseado

Cada fase é isolada e tem critério de sucesso verificável por comando. Ordenado por risco crescente.

**Fase 0 — nenhuma mudança de arquivo (feita nesta tarefa).**
Critério de sucesso: este relatório existe em `docs/AUDITORIA-ESTRUTURA.md` e `git status` não mostra nenhuma outra alteração.

**Fase 1 — configuração do editor, zero risco, reversível em 1 clique.**
Excluir `design/` (ou `reference/`, dependendo da ordem escolhida) da indexação/analise do editor via configuração de workspace do VS Code.
Critério de sucesso: painel de Problemas cai para próximo de 0 sem tocar em nenhum arquivo versionado.
Reversível: sim, é config local, não é commitada por padrão (ou é, mas basta reverter a chave).

**Fase 2 — renomear a pasta, sem tocar em conteúdo.**
`git mv design reference` (ou nome equivalente), git mv das 3 subpastas internas (`mockup/`, `design-system/`, `handoff-proposal/`) só reorganizando arquivos já existentes, sem editar conteúdo.
Critério de sucesso: `npm run dev` sobe igual, `npm run build` gera o mesmo `dist/`, `npm run lint` continua em 0 (ajustando `ignorePatterns` em `.oxlintrc.json` para o novo nome de pasta).
Reversível: sim, é rename dentro do git, `git mv` de volta desfaz.

**Fase 3 — decisão sobre `handoff-proposal/data/*.ts` (ver seção 6).**
Ou remove (se a decisão for "não vamos usar isso nunca"), ou mantém como está com uma nota clara no `README.md` da pasta dizendo que está desatualizado frente a `src/data/*.js`.
Critério de sucesso: se removido, `git log` preserva o histórico (não precisa reescrever histórico); se mantido, o novo `reference/README.md` menciona explicitamente a divergência de conteúdo achada na seção 2.2.
Risco: **baixo, mas é o primeiro passo desta lista que envolve decidir remover conteúdo** — por isso não é Fase 1 ou 2.

**Fase 4 — dependências não usadas (opcional, separada da reorganização de pastas).**
Remover `@types/react`/`@types/react-dom` de `package.json` se confirmado que nenhuma ferramenta do editor depende delas para inferência de tipo em `.jsx`.
Critério de sucesso: `npm run dev`, `npm run build`, `npm run lint` continuam passando; abrir um `.jsx` no editor continua mostrando autocomplete de props do React.
Risco: **maior que as fases anteriores porque mexe em `package-lock.json`** — é a única fase desta lista que gera diff numa dependência de fato instalada, e é a mais fácil de errar silenciosamente (perda de type-hints no editor sem quebrar build/lint).

Nenhuma fase acima é irreversível em termos de git (tudo é rename/remove dentro de um repo com histórico) — a única ação genuinamente irreversível seria fazer `rm -rf` sem passar por `git rm`/`git mv`, o que não é necessário em nenhum passo.

## 6. Riscos e pontos de decisão

Coisas que não posso decidir sozinho:

1. **`design/handoff/data/*.ts` (scaffold vazio e desatualizado): remover ou arquivar comentado?** Ele nunca foi populado e já diverge do shape real usado em `src/data/companies.js` (RD Group dividido, Papelzinho adicionado). Manter como está é risco de alguém confundir com fonte de verdade; remover apaga a proposta de shape Zod que pode ser útil se algum dia migrar pra TypeScript. Preciso saber sua preferência.
2. **Nome final da pasta (`reference/`, `_archive/`, `design/` mesmo, outro)** — sugeri `reference/` na seção 4, mas é convenção, não fato técnico; qualquer nome funciona igual para o bundler.
3. **`@types/react`/`@types/react-dom`: remover ou manter?** Não têm efeito de build hoje, mas alguma extensão do seu editor pode depender delas para autocomplete em `.jsx` sem `tsconfig.json` — não testei isso especificamente (fora do escopo desta auditoria "não rode instalações"), então não posso garantir que remover é 100% inofensivo para a experiência do editor, só para o build.
4. **Exclusão de pastas do editor é configuração local (`.vscode/settings.json` ou equivalente), não arquivo versionado por padrão** — preciso saber se você quer isso committado pro time (se algum dia houver time) ou só na sua máquina.
5. **O número exato "456"**: não consegui reproduzi-lo pelo terminal porque o painel de Problemas do VS Code agrega motores de diagnóstico (CSS language service, TS/JS language service, possivelmente extensões) que não são invocáveis via `npm run lint`. Se quiser o número exato batido, a forma de confirmar é abrir o painel de Problemas, agrupar por pasta, e ver se `design/` concentra a contagem — isso eu não tenho como fazer pelo ambiente onde rodo comandos.
