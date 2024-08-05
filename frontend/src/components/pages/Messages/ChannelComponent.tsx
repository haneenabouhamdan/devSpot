import React, { useEffect, useState } from 'react';
import WebSocketService from '../../../resolvers/websoket/websocket.service';
import MessageInput from './MessageInput';
import MessageList from './MessagesList';
import {
  Flex,
  Box,
  Text,
  Image,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react';
import { Message, useChannelDetails } from '../../../resolvers';
import { useUserDetails } from '../../../resolvers/user/get-user.service';
import NewsIllustration from '../../../assets/illustrations/news.svg';
import GroupChatIllustration from '../../../assets/illustrations/community.svg';

interface MessageComponentProps {
  channelId: string;
  channelName: string;
}

const ChannelComponent: React.FC<MessageComponentProps> = ({
  channelId,
  channelName,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const userId = localStorage.getItem('uId');
  const userDetails = useUserDetails(String(userId));
  const { data } = useChannelDetails(channelId);

  useEffect(() => {
    if (data?.messages)
      setMessages(prevMessages => [...prevMessages, ...data.messages]);
  }, [data?.messages]);

  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected to WebSocket server');
      WebSocketService.joinChannel(channelId);
    };

    const handleDisconnect = () => {
      console.log('Disconnected from WebSocket server');
    };

    const handleMessage = (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };

    WebSocketService.onConnect(handleConnect);
    WebSocketService.onDisconnect(handleDisconnect);
    WebSocketService.onMessage(handleMessage);

    return () => {
      WebSocketService.socket.off('connect', handleConnect);
      WebSocketService.socket.off('disconnect', handleDisconnect);
      WebSocketService.socket.off('msgToClient', handleMessage);
    };
  }, [channelId]);

  const handleSendMessage = (text: string) => {
    if (!userDetails.data) return;
    const message: Message = {
      senderId: String(userId || userDetails.data.id),
      channelId: channelId,
      text: text,
      createdAt: new Date().toISOString(),
      sender: userDetails.data,
    };

    WebSocketService.sendMessage(message);
  };
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const icon = channelName.includes('news')
    ? NewsIllustration
    : GroupChatIllustration;

  return (
    <Flex direction="column" width="100%" height="100vh">
      <Box
        position="fixed"
        top={0}
        width="100%"
        bg="white"
        borderBottomWidth={1}
        padding={2}
        zIndex={1}
        pl={10}
        textAlign="start"
      >
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="bold"
          color="purple.300"
        >
          {channelName}
        </Text>
      </Box>
      <Box flex="1" overflow="hidden" marginTop={{ base: '50px', md: '60px' }}>
        <Flex direction="column" height="100%">
          <Box flex="1" overflow="auto" pb={isMobile ? 20 : 4}>
            {messages.length ? (
              <MessageList messages={messages} />
            ) : (
              <VStack gap={10} justifySelf={'center'} mt={'10%'}>
                <Image
                  src={icon}
                  alt="empty"
                  boxSize={{ base: '50%', md: '30%' }}
                />
                <Text
                  color={'orange.300'}
                  fontSize={{ base: 'md', md: 'lg' }}
                  fontWeight={'bold'}
                >
                  Let's start chatting!!
                </Text>
              </VStack>
            )}
          </Box>
          <Box height={{ base: '20%', md: '15%' }}>
            <MessageInput
              onSendMessage={handleSendMessage}
              channelName={channelName}
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChannelComponent;
