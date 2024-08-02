import { HiMiniHashtag, HiOutlineLockClosed } from 'react-icons/hi2';
import { Channel, useUserChannels } from '../../../../resolvers';
import Dropdown from '../../../common/DropdownList';

const ChannelList = () => {
  const userId = localStorage.getItem('uId');

  const { data } = useUserChannels(String(userId));

  if (!data || !data.length) return <></>;

  const channels = data.map((channel: Channel) => {
    return {
      icon: channel.isPrivate ? HiOutlineLockClosed : HiMiniHashtag,
      label: channel.name,
      link: `/channels/${channel.id}`,
    };
  });

  return <Dropdown title="Channels" items={channels} />;
};
export { ChannelList };
