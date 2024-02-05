import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<CategoryDTO>;

@Schema()
export class CategoryDTO {
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    required: true,
  })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDTO);
