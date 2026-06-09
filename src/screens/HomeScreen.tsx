import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function HomeScreen({
  onEnroll, onVerify, onLogs,
}: {
  onEnroll: () => void;
  onVerify: () => void;
  onLogs: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OfflineID</Text>
      <TouchableOpacity style={styles.btn} onPress={onEnroll}>
        <Text style={styles.btnText}>Enroll User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, {backgroundColor: '#16a34a'}]} onPress={onVerify}>
        <Text style={styles.btnText}>Verify User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, {backgroundColor: '#7c3aed'}]} onPress={onLogs}>
        <Text style={styles.btnText}>Attendance Logs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', gap: 16, padding: 30},
  title: {fontSize: 36, fontWeight: '900', textAlign: 'center', marginBottom: 20},
  btn: {backgroundColor: '#2563eb', padding: 18, borderRadius: 12, alignItems: 'center'},
  btnText: {color: '#fff', fontSize: 18, fontWeight: '700'},
});