import {
  Body,
  Controller,
  Delete,
  Get,
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
// import { UploadDTO, UserDTO } from './user.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { UserDTO } from 'src/schema/dtos/UserDTO';
import { FileDTO } from 'src/schema/dtos/FileDTO';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMe(@Req() req: Request) {
    return await this.userService.getme(req['user'].id);
  }

  @Patch('/update')
  async updateUser(@Req() req: Request, @Body() body: Omit<UserDTO, '_id'>) {
    const data = {
      _id: req['user'].id,
      ...body,
    };
    return await this.userService.updateUser(data);
  }

  @Patch('/update/password')
  async updatePassword(
    @Req() req: Request,
    @Body() body: { current: string; newPass: string },
  ) {
    return await this.userService.updatePassword(
      body.current,
      body.newPass,
      req['user'].id,
    );
  }

  @Patch('/avatar')
  @UseInterceptors(FileInterceptor('image'))
  async uploadAvatar(
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ) {
    const file: FileDTO = {
      buffer: Buffer.from(image.buffer),
      size: image.size,
      mimetype: image.mimetype,
    };
    // console.log(util.inspect(file, { depth: null }));

    return await this.userService.uploadAvatar(file, req['user'].id);
  }

  @Put('/add/:friend_id')
  async addFriend(
    @Req() req: Request,
    @Param('friend_id') friend_id: ObjectId,
  ) {
    return await this.userService.addFriend(req['user'].id, friend_id);
  }

  @Delete('/delete/:friend_id')
  async removeFriend(
    @Req() req: Request,
    @Param('friend_id') friend_id: ObjectId,
  ) {
    return await this.userService.removeFriend(req['user'].id, friend_id);
  }
}
