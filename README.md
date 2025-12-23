# Daily Quill 🖋️

Daily Quill is a premium, distraction-free journaling application designed to help you build a consistent writing habit. With a focus on aesthetics, fluid interactions, and data privacy, it provides the perfect environment for your daily reflections.

## ✨ Features

- **Distraction-Free Editor**: A minimalist writing interface with a "Focus Mode" to help you stay in the flow.
- **Writing Activity Insights**: Track your consistency with an interactive writing activity heat map and streak tracking.
- **Premium Aesthetics**: Built with a sleek Emerald-themed UI, featuring glassmorphism, smooth transitions, and a responsive layout.
- **One Entry Per Day**: Encourages focused reflection by allowing exactly one entry for each calendar day.
- **Dark Mode**: Fully supported dark mode for comfortable writing sessions at any time of day.
- **Secure Architecture**: Robust authentication and data storage using industry-standard practices.

## 🚀 Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

### Backend

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Auth**: [Passport.js](https://www.passportjs.org/) (JWT Strategy)

### Monorepo & Tooling

- **Build System**: [Turbo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## 📂 Project Structure

```text
/
├── apps/
│   ├── api/        # NestJS Backend
│   └── client/     # Next.js Frontend
├── packages/
│   ├── db/         # Database schema, migrations, and Drizzle client
│   ├── shared/     # Common TypeScript types and utilities
│   ├── ui/         # Reusable UI component library
│   ├── eslint-config/
│   └── typescript-config/
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v9+)
- [PostgreSQL](https://www.postgresql.org/) instance

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/daily-quill.git
   cd daily-quill
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Environment Setup**:
   Copy the example environment files and fill in your credentials.
   - `apps/api/.env`
   - `apps/client/.env`

4. **Initialize the Database**:
   ```bash
   pnpm --filter @repo/db push
   ```

### Development

Start the development servers for all applications:

```bash
pnpm dev
```

The applications will be available at:

- Frontend: `http://localhost:3000`
- API: `http://localhost:3001`
- Swagger Docs: `http://localhost:3001/api/docs`

## 📜 Scripts

- `pnpm build`: Build all applications and packages.
- `pnpm dev`: Start all applications in development mode.
- `pnpm lint`: Run ESLint across the entire monorepo.
- `pnpm format`: Format all files using Prettier.
- `pnpm check-types`: Run TypeScript compiler check.
