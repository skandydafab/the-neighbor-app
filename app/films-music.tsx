import ArticleListScreen from '@/components/ArticleListScreen';
import { filmsMusicArticles } from '@/data/films-music';
import { Fonts } from '@/constants/Typography';

const filmsMusicImages: Record<string, any> = {
  'mektoub-my-love': require('@/assets/images/Image Assets/5. Films & Music/mektoub-my-love.png'),
  'vivaldi-my-dad-and-i': require('@/assets/images/Image Assets/5. Films & Music/vivaldi-my-dad-and-i.png'),
  'the-dissonance-of-jazz': require('@/assets/images/Image Assets/5. Films & Music/the-dissonance-of-jazz.png'),
  'inherent-vice': require('@/assets/images/Image Assets/5. Films & Music/inherent-vice.png'),
};

export default function FilmsMusicScreen() {
  return (
    <ArticleListScreen 
      title="Films & Music" 
      articles={filmsMusicArticles}
      articleImages={filmsMusicImages}
      titleStyle={{ fontFamily: Fonts.headlandOne }}
    />
  );
}
