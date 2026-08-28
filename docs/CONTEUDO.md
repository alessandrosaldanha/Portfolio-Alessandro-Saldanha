# Conteúdo — fonte da verdade

Este documento é a fonte canônica dos fatos usados no conteúdo do portfólio (Home, /sobre,
/projetos e os módulos em [src/data/](../src/data/)). Antes de escrever ou alterar qualquer
texto de projeto, trajetória ou stack, leia este arquivo. Não deduza feature a partir do código
nem invente métrica, número ou resultado. Se um fato não estiver aqui, pergunte ao Alessandro em
vez de assumir.

**Nunca escrever contexto de origem** ("nasceu porque X", "o cliente não tinha Y", "a empresa
enfrentava Z") sem que o Alessandro tenha fornecido esse contexto explicitamente. Se faltar
informação para justificar por que um projeto existe, a descrição fica mais curta, não
preenchida com uma suposição plausível. Essa regra existe porque descrições assim já foram
escritas e precisaram ser removidas depois (ver "Projetos pessoais sem cliente" abaixo).

Sempre que um fato mudar (saída de emprego, novo produto, nova feature, mudança de nome), atualize
este arquivo primeiro e só depois o texto do site.

## Trajetória profissional

- **Orla.tech** — mai/2024 a ago/2026. Vínculo encerrado, não trabalha mais lá.
  - Estagiário: mai/2024 – nov/2024.
  - Desenvolvedor júnior: nov/2024 – ago/2026.
- **Situação atual (desde ago/2026)**: disponível para freelance, PJ ou CLT. Maceió/AL ou remoto.
- **Produtos próprios**: três, todos com uso real — Maré de Estudos, Contabilidade Reformada,
  Gestão de Escalas.

### O que foi feito na Orla.tech (2024–2026)

Critério de escolha de stack em todos os projetos de cliente: autonomia do cliente pós-entrega
(CMS estruturado que o time do cliente consegue publicar sozinho) e prazo curto. Todos os sites
abaixo são públicos e podem ser nomeados e linkados normalmente; a confidencialidade cobre
processo interno, dado de negócio e arquitetura do cliente, não a existência do site.

Construídos do zero à produção (sem afirmação de solo/dupla; o Alessandro só confirmou "do zero
à produção" para estes dois, não "sozinho"):
- **Drogasil Manipulação** ([manipulacao.drogasil.com.br](https://manipulacao.drogasil.com.br/))
  e **Droga Raia Manipulação** ([manipulacao.raia.com.br](https://manipulacao.raia.com.br/)) —
  dois sites completos, um por marca, para desvincular o conteúdo de medicamentos manipulados dos
  e-commerces principais do Grupo RD. Cada um tem: catálogo de princípios ativos de A a Z
  (centenas de ativos, página dedicada por ativo com descrição, indicações, posologia, reações
  adversas, formas farmacêuticas e referências bibliográficas, índice alfabético e paginação),
  diretório de laboratórios parceiros, blog de artigos com comentários, fale conosco e fluxo de
  envio de receita para orçamento de manipulação.

Construído do zero à produção, entrega solo (o único explicitamente confirmado como solo):
- **ANBIMA Summit 2025** ([anbimasummit.com.br](https://anbimasummit.com.br/)) — **entrega mais
  forte na Orla.tech.** Site do evento do zero à produção, feito sozinho, com venda de ingressos e
  programação completa, no ar antes da data do evento. Um único componente (a tabela de
  programação, em React) teve ajuda de outro desenvolvedor.

Construídos do zero à produção, em dupla com outro desenvolvedor (não solo — não descrever como
tal):
- **ANBIMA Global Insights** ([anbimaglobalinsights.com.br](https://anbimaglobalinsights.com.br/))
  e **ANBIMA EDU** ([anbimaedu.com.br](https://anbimaedu.com.br/)) — dois portais em Framer, com
  CMS estruturado para o time do cliente publicar sem depender de dev. Papel: executar as partes
  principais e mais complexas; peça fundamental para colocar os dois no ar.

Manutenção e melhorias (não reformulação, não liderança do projeto):
- **ANBIMA Internacional** ([international.anbima.com.br](https://international.anbima.com.br/))
  — atuação em manutenção e melhorias sobre uma base já existente. **Nunca escrever que "liderou
  a reformulação completa"** — isso é incorreto. E não descrever no site o que ele **não** fez
  (ex.: "não fiz a arquitetura original") — o portfólio descreve o que foi feito, não o negativo.

Outros:
- **Conviva Hotelaria** ([convivastay.com.br](https://convivastay.com.br/)) — site institucional e
  de agendamento do zero à produção, em WordPress com Oxygen, substituindo um site antigo, lento e
  desorganizado.
- **Nexus (WeSafety)** — ver seção própria abaixo, em "Projetos de cliente via Orla.tech".
- **Site institucional da Orla** ([orla.tech](https://www.orla.tech/)) — alterações e edições
  pontuais em Webflow.
- **Papelzinho** ([papelzinho.com/pt-br](https://papelzinho.com/pt-br/)) — app de amigo secreto,
  produto da própria Orla. Participação pequena, como estagiário, ao longo de cerca de 4 meses:
  alguns commits e features menores. Manter modesto, não inflar.
- **FixInfra** — site em Webflow, construído do zero. **Está fora do ar hoje: nunca linkar,
  mencionar sem link.** Removido do bloco "Projetos entregues" do case
  `orla-corporativos` a pedido do Alessandro (28/ago/2026). Fica só neste histórico de
  trajetória; não recriar a entrada na listagem de features sem instrução explícita.

**Screenshots do case `orla-corporativos`**: reais, em `src/assets/orla-corporativos/`
(convertidas de PNG para WebP; pasta renomeada de `projetos-orla/` para bater com o slug do
projeto). Capa do case (`coverImage`) é `anbima-internacional.webp`, a pedido do Alessandro
("img principal"). Todos os nove blocos de "Projetos entregues" têm imagem própria (Drogasil,
Droga Raia, ANBIMA Summit 2025, ANBIMA Global Insights, ANBIMA EDU, ANBIMA Internacional,
Conviva Hotelaria, Papelzinho, Site institucional da Orla). `anbima-internacional.webp`
aparece duas vezes na página (capa e bloco "ANBIMA Internacional") por pedido explícito do
Alessandro (28/ago/2026) — só há esse arquivo pra esse cliente, e ele preferiu repetir a
mesma imagem a deixar o bloco sem foto. Única exceção conhecida à regra do CLAUDE.md contra
repetir imagem entre blocos; não generalizar esse padrão pra outros projetos sem pedido
igualmente explícito.

## Home — Hero

Texto canônico do hero da home ([src/pages/Home.jsx](../src/pages/Home.jsx)), definido pelo
Alessandro como copy final, não rascunho. Não reescrever sem instrução explícita dele.

- **Título**: "Escrevo por que cada decisão foi tomada. Inclusive as que deram errado."
- **Parágrafo**: "Desenvolvedor full-stack em Maceió. Três produtos próprios no ar, construídos
  do schema ao deploy, e um blog onde documento os trade-offs de cada um. React, Next.js,
  PostgreSQL. Disponível para freelance, PJ ou CLT."

Substituiu a versão anterior ("Desenvolvedor full-stack. Do schema ao deploy." + parágrafo
"Construo SaaS com React, Next.js e PostgreSQL...") porque o título antigo descrevia uma
categoria genérica em vez do autor, e a frase mais forte do parágrafo antigo ("documento por que
cada decisão foi tomada") estava enterrada no meio do texto em vez de ser a manchete.

Verificado visualmente via Playwright em 1440px, 768px e 375px de largura: o título (4 linhas,
`text-wrap: balance`) quebra sem viúva e sem estourar o container em nenhuma das três larguras,
sem precisar de ajuste em `max-width`/`font-size` de `.hero-title` (site.css). Nenhum outro lugar
do código (título/meta description em `index.html`, ou qualquer `og:description`/JSON-LD) repetia
o texto antigo — não existe `og:description` nem JSON-LD no projeto hoje.

## Projetos em destaque na home

`featured: true` em `src/data/projects.js` controla quem aparece em "Projetos em destaque" na
home; a ordem segue a ordem do array (não há campo de ordenação separado). Estado atual, definido
por decisão explícita do Alessandro:

1. **Contabilidade Reformada** — produto próprio, no ar, domínio próprio, explorável por
   qualquer visitante.
2. **Maré de Estudos** — produto próprio, no ar, domínio próprio, explorável por qualquer
   visitante.
3. **Nexus (WeSafety)** — entrega de produto em cliente corporativo; exige login, não é
   explorável livremente.

Critério: o que dá para explorar sem barreira vem antes do que exige login. Por isso os dois
produtos próprios vêm antes do Nexus.

Gestão de Escalas e Sorria Clínicas Odontológicas saíram do destaque (ficaram com
`featured: false`) mas continuam normalmente listados em `/projetos` — não foram removidos do
portfólio, só do destaque da home. Não reordenar nem trocar o destaque numa sessão futura sem um
motivo explícito do Alessandro; se parecer que faz sentido mudar, perguntar primeiro.

### Selo de acesso restrito (`accessNote`)

O Nexus exige login: quem clica em "Ver ao vivo" cai numa tela de autenticação e não consegue
explorar o produto. Para não frustrar essa expectativa, o projeto tem um campo opcional
`accessNote: 'Acesso restrito'` em `src/data/projects.js`, renderizado como um chip discreto
("🔒 Acesso restrito") em três lugares: o card de destaque na home, a linha da listagem em
`/projetos`, e ao lado do botão "Ver ao vivo" no case. Campo opcional — só é preenchido quando o
projeto realmente tem essa barreira; os demais projetos não têm `accessNote` e não renderizam
nada.

## Organização de assets

Nenhum arquivo de mídia (logo, screenshot, foto) fica solto na raiz do projeto — a raiz é só
para receber um arquivo temporariamente antes de organizar (e nem isso: `.gitignore` tem um
padrão restrito à raiz que impede o Git de rastrear imagem solta ali, forçando o arquivo a ser
movido pro lugar certo antes de virar parte do projeto). Convenção:

- `src/assets/logos/` — logos de marca (marquee de clientes hoje; qualquer outro uso futuro de
  logo entra aqui também).
- `src/assets/<slug-do-projeto>/` — screenshots de case, um diretório por projeto (ex.
  `src/assets/nexus/`). Nome de arquivo em minúsculas, sem acento, sem espaço, com hífen.
- `public/` — arquivos servidos como estão, sem passar pelo bundler (hoje só `favicon.svg`).
- `_pending-assets/` (raiz do repo, gitignorada) — arquivos recebidos com problema (formato
  errado, conteúdo duplicado/trocado), aguardando reenvio. Nunca comitada: publicar arquivo
  quebrado ou duplicado no histórico de um repo público não tem valor nenhum.

## Marquee de clientes (logos)

`src/data/companies.js` alimenta o marquee (`src/components/OrlaMarquee.jsx`) na home. Cada
entrada é `{ name, logo?, logoHeight?, logoWidth?, logoHeightPx? }` — `logo` e as três dimensões
são opcionais; sem `logo`, o item renderiza como o nome em texto puro (comportamento original).

**Formato aceito**: SVG, PNG ou WebP. JPEG não é aceito, mesmo que o arquivo seja uma imagem
válida — sem canal alfa, não dá para recortar o fundo e deixar monocromático sem edição manual
da imagem.

**Antes de adicionar um logo novo**: validar o arquivo de verdade (`file <arquivo>` no shell, não
confiar só na extensão) e, se houver mais de um arquivo novo na mesma leva, comparar os hashes
(`md5sum`) para garantir que não são cópias trocadas entre marcas diferentes. Se o arquivo falhar
a validação, não incluir e avisar qual falhou e por quê; a marca fica em texto até o arquivo
correto chegar.

**Tratamento monocromático**: os logos nunca aparecem com a cor original da marca. A técnica é
CSS `mask-image` (não `filter`): um elemento decorativo (`.marquee-logo`) recebe
`background-color: var(--text-secondary)` mascarado pelo próprio arquivo do logo — isso recolore
qualquer formato (SVG multicor, PNG, WebP) para a cor sólida do tema, sem depender das cores
internas do arquivo. Um `<img>` real fica no DOM ao lado (invisível, `opacity: 0`) só para carregar
`alt`, `loading="lazy"`, `width`/`height` reais (evita layout shift) e o fallback `onError` — se o
arquivo não carregar, o item cai para o nome em texto, igual a uma entrada sem `logo`. Hover troca
`var(--text-secondary)` → `var(--text-primary)`, o mesmo mecanismo que o texto do marquee já usa.

**Equalização por altura óptica**: `logoHeight` é o valor renderizado (px), calibrado caso a caso
por peso visual, não pela altura real do arquivo — dois logos com a mesma altura em pixels não
necessariamente pesam igual aos olhos (depende de quanto espaço em branco cada arquivo tem dentro
do próprio viewBox/canvas). `logoWidth`/`logoHeightPx` são as dimensões intrínsecas reais do
arquivo (não o valor renderizado), usadas só como atributos HTML `width`/`height` do `<img>` para
reservar o aspect ratio antes do carregamento.

**Estado atual** (calibrado por análise estrutural, não verificado visualmente ao vivo — conferir
e ajustar `logoHeight` em `companies.js` se algum logo parecer maior ou menor que os outros):

| Marca | Logo | logoHeight |
|---|---|---|
| ANBIMA | `src/assets/logos/anbima.svg` | 26px |
| Drogasil | `src/assets/logos/drogasil.svg` | 20px |
| Conviva Hotelaria | `src/assets/logos/conviva-hotelaria.svg` | 20px |
| WeSafety | `src/assets/logos/wesafety.webp` | 30px |
| Droga Raia | texto (sem logo) | — |
| Papelzinho | texto (sem logo) | — |
| FixInfra | texto (sem logo) | — |

**Por que Droga Raia e Papelzinho ainda estão em texto**: os arquivos enviados
(`DrogaRaia.svg` e `Papelzinho.svg`, movidos para `_pending-assets/` na raiz do repo, não usados
nem versionados) são **byte a byte idênticos** entre si (mesmo MD5) — pelo menos um dos dois está
com o arquivo trocado, e não é possível saber qual sem confirmação visual do Alessandro. Não usar
nenhum dos dois até chegar um arquivo correto e distinto para cada marca.

**Por que FixInfra ainda está em texto**: o arquivo enviado (`fixinfra.jpg`, também em
`_pending-assets/`) é um JPEG de verdade, mas JPEG não é formato aceito (ver acima) e não tem
canal alfa. Precisa de um SVG, PNG ou WebP com fundo transparente.

**`orla.svg`**: recebido e validado (SVG legítimo), organizado em `src/assets/logos/orla.svg`,
mas sem uso por decisão do Alessandro — "Orla" não é um cliente, não faz sentido no marquee de
"projetos entregues durante a passagem pela Orla.tech". Disponível para uso futuro (ex.: se um dia
o case `orla-corporativos` ganhar imagem no bloco "Site institucional da Orla").

## Home — "Como eu construo" (ex-"Stack")

Texto canônico da seção que substituiu a antiga grade de 21 itens em 4 colunas
(`stack-grid`/`stackGroups`) na home ([src/pages/Home.jsx](../src/pages/Home.jsx)), definido pelo
Alessandro como copy final, não rascunho. Não reescrever sem instrução explícita dele.

- **Título**: "Como eu construo".
- **Texto** (dois parágrafos, classe `.build-note` em `site.css`):
  - "Hoje construo com React, Next.js, TypeScript, PostgreSQL e Supabase, do schema ao deploy. A
    IA é parte do produto, não um extra: o Gemini lê e categoriza extrato bancário no
    Contabilidade Reformada, e gera e corrige quiz no Maré de Estudos."
  - "Antes disso foram dois anos entregando site de cliente em Framer, Webflow, WeWeb.io e
    WordPress/Oxygen, sob prazo de agência e o critério de deixar o cliente autônomo depois da
    entrega. Hoje o foco é full-code."

Motivo da troca: a grade antiga dava o mesmo peso visual a React e Figma, não dizia no que o
Alessandro é forte nem o que usou uma vez só, e contradizia o resto do portfólio (as páginas de
case explicam por que cada decisão foi tomada; a grade era só uma lista de nomes sem contexto).
Ferramentas básicas de qualquer dev (Git/GitHub, Figma, Vercel, Google OAuth) saíram por não
acrescentarem nada. O texto novo cobre, nessa ordem: o núcleo real de stack hoje, a IA como parte
do produto (não um item solto no meio de uma lista), e o low-code enquadrado como repertório de
dois anos de agência, não como dispersão, com o full-code deixado explícito como foco atual.

Nenhuma tecnologia citada na grade antiga saiu do site: `src/data/stack.js` (`stackGroups` e
`allStack`) continua existindo e alimentando "Ferramentas do dia a dia" em `/sobre`
([src/pages/Sobre.jsx](../src/pages/Sobre.jsx)), e os chips de stack em cada card/case de projeto
continuam sendo a referência detalhada por tecnologia.

## Vocabulário padronizado

- **"Contabilidade Reformada"** — nunca "Contabilidade Igreja". Domínio:
  contabilidadereformada.com.br.
- **"Maré de Estudos"** — no ar em mareestudos.com.br. `liveHref` em `src/data/projects.js`
  aponta para o domínio de produção.
- **"Gestão de Escalas"** — sem domínio próprio confirmado; `liveHref` atual aponta para
  `https://gestaodeescalas-seven.vercel.app`.
- **"Orla.tech"** — sempre no passado ao descrever o vínculo empregatício (período fechado,
  mai/2024–ago/2026). Nunca tratar como emprego atual.

### Domínios de produção

| Produto | Domínio de produção | Observação |
|---|---|---|
| Maré de Estudos | mareestudos.com.br | Antes apontava para `mare-de-estudos.vercel.app`, que é o ambiente de **homologação** (branch `hmg`). Corrigido. |
| Contabilidade Reformada | contabilidadereformada.com.br | Já estava correto. |
| Gestão de Escalas | sem domínio próprio confirmado | `liveHref` aponta para `gestaodeescalas-seven.vercel.app`; sem indicação de que seja ambiente de homologação. |

**Regra**: nunca usar uma URL `.vercel.app` de homologação como link público "ver ao vivo" de um
produto que tenha domínio de produção confirmado nesta tabela. Se aparecer um link `.vercel.app`
para Maré de Estudos ou Contabilidade Reformada em qualquer lugar do site, é bug, não é
alternativa válida.

## Projetos próprios

### Maré de Estudos
- Tipo: produto próprio · solo. Status: no ar.
- O que é: transforma vídeo-aulas soltas do YouTube em trilha de estudo estruturada.
- Fluxo real:
  - Explore com playlists de estudo já catalogadas, ou monta a própria trilha escolhendo os
    vídeos.
  - "Meus estudos" reúne todas as trilhas do usuário; dentro da aula, o vídeo roda no player do
    YouTube com um campo de anotações ao lado.
  - Barra de progresso de 0 a 100% por trilha.
  - Ao concluir 100%, desbloqueia um quiz gerado por IA (Gemini) sobre o conteúdo estudado, de 10
    a 100 questões, à escolha do usuário.
  - Ao final do quiz, mostra o desempenho e explica cada erro (não só corrige).
  - Roadmap/calendário de estudos.
  - Conta por usuário, com login próprio ou Google.
- Stack real: React 19, TypeScript, Vite, Supabase (Postgres, Auth, Storage, RLS), React
  Router 7, Tailwind, i18next, **Gemini** (geração e correção do quiz), YouTube Data API
  (importação de playlists).
- O quiz gerado por IA é o diferencial do produto — não descrever como "progresso e anotações"
  genéricos.
- Screenshots reais em `src/assets/mare-estudos/`: capa do case (`mare-login.webp`, tela de
  login) e imagem em todos os sete blocos de feature — "Explore o catálogo curado"
  (`mare-explore.webp`), "Monte sua própria trilha" (`mare-trilha.webp`, tela de importar
  playlist por link ou buscar vídeos), "Player com anotações lado a lado"
  (`mare-player-anotacoes.webp`), "Quiz gerado por IA ao completar a trilha"
  (`mare-quiz-gerando.webp`, painel com o banco de perguntas gerado e tentativas anteriores),
  "Desempenho com explicação de cada erro" (`mare-quiz-resultado.webp`, tela de resultado com
  pontuação e explicação por questão), "Meus estudos" (`mare-meus-estudos.webp`) e "Roadmap de
  estudos" (`mare-roadmap.webp`, calendário de sessões agendadas). Dois blocos originais foram
  divididos em dois cada um porque cada metade tinha uma screenshot real e distinta: "Explore ou
  monte sua trilha" virou "Explore o catálogo curado" + "Monte sua própria trilha"; "Conta e
  roadmap de estudos" virou "Meus estudos" (que também ficou com a menção ao login) + "Roadmap de
  estudos". Mesma lógica do merge EEA/DT do Nexus, só que ao contrário: dividir quando os fluxos
  são de fato diferentes, nunca forçar duas imagens no mesmo bloco nem repetir uma imagem em
  dois.
- Galeria (`gallery`) com 8 screenshots reais, demonstrando responsividade e os dois temas do
  produto: Explorar (desktop claro/escuro, mobile claro/escuro), menu de navegação mobile
  (claro/escuro) e tela de aula mobile (claro/escuro). `gallery` agora aceita
  `{ src, alt, width, height }` além da string simples original — item com objeto vira thumbnail
  clicável (abre a imagem original em nova aba), item string continua um botão de texto inerte
  (comportamento antigo, ainda usado pelos projetos sem screenshot de galeria real).

### Contabilidade Reformada
- Tipo: produto próprio · solo. Status: no ar.
- Domínio: contabilidadereformada.com.br.
- Problema que resolve: tesoureiros de igreja lançavam cada movimentação bancária à mão, uma por
  uma, categorizando manualmente.
- Como funciona:
  - Multi-igreja: cada igreja tem cadastro próprio; o admin (pastor) gerencia a sua e cadastra os
    tesoureiros dela.
  - O tesoureiro sobe o extrato bancário em CSV, Excel ou PDF; o arquivo fica anexado na aba de
    importações com data e hora.
  - A IA (Gemini) lê o extrato, extrai todas as movimentações e categoriza cada uma.
  - Mostra uma prévia editável antes de gravar: o tesoureiro ajusta o que quiser e só então
    confirma.
  - Confirmado, vai para o livro caixa: filtros por entrada, saída, categoria e responsável, com
    visão mensal.
  - Dashboard mensal, trimestral e anual.
  - Trilha de auditoria: quem subiu, editou ou removeu o quê.
  - Gestão de usuários por igreja.
- Stack real: React, Supabase (Postgres, RLS, Auth, Storage, Edge Functions), Tailwind, React
  Router, **Gemini** (leitura e categorização do extrato).
- A importação por IA que elimina o lançamento manual é o diferencial do produto — não descrever
  como "lançamentos, relatórios e prestação de contas" genéricos.
- Screenshots reais em `src/assets/contabilidade-reformada/`: capa do case
  (`contabilidade-login.webp`) e imagem nos sete blocos de feature (todos) — "Multi-igreja com
  admin por igreja" (`contabilidade-multi-igreja.webp`, tela de Governança "Admin Master" com a
  lista de igrejas cadastradas na plataforma, status e plano de cada uma; trocada uma vez, a
  versão atual não é mais a tela de Detalhes da Igreja com seletor aberto), "Extrato bancário
  lido por IA" (`contabilidade-extrato-ia.webp`, estado vazio, "Envie um extrato para ver a
  pré-visualização"), "Prévia editável antes de gravar" (`contabilidade-previa-editavel.webp`,
  mesma tela populada com 50 lançamentos e o agente de IA de categorização, estado depois do
  upload), "Livro caixa com filtros" (`contabilidade-livro-caixa.webp`), "Dashboard mensal,
  trimestral e anual" (`contabilidade-dashboard.webp`), "Trilha de auditoria"
  (`contabilidade-auditoria.webp`) e "Gestão de usuários por igreja"
  (`contabilidade-usuarios.webp`). "Livro caixa com filtros e dashboard" e "Trilha de auditoria"
  (que também mencionava "gestão de usuários") foram divididos em dois blocos cada, mesma lógica
  de sempre: havia screenshot real e distinta para cada metade do texto original, então cada
  metade virou seu próprio bloco. Galeria com 2 imagens mobile (`contabilidade-dashboard-mobile.webp`,
  `contabilidade-auditoria-mobile.webp`).
- **A interface do produto ainda mostra "Contabilidade Igreja"** na tela de login (nome antigo,
  não atualizado no app). O texto do portfólio já foi corrigido para "Contabilidade Reformada";
  o screenshot de capa foi usado mesmo assim, por decisão explícita do Alessandro — mas se o
  app for renomeado, essa captura de tela precisa ser atualizada.
- As telas de "Detalhes da Igreja", "Governança e Usuários", "Livro Caixa", a tela de Governança
  "Admin Master" (`contabilidade-multi-igreja.webp`, e-mails reais incluindo o do Alessandro) e a
  tela de Extratos e Importação IA populada (`contabilidade-previa-editavel.webp`, lançamentos de
  cartão com nome de estabelecimento) mostram nomes, e-mails, um CPF e valores financeiros —
  **confirmado pelo Alessandro que são dados de teste**, não de pessoas reais. Se um projeto
  futuro reenviar screenshot com esse tipo de dado sem confirmação prévia, perguntar antes de
  publicar (CPF é dado sensível pela LGPD).
- Versões em modo escuro de "Dashboard Executivo" e "Trilha de Auditoria" no mobile
  (`contabilidade-dashboard-mobile-dark.webp`, `contabilidade-auditoria-mobile-dark.webp`) foram
  recebidas e guardadas em `src/assets/contabilidade-reformada/`, mas não entram na galeria: a
  galeria já mostra a versão clara dessas duas telas, e a regra do projeto é nunca duplicar a
  mesma tela em dois temas dentro de uma galeria (ver CLAUDE.md). Ficam disponíveis caso um
  projeto futuro precise mostrar dark mode por mérito próprio.

### Gestão de Escalas
- Tipo: produto próprio · solo. Status: em uso real.
- O que é: monta e comunica escalas de ministérios, com convites, confirmações e e-mails
  transacionais reais.
- Escopo de ministérios cobertos: louvor, mídia, cozinha, pastoral, EBD, EBD de novos membros,
  ceia, diaconato e outros.
- Visibilidade: cada membro enxerga apenas a escala em que foi designado; a liderança enxerga
  tudo.
- Convites, confirmações e e-mails transacionais funcionam de verdade (Resend, Google OAuth).
- Stack real: Next.js (App Router), TypeScript, Zustand, Neon PostgreSQL, Google OAuth, Resend.
- Não usa IA — não adicionar Gemini à stack deste projeto.
- Screenshots reais em `src/assets/escalas/`: capa do case (`escala-visao-geral.webp`, painel
  com sorteio do mês, conflitos e aprovações), imagem em quatro blocos de feature — "Escopo por
  ministério e visibilidade por papel" (`escala-membros.webp`), "Montagem de escala por
  ministério" (`escala-louvor.webp`, escala do Louvor com cantores e instrumentistas por função),
  "Convite e confirmação" (`escala-email-redefinir-senha.webp`) e "Login com Google"
  (`escala-login-google.webp`) — e galeria com `escala-centuriao.webp`, `escala-cozinha.webp`,
  `escala-ebd.webp` e `escala-presbiterio.webp`. Quatro PNGs recebidos ficaram fora do
  repositório (sem conversão, só locais): duas eram a mesma tela "Visão geral" já usada como capa
  (uma em dark, outra repetida em light) e duas eram variantes mobile da mesma tela — redundantes
  com a capa, mesma lógica de não duplicar imagem nem manter light/dark da mesma tela.
- **Inconsistência conhecida e aceita em "Convite e confirmação"**: o arquivo
  `escala-email-redefinir-senha.webp` mostra de fato um e-mail de redefinição de senha, não o
  e-mail de convite/confirmação de escala que o texto do bloco descreve. Estava na galeria com
  legenda honesta por causa dessa divergência; o Alessandro pediu explicitamente para movê-lo
  para o bloco "Convite e confirmação" mesmo assim (28/ago/2026), ciente do descompasso entre
  texto e imagem. O `alt` da imagem no bloco continua descrevendo o conteúdo real ("E-mail
  transacional de redefinição de senha"), não o texto do bloco. Se um screenshot real do e-mail
  de convite/confirmação chegar no futuro, ele deve substituir este.

## Projetos de cliente via Orla.tech

### Nexus (WeSafety)
- Tipo: cliente, via Orla.tech. Status: no ar.
- WeSafety é um grupo da Águia Branca.
- Por que existe: antes do Nexus, os motoristas passavam por um instrumento de avaliação
  anterior que nunca renovava o banco de questões (sempre as mesmas perguntas, ciclo após ciclo).
  Com o tempo, o motorista passou a responder no automático, e o teste deixou de medir aptidão
  para medir familiaridade com o próprio teste. Um acidente, em que o motorista avaliado havia
  sido aprovado na avaliação em uso até então, evidenciou que ela não cumpria mais a função. O
  Nexus nasceu como plataforma de gestão e testes, criada primeiro para o grupo Águia Branca e
  depois estendida para venda a outras empresas do setor de transporte.
- **Regra de texto**: nunca citar o nome do instrumento/produto anterior. Referir-se a ele só
  como "o instrumento anterior" ou "a avaliação em uso até então" — não nomear produto de
  terceiro em contexto negativo. Sobre o acidente: mencionar que houve um acidente que motivou a
  revisão, sem detalhe (sem causa, sem consequência, sem dado de pessoa envolvida).
- O que é: Nexus ([nexus.wesafety.com.br](https://nexus.wesafety.com.br/)) é uma plataforma de
  gestão e avaliação psicossocial para o setor de transporte, com login.
- Dois instrumentos, não um só, com nome por extenso (confirmado pelas próprias telas do produto):
  - **EEA — Estado Emocional Atual**: teste diário. 20 questões distribuídas em 10 categorias,
    duas por categoria.
  - **DT — Diagnóstico de Tendência**: teste **periódico** (nunca "mensal" — a tela do produto
    diz "Teste periódico", não define a cadência exata). 150 questões. Também aplicado quando o
    motorista é reprovado no EEA.
- O resultado de cada instrumento gera uma recomendação sobre a aptidão do motorista para dirigir.
  O produto entrega a recomendação, não a decisão: em caso de reprovação, cabe ao gestor local
  decidir o que fazer.
- Construído em WeWeb.io. O site institucional da WeSafety
  ([wesafety.com.br](https://www.wesafety.com.br/)) também foi feito por mim, no mesmo stack.
  Diferente das telas internas do produto (login, testes), a screenshot desse bloco é de site
  público — sem restrição de conteúdo, pode mostrar a página inteira.
- Nenhum resultado, métrica ou decisão técnica foi fornecido para este projeto — não inventar.

**Regra de imagem — nunca publicar as questões dos instrumentos**: capturas de tela do EEA e do
DT mostrando as perguntas reais são conteúdo do cliente e não podem aparecer no portfólio, em
nenhuma resolução ou crop. Só usar telas de navegação/fluxo do produto (acesso, seleção de teste,
confirmação de envio) — nunca a tela de uma questão sendo respondida. `src/assets/nexus/` guarda
só imagens já aprovadas nesse critério (`nexus-acesso-cpf.webp`, `nexus-selecao-teste.webp`,
`nexus-teste-finalizado.webp`, mais `nexus-login.webp`, guardado mas não usado no case porque a
tela de CPF já cobre acesso de forma mais expressiva). Duas capturas que mostravam as questões
(`Teste EEA.png`, `Teste DT.png`) foram recebidas e apagadas do projeto nesta rodada — não
readicionar esse tipo de imagem no futuro.

## Projetos pessoais sem cliente

Sorria Clínicas Odontológicas e Supermercado Vital **nunca tiveram cliente pagante** — são
projetos pessoais do Alessandro, não freelance. `type`/`role`/`badges` usam "Projeto pessoal",
não "Freelance" nem "Cliente" (isso também corrige o filtro de `/projetos`, que deriva os chips
dos valores únicos de `type` — não há lista fixa no código).

Essas descrições continham contexto de origem inventado (histórias de "o cliente não tinha X",
decisões justificadas por "a equipe da igreja" ou "a liderança", resultados que afirmavam
conclusão/operação real) que nunca foi fornecido pelo Alessandro. Foi tudo removido ou reescrito
mais curto, seguindo a regra do topo deste arquivo. Não reintroduzir esse tipo de narrativa.

- **Sorria Clínicas Odontológicas**: redesign de site institucional multi-página, projeto
  pessoal. Sem detalhe de origem/negócio real.
  - Screenshots reais em `src/assets/sorria-clinicas/` (pasta renomeada de
    `sorria-clinicas-odontológicas/`, que tinha acento e espaço no nome, para bater com o slug do
    projeto e a convenção de nome de arquivo; PNGs originais convertidos para WebP): capa do case
    (`sorria-home.webp`, home com chamada para agendar avaliação e avaliações no Google), imagem
    nos dois blocos de feature — "Páginas por especialidade" (`sorria-especialidades.webp`) e
    "Dados de negócio local" (`sorria-unidades.webp`, lista de unidades com endereço, horário e
    telefone) — e galeria com `sorria-agendamento.webp` (formulário de agendamento por unidade e
    especialidade), `sorria-faq.webp` (perguntas frequentes) e `sorria-avaliacoes.webp`
    (avaliações de pacientes no Google exibidas no site). `sorria-avaliacoes.webp` mostra nome e
    comentário de pacientes reais, mas é conteúdo público (widget de avaliações do Google já
    exibido no site ao vivo), não uma tela interna/admin — não se aplica a checagem de dado
    pessoal privado.
- **Supermercado Vital**: e-commerce pessoal — login, carrinho, simulação de compra com endereço
  de entrega, avaliações em produtos. Front-end integrado a uma API pronta em Xano. Nunca afirmar
  região de atuação real (não é "entrega em Maceió") nem operação de negócio real (não "a loja
  saiu do atendimento por WhatsApp").
  - Screenshots reais em `src/assets/supermercado-vital/`, convertidos de PNG para WebP: capa do
    case (`vital-home.webp`, home com "colhido hoje"), imagem nos quatro blocos de feature —
    "Catálogo paginado" (`vital-catalogo.webp`), "Avaliações de produto" (`vital-avaliacoes.webp`,
    avaliação real do próprio Alessandro em produto de teste), "Carrinho e checkout em três
    etapas" (`vital-carrinho-checkout.webp`) e "Histórico de pedidos"
    (`vital-historico-pedidos.webp`) — e galeria com `vital-gallery-catalogo.webp` (catálogo com
    paginação real), `vital-gallery-checkout-entrega.webp` (etapa de endereço do checkout) e
    `vital-gallery-checkout-pagamento.webp` (etapa de pagamento, Pix em ambiente de teste).
  - Nomes de produto (Tyler Gomez, Rebecca Allen, Danielle Henry etc.) e nomes de fruta/verdura
    inventados (rambutan lettuce, soursop sapote etc.) são dado seed do Xano, não gente real.
  - **Pendente: recapturar 3 das 4 screenshots de feature depois que o seed do Xano for
    corrigido.** `vital-catalogo.webp`, `vital-avaliacoes.webp` e `vital-carrinho-checkout.webp`
    mostram cards de produto de supermercado com NOME DE PESSOA no lugar do nome do produto
    (ex.: "Tyler Gomez", "Rebecca Allen", "Juan Patel", "Danielle Henry", "Lori Kim", "Philip
    Herrera", com preço e descrição de pano de microfibra). Também aparece um placeholder roxo
    liso com "POWERED BY XANO NOCODE BACKEND" no lugar da foto do produto. Isso não é bug de
    layout do portfólio, é dado ruim no app em si (seed/nome de campo trocado no Xano). Não
    editar as imagens para mascarar isso; trocar os três arquivos assim que o Alessandro corrigir
    o seed e mandar screenshots novas.
  - **Endereço de entrega confirmado pelo Alessandro como fictício** (28/ago/2026): a tela de
    checkout usada em `vital-gallery-checkout-entrega.webp` mostra "Alessandro Saldanha, Rua
    Rosalvo Lima dos Santos, 45, Cidade Universitária, Maceió, CEP: 57072020" como endereço de
    teste, não seu endereço real. Perguntado antes de usar a imagem, por ser exatamente o tipo de
    dado sensível que a checagem de screenshot existe pra pegar.
  - O rodapé de algumas telas mostra o telefone (82) 98127-3619, que já é o WhatsApp público
    publicado em `src/data/social.js`/`/contato` — não é exposição nova.

**IBR Maceió e IBR Maragogi foram removidos do portfólio** (a pedido do Alessandro, projetos
ainda sem conteúdo institucional finalizado). Não recriar essas entradas em `projects.js` sem
instrução explícita.

## Regras de escrita (recap de CLAUDE.md)

- Nunca usar travessão (—) em texto voltado ao usuário.
- Frases curtas e diretas; evitar aberturas como "além disso" e adjetivos em fileira de três.
- Não inventar métrica, número ou resultado que o Alessandro não tenha fornecido.
- Nenhum TODO deve chegar ao HTML renderizado. Placeholder de imagem (thumbnail, screenshot) é
  visual e sem texto de tarefa — uma caixa vazia estilizada, não `TODO: algo`. Se faltar conteúdo
  real para preencher um espaço (resultado, métrica, screenshot), remova o item em vez de deixar
  um lembrete de tarefa visível para o visitante.
- Nunca escrever contexto de origem sem que o Alessandro tenha fornecido. Se faltar informação,
  a descrição fica mais curta, não preenchida com suposição.
