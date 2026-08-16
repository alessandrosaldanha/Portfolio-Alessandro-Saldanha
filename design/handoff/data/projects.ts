import { z } from 'zod';

export const decisionSchema = z.object({
  decision: z.string(),
  alternatives: z.string(),
  why: z.string(),
  tradeoff: z.string(),
});

export const projectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  role: z.string(),                 // "Produto próprio · solo"
  outcome: z.string(),              // 1 linha de resultado, usada no card da home
  type: z.enum(['Produto próprio', 'Cliente', 'Freelance']),
  period: z.string(),
  featured: z.boolean(),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),   // botão "Código" só renderiza se existir
  stack: z.array(z.string()),
  chips: z.array(z.string()).max(4),
  overview: z.object({
    client: z.string(),
    duration: z.string(),
    team: z.string(),
    stack: z.string(),
  }),
  context: z.string(),
  myRole: z.string(),
  decisions: z.array(decisionSchema).optional(),
  features: z.array(z.object({
    title: z.string(), body: z.string(),
    image: z.string().optional(), alt: z.string().optional(),
  })).optional(),
  challenge: z.object({
    title: z.string(),
    problem: z.string(), investigation: z.string(), solution: z.string(), result: z.string(),
    code: z.object({ lang: z.string(), source: z.string() }).optional(),
  }).optional(),
  results: z.array(z.string()).optional(),
  gallery: z.array(z.object({ src: z.string(), alt: z.string() })).optional(),
  diagram: z.string().optional(),   // caminho de SVG ou fonte Mermaid
});

export type Project = z.infer<typeof projectSchema>;
export type Decision = z.infer<typeof decisionSchema>;

// A ordem deste array define a navegação "anterior / próximo".
// O conteúdo real de cada projeto está no design (Portfolio Alessandro.dc.html) —
// copie de lá para cá ao popular.
export const projects: Project[] = [
  // contabilidade-igreja, gestao-de-escalas, sorria-clinicas, mare-de-estudos, orla-corporativos
];

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
export const featuredProjects = () => projects.filter(p => p.featured);
export const projectNeighbours = (slug: string) => {
  const i = projects.findIndex(p => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};
