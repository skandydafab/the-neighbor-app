import ArticleListScreen from '@/components/ArticleListScreen';
import { filmsMusicArticles } from '@/data/films-music';
import { Fonts } from '@/constants/Typography';

export default function FilmsMusicScreen() {
  return (
    <ArticleListScreen 
      title="Films & Music" 
      articles={filmsMusicArticles}
      titleStyle={{ fontFamily: Fonts.headlandOne }}
    />
  );
}
