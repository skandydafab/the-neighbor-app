/**
 * Article Detail Screen
 * Template for displaying full article content
 * 
 * Used for both Fiction and Portraits articles
 * 
 * Structure:
 * - Category tag at top (18pt, DaVinci SemiBold, all caps)
 * - Article title (47pt, DaVinci Medium, all caps, centered)
 * - Author name (16pt, Geist Mono medium, centered)
 * - Date (DD/MM/YYYY format, centered)
 * - Full article text content
 */
/**
 * Article Detail Screen
 * Template for displaying full article content
 * Used for both Fiction and Portraits articles
 */

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

export default function ArticleDetailScreen() {
  // Get article data passed from navigation
  const params = useLocalSearchParams();
  const {
    title = 'Article Title',
    author = 'Author Name',
    category = 'CATEGORY',
    fullContent = '',  // Changed from 'content' to 'fullContent'
    date = '20/12/2024',
  } = params;

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category tag */}
        <Text style={styles.category}>{String(category).toUpperCase()}</Text>

        {/* Article title */}
        <Text style={styles.title}>{String(title).toUpperCase()}</Text>

        {/* Author name */}
        <Text style={styles.author}>{author}</Text>

        {/* Date */}
        <Text style={styles.date}>{date}</Text>

        {/* Article content - justified text */}
        <Text style={styles.content}>{fullContent}</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 60,
    alignItems: 'center',
  },

  category: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 18,
    letterSpacing: 1.5,
    color: Colors.accent,
    textAlign: 'center',
    marginBottom: 12,
  },

  title: {
    fontFamily: Fonts.titleMedium,
    fontSize: 47,
    lineHeight: 54,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
    width: '100%',
  },

  author: {
    fontFamily: Fonts.body,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },

  date: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 50,
  },

  // Article body text - JUSTIFIED
  content: {
    fontFamily: Fonts.body,
    fontSize: 16,
    lineHeight: 28,
    color: Colors.text,
    letterSpacing: 0.2,
    width: '100%',
    textAlign: 'justify',  // Justified text
  },
});