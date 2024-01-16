import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<FileDTO>;

@Schema()
export class FileDTO {
  _id?: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
  })
  mimetype: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.Buffer,
  })
  buffer: Buffer;
  @Prop({
    required: true,
  })
  size: number;
}

export const FileSchema = SchemaFactory.createForClass(FileDTO);
