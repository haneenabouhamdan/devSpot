import React, { useEffect, useState } from 'react';
import {
  Flex,
  HStack,
  Avatar,
  Text,
  Button,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import {
  IoChatbubblesOutline,
  IoBookmarkOutline,
  IoRocketOutline,
} from 'react-icons/io5';
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
    <Flex className={'sidebar'}>
      <Flex className="nav-container" as="nav">
        <VStack pt={8}>
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
          <Stack mt={2} mb={2}>
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
        </VStack>
      </Flex>
      <HStack className={`user`} pb={5} justifyContent={'center'}>
        <UserProfileModal triggerButton={triggerButton} />
      </HStack>
    </Flex>
  );
};

export default Sidebar;
