# Portfólio — Alessandro Saldanha

Handoff do design (`Portfolio Alessandro.dc.html`) para Next.js 14 (App Router) + TypeScript strict.

## Stack
Next.js 14+ · TypeScript strict · Tailwind (tokens em CSS variables) · MDX no blog ·
Framer Motion só em microinterações · Vercel · next/image · next/font.

## Estrutura

```
app/
  layout.tsx              # <html> + fontes + ThemeProvider (next-themes) + JSON-LD Person
  page.tsx                # Home
  projetos/page.tsx       # Listagem + filtro (client component só no filtro)
  projetos/[slug]/page.tsx# Template único de detalhe
  blog/page.tsx
  blog/[slug]/page.tsx
  sobre/page.tsx
  contato/page.tsx
  feed.xml/route.ts
  sitemap.ts  robots.ts  opengraph-image.tsx
components/
  layout/Header.tsx  Footer.tsx  ThemeToggle.tsx
  home/Hero.tsx  LogoMarquee.tsx  FeaturedProjects.tsx  StackGrid.tsx  LatestPosts.tsx  ContactCta.tsx
  project/ProjectHeader.tsx  OverviewCard.tsx  DecisionCard.tsx  FeatureRow.tsx
           ChallengeNarrative.tsx  Gallery.tsx  ProjectNav.tsx
  shared/SocialLinks.tsx  Chip.tsx  SectionLabel.tsx  CodeBlock.tsx
content/projects/*.mdx    # corpo longo opcional
content/posts/*.mdx
data/projects.ts  companies.ts  social.ts  stack.ts  timeline.ts
lib/mdx.ts  readingTime.ts  seo.ts
public/logos/  public/shots/
```

Server Components por padrão. `"use client"` apenas em: ThemeToggle, filtro de /projetos,
filtro de tags do blog, Gallery (lightbox), botão copiar do CodeBlock, formulário de /contato.

## Tokens

Os tokens vêm do design system Orla (`tokens/*.css`). Exponha-os como CSS variables no
`globals.css` e referencie no `tailwind.config.ts`:

```ts
colors: {
  page: 'var(--surface-page)', card: 'var(--surface-card)', sunken: 'var(--surface-sunken)',
  ink: 'var(--text-primary)', muted: 'var(--text-secondary)', faint: 'var(--text-tertiary)',
  line: 'var(--border-subtle)', accent: 'var(--orla-blue)'
}
fontFamily: { display: ['var(--font-inter-tight)'], sans: ['var(--font-archivo)'], mono: ['var(--font-jetbrains)'] }
```

Dark-first: `next-themes` com `attribute="data-theme"`, `defaultTheme="dark"`,
`suppressHydrationWarning` no `<html>` — o seletor `[data-theme="dark"]` já existe nos tokens.

## Adicionar um projeto novo

1. Crie a entrada em `data/projects.ts` seguindo o type `Project` (abaixo).
2. Coloque as imagens em `public/shots/<slug>/`.
3. Pronto. A listagem, a home (se `featured: true`), a navegação anterior/próximo,
   o sitemap e o OG dinâmico se atualizam sozinhos.

**Nenhuma mudança de layout é necessária.** Seções sem dados não renderizam:
`decisions`, `features`, `challenge`, `results` e `gallery` são opcionais e cada
bloco é envolvido por `{project.decisions?.length ? <…/> : null}`.

## Adicionar um post novo

1. Crie `content/posts/<slug>.mdx` com o frontmatter:

```mdx
---
title: "Título técnico e concreto"
excerpt: "Uma linha do que o leitor leva daqui."
date: 2026-03-12
updated: 2026-03-20      # opcional
tags: ["Supabase", "PostgreSQL"]
---
```

2. Escreva. O tempo de leitura é calculado (`lib/readingTime.ts`), o TOC é extraído dos
   `##` via rehype-slug + rehype-toc, e o post entra em `/blog`, no `sitemap.xml` e no `feed.xml`.

## Pontos de preenchimento (TODO)

- `data/social.ts` — WhatsApp, GitHub, Facebook, Instagram (LinkedIn já preenchido).
- `public/logos/` — logos reais das 5 empresas (hoje: placeholder com o nome).
- `public/shots/` — thumbnails, screenshots de feature e galeria de cada projeto.
- `public/me.jpg` — foto de /sobre.
- Métricas de Sorria Clínicas em `results` — só preencher com número real de Search Console/Lighthouse.
- Corpo completo dos 3 posts (hoje: intro + estrutura, marcado com TODO no texto).

## Qualidade

- `generateMetadata` por rota; OG dinâmico com `@vercel/og`; JSON-LD `Person` no layout raiz.
- Headings em hierarquia, foco visível, contraste AA, alvo de toque 44×44 nos ícones sociais.
- `prefers-reduced-motion` desliga o marquee e as entradas de seção.
- Marquee: array duplicado + `translateX(-50%)`, pausa no `hover`, logos em grayscale.
- Mobile-first testado em 360px.
