import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadDTO, UserDTO } from './user.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  /**
   *  Обновляет пользователя для того чтобы не писать один и тот же код несколько раз
   */
  private async updateUserInDB(data: UserDTO, id: number) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async uploadAvatar(file: UploadDTO, id: number) {
    return await this.prisma.$transaction(async (tx) => {
      const { id: file_id } = await tx.image.create({ data: file });

      const user = await tx.user.update({
        where: { id },
        data: {
          image_id: file_id,
        },
      });

      const data = {
        ...user,
        avatar: `${process.env?.BACKEND_URL}/api/image/${file_id}`,
      };

      return data;
    });
  }

  async updateUser({
    id,
    email,
    father_name,
    messenger_one,
    messenger_two,
    name,
    surname,
  }: UserDTO) {
    return await this.updateUserInDB(
      {
        email,
        father_name,
        messenger_one,
        messenger_two,
        name,
        surname,
      },
      id,
    );
  }

  async updatePassword(prevPass: string, newPass: string, id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('User not found!');
    if (!bcrypt.compareSync(prevPass, user.password))
      throw new MethodNotAllowedException('Password did not match');

    return await this.updateUserInDB(
      { password: bcrypt.hashSync(newPass, 7) },
      id,
    );
  }

  async addFriend(id: number, friend_id: number) {
    const friend = await this.prisma.$transaction(async (tx) => {
      const currentFriend = await tx.friends.create({
        data: {
          user_id: id,
          user2_id: friend_id,
        },
      });

      const otherFriend = await tx.friends.create({
        data: {
          user_id: friend_id,
          user2_id: id,
        },
      });
      return { currentFriend, otherFriend };
    });
    return friend;
  }

  async removeFriend(id: number, friend_id: number) {
    const removedFriends = await this.prisma.$transaction(async (tx) => {
      const currentFriend = await tx.friends.deleteMany({
        where: {
          user_id: id,
          user2_id: friend_id,
        },
      });

      const otherFriend = await tx.friends.deleteMany({
        where: {
          user_id: friend_id,
          user2_id: id,
        },
      });

      return { currentFriend, otherFriend };
    });

    return removedFriends;
  }
}
