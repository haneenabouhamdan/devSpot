import React, { useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { TbMoodPuzzled } from 'react-icons/tb';
import { AddFriendModal, CreateChannelModal } from '../../modals/channelModals';
import { CreateChallengeModal } from '../../modals';

export const HeaderActions: React.FC = () => {
  const [isOpenAddChannel, setIsOpenAddChannel] = useState<boolean>(false);
  const [isOpenAddChallenge, setIsOpenAddChallenge] = useState<boolean>(false);
  const [isOpenAddDMChannel, setIsOpenAddDMChannel] = useState<boolean>(false);

  return (
    <>
      <Flex justifyContent={'end'} pb={4} gap="2" width="100%">
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
