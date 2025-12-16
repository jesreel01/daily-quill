# @daily-quill/database

Shared database package for Daily Quill monorepo.

## Features

- Drizzle ORM schema definitions
- Database client setup
- Type-safe database queries
- Database migrations and seeding

## Usage

```typescript
import { db, users, type User } from '@daily-quill/database'

const allUsers = await db.select().from(users)
```

## Scripts

- `pnpm db:generate` - Generate migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:seed` - Seed the database
