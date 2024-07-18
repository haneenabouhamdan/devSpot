import { Flex } from '@chakra-ui/react';
import Sidebar from './SideBar/Sidebar';
import Header from './Headers/Header';
import ChannelList from './Channels/ChannelsList';
import MessageInput from './Messages/MessageInput';
import MessageList from './Messages/MessagesList';
import './styles.scss';

export default function Home() {
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
    <Flex
      w="100%"
      h="100vh"
      overflow="hidden"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Flex borderRight={{ md: '0px solid #e6e6e6' }}>
        <Sidebar />
      </Flex>
      <Flex flex="1" flexDirection="column">
        <Header />
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
            <ChannelList />
          </Flex>
          <Flex
            className="channel-content"
            flex="1"
            w={{ base: '100%', md: '70%' }}
          >
            <MessageInput />
            <Flex mt={100} width="100%">
              <MessageList messages={messages} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
