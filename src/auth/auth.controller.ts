import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("login")
  async login(@Body(new ValidationPipe()) loginUser: LoginDto) {
    return this.authService.loginUser(loginUser);
  }


  @Public()
  @Post('register')
  async register(@Body(new ValidationPipe()) createUser: CreateUserDto) {
    return this.authService.registerUser(createUser)
  }
}
