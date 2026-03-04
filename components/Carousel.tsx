import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SQUIRCLE_WIDTH = SCREEN_WIDTH * 0.85;
const SQUIRCLE_HEIGHT = SQUIRCLE_WIDTH * (1266 / 1086);

export interface CarouselSlide {
  id: string;
  image: any;
  caption?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  squircleBackground?: any;
}

export default function Carousel({ slides, squircleBackground }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.squircleFrame}>
        <Image
          source={squircleBackground}
          style={styles.squirclePng}
          contentFit="contain"
        />

        <View style={styles.overlay}>
          <Image
            source={currentSlide.image}
            style={styles.helmuthImage}
            contentFit="contain"
          />

          <View style={styles.captionContainer}>
            {currentSlide?.caption && (
              <Text style={styles.caption} numberOfLines={1} adjustsFontSizeToFit>
                {currentSlide.caption}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.arrowRow}>
          <TouchableOpacity onPress={handlePrevSlide} style={styles.arrowHit}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextSlide} style={styles.arrowHit}>
            <Ionicons name="arrow-forward" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  squircleFrame: {
    width: SQUIRCLE_WIDTH,
    height: SQUIRCLE_HEIGHT,
  },
  squirclePng: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  helmuthImage: {
    width: '90%',
    height: '75%',
  },
  captionContainer: {
    height: 24,
    justifyContent: 'center',
    marginTop: 6,
  },
  caption: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
  },
  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '50%',
    left: 10,
    right: 10,
    transform: [{ translateY: -11 }],
  },
  arrowHit: {
    padding: 10,
  },
});
