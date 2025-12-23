import { pgTable, uuid, text, date, varchar, timestamp } from 'drizzle-orm/pg-core';

export const dailyPrompts = pgTable('daily_prompts', {
  id: uuid('id').defaultRandom().primaryKey(),
  promptText: text('prompt_text').notNull(),
  scheduledDate: date('scheduled_date').unique(),
  category: varchar('category', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
});
