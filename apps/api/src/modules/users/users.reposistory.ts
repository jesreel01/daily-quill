import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_DB, type DrizzleDatabase } from '../../db/drizzle.provider';
import { users } from '@repo/db';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDatabase) {}

  async create(data: { email: string; name: string }) {
    return this.db.insert(users).values(data).returning();
  }

  async findAll() {
    return this.db.select().from(users);
  }

  async findById(id: string) {
    return this.db.select().from(users).where(eq(users.id, id)).limit(1);
  }

  async findByEmail(email: string) {
    return this.db.select().from(users).where(eq(users.email, email)).limit(1);
  }

  async update(id: string, data: Partial<{ email: string; name: string }>) {
    return this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
  }

  async remove(id: string) {
    return this.db.delete(users).where(eq(users.id, id)).returning();
  }
}
