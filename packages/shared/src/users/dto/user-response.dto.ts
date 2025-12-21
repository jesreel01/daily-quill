import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: 'uuid-1234-5678',
    })
    @Expose()
    id: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'user@example.com',
    })
    @Expose()
    email: string;

    @ApiProperty({
        description: 'The full name of the user',
        example: 'John Doe',
    })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'The date and time when the user was created',
        example: '2023-01-01T00:00:00Z',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        description: 'The date and time when the user was last updated',
        example: '2023-01-01T00:00:00Z',
    })
    @Expose()
    updatedAt: Date;
}
