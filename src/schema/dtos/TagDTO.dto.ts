import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type TagDocument = HydratedDocument<TagDTO>;

@Schema()
export class TagDTO {
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop({
    enum: ['POSITIVE', 'NEGATIVE'],
    default: 'POSITIVE',
  })
  type: 'POSITIVE' | 'NEGATIVE';
}

export const TagSchema = SchemaFactory.createForClass(TagDTO);
