import { useMutation } from '@apollo/client';
import { CREATE_REVIEW, CreateReviewInput, GET_CHALLENGES } from '../Queries';

interface Review {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  createdBy: string;
  comment: string;
  score: number;
}

export const useCreateReview = () => {
  const [createReviewMutation, { data, loading, error }] = useMutation<
    { createReview: Review },
    { createReviewInput: CreateReviewInput }
  >(CREATE_REVIEW);

  const createReview = async (createReviewInput: CreateReviewInput) => {
    try {
      const response = await createReviewMutation({
        variables: { createReviewInput },
        refetchQueries: [
          {
            query: GET_CHALLENGES,
          },
        ],
      });
      return response.data?.createReview;
    } catch (err) {
      throw err;
    }
  };

  return {
    createReview,
    data,
    loading,
    error,
  };
};
