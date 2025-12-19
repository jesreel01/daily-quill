import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDatabase } from '../../db/drizzle.provider';
import { auth } from '@repo/db';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDatabase) {}

  async create(data: Auth) : Promise<Auth> {
    const [inserted] = await this.db.insert(auth).values({
      passwordHash: data.passwordHash,
      user_id: data.userId,
      id: data.id,
    }).returning();

    return new Auth(
      inserted.id,
      inserted.user_id,
      inserted.passwordHash,
    );
  }
}
