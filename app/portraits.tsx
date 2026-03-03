/**
 * Portraits Section Screen
 * Displays a list of character profiles
 */

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { TextStyles } from '@/constants/Typography';
import Header from '@/components/header';
import HamburgerMenu from '@/components/HamburgerMenu';
import PortraitCard from '@/components/PortraitCard';
import { portraits } from '@/data/portraits';  // Import from data file

export default function PortraitsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header onMenuPress={() => setMenuVisible(true)} />
      <HamburgerMenu 
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>PORTRAITS</Text>

        {portraits.map((portrait) => (
          <PortraitCard 
            key={portrait.id} 
            id={portrait.id}
            category={portrait.category}
            name={portrait.name}
            description={portrait.description}
            fullContent={portrait.fullContent}
            iconUrl={portrait.iconUrl}
            date={portrait.date}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    ...TextStyles.sectionHeader,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
});