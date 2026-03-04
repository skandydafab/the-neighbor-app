/**
 * Root Layout Component
 * Entry point for app navigation structure
 * Sets up fonts, loading screen, and bottom navigation
 */

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HeadlandOne_400Regular } from '@expo-google-fonts/headland-one';
import Colors from '@/constants/Colors';
import LoadingScreen from '@/components/LoadingScreen';
import ImagePreloader from '@/components/ImagePreloader';
import BottomNavBar from '@/components/BottomNavBar';
import { usePathname } from 'expo-router';

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

// Screens that should NOT show the bottom nav (e.g., full-screen reading experiences)
const hiddenNavRoutes: string[] = [];

function RootLayoutContent() {
  const pathname = usePathname();
  const shouldShowNav = !hiddenNavRoutes.includes(pathname);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: Colors.background,
            },
            animation: 'fade',
            animationDuration: 150,
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{ title: 'Home' }} 
          />
          <Stack.Screen 
            name="fiction" 
            options={{ title: 'Fiction' }} 
          />
          <Stack.Screen 
            name="literature-review" 
            options={{ title: 'Literature Review' }} 
          />
          <Stack.Screen 
            name="films-music" 
            options={{ title: 'Films & Music' }} 
          />
          <Stack.Screen 
            name="portraits" 
            options={{ title: 'Portraits' }} 
          />
          <Stack.Screen 
            name="article-detail" 
            options={{ title: 'Article' }} 
          />
          <Stack.Screen 
            name="signup" 
            options={{ title: 'Sign Up' }} 
          />
          <Stack.Screen 
            name="neighborhood" 
            options={{ title: 'Neighborhood' }} 
          />
          <Stack.Screen 
            name="feedback" 
            options={{ title: 'Share Feedback' }} 
          />
          <Stack.Screen 
            name="submit-content" 
            options={{ title: 'Submit Content' }} 
          />
        </Stack>
        {shouldShowNav && <BottomNavBar />}
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'DaVinci-Regular': require('../assets/fonts/TRJNDaVinci-Regular-Trial.otf'),
    'DaVinci-Medium': require('../assets/fonts/TRJNDaVinci-Medium-Trial.otf'),
    'DaVinci-SemiBold': require('../assets/fonts/TRJNDaVinci-Semibold-Trial.otf'),
    'DaVinci-Italic': require('../assets/fonts/TRJNDaVinci-Italic-Trial.otf'),
    'GeistMono': require('../assets/fonts/GeistMono-VariableFont_wght.ttf'),
    HeadlandOne_400Regular,
  });

  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show loading screen while fonts load
  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  // Preload images before showing the app
  if (!imagesPreloaded) {
    return (
      <ImagePreloader onComplete={() => setImagesPreloaded(true)} />
    );
  }

  return (
    <SafeAreaProvider>
      <RootLayoutContent />
    </SafeAreaProvider>
  );
}