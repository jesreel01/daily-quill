import { Controller, Get, UseGuards } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/decorators/current-user.decorator';

@ApiTags('Gamification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('my-badges')
  @ApiOperation({ summary: 'Get badges earned by current user' })
  async getMyBadges(@CurrentUser() user: JwtPayload) {
    return this.gamificationService.getUserBadges(user.id);
  }

  @Get('badges')
  @ApiOperation({ summary: 'Get all available badges' })
  async getAllBadges() {
    return this.gamificationService.getAllBadges();
  }
}
