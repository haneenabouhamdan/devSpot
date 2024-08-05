import './styles.scss';
import { ChannelList } from './Lists/Channels.list';
import { DmsList } from './Lists/Dms.list';
import { ChallengeList } from './Lists';
import { VscSignOut } from 'react-icons/vsc';
import { useAuthContext } from '../../../contexts';
import {
  Button,
  Icon,
  Box,
  Flex,
  Text,
  Avatar,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { UserProfileModal } from '../../modals';
import { useEffect } from 'react';
import { useGetProfileQuery } from '../../../resolvers';

interface Props {
  currentView: string;
  onSelectChannel: (channelId: string, channelName: string) => void;
  withLogout?: boolean;
}

const MainList: React.FC<Props> = ({
  currentView,
  onSelectChannel,
  withLogout = false,
}) => {
  const { onUserLogout } = useAuthContext();
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
        bg="white"
        width="40px"
        height="40px"
        src={user?.profilePicture || undefined}
      />

      <Text className="white slightly-bold" pl={4}>
        {user?.username}
      </Text>
    </Button>
  );
  return (
    <Box
      w="250px"
      className="channel-card"
      h="90vh"
      overflowY="auto"
      position="relative"
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={4}
        pb={withLogout ? 12 : 0}
      >
        {currentView === 'Home' && (
          <ChannelList onSelectChannel={onSelectChannel} />
        )}
        {(currentView === 'DMs' || currentView === 'Home') && (
          <DmsList onSelectChannel={onSelectChannel} />
        )}
        {(currentView === 'Challenges' || currentView === 'Home') && (
          <ChallengeList onSelectChallenge={onSelectChannel} />
        )}
      </Box>
      {withLogout && (
        <Flex position="absolute" bottom={0}>
          <HStack gap={2}>
            <UserProfileModal triggerButton={triggerButton} />
            <Button
              w="100%"
              border={0}
              backgroundColor={'transparent'}
              onClick={onUserLogout}
            >
              <Flex
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
              >
                <Icon
                  as={VscSignOut}
                  fontSize="x-large"
                  alignItems={'center'}
                  color={'white'}
                />
              </Flex>
            </Button>
          </HStack>
        </Flex>
      )}
    </Box>
  );
};

export default MainList;
