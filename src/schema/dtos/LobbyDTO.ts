import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type LobbyDocument = HydratedDocument<LobbyDTO>;

@Schema()
export class LobbyDTO {
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop({
    type: Date,
    default: Date.now(),
  })
  created_at: Date;

  @Prop({
    ref: 'File',
    type: mongoose.Schema.Types.ObjectId,
  })
  image: ObjectId;

  @Prop()
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner_id: ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  users: ObjectId[];
}

export const LobbySchema = SchemaFactory.createForClass(LobbyDTO);
