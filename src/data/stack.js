export const stackGroups = [
  { label: 'Front-end', items: ['React / React 19', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Vite'] },
  { label: 'Back-end e dados', items: ['PostgreSQL', 'Supabase (RLS, Auth, Storage, Edge Functions)', 'Neon', 'Server Actions', 'Resend'] },
  { label: 'No-code / low-code', items: ['Ferramentas low-code em projetos de cliente'] },
  { label: 'Ferramentas', items: ['Git / GitHub', 'Vercel', 'Figma', 'Google OAuth'] },
]

export const allStack = stackGroups.flatMap((g) => g.items)
