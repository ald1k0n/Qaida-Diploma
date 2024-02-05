import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<ScheduleDTO>;

@Schema()
export class ScheduleDTO {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  from: string;

  @Prop()
  to: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleDTO);
