import React from 'react';
import { VStack, Box } from '@chakra-ui/react';
import InMessageCard from './InMessage';
import OutMessageCard from './OutMessage';

interface Message {
  text: string;
  attachments?: string[];
  senderId: string;
  channelId: string;
  createdAt: string;
  // messageReactions: {
  //   emoji: string;
  // }[];
  // sender: {
  //   profilePicture: string;
  //   phoneNumber: string;
  //   username: string;
  // };
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <VStack
      w="100%"
      spacing={10}
      align="start"
      overflowY="scroll"
      className="message-list"
    >
      {messages.map((msg, index) => {
        const isOutgoing = msg.senderId === localStorage.getItem('uId');
        return (
          <Box
            key={new Date().toDateString()}
            w="100%"
            mt={index === 0 ? 10 : 0}
            display="flex"
            justifyContent={isOutgoing ? 'flex-end' : 'flex-start'}
          >
            {isOutgoing ? (
              <OutMessageCard
                name={'haneen'}
                avatarUrl={''}
                time={msg.createdAt}
                message={msg.text}
              />
            ) : (
              <InMessageCard
                name={'haneen'}
                avatarUrl={''}
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
