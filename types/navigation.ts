/**
 * Type definitions for navigation
 * This helps TypeScript understand what screens we have and what parameters they accept
 */

export type RootStackParamList = {
  // Main screens
  Home: undefined;                    // Homepage - no parameters needed
  Fiction: undefined;                 // Fiction list page
  Portraits: undefined;               // Portraits list page
  Essays: undefined;                  // Essays list page (future)
  About: undefined;                   // About page (future)
  
  // Detail screens
  ArticleDetail: {                    // Article detail page - needs article data
    id: string;                       // Unique identifier for the article
    title: string;                    // Article title
    author: string;                   // Article author
    category: string;                 // e.g., "SHORT STORY", "POETRY"
    content: string;                  // Full article text
    image?: string;                   // Optional featured image URL
  };
};