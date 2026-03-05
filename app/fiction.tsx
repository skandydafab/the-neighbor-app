import ArticleListScreen from '@/components/ArticleListScreen';
import { fictionArticles } from '@/data/fiction';
import { Image } from 'expo-image';

const fictionImages: Record<string, any> = {
  'anatomy-of-a-laugh': require('@/assets/images/Image Assets/3. Fiction/anatomy-of-a-laugh.png'),
  'killed-by-kindness': require('@/assets/images/Image Assets/3. Fiction/killed-by-kindness.png'),
  'shibuya-dancing': require('@/assets/images/Image Assets/3. Fiction/shibuya-dancing.png'),
  'goya-as-saturn-saw-him': require('@/assets/images/Image Assets/3. Fiction/goya-as-saturn-saw-him.png'),
};

export default function FictionScreen() {
  return (
    <ArticleListScreen 
      title="Fiction" 
      articles={fictionArticles}
      articleImages={fictionImages}
    />
  );
}
