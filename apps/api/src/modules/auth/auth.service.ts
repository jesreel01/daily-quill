import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.reposistory';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) { }

  public login(loginDto: LoginDto) {
    throw new Error('Not implemented');
  }

  public async register(registerDto: RegisterDto) {
    const auth = new Auth({ passwordHash: registerDto.password });
    return this.authRepository.create(auth);
  }
}
