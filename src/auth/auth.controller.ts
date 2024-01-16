import { Body, Controller, Put, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserDTO } from 'src/schema/dtos/UserDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  async createUser(@Body() body: UserDTO) {
    return await this.authService.createUser(body);
  }

  @Post('/login')
  async authorize(@Body() body: UserDTO) {
    return await this.authService.authorize(body);
  }

  @Put('/refresh')
  async refresh(@Body('refresh_token') token: string) {
    return await this.authService.refresh(token);
  }
}
