import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppModal from '../components/AppModal';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import CameraService from '../services/camera/CameraService';
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

  const {
    hasPermission,
    requestPermission,
  } = useCameraPermission();

  const [busy, setBusy] = useState(false);
  const [showModal,setShowModal]=useState(false);
const [modalTitle,setModalTitle]=useState("");

const [modalMessage,setModalMessage]=useState("");

const [modalSuccess,setModalSuccess]=useState(true);

 const handleCapture = async () => {

if (busy || !camera.current) {
  return;
}
    setBusy(true);

    try {

      const photo =
  await camera.current.takePhoto({
    enableShutterSound: false,
  });

      const id =
  mode === "enroll"
    ? `${userId}_${Date.now()}`
    : `${Date.now()}`;

      const savedPath =
        await CameraService.savePhoto(
          photo.path,
          id,
        );
        await new Promise(resolve =>
  setTimeout(resolve, 500)
);

      const embedding =
        await FaceRecognitionService.getEmbedding(
          savedPath,
        );

    

      if (mode === "enroll") {

        await UserRepository.create(

          id,

          name!,

          userId!,

          savedPath,

          JSON.stringify(
            embedding,
          ),

        );

        setModalSuccess(true);

setModalTitle(
  "Enrollment Successful"
);

setModalMessage(
  `${name} has been enrolled successfully.`
);

setShowModal(true);

      } else {

        onDone({

          id,

          name,

          photo: savedPath,

          embedding,

        });

      }

    } catch (e) {

   setModalSuccess(false);

setModalTitle(
  "Capture Failed",
);

setModalMessage(
  "Unable to capture your photo.\n\nPlease ensure your face is clearly visible and try again."
);

setShowModal(true);

    } finally {

      setBusy(false);

    }

  };
  
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

useEffect(() => {

  if (
    mode !== "verify" ||
    !hasPermission ||
    !device
  ) {
    return;
  }

  const interval = setInterval(() => {

    if (camera.current && !busy) {

      clearInterval(interval);

      handleCapture();

    }

  }, 300);

  return () => clearInterval(interval);

}, [
  mode,
  hasPermission,
  device,
  busy,
]);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>No camera found</Text>
      </View>
    );
  }

 


  return (
  <View style={{flex: 1}}>

  <Camera
  ref={camera}
  style={StyleSheet.absoluteFill}
  device={device}
  isActive={true}
  photo={true}


/>

    <View style={styles.overlay}>

      <Text style={styles.overlayTitle}>
        {mode === "enroll"
          ? "Enroll Employee"
          : "Identity Verification"}
      </Text>

      <Text style={styles.overlaySubtitle}>
        {mode === "enroll"
          ? "Align your face inside the frame"
          : "Looking at camera... verifying automatically"}
      </Text>

    </View>

 

  {mode === "enroll" && (

<View style={styles.captureContainer}>

  <TouchableOpacity
    style={[
      styles.btn,
      busy && {opacity:0.5},
    ]}
    disabled={busy}
    onPress={handleCapture}
  >

    <Text style={styles.btnText}>
      {busy
        ? "Please wait..."
        : "Capture Photo"}
    </Text>

  </TouchableOpacity>

</View>

)}
    

    {busy && (
      <View style={styles.loadingOverlay}>

        <View style={styles.loadingCard}>

          <Text style={styles.loadingTitle}>
            Processing
          </Text>

          <Text style={styles.loadingText}>
            Please wait...
          </Text>

        </View>

      </View>
    )}

    <AppModal
      visible={showModal}
      success={modalSuccess}
      title={modalTitle}
      message={modalMessage}
      buttonText="Return Home"
      onPress={() => {
        setShowModal(false);
        onDone();
      }}
    />

  </View>
);

}

const styles = StyleSheet.create({
  overlay: {
  position: "absolute",
  top: 60,
  left: 20,
  right: 20,
  backgroundColor: "rgba(0,0,0,0.55)",
  borderRadius: 16,
  padding: 18,
},

overlayTitle: {
  color: "#fff",
  fontSize: 24,
  fontWeight: "700",
},

overlaySubtitle: {
  color: "#e5e7eb",
  marginTop: 6,
  fontSize: 15,
},

loadingOverlay: {
  ...StyleSheet.absoluteFillObject,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.4)",
},

loadingCard: {
  backgroundColor: "#fff",
  padding: 24,
  borderRadius: 18,
  minWidth: 220,
  alignItems: "center",
},

loadingTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#111827",
},

loadingText: {
  marginTop: 10,
  color: "#6b7280",
  fontSize: 16,
},

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  captureContainer: {
  position: "absolute",
  bottom: 60,
  left: 20,
  right: 20,
},

  btn: {
  backgroundColor: "#2563eb",
  paddingVertical: 18,
  borderRadius: 50,
  alignItems: "center",
},

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

});
