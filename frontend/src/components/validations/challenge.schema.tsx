import * as yup from 'yup';

export const challengeSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  difficultyLevel: yup.string().required('Difficulty level is required'),
});
