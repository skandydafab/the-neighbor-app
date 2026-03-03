import HamburgerMenu from '@/components/HamburgerMenu';
import Header from '@/components/header';
import { Fonts } from '@/constants/Typography';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SW } = Dimensions.get('window');
const API_BASE_URL = 'https://the-neighbor.onrender.com';

type Step = 1 | 2 | 3 | 4;
type Page2State = 'preview' | 'form';

// ─── All assets resolved at build time — zero network, zero re-render issues ──

const ASSETS = {
  card:          require('@/assets/images/Sign-up Page/325-560-FBF5F2.png'),
  input220:      require('@/assets/images/Sign-up Page/220-45.png'),
  input220Pink:  require('@/assets/images/Sign-up Page/220-45-FFE0E0.png'),
  input220Tall:  require('@/assets/images/Sign-up Page/220-90.png'),
  input105:      require('@/assets/images/Sign-up Page/105-45.png'),
  input105Pink:  require('@/assets/images/Sign-up Page/105-45-FFE0E0.png'),
  babyBox:       require('@/assets/images/Sign-up Page/235-140.png'),
  star:          require('@/assets/images/Sign-up Page/star.png'),
  heart:         require('@/assets/images/Sign-up Page/heart.png'),
  arrow:         require('@/assets/images/Sign-up Page/arrow.png'),
};

// ─── Squircle wrapper ─────────────────────────────────────────────────────────
// PNG sits absolutely behind everything. Child sits on top naturally (JSX order).
// Mirrors the HTML exactly: <img position:absolute z-index:-1> + <input>.

function Sq({
  asset,
  w,
  h,
  children,
}: {
  asset: any;
  w: number;
  h: number;
  children: React.ReactNode;
}) {
  return (
    <View style={{ width: w, height: h }}>
      <Image
        source={asset}
        style={{ position: 'absolute', top: 0, left: 0, width: w, height: h }}
        resizeMode="stretch"
      />
      {children}
    </View>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: number }) {
  return (
    <View style={styles.stepper}>
      {[1, 2, 3].map((n, i) => (
        <View key={n} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.stepDot, step >= n && styles.stepDotActive]}>
            <Text style={[styles.stepNum, step >= n && styles.stepNumActive]}>{n}</Text>
          </View>
          {i < 2 && (
            <View style={[styles.stepLine, step > n && styles.stepLineActive]} />
          )}
        </View>
      ))}
    </View>
  );
}

