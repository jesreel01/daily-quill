import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Full name of the user', example: 'Jane Doe' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User password (minimum 8 characters)',
    example: 'pa55w0rd!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
