import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const DRIZZLE_DB = Symbol('DRIZZLE_DB');

export const drizzleProvider = {
  provide: DRIZZLE_DB,
  
  useFactory: async () => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    return drizzle(pool);
  },
};
