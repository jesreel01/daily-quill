import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.reposistory';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@repo/shared';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
      };
      const createdUser = { id: 'uuid', ...dto };

      mockUsersRepository.findByEmail.mockResolvedValue([]);
      mockUsersRepository.create.mockResolvedValue([createdUser]);

      const result = await service.create(dto);

      expect(result).toEqual(createdUser);
      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(mockUsersRepository.create).toHaveBeenCalledWith(dto);
    });

    it('should throw ConflictException if user already exists', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
      };

      mockUsersRepository.findByEmail.mockResolvedValue([
        { id: 'uuid', email: dto.email },
      ]);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { id: '1', email: '1@test.com' },
        { id: '2', email: '2@test.com' },
      ];
      mockUsersRepository.findAll.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(mockUsersRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const id = 'uuid';
      const user = { id, email: 'test@test.com' };
      mockUsersRepository.findById.mockResolvedValue([user]);

      const result = await service.findOne(id);

      expect(result).toEqual(user);
      expect(mockUsersRepository.findById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUsersRepository.findById.mockResolvedValue([]);

      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 'uuid';
      const dto: UpdateUserDto = { name: 'Updated Name' };
      const user = { id, email: 'test@test.com' };
      const updatedUser = { ...user, ...dto };

      mockUsersRepository.findById.mockResolvedValue([user]);
      mockUsersRepository.update.mockResolvedValue([updatedUser]);

      const result = await service.update(id, dto);

      expect(result).toEqual(updatedUser);
      expect(mockUsersRepository.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = 'uuid';
      const user = { id, email: 'test@test.com' };

      mockUsersRepository.findById.mockResolvedValue([user]);
      mockUsersRepository.remove.mockResolvedValue([user]);

      const result = await service.remove(id);

      expect(result).toEqual(user);
      expect(mockUsersRepository.remove).toHaveBeenCalledWith(id);
    });
  });
});
