import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import {
  ReviewRepository,
  SubmissionRepository,
  SubmissionReviewRepository,
} from './repositories';
import { UpdateSubmissionDto } from './dto';
import { SubmissionStatus } from './enums';
import { Review } from './entities';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionsRepository: SubmissionRepository,
    private submissionReviewRepository: SubmissionReviewRepository,
    private reviewRepository: ReviewRepository,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    const submission = this.submissionsRepository.create(createSubmissionDto);
    return this.submissionsRepository.save(submission);
  }

  async update(
    id: UUID,
    updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<Submission> {
    await this.submissionsRepository.update(id, updateSubmissionDto);
    return this.submissionsRepository.save({ ...updateSubmissionDto, id });
  }

  async findAll(): Promise<Submission[]> {
    return this.submissionsRepository.find({
      relations: ['created_by', 'submission_reviews'],
    });
  }

  async findOneById(id: UUID): Promise<Nullable<Submission>> {
    return this.submissionsRepository.findOne({
      where: { id },
      relations: ['created_by', 'submission_reviews'],
    });
  }

  async findSubmissionsByStatus(
    status: SubmissionStatus,
  ): Promise<Submission[]> {
    return this.submissionsRepository.findSubmissionsByStatus(status);
  }

  async findSubmissionsByUser(userId: UUID): Promise<Submission[]> {
    return this.submissionsRepository.findSubmissionsByUser(userId);
  }

  async findSubmissionReviewById(id: UUID): Promise<Review[]> {
    const submissionReview = await this.submissionReviewRepository.findOne({
      where: { submissionId: id },
    });
    return this.reviewRepository.findBy({ id: submissionReview?.submissionId });
  }
}
