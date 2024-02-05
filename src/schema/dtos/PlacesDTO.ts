import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PlaceDocument = HydratedDocument<PlacesDTO>;

@Schema()
export class PlacesDTO {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  description: string;

  @Prop({
    ref: 'Category',
    type: mongoose.Schema.Types.ObjectId,
  })
  category_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  address: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  })
  location_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  url: string;

  @Prop()
  image: string;

  @Prop()
  phone_number: string;

  @Prop()
  score: number;

  @Prop({
    min: 1,
    max: 5,
    type: mongoose.Schema.Types.Decimal128,
  })
  score_2gis: number;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
      },
    ],
  })
  schedule_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  neighborhood: string;

  @Prop()
  building_id: number;
}

export const PlaceSchema = SchemaFactory.createForClass(PlacesDTO);
