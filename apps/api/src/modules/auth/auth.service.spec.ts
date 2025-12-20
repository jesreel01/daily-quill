import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.reposistory';
import { RegisterDto } from './dto/register.dto';
import { Auth } from './entities/auth.entity';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: AuthRepository;

  const mockAuthRepository = {
    create: jest.fn(),
  } as unknown as AuthRepository;

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: mockAuthRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(authRepository).toBeDefined();
  });

  describe('register', () => {
    it('should call authRepository.create and return created record', async () => {
      const dto: RegisterDto = { email: 'new@example.com', name: 'New User', password: 'password' };
      const created = new Auth({ id: 'id-1', userId: 'user-1', passwordHash: 'hashed' });
      (mockAuthRepository.create as jest.Mock).mockResolvedValue(created);
      const res = await service.register(dto);
      expect(mockAuthRepository.create).toHaveBeenCalled();
      expect(res).toEqual(created);
    });

    it('should propagate errors from repository', async () => {
      const dto: RegisterDto = { email: 'dup@example.com', name: 'Dup', password: 'password' };
      const error = new Error('Repo failure');
      (mockAuthRepository.create as jest.Mock).mockRejectedValue(error);
      await expect(service.register(dto)).rejects.toThrow(error);
    });
  });
});
