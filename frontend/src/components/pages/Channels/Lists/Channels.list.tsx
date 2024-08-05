import { HiMiniHashtag, HiOutlineLockClosed } from 'react-icons/hi2';
import { Channel, useUserChannels } from '../../../../resolvers';
import Dropdown from '../../../common/DropdownList';
import { MdGroups } from 'react-icons/md';

interface ChannelListProps {
  onSelectChannel: (
    channelId: string,
    channelName: string,
    channelDes?: string
  ) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ onSelectChannel }) => {
  const userId = localStorage.getItem('uId');
  const { data } = useUserChannels(String(userId));

  if (!data || !data.length) return <></>;

  const channels = data.map((channel: Channel) => {
    return {
      icon: channel.isPrivate
        ? HiOutlineLockClosed
        : channel.isGroupChat
          ? MdGroups
          : HiMiniHashtag,
      label: channel.name,
      onClick: () =>
        onSelectChannel(channel.id, String(channel.name), channel.description),
    };
  });

  return <Dropdown title="Channels" items={channels} />;
};
export { ChannelList };
