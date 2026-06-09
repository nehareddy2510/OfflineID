import React, {useEffect, useState} from 'react';
import {initDB} from './src/database/database';
import HomeScreen from './src/screens/HomeScreen';
import EnrollScreen from './src/screens/EnrollScreen';
import CameraScreen from './src/screens/CameraScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import LogsScreen from './src/screens/LogsScreen';

type Screen = 'home' | 'enroll' | 'camera_enroll' | 'verify' | 'logs';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [enrollData, setEnrollData] = useState({name: '', userId: ''});

  useEffect(() => {
    initDB();
  }, []);

  switch (screen) {
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