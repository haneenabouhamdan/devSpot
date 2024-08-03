import { useQuery } from '@apollo/client';
import { Challenge, GET_CHALLENGES } from '../Queries';

interface ChallengesData {
  challenges: Challenge[];
}

export const useChallenges = () => {
  const { loading, error, data } = useQuery<ChallengesData>(GET_CHALLENGES);

  return {
    loading,
    error,
    challenges: data ? data.challenges : [],
  };
};
