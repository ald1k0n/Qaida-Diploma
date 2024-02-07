import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { SchemaModule } from 'src/schema/schema.module';

@Module({
  imports: [SchemaModule],
  providers: [PlaceService],
  controllers: [PlaceController]
})
export class PlaceModule {}
