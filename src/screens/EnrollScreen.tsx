import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

export default function EnrollScreen({
  onOpenCamera,
}: {
  onOpenCamera: (name: string, userId: string) => void;
}){
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enroll User</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="ID"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      />

    <Button
  title="Open Camera"
  onPress={() => onOpenCamera(name, userId)}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
});