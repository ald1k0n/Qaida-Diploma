import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSchema,
  FileSchema,
  InterestSchema,
  AdminSchema,
  LobbySchema,
  LocationSchema,
  CategorySchema,
  ScheduleSchema,
  PlaceSchema,
  TagSchema,
  VoteSchema,
  ReviewSchema,
  VisitedSchema,
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
      {
        name: 'Location',
        schema: LocationSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'Schedule',
        schema: ScheduleSchema,
      },
      {
        name: 'Place',
        schema: PlaceSchema,
      },
      {
        name: 'Tag',
        schema: TagSchema,
      },
      {
        name: 'Vote',
        schema: VoteSchema,
      },
      {
        name: 'Review',
        schema: ReviewSchema,
      },
      {
        name: 'Visited',
        schema: VisitedSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchemaModule {}
