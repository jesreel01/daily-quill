# @repo/db

Shared database package for the Daily Quill monorepo. Provides Drizzle ORM configuration, database schemas, and migration tools.

## Setup

### Environment Variables

Set `DATABASE_URL` in your `.env` file:

```
DATABASE_URL=postgresql://user:password@host:port/dbname
```

## Schemas

All database schemas are defined in `src/schema/`. Current schemas:

- **users** - User accounts and authentication

## Usage

### In NestJS Applications

```typescript
import { Module } from '@nestjs/common';
import { createDatabase, DRIZZLE_DB } from '@repo/db';

@Module({
  providers: [
    {
      provide: DRIZZLE_DB,
      useFactory: async () => {
        return createDatabase(process.env.DATABASE_URL!);
      },
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DatabaseModule {}
```

### Querying

```typescript
import { Inject } from '@nestjs/common';
import { DRIZZLE_DB, Database, users } from '@repo/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE_DB) private db: Database) {}

  async findById(id: string) {
    return this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }
}
```

## Migrations

### Generate Migration

```bash
pnpm db:generate --name=<migration_name>
```

### Run Migrations

```bash
pnpm db:migrate
```

### Push Schema to Database

```bash
pnpm db:push
```

### Pull Schema from Database

```bash
pnpm db:pull
```

## Structure

```
packages/db/
├── src/
│   ├── schema/          # Database schemas
│   │   ├── user.schema.ts
│   │   └── index.ts
│   └── index.ts         # Main exports
├── drizzle/             # Generated migrations
├── drizzle.config.ts    # Drizzle Kit configuration
├── package.json
└── tsconfig.json
```
