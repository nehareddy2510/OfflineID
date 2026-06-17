import React, {useEffect, useState} from 'react';
import {initDB} from './src/database/database';
import HomeScreen from './src/screens/HomeScreen';
import EnrollScreen from './src/screens/EnrollScreen';
import CameraScreen from './src/screens/CameraScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import LogsScreen from './src/screens/LogsScreen';
import SplashScreen from './src/screens/SplashScreen';

type Screen =
  | 'splash'
  | 'home'
  | 'enroll'
  | 'camera_enroll'
  | 'verify'
  | 'logs';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [enrollData, setEnrollData] = useState({
    name: '',
    userId: '',
  });

  useEffect(() => {
    initDB();

    const timer = setTimeout(() => {
      setScreen('home');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  switch (screen) {
    case 'splash':
      return <SplashScreen />;

    case 'enroll':
      return (
        <EnrollScreen
          onOpenCamera={(name, userId) => {
            setEnrollData({name, userId});
            setScreen('camera_enroll');
          }}
        />
      );

    case 'camera_enroll':
      return (
        <CameraScreen
          mode="enroll"
          name={enrollData.name}
          userId={enrollData.userId}
          onDone={() => setScreen('home')}
        />
      );

    case 'verify':
      return <VerifyScreen onBack={() => setScreen('home')} />;

    case 'logs':
      return <LogsScreen onBack={() => setScreen('home')} />;

    default:
      return (
        <HomeScreen
          onEnroll={() => setScreen('enroll')}
          onVerify={() => setScreen('verify')}
          onLogs={() => setScreen('logs')}
        />
      );
  }
}
