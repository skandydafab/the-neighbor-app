import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Fonts, TextStyles } from '@/constants/Typography';

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

  const handlePress = () => {
    router.push({
      pathname: '/article-detail',
      params: { 
        id, 
        title, 
        author, 
        category,
        fullContent,
        date: date || '20/12/2024',
      }
    });
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {imageUrl ? (
        <Image 
          source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
          style={styles.image}
          resizeMode="cover"
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: Colors.background,
    marginBottom: 20,
    alignItems: 'center',
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
