/**
 * Portraits Data
 * Contains all portrait profiles
 */

export interface Portrait {
  id: string;
  category: string;
  name: string;
  description: string;
  fullContent: string;  // Complete portrait text
  iconUrl: any;         // require() import for pixel art
  date: string;
}

export const portraits: Portrait[] = [
  {
    id: '1',
    category: 'MUSICIAN',
    name: 'Rick Rubin',
    description: 'In the years of modernity, Rick stands out alone.',
    iconUrl: require('../assets/images/RUBIN KEY1.png'),
    date: '01/12/2024',
    fullContent: `[PLACEHOLDER - Replace with full portrait text]

This is where the complete profile of Rick Rubin will go.

Each paragraph should be separated by a blank line.

Paste the full portrait text here when ready.`,
  },
  {
    id: '2',
    category: 'AUTHOR',
    name: 'Henry Miller',
    description: 'In the years of modernity, Rick stands out alone.',
    iconUrl: require('../assets/images/MILLER KEY1.png'),
    date: '15/11/2024',
    fullContent: `[PLACEHOLDER - Replace with full portrait text]

This is where the complete profile of Henry Miller will go.

Paste the full portrait text here when ready.`,
  },
  {
    id: '3',
    category: 'FRIEND',
    name: 'Furtive Hedgehog',
    description: 'In the years of modernity, Rick stands out alone.',
    iconUrl: require('../assets/images/HEDGEHOG KEY1.png'),
    date: '20/10/2024',
    fullContent: `[PLACEHOLDER - Replace with full portrait text]

This is where the complete profile of Furtive Hedgehog will go.

Paste the full portrait text here when ready.`,
  },
];