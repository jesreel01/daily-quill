// db/drizzle.provider.ts
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@repo/db/schema';

export const DRIZZLE_DB = Symbol('DRIZZLE_DB');
export type DrizzleDatabase = NodePgDatabase<typeof schema>;

export const drizzleProvider = {
  provide: DRIZZLE_DB,
  useFactory: (): DrizzleDatabase => {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    return drizzle(pool, { schema });
  },
};
