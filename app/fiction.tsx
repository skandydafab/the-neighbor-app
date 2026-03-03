import ArticleListScreen from '@/components/ArticleListScreen';
import { fictionArticles } from '@/data/fiction';

export default function FictionScreen() {
  return (
    <ArticleListScreen 
      title="Fiction" 
      articles={fictionArticles} 
    />
  );
}
