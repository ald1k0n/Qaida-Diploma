import { Controller, Get, Post } from '@nestjs/common';
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
    schema: {
      $ref: getSchemaPath(CategoryDTO),
    },
  })
  async getGategories() {
    return this.categoryService.getAllCategories();
  }

  @Post('/load')
  async loadCategories() {
    return this.categoryService.loadCategories();
  }
}
