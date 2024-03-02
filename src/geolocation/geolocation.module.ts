import { Module } from '@nestjs/common';
import { GeolocationGateway } from './geolocation.gateway';
import { GeolocationService } from './geolocation.service';

@Module({
  providers: [GeolocationService, GeolocationGateway],
})
export class GeolocationModule {}
