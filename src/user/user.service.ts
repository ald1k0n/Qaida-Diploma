import { UserDTO } from 'src/schema/dtos/UserDTO';
import {
  Injectable,
  Logger,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { FileDTO } from 'src/schema/dtos/FileDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly user: Model<UserDTO>,
    @InjectModel('File') private readonly file: Model<FileDTO>,
  ) {}

  private logger = new Logger();
  /**
   *  Обновляет пользователя для того чтобы не писать один и тот же код несколько раз
   */
  private async updateUserInDB(data: UserDTO, id: ObjectId) {
    return await this.user.updateOne({ _id: id }, data);
  }

  public async uploadAvatar(file: FileDTO, _id: ObjectId) {
    const image = (await this.file
      .create(file)
      .catch((err) => this.logger.error(err))) as FileDTO;

    const user = await this.updateUserInDB({ image_id: image._id }, _id);

    const data = {
      ...user,
      image: `${process.env?.BACKEND_URL}/api/image/${image._id}`,
    };

    return data;
  }

  public async updateUser(body: UserDTO) {
    return await this.updateUserInDB(body, body._id);
  }

  public async updatePassword(prevPass: string, newPass: string, id: ObjectId) {
    const user = await this.user.findOne({ _id: id });
    if (!user) throw new NotFoundException('User not found!');
    if (!bcrypt.compareSync(prevPass, user.password))
      throw new MethodNotAllowedException('Password did not match');

    return await this.updateUserInDB(
      { password: bcrypt.hashSync(newPass, 7) },
      id,
    );
  }

  public async getme(_id: mongoose.Schema.Types.ObjectId) {
    try {
      const candidate = await this.user.findById(_id);
      return candidate;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  public async addFriend(id: ObjectId, friend_id: ObjectId) {
    const currentUser = await this.user.updateOne(
      { _id: id },
      {
        $push: {
          friends: friend_id,
        },
      },
    );

    const friend = await this.user.updateOne(
      { _id: friend_id },
      {
        $push: {
          friends: id,
        },
      },
    );

    return { currentUser, friend };
  }

  public async removeFriend(id: ObjectId, friend_id: ObjectId) {
    const currentUser = await this.user.updateOne(
      { _id: id },
      {
        $pop: {
          friends: friend_id,
        },
      },
    );

    const friend = await this.user.updateOne(
      { _id: friend_id },
      {
        $pop: {
          friends: id,
        },
      },
    );

    return { currentUser, friend };
  }
}
