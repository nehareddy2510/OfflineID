import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  visible: boolean;
  success: boolean;
  title: string;
  message: string;
  buttonText: string;
  onPress: () => void;
};

export default function AppModal({
  visible,
  success,
  title,
  message,
  buttonText,
  onPress,
}: Props) {

  return (

    <Modal
      visible={visible}
      transparent
      animationType="none">

      <View style={styles.overlay}>

        <View style={styles.card}>

          <View style={{marginBottom: 10}}>
  <Text style={styles.icon}>
    {success ? "✅" : "❌"}
  </Text>
</View>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onPress}>

            <Text style={styles.buttonText}>
              {buttonText}
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </Modal>

  );

}

const styles = StyleSheet.create({

  overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"center",
    alignItems:"center",
    padding:20,
  },

  card:{
    width:"100%",
    backgroundColor:"white",
    borderRadius:20,
    padding:25,
    alignItems:"center",
  },

  icon:{
    fontSize:70,
  },

  title:{
    marginTop:15,
    fontSize:26,
    fontWeight:"700",
    color:"#111827",
  },

  message:{
    marginTop:10,
    fontSize:16,
    color:"#6b7280",
    textAlign:"center",
  },

  button:{
    marginTop:30,
    backgroundColor:"#2563eb",
    padding:16,
    borderRadius:12,
    width:"100%",
    alignItems:"center",
  },

  buttonText:{
    color:"white",
    fontWeight:"700",
    fontSize:18,
  },

});