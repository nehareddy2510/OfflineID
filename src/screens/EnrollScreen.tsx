import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function EnrollScreen({
  onOpenCamera,
}: {
  onOpenCamera: (name: string, userId: string) => void;
}) {

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.icon}>
          👤
        </Text>

        <Text style={styles.title}>
          Enroll Employee
        </Text>

        <Text style={styles.subtitle}>
          Add a new employee to the system
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.label}>
          Employee Name
        </Text>

        <TextInput
          placeholder="Enter full name"
          placeholderTextColor="#9ca3af"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>
          Employee ID
        </Text>

        <TextInput
          placeholder="Enter employee ID"
          placeholderTextColor="#9ca3af"
          value={userId}
          onChangeText={setUserId}
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.button,
            (!name.trim() || !userId.trim()) && {
              opacity: 0.5,
            },
          ]}
          disabled={
            !name.trim() ||
            !userId.trim()
          }
          onPress={() =>
            onOpenCamera(
              name.trim(),
              userId.trim(),
            )
          }>

          <Text style={styles.buttonText}>
            Continue
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 35,
  },

  icon: {
    fontSize: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginTop: 10,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#6b7280',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },

  button: {
    marginTop: 30,
    backgroundColor: '#2563eb',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },

});