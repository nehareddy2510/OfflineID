
import React, {useState} from 'react';

import HomeScreen from './src/screens/HomeScreen';
import EnrollScreen from './src/screens/EnrollScreen';
import CameraScreen from './src/screens/CameraScreen';

export default function App() {
  const [screen, setScreen] = useState('home');

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  if (screen === 'camera') {
    return <CameraScreen />;
  }

  if (screen === 'enroll') {
    return (
      <EnrollScreen
        onOpenCamera={(n, id) => {
          setName(n);
          setUserId(id);
          setScreen('camera');
        }}
      />
    );
  }

  return (
    <HomeScreen
      onEnroll={() => setScreen('enroll')}
    />
  );
}