import { Box } from '@chakra-ui/layout';
import './styles.scss';
import { FiHash } from 'react-icons/fi';
import Dropdown from '../../common/DropdownList';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdOutlinePending } from 'react-icons/md';
import { ChannelList } from './Lists/Channels.list';
import { DmsList } from './Lists/Dms.list';

interface Props {
  currentView: string;
}
const MainList = (props: Props) => {
  const { currentView } = props;
  const Challenges = [
    {
      icon: IoMdCheckboxOutline,
      label: 'completed',
      link: '/channels/fast-track-to-senior',
      subItems: [
        { icon: FiHash, label: 'CH-01', link: '/channels/sub-1' },
        { icon: FiHash, label: 'CH-02', link: '/channels/sub-2' },
      ],
    },
    {
      icon: MdOutlinePending,
      label: 'pending',
      link: '/channels/general',
      subItems: [
        { icon: FiHash, label: 'CH-01', link: '/channels/sub-1' },
        { icon: FiHash, label: 'CH-02', link: '/channels/sub-2' },
      ],
    },
  ];

  return (
    <Box w="250px" className="channel-card" h="90vh" overflowY="auto">
      <Box display={'flex'} flexDirection={'column'} gap={4}>
        {currentView === 'Home' && <ChannelList />}
        {(currentView === 'DMs' || currentView == 'Home') && <DmsList />}
        {(currentView === 'Challenges' || currentView == 'Home') && (
          <Dropdown title="Challenges" items={Challenges} />
        )}
        {currentView === 'Saved' && <div>Saved Items Component</div>}
      </Box>
    </Box>
  );
};

export default MainList;