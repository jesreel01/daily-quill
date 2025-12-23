import { fetchWithAuth, API_URL } from "@/lib/api";

export interface Badge {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    criteriaType: 'STREAK_DAYS' | 'TOTAL_WORDS' | 'TOTAL_ENTRIES';
    criteriaValue: number;
    createdAt: string;
}

export interface UserBadge {
    badge: Badge;
    earnedAt: string;
}

export const gamificationService = {
    async getMyBadges(): Promise<UserBadge[]> {
        try {
            return await fetchWithAuth(`${API_URL}/gamification/my-badges`);
        } catch {
            return [];
        }
    },

    async getAllBadges(): Promise<Badge[]> {
        try {
            return await fetchWithAuth(`${API_URL}/gamification/badges`);
        } catch {
            return [];
        }
    },
};
