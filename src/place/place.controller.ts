import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaceService } from './place.service';
import { GetPlacesService } from './getPlace.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlacesDTO } from 'src/schema/dtos';

@ApiTags('Place')
@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly getPlaceService: GetPlacesService,
  ) {}

  @ApiResponse({
    type: PlacesDTO,
    description: 'categoryid и rubricid не могут отправлять вместе',
  })
  @Get('/')
  async getPlaces(
    @Query('rubric_id') rubricId?: string,
    @Query('category_id') categoryId?: string,
  ) {
    return await this.getPlaceService.getPlace(categoryId, rubricId);
  }

  @ApiResponse({
    description:
      'Получить по имени с API, не дергать если не хотим выгрузить место. Не трогать с приложения',
  })
  @Get('/:name')
  async loadPlaceFromApi(@Param('name') name: string) {
    return await this.placeService.addPlace(name);
  }

  @ApiResponse({
    description:
      'Получить по имени с API, не дергать если не хотим выгрузить место. Не трогать с приложения',
  })
  @Get('/pull/:category_id')
  async getPlacesByCategories(
    @Param('category_id') category_id: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return await this.placeService.getPlacesByCategories(
      limit,
      category_id,
      page,
    );
  }
}
