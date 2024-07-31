import React, { useCallback, useEffect, useState } from 'react';
import { Box, FormLabel, Stack, useToast } from '@chakra-ui/react';
import { CustomModal, FormInput } from '../../common';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { challengeSchema } from '../../validations';
import {
  CreateChallengeInput,
  useCreateChallenge,
} from '../../../resolvers/challenge';
import StarRating from '../../common/StarRating';
import RichTextEditor from '../../common/RichTextEditor';

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChallengeModal: React.FC<CreateChallengeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createChallenge } = useCreateChallenge();
  const [rating, setRating] = useState(0);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateChallengeInput>({
    mode: 'all',
    resolver: yupResolver(challengeSchema),
  });

  const toast = useToast();

  const determineDifficultyLevel = (rating: number): string => {
    if (rating < 2) return 'easy';
    if (rating < 4) return 'medium';
    return 'hard';
  };

  useEffect(() => {
    if (rating) setValue('difficultyLevel', determineDifficultyLevel(rating));
  }, [rating]);

  const onConfirm = useCallback(
    (data: CreateChallengeInput) => {
      if (!localStorage.getItem('uId')) return;

      const payload = {
        ...data,
        status: 'ACTIVE',
        createdBy: localStorage.getItem('uId') || undefined,
      };
      try {
        createChallenge({
          payload,
          onCompleted: () => {
            toast({
              description: 'Challenge created successfully',
              status: 'success',
              duration: 3000,
              position: 'top-right',
              isClosable: true,
            });
            onClose();
          },
        });
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },
    [onClose]
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Challenge"
      size="lg"
      body={
        <Stack spacing={10}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
            gap={4}
          >
            <FormInput
              label="Title"
              placeholder="Enter Channel title"
              {...register('title')}
              error={errors.title?.message}
            />
          </Box>
          <Box>
            <FormLabel
              fontWeight={'400'}
              className="gray"
              fontSize={'14px'}
              ml={2}
            >
              Description
            </FormLabel>
            <RichTextEditor
              value={getValues('description')}
              onChange={value => setValue('description', value)}
            />
            {errors.description && (
              <Box color="red.500">{errors.description.message}</Box>
            )}
          </Box>
          <Stack>
            <FormLabel
              fontWeight={'400'}
              className="gray"
              fontSize={'14px'}
              ml={2}
            >
              Difficulty Level
            </FormLabel>
            <StarRating rating={rating} setRating={setRating} />
          </Stack>
        </Stack>
      }
      loading={false}
      handleConfirm={handleSubmit(onConfirm, err => console.log(err))}
    />
  );
};
