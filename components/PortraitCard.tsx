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
import { Fonts } from '@/constants/Typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PortraitCardProps {
  id: string;
  category: string;
  name: string;
  description: string;
  fullContent: string;
  author: string;
  iconUrl: any;
  date: string;
  contentSections?: {
    type: 'text' | 'image';
    content: string;
    imageUrl?: any;
    caption?: string;
  }[];
}

export default function PortraitCard({
  id,
  category,
  name,
  description,
  fullContent,
  author,
  iconUrl,
  date,
  contentSections,
}: PortraitCardProps) {
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
          title: name,
          author: author,
          category: category,
          fullContent,
          date,
          contentSections: contentSections ? JSON.stringify(contentSections) : undefined,
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
          <Image
            source={iconUrl}
            style={styles.icon}
            contentFit="contain"
            transition={200}
          />

          <Text style={styles.category}>{category}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.author}>{author}</Text>
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
    alignItems: 'center',
    marginBottom: 70,
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

  icon: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },

  category: {
    fontFamily: Fonts.body,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: Colors.accent,
    marginBottom: 4,
    textTransform: 'uppercase',
  },

  name: {
    fontFamily: Fonts.title,
    fontSize: 20,
    color: Colors.text,
    marginBottom: 4,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'normal',
  },

  description: {
    fontFamily: Fonts.body,
    fontSize: 11,
    fontWeight: '400',
    color: Colors.text,
    lineHeight: 14,
    textAlign: 'center',
  },
  author: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
    marginTop: 8,
  },
});
