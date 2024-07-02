import { Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import "./styles.scss";
import SearchInput from "../../components/common/SearchInput";
import { useWindowSize } from "../Hooks";

const Header = () => {
  const { isPhone } = useWindowSize();
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      className={`main-header ${!isPhone ? "mobile" : ""}`}
    >
      <SearchInput />
      <IconButton
        aria-label="Settings"
        icon={<IoLogOutOutline />}
        bg="transparent"
        color="white"
        border={0}
        fontSize={"x-large"}
      />
    </Flex>
  );
};
export default Header;
