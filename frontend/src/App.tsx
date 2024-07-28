import { Outlet } from 'react-router';
import { MainHelmet } from './components/pages/MainHelmet';
import './App.scss';
import { useEffect } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { useSaveTokenMutation } from './resolvers';

const App = () => {
  const { saveToken } = useSaveTokenMutation();

  const setupNotifications = async () => {
    const userId = localStorage.getItem('uId');
    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const messaging = getMessaging();
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
        });
        console.log('FCM Token:', token);
        if (userId) await saveToken(userId, token);
      } else {
        console.log('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error setting up notifications:', error);
    }
  };

  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <div className="App">
      <MainHelmet />
      <Outlet />
    </div>
  );
};

export default App;
