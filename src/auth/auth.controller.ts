import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginDto {
  email!: string;
  senha!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) 
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.senha);
    return this.authService.login(user);
  }

  @Post('fix-password')
  async fixPassword() {
    return this.authService.updatePasswordParaHash(1, '123456');
  }
}