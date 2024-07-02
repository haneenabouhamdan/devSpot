import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  FlexProps,
  Tooltip,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  title: string;
  description: string;
  active?: boolean;
  navSize: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  description = "",
  active = false,
  navSize,
  ...rest
}) => {
  return (
    <Flex
      mt={20}
      ml={navSize === "small" ? 0 : 10}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
      backgroundColor={"transparent"}
      border={0}
      {...rest}
    >
      <Menu placement="right">
        <Tooltip label={title} backgroundColor="white" className="light-purple" p={2} fontSize={"small"}>
          <Link
            backgroundColor={active ? "#7b4e7b" : "transparent"}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: "none", backgroundColor: "#7b4e7b" }}
            w={navSize === "large" ? "90%" : "auto"}
          >
            <MenuButton w="90%" border={0} backgroundColor={"transparent"}>
              <Flex
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Icon
                  as={icon}
                  fontSize="x-large"
                  alignItems={"center"}
                  color={"white"}
                />

                <Text
                  ml={10}
                  display={navSize === "small" ? "none" : "flex"}
                  color="white"
                  fontSize={"medium"}
                >
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        </Tooltip>
      </Menu>
    </Flex>
  );
};

export default NavItem;
