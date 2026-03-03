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

export const filmsMusicArticles: Article[] = [
  {
    id: '1',
    category: 'FILMS',
    title: 'The Third Man',
    description: "Orson Welles, Vienna, and the shadows of post-war cinema.",
    author: 'Clara Weber',
    date: '18/11/2024',
    imageUrl: require('../assets/images/Image Assets/5. Films & Music/inherent-vice.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
  {
    id: '2',
    category: 'FILMS',
    title: 'Her',
    description: "Spike Jonze's meditation on love, loneliness, and artificial intelligence.",
    author: 'Marcus Chen',
    date: '02/11/2024',
    imageUrl: require('../assets/images/Image Assets/5. Films & Music/mektoub-my-love.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
  {
    id: '3',
    category: 'MUSIC',
    title: 'The Velvet Underground',
    description: "How four musicians from New York changed the sound of rock forever.",
    author: 'Sarah Mitchell',
    date: '20/10/2024',
    imageUrl: require('../assets/images/Image Assets/5. Films & Music/the-dissonance-of-jazz.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
  {
    id: '4',
    category: 'MUSIC',
    title: 'Kind of Blue',
    description: "Miles Davis and the modal revolution in jazz.",
    author: 'David Thompson',
    date: '05/10/2024',
    imageUrl: require('../assets/images/Image Assets/5. Films & Music/vivaldi-my-dad-and-i.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
];
