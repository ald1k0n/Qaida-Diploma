import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, FileSchema, InterestSchema, AdminSchema } from './dtos';

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
      {
        name: 'Interest',
        schema: InterestSchema,
      },
      {
        name: 'Admin',
        schema: AdminSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemaModule {}
