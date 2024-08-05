import React from 'react';
import { Channel, useUserDms } from '../../../../resolvers';
import Dropdown from '../../../common/DropdownList';
import { RxAvatar } from 'react-icons/rx';

interface DmListProps {
  onSelectChannel: (channelId: string, channelName: string) => void;
}

const DmsList: React.FC<DmListProps> = ({ onSelectChannel }) => {
  const userId = localStorage.getItem('uId');

  const { data: dmData } = useUserDms(String(userId));

  if (!dmData || !dmData.length) return <></>;

  const dms = dmData.map((channel: Channel) => {
    return {
      icon: RxAvatar,
      label: channel.name,
      onClick: () => onSelectChannel(channel.id, String(channel.name)),
    };
  });

  return <Dropdown title="DMs" items={dms} />;
};
export { DmsList };
