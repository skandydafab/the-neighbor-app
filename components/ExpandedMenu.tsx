/**
 * Expanded Menu Component
 * Modal that displays additional navigation items:
 * - Neighborhood
 * - About
 * - Sign Up
 */

import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

interface ExpandedMenuProps {
  visible: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Neighborhood', route: '/neighborhood' as Href },
  { label: 'About', route: '/about' as Href },
  { label: 'Sign Up', route: '/signup' as Href },
];

export default function ExpandedMenu({ visible, onClose }: ExpandedMenuProps) {
  const router = useRouter();

  const handleNavigate = (route: Href) => {
    onClose();
    router.push(route);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Menu Panel - positioned at bottom */}
        <View style={styles.menuPanel}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },

  menuPanel: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },

  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  menuItemText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
});
