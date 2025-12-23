import { fetchWithAuth, API_URL } from "@/lib/api";

export interface CreateEntryPayload {
    content: string;
    wordCount: number;
    entryDate: string;
    status: 'DRAFT' | 'COMPLETED';
    promptId?: string;
}

export interface UpdateEntryPayload {
    content?: string;
    wordCount?: number;
    status?: 'DRAFT' | 'COMPLETED';
}

export interface Entry {
    id: string;
    userId: string;
    content: string;
    wordCount: number;
    entryDate: string;
    status: 'DRAFT' | 'COMPLETED';
    promptId?: string;
    createdAt: string;
    updatedAt: string;
}

export const writingService = {
    async createEntry(data: CreateEntryPayload): Promise<Entry> {
        return fetchWithAuth(`${API_URL}/writing/entries`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async getEntries(): Promise<Entry[]> {
        const response = await fetchWithAuth(`${API_URL}/writing/entries`);
        return Array.isArray(response) ? response : [];
    },

    async getEntryByDate(date: string): Promise<Entry | null> {
        try {
            return await fetchWithAuth(`${API_URL}/writing/entries/date/${date}`);
        } catch {
            return null;
        }
    },

    async updateEntry(id: string, data: UpdateEntryPayload): Promise<Entry> {
        return fetchWithAuth(`${API_URL}/writing/entries/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },
};
