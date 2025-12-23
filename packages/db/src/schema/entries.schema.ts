import { pgTable, uuid, text, integer, date, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const entryStatusEnum = pgEnum('entry_status', ['DRAFT', 'COMPLETED']);

export const entries = pgTable('entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  content: text('content').default(''),
  wordCount: integer('word_count').default(0),
  entryDate: date('entry_date').notNull(),
  status: entryStatusEnum('status').default('DRAFT'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
