import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.reposistory';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const [user] = await this.usersRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const [user] = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const [user] = await this.usersRepository.findByEmail(email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const [updatedUser] = await this.usersRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: string) {
    await this.findOne(id);
    const [deletedUser] = await this.usersRepository.remove(id);
    return deletedUser;
  }
}
