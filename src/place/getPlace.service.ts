import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  PlaceDocument,
  RubricsDocument,
  VisitedDocument,
} from 'src/schema/dtos';
import { IParams } from './types';

@Injectable()
export class GetPlacesService {
  private logger = new Logger();
  constructor(
    @InjectModel('Place') private readonly place: Model<PlaceDocument>,
    @InjectModel('Rubric') private readonly rubric: Model<RubricsDocument>,
    @InjectModel('Visited') private readonly visit: Model<VisitedDocument>,
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
      this.logger.debug(
        'Debug categories',
        JSON.stringify(categoryIds, null, 2),
      );
      query = {
        category_id: {
          $in: categoryIds?.category_ids,
        },
      };
    }

    return await this.place.find(query).populate('category_id');
  }

  async findByParams(params: IParams) {
    const { limit, page, score2gis, ...q } = params;

    const range = limit ? limit : 10;
    const skip = page ? (page - 1) * range : 0;

    const query = {
      ...q,
    };

    if (q.address) {
      query['address'] = {
        $regex: q.address,
      } as { $regex: string };
    }

    if (q.title) {
      query['title'] = {
        $regex: q.title,
      } as { $regex: string };
    }

    if (score2gis) {
      query['score_2gis'] = { $gte: String(score2gis) };
    }

    this.logger.debug('Query', JSON.stringify(query));

    const places = await this.place.find(query).limit(range).skip(skip);

    const totalCount = await this.place.countDocuments(query);

    const totalPages = Math.ceil(totalCount / range);

    return {
      page: page ? Number(page) : 1,
      totalCount,
      totalPages,
      limit: Number(range),
      places,
    };
  }

  async findByUser(
    user_id: ObjectId,
    status?: 'VISITED' | 'PROCESSING' | 'SKIP',
  ) {
    const query = {
      user_id,
    };

    if (status) {
      query['status'] = status;
    }

    // this.logger.debug('Query', JSON.stringify(query));
    console.log(query);
    return await this.visit.find(query).populate(['place_id', 'user_id']);
  }
}
