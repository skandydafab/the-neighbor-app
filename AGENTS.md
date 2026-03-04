# AGENTS.md - The Neighbor App

## Overview

Expo (React Native) mobile app for a literary/art magazine called "The Neighbor". Displays fiction, poetry, literature reviews, films & music reviews, and character portraits. The Neighborhood page connects to a live backend (`https://the-neighbor.onrender.com`) for community member registration and display.

**Tech stack**: Expo SDK 54, React Native 0.81, TypeScript 5.9, Expo Router 6 (file-based routing), React 19.

---

## Build & Development Commands

```bash
# Start Expo dev server
npm start                # or: npx expo start

# Run on specific platforms
npm run ios              # iOS simulator
npm run android          # Android emulator
npm run web              # Web browser

# Clear Metro bundler cache (useful if you get WebSocket/HMR errors)
npx expo start --clear

# Type checking (no linter or test runner configured)
npx tsc --noEmit
```

There is no test runner or linter configured. No single-test command exists.

---

## Near-term (To Be Built)

1. **Submit to Apple Developer Store** - Prepare app for App Store submission: create App Store assets (screenshots, icons, metadata), configure permissions, set up analytics/crash reporting, test on physical devices, and submit for review.

2. **Add actual article content** - Replace placeholder article content in data files with real fiction, poetry, literature reviews, films & music reviews, and portraits.

3. **API Backend for articles** - Replace static data files (`data/fiction.ts`, `data/literature-review.ts`, `data/films-music.ts`, `data/portraits.ts`) with API calls to backend.

4. **App Store URL** - The share button in `app/article-detail.tsx` currently points to `https://theneighborr.com`. Once the app is published on the App Store, replace this with the real App Store download link.

---

## Completed Work

### Pages & Screens
- **Home (index.tsx)** - "Our favorites this week" section (DaVinci-Regular), Editorial Line carousel, footer
- **Fiction, Literature Review, Films & Music** - Uses ArticleListScreen with static data
- **Portraits** - Centered layout with pixel art character images
- **Article Detail** - Full article view with share button, staggered entrance animation
- **Submit Content** - Form for submitting creative work via email composer
- **About** - About page with Dear Neighbor letter, baby images of founders (Ska & Paul)
- **Sign Up** - Multi-step form (3 steps) with image upload, backend API integration, stepper UI, clean form styling matching submit-content, star icon, red accent highlights
- **Neighborhood** - Live API fetch (`/community`), preview grid (3-column, 6 neighbors), interactive scrollable world with golden ratio positioning, tap scale animations (Pressable + Animated.spring), neighbor detail popup with fade+scale transitions, "joined X days ago" display, larger Local Lunatic image

### Animations
- **Article/Portrait card tap**: Press-down spring scale (0.96), exit overlay fade with card fade-out, navigation after animation completes
- **Article detail entrance**: Staggered slide-up + fade-in for each content element (category, title, author, date, content, share button) — 80ms delay between each, 350ms per element
- **Interactive Neighborhood**: Spring animations on neighbor item press, parallel fade+scale popup transitions

### Image Optimization
- Replaced React Native's built-in `<Image>` with `expo-image` across all major components
- Benefits: automatic memory caching, automatic downsampling (huge performance gain for 2-3MB PNGs), smooth 200-300ms crossfade transitions, better error handling
- Updated components: ArticleCard, PortraitCard, Carousel, neighborhood.tsx (both local and remote images)

### Visual Updates
- Neighborhood wall title: removed italics, bumped to 24pt
- "You can sign up" CTA text: changed from GeistMono to DaVinci, bumped to 24pt
- Local Lunatic image: increased from 150 to 220 height
- Signup redesign: completely rebuilt to match submit-content aesthetic (no squircle PNGs, clean rounded input fields, red accent highlights, star icon, 3-step flow preserved)
- Package updates: expo, expo-constants, expo-font, expo-router all updated to SDK 54 compatible versions

### Backend Integration
- **API Base URL**: `https://the-neighbor.onrender.com`
- `POST /submitMember` - FormData with firstname, lastname, email, location, image, activity
- `GET /community` - Returns array of neighbors with image_url, firstname, lastname, location, created_at
- `GET /check-email` - Checks if email already exists

---

## Project Structure

