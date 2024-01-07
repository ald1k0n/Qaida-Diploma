import {
  Body,
  Controller,
  Put,
  Post,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(@Req() req: Request) {
    return await this.authService.getme(req['user'].id);
  }

  @Post('/')
  async createUser(@Body() body: AuthDTO) {
    return await this.authService.createUser(body);
  }

  @Post('/login')
  async authorize(@Body() body: AuthDTO) {
    return await this.authService.authorize(body);
  }

  @Put('/refresh')
  async refresh(@Body('refresh_token') token: string) {
    return await this.authService.refresh(token);
  }
}
