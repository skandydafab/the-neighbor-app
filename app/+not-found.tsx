/**
 * 404 Not Found Screen
 * This screen appears when users navigate to a route that doesn't exist
 */

import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

export default function NotFoundScreen() {
  return (
    <>
      {/* Set the header title for this screen */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      
      {/* Main container - centered content */}
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        {/* Link back to homepage */}
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background, // Use our cream background
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.titleSemiBold, // Use DaVinci font
    color: Colors.text,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    fontFamily: Fonts.body, // Use Geist Mono font
    color: Colors.accent, // Use our red accent color
  },
});