import { useChallenges } from '../../../../resolvers';
import Dropdown from '../../../common/DropdownList';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { AiOutlineClockCircle } from 'react-icons/ai';

interface ChallengeListProps {
  onSelectChallenge: (ChallengeId: string, ChallengeName: string) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({ onSelectChallenge }) => {
  const options = [
    {
      icon: IoCheckmarkCircleOutline,
      label: 'Solved',
      onClick: () => onSelectChallenge('challengeId', 'Solved'),
    },
    {
      icon: AiOutlineClockCircle,
      label: 'Pending',
      onClick: () => onSelectChallenge('challengeId', 'Pending'),
    },
  ];
  return <Dropdown title="Challenges" items={options} />;
};
export { ChallengeList };
