import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.reposistory';
import { RegisterDto, Auth } from '@repo/shared';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockAuthRepository = {
    create: jest.fn(),
  };

  const mockUsersService = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: mockAuthRepository },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should call usersService.create, authRepository.create and return tokens', async () => {
      const dto: RegisterDto = {
        email: 'new@example.com',
        name: 'New User',
        password: 'password',
      };
      const user = {
        id: 'user-1',
        email: dto.email,
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createdAuth = new Auth({
        id: 'id-1',
        userId: 'user-1',
        passwordHash: 'hashed',
      });

      mockUsersService.create.mockResolvedValue(user);
      mockAuthRepository.create.mockResolvedValue(createdAuth);
      mockJwtService.sign.mockReturnValue('token');

      const res = await service.register(dto);

      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: dto.email,
        name: dto.name,
      });
      expect(mockAuthRepository.create).toHaveBeenCalled();
      expect(res.user.id).toBe(user.id);
      expect(res.accessToken).toBe('token');
    });

    it('should propagate errors from repository', async () => {
      const dto: RegisterDto = {
        email: 'dup@example.com',
        name: 'Dup',
        password: 'password',
      };
      const user = {
        id: 'user-1',
        email: dto.email,
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const error = new Error('Repo failure');

      mockUsersService.create.mockResolvedValue(user);
      mockAuthRepository.create.mockRejectedValue(error);

      await expect(service.register(dto)).rejects.toThrow(error);
    });
  });
});
