import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts, TextStyles } from '@/constants/Typography';

interface PortraitCardProps {
  id: string;
  category: string;
  name: string;
  description: string;
  fullContent: string;
  iconUrl: any;
  date: string;
}

export default function PortraitCard({
  id,
  category,
  name,
  description,
  fullContent,
  iconUrl,
  date,
}: PortraitCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/article-detail',
      params: { 
        id, 
        title: name,
        author: category,
        category: 'PORTRAIT',
        fullContent,
        date,
      }
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image 
        source={iconUrl}
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={styles.category}>{category}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 70,
  },

  icon: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },

  category: {
    ...TextStyles.category,
    color: Colors.accent,
    marginBottom: 8,
  },

  name: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 32,
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 38,
    textAlign: 'center',
  },

  description: {
    ...TextStyles.body,
    color: Colors.text,
    lineHeight: 22,
    textAlign: 'center',
  },
});
