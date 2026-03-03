import ArticleListScreen from '@/components/ArticleListScreen';
import { literatureReviewArticles } from '@/data/literature-review';

export default function LiteratureReviewScreen() {
  return (
    <ArticleListScreen 
      title="Literature Review" 
      articles={literatureReviewArticles} 
    />
  );
}
