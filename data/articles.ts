/**
 * Articles Data
 * Contains all fiction articles with full content
 */

export interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  fullContent: string;  // Complete article text
  author: string;
  date: string;
  imageUrl?: string;
}

export const articles: Article[] = [
  {
    id: '1',
    category: 'SHORT STORY',
    title: 'Anatomy of a Laugh',
    description: "A stranger's uncontrollable laughter in a crowded bistro unveils the fragile architecture of reason.",
    author: 'Paul de Fressenel',
    date: '15/11/2024',
    imageUrl: undefined,
    fullContent: `[PLACEHOLDER - Replace with full article text]

This is where the complete text of "Anatomy of a Laugh" will go.

Each paragraph should be separated by a blank line like this.

The text will automatically be justified when displayed in the article detail view.

You can paste the full article text here, maintaining the paragraph structure.`,
  },
  {
    id: '2',
    category: 'SHORT STORY',
    title: 'The Platypus and the Bulls',
    description: "Six friends spiral through Shibuya's night, transforming drinking-game defeats into nightclub transcendence.",
    author: 'Skander Lejmi',
    date: '28/10/2024',
    imageUrl: undefined,
    fullContent: `[PLACEHOLDER - Replace with full article text]

This is where the complete text of "The Platypus and the Bulls" will go.

Each paragraph should be separated by a blank line.

Simply paste the full article text here when ready.`,
  },
  {
    id: '3',
    category: 'POETRY',
    title: 'Goya as Saturn Saw Him',
    description: "Who flinches first: the father devouring his son, or the painter witnessing his country's collapse?",
    author: 'Floris Kersemakers',
    date: '05/10/2024',
    imageUrl: undefined,
    fullContent: `[PLACEHOLDER - Replace with full poem text]

This is where the complete poem "Goya as Saturn Saw Him" will go.

For poetry, maintain the line breaks and stanza structure as intended.

Paste the full poem here when ready.`,
  },
  {
    id: '4',
    category: 'SHORT STORY',
    title: 'The Creative Destruction',
    description: 'This is a description of the article, which is really moving and has a lot.',
    author: 'Jerome Commandeur',
    date: '12/09/2024',
    imageUrl: undefined,
    fullContent: `[PLACEHOLDER - Replace with full article text]

This is where the complete text of "The Creative Destruction" will go.

Paste the full article text here when ready.`,
  },
];