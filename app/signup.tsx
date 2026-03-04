import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

const API_BASE_URL = 'https://the-neighbor.onrender.com';

const STAR_ICON = require('@/assets/images/Sign-up Page/star.png');

type Step = 1 | 2 | 3 | 4;
type Page2State = 'preview' | 'form';

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

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function SignUpScreen() {
  const router = useRouter();
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
  const [emailError, setEmailError]       = useState<string | null>(null);

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

  // ─── Email duplicate check ──────────────────────────────────────────────────

  const checkEmailExists = async (emailToCheck: string): Promise<boolean> => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/check-email?email=${encodeURIComponent(emailToCheck)}`
      );
      const body = await res.json();
      return body.exists === true;
    } catch {
      return false;
    }
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
      if (res.status === 409) {
        setEmailError('This user already exists.');
        setStep(1);
        return;
      }
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
      if (res.status === 409) {
        Alert.alert('Already Registered', 'This email is already registered.');
        setStep(1);
        return;
      }
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
      <Text style={styles.heading}>SIGN UP</Text>
      <Image source={STAR_ICON} style={styles.starIcon} resizeMode="contain" />
      <Text style={styles.title}>About You</Text>

      <View style={styles.form}>
        {/* Name row */}
        <View style={styles.group}>
          <Text style={styles.label}>NAME*</Text>
          <View style={styles.nameRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Jim"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Carrey"
              placeholderTextColor="#999"
              value={surname}
              onChangeText={setSurname}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.group}>
          <Text style={styles.label}>EMAIL*</Text>
          <TextInput
            style={styles.input}
            placeholder="carrey@gmail.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={(text) => { setEmail(text); setEmailError(null); }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError && (
            <Text style={styles.errMsg}>{emailError}</Text>
          )}
        </View>

        {/* Location */}
        <View style={styles.group}>
          <Text style={styles.label}>LOCATION*</Text>
          <TextInput
            style={styles.input}
            placeholder="Select…"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {Object.values(errors).some(Boolean) && (
          <Text style={styles.errMsg}>All fields are required.</Text>
        )}

        {/* Continue */}
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (!validateStep1()) return;
            setLoading(true);
            const exists = await checkEmailExists(email.trim());
            setLoading(false);
            if (exists) {
              setEmailError('This user already exists.');
              return;
            }
            setEmailError(null);
            setStep(2);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

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

      <View style={styles.previewBox}>
        <View style={styles.previewRow}>
          <View style={styles.previewItem}>
            <View style={styles.previewImageBox} />
            <Text style={styles.previewLabel}>Your Photo</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.previewItem}>
            <View style={styles.previewImageBox} />
            <Text style={styles.previewLabel}>Baby Token</Text>
          </View>
        </View>
      </View>

      <Text style={styles.questionText}>
        Generate yours and join{'\n'}the neighborhood wall?
      </Text>

      <View style={styles.nameRow}>
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => setPage2State('form')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonOutline, { flex: 1 }]}
          onPress={() => setOverlayVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonOutlineText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ─── Page 2b: Baby Token Form ────────────────────────────────────────────────

  const renderPage2Form = () => (
    <View style={styles.page}>
      <Text style={styles.title}>Generate Your{'\n'}Baby Token</Text>

      <View style={styles.form}>
        <View style={styles.group}>
          <Text style={styles.label}>SELFIE*</Text>
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
          {errors.image && <Text style={styles.errMsg}>Selfie is required.</Text>}
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>ACTIVITY (OPTIONAL)</Text>
          <TextInput
            style={styles.input}
            placeholder="Eating Sandwiches"
            placeholderTextColor="#999"
            value={activity}
            onChangeText={setActivity}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading
            ? <ActivityIndicator color={Colors.background} />
            : <Text style={styles.buttonText}>Join Community</Text>
          }
        </TouchableOpacity>

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
      <Text style={styles.typeText}>Negotiating with egg...</Text>
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Stepper step={step < 3 ? step : 3} />

        {step === 1 && renderPage1()}
        {step === 2 && page2State === 'preview' && renderPage2Preview()}
        {step === 2 && page2State === 'form'    && renderPage2Form()}
        {step === 3 && renderPage3()}
        {step === 4 && renderPage4()}
      </ScrollView>

      {/* Confirmation modal */}
      <Modal transparent visible={overlayVisible} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>
              Are you sure? You will not be able to come back.
            </Text>
            <View style={styles.nameRow}>
              <TouchableOpacity
                style={[styles.buttonOutline, { flex: 1 }]}
                onPress={() => setOverlayVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonOutlineText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { flex: 1 }]}
                onPress={submitWithoutPhoto}
                activeOpacity={0.8}
              >
                {loading
                  ? <ActivityIndicator color={Colors.background} />
                  : <Text style={styles.buttonText}>Yes</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

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
    paddingHorizontal: 28,
    paddingBottom: 120,
  },

  // Stepper
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: Colors.accent,
  },
  stepNum: {
    fontFamily: 'GeistMono',
    fontSize: 12,
    color: 'rgba(0,0,0,0.35)',
  },
  stepNumActive: { color: Colors.background },
  stepLine: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 6,
  },
  stepLineActive: { backgroundColor: Colors.accent },

  // Page
  page: {
    width: '100%',
  },

  // Typography
  heading: {
    fontFamily: Fonts.titleMedium,
    fontSize: 42,
    lineHeight: 48,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  starIcon: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.titleMedium,
    fontSize: 28,
    lineHeight: 34,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: Colors.text,
    marginBottom: 8,
    opacity: 0.5,
  },
  errMsg: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text,
    marginTop: 6,
    opacity: 0.6,
  },

  // Form
  form: {
    width: '100%',
  },
  group: {
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },

  // Inputs
  input: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.background,
  },

  // Buttons
  button: {
    backgroundColor: Colors.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: Colors.background,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonOutlineText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: Colors.accent,
  },

  // Preview box
  previewBox: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  previewItem: {
    alignItems: 'center',
    gap: 8,
  },
  previewImageBox: {
    width: 64,
    height: 64,
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    borderRadius: 8,
  },
  previewLabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text,
    opacity: 0.6,
    textAlign: 'center',
  },
  arrow: {
    fontSize: 24,
    color: Colors.text,
    opacity: 0.4,
  },
  questionText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    color: Colors.text,
    marginBottom: 20,
    opacity: 0.7,
  },

  // Selfie
  selfieBox: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    padding: 20,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfieButtons: { flexDirection: 'row', gap: 20 },
  selfieBtn: {
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  selfieBtnText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    textAlign: 'center',
    color: Colors.text,
    opacity: 0.6,
  },
  uploadDone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  uploadThumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadThumbText: { fontSize: 16, color: Colors.accent },
  uploadTitle: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.accent,
  },
  uploadRemove: { fontSize: 24, color: Colors.text, opacity: 0.35 },

  // Egg
  egg: {
    width: 70,
    height: 88,
    backgroundColor: Colors.accent,
    borderRadius: 35,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  crack: {
    position: 'absolute',
    width: 2,
    backgroundColor: Colors.background,
    borderRadius: 2,
  },
  crack1: { height: 22, top: '40%', left: '52%', transform: [{ rotate: '20deg' }] },
  crack2: { height: 22, top: '45%', left: '43%', transform: [{ rotate: '-15deg' }] },
  typeText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.text,
    textAlign: 'center',
    opacity: 0.5,
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
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  modalText: {
    fontFamily: Fonts.body,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    color: Colors.text,
  },
});
