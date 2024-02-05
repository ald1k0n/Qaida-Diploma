import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<LocationDTO>;

@Schema()
export class LocationDTO {
  _id?: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
  })
  lat: number;
  @Prop({
    required: true,
  })
  lng: number;
}

export const LocationSchema = SchemaFactory.createForClass(LocationDTO);
