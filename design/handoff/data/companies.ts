export type Company = {
  name: string;
  /** TODO: substituir pelos SVGs reais em /public/logos/<file>.svg */
  logo: string;
  /** true = cliente atendido como desenvolvedor pela Orla.tech, sem vínculo direto */
  viaOrla: boolean;
};

export const companies: Company[] = [
  { name: 'Orla.tech',          logo: '/logos/orla.svg',    viaOrla: false },
  { name: 'ANBIMA',             logo: '/logos/anbima.svg',  viaOrla: true  },
  { name: 'RD Group',           logo: '/logos/rd.svg',      viaOrla: true  },
  { name: 'Conviva Hotelaria',  logo: '/logos/conviva.svg', viaOrla: true  },
  { name: 'Sorria Clínicas',    logo: '/logos/sorria.svg',  viaOrla: false },
];

export const marqueeDisclaimer =
  'ANBIMA, RD Group (Droga Raia/Drogasil) e Conviva Hotelaria são clientes atendidos por mim ' +
  'como desenvolvedor pela Orla.tech — não houve vínculo direto com essas empresas.';
