import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntryDto {
  @ApiProperty({ example: 'Today I wrote about...' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 150 })
  @IsInt()
  @IsOptional()
  wordCount?: number;

  @ApiProperty({ example: '2025-12-23' })
  @IsDateString()
  @IsNotEmpty()
  entryDate: string;

  @ApiProperty({ enum: ['DRAFT', 'COMPLETED'], example: 'DRAFT' })
  @IsEnum(['DRAFT', 'COMPLETED'])
  @IsOptional()
  status?: 'DRAFT' | 'COMPLETED';
}
