/**
 * Submit Content Screen
 * In-app form for users to submit their creative work
 * Sends email to contact@theneighborr.com via native mail composer
 */

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
} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';

const SUBMISSION_EMAIL = 'contact@theneighborr.com';

export default function SubmitContentScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [link, setLink] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!link.trim() && !content.trim()) {
      Alert.alert(
        'Missing content',
        'Please provide a link to your work or paste your content before submitting.'
      );
      return;
    }

    setSending(true);
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          'Mail not available',
          'No email account is set up on this device. Please email us directly at contact@theneighborr.com.'
        );
        return;
      }

      const parts: string[] = [];
      if (link.trim()) {
        parts.push(`Link: ${link.trim()}`);
      }
      if (content.trim()) {
        parts.push(`Content:\n${content.trim()}`);
      }
      const senderLine = name.trim() ? `\n\nFrom: ${name.trim()}` : '';

      await MailComposer.composeAsync({
        recipients: [SUBMISSION_EMAIL],
        subject: subject.trim() || 'Content Submission — The Neighbor',
        body: `${parts.join('\n\n')}${senderLine}`,
      });

      // Clear form after compose view was shown
      setName('');
      setSubject('');
      setLink('');
      setContent('');
    } catch (error) {
      console.error('Error submitting content:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

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
        {/* Header */}
        <Text style={styles.heading}>SUBMIT{'\n'}CONTENT</Text>
        <Text style={styles.subtitle}>
          Submit your article, video, music or anything that is your eulogy to
          something you love. It could be a poem, short film, photography
          collection, or anything of the sort. This can be your archive for your
          love letters to life too!
        </Text>

        {/* Name field (optional) */}
        <Text style={styles.label}>NAME (OPTIONAL)</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#999"
          autoCapitalize="words"
          returnKeyType="next"
        />

        {/* Subject field (optional) */}
        <Text style={styles.label}>SUBJECT (OPTIONAL)</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="What's this about?"
          placeholderTextColor="#999"
          returnKeyType="next"
        />

        {/* Link field */}
        <Text style={styles.label}>LINK</Text>
        <Text style={styles.fieldDescription}>
          Send us a link to your work, or optionally paste it below.
        </Text>
        <TextInput
          style={styles.input}
          value={link}
          onChangeText={setLink}
          placeholder="https://..."
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          returnKeyType="next"
        />

        {/* Content field (optional) */}
        <Text style={styles.label}>YOUR CONTENT (OPTIONAL)</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          value={content}
          onChangeText={setContent}
          placeholder="Or paste your content here..."
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          returnKeyType="default"
        />

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.sendButton, sending && styles.sendButtonDisabled]}
          onPress={handleSend}
          activeOpacity={0.7}
          disabled={sending}
        >
          <Text style={styles.sendButtonText}>
            {sending ? 'OPENING MAIL...' : 'SUBMIT CONTENT'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 28,
    paddingBottom: 120,
  },

  heading: {
    fontFamily: Fonts.titleMedium,
    fontSize: 42,
    lineHeight: 48,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },

  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 36,
    opacity: 0.7,
  },

  label: {
    fontFamily: Fonts.body,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: Colors.text,
    marginBottom: 8,
    opacity: 0.5,
  },

  fieldDescription: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.text,
    marginBottom: 10,
    opacity: 0.5,
  },

  input: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    backgroundColor: Colors.background,
  },

  contentInput: {
    minHeight: 140,
    paddingTop: 14,
  },

  sendButton: {
    backgroundColor: Colors.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },

  sendButtonDisabled: {
    opacity: 0.5,
  },

  sendButtonText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: Colors.background,
  },
});
