const waMessage = encodeURIComponent('Olá Alessandro, vi seu portfólio e gostaria de conversar sobre...')

export const socials = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    hint: '+55 82 98127-3619',
    href: `https://wa.me/5582981273619?text=${waMessage}`,
    aria: 'Conversar com Alessandro Saldanha no WhatsApp',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    hint: '/alessandro-saldanha',
    href: 'https://www.linkedin.com/in/alessandro-saldanha-0868b8185/',
    aria: 'Perfil de Alessandro Saldanha no LinkedIn',
  },
  {
    key: 'github',
    label: 'GitHub',
    hint: '/alessandrosaldanha',
    href: 'https://github.com/alessandrosaldanha',
    aria: 'Perfil de Alessandro Saldanha no GitHub',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    hint: '/alessandro.saldanha.2025',
    href: 'https://www.facebook.com/alessandro.saldanha.2025',
    aria: 'Perfil de Alessandro Saldanha no Facebook',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    hint: '/alessandrosaldanha.as',
    href: 'https://www.instagram.com/alessandrosaldanha.as',
    aria: 'Perfil de Alessandro Saldanha no Instagram',
  },
]

export const waLink = socials[0].href
