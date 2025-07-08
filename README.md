# NLW Agents

Projeto desenvolvido durante o evento NLW 20 da Rocketseat.

## Tecnologias Utilizadas

### Backend (server)
- Node.js + TypeScript
- Fastify
- Drizzle ORM
- PostgreSQL
- Zod

### Frontend (web)
- React
- Vite
- TailwindCSS
- React Query
- React Router DOM
- Lucide React

### Padrões de Projeto
- Monorepo: separação entre `server` (backend) e `web` (frontend)
- TypeScript em todo o projeto
- Componentização no frontend
- Validação de ambiente com Zod
- Padronização de código com Biome e Ultracite

## Setup e Configuração

### Pré-requisitos
- Node.js 18+
- Docker (opcional, para banco de dados)
- PostgreSQL

### Backend
1. Copie o arquivo `.env.example` para `.env` e configure a variável `DATABASE_URL`.
2. Suba o banco de dados com Docker (opcional):
   ```sh
   cd server
   docker compose up -d
   ```
3. Instale as dependências:
   ```sh
   cd server
   npm install
   ```
4. Rode as migrações e seeds:
   ```sh
   npm run db:seed
   ```
5. Inicie o servidor:
   ```sh
   npm run dev
   ```

### Frontend
1. Instale as dependências:
   ```sh
   cd web
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
3. Acesse http://localhost:5173

---

Projeto desenvolvido durante o **NLW 20** da [Rocketseat](https://rocketseat.com.br/).
