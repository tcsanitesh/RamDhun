// src/screens/WriteScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WriteScreen = () => {
  const [ramCount, setRamCount] = useState(0);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadRamCount();
  }, []);

  const loadRamCount = async () => {
    try {
      const savedCount = await AsyncStorage.getItem('ramCount');
      if (savedCount !== null) {
        setRamCount(parseInt(savedCount));
      }
    } catch (error) {
      console.error('Failed to load Ram count:', error);
    }
  };

  const saveRamCount = async (count) => {
    try {
      await AsyncStorage.setItem('ramCount', count.toString());
    } catch (error) {
      console.error('Failed to save Ram count:', error);
    }
  };

  const handleTextChange = (text) => {
    setInputText(text);
    const newCount = (text.match(/ram/gi) || []).length;
    const updatedCount = ramCount + newCount;
    setRamCount(updatedCount);
    saveRamCount(updatedCount);
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Ram Count: {ramCount}</Text>
      <TextInput
        style={styles.input}
        multiline
        value={inputText}
        onChangeText={handleTextChange}
        placeholder="Start writing 'Ram'..."
      />
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  clearButton: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WriteScreen;