import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class LoginResponseDto {
    @ApiProperty({
        description: 'The JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    @Expose()
    accessToken: string;

    @ApiProperty({
        description: 'The JWT refresh token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    @Expose()
    refreshToken: string;

    @ApiProperty({
        description: 'The authenticated user details',
        type: UserResponseDto,
    })
    @Expose()
    @Type(() => UserResponseDto)
    user: UserResponseDto;
}
