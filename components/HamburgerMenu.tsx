import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

interface HamburgerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const contentItems = [
  { label: 'Fiction', route: '/fiction' as Href },
  { label: 'Literature Review', route: '/literature-review' as Href },
  { label: 'Films & Music', route: '/films-music' as Href },
  { label: 'Portraits', route: '/portraits' as Href },
];

const utilityItems = [
  { label: 'Neighborhood', route: '/neighborhood' as Href },
  { label: 'About', route: '/about' as Href },
  { label: 'Sign Up', route: '/signup' as Href },
];

export default function HamburgerMenu({ visible, onClose }: HamburgerMenuProps) {
  const router = useRouter();

  const handleNavigate = (route: Href) => {
    onClose();
    router.push(route);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          <View style={styles.contentSection}>
            {contentItems.map((item, index) => (
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

          <Text style={styles.heartSeparator}>♥</Text>

          <View style={styles.utilitySection}>
            {utilityItems.map((item, index) => (
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
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#EDE8EE',
  },

  menuContainer: {
    paddingTop: 120,
    paddingHorizontal: 46,
  },

  contentSection: {
    marginBottom: 10,
  },

  utilitySection: {
    marginTop: 10,
  },

  menuItem: {
    marginBottom: 12,
  },

  menuItemText: {
    fontFamily: Fonts.title,
    fontSize: 36,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 54,
  },

  heartSeparator: {
    fontSize: 16,
    color: Colors.accent,
    marginVertical: 16,
  },
});
