import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Interest = HydratedDocument<InterestDTO>;

@Schema()
export class InterestDTO {
  _id?: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  })
  category_id: mongoose.Schema.Types.ObjectId[];
}

export const InterestSchema = SchemaFactory.createForClass(InterestDTO);
