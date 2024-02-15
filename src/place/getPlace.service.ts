import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaceDocument, RubricsDocument } from 'src/schema/dtos';

@Injectable()
export class GetPlacesService {
  constructor(
    @InjectModel('Place') private readonly place: Model<PlaceDocument>,
    @InjectModel('Rubric') private readonly rubric: Model<RubricsDocument>,
  ) {}

  async getPlace(categoryId?: string, rubricId?: string) {
    let query = {};

    if (categoryId) {
      query = {
        category_id: {
          $in: [categoryId],
        },
      };
    } else if (rubricId) {
      const categoryIds = await this.rubric.findOne(
        { _id: rubricId },
        { category_ids: 1 },
      );

      query = {
        category_id: {
          $in: categoryIds.category_ids,
        },
      };
    }

    return await this.place.find(query).populate('category_id');
  }
}
