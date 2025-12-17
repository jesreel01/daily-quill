import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: '__drizzle_migrations',
    schema: 'drizzle',
  },
});
