import React from "react";
import {
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { AvatarUploader, CustomModal, FormInput, SwitchInput, } from "../common";

export const UserProfileModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSave = () => {
    // Add save logic here
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Edit Profile</Button>
      <CustomModal isOpen={isOpen} onClose={onClose} title="Edit Profile" onSave={handleSave} size="md">
        <Box mb={4}>
          <FormInput label="Username" placeholder="Enter your username" />
        </Box>
        <Box mb={4}>
          <FormInput label="Bio" placeholder="Enter your bio" />
        </Box>
        <Box mb={4}>
          <FormInput label="Job Title" placeholder="Enter your job title" />
        </Box>
        <Box mb={4}>
          <AvatarUploader  />
        </Box>
        <Box mb={4}>
          <FormInput label="Date of Birth" placeholder="YYYY-MM-DD" type="date" />
        </Box>
        <Box mb={4}>
          <SwitchInput label="Notifications Paused" />
        </Box>
      </CustomModal>
    </>
  );
};
