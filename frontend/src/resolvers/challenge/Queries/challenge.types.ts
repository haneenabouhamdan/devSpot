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
  submissions?: {
    status: SubmissionStatus;
    createdBy: string;
  }[];
}

export interface CreateSubmissionInput {
  challengeId: string;
  createdBy: string;
  status: SubmissionStatus;
  submissionText: string;
}

export enum SubmissionStatus {
  CLOSED = 'CLOSED',
  CREATED = 'CREATED',
}
