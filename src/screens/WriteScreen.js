import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Player } from '@react-native-community/audio-toolkit';

const WriteScreen = () => {
  const [ramCount, setRamCount] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const animatedValue = useSharedValue(0);
  const playerRef = useRef(null);


 

  useEffect(() => {
    playerRef.current = new Player('ram_chant.m4a');
  }, []);

  const handleGesture = (event) => {
    // This is a placeholder. You'll need to implement actual Hindi character recognition here.
    const newChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    setCurrentWord(currentWord + newChar);
  };

  const handleWordComplete = () => {
    if (currentWord.toLowerCase() === 'ram') {
      setRamCount(ramCount + 1);
      // Trigger animation
      animatedValue.value = 1;
      setTimeout(() => {
        animatedValue.value = 0;
      }, 500);
      playerRef.current.play();
    }
    setCurrentWord('');
  };

 //const animatedValue = useSharedValue(0);
 const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [
      { translateY: withSpring(animatedValue.value * -100) },
      { scale: withSpring(1 - animatedValue.value * 0.5) },
    ],
    opacity: withSpring(1 - animatedValue.value),
  };
});



  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.countText}>Ram Count: {ramCount}</Text>
      <Image source={require('../assets/hanuman.png')} style={styles.image} />
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={styles.writeArea}>
          <Text style={styles.currentWord}>{currentWord}</Text>
        </View>
      </PanGestureHandler>
      <TouchableOpacity style={styles.button} onPress={handleWordComplete}>
        <Text style={styles.buttonText}>Complete Word</Text>
      </TouchableOpacity>
      <Animated.Text style={[styles.floatingRam, animatedStyle]}>राम</Animated.Text>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  writeArea: {
    width: 300,
    height: 150,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentWord: {
    fontSize: 36,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  floatingRam: {
    position: 'absolute',
    fontSize: 36,
    color: '#ff0000',
  },
});

export default WriteScreen;