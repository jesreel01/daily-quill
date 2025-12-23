import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EntryResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  wordCount: number;

  @ApiProperty()
  @Expose()
  entryDate: string;

  @ApiProperty({ enum: ['DRAFT', 'COMPLETED'] })
  @Expose()
  status: 'DRAFT' | 'COMPLETED';

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
