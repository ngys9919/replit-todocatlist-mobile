# Todo Checklist App - Design Guidelines

## Architecture Decisions

### Authentication
**No Authentication Required**
- This is a single-user, locally-focused todo app
- All data stored on device
- Include a **Settings screen** accessible from Home header with:
  - User avatar selection (generate 3 cat-themed avatar presets matching app icon aesthetic)
  - Display name field (default: "User")
  - App preferences: Dark mode toggle, notification settings

### Navigation Structure
**Stack-Only Navigation**
- **Welcome Screen** (first launch only, skip on subsequent opens)
  - Non-dismissible modal that shows once
  - "Go" button navigates to Home
  - Store completion flag in AsyncStorage
- **Home Screen** (main screen)
  - Root screen after welcome
  - Settings icon in header (top-right) opens Settings sheet
- **Settings Screen**
  - Presented as bottom sheet modal from Home

## Screen Specifications

### Welcome Screen
**Purpose**: First-time user greeting and app introduction

**Layout**:
- No navigation header
- Full-screen centered content
- Safe area insets: top = insets.top + Spacing.xl, bottom = insets.bottom + Spacing.xl

**Components**:
- Large app icon (cat face illustration)
- Welcome heading: "Welcome to TodoCat"
- Subtext: "Your purrfect task companion"
- Primary button "Go" (centered, bottom third of screen)
- Material Design 3 elevated button style with ripple effect

### Home Screen
**Purpose**: Main todo checklist management interface

**Layout**:
- Navigation header:
  - Title: "My Tasks"
  - Right button: Settings icon (gear/cog)
  - Transparent background
- Scrollable list main content
- Floating Action Button (FAB) for adding new todos
- Safe area insets: top = Spacing.xl, bottom = insets.bottom + Spacing.xl + 80 (for FAB clearance)

**Components**:
- Search bar below header (optional, collapsible)
- Todo list items (cards with checkboxes):
  - Checkbox (left), task text (center), delete icon (right)
  - Ripple effect on tap
  - Strikethrough animation when checked
  - Swipe-to-delete gesture
- Empty state: Cat illustration with "No tasks yet! Tap + to add one"
- FAB (bottom-right):
  - Material "+" icon
  - Primary color background
  - Shadow: elevation 6dp in Material terms
  - Position: 16dp from right, 16dp from bottom

### Settings Screen
**Purpose**: User customization and app preferences

**Layout**:
- Bottom sheet modal (slides up from bottom)
- Header with "Settings" title and close button
- Scrollable form content
- Safe area insets: bottom = insets.bottom + Spacing.lg

**Components**:
- Avatar picker: Horizontal scroll of 3 cat avatar options
- Text input: Display name
- Toggle switches:
  - Dark mode
  - Task notifications
- Version info (footer text)

## Design System

### Color Palette (Material Design 3)
**Light Theme**:
- Primary: #7B68EE (Medium purple - playful, friendly)
- Primary Container: #E8E3FF
- On Primary: #FFFFFF
- Secondary: #FF9E80 (Coral - warm accent)
- Background: #FAFAFA
- Surface: #FFFFFF
- Error: #B3261E
- Outline: #E0E0E0
- Text Primary: #1C1B1F
- Text Secondary: #49454F

**Dark Theme**:
- Primary: #C4B5FD
- Primary Container: #4A3F7A
- Background: #1C1B1F
- Surface: #2B2930
- Text Primary: #E6E1E5
- Text Secondary: #CAC4D0

### Typography (Material Design 3)
- Display Large: Roboto 57sp, Regular
- Headline Medium: Roboto 28sp, Regular
- Title Large: Roboto 22sp, Medium (Screen titles)
- Body Large: Roboto 16sp, Regular (Todo text)
- Body Medium: Roboto 14sp, Regular
- Label Large: Roboto 14sp, Medium (Button text)

### Visual Design
- **Icons**: Material Symbols (outlined style) for all UI icons except app icon
- **Touchable Feedback**: Material ripple effect (default Android behavior)
- **Elevation/Shadows**:
  - Cards: 2dp elevation
  - FAB: 6dp elevation
  - Bottom sheets: 8dp elevation
- **Corner Radius**:
  - Cards: 12dp
  - Buttons: 20dp (fully rounded)
  - FAB: Circular (56dp diameter)
  - Bottom sheet: 16dp (top corners only)
- **Spacing Scale**: 4dp base unit (8, 12, 16, 24, 32, 48dp)

### Critical Assets
1. **App Icon** (cat face):
   - 512x512px adaptive icon
   - Minimalist cat face illustration
   - Purple color scheme matching primary color
   - Simple geometric shapes (circle head, triangle ears, dots for eyes)

2. **User Avatar Presets** (3 variations):
   - Cat Avatar 1: Orange tabby cat
   - Cat Avatar 2: Gray tuxedo cat  
   - Cat Avatar 3: White persian cat
   - All 128x128px, circular crop, matching app aesthetic

3. **Empty State Illustration**:
   - Relaxed sleeping cat
   - Purple/coral color scheme
   - 240x240px
   - SVG or PNG format

## Interaction Design
- **Todo Check Animation**: Bounce animation (150ms) when checkbox tapped
- **Strikethrough**: Smooth 200ms animation when item checked
- **Swipe-to-Delete**: Reveal red delete background on left swipe, requires 50% swipe to trigger
- **FAB Tap**: Scale down to 0.95 on press, scale up to 1.05 then 1.0 on release
- **List Item Ripple**: Material ripple emanating from tap point
- **Bottom Sheet**: Slide up 300ms ease-out, backdrop dim 50% opacity

## Accessibility
- All touchable elements minimum 48dp touch target
- Color contrast ratio 4.5:1 minimum for text
- Checkbox labels associated with inputs
- Screen reader support for all interactive elements
- Semantic labels: "Add task", "Mark as complete", "Delete task"
- Focus indicators visible for keyboard navigation