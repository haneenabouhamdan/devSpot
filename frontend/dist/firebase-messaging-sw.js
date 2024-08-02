// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyD9h33A8x2in_UNH-NfRmmJrtKgzr7RG9Q',
  authDomain: 'test-firebase-2cd5d.firebaseapp.com',
  databaseURL: 'https://test-firebase-2cd5d-default-rtdb.firebaseio.com',
  projectId: 'test-firebase-2cd5d',
  storageBucket: 'test-firebase-2cd5d.appspot.com',
  messagingSenderId: '304622678630',
  appId: '1:304622678630:web:bdb386a2f9db533db033a7',
  measurementId: 'G-JZELW4D337',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
