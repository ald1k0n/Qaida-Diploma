import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from 'src/schema/dtos';
import { getAllRubrics } from 'src/shared/utils/integrationService';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly category: Model<CategoryDocument>,
  ) {}
  private logger = new Logger();
  async getAllCategories() {
    return await this.category.find();
  }

  async loadCategories() {
    const categoriesArray = await getAllRubrics(process.env?.API_KEY);

    this.logger.debug('Количество категории', categoriesArray.length);

    const newCategories = (
      await this.createOrGetExistCategory(categoriesArray)
    ).map((e) => ({
      name: e,
    }));

    const dbCategories = await this.category.insertMany(newCategories);

    return dbCategories;
  }

  private async createOrGetExistCategory(categories: string[]) {
    const existedCategories = await this.category.find({}, { name: 1, _id: 0 });
    const existedNames = existedCategories.map((e) => e.name);

    const newCategories = categories.filter(
      (category) => !existedNames.includes(category),
    );

    return newCategories;
  }
}
