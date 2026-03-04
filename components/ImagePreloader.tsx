/**
 * Image Preloader Component
 * Preloads images before the app fully renders
 * Shows loading state while preloading completes
 */

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

interface PreloaderProps {
  children?: React.ReactNode;
  onComplete: () => void;
}

// Critical images to preload - carousel and home page images
const CRITICAL_IMAGES = [
  require('../assets/images/Image Assets/0. Global/squircles/helmuth-phone.png'),
  require('../assets/images/Image Assets/1. Home/helmuth/public.png'),
  require('../assets/images/Image Assets/1. Home/helmuth/naked.png'),
  require('../assets/images/Image Assets/1. Home/helmuth/marathon.png'),
  require('../assets/images/Image Assets/1. Home/helmuth/lawyer.png'),
  require('../assets/images/Image Assets/1. Home/helmuth/orang.png'),
];

export default function ImagePreloader({ children, onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Preload all critical images
        await Promise.all(
          CRITICAL_IMAGES.map((img) => Image.prefetch(Image.resolveAssetSource(img).uri))
        );
      } catch (e) {
        // Preload failed, but don't block - images will load on demand
        console.log('Image preload skipped:', e);
      } finally {
        setLoading(false);
        onComplete();
      }
    };

    // Small delay to let the UI render first
    const timer = setTimeout(preloadImages, 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Preparing...</Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text,
  },
});
