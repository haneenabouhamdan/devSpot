import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  List,
  ListItem,
  IconButton,
  Image,
  Box,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { BsBell } from 'react-icons/bs';
import './styles.scss';
import { AllDone } from '../../common';
import { useNotifications } from '../../../providers/NotificationProvider';

const NotificationPopover: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Box position="relative" display="inline-block">
          <Tooltip
            label={'Notifications'}
            color="white"
            bgColor={'#7b4e7b'}
            p={2}
            fontSize={'small'}
          >
            <IconButton
              icon={<BsBell color="white" />}
              backgroundColor={'transparent'}
              fontSize="x-large"
              p={3}
              borderRadius={8}
              _hover={{ textDecor: 'none', backgroundColor: '#7b4e7b' }}
              aria-label={'notifications'}
            />
          </Tooltip>
          {/* {hasPendingNotifications && (
            <Box
              position="absolute"
              top="0"
              right="0"
              width="10px"
              height="10px"
              backgroundColor="orange"
              borderRadius="50%"
              border="2px solid orange"
            />
          )} */}
        </Box>
      </PopoverTrigger>
      <PopoverContent backgroundColor={'white'} zIndex={1000} maxW={'350px'}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {!notifications.length ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection={'column'}
              p={4}
            >
              <Image src={AllDone} alt="All done" boxSize="100px" />
              <Text pt={4} className="purple" fontWeight={'bold'}>
                No New Notifications
              </Text>
            </Box>
          ) : (
            <List spacing={4} mt={4}>
              {notifications.map((notification, index) => (
                <ListItem key={index} height="80px" borderBottomWidth={'1px'}>
                  <Box>
                    <Text fontWeight="bold">
                      {notification.notification?.title}
                    </Text>
                    <Text>{notification.notification?.body}</Text>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
