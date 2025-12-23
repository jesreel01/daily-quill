import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateUserDto } from '@repo/shared';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: '1', email: 'test@example.com' }];
      mockUsersService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(expect.any(Array));
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const id = '550e8400-e29b-41d4-a716-446655440000';
      const result = { id, email: 'test@example.com' };
      mockUsersService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(id)).toBeDefined();
      expect(mockUsersService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw error if UUID is invalid (manual pipe check)', async () => {
      const pipe = new ParseUUIDPipe();
      await expect(
        pipe.transform('invalid-uuid', { type: 'param', data: 'id' }),
      ).rejects.toThrow('Validation failed (uuid is expected)');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '550e8400-e29b-41d4-a716-446655440000';
      const dto: UpdateUserDto = { name: 'Updated' };
      const result = { id, ...dto };
      mockUsersService.update.mockResolvedValue(result);

      expect(await controller.update(id, dto)).toBeDefined();
      expect(mockUsersService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = '550e8400-e29b-41d4-a716-446655440000';
      const result = { id, email: 'test@example.com' };
      mockUsersService.remove.mockResolvedValue(result);

      expect(await controller.remove(id)).toBeDefined();
      expect(mockUsersService.remove).toHaveBeenCalledWith(id);
    });
  });
});
