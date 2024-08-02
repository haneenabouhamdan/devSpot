import { Flex, HStack, VStack } from '@chakra-ui/react';
import Sidebar from './SideBar/Sidebar';
import Header from './Headers/Header';
import MessageInput from './Messages/MessageInput';
import MessageList from './Messages/MessagesList';
import './styles.scss';
import MainList from './Channels/MainList';
import { HeaderActions } from './Headers';
import { useState } from 'react';
import ChallengesList from './Challenges/Challenges.list';

export default function Home() {
  const [currentView, setCurrentView] = useState('Home');

  const messages = [
    {
      id: '1',
      name: 'Rick',
      avatarUrl: 'https://bit.ly/sage-adebayo',
      time: '2:28PM',
      message:
        'Hey everyone, just got off the phone with a new client. They want us to handle their accounting.',
      images: [],
      isOutgoing: true,
    },
    {
      id: '2',
      name: 'Ahmad',
      avatarUrl: 'https://bit.ly/dan-abramov',
      time: '2:45PM',
      message:
        'Great job, Rick! This is the perfect time to expand our client base.',
      images: [],
      isOutgoing: false,
    },
    {
      id: '3',
      name: 'Mo',
      avatarUrl: 'https://bit.ly/code-beast',
      time: '2:45PM',
      message: 'Great job, Rick! ',
      images: ['https://bit.ly/kent-c-dodds', 'https://bit.ly/kent-c-dodds'],
      isOutgoing: false,
    },
  ];

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
          <ChallengesList />
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