// ─── Field label ──────────────────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function SignUpScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible]     = useState(false);
  const [step, setStep]                   = useState<Step>(1);
  const [page2State, setPage2State]       = useState<Page2State>('preview');
  const [firstName, setFirstName]         = useState('');
  const [surname, setSurname]             = useState('');
  const [email, setEmail]                 = useState('');
  const [location, setLocation]           = useState('');
  const [activity, setActivity]           = useState('');
  const [selectedImage, setSelectedImage] = useState<{
    uri: string; type: string; name: string;
  } | null>(null);
  const [loading, setLoading]             = useState(false);
  const [errors, setErrors]               = useState<Record<string, boolean>>({});
  const [overlayVisible, setOverlayVisible] = useState(false);

  // ─── Validation ─────────────────────────────────────────────────────────────

  const validateStep1 = () => {
    const e: Record<string, boolean> = {};
    if (!firstName.trim()) e.firstName = true;
    if (!surname.trim())   e.surname   = true;
    if (!email.trim())     e.email     = true;
    if (!location.trim())  e.location  = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const submitWithoutPhoto = async () => {
    setOverlayVisible(false);
    if (!validateStep1()) { setStep(1); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append('firstname', firstName.trim());
    fd.append('lastname',  surname.trim());
    fd.append('email',     email.trim());
    fd.append('location',  location.trim());
    try {
      const res = await fetch(`${API_BASE_URL}/submitMember`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('failed');
      setStep(4);
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async (useCamera: boolean) => {
    const perm = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission Required', 'Please grant permission to access your photos.');
      return;
    }
    const result = useCamera
      ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled && result.assets[0]) {
      const a = result.assets[0];
      setSelectedImage({ uri: a.uri, type: 'image/png', name: 'selfie.png' });
      setErrors(prev => ({ ...prev, image: false }));
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) { setErrors(prev => ({ ...prev, image: true })); return; }
    if (!validateStep1()) return;
    setLoading(true);
    setStep(3);
    const fd = new FormData();
    fd.append('firstname', firstName.trim());
    fd.append('lastname',  surname.trim());
    fd.append('email',     email.trim());
    fd.append('location',  location.trim());
    if (activity.trim()) fd.append('activity', activity.trim());
    fd.append('image', selectedImage as unknown as Blob);
    try {
      const res = await fetch(`${API_BASE_URL}/submitMember`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Server error');
      setTimeout(() => router.push('/'), 3000);
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // ─── Page 1: About You ───────────────────────────────────────────────────────

  const renderPage1 = () => (
    <View style={styles.page}>
      <Text style={styles.title}>About You</Text>
      <Image source={ASSETS.star} style={styles.starIcon} resizeMode="contain" />

      <View style={styles.form}>

        {/* Name row */}
        <View style={styles.group}>
          <Label text="Name*" />
          <View style={styles.nameRow}>
            <Sq asset={ASSETS.input105} w={105} h={45}>
              <TextInput
                style={[styles.input, { width: 105 }]}
                placeholder="Jim"
                placeholderTextColor="rgba(0,0,0,0.45)"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </Sq>
            <Sq asset={ASSETS.input105} w={105} h={45}>
              <TextInput
                style={[styles.input, { width: 105 }]}
                placeholder="Carrey"
                placeholderTextColor="rgba(0,0,0,0.45)"
                value={surname}
                onChangeText={setSurname}
                autoCapitalize="words"
              />
            </Sq>
          </View>
        </View>

        {/* Email */}
        <View style={styles.group}>
          <Label text="Email*" />
          <Sq asset={ASSETS.input220} w={220} h={45}>
            <TextInput
              style={styles.input}
              placeholder="carrey@gmail.com"
              placeholderTextColor="rgba(0,0,0,0.45)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Sq>
        </View>

        {/* Location */}
        <View style={styles.group}>
          <Label text="Location*" />
          <Sq asset={ASSETS.input220} w={220} h={45}>
            <TextInput
              style={styles.input}
              placeholder="Select…"
              placeholderTextColor="rgba(0,0,0,0.45)"
              value={location}
              onChangeText={setLocation}
            />
          </Sq>
        </View>

        {Object.values(errors).some(Boolean) && (
          <Text style={styles.errMsg}>All fields are required.</Text>
        )}

        {/* Continue */}
        <View style={styles.group}>
          <Sq asset={ASSETS.input220Pink} w={220} h={45}>
            <TouchableOpacity
              style={styles.btnInner}
              onPress={() => { if (validateStep1()) setStep(2); }}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>
          </Sq>
        </View>

      </View>
    </View>
  );

  // ─── Page 2a: Baby Token Preview ────────────────────────────────────────────

  const renderPage2Preview = () => (
    <View style={styles.page}>
      <Text style={styles.title}>Generate Your{'\n'}Baby Token</Text>
      <Text style={styles.subtitle}>
        It's your neighbor avatar.{'\n'}Upload selfie and activity:
      </Text>

      <View style={styles.babyOuter}>
        <Sq asset={ASSETS.babyBox} w={235} h={140}>
          <View style={styles.babyInner}>
            <View style={styles.babyItem}>
              <View style={styles.babyImgBox} />
              <Text style={styles.babyItemLabel}>{'"Your\nPhoto"'}</Text>
            </View>
            <Image
              source={ASSETS.arrow}
              style={styles.babyArrow}
              resizeMode="contain"
            />
            <View style={styles.babyItem}>
              <View style={styles.babyImgBox} />
              <Text style={styles.babyItemLabel}>{'Baby\nToken'}</Text>
            </View>
          </View>
        </Sq>
        <View style={styles.babyLabelRow}>
          <Text style={styles.babyConvertorLabel}>BABY CONVERTOR</Text>
          <Text style={styles.babyConvertorC}>©</Text>
        </View>
      </View>

      <Image source={ASSETS.heart} style={styles.heartIcon} resizeMode="contain" />

      <Text style={styles.questionText}>
        Generate yours and join{'\n'}the neighborhood wall?
      </Text>

      <View style={styles.nameRow}>
        <Sq asset={ASSETS.input105Pink} w={105} h={45}>
          <TouchableOpacity
            style={styles.btnInner}
            onPress={() => setPage2State('form')}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Yes</Text>
          </TouchableOpacity>
        </Sq>
        <Sq asset={ASSETS.input105} w={105} h={45}>
          <TouchableOpacity
            style={styles.btnInner}
            onPress={() => setOverlayVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>No</Text>
          </TouchableOpacity>
        </Sq>
      </View>
    </View>
  );

  // ─── Page 2b: Baby Token Form ────────────────────────────────────────────────

  const renderPage2Form = () => (
    <View style={styles.page}>
      <Text style={styles.title}>Generate Your{'\n'}Baby Token</Text>
      <Image source={ASSETS.star} style={styles.starIcon} resizeMode="contain" />

      <View style={styles.form}>

        <View style={styles.group}>
          <Label text="Selfie*" />
          <Sq asset={ASSETS.input220Tall} w={220} h={90}>
            <View style={styles.selfieBox}>
              {!selectedImage ? (
                <View style={styles.selfieButtons}>
                  <TouchableOpacity
                    style={styles.selfieBtn}
                    onPress={() => pickImage(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.selfieBtnText}>Take{'\n'}Selfie</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.selfieBtn}
                    onPress={() => pickImage(false)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.selfieBtnText}>Upload{'\n'}Selfie</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.uploadDone}>
                  <View style={styles.uploadThumb}>
                    <Text style={styles.uploadThumbText}>✓</Text>
                  </View>
                  <Text style={styles.uploadTitle}>Exquisite{'\n'}Selfie!</Text>
                  <TouchableOpacity
                    onPress={() => setSelectedImage(null)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.uploadRemove}>×</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Sq>
          {errors.image && <Text style={styles.errMsg}>Selfie is required.</Text>}
        </View>

        <View style={styles.group}>
          <Label text="Activity (optional)" />
          <Sq asset={ASSETS.input220} w={220} h={45}>
            <TextInput
              style={styles.input}
              placeholder="Eating Sandwiches"
              placeholderTextColor="rgba(0,0,0,0.45)"
              value={activity}
              onChangeText={setActivity}
            />
          </Sq>
        </View>

        <View style={styles.group}>
          <Sq asset={ASSETS.input220Pink} w={220} h={45}>
            <TouchableOpacity
              style={styles.btnInner}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading
                ? <ActivityIndicator color="#000" />
                : <Text style={styles.btnText}>Join Community</Text>
              }
            </TouchableOpacity>
          </Sq>
        </View>

      </View>
    </View>
  );

  // ─── Page 3: Loading ─────────────────────────────────────────────────────────

  const renderPage3 = () => (
    <View style={[styles.page, { alignItems: 'center' }]}>
      <Text style={[styles.title, { textAlign: 'center' }]}>Welcome{'\n'}neighbor!</Text>
      <Text style={[styles.subtitle, { textAlign: 'center' }]}>
        We are currently generating your baby token.{'\n'}It will take approximately 10 seconds.
      </Text>
      <View style={styles.egg}>
        <View style={[styles.crack, styles.crack1]} />
        <View style={[styles.crack, styles.crack2]} />
      </View>
      <View style={{ marginTop: 24 }}>
        <Sq asset={ASSETS.input220} w={220} h={45}>
          <View style={styles.typebox}>
            <Text style={styles.typeText}>Negotiating with egg...</Text>
          </View>
        </Sq>
      </View>
    </View>
  );

  // ─── Page 4: Welcome ─────────────────────────────────────────────────────────

  const renderPage4 = () => (
    <View style={[styles.page, { alignItems: 'center' }]}>
      <Text style={[styles.title, { textAlign: 'center' }]}>Welcome{'\n'}neighbor!</Text>
      <Text style={[styles.subtitle, { textAlign: 'center' }]}>
        We are happy to have you{'\n'}in the neighborhood.
      </Text>
    </View>
  );

  // ─── Root render ─────────────────────────────────────────────────────────────

  return (
    <View style={styles.screen}>
      <Header onMenuPress={() => setMenuVisible(true)} />
      <HamburgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          {/* Card background PNG — absolutely positioned, never re-renders */}
          <Image
            source={ASSETS.card}
            style={styles.cardBg}
            resizeMode="stretch"
          />

          <Stepper step={step < 3 ? step : 3} />

          <View style={styles.pages}>
            {step === 1 && renderPage1()}
            {step === 2 && page2State === 'preview' && renderPage2Preview()}
            {step === 2 && page2State === 'form'    && renderPage2Form()}
            {step === 3 && renderPage3()}
            {step === 4 && renderPage4()}
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Confirmation modal */}
      <Modal transparent visible={overlayVisible} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>
              Are you sure? You will not be able to come back.
            </Text>
            <View style={styles.nameRow}>
              <Sq asset={ASSETS.input105} w={105} h={45}>
                <TouchableOpacity
                  style={styles.btnInner}
                  onPress={() => setOverlayVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnText}>No</Text>
                </TouchableOpacity>
              </Sq>
              <Sq asset={ASSETS.input105Pink} w={105} h={45}>
                <TouchableOpacity
                  style={styles.btnInner}
                  onPress={submitWithoutPhoto}
                  activeOpacity={0.8}
                >
                  {loading
                    ? <ActivityIndicator color="#000" />
                    : <Text style={styles.btnText}>Yes</Text>
                  }
                </TouchableOpacity>
              </Sq>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FBF5F2',
  },
  kav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Card
  card: {
    width: 325,
    minHeight: 560,
    position: 'relative',
    alignItems: 'center',
  },
  cardBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 325,
    height: 560,
  },

  // Stepper
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    marginBottom: 20,
    zIndex: 1,
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: '#FFE0E0',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  stepNum: {
    fontFamily: 'GeistMono',
    fontSize: 10,
    color: 'rgba(0,0,0,0.35)',
  },
  stepNumActive: { color: '#1a1a1a' },
  stepLine: {
    width: 52,
    height: 1.5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 4,
  },
  stepLineActive: { backgroundColor: '#1a1a1a' },

  // Pages wrapper
  pages: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 52,
    zIndex: 1,
  },
  page: { width: '100%' },

  // Typography
  title: {
    fontFamily: Fonts.title,
    fontSize: 34,
    lineHeight: 37,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(0,0,0,0.55)',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 8,
  },
  errMsg: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: '#E03C1F',
    marginTop: 4,
  },

  // Icons
  starIcon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
    marginBottom: 16,
  },
  heartIcon: {
    width: 10,
    height: 10,
    alignSelf: 'center',
    marginBottom: 14,
  },

  // Form
  form: { width: 220 },
  group: { marginBottom: 16 },
  nameRow: {
    flexDirection: 'row',
    gap: 10,
  },

  // Inputs — transparent so PNG shows through
  input: {
    width: 220,
    height: 45,
    paddingHorizontal: 14,
    fontFamily: Fonts.body,
    fontSize: 15,
    color: 'rgba(0,0,0,0.8)',
    backgroundColor: 'transparent',
  },

  // Buttons
  btnInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnText: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: '#1a1a1a',
  },

  // Baby convertor
  babyOuter: {
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  babyInner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingBottom: 12,
    width: '100%',
    height: '100%',
  },
  babyItem: { alignItems: 'center', gap: 6, marginBottom: 8 },
  babyImgBox: {
    width: 48,
    height: 48,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
  },
  babyItemLabel: {
    fontFamily: Fonts.body,
    fontSize: 11,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)',
  },
  babyArrow: {
    width: 28,
    height: 20,
    marginBottom: 34,
  },
  babyLabelRow: {
    flexDirection: 'row',
    width: 235,
    paddingHorizontal: 16,
    position: 'relative',
  },
  babyConvertorLabel: {
    fontFamily: 'GeistMono',
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)',
  },
  babyConvertorC: {
    fontFamily: 'GeistMono',
    fontSize: 10,
    position: 'absolute',
    right: 8,
    color: 'rgba(0,0,0,0.4)',
  },
  questionText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    color: 'rgba(0,0,0,0.65)',
    marginBottom: 12,
  },

  // Selfie
  selfieBox: {
    width: 220,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfieButtons: { flexDirection: 'row', gap: 20 },
  selfieBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    borderStyle: 'dashed',
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  selfieBtnText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.65)',
  },
  uploadDone: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
    width: '100%',
  },
  uploadThumb: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadThumbText: { fontSize: 16 },
  uploadTitle: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#1a1a1a',
  },
  uploadRemove: { fontSize: 22, color: 'rgba(0,0,0,0.35)', lineHeight: 22 },

  // Egg
  egg: {
    width: 70,
    height: 88,
    backgroundColor: '#FFE0E0',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    borderRadius: 35,
    alignSelf: 'center',
    marginTop: 8,
  },
  crack: {
    position: 'absolute',
    width: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 2,
  },
  crack1: { height: 22, top: '40%', left: '52%', transform: [{ rotate: '20deg' }] },
  crack2: { height: 22, top: '45%', left: '43%', transform: [{ rotate: '-15deg' }] },
  typebox: {
    width: 220,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },

  // Modal
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  modalCard: {
    backgroundColor: '#FBF5F2',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 24,
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  modalText: {
    fontFamily: Fonts.body,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    color: 'rgba(0,0,0,0.8)',
  },
});