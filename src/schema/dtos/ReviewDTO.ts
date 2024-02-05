import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewDTO>;

@Schema()
export class ReviewDTO {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  })
  place_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Date,
    default: new Date(),
  })
  created_at: Date;

  @Prop({
    type: mongoose.Schema.Types.Decimal128,
    max: 5,
    min: 1,
  })
  score: number;

  @Prop()
  comment: string;

  @Prop({
    ref: 'Tag',
    type: mongoose.Schema.Types.ObjectId,
  })
  tags: ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  })
  image: ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote',
  })
  review_id: ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewDTO);
