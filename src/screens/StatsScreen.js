// src/screens/StatsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Statistics</Text>
      <Text>Total Ram count: 0</Text>
      <Text>Daily streak: 0 days</Text>
      <Text>Highest daily count: 0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default StatsScreen;