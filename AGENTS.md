# AGENTS.md - The Neighbor App

## Overview

This is an Expo (React Native) mobile application for a literary/art magazine called "The Neighbor". The app displays fiction articles, poetry, literature reviews, films & music reviews, and character portraits.

---

## Build & Development Commands

### Running the App

```bash
# Start Expo development server
npm start
# or
npx expo start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Type Checking

```bash
npx tsc --noEmit
```

### Testing

No test runner currently configured.

### Linting

No linter currently configured.

---

## Project Structure

```
the-neighbor-app/
├── app/                   # Expo Router screens (file-based routing)
│   ├── _layout.tsx        # Root layout with fonts & navigation
│   ├── index.tsx          # Home screen
│   ├── fiction.tsx        # Fiction articles list
│   ├── literature-review.tsx  # Literature Review section
│   ├── films-music.tsx    # Films & Music section
│   ├── portraits.tsx      # Character portraits list
│   ├── article-detail.tsx # Full article view
│   ├── neighborhood.tsx   # Neighborhood wall with neighbor grid
│   ├── about.tsx          # Placeholder - to be built
│   └── signup.tsx         # Placeholder - to be built
├── components/            # Reusable UI components
│   ├── ArticleCard.tsx    # Article preview card (full-width image, category, title, description, author)
│   ├── ArticleListScreen.tsx  # Reusable screen wrapper for article list pages
│   ├── PortraitCard.tsx   # Portrait card (centered, pixel art style)
│   ├── Carousel.tsx       # Horizontal swipeable carousel
│   ├── Header.tsx         # Fixed header with hamburger, title, sign in
│   ├── HamburgerMenu.tsx  # Full-screen overlay menu
│   └── LoadingScreen.tsx  # Font loading screen
├── constants/             # App-wide constants
│   ├── Colors.ts          # Color palette (#FFFFF2 background, #FF1919 accent)
│   └── Typography.ts      # Font definitions & text styles
├── data/                  # Static data (separate files per section)
│   ├── fiction.ts         # Fiction articles (with images mapped)
│   ├── literature-review.ts  # Literature Review articles (with images mapped)
│   ├── films-music.ts     # Films & Music articles (with images mapped)
│   └── portraits.ts       # Character portraits (pixel art images)
├── types/                 # TypeScript type definitions
├── assets/                # Images, fonts
│   └── images/            # All images including Image Assets folder
└── ios/, android/         # Platform-specific code
```

---

## Completed Work

### Typography & Styling
- **Fonts loaded in _layout.tsx:**
  - DaVinci-Regular, DaVinci-Medium, DaVinci-SemiBold, DaVinci-Italic (custom)
  - GeistMono (variable font for body text)
  - HeadlandOne_400Regular (for "Films & Music" title)

- **Typography constants (Typography.ts):**
  - Site title: 29px DaVinci
  - Section headers: 37px, -0.03em letter spacing, 1.1 line height, DaVinci
  - Article titles: 27px, -0.03em letter spacing, DaVinci
  - Category: Geist Bold (700), 15px, #FF1919 color
  - Description: Geist Regular (400), 14px, 1.2em line height
  - Author: Geist Medium (500), 14px

### Data Files (with Images Mapped)
- `data/fiction.ts` - 4 articles with images from `Image Assets/3. Fiction/`
- `data/literature-review.ts` - 3 articles with images from `Image Assets/2. Literature Review/`
- `data/films-music.ts` - 4 articles with images from `Image Assets/5. Films & Music/`

### Components Built
- **ArticleCard** - Full-width article preview with image, red category label, title, description, author
- **ArticleListScreen** - Reusable wrapper with header, hamburger menu, scrollable article list
- **PortraitCard** - Centered portrait card with pixel art image, category, name, description
- **Carousel** - Horizontal swipeable carousel with card style
- **HamburgerMenu** - Full-screen overlay with content items, heart separator, utility items

### Screens
- **Home (index.tsx)** - "Our favorites this week" section, Editorial Line carousel, footer with contact
- **Fiction** - Uses ArticleListScreen with Fiction articles
- **Literature Review** - Uses ArticleListScreen with Lit Review articles
- **Films & Music** - Uses ArticleListScreen with HeadlandOne font for title
- **Portraits** - Centered layout with pixel art character images
- **Article Detail** - Full article view (existing, not modified)
- **Neighborhood** - Neighbor wall with grid, modal details, call-to-action sections

---

## Pending Work

### Near-term (To Be Built)

1. **Placeholder Pages** - Create simple placeholder screens for:
   - `app/about.tsx` - Placeholder  
   - `app/signup.tsx` - Placeholder

### Future (Not Yet Scheduled)

1. **Home Page Carousel Images** - Map actual images to carousel slides (currently placeholders)

2. **Squirkle Background** - Add squirkle background image to Home page

3. **Portrait Animations** - Portrait images are animated (not yet implemented)

4. **Login/Authentication** - Add sign in/sign up functionality (API integration later)

5. **Bottom Navigation Bar** - Replace header with application-like bottom bar (design TBD)

6. **Backend API Integration** - Replace static data with API calls when backend is ready

---

## Code Style Guidelines

### General Principles

- Use functional components with hooks exclusively
- Prefer composition over inheritance
- Keep components small and focused (single responsibility)
- Use TypeScript for all new code (no `.js` files)

### TypeScript

- **Strict mode is enabled** in `tsconfig.json` - all types must be explicit
- Use `interface` for object shapes, `type` for unions/aliases
- Avoid `any` - use `unknown` if type is truly unknown
- Use optional properties (`?`) sparingly and intentionally

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `ArticleCard.tsx` |
| Files (utils, hooks) | camelCase | `useAuth.ts` |
| Interfaces/Types | PascalCase | `ArticleCardProps` |
| Constants | PascalCase | `Colors`, `Fonts` |
| Variables/functions | camelCase | `handlePress`, `isVisible` |
| Boolean variables | is/has/can prefix | `isVisible`, `hasContent` |

### Imports

- Use path alias `@/` for internal imports (configured in tsconfig)
- Order imports groups (separate with blank lines):
  1. React/Expo built-ins
  2. Third-party libraries
  3. Internal components
  4. Internal constants/hooks/utils
  5. Type definitions

### Component Structure

```typescript
/**
 * Component Name
 * Brief description of what it does
 */
