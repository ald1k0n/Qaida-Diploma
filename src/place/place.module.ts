import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { SchemaModule } from 'src/schema/schema.module';
import { LocationService } from 'src/shared/services/location.service';
import { GetPlacesService } from 'src/place/getPlace.service';
@Module({
  imports: [SchemaModule],
  providers: [PlaceService, LocationService, GetPlacesService],
  controllers: [PlaceController],
})
export class PlaceModule {}
