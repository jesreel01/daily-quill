import { pgTable, uuid, integer, date, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const userStats = pgTable('user_stats', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  totalWords: integer('total_words').default(0).notNull(),
  totalEntries: integer('total_entries').default(0).notNull(),
  currentStreak: integer('current_streak').default(0).notNull(),
  longestStreak: integer('longest_streak').default(0).notNull(),
  lastEntryDate: date('last_entry_date'),
  updatedAt: timestamp('updated_at').defaultNow(),
});