import { View, Text } from 'react-native';
import Colors from '@/constants/Colors';

interface ComponentNameProps {
  // props definition
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    <View style={styles.container}>
      <Text>Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
```

### Styling

- Use `StyleSheet.create()` for all styles (not inline objects)
- Use constants from `@/constants/Colors` and `@/constants/Typography`
- Prefer percentage widths (`'90%'`) over fixed widths for responsiveness
- For images, use `require()` for local assets (e.g., `require('../assets/images/...')`)

### Navigation

- Use `expo-router` for navigation (file-based routing)
- Use `useRouter` hook for programmatic navigation

---

## Adding New Features

### Adding a New Article Section

1. Create new data file in `data/` (e.g., `data/new-section.ts`)
2. Map images using `require()` for local assets
3. Create screen in `app/new-section.tsx` using ArticleListScreen
4. Add to HamburgerMenu
5. Add route to _layout.tsx

### Adding New Articles

1. Add entries to appropriate data file
2. Each entry needs: id, category, title, description, fullContent, author, date, imageUrl
3. Use `require()` for imageUrl to map local assets

---

## Image Asset Guidelines

Images are stored in `assets/images/Image Assets/` organized by section:
- `1. Home/` - Home page assets (carousel placeholders)
- `2. Literature Review/` - Literature Review article images
- `3. Fiction/` - Fiction article images
- `4. Portraits/` - Portrait pixel art images (not yet mapped)
- `5. Films & Music/` - Films & Music article images
- `6. About/` - About page assets
- `7. Neighborhood/` - Neighborhood page assets
- `8. Sign Up/` - Sign up page assets

To map images in data files:
```typescript
imageUrl: require('../assets/images/Image Assets/3. Fiction/article-name.png'),
```

---

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
