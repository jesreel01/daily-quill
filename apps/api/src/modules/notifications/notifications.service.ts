import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDatabase } from '../../db/drizzle.provider';
import { notifications } from '@repo/db';
import { eq, desc } from 'drizzle-orm';

@Injectable()
export class NotificationsService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDatabase) {}

  async getUserNotifications(userId: string) {
    return this.db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }
}
