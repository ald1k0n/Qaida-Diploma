import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PlacesDTO } from 'src/schema/dtos';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { GetPlacesService } from './getPlace.service';
import { PlaceService } from './place.service';
import { IParams, ParamsDTO } from './types';

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

  @ApiQuery({
    type: ParamsDTO,
  })
  @ApiBody({
    type: PlacesDTO,
  })
  @Get('/search')
  async byParam(@Query() query: IParams) {
    return await this.getPlaceService.findByParams(query);
  }

  @UseGuards(AuthGuard)
  @Get('/visited')
  async userPlaces(
    @Req() req: Request,
    @Query('status') status: 'VISITED' | 'PROCESSING' | 'SKIP',
  ) {
    return await this.getPlaceService.findByUser(req['user'], status);
  }

  @ApiResponse({
    description:
      'Получить по имени с API, не дергать если не хотим выгрузить место. Не трогать с приложения',
  })
  @Get('/2gis/:name')
  async loadPlaceFromApi(@Param('name') name: string) {
    return await this.placeService.addPlace(name);
  }

  @ApiResponse({
    description:
      'Получить по имени с API, не дергать если не хотим выгрузить место. Не трогать с приложения',
  })
  @Get('/2gis/pull/:category_id')
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
