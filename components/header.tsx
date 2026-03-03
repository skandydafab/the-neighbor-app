/**
 * Header Component
 * Fixed header that appears at the top of every screen
 * 
 * Contains:
 * - Hamburger menu icon (left)
 * - "The Neighbor" title (center) - tappable to go home
 * - "Sign In" link (right)
 */

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

// Props interface - allows parent components to control menu state
interface HeaderProps {
  onMenuPress: () => void;  // Function to call when hamburger is tapped
}

export default function Header({ onMenuPress }: HeaderProps) {
  const router = useRouter();

  // Navigate to homepage when title is tapped
  const handleTitlePress = () => {
    router.push('/');
  };

  // Navigate to sign-in page (not implemented yet)
  const handleSignInPress = () => {
    // TODO: Implement sign-in navigation
    console.log('Sign In pressed');
  };

  return (
    <View style={styles.container}>
      {/* Left: Hamburger Menu Button */}
      <TouchableOpacity 
        onPress={onMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}  // Slight opacity change when pressed
      >
        {/* Three horizontal lines for hamburger icon */}
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
      </TouchableOpacity>

      {/* Center: "The Neighbor" Title - tappable to go home */}
      <TouchableOpacity 
        onPress={handleTitlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>The Neighbor</Text>
      </TouchableOpacity>

      {/* Right: Sign In Link */}
      <TouchableOpacity 
        onPress={handleSignInPress}
        activeOpacity={0.7}
      >
        <Text style={styles.signIn}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main header container
  container: {
    flexDirection: 'row',           // Arrange items horizontally
    alignItems: 'center',           // Vertically center all items
    justifyContent: 'space-between', // Space items evenly (left, center, right)
    backgroundColor: Colors.headerBackground, // White background
    paddingHorizontal: 20,          // Horizontal padding
    paddingVertical: 15,            // Vertical padding
    borderBottomWidth: 1,           // Thin bottom border
    borderBottomColor: Colors.headerBorder, // Light gray border
    
    // Safe area handling for notched devices
    paddingTop: 50,  // Extra padding for status bar (iOS notch, etc.)
  },

  // Hamburger menu button (left side)
  menuButton: {
    width: 30,      // Fixed width for consistent touch target
    height: 30,     // Fixed height
    justifyContent: 'space-around', // Space the lines evenly
    paddingVertical: 5,
  },

  // Individual hamburger line
  hamburgerLine: {
    width: 25,                  // Line width
    height: 2,                  // Line thickness
    backgroundColor: Colors.text, // Black lines
    borderRadius: 1,            // Slightly rounded edges
  },

  // "The Neighbor" title (center)
  title: {
    fontFamily: Fonts.title,
    fontSize: 29,
    color: Colors.text,
    letterSpacing: 0.5,
  },

  // "Sign In" text (right)
  signIn: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
});