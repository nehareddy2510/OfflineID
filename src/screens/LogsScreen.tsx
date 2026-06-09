import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {getAttendanceLogs} from '../database/database';

export default function LogsScreen({onBack}: {onBack: () => void}) {
  const logs = getAttendanceLogs();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Logs</Text>
      {logs.length === 0 ? (
        <Text style={styles.empty}>No logs yet.</Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}: any) => (
            <View style={[styles.row, item.status === 'present' ? styles.ok : styles.fail]}>
              <Text style={styles.name}>{item.user_name}</Text>
              <Text style={styles.meta}>
                {new Date(item.timestamp).toLocaleString()} · {item.status}
              </Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.btn} onPress={onBack}>
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, paddingTop: 60},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 16},
  empty: {fontSize: 15, color: '#6b7280', marginTop: 20, textAlign: 'center'},
  row: {padding: 14, borderRadius: 8, marginBottom: 8},
  ok: {backgroundColor: '#d1fae5'},
  fail: {backgroundColor: '#fee2e2'},
  name: {fontSize: 15, fontWeight: '600'},
  meta: {fontSize: 12, color: '#374151', marginTop: 2},
  btn: {backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16},
  btnText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});