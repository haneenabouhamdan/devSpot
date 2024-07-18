import React, { ChangeEvent, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  TabIndicator,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  AvatarUploader,
  CustomModal,
  FormInput,
  SwitchInput,
} from '../../common';
import { useGetProfileQuery } from '../../../resolvers';
import { updateUserSchema } from '../../validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../../../resolvers/user/update-user.service';
import { UpdateUserInput } from '../../../resolvers/user/Queries';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

interface UserProfileModalProps {
  navSize: string;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  navSize,
}) => {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getCurrentUser, user } = useGetProfileQuery();
  const { updateUser, isUserUpdated } = useUpdateUserMutation();

  const openModal = () => {
    onOpen();
    getCurrentUser();
  };

  function onPhoneChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    const phone = value.includes('+') ? value : `+${value}`;
    setValue('phoneNumber', phone);
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({
    mode: 'all',
    // resolver: yupResolver(updateUserSchema),
  });

  async function onConfirm(data: UpdateUserInput) {
    if (!user?.id) return;

    await updateUser({
      ...data,
      id: user.id,
    });

    if (isUserUpdated) {
      onClose();
    }
  }

  const handleUploadComplete = (fileUrl: string) => {
    setValue('profilePicture', fileUrl);
  };

  return (
    <>
      <Button
        onClick={openModal}
        backgroundColor={'transparent'}
        pl={0}
        _hover={{ backgroundColor: 'transparent' }}
      >
        <Avatar borderRadius="50%" bg="gray" width="40px" height="40px" />
        {navSize === 'large' && (
          <Text className="white slightly-bold" pl={2}>
            {user?.username}
          </Text>
        )}
      </Button>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Profile"
        size="lg"
        onSave={handleSubmit(onConfirm)}
        loading={isSubmitting}
      >
        <Tabs position="relative" variant="unstyled" mt="1em">
          <TabList mb="1em">
            <Tab>Personal info</Tab>
            <Tab>About</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabIndicator
            mt="-20px"
            height="2px"
            bg="#f4a261"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel padding="10">
              <Box
                mb={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <AvatarUploader onUploadComplete={handleUploadComplete} />
              </Box>
              <Box mb={6}>
                <FormInput
                  label="Username"
                  placeholder="Enter your username"
                  contentEditable={true}
                  {...register('username')}
                  error={errors.username?.message}
                />
              </Box>
              <Box mb={6}>
                <FormInput
                  label="Date Of Birth"
                  type="date"
                  placeholder="Date of birth"
                  {...register('dateOfBirth')}
                  error={errors.dateOfBirth?.message}
                />
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={6}>
                <FormInput
                  label="Email Address"
                  placeholder="Enter your email address..."
                  type="text"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <FormInput
                  label="Phone Number"
                  type="text"
                  placeholder="Enter your phone number..."
                  {...register('phoneNumber')}
                  onChange={onPhoneChange}
                  error={errors.phoneNumber?.message}
                />
              </Box>
            </TabPanel>
            <TabPanel padding="10">
              <Box mb={8}>
                <FormInput
                  label="Bio"
                  placeholder="Enter your bio"
                  {...register('bio')}
                  error={errors.bio?.message}
                />
              </Box>
              <Box mb={4}>
                <FormInput
                  label="Job Title"
                  placeholder="Enter your job title"
                  {...register('jobTitle')}
                  error={errors.jobTitle?.message}
                />
              </Box>
            </TabPanel>
            <TabPanel padding="10">
              <Box mb={8} gap={4} display={'flex'} flexDirection={'column'}>
                <Button
                  colorScheme="orange.300"
                  width={'fit-content'}
                  variant="outline"
                  onClick={() => setChangePassword(!changePassword)}
                >
                  Change Password
                </Button>
                {changePassword && (
                  <Box m={'5'}>
                    <FormInput
                      label="Current Password*"
                      type="password"
                      // error={errors.password?.message}
                    />

                    <FormInput
                      label="New Password*"
                      type="password"
                      // {...register("password")}
                      // error={errors.password?.message}
                    />
                    <FormInput
                      label="Confirm New  Password*"
                      type="password"
                      // {...register("confirmPassword")}
                      // error={errors.confirmPassword?.message}
                    />

                    <Flex justifyContent={'flex-end'} mt={3}>
                      <Button
                        bgColor="#f4a261"
                        color="white"
                        size={'sm'}
                        onClick={() => setChangePassword(!changePassword)}
                      >
                        Save Password
                      </Button>
                    </Flex>
                  </Box>
                )}
              </Box>

              <SwitchInput
                label="Pause Notifications"
                contentEditable={true}
                {...register('notificationPaused')}
                defaultChecked={!!user?.notificationPaused}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CustomModal>
    </>
  );
};
