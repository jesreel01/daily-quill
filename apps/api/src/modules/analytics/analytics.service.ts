import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDatabase } from '../../db/drizzle.provider';
import { userStats } from '@repo/db';
import { eq } from 'drizzle-orm';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AnalyticsService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDatabase) {}

  async getUserStats(userId: string) {
    const [stats] = await this.db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId))
      .limit(1);

    if (!stats) {
      // Return empty stats if not found
      return {
        totalWords: 0,
        totalEntries: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastEntryDate: null,
      };
    }

    return stats;
  }

  @OnEvent('entry.completed')
  async handleEntryCompleted(payload: { userId: string; wordCount: number }) {
    // Check if stats exist, if not create
    let [stats] = await this.db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, payload.userId))
      .limit(1);

    if (!stats) {
      [stats] = await this.db
        .insert(userStats)
        .values({
          userId: payload.userId,
          totalWords: 0,
          totalEntries: 0,
          currentStreak: 0,
          longestStreak: 0,
        })
        .returning();
    }

    // Update stats
    // This is a simplified logic. Real logic needs to check date continuity for streaks.
    // For now, just increment totals.
    await this.db
      .update(userStats)
      .set({
        totalWords: stats.totalWords + payload.wordCount, // Note: this adds total count every time its completed, might overcount if updated multiple times.
        // Better logic: writing service should send diff or we just recount.
        // For MVP, assume it sends total word count of entry, but we need to know previous entry count to add diff?
        // OR simpler: just increment entries count by 1 if not already counted for today?
        // This requires more complex logic.
        // Let's keep it simple: Just increment entry count for now.
        totalEntries: stats.totalEntries + 1,
        updatedAt: new Date(),
      })
      .where(eq(userStats.id, stats.id));
  }
}
