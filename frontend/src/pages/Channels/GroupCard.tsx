import { HStack, Box } from "@chakra-ui/layout";
import { Text, Avatar, AvatarGroup } from "@chakra-ui/react";
import "./styles.scss";

const GroupCard = () => {
  return (
    <HStack gap={6} px={10} className="channel-card bg-light-purple">
  
      <AvatarGroup size="md" max={2} width="70px">
        <Avatar
          name="Ryan Florence"
          width="25px"
          borderRadius="50%"
          src="https://bit.ly/ryan-florence"
        />
        <Avatar
          name="Segun Adebayo"
          width="25px"
          borderRadius="50%"
          src="https://bit.ly/sage-adebayo"
        />
      </AvatarGroup>
      <Box  justifyContent="center">
        <Text lineHeight="1" noOfLines={1}>
          Tech Team
        </Text>
      </Box>
    </HStack>
  );
};
export default GroupCard;
