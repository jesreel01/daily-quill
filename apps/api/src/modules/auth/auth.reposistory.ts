import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_DB, type DrizzleDatabase } from '../../db/drizzle.provider';
import { auth } from '@repo/db';
import { Auth } from '@repo/shared';

@Injectable()
export class AuthRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDatabase) { }

  async findByUserId(userId: string): Promise<Auth | null> {
    const [found] = await this.db
      .select()
      .from(auth)
      .where(eq(auth.user_id, userId))
      .limit(1);

    if (!found) return null;

    return new Auth({
      id: found.id,
      userId: found.user_id,
      passwordHash: found.passwordHash,
    });
  }

  async create(data: Auth): Promise<Auth> {
    const values: any = {
      passwordHash: data.passwordHash,
      user_id: data.userId,
    };

    if (data.id) {
      values.id = data.id;
    }

    const [inserted] = await this.db.insert(auth).values(values).returning();

    return new Auth({
      id: inserted.id,
      userId: inserted.user_id,
      passwordHash: inserted.passwordHash,
    });
  }
}
