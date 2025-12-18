export class UsersReposistory {}
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_DB } from '../../db/drizzle.provider';
import { users } from '@repo/db';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: any,
  ) {}

  async create(data: { email: string; name: string }) {
    return this.db.insert(users).values(data).returning();
  }

  async findByEmail(email: string) {
    return this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
  }
}
