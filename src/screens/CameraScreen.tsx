import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import CameraService from '../services/camera/CameraService';
import FaceDetectionService from '../services/faceDetection/FaceDetectionService';
import FaceRecognitionService from '../services/faceRecognition/FaceRecognitionService';
import UserRepository from '../repositories/UserRepository';

type Props = {
  mode: 'enroll' | 'verify';
  name?: string;
  userId?: string;
  onDone: (result?: {
    id: string;
    name?: string;
    photo: string;
    embedding?: number[];
  }) => void;
};

export default function CameraScreen({
  mode,
  name,
  userId,
  onDone,
}: Props) {

  const camera = useRef<Camera>(null);

  const device = useCameraDevice('front');

  const {hasPermission, requestPermission} =
    useCameraPermission();

  const [busy, setBusy] =
    useState(false);

  useEffect(() => {

    if (!hasPermission) {
      requestPermission();
    }

  }, [
    hasPermission,
    requestPermission,
  ]);

  if (!hasPermission) {

    return (
      <View style={styles.center}>
        <Text>
          Camera permission required
        </Text>
      </View>
    );

  }

  if (!device) {

    return (
      <View style={styles.center}>
        <Text>
          No camera found
        </Text>
      </View>
    );

  }
    const handleCapture = async () => {

    if (!camera.current || busy) {
      return;
    }

    setBusy(true);

    try {

      const photo =
        await camera.current.takePhoto();

      const id =
        `${userId}_${Date.now()}`;

      const savedPath =
        await CameraService.savePhoto(
          photo.path,
          id,
        );

      const detection =
        await FaceDetectionService.detect(
          savedPath,
        );

      if (
        detection.faceCount !== 1
      ) {

        Alert.alert(
          "Enrollment Failed",
          `Detected ${detection.faceCount} faces.`,
        );

        return;

      }

      const embedding =
        await FaceRecognitionService.getEmbedding(
          savedPath,
        );

      console.log(
        "================================"
      );

      console.log(
        "EMBEDDING LENGTH",
        embedding.length,
      );

      console.log(
        embedding,
      );

      console.log(
        "================================"
      );

      Alert.alert(
        "Embedding",
        JSON.stringify(

embedding.slice(

0,

10,

),

),
      );
      console.log(

"FULL EMBEDDING",

embedding,

);

console.log(

JSON.stringify(

embedding,

),

);
            if (
        mode === "enroll"
      ) {

        await UserRepository.create(

          id,

          name!,

          userId!,

          savedPath,

          JSON.stringify(
            embedding,
          ),

        );

        Alert.alert(

          "Enrollment Successful",

          `${name} enrolled successfully.`,

          [

            {

              text: "OK",

              onPress: () => onDone(),

            },

          ],

        );

      }

      else {

        onDone({

          id,

          name,

          photo: savedPath,

          embedding,

        });

      }

    }

    catch (e) {

      console.log(e);

      Alert.alert(

        "Capture Failed",

        String(e),

      );

    }

    finally {

      setBusy(false);

    }

  };
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
        <Text style={styles.hint}>
          {
            mode === "enroll"
              ? `Enrolling: ${name}`
              : "Look at camera"
          }
        </Text>
      </View>

      <View style={styles.captureContainer}>
        <TouchableOpacity
          style={[
            styles.btn,
            busy && {opacity: 0.5},
          ]}
          disabled={busy}
          onPress={handleCapture}
        >
          <Text style={styles.btnText}>
            {
              busy
                ? "Processing..."
                : mode === "enroll"
                ? "Enroll"
                : "Verify"
            }
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

}

const styles = StyleSheet.create({

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 8,
  },

  hint: {
    color: "#fff",
    fontSize: 16,
  },

  captureContainer: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },

  btn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 50,
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

});