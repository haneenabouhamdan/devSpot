import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repositories';
import { Review } from '../submission/entities';

@Injectable()
export class ReviewRepository extends BaseRepository<Review> {
  constructor(private dataSource: DataSource) {
    super(Review, dataSource);
  }
}
