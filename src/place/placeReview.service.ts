import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  ReviewDTO,
  ReviewDocument,
  VoteDTO,
  VoteDocument,
} from 'src/schema/dtos';
import { GetPlacesService } from './getPlace.service';

@Injectable()
export class PlaceReviewService {
  private logger = new Logger();
  constructor(
    @InjectModel('Review') private readonly review: Model<ReviewDocument>,
    @InjectModel('Vote') private readonly vote: Model<VoteDocument>,
    private readonly getPlaceService: GetPlacesService,
  ) {}

  private async findByReviewId(_id: ObjectId) {
    return await this.review.findOne({ _id });
  }

  private async updateReviewById(_id: ObjectId, commandBody: any) {
    return await this.review
      .findByIdAndUpdate(_id, commandBody, {
        new: true,
      })
      .populate(['votes']);
  }

  async getReviewForPlace(place_id: ObjectId) {
    return await this.review
      .find({
        place_id,
      })
      .populate(['votes']);
  }

  async addReview(payload: ReviewDTO) {
    await this.getPlaceService.getPlaceById(payload.place_id);
    const review = await this.review.create(payload);
    return review;
  }

  async addVoteToReview(review_id: ObjectId, payload: VoteDTO) {
    const review = await this.findByReviewId(review_id);

    if (!review) throw new NotFoundException('Отзыв не найден');
    const vote = await this.vote.create(payload);
    return await this.updateReviewById(review_id, {
      $push: {
        votes: vote._id,
      },
    });
  }

  async handleVote(
    vote_id: ObjectId,
    review_id: ObjectId,
    type: 'POSITIVE' | 'NEGATIVE' | string,
    method: 'DELETE' | 'PATCH' | string,
  ) {
    this.logger.debug(
      'HandleVote',
      JSON.stringify({ vote_id, review_id, type, method }),
    );

    if (method === 'DELETE') {
      const updatedReview = await this.updateReviewById(review_id, {
        $pull: {
          votes: vote_id,
        },
      });
      await this.vote.deleteOne({ _id: vote_id });
      return updatedReview;
    } else if (method === 'PATCH') {
      const updatedVote = await this.vote.findByIdAndUpdate(
        vote_id,
        { type },
        { new: true },
      );
      this.logger.debug('Updated vote:', updatedVote);
      return updatedVote;
    }
  }
}
