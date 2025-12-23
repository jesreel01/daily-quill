import { pgTable, uuid, boolean, time, timestamp, varchar, pgEnum, text } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const notificationTypeEnum = pgEnum('notification_type', ['REMINDER', 'ACHIEVEMENT', 'SYSTEM']);

export const notificationPreferences = pgTable('notification_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull().unique(),
  emailEnabled: boolean('email_enabled').default(true),
  reminderTime: time('reminder_time'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  type: notificationTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message'),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').defaultNow(),
});
