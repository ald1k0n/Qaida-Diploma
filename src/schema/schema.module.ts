import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './dtos/UserDTO';
import { FileSchema } from './dtos/FileDTO';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'File',
        schema: FileSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemaModule {}
