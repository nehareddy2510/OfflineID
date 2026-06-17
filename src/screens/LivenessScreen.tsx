import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import FaceDetectionService from '../services/faceDetection/FaceDetectionService';
import LivenessService from '../services/liveness/LivenessService';

type Props = {
  onComplete: () => void;
  onCancel?: () => void;
};

export default function LivenessScreen({onComplete, onCancel}: Props) {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('front');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [instruction, setInstruction] = useState('Turn your head LEFT');
  const [progress, setProgress] = useState(0);
  const processing = useRef(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    LivenessService.reset();

    const timer = setInterval(async () => {
      if (!camera.current) {
        return;
      }

      if (processing.current) {
  return;
}

processing.current = true;
      try {
        const snapshot = await camera.current.takeSnapshot({
          quality: 80,
        });
        const detection = await FaceDetectionService.detect(snapshot.path);
        const state = LivenessService.process(detection);

        if (state === 'LEFT') {
          setInstruction('Turn your head RIGHT');
          setProgress(1);
        }

        if (state === 'RIGHT') {
          setInstruction('Blink');
          setProgress(2);
        }

        if (state === 'BLINK') {
           setInstruction(
    '✅ Liveness Passed'
  );
          setProgress(3);
        }

        if (state === 'DONE') {
          clearInterval(timer);
          setInstruction('Liveness Passed ✔ \nPreparing verification...'); 
          setTimeout(() => {

    onComplete();

  }, 1000);
        }
      } catch (e) {
      }
      finally {
  processing.current = false;
}
    }, 700);

    return () => {
      clearInterval(timer);
      LivenessService.reset();
    };
  }, [onComplete]);

  if (!device || !hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>AI Liveness</Text>
        <Text style={styles.progress}>
          {progress === 0
            ? '● ○ ○'

            : progress === 1
            ? '● ● ○'

            : progress === 2
            ? '● ● ●'
            : '✔ ✔ ✔'}
        </Text>
        <Text style={styles.instruction}>{instruction}</Text>

        {onCancel ? (
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 15,
    width: '85%',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  progress: {
    color: '#22c55e',
    fontSize: 36,
    marginTop: 30,
    textAlign: 'center',
  },
  instruction: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 40,
  },
  cancelBtn: {
    marginTop: 24,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#6b7280',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
