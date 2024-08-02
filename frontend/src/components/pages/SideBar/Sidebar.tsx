import React, { useEffect, useState } from 'react';
import {
  Flex,
  HStack,
  Avatar,
  Text,
  Button,
  Stack,
  VStack,
  IconButton,
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
import { useAuthContext } from '../../../contexts';
import { VscSignOut } from 'react-icons/vsc';

interface Props {
  setCurrentView: (input: string) => void;
  currentView: string;
}
const Sidebar = (props: Props) => {
  const { currentView, setCurrentView } = props;
  const [navSize, setNavSize] = useState<'small' | 'large'>('small');
  const { getCurrentUser, user } = useGetProfileQuery();
  const { onUserLogout } = useAuthContext();

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
        <VStack pb={8} pt={2}>
          <NavItem
            navSize={navSize}
            icon={FiHome}
            title="Home"
            isActive={currentView === 'Home'}
            description="This is the description for the dashboard."
            onClick={() => setCurrentView('Home')}
          />
          <NavItem
            navSize={navSize}
            icon={IoChatbubblesOutline}
            title="DMs"
            isActive={currentView === 'DMs'}
            description={''}
            onClick={() => setCurrentView('DMs')}
          />

          <NavItem
            navSize={navSize}
            icon={IoRocketOutline}
            title="Challenges"
            description={''}
            isActive={currentView === 'Challenges'}
            onClick={() => setCurrentView('Challenges')}
          />
          <Stack mt={2} mb={2}>
            <NotificationPopover />
          </Stack>
          <NavItem
            navSize={navSize}
            icon={IoBookmarkOutline}
            title="Saved"
            isActive={currentView === 'Saved'}
            description={''}
            onClick={() => setCurrentView('Saved')}
          />
        </VStack>
      </Flex>
      <HStack className={`user`} pb={5} justifyContent={'center'}>
        <VStack>
          <Flex pb={4}>
            <NavItem
              navSize={navSize}
              icon={VscSignOut}
              title="Logout"
              isActive={currentView === 'Logout'}
              description={''}
              onClick={onUserLogout}
            />
          </Flex>
          <Flex ml={4}>
            <UserProfileModal triggerButton={triggerButton} />
          </Flex>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default Sidebar;
