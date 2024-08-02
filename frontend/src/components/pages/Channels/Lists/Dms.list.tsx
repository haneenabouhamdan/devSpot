import { Channel, useUserDms } from '../../../../resolvers';
import Dropdown from '../../../common/DropdownList';
import { RxAvatar } from 'react-icons/rx';

const DmsList = () => {
  const userId = localStorage.getItem('uId');

  const { data: dmData } = useUserDms(String(userId));

  if (!dmData || !dmData.length) return <></>;

  const dms = dmData.map((channel: Channel) => {
    return {
      icon: RxAvatar,
      label: channel.name,
      link: `/dms/${channel.id}`,
    };
  });

  return <Dropdown title="DMs" items={dms} />;
};
export { DmsList };
