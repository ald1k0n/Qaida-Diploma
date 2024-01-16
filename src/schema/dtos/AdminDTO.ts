import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type AdminDocument = HydratedDocument<AdminDTO>;

@Schema()
export class AdminDTO {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(AdminDTO);
