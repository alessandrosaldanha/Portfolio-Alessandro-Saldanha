import anbimaLogo from '../assets/logos/anbima.svg'
import drogasilLogo from '../assets/logos/drogasil.svg'
import convivaLogo from '../assets/logos/conviva-hotelaria.svg'
import wesafetyLogo from '../assets/logos/wesafety.webp'

// logoHeight is a per-logo optical size override (px), not the raw asset height.
// Logos don't share the same amount of internal whitespace in their bounding box,
// so equal pixel height reads as unequal visual weight — each value here was
// tuned against the others until they matched the marquee text's weight.
// See docs/CONTEUDO.md, "Marquee de clientes" for the calibration notes.
// logoWidth/logoHeightPx are the source file's real intrinsic pixel size — passed as
// the <img> width/height attributes so the browser reserves the right aspect ratio
// before the file downloads (no layout shift), independent of the rendered logoHeight.
export const orlaProjects = [
  { name: 'ANBIMA', logo: anbimaLogo, logoHeight: 26, logoWidth: 204, logoHeightPx: 101 },
  { name: 'Droga Raia' },
  { name: 'Drogasil', logo: drogasilLogo, logoHeight: 20, logoWidth: 199, logoHeightPx: 49 },
  { name: 'Conviva Hotelaria', logo: convivaLogo, logoHeight: 20, logoWidth: 160, logoHeightPx: 32 },
  { name: 'Papelzinho' },
  { name: 'WeSafety', logo: wesafetyLogo, logoHeight: 30, logoWidth: 2150, logoHeightPx: 982 },
  { name: 'FixInfra' },
]
