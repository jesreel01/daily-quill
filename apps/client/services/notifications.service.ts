import { fetchWithAuth, API_URL } from "@/lib/api";

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'STREAK_REMINDER' | 'BADGE_EARNED' | 'GOAL_REACHED' | 'SYSTEM';
    isRead: boolean;
    createdAt: string;
}

export const notificationsService = {
    async getNotifications(): Promise<Notification[]> {
        try {
            return await fetchWithAuth(`${API_URL}/notifications`);
        } catch {
            return [];
        }
    },
};
