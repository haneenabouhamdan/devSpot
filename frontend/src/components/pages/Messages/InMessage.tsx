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
    >
      <Avatar
        name={name}
        src={avatarUrl}
        position="absolute"
        borderRadius={"50%"}
        width="50px"
        height="50px"
        top={isMobile ? "-30px" : "-10px"}
        left={isMobile ? "50%" : "-30px"}
        transform={isMobile ? "translateX(-50%)" : "none"}
        border="2px solid white"
      />
      <Box pl={"1vw"} pt={0} w="100%" pr="10px">
        <VStack alignItems="start" spacing={2} w="100%" pl={4}>
          <Text fontWeight="bold" pt={2} m={0}>
            {name}
          </Text>
          <Text pt={0} pb={2} m={0} fontSize={"14px"}>
            {message}
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
