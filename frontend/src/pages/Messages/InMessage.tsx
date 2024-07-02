import React from "react";
import {
  Box,
  Avatar,
  Text,
  HStack,
  VStack,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";

interface InMessageCardProps {
  name: string;
  avatarUrl: string;
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
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <HStack
      maxW={isMobile ? "100%" : "42%"}
      alignItems="start"
      spacing={1}
      ml={isMobile ? "0" : "5%"}
      mt={isMobile ? "20px" : "0"}
      h={"fit-content"}
      position="relative"
      borderRadius="10px"
      className="bg-light-gray"
      p={4}
    >
      <Avatar
        name={name}
        src={avatarUrl}
        position="absolute"
        borderRadius={"50%"}
        width="60px"
        top={isMobile ? "-30px" : "-10px"}
        left={isMobile ? "50%" : "-30px"}
        transform={isMobile ? "translateX(-50%)" : "none"}
        border="2px solid white"
      />
      <Box pl={isMobile ? "0" : "40px"} pt={0} w="100%" pr="10px">
        <VStack alignItems="start" spacing={2} w="100%">
          <Text fontWeight="bold" py={10} m={0}>
            {name}
          </Text>
          <Text pt={0} pb={4} m={0} fontSize={"14px"}>
            {message}
          </Text>
          {images && (
            <HStack spacing={2} pb={4}>
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
        fontSize={"small"}
        className="gray"
        position="absolute"
        right={isMobile ? "0" : "-60px"}
        top="10px"
      >
        {time}
      </Text>
    </HStack>
  );
};

export default InMessageCard;
