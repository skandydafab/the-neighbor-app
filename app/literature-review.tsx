import ArticleListScreen from '@/components/ArticleListScreen';
import { literatureReviews } from '@/data/literature-review';

const literatureReviewImages: Record<string, any> = {
  'salammbo-flaubert': require('@/assets/images/Image Assets/2. Literature Review/salammbo-flaubert.png'),
  'on-creative-alienation': require('@/assets/images/Image Assets/2. Literature Review/on-creative-alienation.png'),
  'authenticity-and-gide': require('@/assets/images/Image Assets/2. Literature Review/mission-statement.png'),
  'narcissus-and-goldmund': require('@/assets/images/Image Assets/2. Literature Review/narcissus-goldmund.png'),
};

export default function LiteratureReviewScreen() {
  return (
    <ArticleListScreen 
      title="Literature Review" 
      articles={literatureReviews}
      articleImages={literatureReviewImages}
    />
  );
}
