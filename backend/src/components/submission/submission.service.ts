import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionRepository } from './repositories';
import { UpdateSubmissionDto } from './dto';
import { SubmissionStatus } from './enums';
import { Review, SubmissionReview } from './entities';
import { In, Repository } from 'typeorm';
import { User, UserRepository } from '../user';
import { recordsToMapAsObject } from 'src/common/utilities';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionsRepository: SubmissionRepository,
    @InjectRepository(SubmissionReview)
    private submissionReviewRepository: Repository<SubmissionReview>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private userRepository: UserRepository,
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

  async findByChallengeId(
    challengeIds: UUID[],
  ): Promise<(Submission & { user: User | undefined })[]> {
    const submissions = await this.submissionsRepository.find({
      where: { challengeId: In(challengeIds) },
    });

    const usersIds = submissions.map((submission) => submission.createdBy);
    const users = await this.userRepository.find({
      where: { id: In(usersIds) },
    });
    const usersMap = recordsToMapAsObject(users, 'id');

    return submissions.map((submission) => {
      const user = usersMap.get(submission.createdBy);
      return { ...submission, user };
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
    const submissionReview = await this.submissionReviewRepository.find({
      where: { submissionId: id },
    });
    return this.reviewRepository.find({
      where: { id: In(submissionReview.map((sr) => sr.reviewId)) },
    });
  }
}
