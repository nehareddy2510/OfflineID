import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function SplashScreen() {

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.logo}>
          👤
        </Text>

        <Text style={styles.title}>
          OfflineID
        </Text>

        <Text style={styles.subtitle}>
          Employee Attendance
        </Text>

      </View>

      <Text style={styles.footer}>
        Version 1.0
      </Text>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f4f7fb",
    justifyContent:"space-between",
    alignItems:"center",
    paddingVertical:80,
  },

  content:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },

  logo:{
    fontSize:90,
  },

  title:{
    marginTop:20,
    fontSize:38,
    fontWeight:"800",
    color:"#111827",
  },

  subtitle:{
    marginTop:10,
    fontSize:18,
    color:"#6b7280",
  },

  footer:{
    color:"#9ca3af",
    fontSize:14,
  },

});
