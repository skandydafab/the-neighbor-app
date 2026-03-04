/**
 * Loading Screen Component
 * Displays while app/fonts are loading
 * Cycles through portrait icons quickly
 */

import { View, Image, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Colors from '@/constants/Colors';

const loadingImages = [
  require('../assets/images/RUBIN KEY1.png'),
  require('../assets/images/MILLER KEY1.png'),
  require('../assets/images/HEDGEHOG KEY1.png'),
];

export default function LoadingScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      setCurrentImageIndex((prev) => (prev + 1) % loadingImages.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={loadingImages[currentImageIndex]}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
});
