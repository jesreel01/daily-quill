import { ConflictException, Injectable } from '@nestjs/common';
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
    return [];
  }

  async findOne(id: string) {
    return null;
  }

  async findByEmail(email: string) {
    const [user] = await this.usersRepository.findByEmail(email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return null;
  }

  async remove(id: string) {
    return;
  }
}
