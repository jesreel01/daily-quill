import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RegisterDto,
  LoginResponseDto,
  RegisterResponseDto,
} from '@repo/shared';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a LoginResponseDto instance on success', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const serviceResponse = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
      };

      mockAuthService.login.mockResolvedValue(serviceResponse);

      const result = await controller.login(loginDto);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toBeInstanceOf(LoginResponseDto);
      expect(result.accessToken).toBe(serviceResponse.accessToken);
      expect(result.user.email).toBe(serviceResponse.user.email);
    });

    it('should propagate errors from AuthService', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      mockAuthService.login.mockRejectedValue(new Error('Unauthorized'));

      await expect(controller.login(loginDto)).rejects.toThrow('Unauthorized');
    });
  });

  describe('register', () => {
    it('should return a RegisterResponseDto instance on success', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      const serviceResponse = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
      };

      mockAuthService.register.mockResolvedValue(serviceResponse);

      const result = await controller.register(registerDto);

      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toBeInstanceOf(RegisterResponseDto);
      expect(result.accessToken).toBe(serviceResponse.accessToken);
    });

    it('should propagate errors from AuthService', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      mockAuthService.register.mockRejectedValue(new Error('Conflict'));

      await expect(controller.register(registerDto)).rejects.toThrow(
        'Conflict',
      );
    });
  });
});
