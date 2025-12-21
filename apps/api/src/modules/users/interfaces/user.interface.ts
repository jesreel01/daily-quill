import { CreateUserDto, UserResponseDto } from '@repo/shared';

export interface IUsersService {
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<UserResponseDto | null>;
    findById(id: string): Promise<UserResponseDto | null>;
    findAll(): Promise<UserResponseDto[]>;
    remove(id: string): Promise<void>;
}
