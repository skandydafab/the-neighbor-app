/**
 * Bottom Navigation Bar Component
 * Fixed navigation at the bottom of the screen
 * 
 * Main tabs: Fiction, Literature Review, Films & Music, Portraits
 * Additional menu: Neighborhood, About, Sign Up (accessible via "More" icon)
 */

import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import ExpandedMenu from '@/components/ExpandedMenu';
import { useState } from 'react';

interface NavItem {
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const navItems: NavItem[] = [
  { route: '/', icon: 'home', label: 'Home' },
  { route: '/fiction', icon: 'book', label: 'Fiction' },
  { route: '/literature-review', icon: 'reader', label: 'Literature' },
  { route: '/films-music', icon: 'film', label: 'Films & Music' },
  { route: '/portraits', icon: 'people', label: 'Portraits' },
];

const ICON_SIZE = 24;
const BAR_HEIGHT = 60;

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const isActive = (route: string) => {
    return pathname === route;
  };

  return (
    <>
      <View style={styles.navBar}>
        {navItems.map((item) => {
          const active = isActive(item.route);
          return (
            <TouchableOpacity
              key={item.route}
              style={styles.navItem}
              onPress={() => handleNavigation(item.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon}
                size={ICON_SIZE}
                color={active ? Colors.accent : Colors.text}
              />
            </TouchableOpacity>
          );
        })}

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

      {/* Expanded Menu Modal */}
      <ExpandedMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: BAR_HEIGHT,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 8,
  },

  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
