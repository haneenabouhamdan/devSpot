import { HiMiniHashtag, HiOutlineLockClosed } from 'react-icons/hi2';
import { Channel, useUserChannels } from '../../../../resolvers';
import Dropdown from '../../../common/DropdownList';

interface ChannelListProps {
  onSelectChannel: (channelId: string, channelName: string) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ onSelectChannel }) => {
  const userId = localStorage.getItem('uId');
  const { data } = useUserChannels(String(userId));

  if (!data || !data.length) return <></>;

  const channels = data.map((channel: Channel) => {
    return {
      icon: channel.isPrivate ? HiOutlineLockClosed : HiMiniHashtag,
      label: channel.name,
      onClick: () => onSelectChannel(channel.id, String(channel.name)),
    };
  });

  return <Dropdown title="Channels" items={channels} />;
};
export { ChannelList };
