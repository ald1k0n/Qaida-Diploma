import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Interest = HydratedDocument<InterestDTO>;

@Schema()
export class InterestDTO {
  @Prop({
    required: true,
  })
  name: string;
}

export const InterestSchema = SchemaFactory.createForClass(InterestDTO);
