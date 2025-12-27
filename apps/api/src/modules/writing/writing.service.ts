import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateEntryDto, UpdateEntryDto, EntryResponseDto } from '@repo/shared';
import { DRIZZLE_DB, type DrizzleDatabase } from '../../db/drizzle.provider';
import { entries } from '@repo/db';
import { eq, and, desc } from 'drizzle-orm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class WritingService {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: DrizzleDatabase,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(
    userId: string,
    createEntryDto: CreateEntryDto,
  ): Promise<EntryResponseDto> {
    const today = createEntryDto.entryDate;

    // Check if entry already exists for this date
    const [existing] = await this.db
      .select()
      .from(entries)
      .where(and(eq(entries.userId, userId), eq(entries.entryDate, today)))
      .limit(1);

    if (existing) {
      return this.update(existing.id, userId, createEntryDto);
    }

    const [inserted] = await this.db
      .insert(entries)
      .values({
        userId,
        content: createEntryDto.content ?? '',
        wordCount: createEntryDto.wordCount ?? 0,
        entryDate: createEntryDto.entryDate,
        status: createEntryDto.status ?? 'DRAFT',
      })
      .returning();

    if (inserted.status === 'COMPLETED') {
      this.eventEmitter.emit('entry.completed', {
        userId: inserted.userId,
        entryId: inserted.id,
        wordCount: inserted.wordCount,
        entryDate: inserted.entryDate,
      });
    }

    return this.mapToDto(inserted);
  }

  async findAll(userId: string): Promise<EntryResponseDto[]> {
    const foundEntries = await this.db
      .select()
      .from(entries)
      .where(eq(entries.userId, userId))
      .orderBy(entries.entryDate);

    return foundEntries.map(this.mapToDto);
  }

  async findOne(id: string, userId: string): Promise<EntryResponseDto> {
    const [found] = await this.db
      .select()
      .from(entries)
      .where(and(eq(entries.id, id), eq(entries.userId, userId)))
      .limit(1);

    if (!found) {
      throw new NotFoundException(`Entry not found`);
    }

    return this.mapToDto(found);
  }

  async findByDate(date: string, userId: string): Promise<EntryResponseDto> {
    const [found] = await this.db
      .select()
      .from(entries)
      .where(and(eq(entries.entryDate, date), eq(entries.userId, userId)))
      .limit(1);

    if (!found) {
      throw new NotFoundException(`Entry for date ${date} not found`);
    }

    return this.mapToDto(found);
  }

  async update(
    id: string,
    userId: string,
    updateEntryDto: UpdateEntryDto,
  ): Promise<EntryResponseDto> {
    const [updated] = await this.db
      .update(entries)
      .set({
        ...updateEntryDto,
        updatedAt: new Date(),
      })
      .where(and(eq(entries.id, id), eq(entries.userId, userId)))
      .returning();

    if (!updated) {
      throw new NotFoundException(`Entry not found`);
    }

    if (updated.status === 'COMPLETED') {
      this.eventEmitter.emit('entry.completed', {
        userId: updated.userId,
        entryId: updated.id,
        wordCount: updated.wordCount,
        entryDate: updated.entryDate,
      });
    }

    return this.mapToDto(updated);
  }

  // Helper
  private mapToDto(
    this: void,
    record: typeof entries.$inferSelect,
  ): EntryResponseDto {
    return {
      id: record.id,
      userId: record.userId,
      content: record.content ?? '',
      wordCount: record.wordCount ?? 0,
      entryDate: record.entryDate,
      status: record.status ?? 'DRAFT',
      createdAt: record.createdAt || new Date(),
      updatedAt: record.updatedAt || new Date(),
    };
  }

  async findLatest(userId: string): Promise<EntryResponseDto | null> {
    const [latest] = await this.db
      .select()
      .from(entries)
      .where(eq(entries.userId, userId))
      .orderBy(desc(entries.entryDate))
      .limit(1);

    if (!latest) {
      return null;
    }

    return this.mapToDto(latest);
  }
}
