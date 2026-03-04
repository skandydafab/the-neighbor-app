import { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts, TextStyles } from '@/constants/Typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ArticleCardProps {
  id: string;
  category: string;
  title: string;
  description: string;
  fullContent: string;
  author: string;
  imageUrl?: any;
  date?: string;
}

export default function ArticleCard({
  id,
  category,
  title,
  description,
  fullContent,
  author,
  imageUrl,
  date,
}: ArticleCardProps) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const [showOverlay, setShowOverlay] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      speed: 50,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 20,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    // Show overlay and animate exit
    setShowOverlay(true);

    Animated.sequence([
      // Brief scale-up pop on the card
      Animated.spring(scaleAnim, {
        toValue: 1.03,
        speed: 30,
        bounciness: 2,
        useNativeDriver: true,
      }),
      // Fade overlay in + fade card out simultaneously
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Navigate after animation completes
      router.push({
        pathname: '/article-detail',
        params: {
          id,
          title,
          author,
          category,
          fullContent,
          date: date || '20/12/2024',
        },
      });

      // Reset animation values for when user comes back
      setTimeout(() => {
        scaleAnim.setValue(1);
        overlayOpacity.setValue(0);
        cardOpacity.setValue(1);
        setShowOverlay(false);
      }, 500);
    });
  };

  return (
    <View style={styles.outerWrapper}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: cardOpacity,
          },
        ]}
      >
        <Pressable
          style={styles.container}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          hitSlop={8}
        >
          {imageUrl ? (
            <Image
              source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>Image</Text>
            </View>
          )}

          <View style={styles.textContent}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.author}>{author}</Text>
          </View>

          <View style={styles.divider} />
        </Pressable>
      </Animated.View>

      {/* Full-screen overlay that covers the transition */}
      {showOverlay && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.overlay,
            { opacity: overlayOpacity },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: '90%',
    alignItems: 'center',
  },

  animatedContainer: {
    width: '100%',
  },

  container: {
    width: '100%',
    backgroundColor: Colors.background,
    marginBottom: 20,
    alignItems: 'center',
  },

  overlay: {
    position: 'absolute',
    top: -SCREEN_HEIGHT,
    left: -SCREEN_WIDTH,
    width: SCREEN_WIDTH * 3,
    height: SCREEN_HEIGHT * 3,
    backgroundColor: Colors.background,
    zIndex: 999,
  },

  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },

  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E5E5',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: '#999',
  },

  textContent: {
    width: '100%',
    alignItems: 'flex-start',
  },

  category: {
    ...TextStyles.category,
    color: Colors.accent,
    marginBottom: 6,
  },

  title: {
    ...TextStyles.articleTitle,
    color: Colors.text,
    marginBottom: 8,
  },

  description: {
    ...TextStyles.body,
    color: Colors.text,
    marginBottom: 4,
    lineHeight: 22,
  },

  author: {
    ...TextStyles.author,
    color: Colors.text,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 20,
  },
});
