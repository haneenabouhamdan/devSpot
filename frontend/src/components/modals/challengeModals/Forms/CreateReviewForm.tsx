import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Textarea,
  Flex,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useCreateReview } from '../../../../resolvers';
import StarRating from '../../../common/StarRating';

interface ReviewFormProps {
  submissionId: string;
  onReviewSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  submissionId,
  onReviewSubmit,
}) => {
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [scoreError, setScoreError] = useState<string>('');
  const [textError, setTextError] = useState<string>('');
  const toast = useToast();

  const { createReview } = useCreateReview();

  const handleSubmitReview = () => {
    const userId = localStorage.getItem('uId');
    if (!userId) return;
    if (!score) {
      setScoreError('*Score is required');
      return;
    }
    if (!comment) {
      setTextError('*Review text is required');
      return;
    }
    createReview({
      comment,
      createdBy: userId,
      score,
      submissionId: submissionId,
    }).then(() => {
      toast({
        description: 'Review submitted successfully',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      setComment('');
      setScore(0);
      setScoreError('');
      setTextError('');
      onReviewSubmit();
    });
  };

  return (
    <VStack>
      <HStack mt={4} justifyContent={'start'} width="100%">
        <Text fontSize={'medium'} color="gray.300" ml={2}>
          Add Score
        </Text>
        <StarRating rating={score} setRating={setScore} />
        <Text color="red">{scoreError}</Text>
      </HStack>
      <Textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <Text color="red">{textError}</Text>
      <Flex width="100%" justifyContent="end">
        <Button
          colorScheme="orange"
          _hover={{ bgColor: 'orange.300' }}
          width="200px"
          onClick={handleSubmitReview}
        >
          Submit Review
        </Button>
      </Flex>
    </VStack>
  );
};

export default ReviewForm;
