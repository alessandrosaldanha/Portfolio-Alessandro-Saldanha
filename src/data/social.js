const waMessage = encodeURIComponent('Olá Alessandro, vi seu portfólio e gostaria de conversar sobre...')

// TODO: preencher os campos marcados abaixo com os dados reais.
export const socials = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    short: 'WA',
    hint: 'TODO: número',
    // TODO: trocar 55TODO pelo número com DDI+DDD, ex.: 5582999998888
    href: `https://wa.me/55TODO?text=${waMessage}`,
    aria: 'Conversar com Alessandro Saldanha no WhatsApp',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    short: 'IN',
    hint: '/alessandro-saldanha',
    href: 'https://www.linkedin.com/in/alessandro-saldanha-0868b8185/',
    aria: 'Perfil de Alessandro Saldanha no LinkedIn',
  },
  {
    key: 'github',
    label: 'GitHub',
    short: 'GH',
    hint: 'TODO: usuário',
    href: 'https://github.com/TODO', // TODO: preencher
    aria: 'Perfil de Alessandro Saldanha no GitHub',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    short: 'FB',
    hint: 'TODO: perfil',
    href: 'https://facebook.com/TODO', // TODO: preencher
    aria: 'Perfil de Alessandro Saldanha no Facebook',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    short: 'IG',
    hint: 'TODO: perfil',
    href: 'https://instagram.com/TODO', // TODO: preencher
    aria: 'Perfil de Alessandro Saldanha no Instagram',
  },
]

export const waLink = socials[0].href
