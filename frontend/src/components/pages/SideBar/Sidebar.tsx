import React, { useEffect, useState } from 'react';
import { Flex, Text, Avatar, HStack, IconButton, Box } from '@chakra-ui/react';
import { FiHome, FiSettings } from 'react-icons/fi';
import {
  IoChatbubblesOutline,
  IoBookmarkOutline,
  IoRocketOutline,
} from 'react-icons/io5';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { BsPinAngle, BsBell } from 'react-icons/bs';
import NavItem from './NavItem';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import { UserProfileModal } from '../../modals';

const Sidebar: React.FC = () => {
  const [navSize, setNavSize] = useState<'small' | 'large'>('small');

  const toggleNavSize = () => {
    setNavSize(prevSize => (prevSize === 'small' ? 'large' : 'small'));
  };

  return (
    <Flex className={`sidebar ${navSize}`}>
      <Flex className="nav-container" as="nav">
        <HStack className={`user`}>
          <UserProfileModal navSize={navSize} />
        </HStack>
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Home"
          description="This is the description for the dashboard."
        />
        <NavItem
          navSize={navSize}
          icon={IoChatbubblesOutline}
          title="DMs"
          description={''}
        />
        <NavItem
          navSize={navSize}
          icon={IoRocketOutline}
          title="Challenges"
          description={''}
        />
        <NavItem
          navSize={navSize}
          icon={IoBookmarkOutline}
          title="Saved"
          description={''}
        />
        <NavItem
          navSize={navSize}
          icon={BsPinAngle}
          title="Pinned"
          description={''}
        />
        <NavItem
          navSize={navSize}
          icon={BsBell}
          title="Notifications"
          description={''}
        />
        <NavItem
          navSize={navSize}
          icon={FiSettings}
          title="Settings"
          description={''}
        />
      </Flex>
      {navSize !== 'large' ? (
        <IconButton
          background="none"
          border={0}
          mb="10"
          _hover={{ background: 'none' }}
          icon={
            <MdOutlineKeyboardDoubleArrowRight size={'25px'} color="white" />
          }
          aria-label="Toggle Navigation Size"
          onClick={toggleNavSize}
        />
      ) : (
        <IconButton
          background="none"
          border={0}
          mb="10"
          _hover={{ background: 'none' }}
          icon={
            <MdOutlineKeyboardDoubleArrowLeft size={'25px'} color="white" />
          }
          aria-label="Toggle Navigation Size"
          onClick={toggleNavSize}
        />
      )}
    </Flex>
  );
};

export default Sidebar;
