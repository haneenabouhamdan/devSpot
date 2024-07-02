import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import InMessageCard from "./InMessage";
import OutMessageCard from "./OutMessage";

interface Message {
  id: string;
  name: string;
  avatarUrl: string;
  time: string;
  message: string;
  images?: string[];
  isOutgoing?: boolean;
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
      maxH="70vh"
      className="message-list"
    >
      {messages.map((msg) => (
        <Box key={msg.id} w="100%" gap={2} mt={10}  display="flex" justifyContent={msg.isOutgoing ? "flex-end" : "flex-start"}>
        {msg.isOutgoing ? <OutMessageCard {...msg} /> : <InMessageCard {...msg} />}
      </Box>
      ))}
    </VStack>
  );
};

export default MessageList;
