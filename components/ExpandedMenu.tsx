/**
 * Expanded Menu Component
 * Modal that displays additional navigation items:
 * - About
 * - Sign Up
 * - Buy Me a Coffee (external link)
 * - Submit Content (in-app content submission form)
 * - Share Feedback (in-app feedback form)
 */

import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

// Buy Me a Coffee page
const BUY_ME_A_COFFEE_URL = 'https://buymeacoffee.com/theneighbor';

interface ExpandedMenuProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  action: 'navigate' | 'external';
  route?: Href;
  url?: string;
}

const menuItems: MenuItem[] = [
  {
    label: 'About',
    icon: 'information-circle-outline',
    action: 'navigate',
    route: '/about' as Href,
  },
  {
    label: 'Sign Up',
    icon: 'person-add-outline',
    action: 'navigate',
    route: '/signup' as Href,
  },
  {
    label: 'Buy Me a Coffee',
    icon: 'cafe-outline',
    action: 'external',
    url: BUY_ME_A_COFFEE_URL,
  },
  {
    label: 'Submit Content',
    icon: 'create-outline',
    action: 'navigate',
    route: '/submit-content' as Href,
  },
  {
    label: 'Share Feedback',
    icon: 'chatbubble-outline',
    action: 'navigate',
    route: '/feedback' as Href,
  },
];

export default function ExpandedMenu({ visible, onClose }: ExpandedMenuProps) {
  const router = useRouter();

  const handleItemPress = async (item: MenuItem) => {
    onClose();
    if (item.action === 'navigate' && item.route) {
      router.push(item.route);
    } else if (item.action === 'external' && item.url) {
      try {
        await Linking.openURL(item.url);
      } catch (error) {
        console.error('Error opening URL:', error);
      }
    }
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
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={Colors.text}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuItemText}>{item.label}</Text>
              {item.action === 'external' && (
                <Ionicons
                  name="open-outline"
                  size={14}
                  color={Colors.textSecondary}
                  style={styles.externalIcon}
                />
              )}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  menuItemLast: {
    borderBottomWidth: 0,
  },

  menuItemIcon: {
    marginRight: 12,
  },

  menuItemText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
  },

  externalIcon: {
    marginLeft: 8,
  },
});
