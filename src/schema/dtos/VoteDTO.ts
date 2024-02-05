import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type VoteDocument = HydratedDocument<VoteDTO>;

@Schema()
export class VoteDTO {
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop({
    enum: ['POSITIVE', 'NEGATIVE'],
    default: 'POSITIVE',
  })
  type: 'POSITIVE' | 'NEGATIVE';

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user_id: ObjectId;
}

export const VoteSchema = SchemaFactory.createForClass(VoteDTO);
