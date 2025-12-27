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
            const response = await fetchWithAuth(`${API_URL}/gamification/my-badges`);
            return response?.data ?? (Array.isArray(response) ? response : []);
        } catch {
            return [];
        }
    },

    async getAllBadges(): Promise<Badge[]> {
        try {
            const response = await fetchWithAuth(`${API_URL}/gamification/badges`);
            return response?.data ?? (Array.isArray(response) ? response : []);
        } catch {
            return [];
        }
    },
};
