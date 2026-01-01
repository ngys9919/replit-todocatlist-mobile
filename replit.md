# replit.md

## Overview

TodoCat is a React Native/Expo mobile application for personal task management. It's a single-user, locally-focused todo app with a cat-themed design aesthetic. The app stores data locally on the device using AsyncStorage, with no authentication required. The project uses a monorepo structure with separate client (Expo/React Native) and server (Express) codebases, sharing types through a common schema module.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Expo SDK 54 with React Native 0.81
- **Navigation**: React Navigation with native-stack navigator (stack-only navigation pattern)
- **State Management**: React Query for server state, React hooks for local state
- **Local Storage**: AsyncStorage for persisting todos and user preferences
- **Animations**: React Native Reanimated for smooth animations and gestures
- **Styling**: Custom theming system with light/dark mode support, Material Design 3 inspired components

### Screen Flow
1. **Welcome Screen** - First-time user greeting (shown once, tracked via AsyncStorage)
2. **Home Screen** - Main todo list interface with task management
3. **Settings** - Planned as bottom sheet modal (avatar selection, display name, preferences)

### Backend Architecture
- **Framework**: Express.js server
- **Purpose**: Primarily serves as API backend and static file server for web builds
- **Storage**: In-memory storage implementation with interface for future database integration
- **Database Schema**: Drizzle ORM with PostgreSQL schema defined (users table currently)

### Project Structure
```
client/          # Expo/React Native app
  components/    # Reusable UI components (Button, Card, ThemedText, etc.)
  screens/       # Screen components (WelcomeScreen, HomeScreen)
  hooks/         # Custom hooks (useTheme, useTodos, useScreenOptions)
  navigation/    # Navigation configuration
  constants/     # Theme colors, spacing, typography
  lib/           # API client utilities

server/          # Express backend
  routes.ts      # API route definitions
  storage.ts     # Data storage abstraction
  templates/     # HTML templates for landing page

shared/          # Shared code between client and server
  schema.ts      # Drizzle database schema and Zod validation
```

### Design Patterns
- **Component Architecture**: Themed components (ThemedText, ThemedView) for consistent styling
- **Error Handling**: ErrorBoundary component wraps the app for graceful error recovery
- **Path Aliases**: `@/` maps to client directory, `@shared/` maps to shared directory

## External Dependencies

### Core Dependencies
- **Expo**: Mobile app framework and build tooling
- **React Navigation**: Navigation library with native-stack navigator
- **React Query (@tanstack/react-query)**: Server state management
- **AsyncStorage**: Local key-value storage for todos and preferences

### Database & ORM
- **Drizzle ORM**: SQL ORM for type-safe database queries
- **drizzle-zod**: Schema validation integration
- **PostgreSQL (pg)**: Database driver (configured but app currently uses local storage)

### UI & Animation
- **React Native Reanimated**: Performant animations
- **React Native Gesture Handler**: Touch gesture handling
- **Expo Haptics**: Haptic feedback
- **@expo/vector-icons (Feather)**: Icon library

### Build & Development
- **Babel with module-resolver**: Path alias resolution
- **tsx**: TypeScript execution for server
- **ESBuild**: Server bundling for production