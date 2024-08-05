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

interface InMessageCardProps {
  name: string;
  avatarUrl?: string;
  time: string;
  message: string;
  images?: string[];
}

const InMessageCard: React.FC<InMessageCardProps> = ({
  name,
  avatarUrl,
  time,
  message,
  images,
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
      alignItems="start"
      spacing={1}
      ml={isMobile ? '0' : '5%'}
      mt={isMobile ? '20px' : '0'}
      h={'fit-content'}
      position="relative"
      borderRadius="10px"
      className="bg-light-gray"
    >
      <Avatar
        name={name}
        src={avatarUrl}
        bg="white"
        position="absolute"
        borderRadius={'50%'}
        width="50px"
        height="50px"
        top={isMobile ? '-25px' : '-10px'}
        left={isMobile ? '-10px' : '-30px'}
        transform={isMobile ? 'none' : 'none'}
        border="2px solid white"
      />
      <Box
        pl={isMobile ? '30px' : '1vw'}
        pt={0}
        w="100%"
        pr="10px"
        minW={'200px'}
      >
        <VStack alignItems="start" spacing={2} w="100%" pl={4}>
          <Text
            fontWeight="bold"
            pt={2}
            m={0}
            fontSize={{ base: 'small', md: '14px' }}
          >
            {name}
          </Text>
          <Text pt={0} pb={2} m={0} fontSize={'14px'}>
            {renderHTML(message)}
          </Text>
          {images && (
            <HStack spacing={2} pb={2}>
              {images.map((imgUrl, index) => (
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
      <Text
        fontSize={'small'}
        className="gray"
        position="absolute"
        right={'-50px'}
        top="10px"
      >
        {formatDate(new Date(time), 'HH:mm')}
      </Text>
    </HStack>
  );
};

export default InMessageCard;
