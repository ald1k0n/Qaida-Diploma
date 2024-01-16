import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type User = HydratedDocument<UserDTO>;
@Schema()
export class UserDTO {
  _id?: ObjectId;

  @Prop({
    required: true,
  })
  name?: string;

  @Prop({
    required: true,
  })
  surname?: string;

  @Prop()
  father_name?: string;

  @Prop({
    required: true,
  })
  password?: string;

  @Prop({
    required: true,
  })
  email?: string;

  @Prop()
  messenger_one?: string;

  @Prop()
  messenger_two?: string;

  @Prop({
    enum: ['MALE', 'FEMALE', 'BINARY'],
    default: 'BINARY',
  })
  gender?: 'MALE' | 'FEMALE' | 'BINARY';

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  friends?: ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  })
  image_id?: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserDTO);
