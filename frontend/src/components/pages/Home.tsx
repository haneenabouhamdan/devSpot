import { Flex, HStack, VStack } from '@chakra-ui/react';
import Sidebar from './SideBar/Sidebar';
import './styles.scss';
import MainList from './Channels/MainList';
import { HeaderActions } from './Headers';
import { useState } from 'react';
import ChallengesList from './Challenges/Challenges.list';
import MessageComponent from './Messages/MessageComponent';

export default function Home() {
  const [currentView, setCurrentView] = useState('Home');

  const userId = localStorage.getItem('uId');

  return (
    <Flex w="100%" h="100vh" overflow="hidden">
      <Flex borderRight={{ md: '0px solid #e6e6e6' }}>
        <Sidebar setCurrentView={setCurrentView} currentView={currentView} />
      </Flex>
      <Flex>
        <HStack className="list-container" p={2}>
          <VStack>
            <HeaderActions currentView={currentView} />
            <MainList currentView={currentView} />
          </VStack>
        </HStack>
      </Flex>
      <Flex
        className="channel-content"
        flex="1"
        w={{ base: '100%', md: '70%' }}
      >
        {/* <MessageInput /> */}
        <Flex width="100%">
          {/* <ChallengesList /> */}
          <MessageComponent
            userId={String(userId)}
            channelId={'42a873a0-2d68-4df0-8227-85e3b17542a8'}
          />
          {/* <MessageList messages={messages} /> */}
        </Flex>
      </Flex>
      {/* 
      <Flex flex="1" flexDirection="column">
        <Flex
          flex="1"
          className="bg-purple"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Flex
            className="list-container"
            p={4}
            w={{ base: '100%', md: '20%' }}
          >
            <VStack>
              <HeaderActions />
              <MainList />
            </VStack>
          </Flex>
          <Flex
            className="channel-content"
            flex="1"
            w={{ base: '100%', md: '70%' }}
          >
            <MessageInput />
            <Flex mt={100} width="100%">
             <ChallengesList />
              <MessageList messages={messages} />
            </Flex>
          </Flex>
        </Flex>
      </Flex> */}
    </Flex>
  );
}
