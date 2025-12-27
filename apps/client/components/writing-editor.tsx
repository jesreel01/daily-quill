"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import {
    Cloud,
    Maximize2,
    Minimize2,
    Loader2,
    Check,
    ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { writingService, type Entry, type CreateEntryPayload, type UpdateEntryPayload } from "@/services/writing.service";

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface WritingEditorProps {
    initialEntry: Entry | null;
    todayDate: string;
    todayFormatted: string;
    goal?: number;
}

export function WritingEditor({ 
    initialEntry, 
    todayDate, 
    todayFormatted,
    goal = 500 
}: WritingEditorProps) {
    const [content, setContent] = useState(initialEntry?.content || "");
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
    const [currentEntry, setCurrentEntry] = useState<Entry | null>(initialEntry);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastSavedContentRef = useRef<string>(initialEntry?.content || "");

    const wordCount = useMemo(() => {
        return content.trim() ? content.trim().split(/\s+/).length : 0;
    }, [content]);

    const contentRef = useRef(content);
    const currentEntryRef = useRef(currentEntry);
    const isSavingRef = useRef(false);

    useEffect(() => {
        contentRef.current = content;
    }, [content]);

    useEffect(() => {
        currentEntryRef.current = currentEntry;
    }, [currentEntry]);

    const performSave = useCallback(async (contentToSave: string, entryToUpdate: Entry | null) => {
        if (!contentToSave.trim() || contentToSave === lastSavedContentRef.current || isSavingRef.current) return;
        
        isSavingRef.current = true;
        setSaveStatus('saving');
        const words = contentToSave.trim().split(/\s+/).length;
        const isCompleted = words >= goal;

        try {
            if (entryToUpdate?.id) {
                const updateData: UpdateEntryPayload = {
                    content: contentToSave,
                    wordCount: words,
                    status: isCompleted ? 'COMPLETED' : 'DRAFT',
                };
                const updated = await writingService.updateEntry(entryToUpdate.id, updateData);
                setCurrentEntry(updated);
                lastSavedContentRef.current = contentToSave;
                setSaveStatus('saved');
            } else {
                const createData: CreateEntryPayload = {
                    content: contentToSave,
                    wordCount: words,
                    entryDate: todayDate,
                    status: isCompleted ? 'COMPLETED' : 'DRAFT',
                };
                const created = await writingService.createEntry(createData);
                setCurrentEntry(created);
                lastSavedContentRef.current = contentToSave;
                setSaveStatus('saved');
            }
        } catch (error) {
            console.error("Save failed:", error);
            setSaveStatus('error');
        } finally {
            isSavingRef.current = false;
             setTimeout(() => setSaveStatus('idle'), 2000);
        }
    }, [goal, todayDate]);

    const saveEntry = useCallback((newContent: string) => {
        performSave(newContent, currentEntryRef.current);
    }, [performSave]);

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            saveEntry(newContent);
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
            if (contentRef.current !== lastSavedContentRef.current) {
                performSave(contentRef.current, currentEntryRef.current);
            }
        };
    }, [performSave]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
             if (content !== lastSavedContentRef.current) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [content]);

    const progress = Math.min((wordCount / goal) * 100, 100);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [content]);

    return (
        <div className="h-[calc(100vh-theme(spacing.16))] md:h-screen flex flex-col bg-background relative overflow-hidden">
            <Link
                href="/dashboard"
                className={cn(
                    "fixed top-4 left-4 z-30 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300",
                    isFocusMode ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
            >
                <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className={cn(
                "fixed bottom-6 right-8 z-30 max-w-[240px] hidden xl:block transition-all duration-300",
                 isFocusMode ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
                 <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-3 text-xs shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-primary font-medium mb-1">Daily Prompt</p>
                    <p className="text-muted-foreground italic leading-relaxed">
                        &quot;What is one thing you are grateful for today, and why does it matter to you right now?&quot;
                    </p>
                </div>
            </div>

            <main className="flex-1 flex flex-col relative bg-background overflow-hidden">
                <header
                    className={cn(
                        "w-full max-w-4xl mx-auto pt-8 pb-4 px-6 md:px-12 flex flex-col gap-6 shrink-0 z-10 transition-all duration-500 bg-background/80 backdrop-blur-sm sticky top-0",
                        isFocusMode ? "opacity-0 -translate-y-4 pointer-events-none absolute left-0 right-0" : "opacity-100 translate-y-0"
                    )}
                >
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-foreground tracking-tight text-3xl md:text-4xl font-bold leading-tight">{todayFormatted}</p>
                            <p className="text-muted-foreground text-sm font-medium">Daily Writing Goal</p>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[200px] flex-1 md:flex-none">
                            <div className="flex justify-between items-end text-xs font-medium">
                                <span className="text-primary">{Math.round(progress)}%</span>
                                <span className="text-muted-foreground">{wordCount} / {goal} words</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full shadow-[0_0_10px_rgba(22,163,74,0.3)] transition-all duration-500 ease-out",
                                        progress >= 100 ? "bg-green-500" : "bg-primary"
                                    )}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 relative w-full overflow-y-auto">
                    <div className={cn(
                        "w-full max-w-4xl mx-auto px-6 md:px-12 pb-32 flex flex-col transition-all duration-500 pt-8",
                        isFocusMode ? "pt-12" : "pt-8"
                    )}>

                        <textarea
                            ref={textareaRef}
                            className="w-full bg-transparent border-none resize-none focus:ring-0 p-0 text-lg md:text-xl leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none overflow-hidden min-h-[50vh]"
                            placeholder="What's on your mind today? Start writing..."
                            spellCheck="false"
                            value={content}
                            onChange={(e) => handleContentChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="absolute bottom-6 left-0 right-0 pointer-events-none px-6 md:px-12 flex justify-center md:justify-end max-w-4xl mx-auto w-full z-20">
                    <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border rounded-full px-4 py-2 flex items-center gap-4 shadow-sm">
                        <div className="flex items-center gap-2 border-r border-border pr-4">
                            {saveStatus === 'saving' && (
                                <>
                                    <Loader2 className="text-muted-foreground w-[18px] h-[18px] animate-spin" />
                                    <span className="text-xs font-medium text-muted-foreground">Saving...</span>
                                </>
                            )}
                            {saveStatus === 'saved' && (
                                <>
                                    <Check className="text-green-500 w-[18px] h-[18px]" />
                                    <span className="text-xs font-medium text-green-500">Saved</span>
                                </>
                            )}
                            {(saveStatus === 'idle' || saveStatus === 'error') && (
                                <>
                                    <Cloud className={cn("w-[18px] h-[18px]", saveStatus === 'error' ? "text-destructive" : "text-primary")} />
                                    <span className={cn("text-xs font-medium", saveStatus === 'error' ? "text-destructive" : "text-muted-foreground")}>
                                        {saveStatus === 'error' ? 'Error' : (currentEntry ? 'Saved' : 'Draft')}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground">{wordCount} words</span>
                            <div className={cn("w-1.5 h-1.5 rounded-full bg-primary", (content?.length || 0) > 0 ? "animate-pulse" : "")}></div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 hidden md:block z-20">
                    <button
                        onClick={() => setIsFocusMode(!isFocusMode)}
                        className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-secondary"
                        title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
                    >
                        {isFocusMode ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                    </button>
                </div>
            </main>
        </div>
    );
}
