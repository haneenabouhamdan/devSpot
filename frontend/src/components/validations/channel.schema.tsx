import * as yup from 'yup';

export const channelSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  isPrivate: yup.boolean(),
  isGroupChat: yup.boolean(),
  createdBy: yup
    .string()
    .uuid('Invalid UUID')
    .required('CreatedBy is required'),
  photo: yup.string(),
});

export const dmChannelSchema = yup.object().shape({
  description: yup.string(),
  createdBy: yup
    .string()
    .uuid('Invalid UUID')
    .required('CreatedBy is required'),
});
