import { AuthUser } from '../../auth';

export interface CreateChallengeInput {
  description: string;
  difficultyLevel: string;
  title: string;
  status?: string;
  createdBy?: string;
}
export interface Challenge {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  difficultyLevel: string;
  submissions?: Submission[];
}

export interface Submission {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  challengeId: string;
  submissionText: string;
  status: SubmissionStatus;
  user?: AuthUser;
  reviews?: Review[];
}

export interface CreateSubmissionInput {
  challengeId: string;
  createdBy: string;
  status: SubmissionStatus;
  submissionText: string;
}

export interface Review {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  comment: string;
  score: number;
}
export interface CreateReviewInput {
  score: number;
  comment: string;
  createdBy: string;
  submissionId: string;
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}
