import nexusAcessoCpf from '../assets/nexus/nexus-acesso-cpf.webp'
import nexusSelecaoTeste from '../assets/nexus/nexus-selecao-teste.webp'
import nexusTesteFinalizado from '../assets/nexus/nexus-teste-finalizado.webp'
import wesafetySite from '../assets/nexus/wesafety-site.webp'

export const projects = [
  {
    slug: 'contabilidade-igreja',
    name: 'Contabilidade Reformada',
    tagline: 'Tesoureiro de igreja lançava cada movimentação do extrato bancário à mão, uma por uma. A IA (Gemini) lê o extrato em CSV, Excel ou PDF, categoriza tudo e mostra uma prévia editável antes de gravar no livro caixa.',
    role: 'Produto próprio · solo',
    outcome: 'Isolamento por igreja resolvido no banco com RLS, sem camada de middleware.',
    badges: ['Papel: Solo, full-stack', 'Período: desde 2024', 'Tipo: Produto próprio'],
    type: 'Produto próprio',
    featured: true,
    live: true,
    liveHref: 'https://contabilidadereformada.com.br',
    repo: null,
    stack: ['React', 'Supabase', 'PostgreSQL', 'Tailwind', 'React Router', 'Gemini'],
    chips: ['React', 'Supabase', 'Gemini', 'RLS'],
    overview: [
      { label: 'Cliente', value: 'Produto próprio' },
      { label: 'Duração', value: 'Desde 2024, em evolução' },
      { label: 'Time', value: 'Solo' },
      { label: 'Stack', value: 'React, Supabase (Postgres, RLS, Auth, Storage, Edge Functions), Tailwind, React Router, Gemini (leitura e categorização de extrato)' },
    ],
    context:
      'Igrejas pequenas costumam controlar caixa em planilhas compartilhadas por WhatsApp, e o tesoureiro lançava cada movimentação do extrato bancário à mão, uma por uma, categorizando no olho. Ninguém sabe qual é a versão vigente, o tesoureiro anterior leva o histórico embora e a prestação de contas para a assembleia vira uma noite de reconciliação manual. O problema não é só de acesso e histórico: é também o tempo gasto lançando o óbvio.',
    myRole:
      'Fiz tudo: modelagem do banco, políticas de segurança, integração com a API do Gemini para leitura e categorização de extrato, front-end, landing e deploy. É um produto meu, então não há aqui escopo de terceiros. Quando digo que decidi algo, decidi mesmo.',
    decisions: [
      {
        decision: 'Extrato lido e categorizado por IA, com prévia editável antes de gravar',
        alternatives: 'Lançamento manual movimentação por movimentação; importação automática direto para o livro caixa, sem revisão humana.',
        why: 'O problema original era o tesoureiro lançando cada movimentação na mão. O Gemini lê o CSV, Excel ou PDF do banco e já categoriza, mas a prévia editável garante que nada entra no livro caixa sem o tesoureiro confirmar.',
        tradeoff: 'A extração de IA erra categoria às vezes, principalmente em descrições de movimentação ambíguas. Por isso a prévia é editável e o arquivo original fica anexado na aba de importações, para conferência.',
      },
      {
        decision: 'Isolamento multi-tenant via Row Level Security, não via camada de aplicação',
        alternatives: 'Um banco por igreja; filtro por tenant_id no cliente; um backend Node intermediando todas as queries.',
        why: 'Com RLS a regra de acesso vive junto do dado. O cliente fala direto com o Postgres via PostgREST e nenhuma query esquecida vaza dados de outra igreja, porque o filtro não é opcional.',
        tradeoff: 'Debug de política é mais chato que debug de if: erro de RLS aparece como "linha não existe", não como "acesso negado". Precisei de um conjunto de testes SQL rodando como cada papel para ter confiança.',
      },
      {
        decision: 'Permissões como tabela de papéis + funções SQL, não como flags no perfil',
        alternatives: 'Booleanos no registro do usuário (is_admin, can_edit); checagem só no front.',
        why: 'Tesoureiro, pastor e conselho enxergam coisas diferentes do mesmo lançamento. Uma tabela de papéis por igreja permite que a mesma pessoa seja admin numa e leitora em outra.',
        tradeoff: 'Toda política vira um JOIN a mais. Resolvi com funções STABLE que o planner consegue cachear dentro da transação.',
      },
      {
        decision: 'Pricing da landing vindo do banco por RPC SECURITY DEFINER',
        alternatives: 'Preços hardcoded no componente; JSON estático no build.',
        why: 'A landing é pública, mas os planos vivem numa tabela protegida. Uma função SECURITY DEFINER expõe exatamente as colunas de vitrine e nada mais. Mudar preço não exige deploy.',
        tradeoff: 'SECURITY DEFINER ignora RLS por definição, então a função precisa ser paranoica sobre o que retorna. Mantive uma só, pequena, com search_path fixo.',
      },
    ],
    features: [
      { title: 'Multi-igreja com admin por igreja', body: 'Cada igreja tem cadastro próprio; o admin (pastor) gerencia a sua e cadastra os tesoureiros dela.' },
      { title: 'Extrato bancário lido por IA', body: 'O tesoureiro sobe o extrato em CSV, Excel ou PDF; o arquivo fica anexado na aba de importações com data e hora. O Gemini extrai todas as movimentações e categoriza cada uma.' },
      { title: 'Prévia editável antes de gravar', body: 'Antes de ir para o livro caixa, o tesoureiro vê uma prévia da importação e ajusta o que quiser. Nada é gravado sem confirmação.' },
      { title: 'Livro caixa com filtros e dashboard', body: 'Filtros por entrada, saída, categoria e responsável, com visão mensal, e dashboard mensal, trimestral e anual.' },
      { title: 'Trilha de auditoria', body: 'Registro de quem subiu, editou ou removeu cada lançamento, com gestão de usuários por igreja.' },
    ],
    challenge: {
      title: 'Um relatório vazio que só acontecia em igrejas novas',
      steps: [
        { label: 'Problema', body: 'Igrejas recém-cadastradas viam o relatório mensal em branco mesmo com lançamentos salvos. Em contas antigas, nunca acontecia.' },
        { label: 'Investigação', body: 'O log do PostgREST mostrava a query retornando zero linhas, sem erro. Rodando o mesmo SQL como service_role, os dados estavam lá. Isso apontava para a política, não para o dado. A diferença entre as contas era o registro de configuração da igreja, criado por um trigger que só rodava no primeiro lançamento.' },
        { label: 'Solução', body: 'A política do relatório dependia indiretamente desse registro de configuração. Movi a criação para o momento do cadastro da igreja, dentro da mesma transação, e escrevi a política para não depender de dado opcional.' },
        { label: 'Resultado', body: 'O caso sumiu e virou teste de regressão: um script cria uma igreja zerada e valida que todas as views respondem antes do primeiro lançamento.' },
      ],
      code: `create policy "relatorio_por_igreja"
  on public.lancamentos for select
  using (
    igreja_id in (
      select m.igreja_id from public.membros m
      where m.user_id = auth.uid()
    )
  );
-- antes: o predicado passava por configuracoes_igreja,
-- que podia simplesmente não existir ainda.`,
    },
    results: [
      'Nenhum incidente de vazamento entre tenants desde que as políticas passaram a ser testadas por papel.',
      'Mudança de preço na landing deixou de exigir deploy. Agora é uma linha no banco.',
      'Aprendizado principal: RLS é ótima como fonte da verdade, mas exige um harness de teste próprio; sem ele você está confiando na leitura do código.',
    ],
    gallery: ['Dashboard', 'Lançamentos', 'Relatório'],
  },
  {
    slug: 'gestao-de-escalas',
    name: 'Gestão de Escalas',
    tagline: 'Escala de ministério em grupo de WhatsApp não tem confirmação nem histórico confiável. SaaS de escalas com convites, confirmações e e-mails transacionais reais, cobrindo louvor, mídia, cozinha, pastoral, EBD, ceia, diaconato e outros ministérios.',
    role: 'Produto próprio · solo',
    outcome: 'Store Zustand de 1160 linhas quebrada em slices. A partir daí, a feature nova parou de doer.',
    badges: ['Papel: Solo, full-stack', 'Período: desde 2025', 'Tipo: Produto próprio'],
    type: 'Produto próprio',
    featured: false,
    live: true,
    liveHref: 'https://gestaodeescalas-seven.vercel.app',
    repo: null,
    stack: ['Next.js', 'TypeScript', 'Zustand', 'Neon PostgreSQL', 'Google OAuth', 'Resend'],
    chips: ['Next.js', 'TypeScript', 'Zustand', 'Neon'],
    overview: [
      { label: 'Cliente', value: 'Produto próprio' },
      { label: 'Duração', value: 'Desde 2025, em evolução' },
      { label: 'Time', value: 'Solo' },
      { label: 'Stack', value: 'Next.js (App Router), TypeScript, Zustand, Neon PostgreSQL, Google OAuth, Resend' },
    ],
    context:
      'Escala de ministério vive em grupo de WhatsApp: alguém posta uma imagem, três pessoas respondem que não podem, e a versão final existe só na cabeça do líder. Faltava um lugar onde a escala fosse um estado, não uma mensagem. Cobre louvor, mídia, cozinha, pastoral, EBD (inclusive EBD de novos membros), ceia e diaconato, entre outros ministérios, e cada membro só vê a escala em que foi designado; a liderança vê tudo.',
    myRole: 'Produto próprio, feito sozinho: modelagem, autenticação, front-end, disparo de e-mails e deploy.',
    decisions: [
      {
        decision: 'Zustand em slices por domínio, com a store composta na raiz',
        alternatives: 'Manter a store única; migrar para Redux Toolkit; jogar tudo em React Query + estado local.',
        why: 'A store monolítica tinha crescido para 1160 linhas e qualquer alteração recarregava metade da árvore. Slices por domínio (escalas, membros, ministérios, UI) deram fronteiras claras e seletores estreitos.',
        tradeoff: 'Ações que cruzam slices ficam mais verbosas. Precisam de um orquestrador em vez de mexer no estado vizinho direto. Aceitei a verbosidade em troca de saber quem escreve onde.',
      },
      {
        decision: 'RBAC checado no servidor, com o front apenas escondendo o que já é negado',
        alternatives: 'Confiar no gate visual do componente; middleware genérico por rota.',
        why: 'Líder, escalado e visitante têm ações distintas sobre a mesma escala. Esconder botão não é autorização; a checagem mora na server action.',
        tradeoff: 'Alguma duplicação entre a regra do servidor e a condição visual. Centralizei a regra num módulo compartilhado para as duas lerem a mesma fonte.',
      },
      {
        decision: 'Resend para e-mail transacional em vez de SMTP próprio',
        alternatives: 'Nodemailer com SMTP de provedor; notificação só dentro do app.',
        why: 'Convite e lembrete precisam chegar na caixa de entrada, não no spam. Entregabilidade é um problema de infraestrutura que eu não quero manter sozinho.',
        tradeoff: 'Mais uma dependência externa e um limite de envio no plano gratuito. O disparo é enfileirado e idempotente para não perder convite em pico.',
      },
    ],
    features: [
      { title: 'Escopo por ministério e visibilidade por papel', body: 'Cobre louvor, mídia, cozinha, pastoral, EBD, EBD de novos membros, ceia, diaconato e outros. Cada membro vê apenas a escala em que foi designado; a liderança vê tudo.' },
      { title: 'Montagem de escala por ministério', body: 'Líder monta a escala do mês por função e vê conflitos de disponibilidade antes de publicar.' },
      { title: 'Convite e confirmação', body: 'Cada escalado recebe e-mail com link direto para confirmar ou recusar; o estado volta para a escala em tempo real.' },
      { title: 'Login com Google', body: 'OAuth do Google elimina senha para um público que não quer criar mais uma conta.' },
    ],
    challenge: {
      title: 'Quebrando uma store de 1160 linhas sem parar o produto',
      steps: [
        { label: 'Problema', body: 'Um único create() concentrava estado de escalas, membros, ministérios e UI. Cada mutação notificava todos os assinantes e o app repintava inteiro ao marcar uma presença.' },
        { label: 'Investigação', body: 'O profiler do React mostrava re-render de componentes que não liam o dado alterado. A causa era o padrão de consumo: componentes pegavam a store inteira em vez de um seletor.' },
        { label: 'Solução', body: 'Extraí um slice por domínio, mantendo a assinatura pública da store igual durante a migração, e troquei os consumos por seletores estreitos com comparação rasa. Migrei um domínio por vez, com o app funcionando entre cada passo.' },
        { label: 'Resultado', body: 'Marcar presença passou a repintar só a linha afetada, e adicionar campo novo virou mudança local em um arquivo em vez de uma leitura de 1160 linhas.' },
      ],
      code: `// antes
const store = useAppStore(); // qualquer mudança repinta

// depois
const escala = useAppStore(s => s.escalas.byId[id]);
const confirmar = useAppStore(s => s.escalas.confirmar);

export const createEscalasSlice = (set, get) => ({
  escalas: { byId: {}, confirmar: (id, userId) => set(/* ... */) }
});`,
    },
    results: [
      'Re-render em massa eliminado nas telas de escala (a interação mais frequente do produto).',
      'Onboarding de feature nova caiu para um arquivo de slice + um componente, sem tocar no resto.',
      'Aprendizado: o problema não era Zustand, era consumir estado sem seletor. Refatorar mantendo a API pública permitiu migrar sem branch longa.',
    ],
    gallery: ['Escala do mês', 'Convite por e-mail', 'Painel do líder'],
  },
  {
    slug: 'sorria-clinicas',
    name: 'Sorria Clínicas Odontológicas',
    tagline: 'Redesign e site multi-página em Next.js, com foco em SEO local e Core Web Vitals.',
    role: 'Freelance · solo',
    outcome: 'Site institucional refeito para ser encontrado em busca local e carregar rápido em 4G.',
    badges: ['Papel: Freelance, solo', 'Período: 2025', 'Tipo: Cliente'],
    type: 'Freelance',
    featured: false,
    live: true,
    liveHref: 'https://sorria-clinicas-site.vercel.app/',
    repo: null,
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'SEO', 'next/image'],
    chips: ['Next.js', 'TypeScript', 'Tailwind', 'SEO'],
    overview: [
      { label: 'Cliente', value: 'Sorria Clínicas Odontológicas' },
      { label: 'Duração', value: '2025' },
      { label: 'Time', value: 'Solo' },
      { label: 'Stack', value: 'Next.js (App Router), TypeScript, Tailwind, next/image' },
    ],
    context:
      'A clínica tinha uma página única e pesada, sem estrutura por especialidade e sem sinais de negócio local. Quem buscava por procedimento na região simplesmente não chegava até ela.',
    myRole:
      'Freelance solo: levantamento de conteúdo com a cliente, arquitetura de páginas, implementação e publicação. O conteúdo clínico foi validado por ela; eu não escrevi promessa de resultado.',
    decisions: [
      {
        decision: 'Uma página por especialidade em vez de âncoras numa home longa',
        alternatives: 'Manter one-page com seções; blog genérico sem página de serviço.',
        why: 'Busca local acontece por procedimento. Cada página vira um alvo de busca próprio, com título, descrição e conteúdo específicos.',
        tradeoff: 'Mais páginas para a cliente manter atualizadas. Estruturei o conteúdo em arquivos de dados para que editar texto não exija mexer em layout.',
      },
      {
        decision: 'Imagens servidas por next/image com dimensões fixas',
        alternatives: 'Tags img diretas com as fotos originais do fotógrafo.',
        why: 'As fotos originais pesavam megabytes e derrubavam LCP e CLS no 3G/4G do público real.',
        tradeoff: 'Exige informar largura e altura em cada uso, o que engessa um pouco o layout. Em troca, nada pula durante o carregamento.',
      },
    ],
    features: [
      { title: 'Páginas por especialidade', body: 'Cada procedimento tem página própria com conteúdo, dúvidas frequentes e chamada para agendamento no WhatsApp.' },
      { title: 'Dados de negócio local', body: 'Endereço, horários e mapa estruturados para aparecer corretamente em busca e mapas.' },
    ],
    results: [
      'Estrutura pronta para busca por procedimento, que antes não existia.',
      'Carregamento estável em conexão móvel (sem salto de layout nas fotos).',
    ],
    gallery: ['Home', 'Página de especialidade', 'Mobile'],
  },
  {
    slug: 'mare-de-estudos',
    name: 'Maré de Estudos',
    tagline: 'Vídeo-aula solta no YouTube não vira trilha de estudo sozinha. Ao concluir 100% de uma trilha, libera um quiz gerado por IA (Gemini), com explicação de cada erro no final.',
    role: 'Produto próprio · solo',
    outcome: 'Projeto onde levei design system, RLS e internacionalização a sério antes de ter um usuário sequer.',
    badges: ['Papel: Solo, full-stack', 'Período: 2025', 'Tipo: Produto próprio'],
    type: 'Produto próprio',
    featured: true,
    live: true,
    liveHref: 'https://mareestudos.com.br',
    repo: null,
    stack: ['React 19', 'TypeScript', 'Vite', 'Supabase', 'React Router 7', 'Tailwind', 'i18next', 'Gemini'],
    chips: ['React 19', 'TypeScript', 'Supabase', 'Gemini'],
    overview: [
      { label: 'Cliente', value: 'Produto próprio' },
      { label: 'Duração', value: '2025' },
      { label: 'Time', value: 'Solo' },
      { label: 'Stack', value: 'React 19, TypeScript, Vite, Supabase (Postgres, Auth, Storage, RLS), React Router 7, Tailwind, i18next, Gemini (geração e correção do quiz)' },
    ],
    context:
      'Boa aula no YouTube existe de sobra; o que falta é ordem. A plataforma sugere o próximo vídeo pelo que prende atenção, não pelo que faz sentido estudar depois, e organizar playlist em trilha na mão não escala. O produto resolve isso com um Explore de playlists já catalogadas (ou a opção de montar a própria trilha), progresso de 0 a 100% por trilha, e a validação de que o conteúdo entrou vem de um quiz gerado por IA que só libera na conclusão.',
    myRole:
      'Produto próprio, solo. Modelagem do banco com RLS em todas as tabelas, importação de playlists pela YouTube Data API, integração com a API do Gemini para gerar e corrigir o quiz de cada trilha, front-end, design system e internacionalização da interface.',
    decisions: [
      {
        decision: 'Design system próprio em tokens antes das telas',
        alternatives: 'Usar uma biblioteca de componentes pronta; estilizar direto com utilitários.',
        why: 'Queria consistência sem carregar uma biblioteca inteira, e usar o projeto para praticar a disciplina de token → primitivo → componente.',
        tradeoff: 'Começo mais lento: as primeiras duas telas custaram o dobro. A partir da terceira, cada tela nova saiu quase de graça.',
      },
      {
        decision: 'RLS em todas as tabelas desde o início, mesmo sem usuário externo',
        alternatives: 'Deixar autorização só no front e restringir no banco depois, quando tivesse mais gente usando.',
        why: 'Dado de estudo e anotação é pessoal. Não queria migrar política de acesso depois com dado real já no banco.',
        tradeoff: 'Mais tempo de modelagem antes da primeira tela funcionar de ponta a ponta.',
      },
      {
        decision: 'Importação de playlist pela YouTube Data API, não por scraping',
        alternatives: 'Raspar a página do YouTube diretamente; cadastrar cada vídeo manualmente.',
        why: 'A API oficial devolve metadado estruturado (título, duração, thumbnail) e não quebra a cada mudança de layout do YouTube.',
        tradeoff: 'Cota de uso da API limita quantas playlists dá pra importar por dia.',
      },
      {
        decision: 'Quiz gerado por IA a partir do conteúdo assistido, não banco de perguntas fixo',
        alternatives: 'Banco de perguntas cadastradas manualmente por trilha; quiz genérico de múltipla escolha sem relação direta com o vídeo.',
        why: 'O quiz só libera depois que a trilha chega a 100%, e cada trilha tem um conteúdo diferente. Gerar as perguntas com o Gemini a partir do material estudado permite o usuário escolher entre 10 e 100 questões sem manter um banco de perguntas por trilha.',
        tradeoff: 'A qualidade da pergunta depende do prompt e do conteúdo da aula. Por isso o quiz também explica cada erro no fim, não só corrige, para o resultado servir de estudo mesmo quando uma questão sai fraca.',
      },
    ],
    features: [
      { title: 'Explore ou monte sua trilha', body: 'Trilhas de estudo já catalogadas para explorar, ou montagem da própria trilha escolhendo os vídeos.' },
      { title: 'Player com anotações lado a lado', body: 'O vídeo roda no player do YouTube com um campo de anotações ao lado, para o usuário construir o próprio material de estudo.' },
      { title: 'Quiz gerado por IA ao completar a trilha', body: 'Ao chegar a 100% de progresso, um quiz de 10 a 100 questões (à escolha do usuário) é gerado pelo Gemini a partir do conteúdo estudado.' },
      { title: 'Desempenho com explicação de cada erro', body: 'Ao final do quiz, mostra o desempenho e explica cada questão errada, não só corrige.' },
      { title: 'Conta e roadmap de estudos', body: 'Login próprio ou com Google, com "Meus estudos" reunindo todas as trilhas e um roadmap/calendário de estudo.' },
    ],
    results: [
      'Base de componentes reaproveitada depois em outros projetos pessoais.',
      'RLS em todas as tabelas desde o primeiro dia, sem precisar de migração de segurança depois.',
      'Aprendizado: token primeiro, componente depois. Inverter essa ordem custa retrabalho.',
    ],
    gallery: ['Trilhas', 'Detalhe da playlist', 'Anotações'],
  },
  {
    slug: 'orla-corporativos',
    name: 'Projetos corporativos na Orla.tech',
    tagline: 'Sites de cliente construídos na Orla.tech entre 2024 e 2026: dois sites completos para o Grupo RD, o ANBIMA Summit 2025 (entrega solo), ANBIMA Global Insights, ANBIMA EDU, Conviva Hotelaria e outros. O Nexus (WeSafety) tem case próprio.',
    role: 'Estagiário → dev júnior',
    outcome: 'ANBIMA Summit 2025 (entrega solo) e dois sites completos para o Grupo RD, do zero à produção; ANBIMA Internacional foi manutenção e melhorias, não reformulação.',
    badges: ['Papel: Estagiário → Desenvolvedor júnior', 'Período: 2024–2026', 'Tipo: Cliente (via Orla.tech)'],
    type: 'Cliente',
    featured: false,
    live: false,
    liveHref: '#',
    repo: null,
    stack: ['React', 'TypeScript', 'Next.js', 'Framer', 'WordPress', 'Webflow'],
    chips: ['React', 'TypeScript', 'Next.js'],
    overview: [
      { label: 'Cliente', value: 'Grupo RD (Drogasil e Raia), ANBIMA (Summit, Global Insights, EDU, Internacional), Conviva Hotelaria, Papelzinho, Orla.tech, FixInfra (via Orla.tech)' },
      { label: 'Duração', value: '2024–2026' },
      { label: 'Time', value: 'Solo ou em dupla, conforme o projeto (equipe da Orla.tech)' },
      { label: 'Stack', value: 'React, TypeScript, Next.js, Framer, WordPress/Oxygen e Webflow, conforme o produto e a necessidade de autonomia do cliente pós-entrega' },
    ],
    context:
      'São produtos de clientes da Orla.tech, todos públicos e no ar. O que fica de fora é processo interno, dado de negócio e arquitetura do cliente, cobertos por confidencialidade, não a existência do site. Os links de cada um estão nos blocos abaixo.',
    myRole:
      'Trabalhei na Orla.tech de maio de 2024 a agosto de 2026, primeiro como estagiário e depois como desenvolvedor júnior. Os dois sites do Grupo RD foram construídos do zero à produção. O ANBIMA Summit 2025 foi entrega solo, também do zero à produção, com ajuda de outro desenvolvedor em um único componente (a tabela de programação, em React). ANBIMA Global Insights e ANBIMA EDU foram construídos em dupla com outro desenvolvedor: executei as partes principais e mais complexas e fui peça fundamental para colocar os dois no ar. No ANBIMA Internacional atuei em manutenção e melhorias sobre uma base existente, não em reformulação. Também fiz o site institucional da Conviva Hotelaria, features no Papelzinho como estagiário, e alterações pontuais no site institucional da própria Orla. A escolha de stack (Framer, WordPress/Oxygen, Webflow) sempre pensou na autonomia do cliente depois da entrega, e em tudo isso passei por code review dentro da arquitetura e dos padrões definidos pelo time.',
    decisions: [],
    featuresLabel: 'Projetos entregues',
    features: [
      { title: 'Drogasil Manipulação', href: 'https://manipulacao.drogasil.com.br/', body: 'Site completo do zero à produção para desvincular o conteúdo de medicamentos manipulados do e-commerce principal da marca: catálogo de princípios ativos de A a Z (centenas de ativos, página dedicada por ativo, índice alfabético e paginação), diretório de laboratórios parceiros, blog de artigos com comentários, fale conosco e fluxo de envio de receita para orçamento.' },
      { title: 'Droga Raia Manipulação', href: 'https://manipulacao.raia.com.br/', body: 'Mesmo escopo do site da Drogasil, construído do zero à produção para a marca Droga Raia.' },
      { title: 'ANBIMA Summit 2025', highlight: 'Entrega solo', href: 'https://anbimasummit.com.br/', body: 'Site do evento do zero à produção, feito sozinho e no ar antes da data do evento, com venda de ingressos e programação completa. Um único componente, a tabela de programação em React, teve ajuda de outro desenvolvedor. Minha entrega mais forte na Orla.tech.' },
      { title: 'ANBIMA Global Insights', href: 'https://anbimaglobalinsights.com.br/', body: 'Portal em Framer construído do zero à produção em dupla com outro desenvolvedor, com CMS estruturado para o time do cliente publicar sem depender de dev. Executei as partes principais e mais complexas.' },
      { title: 'ANBIMA EDU', href: 'https://anbimaedu.com.br/', body: 'Mesmo formato do Global Insights: portal em Framer construído em dupla, CMS estruturado para publicação autônoma do time do cliente.' },
      { title: 'ANBIMA Internacional', href: 'https://international.anbima.com.br/', body: 'Manutenção e melhorias sobre uma base já existente.' },
      { title: 'Conviva Hotelaria', href: 'https://convivastay.com.br/', body: 'Site institucional e de agendamento do zero à produção, em WordPress com Oxygen, substituindo um site antigo, lento e desorganizado.' },
      { title: 'Papelzinho', href: 'https://papelzinho.com/pt-br/', body: 'App de amigo secreto, produto da própria Orla. Participação pequena, como estagiário, ao longo de cerca de 4 meses: alguns commits e features menores.' },
      { title: 'Site institucional da Orla', href: 'https://www.orla.tech/', body: 'Alterações e edições pontuais em Webflow.' },
      { title: 'FixInfra', body: 'Site em Webflow, construído do zero. Está fora do ar hoje.' },
    ],
    results: [
      'Do zero à produção sob prazo e processo de time: padrão de código, review e ambiente de homologação, na maioria dos projetos hoje no ar para os clientes.',
      'A experiência de manutenção (ANBIMA Internacional) ensinou o oposto do que os produtos próprios ensinam: ler antes de propor economiza o dobro do tempo depois.',
    ],
    gallery: [],
  },
  {
    slug: 'nexus-wesafety',
    name: 'Nexus (WeSafety)',
    tagline: 'Plataforma de gestão e avaliação psicossocial para o setor de transporte: o motorista faz dois instrumentos, EEA e DT, e o resultado gera uma recomendação de aptidão para dirigir.',
    role: 'Cliente · via Orla.tech',
    outcome: 'Plataforma de gestão e avaliação psicossocial do grupo Águia Branca no ar, com os instrumentos EEA e DT orientando (não decidindo) a aptidão do motorista.',
    badges: ['Papel: Desenvolvedor (Orla.tech)', 'Período: 2024–2026', 'Tipo: Cliente (via Orla.tech)'],
    type: 'Cliente',
    featured: true,
    accessNote: 'Acesso restrito',
    live: true,
    liveHref: 'https://nexus.wesafety.com.br/',
    repo: null,
    stack: ['WeWeb.io', 'No-code/Low-code'],
    chips: ['WeWeb.io'],
    overview: [
      { label: 'Cliente', value: 'WeSafety (grupo Águia Branca), via Orla.tech' },
      { label: 'Duração', value: '2024–2026' },
      { label: 'Time', value: 'Equipe da Orla.tech' },
      { label: 'Stack', value: 'WeWeb.io' },
    ],
    context:
      'WeSafety é um grupo da Águia Branca. Antes do Nexus, os motoristas passavam por um instrumento de avaliação anterior que nunca renovava o banco de questões: eram sempre as mesmas perguntas, ciclo após ciclo. Com o tempo, o motorista passou a responder no automático, e o teste deixou de medir aptidão para medir familiaridade com o próprio teste. Um acidente, em que o motorista avaliado havia sido aprovado na avaliação em uso até então, evidenciou que ela não estava mais cumprindo a função. O Nexus nasceu como uma plataforma de gestão e testes, criada primeiro para o grupo Águia Branca e depois estendida para venda a outras empresas do setor de transporte.',
    myRole:
      'Construí o Nexus em WeWeb.io, dentro da equipe da Orla.tech, e também o site institucional da WeSafety, no mesmo stack.',
    coverImage: {
      src: nexusAcessoCpf,
      alt: 'Tela de acesso do Nexus, com campo de CPF do funcionário',
      width: 1400,
      height: 1328,
    },
    decisions: [],
    features: [
      {
        title: 'EEA (Estado Emocional Atual) e DT (Diagnóstico de Tendência)',
        body: 'EEA: teste diário, 20 questões em 10 categorias, duas por categoria. DT: teste periódico, 150 questões, também aplicado quando o motorista é reprovado no EEA.',
        image: { src: nexusSelecaoTeste, alt: 'Tela de seleção entre os testes Estado Emocional Atual (EEA) e Diagnóstico de Tendência (DT)', width: 1000, height: 951 },
      },
      {
        title: 'Recomendação de aptidão',
        body: 'O resultado de cada instrumento gera uma recomendação sobre a aptidão do motorista para dirigir. O produto entrega a recomendação, não a decisão: em caso de reprovação, cabe ao gestor local decidir o que fazer.',
        image: { src: nexusTesteFinalizado, alt: 'Tela de conclusão do teste no Nexus, confirmando o envio das respostas', width: 1000, height: 776 },
      },
      {
        title: 'Site institucional da WeSafety',
        href: 'https://www.wesafety.com.br/',
        body: 'Também construído em WeWeb.io, no mesmo stack do Nexus.',
        image: { src: wesafetySite, alt: 'Página inicial do site institucional da WeSafety, com a seção "Para quem?" e a lista de clientes atendidos', width: 1000, height: 902 },
      },
    ],
    results: [],
    gallery: [],
  },
  {
    slug: 'ibr-maceio',
    name: 'IBR Maceió',
    tagline: 'Site institucional para igreja sem presença web própria, com foco em divulgação, contato e conteúdo editável pela equipe local.',
    role: 'Freelance · solo',
    outcome: 'Site que centraliza informação e contato num só lugar, sem depender só de redes sociais.',
    badges: ['Papel: Freelance, solo', 'Período: 2025', 'Tipo: Cliente'],
    type: 'Freelance',
    featured: false,
    live: true,
    liveHref: 'https://ibrmaceio.vercel.app/',
    repo: null,
    stack: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'HTML/CSS'],
    chips: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    overview: [
      { label: 'Cliente', value: 'IBR Maceió' },
      { label: 'Duração', value: '2025' },
      { label: 'Time', value: 'Solo' },
      { label: 'Stack', value: 'React, TypeScript, Next.js, Tailwind, HTML/CSS' },
    ],
    context:
      'A igreja não tinha site próprio, só perfis em redes sociais. Quem procurava horário de culto ou contato dependia de achar a página certa numa rede social ou perguntar a alguém.',
    myRole:
      'Freelance solo. Levantei o conteúdo com a liderança, defini a estrutura de páginas, implementei e publiquei o site.',
    decisions: [
      {
        decision: 'Conteúdo organizado em arquivos de dados simples, não em CMS',
        alternatives: 'Um CMS headless completo; edição direta no código a cada mudança de texto.',
        why: 'A equipe da igreja não tem experiência técnica. Um arquivo de dados com campos nomeados é mais fácil de repassar por escrito do que treinar alguém num painel de CMS.',
        tradeoff: 'Toda alteração de conteúdo ainda depende de mim rodar um deploy. Aceitável para o volume de mudança de um site institucional pequeno.',
      },
    ],
    features: [
      { title: 'Página institucional', body: 'Apresentação da igreja, horários de culto e formas de contato reunidos numa página só.' },
      { title: 'Formulário de contato', body: 'Visitante manda mensagem direto pelo site, sem precisar achar o número certo numa rede social.' },
    ],
    results: [
      'Site publicado e no ar, reduzindo a dependência exclusiva de redes sociais.',
    ],
    gallery: ['Home', 'Contato'],
  },
  {
    slug: 'ibr-maragogi',
    name: 'IBR Maragogi',
    tagline: 'Site institucional para igreja que só tinha presença em redes sociais, com horários de culto, EBD, perguntas frequentes e localização.',
    role: 'Freelance · solo',
    outcome: 'Estrutura pensada para a própria equipe atualizar o conteúdo depois da entrega.',
    badges: ['Papel: Freelance, solo', 'Período: 2025', 'Tipo: Cliente'],
    type: 'Freelance',
    featured: false,
    live: true,
    liveHref: 'https://ibrmaragogi.vercel.app/',
    repo: null,
    stack: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    chips: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    overview: [
      { label: 'Cliente', value: 'IBR Maragogi' },
      { label: 'Duração', value: '2025' },
      { label: 'Time', value: 'Solo' },
      { label: 'Stack', value: 'React, TypeScript, Next.js, Tailwind' },
    ],
    context:
      'A igreja divulgava tudo só em redes sociais: horário de culto, escola bíblica, endereço. Quem não seguia a página perdia a informação, e não havia um lugar único e permanente pra consultar.',
    myRole:
      'Freelance solo. Planejei a interface, desenvolvi o front-end e cuidei do design responsivo, pensado principalmente para acesso pelo celular.',
    decisions: [
      {
        decision: 'Seção de perguntas frequentes fixa na página principal',
        alternatives: 'Deixar dúvidas comuns só nas redes sociais, respondidas uma a uma.',
        why: 'Visitante novo tem sempre as mesmas perguntas: horário, endereço, como participar. Uma seção fixa resolve isso sem depender de atendimento manual.',
        tradeoff: 'Preciso validar o conteúdo do FAQ com a liderança sempre que a rotina da igreja muda.',
      },
    ],
    features: [
      { title: 'Horários de culto e EBD', body: 'Agenda semanal de cultos e escola bíblica dominical, sempre visível na página principal.' },
      { title: 'Localização e contato', body: 'Endereço, mapa e canais de contato reunidos, para quem procura a igreja pela primeira vez.' },
      { title: 'Perguntas frequentes', body: 'Respostas para as dúvidas mais comuns de visitantes, sem depender de perguntar direto pela rede social.' },
    ],
    results: [
      'Site publicado, com toda informação essencial reunida num único lugar permanente.',
    ],
    gallery: ['Home', 'Horários', 'FAQ'],
  },
  {
    slug: 'supermercado-vital',
    name: 'Supermercado Vital',
    tagline: 'E-commerce com entrega em Maceió, com catálogo paginado, avaliações e checkout em três etapas.',
    role: 'Freelance · solo',
    outcome: 'Front-end completo integrado a uma API em Xano, sem backend próprio pra manter.',
    badges: ['Papel: Freelance, solo', 'Período: 2025', 'Tipo: Cliente'],
    type: 'Freelance',
    featured: false,
    live: true,
    liveHref: 'https://supermercadovital.vercel.app/',
    repo: null,
    stack: ['React 19', 'TypeScript', 'Vite', 'React Router', 'Axios', 'Xano'],
    chips: ['React 19', 'TypeScript', 'React Router', 'Xano'],
    overview: [
      { label: 'Cliente', value: 'Supermercado Vital' },
      { label: 'Duração', value: '2025' },
      { label: 'Time', value: 'Solo' },
      { label: 'Stack', value: 'React 19, TypeScript, Vite, React Router, Axios, Xano' },
    ],
    context:
      'O supermercado entrega em Maceió, mas não tinha loja online própria, só atendimento manual por WhatsApp para cada pedido. Catálogo, estoque e preço não tinham um lugar único onde o cliente pudesse consultar sozinho.',
    myRole:
      'Freelance solo, só front-end. A API e o banco já existiam prontos em Xano. Implementei a interface por cima: catálogo, carrinho, checkout e histórico de pedidos.',
    decisions: [
      {
        decision: 'Xano como back-end pronto, em vez de API própria',
        alternatives: 'Construir uma API própria em Node; usar Supabase.',
        why: 'O escopo do projeto pedia só front-end. Xano já entregava autenticação, catálogo e pedidos prontos por REST, então o trabalho virou consumir e integrar bem essa API.',
        tradeoff: 'Menos controle sobre modelagem de dados e performance de query. Listagem mais pesada exigiu paginação no cliente pra compensar.',
      },
      {
        decision: 'Checkout em três etapas separadas, não um formulário único',
        alternatives: 'Um formulário longo único com endereço, pagamento e revisão juntos.',
        why: 'Carrinho de supermercado costuma ter muitos itens. Dividir em etapas (endereço, pagamento, revisão) reduz erro de preenchimento e deixa claro em que ponto do pedido o cliente está.',
        tradeoff: 'Mais estado pra controlar entre etapas e mais tela pra manter consistente visualmente.',
      },
    ],
    features: [
      { title: 'Catálogo paginado', body: 'Lista de produtos carregada em páginas, sem travar com o catálogo inteiro de uma vez.' },
      { title: 'Avaliações de produto', body: 'Cliente vê e deixa avaliação por produto antes de decidir a compra.' },
      { title: 'Carrinho e checkout em três etapas', body: 'Endereço, pagamento e revisão como passos separados, com o carrinho preservado entre eles.' },
      { title: 'Histórico de pedidos', body: 'Cliente consulta pedidos anteriores sem precisar perguntar status por WhatsApp.' },
    ],
    results: [
      'Loja saiu do atendimento manual por WhatsApp para um catálogo self-service.',
    ],
    gallery: ['Catálogo', 'Carrinho', 'Checkout'],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const featuredProjects = () => projects.filter((p) => p.featured)
export const projectNeighbours = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  }
}
