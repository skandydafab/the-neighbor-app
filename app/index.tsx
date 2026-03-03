import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Typography';
import ArticleCard from '@/components/ArticleCard';
import HelmuthSquircle from '@/components/HelmuthSquircle';
import { fictionArticles } from '@/data/fiction';

export default function HomeScreen() {
  const featuredArticles = fictionArticles.slice(0, 3);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Our favorites this week</Text>
        </View>

        <View style={styles.articlesSection}>
          {featuredArticles.map((article) => (
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
        </View>

        <View style={styles.editorialLineSection}>
          <Text style={styles.editorialLineTitle}>Our Editorial Line</Text>
          <Text style={styles.editorialLineSubtext}>
            The Neighbor is an open invitation to reveal your secret spark, however strange and specific it is.
          </Text>
          <HelmuthSquircle />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Write a eulogy to something you love:</Text>
          <Text style={styles.footerEmail}>contact@theneighborr.com</Text>
        </View>
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
    paddingBottom: 60,
  },

  heroSection: {
    width: '100%',
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },

  heroTitle: {
    fontFamily: Fonts.title,
    fontSize: 36,
    lineHeight: 42,
    color: Colors.text,
    textAlign: 'center',
  },

  articlesSection: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },

  editorialLineSection: {
    width: '100%',
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },

  editorialLineTitle: {
    fontFamily: Fonts.titleSemiBold,
    fontSize: 28,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },

  editorialLineSubtext: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.text,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
    lineHeight: 20,
  },

  footer: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  footerText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },

  footerEmail: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.accent,
    textAlign: 'center',
  },
});
