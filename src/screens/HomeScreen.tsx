import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function HomeScreen({
  onEnroll,
}: {
  onEnroll: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OfflineID</Text>

   <Button
  title="Enroll User"
  onPress={() => onEnroll()}
/>

<Button
  title="Verify User"
  onPress={() => {}}
/>

<Button
  title="Attendance Logs"
  onPress={() => {}}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});