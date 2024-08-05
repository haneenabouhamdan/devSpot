import React from 'react';
import {
  Box,
  Avatar,
  Text,
  HStack,
  VStack,
  Image,
  useMediaQuery,
} from '@chakra-ui/react';
import { formatDate } from '../../../helpers';

interface MessageCardProps {
  name: string;
  avatarUrl?: string;
  time: string;
  message: string;
  attachments?: string[];
}

const OutMessageCard: React.FC<MessageCardProps> = ({
  name,
  avatarUrl = 'https://bit.ly/broken-link',
  time,
  message,
  attachments,
}) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const renderHTML = (html: string) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return Array.from(template.content.childNodes).map((node, index) => {
      if (node.nodeName === 'PRE') {
        return <></>;
      }
      return (
        <Box key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
      );
    });
  };

  return (
    <HStack
      maxW={isMobile ? '100%' : '42%'}
      alignItems="start"
      spacing={1}
      mr={isMobile ? '0' : '5%'}
      mt={isMobile ? '20px' : '0'}
      h={'fit-content'}
      position="relative"
      borderRadius="10px"
    >
      <Text
        fontSize={'small'}
        className="gray"
        pr={5}
        pt="10px"
        alignSelf="start"
      >
        {formatDate(new Date(time), 'HH:mm')}
      </Text>
      <Box
        pr={isMobile ? '20px' : '40px'}
        pt={0}
        w="100%"
        pl="10px"
        borderRadius="10px"
        className="bg-light-gray"
      >
        <VStack alignItems="start" spacing={2} w="100%" pr={4}>
          <Text
            fontWeight="bold"
            m={0}
            pt={2}
            pr={2}
            fontSize={{ base: 'small', md: '14px' }}
          >
            {name}
          </Text>
          <Text pt={0} pb={2} m={0} fontSize={'14px'}>
            {renderHTML(message)}
          </Text>
          {attachments && (
            <HStack spacing={2} pb={2} flexWrap="wrap">
              {attachments.map((imgUrl, index) => (
                <Image
                  key={index}
                  src={imgUrl}
                  alt={`image-${index}`}
                  boxSize="100px"
                  borderRadius="10px"
                />
              ))}
            </HStack>
          )}
        </VStack>
      </Box>
      <Avatar
        name={name}
        src={avatarUrl}
        position="absolute"
        borderRadius={'50%'}
        bg="white"
        width="50px"
        height="50px"
        top={isMobile ? '8px' : '-10px'}
        right={isMobile ? '-12px' : '-30px'}
        transform={isMobile ? 'translateY(-50%)' : 'none'}
        border="2px solid white"
      />
    </HStack>
  );
};

export default OutMessageCard;
