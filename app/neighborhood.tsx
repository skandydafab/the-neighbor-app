import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, ActivityIndicator, Dimensions, Animated, StatusBar, PanResponder, Pressable } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

const BACKEND_URL = 'https://the-neighbor.onrender.com';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Neighbor {
  firstname: string;
  lastname: string;
  email: string;
  location: string | null;
  activity: string | null;
  image_url: string | null;
  original_image_url: string | null;
  created_at: string;
}

const PINK = '#FF9AA2';

export default function NeighborhoodScreen() {
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNeighbor, setSelectedNeighbor] = useState<Neighbor | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(false);

  useEffect(() => {
    fetchNeighbors();
  }, []);

  const fetchNeighbors = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/community`);
      const data = await response.json();
      setNeighbors(data);
    } catch (error) {
      console.error('Failed to fetch neighbors:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleNeighborPress = (neighbor: Neighbor) => {
    setSelectedNeighbor(neighbor);
    setModalVisible(true);
  };

  const neighborsWithImages = neighbors.filter(n => n.image_url);
  const previewNeighbors = neighborsWithImages.slice(0, 6);

  const renderPreviewGrid = () => {
    const rows = [];
    for (let i = 0; i < previewNeighbors.length; i += 3) {
      const rowItems = previewNeighbors.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.previewRow}>
          {rowItems.map((neighbor, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.previewItem}
              onPress={() => handleNeighborPress(neighbor)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: neighbor.image_url! }} style={styles.previewImage} />
              <Text style={styles.previewName} numberOfLines={1}>
                {neighbor.firstname || ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Welcome to the neighborhood</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.accent} style={styles.loader} />
        ) : (
          <>
            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>meet your neighbors</Text>
              <View style={styles.previewGrid}>
                {renderPreviewGrid()}
              </View>
              <Text style={styles.previewMore}>and many more, see them by entering the neighborhood</Text>
            </View>

            <TouchableOpacity
              style={styles.enterButton}
              onPress={() => setInteractiveMode(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.enterButtonText}>Enter Neighborhood</Text>
            </TouchableOpacity>

            <View style={styles.wallSection}>
              <Text style={styles.wallText}>This is the neighborhood wall</Text>
            </View>

            <View style={styles.countSection}>
              <Text style={styles.countLabel}>Number of neighbors to this day:</Text>
              <Text style={styles.countValue}>{neighbors.length}</Text>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionText}>
                A neighbor is anyone who follows The Neighbor: readers, writers, illustrators. Together, they form the neighborhood, a living, growing, delicious community.
              </Text>
            </View>

            <View style={styles.imageSection}>
              <Image
                source={require('../assets/images/Image Assets/7. Neighborhood/neighbors-pic.png')}
                style={styles.placeholderImage1}
                resizeMode="contain"
              />
            </View>

            <View style={styles.ctaSection}>
              <Text style={styles.ctaText}>You can sign up, move in, become a neighbor, and get all the perks.</Text>
              <Text style={styles.ctaSubtext}>When becoming a neighbor, you get your spot on the wall and access to our newsletter: The Local Lunatic. The neighborhood is in scaffolding, with much to arrive in the future.</Text>
            </View>

            <View style={styles.imageSection}>
              <Image
                source={require('../assets/images/Image Assets/7. Neighborhood/local-lunatic.png')}
                style={styles.placeholderImage2}
                resizeMode="contain"
              />
            </View>
          </>
        )}
      </ScrollView>

      {interactiveMode && (
        <InteractiveNeighborhood
          neighbors={neighborsWithImages}
          onClose={() => setInteractiveMode(false)}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {selectedNeighbor && (
              <>
                <Text style={styles.modalName}>{selectedNeighbor.firstname || ''} {selectedNeighbor.lastname || ''}</Text>
                {selectedNeighbor.location && <Text style={styles.modalDetail}>Location: {selectedNeighbor.location}</Text>}
                <Text style={styles.modalDetail}>Joined: {formatDate(selectedNeighbor.created_at)}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function NeighborItem({ neighbor, x, y, onTap }: { neighbor: Neighbor; x: number; y: number; onTap: (n: Neighbor) => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onTap(neighbor)}
      style={[styles.worldNeighbor, { left: x, top: y }]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Animated.View style={[styles.neighborItemInner, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={{ uri: neighbor.image_url! }} style={styles.worldNeighborImage} />
        <Text style={styles.worldNeighborName}>{neighbor.firstname || ''}</Text>
      </Animated.View>
    </Pressable>
  );
}

function NeighborPopup({ neighbor, onClose }: { neighbor: Neighbor; onClose: () => void }) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.8)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  const getDaysAgo = (dateString: string) => {
    const created = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 14,
        bounciness: 6,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  return (
    <Animated.View style={[styles.interactiveModal, { opacity: overlayOpacity }]}>
      <Pressable style={styles.interactiveModalTouchArea} onPress={handleClose}>
        <Animated.View style={[styles.interactiveModalContent, { transform: [{ scale: cardScale }], opacity: cardOpacity }]}>
          <Text style={styles.interactiveModalName}>
            {neighbor.firstname} {neighbor.lastname}
          </Text>
          <Text style={styles.interactiveModalJoined}>
            joined {getDaysAgo(neighbor.created_at)}
          </Text>
          {neighbor.location && (
            <Text style={styles.interactiveModalLocation}>
              {neighbor.location}
            </Text>
          )}
          <Text style={styles.interactiveModalHint}>tap to close</Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

function InteractiveNeighborhood({
  neighbors,
  onClose,
}: {
  neighbors: Neighbor[];
  onClose: () => void;
}) {
  const [selectedNeighbor, setSelectedNeighbor] = useState<Neighbor | null>(null);

  const WORLD_WIDTH = SCREEN_WIDTH * 5;
  const WORLD_HEIGHT = SCREEN_HEIGHT * 2;

  const neighborPositions = neighbors.map((neighbor, index) => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angle = index * goldenRatio * 2 * Math.PI;
    const radiusFraction = (index + 1) / neighbors.length;
    const x = 80 + (WORLD_WIDTH - 160) * radiusFraction + (Math.sin(angle) * 50);
    const y = 100 + ((Math.cos(angle * 3) + 1) / 2) * (WORLD_HEIGHT - 220);
    return { neighbor, x, y, key: index };
  });

  return (
    <Modal visible animationType="fade">
      <StatusBar hidden />
      <View style={styles.interactiveContainer}>
        <View style={[styles.interactiveHeader, { zIndex: 100 }]}>
          <TouchableOpacity style={styles.exitButton} onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.exitButtonText}>x</Text>
          </TouchableOpacity>
          <Text style={styles.interactiveTitle}>The Neighborhood</Text>
          <Text style={styles.interactiveHint}>tap a neighbor</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={[styles.scrollWorld, { width: WORLD_WIDTH, height: WORLD_HEIGHT }]}
          decelerationRate="fast"
        >
          <View style={[styles.worldContent, { width: WORLD_WIDTH, height: WORLD_HEIGHT }]}>
            {neighborPositions.map(({ neighbor, x, y, key }) => (
              <NeighborItem
                key={key}
                neighbor={neighbor}
                x={x}
                y={y}
                onTap={setSelectedNeighbor}
              />
            ))}
          </View>
        </ScrollView>

        {selectedNeighbor && (
          <NeighborPopup
            neighbor={selectedNeighbor}
            onClose={() => setSelectedNeighbor(null)}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 60 },
  titleSection: { width: '100%', paddingHorizontal: 40, paddingTop: 40, paddingBottom: 20, alignItems: 'center' },
  title: { fontFamily: Fonts.title, fontSize: 37, color: Colors.text, textAlign: 'center', letterSpacing: -0.03, lineHeight: 41 },
  loader: { marginTop: 40 },

  previewSection: { width: '100%', paddingVertical: 20, paddingHorizontal: 30 },
  previewLabel: { fontFamily: Fonts.body, fontSize: 11, color: Colors.accent, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, textAlign: 'center' },
  previewGrid: { alignItems: 'center' },
  previewRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  previewItem: { width: SCREEN_WIDTH * 0.26, marginHorizontal: 12, alignItems: 'center' },
  previewImage: { width: SCREEN_WIDTH * 0.24, height: SCREEN_WIDTH * 0.24, resizeMode: 'contain' },
  previewName: { fontFamily: Fonts.body, fontSize: 12, color: Colors.text, marginTop: 8, textAlign: 'center' },
  previewMore: { fontFamily: Fonts.body, fontSize: 12, color: Colors.text, textAlign: 'center', marginTop: 20, fontStyle: 'italic' },

  enterButton: { backgroundColor: PINK, paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30, alignSelf: 'center', marginVertical: 20 },
  enterButtonText: { fontFamily: Fonts.title, fontSize: 18, color: Colors.text },

  wallSection: { width: '100%', paddingHorizontal: 40, paddingVertical: 30, alignItems: 'center' },
  wallText: { fontFamily: Fonts.titleItalic, fontSize: 20, color: Colors.text, textAlign: 'center', fontStyle: 'italic' },
  countSection: { width: '100%', paddingHorizontal: 20, alignItems: 'center', paddingBottom: 20 },
  countLabel: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text, textAlign: 'center' },
  countValue: { fontFamily: Fonts.title, fontSize: 28, color: Colors.accent, textAlign: 'center' },
  descriptionSection: { width: '100%', paddingHorizontal: 40, paddingVertical: 20, alignItems: 'center' },
  descriptionText: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text, textAlign: 'center', lineHeight: 22 },
  imageSection: { width: '100%', alignItems: 'center', paddingVertical: 20 },
  placeholderImage1: { width: '90%', height: 200 },
  ctaSection: { width: '100%', paddingHorizontal: 40, paddingVertical: 20, alignItems: 'center' },
  ctaText: { fontFamily: Fonts.body, fontSize: 16, color: Colors.text, textAlign: 'center', marginBottom: 12 },
  ctaSubtext: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text, textAlign: 'center', lineHeight: 22 },
  placeholderImage2: { width: '90%', height: 150 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: Colors.background, borderRadius: 16, padding: 24, alignItems: 'center' },
  modalName: { fontFamily: Fonts.title, fontSize: 24, color: Colors.text, textAlign: 'center', marginBottom: 16 },
  modalDetail: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text, textAlign: 'center', marginBottom: 8 },

  interactiveContainer: { flex: 1, backgroundColor: '#F5F5DC' },
  scrollWorld: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  worldContent: { position: 'relative' },
  worldNeighbor: { position: 'absolute', alignItems: 'center' },
  neighborItemInner: { alignItems: 'center' },
  worldNeighborImage: { width: 110, height: 110, resizeMode: 'contain' },
  worldNeighborName: { fontFamily: Fonts.body, fontSize: 10, color: Colors.text, marginTop: 2, textAlign: 'center' },

  interactiveHeader: { position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 50, paddingHorizontal: 20, alignItems: 'center' },
  exitButton: { position: 'absolute', left: 20, top: 50, width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.background, borderWidth: 2, borderColor: Colors.text, justifyContent: 'center', alignItems: 'center' },
  exitButtonText: { fontFamily: Fonts.title, fontSize: 18, color: Colors.text, marginTop: -2 },
  interactiveTitle: { fontFamily: Fonts.title, fontSize: 24, color: Colors.text },
  interactiveHint: { fontFamily: Fonts.body, fontSize: 11, color: Colors.text, opacity: 0.6, marginTop: 4 },
  interactiveModal: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(245,245,220,0.95)', justifyContent: 'center', alignItems: 'center' },
  interactiveModalTouchArea: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  interactiveModalContent: { backgroundColor: Colors.background, borderWidth: 2, borderColor: Colors.text, borderRadius: 20, padding: 28, alignItems: 'center', width: '70%' },
  interactiveModalName: { fontFamily: Fonts.title, fontSize: 28, color: Colors.text, marginBottom: 6, textAlign: 'center' },
  interactiveModalJoined: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text, marginBottom: 4 },
  interactiveModalLocation: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text },
  interactiveModalHint: { fontFamily: Fonts.body, fontSize: 11, color: Colors.accent, marginTop: 16 },

  activeNeighborModal: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,242,0.92)' },
  activeNeighborCard: { backgroundColor: Colors.background, borderWidth: 3, borderColor: Colors.text, padding: 24, alignItems: 'center', width: '75%' },
  activeNeighborImage: { width: 160, height: 160, resizeMode: 'contain', marginBottom: 16 },
  activeNeighborTitle: { fontFamily: Fonts.title, fontSize: 24, color: Colors.text, marginBottom: 8 },
  activeNeighborLocation: { fontFamily: Fonts.body, fontSize: 14, color: Colors.text, marginBottom: 8 },
  activeNeighborTap: { fontFamily: Fonts.body, fontSize: 11, color: Colors.accent, marginTop: 12 },
});
