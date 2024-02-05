import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Interest = HydratedDocument<InterestDTO>;

@Schema()
export class InterestDTO {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
  })
  name: string;
}

export const InterestSchema = SchemaFactory.createForClass(InterestDTO);
