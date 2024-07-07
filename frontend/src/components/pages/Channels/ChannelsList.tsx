import { Box, Flex } from "@chakra-ui/layout";
import "./styles.scss";
import { FiHash } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import Dropdown from "../../common/DropdownList";
import { IoBugOutline } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { TbMoodPuzzled } from "react-icons/tb";

const ChannelList = () => {
  const channels = [
    {
      icon: PiBookOpenTextDuotone,
      label: "resources",
      link: "/channels/fast-track-to-senior",
    },
    { icon: FiHash, label: "general", link: "/channels/general" },
    { icon: IoBugOutline, label: "issues", link: "/channels/general" },
  ];
  const dms = [
    {
      icon: RxAvatar,
      label: "Haneen",
      link: "/channels/fast-track-to-senior",
    },
    {
      icon: RxAvatar,
      label: "Sara",
      link: "/channels/fast-track-to-senior",
    },
  ];
  const Challenges = [
    {
      icon: IoMdCheckboxOutline,
      label: "completed",
      link: "/channels/fast-track-to-senior",
      subItems: [
        { icon: FiHash, label: "CH-01", link: "/channels/sub-1" },
        { icon: FiHash, label: "CH-02", link: "/channels/sub-2" },
      ],
    },
    {
      icon: MdOutlinePending,
      label: "pending",
      link: "/channels/general",
      subItems: [
        { icon: FiHash, label: "CH-01", link: "/channels/sub-1" },
        { icon: FiHash, label: "CH-02", link: "/channels/sub-2" },
      ],
    },
  ];

  return (
    <Box w="250px" className="channel-card" h="90vh" overflowY="auto">
      <Flex justifyContent={"end"} pb={4} gap="2">
        <IconButton
          backgroundColor={"#9b6f9b"}
          icon={<TbMoodPuzzled color="white" fontSize={"20px"} />}
          aria-label={"Add"}
        />
        <IconButton
          backgroundColor={"#9b6f9b"}
          icon={<MdOutlineGroupAdd color="white" fontSize={"20px"} />}
          aria-label={"Add"}
        />
        <IconButton
          backgroundColor={"#9b6f9b"}
          icon={<BiMessageRoundedAdd color="white" fontSize={"20px"} />}
          aria-label={"Add"}
        />
      </Flex>
      <Dropdown title="Channels" items={channels} />
      <Dropdown title="Challenges" items={Challenges} />
      <Dropdown title="DMs" items={dms} />
    </Box>
  );
};
export default ChannelList;