/**
 * Bottom Navigation Bar Component
 * Floating capsule navigation at the bottom of the screen
 *
 * Main tabs: Home, Content (expandable), Neighborhood, More (...)
 * Content sub-menu: Fiction, Literature Review, Films & Music, Portraits
 * More menu: About, Sign Up, Buy Me a Coffee, Share Feedback
 */

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState, useEffect } from 'react';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';
import ExpandedMenu from '@/components/ExpandedMenu';

interface ContentRoute {
  route: string;
  label: string;
}

const contentRoutes: ContentRoute[] = [
  { route: '/fiction', label: 'Fiction' },
  { route: '/literature-review', label: 'Literature' },
  { route: '/films-music', label: 'Films & Music' },
  { route: '/portraits', label: 'Portraits' },
];

const CONTENT_ROUTE_PATHS = contentRoutes.map((r) => r.route);

const ICON_SIZE = 22;

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const [contentMenuVisible, setContentMenuVisible] = useState(false);

  // Animation values for content pill row
  const pillAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(pillAnim, {
      toValue: contentMenuVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [contentMenuVisible]);

  const isActive = (route: string) => pathname === route;
  const isContentActive = CONTENT_ROUTE_PATHS.includes(pathname);

  const handleContentPress = () => {
    setContentMenuVisible((prev) => !prev);
  };

  const handleContentRoutePress = (route: string) => {
    setContentMenuVisible(false);
    router.replace(route as any);
  };

  const handleHomePress = () => {
    setContentMenuVisible(false);
    router.replace('/' as any);
  };

  const handleNeighborhoodPress = () => {
    setContentMenuVisible(false);
    router.replace('/neighborhood' as any);
  };

  const dismissContentMenu = () => {
    setContentMenuVisible(false);
  };

  // Interpolated animation values
  const pillTranslateY = pillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });
  const pillOpacity = pillAnim;

  return (
    <>
      {/* Transparent overlay to dismiss content menu */}
      {contentMenuVisible && (
        <Pressable style={styles.contentOverlay} onPress={dismissContentMenu} />
      )}

      {/* Wrapper to contain pill row + capsule together */}
      <View style={styles.bottomWrapper}>
        {/* Content pill row - floats above the capsule */}
        <Animated.View
          style={[
            styles.pillRow,
            {
              opacity: pillOpacity,
              transform: [{ translateY: pillTranslateY }],
            },
          ]}
          pointerEvents={contentMenuVisible ? 'auto' : 'none'}
        >
          {contentRoutes.map((item) => {
            const active = isActive(item.route);
            return (
              <TouchableOpacity
                key={item.route}
                style={[styles.pill, active && styles.pillActive]}
                onPress={() => handleContentRoutePress(item.route)}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* Floating capsule nav bar */}
        <View style={styles.capsule}>
          {/* Home */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={handleHomePress}
            activeOpacity={0.7}
          >
            <Ionicons
              name="home"
              size={ICON_SIZE}
              color={isActive('/') ? Colors.accent : Colors.text}
            />
          </TouchableOpacity>

          {/* Content (expandable) */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={handleContentPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name="newspaper-outline"
              size={ICON_SIZE}
              color={
                isContentActive || contentMenuVisible
                  ? Colors.accent
                  : Colors.text
              }
            />
          </TouchableOpacity>

          {/* Neighborhood */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={handleNeighborhoodPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name="globe-outline"
              size={ICON_SIZE}
              color={isActive('/neighborhood') ? Colors.accent : Colors.text}
            />
          </TouchableOpacity>

          {/* More Menu Button */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={ICON_SIZE}
              color={Colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Expanded Menu Modal */}
      <ExpandedMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },

  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
    paddingBottom: 28,
    zIndex: 11,
  },

  pillRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.text,
    backgroundColor: Colors.background,
  },

  pillActive: {
    borderColor: Colors.accent,
    backgroundColor: '#FFF0F0',
  },

  pillText: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.text,
  },

  pillTextActive: {
    color: Colors.accent,
  },

  capsule: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 52,
    backgroundColor: Colors.background,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
