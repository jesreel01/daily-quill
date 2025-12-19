import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.reposistory';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public login(loginDto: LoginDto) {
    
  }

  public register(registerDto: RegisterDto) {}
}
