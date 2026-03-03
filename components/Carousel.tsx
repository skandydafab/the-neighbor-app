import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Squircle image is 1086x1266 — ratio ≈ 0.858
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
      {/* This is the squircle — the PNG is the only background */}
      <View style={styles.squircleFrame}>
        <Image
          source={squircleBackground}
          style={styles.squirclePng}
          resizeMode="contain"
        />

        {/* Everything below is layered on top of the squircle */}
        <View style={styles.overlay}>
          <Image
            source={currentSlide.image}
            style={styles.helmuthImage}
            resizeMode="contain"
          />

          {currentSlide?.caption && (
            <Text style={styles.caption}>{currentSlide.caption}</Text>
          )}

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },

  /* Sized exactly to the squircle's native ratio so nothing gets clipped */
  squircleFrame: {
    width: SQUIRCLE_WIDTH,
    height: SQUIRCLE_HEIGHT,
  },

  /* The PNG fills the frame entirely — contain keeps the border intact */
  squirclePng: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  /* Content layer sits on top, centred inside the squircle */
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

  caption: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 6,
  },

  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -11 }],
    paddingHorizontal: 2,
  },

  arrowHit: {
    padding: 10,
  },
});
