import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You’re now inside the app 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
  },
});
