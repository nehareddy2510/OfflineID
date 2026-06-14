import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import {getAllUsers, logAttendance} from '../database/database';
import CameraScreen from './CameraScreen';
import FaceRecognitionService from '../services/faceRecognition/FaceRecognitionService';

import cosineSimilarity from '../utils/cosineSimilarity';


type Props = {onBack: () => void};

// function matchFace(capturedB64: string, storedB64: string): boolean {
//   const diff = Math.abs(capturedB64.length - storedB64.length);
//   const ratio = diff / storedB64.length;
//   return ratio < 0.08; // within 8% size = likely same face/lighting
// }


export default function VerifyScreen({onBack}: Props) {
  const [step, setStep] = useState<'list' | 'camera' | 'done'>('list');
  const users = getAllUsers() as any[];

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

if (step === 'camera') {
  return (
    <CameraScreen
      mode="verify"
      onDone={async (result) => {
        if (!result) {
          setStep('list');
          return;
        }

        const embedding =
          await FaceRecognitionService.getEmbedding(
            result.photo,
          );

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

          console.log(
            user.name,
            score,
          );

          if (score > bestScore) {
            bestScore = score;
            bestUser = user;
          }
        }

        console.log(
          'BEST SCORE',
          bestScore,
        );

        if (
          bestUser &&
          bestScore > 0.65
        ) {
          logAttendance(
            bestUser.id,
            bestUser.name,
            'present',
          );

          Alert.alert(
            'Verified',
            `${bestUser.name}\nScore: ${bestScore}`,
            [
              {
                text: 'OK',
                onPress: onBack,
              },
            ],
          );
        } else {
          logAttendance(
            'unknown',
            'Unknown',
            'failed',
          );

          Alert.alert(
            'No Match',
            `Best Score: ${bestScore}`,
            [
              {
                text: 'Retry',
                onPress: () =>
                  setStep('camera'),
              },
            ],
          );
        }
      }}
    />
  );
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify — tap user or scan</Text>
      <TouchableOpacity style={[styles.btn, {marginBottom: 16}]} onPress={() => setStep('camera')}>
        <Text style={styles.btnText}>Scan Face (Auto-match)</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.name} — {item.employee_id}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={[styles.btn, {backgroundColor: '#6b7280', marginTop: 16}]} onPress={onBack}>
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>
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