# The Neighbor

A mobile app for a literary and art magazine. The Neighbor publishes fiction, poetry, literature reviews, films & music reviews, and character portraits -- bottling up the truth, vulnerability, and unique reality of being a human.

Built with Expo (React Native) and TypeScript.

## Sections

- **Home** -- Weekly editorial picks and a featured carousel
- **Fiction** -- Original short fiction with illustrated covers
- **Literature Review** -- Essays and reviews on literature
- **Films & Music** -- Reviews of films, music, and the arts
- **Portraits** -- Pixel-art character portraits of cultural figures
- **Neighborhood** -- A living community wall where members appear as generated "baby token" avatars, fetched from a live backend. Includes an interactive scrollable world with tap animations
- **Sign Up** -- Multi-step registration flow with selfie upload and AI-generated avatar creation
- **About** -- The story behind the magazine

## Tech Stack

- **Framework**: Expo SDK 54 / React Native 0.81
- **Routing**: Expo Router (file-based)
- **Language**: TypeScript (strict mode)
- **Backend**: Node/Express on Render, Supabase (DB + Storage), OpenAI (image generation)
- **Fonts**: DaVinci (custom serif), GeistMono (body), HeadlandOne (accent)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## Type Checking

```bash
npx tsc --noEmit
```

## Project Structure

```
app/           Screens (file-based routing)
components/    Reusable UI components
constants/     Colors, typography, fonts
data/          Static article/portrait data
assets/        Images and font files
types/         TypeScript type definitions
```

## Backend

The app connects to a live backend at `https://the-neighbor.onrender.com` for:

- **Community registration** (`POST /submitMember`) -- accepts form data with name, email, location, and optional selfie for AI avatar generation
- **Community display** (`GET /community`) -- returns all registered neighbors with their generated avatar images
