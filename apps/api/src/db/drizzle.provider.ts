// db/drizzle.provider.ts
import { auth, users } from '@repo/db';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const DRIZZLE_DB = Symbol('DRIZZLE_DB');
export type DrizzleDatabase = ReturnType<typeof drizzle>;

export const drizzleProvider = {
  provide: DRIZZLE_DB,
  useFactory: async (): Promise<DrizzleDatabase> => {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    return drizzle(pool, { schema: { users, auth } });
  },
};
