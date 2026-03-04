# AGENTS.md - The Neighbor App

## Overview

This is an Expo (React Native) mobile application for a literary/art magazine called "The Neighbor". The app displays fiction articles, poetry, literature reviews, films & music reviews, and character portraits. The Neighborhood page connects to a live backend (https://the-neighbor.onrender.com) for community member registration and display.

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
│   ├── index.tsx          # Home screen with favorites and carousel
│   ├── fiction.tsx        # Fiction articles list
│   ├── literature-review.tsx  # Literature Review section
│   ├── films-music.tsx    # Films & Music section
│   ├── portraits.tsx      # Character portraits list
│   ├── article-detail.tsx # Full article view
│   ├── neighborhood.tsx   # Neighborhood wall with API, animations, interactive mode
│   ├── about.tsx          # About page with founders letter
│   └── signup.tsx         # Multi-step sign up with backend integration
├── components/            # Reusable UI components
│   ├── ArticleCard.tsx    # Article preview card
│   ├── ArticleListScreen.tsx  # Reusable screen wrapper for article list pages
│   ├── PortraitCard.tsx   # Portrait card (centered, pixel art style)
│   ├── Carousel.tsx       # Horizontal swipeable carousel
│   ├── Header.tsx         # Fixed header with hamburger, title, sign in
│   ├── HamburgerMenu.tsx  # Full-screen overlay menu
│   └── LoadingScreen.tsx  # Font loading screen
├── constants/
│   ├── Colors.ts          # Color palette (#FFFFF2 background, #FF1919 accent)
│   └── Typography.ts      # Font definitions & text styles
├── data/                  # Static data (separate files per section)
│   ├── fiction.ts         # Fiction articles (with images mapped)
│   ├── literature-review.ts  # Literature Review articles (with images mapped)
│   ├── films-music.ts     # Films & Music articles (with images mapped)
│   └── portraits.ts       # Character portraits (pixel art images)
├── types/                 # TypeScript type definitions
├── assets/                # Images, fonts
└── ios/, android/         # Platform-specific code
```

---

## Completed Work

### Pages & Screens
- **Home (index.tsx)** - "Our favorites this week" section (DaVinci-Regular), Editorial Line carousel, footer
- **Fiction, Literature Review, Films & Music** - Uses ArticleListScreen with static data
- **Portraits** - Centered layout with pixel art character images
- **Article Detail** - Full article view
- **About** - About page with Dear Neighbor letter, baby images of founders (Ska & Paul)
- **Sign Up** - Multi-step form (3 steps) with image upload, backend API integration, stepper UI, squircle PNG backgrounds, validation, loading states
- **Neighborhood** - Live API fetch (`/community`), preview grid (3-column, 6 neighbors), interactive scrollable world with golden ratio positioning, tap scale animations (Pressable + Animated.spring), neighbor detail popup with fade+scale transitions, "joined X days ago" display, rounded borders

### Backend Integration
- **API Base URL**: `https://the-neighbor.onrender.com`
- `POST /submitMember` - FormData with firstname, lastname, email, location, image, activity
- `GET /community` - Returns array of neighbors with image_url, firstname, lastname, location, created_at

### Components & Patterns
- **ArticleCard, ArticleListScreen, PortraitCard, Carousel** - Article/portrait display
- **Header, HamburgerMenu** - Navigation
- **Squircle wrapper** - PNG backgrounds with absolute positioning, transparent children (signup.tsx)
- **Animated interactions** - Pressable with onPressIn/onPressOut triggering Animated.spring for scale
- **Popup animations** - Parallel fade+scale using Animated.timing and Animated.spring

---

## Pending Work

### Near-term (To Be Built)

1. **API Backend for articles** - Replace static data files (fiction.ts, literature-review.ts, films-music.ts, portraits.ts) with API calls to backend. Add endpoints for article fetching, filtering, and searching. Build out backend infrastructure for articles and article calls.

2. **Production preparation for app store submission** - Error boundaries, offline handling, optimize/compress images, test on physical devices, app store assets (screenshots, icons, metadata), permissions, analytics/crash reporting.

---

## Code Style Guidelines

### General Principles
- Use functional components with hooks exclusively
- Prefer composition over inheritance
- Keep components small and focused (single responsibility)
- Use TypeScript for all new code (no `.js` files)
- **Strict mode enabled** - all types must be explicit

### TypeScript
- Use `interface` for object shapes, `type` for unions/aliases
- Avoid `any` - use `unknown` if type is truly unknown
- Use optional properties (`?`) sparingly and intentionally

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `ArticleCard.tsx` |
| Files (utils, hooks) | camelCase | `useAuth.ts` |
| Interfaces/Types | PascalCase | `ArticleCardProps` |
| Constants | PascalCase or SCREAMING_SNAKE | `Colors`, `API_BASE_URL` |
| Variables/functions | camelCase | `handlePress`, `isVisible` |
| Boolean variables | is/has/can prefix | `isVisible`, `hasContent` |

### Imports
- Use path alias `@/` for internal imports
- Order import groups (separate with blank lines):
  1. React/Expo built-ins
  2. Third-party libraries
  3. Internal components
  4. Internal constants/hooks/utils
  5. Type definitions

### Styling
- Use `StyleSheet.create()` for all styles (not inline objects)
- Use constants from `@/constants/Colors` and `@/constants/Typography`
- Prefer percentage widths (`'90%'`) over fixed widths for responsiveness
- For images, use `require()` for local assets or `{ uri: url }` for remote

### Error Handling
- Use `try/catch` for async operations (fetch, image uploads, etc.)
- Log errors with `console.error()` for debugging
- Show user-friendly errors with `Alert.alert()` from react-native
- Always include `finally` block to reset loading states

### Animations
- Use `Animated` API with `useNativeDriver: true` for performance
- Use `Animated.spring()` for bouncy interactions (buttons, cards)
- Use `Animated.timing()` for linear fades and smooth transitions
- Use `Pressable` instead of `TouchableOpacity` inside ScrollViews
- Always use `hitSlop` prop for small touch targets

### API Integration
- Store base URL in constant: `const API_BASE_URL = 'https://the-neighbor.onrender.com'`
- Use `FormData` for multipart requests (image uploads)
- Handle loading states with `useState<boolean>`
- Check `response.ok` before parsing JSON

---

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Animated API](https://reactnative.dev/docs/animated)
