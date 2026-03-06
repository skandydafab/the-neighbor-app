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
 * - Share button
 *
 * Entrance animation: content elements stagger in from below
 * with a subtle slide-up and fade effect.
 */

import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Share, Animated, Pressable, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

// TODO: Once the app is launched on the App Store, change this to a "Download the app" link
const SHARE_URL = 'https://theneighborr.com';

export default function ArticleDetailScreen() {
  // Get article data passed from navigation
  const params = useLocalSearchParams();
  const {
    title = 'Article Title',
    author = 'Author Name',
    category = 'CATEGORY',
    fullContent = '',
    date = '20/12/2024',
    contentSections = undefined,
  } = params;

  // Parse content sections if they exist
  const parsedContentSections = contentSections ? JSON.parse(String(contentSections)) : null;

  // --- Staggered entrance animation values (0 = hidden, 1 = visible) ---
  const categoryAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const authorAnim = useRef(new Animated.Value(0)).current;
  const dateAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const shareAnim = useRef(new Animated.Value(0)).current;

  // --- Share button press animation ---
  const shareScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered entrance: each element starts 80ms after the previous
    Animated.stagger(80, [
      Animated.timing(categoryAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(authorAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(dateAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(shareAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Helper to build animated style from a 0->1 animated value
  const getAnimatedStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  });

  const handleSharePressIn = () => {
    Animated.spring(shareScaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handleSharePressOut = () => {
    Animated.spring(shareScaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${String(title)}" by ${String(author)} — on The Neighbor\n\n${SHARE_URL}`,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  // Content sections component to render text and images
  const ContentSectionsComponent = () => {
    if (!parsedContentSections || parsedContentSections.length === 0) {
      return <Text style={styles.content}>{fullContent}</Text>;
    }

    return (
      <>
        {parsedContentSections.map((section, index) => (
          <View key={index} style={styles.contentSection}>
            {section.type === 'text' && (
              <Text style={styles.content}>{section.content}</Text>
            )}
            {section.type === 'image' && section.imageUrl && (
              <View style={styles.mediaContainer}>
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={section.imageUrl}
                    style={styles.mediaImage}
                    resizeMode="contain"
                  />
                </View>
                {section.caption && (
                  <Text style={styles.mediaCaption}>{section.caption}</Text>
                )}
              </View>
            )}
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category tag */}
        <Animated.View style={[{ width: '100%' }, getAnimatedStyle(categoryAnim)]}>
          <Text style={styles.category}>{String(category).toUpperCase()}</Text>
        </Animated.View>

        {/* Article title */}
        <Animated.View style={[{ width: '100%' }, getAnimatedStyle(titleAnim)]}>
          <Text style={styles.title}>{String(title).toUpperCase()}</Text>
        </Animated.View>

        {/* Author name */}
        <Animated.View style={[{ width: '100%' }, getAnimatedStyle(authorAnim)]}>
          <Text style={styles.author}>{author}</Text>
        </Animated.View>

        {/* Date */}
        <Animated.View style={[{ width: '100%' }, getAnimatedStyle(dateAnim)]}>
          <Text style={styles.date}>{date}</Text>
        </Animated.View>

        {/* Article content - justified text with sections */}
        <Animated.View style={[{ width: '100%' }, getAnimatedStyle(contentAnim)]}>
          <ContentSectionsComponent />
        </Animated.View>

        {/* Share button */}
        <Animated.View style={[{ width: '100%' }, getAnimatedStyle(shareAnim)]}>
          <View style={styles.shareSection}>
            <View style={styles.shareDivider} />
            <Pressable
              onPressIn={handleSharePressIn}
              onPressOut={handleSharePressOut}
              onPress={handleShare}
              hitSlop={16}
            >
              <Animated.View
                style={[
                  styles.shareButton,
                  { transform: [{ scale: shareScaleAnim }] },
                ]}
              >
                <Ionicons name="share-outline" size={22} color={Colors.accent} />
              </Animated.View>
            </Pressable>
          </View>
        </Animated.View>
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
    textAlign: 'justify',
  },

  contentSection: {
    marginBottom: 20,
  },

  // Media styles
  mediaContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 30,
  },
  mediaImageContainer: {
    width: 200, // Much smaller width
    height: 260, // Proportional height
    borderRadius: 80, // Adjusted border radius
    overflow: 'hidden',
    marginBottom: 15,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  mediaCaption: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 5,
  },

  shareSection: {
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },

  shareDivider: {
    width: 40,
    height: 1,
    backgroundColor: Colors.accent,
    marginBottom: 20,
  },

  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
});
