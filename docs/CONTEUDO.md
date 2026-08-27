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
