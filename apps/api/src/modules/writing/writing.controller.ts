import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WritingService } from './writing.service';
import { CreateEntryDto, UpdateEntryDto, EntryResponseDto } from '@repo/shared';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/decorators/current-user.decorator';

@ApiTags('Writing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Post('entries')
  @ApiOperation({ summary: 'Create or update a daily entry' })
  @ApiResponse({ status: 201, type: EntryResponseDto })
  create(
    @CurrentUser() user: JwtPayload,
    @Body() createEntryDto: CreateEntryDto,
  ) {
    return this.writingService.create(user.id, createEntryDto);
  }

  @Get('entries')
  @ApiOperation({ summary: 'Get all entries for current user' })
  @ApiResponse({ status: 200, type: [EntryResponseDto] })
  findAll(@CurrentUser() user: JwtPayload) {
    return this.writingService.findAll(user.id);
  }

  @Get('entries/date/:date')
  @ApiOperation({ summary: 'Get entry by date (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, type: EntryResponseDto })
  findByDate(@CurrentUser() user: JwtPayload, @Param('date') date: string) {
    return this.writingService.findByDate(date, user.id);
  }

  @Patch('entries/:id')
  @ApiOperation({ summary: 'Update an entry' })
  @ApiResponse({ status: 200, type: EntryResponseDto })
  update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    return this.writingService.update(id, user.id, updateEntryDto);
  }
}
