import React, { useCallback, useEffect, useState } from 'react';
import { Box, Stack, useToast } from '@chakra-ui/react';
import {
  AvatarUploader,
  CustomModal,
  FormInput,
  SwitchInput,
} from '../../common';
import {
  CreateChannelInput,
  useCreateChannelMutation,
} from '../../../resolvers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { channelSchema } from '../../validations';
import { InviteUsersForm } from './InviteUser.form';

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createChannel } = useCreateChannelMutation();
  const userId = localStorage.getItem('uId');
  const [emails, setEmails] = useState<string[]>([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateChannelInput>({
    mode: 'all',
    resolver: yupResolver(channelSchema),
  });

  const toast = useToast();
  const handleUploadComplete = (fileUrl: string) => {
    setValue('photo', fileUrl);
  };

  useEffect(() => {
    if (userId) setValue('createdBy', userId);
  }, [userId]);

  const onUsersListUpdate = (updatedEmails: string[]) => {
    setValue('users', updatedEmails);
  };

  const onConfirm = useCallback(
    (data: CreateChannelInput) => {
      if (!userId) return;

      const payload = {
        ...data,
        createdBy: userId,
      };
      try {
        createChannel({
          payload,
          onCompleted: () => {
            toast({
              description: 'Channel created successfully',
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
    [onClose, userId]
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Channel"
      size="lg"
      body={
        <Stack>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
            gap={4}
          >
            <AvatarUploader onUploadComplete={handleUploadComplete} size="lg" />
            <FormInput
              label="Channel Name"
              placeholder="Enter Channel name"
              {...register('name')}
              error={errors.name?.message}
            />
          </Box>
          <Box mb={6} mt={6}>
            <FormInput
              label="Description"
              placeholder="Describe this channel"
              {...register('description')}
              error={errors.description?.message}
            />
          </Box>

          <InviteUsersForm onEmailsUpdate={onUsersListUpdate} />
          <SwitchInput
            label="Private Channel"
            {...register('isPrivate')}
            defaultChecked={false}
          />
          <SwitchInput
            label="Group Chat"
            {...register('isGroupChat')}
            defaultChecked={false}
          />
        </Stack>
      }
      loading={false}
      handleConfirm={handleSubmit(onConfirm, err => console.log(err))}
    />
  );
};
