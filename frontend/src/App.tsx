import { Outlet } from 'react-router';
import { MainHelmet } from './components/pages/MainHelmet';
import './App.scss';
import { useEffect } from 'react';
import { useSaveTokenMutation } from './resolvers';
import { onForegroundMessage, setupNotifications } from '../firebase';

const App = () => {
  const { saveToken } = useSaveTokenMutation();

  const saveTokenCallback = async (userId: string, token: string) => {
    try {
      await saveToken(userId, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  useEffect(() => {
    setupNotifications(saveTokenCallback);

    onForegroundMessage()
      .then(payload => {
        console.log('Received foreground message: ', payload);
      })
      .catch(err =>
        console.log(
          'An error occured while retrieving foreground message. ',
          err
        )
      );
  }, []);

  return (
    <div className="App">
      <MainHelmet />
      <Outlet />
    </div>
  );
};

export default App;
