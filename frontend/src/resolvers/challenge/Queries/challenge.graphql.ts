import { gql } from '@apollo/client';

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($createChallengeDto: CreateChallengeDto!) {
    createChallenge(CreateChallengeDto: $createChallengeDto) {
      id
    }
  }
`;

export const GET_CHALLENGES = gql`
  query Challenges {
    challenges {
      id
      createdAt
      updatedAt
      deletedAt
      title
      description
      status
      createdBy
      difficultyLevel
      submissions {
        id
        createdAt
        updatedAt
        createdBy
        challengeId
        submissionText
        status
        reviews {
          id
          createdAt
          updatedAt
          deletedAt
          createdBy
          comment
          score
        }
        user {
          profilePicture
          username
          email
          phoneNumber
        }
      }
    }
  }
`;

export const CREATE_SUBMISSION = gql`
  mutation CreateSubmission($createSubmissionInput: CreateSubmissionDto!) {
    createSubmission(createSubmissionInput: $createSubmissionInput) {
      id
      createdAt
      updatedAt
      deletedAt
      createdBy
      challengeId
      status
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($createReviewInput: CreateReviewInput!) {
    createReview(createReviewInput: $createReviewInput) {
      id
      createdAt
      updatedAt
      deletedAt
      createdBy
      comment
      score
    }
  }
`;
