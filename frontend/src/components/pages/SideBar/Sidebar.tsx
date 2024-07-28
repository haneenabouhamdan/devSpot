import React, { useEffect, useState } from 'react';
import {
  Flex,
  HStack,
  IconButton,
  Avatar,
  Text,
  Button,
  Box,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FiHome, FiSettings } from 'react-icons/fi';
import {
  IoChatbubblesOutline,
  IoBookmarkOutline,
  IoRocketOutline,
} from 'react-icons/io5';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { BsPinAngle, BsBell } from 'react-icons/bs';
import NavItem from './NavItem';
import './styles.scss';
import { UserProfileModal } from '../../modals';
import { useGetProfileQuery } from '../../../resolvers';
import NotificationPopover from '../../modals/notifications/Notifications.modal';

const Sidebar: React.FC = () => {
  const [navSize, setNavSize] = useState<'small' | 'large'>('small');
  const { getCurrentUser, user } = useGetProfileQuery();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser, user]);

  const toggleNavSize = () => {
    setNavSize(prevSize => (prevSize === 'small' ? 'large' : 'small'));
  };

  const triggerButton = (
    <Button
      backgroundColor={'transparent'}
      pl={0}
      _hover={{ backgroundColor: 'transparent' }}
    >
      <Avatar
        borderRadius="50%"
        bg="gray"
        width="40px"
        height="40px"
        src={user?.profilePicture || undefined}
      />
      {navSize === 'large' && (
        <Text className="white slightly-bold" pl={4}>
          {user?.username}
        </Text>
      )}
    </Button>
  );

  return (
    <Flex className={`sidebar ${navSize}`}>
      <Flex className="nav-container" as="nav">
        <HStack className={`user`}>
          <UserProfileModal navSize={navSize} triggerButton={triggerButton} />
        </HStack>
        <VStack>
          <NavItem
            navSize={navSize}
            icon={FiHome}
            title="Home"
            description="This is the description for the dashboard."
          />
          <NavItem
            navSize={navSize}
            icon={IoChatbubblesOutline}
            title="DMs"
            description={''}
          />
          <Stack mt={5} mb={5}>
            <NotificationPopover />
          </Stack>
          <NavItem
            navSize={navSize}
            icon={IoRocketOutline}
            title="Challenges"
            description={''}
          />
          <NavItem
            navSize={navSize}
            icon={IoBookmarkOutline}
            title="Saved"
            description={''}
          />
          <NavItem
            navSize={navSize}
            icon={BsPinAngle}
            title="Pinned"
            description={''}
          />
          <NavItem
            navSize={navSize}
            icon={FiSettings}
            title="Settings"
            description={''}
          />
        </VStack>
      </Flex>
      {navSize !== 'large' ? (
        <IconButton
          background="none"
          border={0}
          mb="10"
          _hover={{ background: 'none' }}
          icon={
            <MdOutlineKeyboardDoubleArrowRight size={'25px'} color="white" />
          }
          aria-label="Toggle Navigation Size"
          onClick={toggleNavSize}
        />
      ) : (
        <IconButton
          background="none"
          border={0}
          mb="10"
          _hover={{ background: 'none' }}
          icon={
            <MdOutlineKeyboardDoubleArrowLeft size={'25px'} color="white" />
          }
          aria-label="Toggle Navigation Size"
          onClick={toggleNavSize}
        />
      )}
    </Flex>
  );
};

export default Sidebar;
