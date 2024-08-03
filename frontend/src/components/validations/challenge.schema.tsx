import * as yup from 'yup';

export const challengeSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  difficultyLevel: yup.string().required('Difficulty level is required'),
});

export const submissionSchema = yup.object().shape({
  submissionText: yup.string().required('Submission Answer is required'),
});
