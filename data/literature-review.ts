export interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  fullContent: string;
  author: string;
  date: string;
  imageUrl?: any;
}

export const literatureReviewArticles: Article[] = [
  {
    id: '1',
    category: 'LITERATURE REVIEW',
    title: 'The Death of the Author',
    description: "A critical look at Roland Barthes' seminal essay and its implications for modern literature.",
    author: 'Marie Dubois',
    date: '10/11/2024',
    imageUrl: require('../assets/images/Image Assets/2. Literature Review/mission-statement.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
  {
    id: '2',
    category: 'LITERATURE REVIEW',
    title: 'Kafka on the Shore',
    description: "An exploration of Haruki Murakami's magical realism and its borrowings from classical mythology.",
    author: 'Yuki Tanaka',
    date: '25/10/2024',
    imageUrl: require('../assets/images/Image Assets/2. Literature Review/narcissus-goldmund.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
  {
    id: '3',
    category: 'LITERATURE REVIEW',
    title: 'The Unbearable Lightness of Being',
    description: "Milan Kundera's philosophical novel examined through the lens of eternal return.",
    author: 'Pavel Novak',
    date: '08/10/2024',
    imageUrl: require('../assets/images/Image Assets/2. Literature Review/on-creative-alienation.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
];
