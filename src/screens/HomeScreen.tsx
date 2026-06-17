import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen({
  onEnroll,
  onVerify,
  onLogs,
}: {
  onEnroll: () => void;
  onVerify: () => void;
  onLogs: () => void;
}) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.logo}>👤</Text>

        <Text style={styles.title}>
          OfflineID
        </Text>

        <Text style={styles.subtitle}>
          Attendance Management System
        </Text>

        <Text style={styles.subtitle2}>
          Fast • Secure • Offline
        </Text>

      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={onEnroll}
      >

        <Text style={styles.icon}>
          📷
        </Text>

        <View>

          <Text style={styles.cardTitle}>
            Enroll Employee
          </Text>

          <Text style={styles.cardSubtitle}>
            Register a new face
          </Text>

        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          {borderLeftColor: '#16a34a'},
        ]}
        onPress={onVerify}
      >

        <Text style={styles.icon}>
          ✅
        </Text>

        <View>

          <Text style={styles.cardTitle}>
            Verify Attendance
          </Text>

          <Text style={styles.cardSubtitle}>
             face verification
          </Text>

        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          {borderLeftColor: '#7c3aed'},
        ]}
        onPress={onLogs}
      >

        <Text style={styles.icon}>
          📋
        </Text>

        <View>

          <Text style={styles.cardTitle}>
            Attendance Logs
          </Text>

          <Text style={styles.cardSubtitle}>
            View verification history
          </Text>

        </View>

      </TouchableOpacity>

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          Offline AI Attendance System
        </Text>

        <Text style={styles.version}>
          Version 1.0
        </Text>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    fontSize: 70,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111827',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 18,
    color: '#2563eb',
    fontWeight: '600',
    marginTop: 8,
  },

  subtitle2: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 7,
    borderLeftColor: '#2563eb',
    elevation: 6,
  },

  icon: {
    fontSize: 34,
    marginRight: 18,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6b7280',
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },

  footerText: {
    color: '#6b7280',
    fontSize: 15,
  },

  version: {
    marginTop: 6,
    color: '#9ca3af',
    fontSize: 13,
  },

});
