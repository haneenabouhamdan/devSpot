import {
  Flex,
  HStack,
  VStack,
  Spinner,
  Center,
  Image,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Button,
  Box,
} from '@chakra-ui/react';
import Sidebar from './SideBar/Sidebar';
import './styles.scss';
import MainList from './Channels/MainList';
import { HeaderActions } from './Headers';
import { useState } from 'react';
import ChannelComponent from './Messages/ChannelComponent';
import ChallengesComponent from './Challenges/ChallengeComponent';
import WelcomeIcon from '../../assets/illustrations/welcome.svg';
import { useMediaQuery } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Home() {
  const [currentView, setCurrentView] = useState('Home');
  const [loading, setLoading] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<{
    channelId: string;
    channelName: string;
    channelDesc?: string;
  } | null>();

  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelectChannel = (
    channelId: string,
    channelName: string,
    channelDesc?: string
  ) => {
    setLoading(true);
    if (channelId === 'challengeId') {
      setSelectedChannel(null);
      setSelectedChallenge(channelName);
    } else {
      setSelectedChannel({ channelId, channelName, channelDesc });
      setSelectedChallenge('');
    }

    setTimeout(() => setLoading(false), 500);
  };

  return (
    <Flex w="100%" h="100vh" overflow="hidden">
      {!isMobile && (
        <>
          <Flex borderRight={{ md: '0px solid #e6e6e6' }} zIndex={2000}>
            <Sidebar
              setCurrentView={setCurrentView}
              currentView={currentView}
              handleNotificationClick={(
                channelId: string,
                channelName?: string,
                channelDecs?: string
              ) =>
                setSelectedChannel({
                  channelId,
                  channelName: channelName ?? '',
                  channelDesc: channelDecs ?? '',
                })
              }
            />
          </Flex>
          <Flex>
            <HStack className="list-container" p={2}>
              <VStack>
                <HeaderActions currentView={currentView} />
                <MainList
                  currentView={currentView}
                  onSelectChannel={handleSelectChannel}
                />
              </VStack>
            </HStack>
          </Flex>
        </>
      )}
      {isMobile && (
        <>
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            zIndex="1000"
            boxShadow="md"
            pl={2}
            pr={2}
            bg={'purple.300'}
          >
            <HStack justifyContent="space-between">
              <Button
                onClick={onOpen}
                borderRadius="10%"
                width="30px"
                height="40px"
                bg={'#9b6f9b'}
              >
                <HamburgerIcon w={6} h={6} color={'white'} />
              </Button>
              <HeaderActions currentView={currentView} />
            </HStack>
          </Box>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={'purple.300'} maxWidth="70%">
              <DrawerCloseButton color={'white'} />
              <DrawerBody mt={6}>
                <HStack>
                  <VStack>
                    <MainList
                      currentView={currentView}
                      onSelectChannel={handleSelectChannel}
                      withLogout={true}
                    />
                  </VStack>
                </HStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
      <Flex
        className="channel-content"
        flex="1"
        w={{ base: '100%', md: '70%' }}
        justifyContent="center"
        mt={isMobile ? '60px' : '0'}
      >
        {loading ? (
          <Center w="100%" h="100%">
            <Spinner size="xl" />
          </Center>
        ) : !!selectedChannel?.channelId && !selectedChallenge ? (
          <Flex width="100%" id={selectedChannel.channelId}>
            <ChannelComponent
              channelId={selectedChannel.channelId}
              channelName={selectedChannel.channelName}
              channelDesc={selectedChannel.channelDesc}
            />
          </Flex>
        ) : (
          !!selectedChallenge && (
            <ChallengesComponent filter={selectedChallenge} />
          )
        )}

        {!loading && !selectedChallenge && !selectedChannel && (
          <Image
            src={WelcomeIcon}
            alt="welcome"
            boxSize={'50%'}
            justifyContent={'center'}
            alignSelf={'center'}
          />
        )}
      </Flex>
    </Flex>
  );
}
