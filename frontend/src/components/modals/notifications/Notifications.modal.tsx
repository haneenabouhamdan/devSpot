import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Image,
  Box,
  Text,
} from '@chakra-ui/react';
import { BsBell } from 'react-icons/bs';
import './styles.scss';
import { onMessage } from 'firebase/messaging';
import { messaging } from '../../../../firebase';
import { AllDone } from '../../common';

interface Notification {
  id: string;
  body: string;
}

const NotificationPopover: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // useEffect(() => {

  // }, []);

  onMessage(messaging, payload => {
    console.log('Foreground Message:', payload);
    if (payload.notification) {
      const newNotification: Notification = {
        id: payload.messageId || new Date().toISOString(), // Provide a fallback ID
        body: payload.notification.body || 'New notification',
        title: payload.notification.title,
      };
      setNotifications(prevNotifications => [
        ...prevNotifications,
        newNotification,
      ]);
    }
  });

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <IconButton
          icon={<BsBell color="white" />}
          backgroundColor={'transparent'}
          fontSize="x-large"
          _hover={{ backgroundColor: 'transparent' }}
          aria-label={'notifications'}
        />
      </PopoverTrigger>
      <PopoverContent backgroundColor={'white'} zIndex={1000} maxW={'300px'}>
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
            <List spacing={2}>
              {notifications.map(notification => (
                <ListItem key={notification.id}>
                  <ListIcon as={BsBell} color="green.500" />
                  {notification.body}
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
