import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSchema,
  FileSchema,
  InterestSchema,
  AdminSchema,
  LobbySchema,
} from './dtos';

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
      {
        name: 'Lobby',
        schema: LobbySchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemaModule {}
