import React from 'react';
import { Box, SimpleGrid, Spinner, Flex } from '@chakra-ui/react';
import ChallengeCard from './ChallengeCard';
import { Challenge, useChallenges } from '../../../resolvers';

interface Props {
  filter: string;
}

const ChallengesComponent: React.FC<Props> = ({ filter }) => {
  const { loading, challenges } = useChallenges();
  const userId = localStorage.getItem('uId');

  const solvedChallenges = challenges.filter(challenge => {
    return challenge.submissions?.some(submission =>
      submission.reviews?.some(review => review.createdBy === userId)
    );
  });

  const pendingChallenges = challenges.filter(challenge => {
    return !solvedChallenges.includes(challenge);
  });

  const data = filter === 'Solved' ? solvedChallenges : pendingChallenges;

  if (loading) return <Spinner />;

  return (
    <Flex p={4} flexDirection="column" height="100%">
      <Box flex="1" overflowY="auto">
        <SimpleGrid columns={{ base: 1, md: 4, lg: 4 }} spacing={4}>
          {data.map((challenge: Challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default ChallengesComponent;
