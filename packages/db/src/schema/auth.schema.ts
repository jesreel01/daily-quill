import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const auth = pgTable("auth", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id").notNull().references(() => users.id),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
