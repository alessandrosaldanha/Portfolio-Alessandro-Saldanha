# Conteúdo — fonte da verdade

Este documento é a fonte canônica dos fatos usados no conteúdo do portfólio (Home, /sobre,
/projetos e os módulos em [src/data/](../src/data/)). Antes de escrever ou alterar qualquer
texto de projeto, trajetória ou stack, leia este arquivo. Não deduza feature a partir do código
nem invente métrica, número ou resultado. Se um fato não estiver aqui, pergunte ao Alessandro em
vez de assumir.

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
  mencionar sem link.**

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
(`DrogaRaia.svg` e `Papelzinho.svg`, na raiz do projeto, não usados) são **byte a byte idênticos**
entre si (mesmo MD5) — pelo menos um dos dois está com o arquivo trocado, e não é possível saber
qual sem confirmação visual do Alessandro. Não usar nenhum dos dois até chegar um arquivo correto
e distinto para cada marca.

**Por que FixInfra ainda está em texto**: o arquivo enviado (`fixinfra.jpg`, na raiz do projeto,
não usado) é um JPEG de verdade, mas JPEG não é formato aceito (ver acima) e não tem canal alfa.
Precisa de um SVG, PNG ou WebP com fundo transparente.

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
- Dois instrumentos, não um só:
  - **EEA**: 20 questões distribuídas em 10 categorias, duas por categoria.
  - **DT**: teste mensal, 150 questões. Também aplicado quando o motorista é reprovado no EEA.
- O resultado de cada instrumento gera uma recomendação sobre a aptidão do motorista para dirigir.
  O produto entrega a recomendação, não a decisão: em caso de reprovação, cabe ao gestor local
  decidir o que fazer.
- Construído em WeWeb.io. O site institucional da WeSafety
  ([wesafety.com.br](https://www.wesafety.com.br/)) também foi feito por mim, no mesmo stack.
- Nenhum resultado, métrica ou decisão técnica foi fornecido para este projeto — não inventar.

## Projetos de cliente/freelance (sem alteração nesta rodada)

Dados já corretos em `src/data/projects.js`, mantidos aqui só como referência de onde estão:
Sorria Clínicas Odontológicas, IBR Maceió, IBR Maragogi, Supermercado Vital.

## Regras de escrita (recap de CLAUDE.md)

- Nunca usar travessão (—) em texto voltado ao usuário.
- Frases curtas e diretas; evitar aberturas como "além disso" e adjetivos em fileira de três.
- Não inventar métrica, número ou resultado que o Alessandro não tenha fornecido.
- Nenhum TODO deve chegar ao HTML renderizado. Placeholder de imagem (thumbnail, screenshot) é
  visual e sem texto de tarefa — uma caixa vazia estilizada, não `TODO: algo`. Se faltar conteúdo
  real para preencher um espaço (resultado, métrica, screenshot), remova o item em vez de deixar
  um lembrete de tarefa visível para o visitante.
