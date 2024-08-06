import React, { useCallback, useEffect } from 'react';
import { Box, Stack, useToast } from '@chakra-ui/react';
import { CustomModal, FormInput } from '../../common';
import {
  CreateDMChannelInput,
  NotificationDto,
  NotificationStatus,
  useCreateDMChannelMutation,
} from '../../../resolvers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { dmChannelSchema } from '../../validations';
import { InviteUsersForm } from './InviteUser.form';
import WebSocketService from '../../../resolvers/websoket/websocket.service';

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddFriendModal: React.FC<CreateChannelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createDMChannel } = useCreateDMChannelMutation();
  const userId = localStorage.getItem('uId');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateDMChannelInput>({
    mode: 'all',
    resolver: yupResolver(dmChannelSchema),
  });

  const toast = useToast();

  const handleSendNotifications = (notification: NotificationDto) => {
    const message: NotificationDto = {
      ...notification,
      messageId: null,
      createdAt: new Date().toISOString(),
    };

    WebSocketService.sendNotification(message);
  };
  useEffect(() => {
    if (userId) setValue('createdBy', userId);
  }, [userId]);

  const onUsersListUpdate = (updatedEmails: string[]) => {
    setValue('users', updatedEmails);
  };

  const onConfirm = useCallback(
    (data: CreateDMChannelInput) => {
      if (!userId) return;

      const payload = {
        ...data,
        createdBy: userId,
      };
      try {
        createDMChannel({
          payload,
          onCompleted: data => {
            toast({
              description: 'DM created successfully',
              status: 'success',
              duration: 2000,
              position: 'top-right',
              isClosable: true,
            });
            handleSendNotifications({
              text: `You have a new channel invitation`,
              title: `New Invitation`,
              channelId: data.createDmChannel.id,
              userId,
              messageId: null,
              createdAt: new Date().toISOString(),
              status: NotificationStatus.PENDING,
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
      title="Add Friend"
      size="lg"
      body={
        <Stack>
          <Box mb={6} mt={6}>
            <FormInput
              label="Invitation Message"
              placeholder=""
              {...register('description')}
              error={errors.description?.message}
            />
          </Box>

          <InviteUsersForm onEmailsUpdate={onUsersListUpdate} />
        </Stack>
      }
      loading={false}
      handleConfirm={handleSubmit(onConfirm, err => console.log(err))}
    />
  );
};
