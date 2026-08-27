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
(CMS estruturado que o time do cliente consegue publicar sozinho) e prazo curto.

Construídos do zero à produção:
- **Grupo RD (Drogasil e Droga Raia)** — sites de medicamentos manipulados das duas marcas.
  Busca de princípios ativos de A a Z com página por ativo, diretório de laboratórios e blog com
  comentários.
- **ANBIMA Summit 2025** — site do evento, com venda de ingressos e programação, entregue antes
  da data do evento.
- **ANBIMA Insights e ANBIMA EDU** — dois portais em Framer, com CMS estruturado para o time do
  cliente publicar sem depender de dev.
- **WeSafety** — produto Nexus e o site institucional, em WeWeb.io.
- **Conviva Hotelaria** — site institucional e de agendamento, em WordPress/Oxygen, substituindo
  um site lento e desorganizado.
- **FixInfra** — site em Webflow.
- **Papelzinho** — features no app de sorteios e o site do produto (não construído do zero).

Manutenção, depois reformulação completa (exceção à lista acima):
- **ANBIMA Internacional** — começou como manutenção sobre uma base existente; depois
  reformulação completa, com integração via API para sincronizar dados institucionais.

## Vocabulário padronizado

- **"Contabilidade Reformada"** — nunca "Contabilidade Igreja". Domínio:
  contabilidadereformada.com.br.
- **"Maré de Estudos"** — no ar em mareestudos.com.br. *Pendente:* o campo `liveHref` do projeto
  em `src/data/projects.js` ainda aponta para `https://mare-de-estudos.vercel.app/explorar`;
  confirmar com o Alessandro antes de trocar pelo domínio próprio.
- **"Gestão de Escalas"** — sem domínio próprio confirmado; `liveHref` atual aponta para
  `https://gestaodeescalas-seven.vercel.app`.
- **"Orla.tech"** — sempre no passado ao descrever o vínculo empregatício (período fechado,
  mai/2024–ago/2026). Nunca tratar como emprego atual.

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

## Projetos de cliente/freelance (sem alteração nesta rodada)

Dados já corretos em `src/data/projects.js`, mantidos aqui só como referência de onde estão:
Sorria Clínicas Odontológicas, Projetos corporativos na Orla.tech (ver seção acima), IBR Maceió,
IBR Maragogi, Supermercado Vital.

## Regras de escrita (recap de CLAUDE.md)

- Nunca usar travessão (—) em texto voltado ao usuário.
- Frases curtas e diretas; evitar aberturas como "além disso" e adjetivos em fileira de três.
- Não inventar métrica, número ou resultado que o Alessandro não tenha fornecido.
