import React, { useState } from "react";
import { Box, Flex, Text, Icon, Collapse, Avatar } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import "./styles.scss";

interface DropdownItemProps {
  icon?: React.ElementType;
  label: string;
  link?: string;
  avatarSrc?: string;
  subItems?: DropdownItemProps[];
}
interface DropdownProps {
  title: string;
  items: DropdownItemProps[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  const renderItems = (items: DropdownItemProps[]) => {
    return items.map((item, index) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [subOpen, setSubOpen] = useState(true);

      return (
        <Box key={index} pl={5} pb={2}>
          <Flex
            align="center"
            py={1}
            className="dropdown-item"
            onClick={() => setSubOpen(!subOpen)}
            cursor="pointer"
          >
            {item.icon && <Icon as={item.icon} mr={2} fontSize={"large"} />}
            {item.avatarSrc && <Avatar src={item.avatarSrc} size="sm" mr={2} />}
            <Text>{item.label}</Text>
            {item.subItems && (
              <Icon as={subOpen ? ChevronDownIcon : ChevronRightIcon} ml="5" />
            )}
          </Flex>
          {item.subItems && (
            <Collapse in={subOpen}>
              <Box>{renderItems(item.subItems)}</Box>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  return (
    <Box w="100%">
      <Flex
        align="center"
        justify="space-between"
        onClick={() => setIsOpen(!isOpen)}
        cursor="pointer"
        p={2}
        className="dropdown-header"
      >
        <Text fontWeight="bold" height="fit-content">
          {title}
        </Text>
        <Icon as={isOpen ? ChevronDownIcon : ChevronRightIcon} />
      </Flex>
      <Collapse in={isOpen}>
        <Box>{renderItems(items)}</Box>
      </Collapse>
    </Box>
  );
};

export default Dropdown;
