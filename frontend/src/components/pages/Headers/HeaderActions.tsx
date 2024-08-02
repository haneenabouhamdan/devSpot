import React, { useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { IconButton, Tooltip, Text } from '@chakra-ui/react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { TbMoodPuzzled } from 'react-icons/tb';
import { AddFriendModal, CreateChannelModal } from '../../modals/channelModals';
import { CreateChallengeModal } from '../../modals';

interface Props {
  currentView: string;
}
export const HeaderActions: React.FC<Props> = props => {
  const [isOpenAddChannel, setIsOpenAddChannel] = useState<boolean>(false);
  const [isOpenAddChallenge, setIsOpenAddChallenge] = useState<boolean>(false);
  const [isOpenAddDMChannel, setIsOpenAddDMChannel] = useState<boolean>(false);

  return (
    <>
      <Flex justifyContent={'space-between'} pb={4} pt={4} gap={4} width="100%">
        <Text color="white" fontSize={'lg'} pl={3} pt={5} fontWeight={'bold'}>
          {props.currentView}
        </Text>
        <Flex justifyContent={'end'} pb={4} pt={4} gap="2" width="100%">
          {(props.currentView === 'Challenges' ||
            props.currentView === 'Home') && (
            <Tooltip
              label={'Create Challenge'}
              color="white"
              bgColor={'purple.500'}
              p={2}
              fontSize={'small'}
            >
              <IconButton
                backgroundColor={'#9b6f9b'}
                _hover={{ bg: 'purple.500' }}
                icon={<TbMoodPuzzled color="white" fontSize={'20px'} />}
                onClick={() => setIsOpenAddChallenge(true)}
                aria-label={'Add challenge'}
              />
            </Tooltip>
          )}
          {(props.currentView === 'DMs' || props.currentView === 'Home') && (
            <Tooltip
              label={'Add Friend'}
              color="white"
              bgColor={'purple.500'}
              p={2}
              fontSize={'small'}
            >
              <IconButton
                backgroundColor={'#9b6f9b'}
                _hover={{ bg: 'purple.500' }}
                icon={<MdOutlineGroupAdd color="white" fontSize={'20px'} />}
                onClick={() => setIsOpenAddDMChannel(true)}
                aria-label={'Add Friend'}
              />
            </Tooltip>
          )}
          {props.currentView === 'Home' && (
            <Tooltip
              label={'Create Channel'}
              color="white"
              bgColor={'purple.500'}
              p={2}
              fontSize={'small'}
            >
              <IconButton
                backgroundColor={'#9b6f9b'}
                _hover={{ bg: 'purple.500' }}
                icon={<BiMessageRoundedAdd color="white" fontSize={'20px'} />}
                onClick={() => setIsOpenAddChannel(true)}
                aria-label={'Add'}
              />
            </Tooltip>
          )}
        </Flex>
      </Flex>
      <AddFriendModal
        isOpen={isOpenAddDMChannel}
        onClose={() => setIsOpenAddDMChannel(false)}
      />
      <CreateChannelModal
        isOpen={isOpenAddChannel}
        onClose={() => setIsOpenAddChannel(false)}
      />
      <CreateChallengeModal
        isOpen={isOpenAddChallenge}
        onClose={() => setIsOpenAddChallenge(false)}
      />
    </>
  );
};