```
the-neighbor-app/
├── app/                      # Expo Router screens (file-based routing)
│   ├── _layout.tsx           # Root layout: fonts, SafeAreaProvider, bottom nav
│   ├── index.tsx             # Home screen ("Our favorites this week")
│   ├── fiction.tsx           # Fiction articles list
│   ├── literature-review.tsx  # Literature Review section
│   ├── films-music.tsx       # Films & Music section
│   ├── portraits.tsx         # Character portraits list
│   ├── article-detail.tsx    # Full article view with staggered entrance animation
│   ├── submit-content.tsx    # Submit creative work form
│   ├── neighborhood.tsx      # Neighborhood wall + interactive mode (API-backed)
│   ├── about.tsx             # About page with founders letter
│   └── signup.tsx            # Multi-step sign up (redesigned, clean form style)
├── components/               # Reusable UI components
│   ├── ArticleCard.tsx       # Article preview card with tap animation + expo-image
│   ├── ArticleListScreen.tsx # Reusable wrapper for article list pages
│   ├── PortraitCard.tsx      # Portrait card with tap animation + expo-image
│   ├── Carousel.tsx         # Helmuth carousel with expo-image
│   ├── BottomNavBar.tsx      # Bottom nav: Home, Fiction, Literature, Films, Portraits
│   ├── ExpandedMenu.tsx      # More (...) menu: About, Sign Up, Submit Content
│   ├── Header.tsx            # Header with hamburger, title, sign in
│   ├── HamburgerMenu.tsx     # Full-screen overlay menu
│   ├── HelmuthSquircle.tsx   # Squircle decorative component
│   └── LoadingScreen.tsx     # Splash/font loading screen
├── constants/
│   ├── Colors.ts             # Color palette (#FFFFF2 background, #FF1919 accent)
│   └── Typography.ts          # Font definitions & text styles
├── data/                     # Static article data (to be replaced by API)
├── types/                    # TypeScript type definitions
├── assets/                   # Images, fonts
└── ios/                      # iOS native project
```

---

## Code Style Guidelines

### General Principles
- Functional components with hooks exclusively (no classes)
- Composition over inheritance; keep components small (single responsibility)
- TypeScript for all code (no `.js` files); strict mode - all types must be explicit
- Use `interface` for object shapes, `type` for unions/aliases
- Avoid `any` - use `unknown` if type is truly unknown

### Naming Conventions

| Element              | Convention          | Example                     |
|----------------------|---------------------|-----------------------------|
| Components/files     | PascalCase          | `ArticleCard.tsx`           |
| Utils, hooks        | camelCase           | `useAuth.ts`                |
| Interfaces/Types    | PascalCase          | `ArticleCardProps`           |
| Constants           | PascalCase or UPPER | `Colors`, `API_BASE_URL`    |
| Variables/functions | camelCase           | `handlePress`, `isVisible`  |
| Boolean variables   | is/has/can prefix   | `isVisible`, `hasContent`   |

### Imports
- Use path alias `@/` for all internal imports
- Order (separated by blank lines): React/Expo builtins, third-party, internal components, constants/hooks/utils, types

### Styling
- `StyleSheet.create()` for all styles (never inline style objects)
- Use `@/constants/Colors` and `@/constants/Typography` - never hardcode colors/fonts
- Prefer percentage widths (`'90%'`) over fixed pixel widths
- Images: Use `expo-image` for better performance; `require()` for local assets, `{ uri: url }` for remote

### Safe Area Handling
- `SafeAreaProvider` wraps the entire app in `_layout.tsx`
- `SafeAreaView` with `edges={['top']}` in root layout handles status bar/notch/Dynamic Island for all screens
- For components inside `<Modal>` (outside the root SafeAreaView), use `useSafeAreaInsets()` from `react-native-safe-area-context`
- NEVER hardcode `paddingTop` values for status bar offset - always use safe area insets

### Error Handling
- `try/catch` for all async operations (fetch, image uploads, etc.)
- `console.error()` for logging; `Alert.alert()` for user-facing errors
- Always include `finally` block to reset loading states

### Animations
- Use `Animated` API with `useNativeDriver: true`
- `Animated.spring()` for bouncy interactions (buttons, cards)
- `Animated.timing()` for linear fades and smooth transitions
- `Animated.stagger()` for sequential element animations (like article detail entrance)
- Use `Pressable` instead of `TouchableOpacity` inside ScrollViews
- Always set `hitSlop` on small touch targets

### API Calls
- Store base URL as a constant: `const API_BASE_URL = 'https://the-neighbor.onrender.com'`
- Use `FormData` for multipart requests (image uploads)
- Track loading with `useState<boolean>`; check `response.ok` before parsing JSON

---

## Key Patterns

- **ArticleListScreen** is a reusable wrapper - Fiction, Literature Review, and Films & Music all use it with different data/titles
- **Article detail** receives all data via Expo Router search params (no fetch on detail page); includes share button with spring animation. Share link points to `theneighborr.com` — update to App Store link once published.
- **Sign Up** (signup.tsx): Clean form styling matching submit-content, 3-step flow, red accent highlights, star icon
- **Submit Content** (submit-content.tsx): Simple form with rounded inputs, uses expo-mail-composer
- **Interactive Neighborhood**: Full-screen modal with golden-ratio-positioned neighbors, spring animations on tap, popup with fade+scale transitions
- **expo-image**: Use for all image rendering (ArticleCard, PortraitCard, Carousel, neighborhood) for automatic caching and downsampling

---

## Resources

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev/docs)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Animated API](https://reactnative.dev/docs/animated)
- [Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [expo-image](https://docs.expo.dev/versions/latest/sdk/image/)
