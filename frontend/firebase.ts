import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken } from 'firebase/messaging';
import { useSaveTokenMutation } from './src/resolvers';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const messaging = getMessaging(app);

const setupNotifications = async () => {
  const { saveToken } = useSaveTokenMutation();
  const userId = localStorage.getItem('uId');

  try {
    // Request permission for notifications
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('Notification permission granted.');

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

export { storage, messaging, setupNotifications };
