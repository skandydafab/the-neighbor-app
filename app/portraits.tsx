/**
 * Portraits Section Screen
 * Displays a list of character profiles
 */

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { TextStyles } from '@/constants/Typography';
import PortraitCard from '@/components/PortraitCard';
import { portraits } from '@/data/portraits';  // Import from data file

export default function PortraitsScreen() {
  return (
    <View style={styles.container}>
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
            author={portrait.author}
            iconUrl={portrait.iconUrl}
            date={portrait.date}
            contentSections={portrait.contentSections}
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