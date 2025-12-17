import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DRIZZLE_DB = Symbol('DRIZZLE_DB');

export function createDatabase(connectionString: string) {
  const pool = new Pool({
    connectionString,
  });

  return drizzle(pool, { schema });
}

export type Database = ReturnType<typeof createDatabase>;

export * from './schema';
