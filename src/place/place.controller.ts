import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { PlacesDTO } from 'src/schema/dtos';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { GetPlacesService } from './getPlace.service';
import { PlaceService } from './place.service';
import { IParams, ParamsDTO, UpdateStatusDto } from './types';

@ApiTags('Place')
@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly getPlaceService: GetPlacesService,
  ) {}

  @ApiResponse({ type: PlacesDTO })
  @Get('/:id')
  async getPlaceById(@Param('id') id: ObjectId) {
    return await this.getPlaceService.getPlaceById(id);
  }

  @ApiResponse({
    type: PlacesDTO,
    description: 'categoryid и rubricid не могут отправлять вместе',
  })
  @Get('/search-category')
  async getPlaces(
    @Query('rubric_id') rubricId?: string,
    @Query('category_id') categoryId?: string,
  ) {
    return await this.getPlaceService.getPlace(categoryId, rubricId);
  }

  @ApiQuery({
    type: ParamsDTO,
  })
  @ApiResponse({
    type: PlacesDTO,
  })
  @Get('/search')
  async byParam(@Query() query: IParams) {
    return await this.getPlaceService.findByParams(query);
  }

  @ApiResponse({ type: PlacesDTO })
  @UseGuards(AuthGuard)
  @Get('/visited')
  async userPlaces(
    @Req() req: Request,
    @Query('status') status: 'VISITED' | 'PROCESSING' | 'SKIP',
    @Query('date') date: number = null,
  ) {
    console.log(typeof date);
    return await this.getPlaceService.findByUser(req['user'], status, date);
  }

  @ApiBody({ type: UpdateStatusDto })
  @UseGuards(AuthGuard)
  @Put('/visited/:id')
  async updateStatus(
    @Param('id') _id: ObjectId,
    @Body() { status }: { status: 'VISITED' | 'PROCESSING' | 'SKIP' },
  ) {
    return await this.getPlaceService.changeStatus(_id, status);
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
