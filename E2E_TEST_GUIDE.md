# TodoCat E2E Testing Guide with Maestro

This document provides a comprehensive guide to running End-to-End (E2E) tests for the TodoCat mobile application using Maestro.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Test Directory Structure](#test-directory-structure)
5. [Test Flows](#test-flows)
6. [Running Tests](#running-tests)
7. [Test Case Mapping](#test-case-mapping)
8. [Troubleshooting](#troubleshooting)

---

## Overview

Maestro is a mobile UI testing framework that uses human-readable YAML files to define test flows. It simulates real user interactions on iOS and Android devices/emulators, making it ideal for E2E testing of React Native/Expo applications.

### Why Maestro?

- **YAML-based**: Easy to read and write test flows
- **Cross-platform**: Works on both iOS and Android
- **Visual validation**: Can assert on visible text and elements
- **No code changes required**: Uses accessibility labels and text matching
- **CI/CD integration**: Works with EAS Workflows for automated testing

---

## Prerequisites

### Development Environment

- macOS (recommended for iOS testing) or Linux/Windows (Android only)
- Node.js 18+
- Android Studio with an Android emulator, OR
- Xcode with iOS Simulator (macOS only)

### App Requirements

- Development build of TodoCat (not Expo Go)
- Bundle identifier: `com.todocat.app`

---

## Installation

### Step 1: Install Maestro CLI

```bash
# Install latest version
curl -Ls "https://get.maestro.mobile.dev" | bash

# Or install specific version (recommended for teams)
MAESTRO_VERSION=1.37.0 curl -Ls "https://get.maestro.mobile.dev" | bash
```

### Step 2: Verify Installation

```bash
maestro --version
```

### Step 3: iOS Additional Setup (macOS only)

```bash
# Install Facebook's iOS Device Bridge
brew tap facebook/fb
brew install facebook/fb/idb-companion

# Start idb companion for your simulator
xcrun simctl list devices  # Find your simulator UDID
idb_companion --udid <YOUR_SIMULATOR_UDID>
```

### Step 4: Build the App

Since Maestro requires a native build (not Expo Go), you need to create a development build:

```bash
# Generate native directories
npx expo prebuild

# Build for Android emulator
npx expo run:android

# Build for iOS simulator (macOS only)
npx expo run:ios
```

---

## Test Directory Structure

```
.maestro/
├── config.yaml              # Global configuration and environment variables
├── welcome-flow.yaml        # Welcome screen tests (WS-001 to WS-010)
├── home-empty-state-flow.yaml  # Home screen empty state tests (HS-001 to HS-009)
├── add-task-flow.yaml       # Add task modal tests (AM-001 to AM-013)
├── complete-task-flow.yaml  # Toggle completion tests (TI-005 to TI-008)
├── delete-task-flow.yaml    # Delete task tests (TI-009 to TI-013)
└── full-user-journey-flow.yaml  # Complete user journey test
```

---

## Test Flows

### 1. Welcome Flow (`welcome-flow.yaml`)

**Purpose**: Tests the first-launch welcome screen experience.

**Test Cases Covered**:
- WS-001: Welcome screen displays on first launch
- WS-002: Cat face icon visibility
- WS-003: Welcome title "Welcome to TodoCat"
- WS-004: Subtitle "Your purrfect task companion"
- WS-005: "Go" button visibility
- WS-007: Navigation to Home screen
- WS-008: First launch flag persistence

**Key Steps**:
1. Launch app with cleared state
2. Verify welcome screen elements
3. Tap "Go" button
4. Verify navigation to Home
5. Relaunch and verify welcome is skipped

---

### 2. Home Empty State Flow (`home-empty-state-flow.yaml`)

**Purpose**: Tests the Home screen when no tasks exist.

**Test Cases Covered**:
- HS-001: Home screen layout
- HS-002: Empty state message
- HS-003: FAB (Floating Action Button) visibility
- HS-004: Header displays app name

**Key Steps**:
1. Complete first launch flow
2. Verify empty state message "No tasks yet!"
3. Verify hint text "Tap + to add one"
4. Verify FAB is visible

---

### 3. Add Task Flow (`add-task-flow.yaml`)

**Purpose**: Tests adding new tasks to the todo list.

**Test Cases Covered**:
- AM-001: FAB opens add task modal
- AM-003: Modal title "Add New Task"
- AM-004: Text input placeholder
- AM-005: Cancel button functionality
- AM-007: Add Task disabled when empty
- AM-008: Add Task enabled with text
- AM-009: Task added to list
- TI-001: New tasks appear at top

**Key Steps**:
1. Tap FAB to open modal
2. Verify modal elements
3. Test Cancel button
4. Enter task text
5. Tap "Add Task"
6. Verify task appears in list
7. Add another task and verify ordering

---

### 4. Complete Task Flow (`complete-task-flow.yaml`)

**Purpose**: Tests toggling tasks between completed and incomplete states.

**Test Cases Covered**:
- TI-005: Checkbox toggles on tap
- TI-006: Completed task styling (strikethrough)
- TI-007: Completed task opacity
- TI-008: Unchecking completed task

**Key Steps**:
1. Add a test task
2. Tap task to mark complete
3. Verify completed styling
4. Tap again to uncomplete
5. Verify uncompleted styling

---

### 5. Delete Task Flow (`delete-task-flow.yaml`)

**Purpose**: Tests deleting tasks from the list.

**Test Cases Covered**:
- TI-009: Delete action accessible
- TI-010: Delete confirmation (if applicable)
- TI-011: Task removed from list
- TI-012: Empty state returns when all deleted
- TI-013: Deletion persisted across restart

**Key Steps**:
1. Add multiple test tasks
2. Long-press to delete a task
3. Verify task is removed
4. Delete all tasks
5. Verify empty state
6. Restart app and verify persistence

---

### 6. Full User Journey Flow (`full-user-journey-flow.yaml`)

**Purpose**: Comprehensive test simulating a complete user session.

**Phases**:
1. **First Launch Experience**
   - Welcome screen verification
   - Navigation to Home

2. **Empty State Experience**
   - Verify empty state UI

3. **Adding Tasks**
   - Add "Morning routine"
   - Add "Buy cat food"
   - Add "Clean litter box"

4. **Completing Tasks**
   - Complete "Morning routine"
   - Complete "Buy cat food"

5. **Uncompleting a Task**
   - Uncomplete "Morning routine"

6. **Deleting a Task**
   - Delete "Buy cat food"

7. **Data Persistence**
   - Restart app
   - Verify tasks persisted
   - Verify welcome skipped

---

## Running Tests

### Run All Tests

```bash
maestro test .maestro/
```

### Run a Specific Flow

```bash
# Welcome screen tests
maestro test .maestro/welcome-flow.yaml

# Add task tests
maestro test .maestro/add-task-flow.yaml

# Full journey test
maestro test .maestro/full-user-journey-flow.yaml
```

### Run with Recording

```bash
# Record video of test execution
maestro record .maestro/full-user-journey-flow.yaml
```

### Run with Maestro Studio (Interactive)

```bash
# Open interactive test builder
maestro studio
```

### Run on Specific Device

```bash
# List available devices
maestro test --device list

# Run on specific device
maestro test .maestro/ --device emulator-5554
```

---

## Test Case Mapping

| Test Flow | Test Cases Covered | Description |
|-----------|-------------------|-------------|
| welcome-flow.yaml | WS-001 to WS-008 | Welcome screen functionality |
| home-empty-state-flow.yaml | HS-001 to HS-004 | Empty state display |
| add-task-flow.yaml | AM-001 to AM-009, TI-001, TI-003 | Adding tasks |
| complete-task-flow.yaml | TI-005 to TI-008 | Completing/uncompleting tasks |
| delete-task-flow.yaml | TI-009 to TI-013 | Deleting tasks |
| full-user-journey-flow.yaml | Comprehensive | All user scenarios |

### Element Locators Used

| Element | testID | Description |
|---------|--------|-------------|
| Cat Icon | `cat-icon` | Cat face mascot icon on welcome screen |
| FAB Button | `add-task-fab` | Floating action button to add tasks |
| Task Input | `task-input` | Text input in add task modal |
| Cancel Button | `cancel-button` | Cancel button in modal |
| Close Button | `modal-close-button` | X button to close modal |

---

## Troubleshooting

### Common Issues

#### 1. "Element not found" errors

**Cause**: Element hasn't loaded yet or text doesn't match exactly.

**Solution**: Use `extendedWaitUntil` with appropriate timeout:
```yaml
- extendedWaitUntil:
    visible: "Element Text"
    timeout: 10000
```

#### 2. App doesn't launch

**Cause**: Wrong app ID or app not installed.

**Solution**: Verify bundle identifier in app.json matches your flows:
```yaml
appId: com.todocat.app
```

#### 3. Animations interfere with tests

**Cause**: Tests run faster than animations complete.

**Solution**: Add wait for animation:
```yaml
- extendedWaitUntil:
    timeout: 1000
```

#### 4. iOS simulator not detected

**Cause**: idb_companion not running.

**Solution**:
```bash
idb_companion --udid <SIMULATOR_UDID>
```

### Debug Mode

Run with verbose output:
```bash
maestro test .maestro/welcome-flow.yaml --debug-output debug_output
```

### Clear App State

If tests fail due to stale data:
```yaml
- launchApp:
    clearState: true
    clearKeychain: true
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  e2e-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Maestro
        run: curl -Ls "https://get.maestro.mobile.dev" | bash
      
      - name: Build Android APK
        run: npx expo prebuild && npx expo run:android
      
      - name: Start Emulator
        uses: reactivecircus/android-emulator-runner@v2
        with:
          api-level: 30
          script: ~/.maestro/bin/maestro test .maestro/
```

### EAS Workflows Example

Create `.eas/workflows/e2e-android.yml`:
```yaml
name: e2e-android
on:
  pull_request:
    branches: ['*']

jobs:
  build:
    type: build
    params:
      platform: android
      profile: e2e-test
  
  test:
    needs: [build]
    type: maestro
    params:
      build_id: ${{ needs.build.outputs.build_id }}
      flow_path: ['.maestro/']
```

---

## Additional Resources

- [Maestro Documentation](https://maestro.mobile.dev/)
- [Expo E2E Testing Guide](https://docs.expo.dev/eas/workflows/examples/e2e-tests/)
- [React Native Support in Maestro](https://docs.maestro.dev/platform-support/react-native)
- [TEST_PLAN.md](./TEST_PLAN.md) - Detailed test case specifications

---

## Summary

The Maestro E2E test suite for TodoCat includes:

- **6 test flows** covering all major user scenarios
- **30+ test assertions** validating UI elements and interactions
- **Full user journey** test for comprehensive coverage
- **Persistence validation** ensuring data survives app restarts
- **Clear documentation** linking tests to TEST_PLAN.md specifications

Run the full test suite with:
```bash
maestro test .maestro/
```
