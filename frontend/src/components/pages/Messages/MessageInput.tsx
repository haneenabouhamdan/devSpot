import React, { useState } from 'react';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import './styles.scss';
import RichTextEditor from '../../common/RichTextEditor';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  channelName?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  channelName,
}) => {
  const [text, setText] = useState<string>('');

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent newline on Enter key press
      handleSubmit();
    }
  };

  return (
    <Box
      position="fixed"
      className="message-input"
      width={{ base: '100%', md: '75%' }}
      bg="white"
      p={{ base: 2, md: 4 }}
    >
      <HStack alignItems="center" width="100%">
        <RichTextEditor
          style={{
            width: '100%',
            fontSize: 'large',
            backgroundColor: 'white',
            boxShadow: 'none',
          }}
          value={text}
          handleKeyPress={handleKeyPress}
          placeholder={`Message ${channelName ?? ''}...`}
          onChange={handleChange}
        />
        <IconButton
          aria-label="Send"
          icon={<IoMdSend className="send-icon" />}
          bg={'transparent'}
          border={0}
          mt={{ base: '70px', md: '45px' }}
          ml={'-55px'}
          onClick={handleSubmit}
        />
      </HStack>
    </Box>
  );
};

export default MessageInput;
