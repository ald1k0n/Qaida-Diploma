import {
  Controller,
  Delete,
  Param,
  Patch,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDTO } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Patch('/avatar')
  @UseInterceptors(FileInterceptor('image'))
  async uploadAvatar(
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ) {
    const file: UploadDTO = {
      buffer: image.buffer,
      size: image.size,
      mimetype: image.mimetype,
    };
    return await this.userService.uploadAvatar(file, req['user'].id);
  }

  @UseGuards(AuthGuard)
  @Put('/add/:friend_id')
  async addFriend(@Req() req: Request, @Param('friend_id') friend_id: number) {
    return await this.userService.addFriend(req['user'].id, Number(friend_id));
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:friend_id')
  async removeFriend(
    @Req() req: Request,
    @Param('friend_id') friend_id: number,
  ) {
    return await this.userService.removeFriend(
      req['user'].id,
      Number(friend_id),
    );
  }
}
