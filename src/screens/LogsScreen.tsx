import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {getAttendanceLogs} from '../database/database';

export default function LogsScreen({
  onBack,
}: {
  onBack: () => void;
}) {

  const logs = getAttendanceLogs();

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Attendance Records
      </Text>

      <Text style={styles.subtitle}>
        Verification history
      </Text>

      {logs.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyIcon}>
            📋
          </Text>

          <Text style={styles.emptyTitle}>
            No Records Found
          </Text>

          <Text style={styles.emptyText}>
            Attendance records will appear here.
          </Text>

        </View>

      ) : (

        <FlatList
          data={logs}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item}: any) => (

            <View
              style={[
                styles.card,
                item.status === 'present'
                  ? styles.success
                  : styles.failed,
              ]}>

              <View style={styles.rowTop}>

                <Text style={styles.icon}>
                  {item.status === 'present'
                    ? '✅'
                    : '❌'}
                </Text>

                <View style={{flex: 1}}>

                  <Text style={styles.name}>
                    {item.user_name}
                  </Text>

                  <Text style={styles.status}>

                    {item.status === 'present'
                      ? 'Attendance Marked'
                      : 'Verification Failed'}

                  </Text>

                </View>

              </View>

              <Text style={styles.time}>
                {new Date(
                  item.timestamp,
                ).toLocaleString()}
              </Text>

            </View>

          )}
        />

      )}

      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}>

        <Text style={styles.backText}>
          Back to Home
        </Text>

      </TouchableOpacity>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    color: '#6b7280',
    fontSize: 16,
    marginBottom: 25,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    borderLeftWidth: 6,
  },

  success: {
    borderLeftColor: '#22c55e',
  },

  failed: {
    borderLeftColor: '#ef4444',
  },

  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 30,
    marginRight: 15,
  },

  name: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111827',
  },

  status: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 14,
  },

  time: {
    marginTop: 15,
    color: '#9ca3af',
    fontSize: 13,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 70,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
  },

  emptyText: {
    marginTop: 8,
    color: '#6b7280',
    textAlign: 'center',
  },

  backBtn: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },

  backText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },

});
