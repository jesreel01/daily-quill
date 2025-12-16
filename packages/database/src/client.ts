import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.js'
import { getDatabaseUrl } from './config.js'

const pool = new Pool({
  connectionString: getDatabaseUrl(),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

console.log(`Connecting to database using DATABASE_URL`)

export const db = drizzle({ client: pool, schema })

export type DrizzleDB = typeof db
