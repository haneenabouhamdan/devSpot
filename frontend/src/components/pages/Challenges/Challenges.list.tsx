import React from 'react';
import { Box, SimpleGrid, Text, Spinner } from '@chakra-ui/react';
import ChallengeCard from './ChallengeCard';
import { Challenge, useChallenges } from '../../../resolvers';

const ChallengesList: React.FC = () => {
  const { loading, error, challenges } = useChallenges();

  if (loading) return <Spinner />;

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={4}>
        {challenges.map((challenge: Challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ChallengesList;
