import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDatabase } from '../../db/drizzle.provider';
import { badges, userBadges } from '@repo/db';
import { eq, desc, and } from 'drizzle-orm';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class GamificationService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDatabase) {}

  async getUserBadges(userId: string) {
    // Join badges with userBadges
    const result = await this.db
      .select({
        badgeId: badges.id,
        name: badges.name,
        description: badges.description,
        icon: badges.icon,
        earnedAt: userBadges.earnedAt,
      })
      .from(userBadges)
      .innerJoin(badges, eq(userBadges.badgeId, badges.id))
      .where(eq(userBadges.userId, userId))
      .orderBy(desc(userBadges.earnedAt));

    return result;
  }

  async getAllBadges() {
    return this.db.select().from(badges);
  }

  @OnEvent('entry.completed')
  async handleEntryCompleted(payload: { userId: string; wordCount: number }) {
    // Logic to check and award badges
    // For MVP, let's award a "First Entry" badge if it's their first time.

    // 1. Check if they already have "First Entry" badge (assuming ID 1 or slug 'first-entry')
    // We need to know badge IDs. Let's assume we look up by name.
    const [firstEntryBadge] = await this.db
      .select()
      .from(badges)
      .where(eq(badges.slug, 'first-entry'))
      .limit(1);

    if (firstEntryBadge) {
      const [hasBadge] = await this.db
        .select()
        .from(userBadges)
        .where(
          and(
            eq(userBadges.userId, payload.userId),
            eq(userBadges.badgeId, firstEntryBadge.id),
          ),
        )
        .limit(1);

      if (!hasBadge) {
        await this.db.insert(userBadges).values({
          userId: payload.userId,
          badgeId: firstEntryBadge.id,
          earnedAt: new Date(),
        });
        // We could emit another event "badge.earned" here
      }
    }

    // Check for word count badges, etc.
  }
}
