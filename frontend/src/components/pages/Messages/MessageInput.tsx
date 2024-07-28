import React from 'react';
import { Box, HStack, Input, IconButton } from '@chakra-ui/react';
import { ChatFilledIcon } from '../../common';
import './styles.scss';
import { IoMdSend } from 'react-icons/io';

const MessageInput = () => {
  return (
    <Box
      position="fixed"
      display="flex"
      justifyContent="flex-start"
      className="message-input"
    >
      <HStack spacing={10} alignItems="center" width="98%">
        <IconButton
          aria-label="Home"
          icon={<img src={ChatFilledIcon} alt="chat" className="nav-icon" />}
          bg={'transparent'}
          border={0}
          size="xl"
          ml="10"
        />
        <Input
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
        />
        <IconButton
          aria-label="Send"
          icon={<IoMdSend className="send-icon" />}
          bg={'transparent'}
          border={0}
          pr={25}
          borderRadius="full"
        />
      </HStack>
    </Box>
  );
};

export default MessageInput;
