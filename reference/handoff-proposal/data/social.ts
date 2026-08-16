export type Social = {
  key: 'whatsapp' | 'linkedin' | 'github' | 'facebook' | 'instagram';
  label: string;
  href: string;
  /** aria-label descritivo — obrigatório */
  aria: string;
};

const waMessage = encodeURIComponent(
  'Olá Alessandro, vi seu portfólio e gostaria de conversar sobre...'
);

export const socials: Social[] = [
  // TODO: trocar 55TODO pelo número com DDI+DDD, ex.: 5582999998888
  { key: 'whatsapp',  label: 'WhatsApp',  href: `https://wa.me/55TODO?text=${waMessage}`,
    aria: 'Conversar com Alessandro Saldanha no WhatsApp' },
  { key: 'linkedin',  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/alessandro-saldanha-0868b8185/',
    aria: 'Perfil de Alessandro Saldanha no LinkedIn' },
  // TODO: preencher
  { key: 'github',    label: 'GitHub',    href: 'https://github.com/TODO',
    aria: 'Perfil de Alessandro Saldanha no GitHub' },
  { key: 'facebook',  label: 'Facebook',  href: 'https://facebook.com/TODO',
    aria: 'Perfil de Alessandro Saldanha no Facebook' },
  { key: 'instagram', label: 'Instagram', href: 'https://instagram.com/TODO',
    aria: 'Perfil de Alessandro Saldanha no Instagram' },
];

// Regras do componente SocialLinks (header opcional, footer, /contato):
// target="_blank" rel="noopener noreferrer", alvo mínimo 44x44px, ícone SVG lucide/simple-icons.
