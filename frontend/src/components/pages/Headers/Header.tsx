import { Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import "./styles.scss";
import SearchInput from "../../common/SearchInput";
import { useWindowSize } from "../../../hooks";
import { useAuthContext } from "../../../contexts";

const Header = () => {
  const { isPhone } = useWindowSize();
  const {  onUserLogout } = useAuthContext();
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      className={`main-header ${!isPhone ? "mobile" : ""}`}
    >
      <SearchInput />
      <IconButton
        aria-label="Logout"
        icon={<IoLogOutOutline />}
        bg="transparent"
        color="white"
        border={0}
        fontSize={"x-large"}
        onClick={onUserLogout}
      />
    </Flex>
  );
};
export default Header;
