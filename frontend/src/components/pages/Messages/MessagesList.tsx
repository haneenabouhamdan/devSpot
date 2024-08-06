import React, { useEffect, useState } from 'react';
import { VStack, Box, Spinner } from '@chakra-ui/react';
import InMessageCard from './InMessage';
import OutMessageCard from './OutMessage';
import { Message } from '../../../resolvers';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const userId = localStorage.getItem('uId');
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messages) setAllMessages(messages);
  }, [messages]);
  return (
    <VStack
      w={{ base: '100%', md: '98%' }}
      spacing={4}
      align="start"
      overflowY="scroll"
      className="message-list"
      p={{ base: 2, md: 4 }}
    >
      {!allMessages.length && <Spinner />}
      {allMessages.map((msg, index) => {
        const isOutgoing = msg.sender.id === userId;
        return (
          <Box
            key={msg.id || index}
            w="100%"
            mt={index === 0 ? 4 : 0}
            display="flex"
            justifyContent={isOutgoing ? 'flex-end' : 'flex-start'}
            p={1}
          >
            {isOutgoing ? (
              <OutMessageCard
                name={msg.sender?.username}
                avatarUrl={msg.sender?.profilePicture}
                time={msg.createdAt}
                message={msg.text}
              />
            ) : (
              <InMessageCard
                name={msg.sender.username}
                avatarUrl={msg.sender.profilePicture}
                time={msg.createdAt}
                message={msg.text}
              />
            )}
          </Box>
        );
      })}
    </VStack>
  );
};

export default MessageList;
