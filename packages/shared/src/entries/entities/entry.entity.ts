export class Entry {
  id: string;
  userId: string;
  content: string;
  wordCount: number;
  entryDate: string; // ISO Date string
  status: 'DRAFT' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Entry>) {
    Object.assign(this, partial);
  }
}
