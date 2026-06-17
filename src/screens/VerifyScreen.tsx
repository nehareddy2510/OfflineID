import React, {useState} from 'react';
import {
View,
Text,
StyleSheet,
FlatList,
TouchableOpacity,
} from 'react-native';
import {getAllUsers, logAttendance} from '../database/database';
import CameraScreen from './CameraScreen';
import FaceRecognitionService from '../services/faceRecognition/FaceRecognitionService';

import cosineSimilarity from '../utils/cosineSimilarity';
import LivenessScreen
from "./LivenessScreen";
import AppModal from "../components/AppModal";

type Props = {onBack: () => void};


export default function VerifyScreen({onBack}: Props) {
const [step, setStep] =
useState<
'list'|
'liveness'|
'camera'|
'done'
>('list');  const users = getAllUsers() as any[];
const [showModal, setShowModal] =
  useState(false);

const [modalSuccess, setModalSuccess] =
  useState(true);

const [modalTitle, setModalTitle] =
  useState("");

const [modalMessage, setModalMessage] =
  useState("");

const [retry, setRetry] =
  useState(false);

  if (users.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>No enrolled users. Enroll someone first.</Text>
        <TouchableOpacity style={styles.btn} onPress={onBack}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

if(step==="liveness"){

  return(

    <LivenessScreen

      onComplete={()=>{
        setStep("camera");
      }}

      onCancel={()=>{
        setStep("list");
      }}

    />

  );

}
if (step === 'camera') {
  return (
    <CameraScreen
      mode="verify"
      onDone={async (result) => {
       if (!result) {

  setModalSuccess(false);

  setModalTitle(
    "Verification Failed",
  );

  setModalMessage(
    "Unable to capture a valid face."
  );

 setRetry(true);

setTimeout(() => {
  setStep("list");
  setShowModal(true);
}, 50);

  return;
}

        const embedding =
            result.embedding!;
          

        let bestUser: any = null;
        let bestScore = -1;

        for (const user of users as any[]) {
          if (!user.embedding) {
            continue;
          }

          const storedEmbedding = JSON.parse(
            user.embedding,
          );

          const score = cosineSimilarity(
            embedding,
            storedEmbedding,
          );

          

          if (score > bestScore) {
            bestScore = score;
            bestUser = user;
          }
        }

      

        if (
          bestUser &&
          bestScore > 0.35
        ) {
          logAttendance(
            bestUser.id,
            bestUser.name,
            'present',
          );

         setModalSuccess(true);

setModalTitle(
  "Verified Successfully",
);

setModalMessage(
  `${bestUser.name}\nAttendance recorded successfully.`,
);
setRetry(false);

setTimeout(() => {
  setStep("list");
  setShowModal(true);
}, 50);
        } else {
          logAttendance(
            'unknown',
            'Unknown',
            'failed',
          );

         setModalSuccess(false);

setModalTitle(
  "Verification Failed",
);

setModalMessage(
  "No match was found.",
);

setRetry(true);

setTimeout(() => {
  setStep("list");
  setShowModal(true);
}, 50);
        }
      }}
    />
  );
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Attendance</Text>
<TouchableOpacity
  style={[styles.btn, {marginBottom: 16}]}
  onPress={() => setStep('liveness')}
> 
<Text style={styles.btnText}>Scan Face (Auto match)</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.name}{' \u2014 '}{item.employee_id}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={[styles.btn, {backgroundColor: '#6b7280', marginTop: 16}]} onPress={onBack}>
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>
      <AppModal

visible={showModal}

success={modalSuccess}

title={modalTitle}

message={modalMessage}

buttonText={
  retry
    ? "Try Again"
    : "Return Home"
}

onPress={() => {

  setShowModal(false);

  if (retry) {

    setStep("liveness");

  } else {

    onBack();

  }

}}

/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, paddingTop: 60},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 16},
  msg: {fontSize: 16, marginBottom: 20, textAlign: 'center'},
  row: {padding: 14, borderWidth: 0.5, borderColor: '#d1d5db', borderRadius: 8, marginBottom: 8},
  rowText: {fontSize: 15},
  btn: {backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center'},
  btnText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});