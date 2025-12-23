import { pgTable, uuid, varchar, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const criteriaTypeEnum = pgEnum('criteria_type', ['STREAK_DAYS', 'TOTAL_WORDS', 'TOTAL_ENTRIES']);

export const badges = pgTable('badges', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 255 }),
  criteriaType: criteriaTypeEnum('criteria_type').notNull(),
  criteriaValue: integer('criteria_value').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userBadges = pgTable('user_badges', {
  userId: uuid('user_id').references(() => users.id).notNull(),
  badgeId: uuid('badge_id').references(() => badges.id).notNull(),
  earnedAt: timestamp('earned_at').defaultNow(),
});
