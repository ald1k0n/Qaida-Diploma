import { Controller, Get, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CategoryDTO } from 'src/schema/dtos';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    type: CategoryDTO,
    description: 'Не зависит от регистра, можно писать сабстринги',
  })
  async getGategories(@Query('q') q: string) {
    return this.categoryService.getAllCategories(q);
  }

  @Post('/load')
  async loadCategories() {
    return this.categoryService.loadCategories();
  }
}
