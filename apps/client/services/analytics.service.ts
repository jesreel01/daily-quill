import { fetchWithAuth, API_URL } from "@/lib/api";

export interface UserStats {
    id: string;
    userId: string;
    totalWords: number;
    totalEntries: number;
    currentStreak: number;
    longestStreak: number;
    lastEntryDate: string | null;
    updatedAt: string;
}

export const analyticsService = {
    async getStats(): Promise<UserStats | null> {
        try {
            const response = await fetchWithAuth(`${API_URL}/analytics/stats`);
            return response?.data ?? response;
        } catch {
            return null;
        }
    },
};
