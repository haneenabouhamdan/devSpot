import { Flex, Spacer } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { IoLogOutOutline } from 'react-icons/io5';
import './styles.scss';
import SearchInput from '../../common/SearchInput';
import { useAuthContext } from '../../../contexts';

const Header = () => {
  const { onUserLogout } = useAuthContext();
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      className={`main-header`}
    >
      {/* <SearchInput /> */}
      <Spacer />
      <IconButton
        aria-label="Logout"
        icon={<IoLogOutOutline />}
        bg="transparent"
        color="white"
        border={0}
        fontSize={'x-large'}
        onClick={onUserLogout}
      />
    </Flex>
  );
};
export default Header;
