import { Controller, Get, Param } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('/:name')
  async getPlaceId(@Param('name') name: string) {
    return await this.placeService.addPlace(name);
  }
}
