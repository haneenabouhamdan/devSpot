import { Flex } from '@chakra-ui/layout';
import MessageInput from '../Messages/MessageInput';
import MessageList from '../Messages/MessagesList';

interface ChannelProps {
  channelId: string;
}

export const ChannelComponent = (props: ChannelProps) => {
  return (
    <Flex className="channel-content" flex="1" w={{ base: '100%', md: '70%' }}>
      <MessageInput />
      <Flex mt={100} width="100%">
        {/* <MessageList messages={messages} /> */}
      </Flex>
    </Flex>
  );
};
