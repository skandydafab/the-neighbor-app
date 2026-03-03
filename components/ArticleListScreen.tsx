import { View, Text, StyleSheet, ScrollView, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';
import { TextStyles } from '@/constants/Typography';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/data/fiction';

interface ArticleListScreenProps {
  title: string;
  articles: Article[];
  titleStyle?: TextStyle;
}

export default function ArticleListScreen({ title, articles, titleStyle }: ArticleListScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, titleStyle]}>{title}</Text>

        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            category={article.category}
            title={article.title}
            description={article.description}
            fullContent={article.fullContent}
            author={article.author}
            imageUrl={article.imageUrl}
            date={article.date}
          />
        ))}
      </ScrollView>
    </View>
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
    paddingBottom: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    ...TextStyles.sectionHeader,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
});
