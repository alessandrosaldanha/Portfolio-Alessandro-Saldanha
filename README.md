# Portfolio Alessandro Saldanha

Portfolio pessoal de Alessandro Saldanha, construído com React 19 + Vite.

## Desenvolvimento

```bash
npm install
npm run dev       # servidor de desenvolvimento com HMR
npm run build     # build de produção
npm run preview   # preview do build de produção
npm run lint      # lint com Oxlint
```

## Estratégia de branches

- **`main`** — branch de produção. Só recebe merge de código já validado.
- **`hmg`** — branch de homologação, usada para validar mudanças antes de irem para produção.

Fluxo: features → `hmg` (homologação) → `main` (produção).

## Releases

Releases são geradas automaticamente pelo [release-please](https://github.com/googleapis/release-please) a cada push na `main`. A action lê os commits no padrão [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, etc.), abre um PR de release com o changelog e a versão atualizada em `package.json`, e cria a tag/release no GitHub quando esse PR é mergeado.

Configuração em [release-please-config.json](release-please-config.json) e workflow em [.github/workflows/release-please.yml](.github/workflows/release-please.yml).

## React Compiler

O React Compiler não está habilitado neste template pelo impacto em performance de dev e build. Para adicionar, veja [esta documentação](https://react.dev/learn/react-compiler/installation).

## Expandindo a configuração do Oxlint

Se estiver desenvolvendo uma aplicação de produção, recomendamos usar TypeScript com regras de lint type-aware habilitadas. Veja o [template TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para informações sobre como integrar TypeScript e as regras do Oxlint relacionadas a TypeScript neste projeto.
