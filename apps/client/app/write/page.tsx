import { WritingEditor } from "@/components/writing-editor";
import { serverFetch, API_URL } from "@/lib/server-api";
import type { Entry } from "@/services/writing.service";

export default async function WritePage() {
    const today = new Date().toISOString().split('T')[0];
    const todayFormatted = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const initialEntry = await serverFetch<Entry>(`${API_URL}/writing/entries/date/${today}`);

    return (
        <WritingEditor
            initialEntry={initialEntry}
            todayDate={today}
            todayFormatted={todayFormatted}
            goal={500}
        />
    );
}