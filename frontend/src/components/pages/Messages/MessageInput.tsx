import React, { useState } from 'react';
import { Box, HStack, Input, IconButton } from '@chakra-ui/react';
import { ChatFilledIcon } from '../../common';
import { IoMdSend } from 'react-icons/io';
import './styles.scss';
import RichTextEditor from '../../common/RichTextEditor';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState<string>('');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setText(event.target.value);
  // };

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText(''); // Clear the input field after sending the message
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box
      position="fixed"
      display="flex"
      justifyContent="center"
      className="message-input"
    >
      <HStack alignItems="center" width="98%">
        {/* <IconButton
          aria-label="Chat"
          icon={ChatFilledIcon}
          bg={'transparent'}
          border={0}
          size="xl"
          ml="10"
        /> */}

        <RichTextEditor
          style={{
            width: '100%',
            fontSize: 'large',
            backgroundColor: 'white',
            boxShadow: 'none',
          }}
          value={text}
          handleKeyPress={handleKeyPress}
          onChange={handleChange}
        />
        {/* <Input
          placeholder="Message Channel..."
          height="80%"
          border={0}
          id="message-input"
          name="message"
          borderRadius={'5px'}
          fontSize={'large'}
          bgColor={'white'}
          pl={5}
          _placeholder={{ fontStyle: 'italic' }}
          _focus={{ border: 'none', boxShadow: 'none' }}
          flex="1"
          value={text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        /> */}
        <IconButton
          aria-label="Send"
          icon={<IoMdSend className="send-icon" />}
          bg={'transparent'}
          border={0}
          mt={'45px'}
          ml={-55}
          onClick={handleSubmit}
        />
      </HStack>
    </Box>
  );
};

export default MessageInput;
