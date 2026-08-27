export const posts = [
  {
    slug: 'rls-supabase-multi-tenancy',
    title: 'RLS no Supabase: multi-tenancy sem middleware',
    excerpt:
      'Como deixei o Postgres ser a autoridade de acesso do Contabilidade Reformada, e o que isso cobra em troca na hora de debugar.',
    date: '12 de março de 2026',
    read: '9 min',
    tags: ['Supabase', 'PostgreSQL', 'Arquitetura'],
    body: [
      { kind: 'text', text: 'A pergunta que abre qualquer SaaS multi-tenant é onde mora o filtro por tenant. A resposta comum é "na aplicação": um middleware injeta o tenant_id em toda query e a vida segue, até a query que alguém escreveu com pressa não passar pelo middleware.' },
      { kind: 'heading', text: 'Por que RLS' },
      { kind: 'text', text: 'Row Level Security move essa regra para dentro do banco. A política é avaliada em toda leitura e escrita, venha de onde vier: do cliente, de uma Edge Function ou do seu psql às duas da manhã. O filtro deixa de ser algo que você lembra de aplicar.' },
      { kind: 'callout', text: 'Regra prática: se a regra de acesso puder ser esquecida por um desenvolvedor apressado, ela está no lugar errado.' },
      { kind: 'heading', text: 'A política mínima' },
      { kind: 'code', text: `alter table lancamentos enable row level security;

create policy "membro_le_sua_igreja"
  on lancamentos for select
  using (igreja_id in (
    select igreja_id from membros where user_id = auth.uid()
  ));` },
      { kind: 'heading', text: 'O que isso cobra em troca' },
      { kind: 'text', text: 'Erro de política não grita. Ele devolve zero linhas, como se o dado não existisse. Isso é ótimo para segurança e péssimo para debug. A saída foi um harness de teste que roda o mesmo conjunto de queries assumindo cada papel e falha quando o resultado diverge do esperado.' },
      { kind: 'todo', text: 'TODO: continuar com a seção sobre funções STABLE e custo de planner, e o script de teste por papel.' },
    ],
  },
  {
    slug: 'zustand-slices',
    title: 'Quebrando uma store Zustand de 1160 linhas em slices',
    excerpt: 'Uma refatoração feita em produção, um domínio por vez, mantendo a API pública da store intacta.',
    date: '28 de janeiro de 2026',
    read: '11 min',
    tags: ['React', 'Zustand', 'Refatoração'],
    body: [
      { kind: 'text', text: 'A store do Gestão de Escalas cresceu do jeito honesto: uma feature de cada vez, sempre "só mais um campo". Quando bateu 1160 linhas, marcar a presença de uma pessoa repintava a tela inteira.' },
      { kind: 'heading', text: 'O sintoma não era o tamanho' },
      { kind: 'text', text: 'Arquivo grande incomoda, mas não causa re-render. A causa real era o padrão de consumo: componentes chamavam useAppStore() sem seletor e assinavam o objeto inteiro. Qualquer set() notificava todo mundo.' },
      { kind: 'heading', text: 'Migrando sem branch longa' },
      { kind: 'text', text: 'A regra que tornou isso viável foi manter a assinatura pública igual durante toda a migração. Cada slice saiu para o seu arquivo, a store raiz continuou expondo os mesmos nomes, e os componentes foram convertidos para seletores estreitos em pequenos lotes.' },
      { kind: 'code', text: `export const createEscalasSlice = (set, get) => ({
  escalas: {
    byId: {},
    confirmar: (id, userId) => set(state => ({ /* ... */ }))
  }
});

export const useAppStore = create((...a) => ({
  ...createEscalasSlice(...a),
  ...createMembrosSlice(...a),
  ...createUiSlice(...a)
}));` },
      { kind: 'todo', text: 'TODO: continuar com a comparação rasa, ações que cruzam slices e como medi o ganho no profiler.' },
    ],
  },
  {
    slug: 'bug-persistencia-mes-sem-registro',
    title: 'O bug silencioso de persistência que só aparecia em meses sem registro',
    excerpt: 'Zero linhas não é erro. Foi por isso que esse bug sobreviveu tanto tempo, e o que ele me ensinou sobre estado inicial.',
    date: '4 de dezembro de 2025',
    read: '7 min',
    tags: ['PostgreSQL', 'Debug', 'Supabase'],
    body: [
      { kind: 'text', text: 'O relatório aparecia vazio para igrejas recém-criadas. Nenhum erro no console, nenhuma exceção no servidor, nenhum alerta. Só uma tela em branco e a suspeita de que o dado não tinha sido salvo. Essa suspeita era exatamente a pista errada.' },
      { kind: 'heading', text: 'Zero linhas engana' },
      { kind: 'text', text: 'Com RLS, "sem permissão" e "sem dado" chegam ao cliente do mesmo jeito. Rodar a mesma query com um papel privilegiado foi o que separou as duas hipóteses em cinco minutos: o dado estava lá.' },
      { kind: 'heading', text: 'Estado inicial é feature' },
      { kind: 'text', text: 'A política dependia de um registro de configuração que só nascia junto do primeiro lançamento. Ou seja: o sistema só funcionava depois de usado. Movi a criação para a transação de cadastro e passei a testar toda tela com uma conta zerada.' },
      { kind: 'todo', text: 'TODO: continuar com o checklist de estado vazio que passei a rodar antes de cada release.' },
    ],
  },
]

export const getPost = (slug) => posts.find((p) => p.slug === slug)
export const allTags = () => Array.from(new Set(posts.flatMap((p) => p.tags)))
