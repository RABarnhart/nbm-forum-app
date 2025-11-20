import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


type Props = {}

export default function Splash({  }: Props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/welcome");
    }, 1500); // duration of splash

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B6EF5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    marginBottom: 20,
  },
});