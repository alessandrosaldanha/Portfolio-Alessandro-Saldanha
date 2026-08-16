# Front-End & Back-End Architecture & Directory Guidelines

## Core Principles

1. **Separation of Concerns**: Monorepo-style split at root level into `/frontend` and `/backend`.
2. **Co-location (Feature/Component Folder Structure)**: Place related files together (e.g., component, styles, tests, types) inside a dedicated folder for that entity.
3. **Naming Conventions**:
   - Folders and files for Components and Pages MUST use **PascalCase** (e.g., `ButtonHeader/ButtonHeader.tsx`).
   - Utilities, hooks, services, and generic configs MUST use **camelCase** (e.g., `useAuth.ts`, `apiClient.ts`).
   - Style files match the exact name of their parent component/page using `.css` (or `.module.css` / `.scss`).

---

## Directory Structure Model

```text
root/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Global static files (images, icons, fonts)
│   │   ├── components/         # Reusable UI components (Co-located)
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.css
│   │   │   └── Header/
│   │   │       ├── Header.tsx
│   │   │       └── Header.css
│   │   ├── pages/              # Views / Routes (Co-located)
│   │   │   ├── Home/
│   │   │   │   ├── Home.tsx
│   │   │   │   └── Home.css
│   │   │   └── Dashboard/
│   │   │       ├── Dashboard.tsx
│   │   │       └── Dashboard.css
│   │   ├── hooks/              # Custom React hooks (camelCase)
│   │   ├── services/           # API calls and integrations (camelCase)
│   │   ├── utils/              # Helper functions and formatters (camelCase)
│   │   ├── types/              # Global TypeScript interfaces/types
│   │   ├── styles/             # Global CSS/variables
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── models/             # Database models/entities
│   │   ├── routes/             # API routes definition
│   │   ├── middlewares/        # Express/Fastify middlewares
│   │   ├── config/             # Environment & DB configurations
│   │   ├── utils/              # Backend helper utilities
│   │   └── server.ts           # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── README.md                   # Root project documentation
```
