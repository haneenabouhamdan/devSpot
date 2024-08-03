import React, { useEffect, useState } from 'react';
import WebSocketService from '../../../resolvers/websoket/websocket.service';
import MessageInput from './MessageInput';
import MessageList from './MessagesList';
import { useAuthContext } from '../../../contexts';
import { Flex, Box, Text } from '@chakra-ui/layout';

interface MessageComponentProps {
  userId: string;
  channelId: string;
  channelName: string; // Add channelName prop
}

interface MessagePayload {
  id: string;
  senderId: string;
  channelId: string;
  text: string;
  createdAt: string;
  // sender: { username: string; profilePicture: string; phoneNumber: string };
  // messageReactions: { emoji: string }[];
}

const MessageComponent: React.FC<MessageComponentProps> = ({
  userId,
  channelId,
  channelName,
}) => {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    WebSocketService.onConnect(() => {
      console.log('Connected to WebSocket server');
      WebSocketService.joinChannel(channelId);
    });

    WebSocketService.onDisconnect(() => {
      console.log('Disconnected from WebSocket server');
    });

    WebSocketService.onMessage((message: MessagePayload) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
  }, [channelId]);

  const handleSendMessage = (text: string) => {
    const message: any = {
      senderId: userId,
      channelId: channelId,
      text: text,
      createdAt: new Date(),
      // sender: {
      //   username: user?.username ?? 'Haneen',
      //   profilePicture: user?.profilePicture ?? 'https://bit.ly/sage-adebayo',
      //   phoneNumber: user?.phoneNumber ?? '971505574493',
      // }, // Replace with actual sender info
      // messageReactions: [],
    };

    WebSocketService.sendMessage(message);
  };

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
        <Text fontSize="lg" fontWeight="bold" color="orange.300">
          ded
        </Text>
      </Box>
      <Box flex="1" overflow="hidden" marginTop="60px">
        <Flex direction="column" height="100%">
          <Box flex="1" overflow="auto" pb={2}>
            <MessageList messages={messages} />
          </Box>
          <Box height="15%">
            <MessageInput onSendMessage={handleSendMessage} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MessageComponent;
