import { WritingEditor } from "@/components/writing-editor";
import { serverFetch, API_URL } from "@/lib/server-api";
import type { Entry } from "@/services/writing.service";

type Props = {
    searchParams: Promise<{ date?: string }>;
};

export default async function WritePage({ searchParams }: Props) {
    const params = await searchParams;
    const today = new Date().toISOString().split('T')[0];
    const targetDate = params.date || today;

    const dateFormatted = new Date(targetDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const initialEntry = await serverFetch<Entry>(`${API_URL}/writing/entries/date/${targetDate}`);

    return (
        <WritingEditor
            key={targetDate}
            initialEntry={initialEntry}
            todayDate={targetDate}
            todayFormatted={dateFormatted}
            goal={500}
        />
    );
}