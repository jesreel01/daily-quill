import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, LoginResponseDto, RegisterResponseDto } from '@repo/shared';
import { plainToInstance } from 'class-transformer';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    const response = await this.authService.login(dto);
    return plainToInstance(LoginResponseDto, response);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registration' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, type: RegisterResponseDto })
  async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    const response = await this.authService.register(dto);
    return plainToInstance(RegisterResponseDto, response);
  }
}
