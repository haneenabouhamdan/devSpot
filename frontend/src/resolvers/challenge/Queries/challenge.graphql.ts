import { gql } from '@apollo/client';

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($createChallengeDto: CreateChallengeDto!) {
    createChallenge(CreateChallengeDto: $createChallengeDto) {
      id
    }
  }
`;
