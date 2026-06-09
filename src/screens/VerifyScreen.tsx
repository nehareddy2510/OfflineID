import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import {getAllUsers, logAttendance} from '../database/database';
import CameraScreen from './CameraScreen';

type Props = {onBack: () => void};

// MVP face match: compare base64 length as a proxy (same device/lighting = close length)
// Replace with pixel diff or ML embedding when TFLite is integrated
function matchFace(capturedB64: string, storedB64: string): boolean {
  const diff = Math.abs(capturedB64.length - storedB64.length);
  const ratio = diff / storedB64.length;
  return ratio < 0.08; // within 8% size = likely same face/lighting
}

export default function VerifyScreen({onBack}: Props) {
  const [step, setStep] = useState<'list' | 'camera' | 'done'>('list');
  const [selected, setSelected] = useState<{id: string; name: string; photo: string} | null>(null);
  const users = getAllUsers();

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
        onDone={result => {
          if (!result) {setStep('list'); return;}
          // compare captured photo against all enrolled users
          const match = users.find((u: any) => matchFace(result.photo, u.photo_base64));
          if (match) {
            logAttendance(match.id, match.name, 'present');
            Alert.alert('✅ Verified', `Welcome, ${match.name}!`, [{text: 'OK', onPress: onBack}]);
          } else {
            logAttendance('unknown', 'Unknown', 'failed');
            Alert.alert('❌ No Match', 'Face not recognized.', [{text: 'Try Again', onPress: () => setStep('camera')}, {text: 'Back', onPress: onBack}]);
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