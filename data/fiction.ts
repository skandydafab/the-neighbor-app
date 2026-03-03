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

export const fictionArticles: Article[] = [
  {
    id: '1',
    category: 'SHORT STORY',
    title: 'Anatomy of a Laugh',
    description: "A stranger's uncontrollable laughter in a crowded bistro unveils the fragile architecture of reason.",
    author: 'Paul de Fressenel',
    date: '15/11/2024',
    imageUrl: require('../assets/images/Image Assets/3. Fiction/anatomy-of-a-laugh.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
  {
    id: '2',
    category: 'SHORT STORY',
    title: 'The Platypus and the Bulls',
    description: "Six friends spiral through Shibuya's night, transforming drinking-game defeats into nightclub transcendence.",
    author: 'Skander Lejmi',
    date: '28/10/2024',
    imageUrl: require('../assets/images/Image Assets/3. Fiction/shibuya-dancing.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
  {
    id: '3',
    category: 'POETRY',
    title: 'Goya as Saturn Saw Him',
    description: "Who flinches first: the father devouring his son, or the painter witnessing his country's collapse?",
    author: 'Floris Kersemakers',
    date: '05/10/2024',
    imageUrl: require('../assets/images/Image Assets/3. Fiction/goya-as-saturn-saw-him.png'),
    fullContent: `[PLACEHOLDER - Replace with full poem text]`,
  },
  {
    id: '4',
    category: 'SHORT STORY',
    title: 'The Creative Destruction',
    description: 'This is a description of the article, which is really moving and has a lot.',
    author: 'Jerome Commandeur',
    date: '12/09/2024',
    imageUrl: require('../assets/images/Image Assets/3. Fiction/killed-by-kindness.png'),
    fullContent: `[PLACEHOLDER - Replace with full article text]`,
  },
];
