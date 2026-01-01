# TodoCat Mobile App - Test Plan

## Overview

This document outlines the test plan and test cases for the TodoCat mobile application. The app is a todo checklist application with a welcome screen, home screen for task management, and local data persistence.

**App Version**: 1.0.0  
**Platform**: Android (via Expo Go)  
**Testing Date**: December 2024

---

## Test Environment

### Prerequisites
- Android device with Android 15 or lower
- Expo Go app installed from Google Play Store
- Stable internet connection for initial app load
- Development server running

### Test Device Specifications
- Minimum Android version: Android 5.0 (API 21)
- Maximum Android version: Android 15 (API 35)
- Screen sizes: Various (phones and tablets)

---

## Test Categories

### 1. Welcome Screen Tests

| Test ID | Test Case | Steps | Expected Result | Priority |
|---------|-----------|-------|-----------------|----------|
| WS-001 | Welcome screen displays on first launch | 1. Install app fresh 2. Launch app | Welcome screen appears with cat icon, title, subtitle, and Go button | High |
| WS-002 | App icon displays correctly | 1. View welcome screen | Cat face icon is visible and properly rendered (160x160px, rounded corners) | Medium |
| WS-003 | Welcome title displays correctly | 1. View welcome screen | "Welcome to TodoCat" text is visible and centered | High |
| WS-004 | Subtitle displays correctly | 1. View welcome screen | "Your purrfect task companion" subtitle is visible below title | Medium |
| WS-005 | Go button is visible and styled | 1. View welcome screen | Purple "Go" button is visible at bottom of screen | High |
| WS-006 | Go button press animation | 1. Press and hold Go button | Button scales down slightly on press | Low |
| WS-007 | Go button navigates to Home | 1. Tap Go button | App navigates to Home screen | Critical |
| WS-008 | Welcome screen skipped on second launch | 1. Complete first launch 2. Close app 3. Reopen app | App opens directly to Home screen | Critical |
| WS-009 | Safe area insets applied | 1. View on device with notch | Content does not overlap with status bar or navigation bar | High |
| WS-010 | Dark mode support | 1. Enable dark mode in device settings 2. View welcome screen | Colors adapt to dark theme | Medium |

### 2. Home Screen Tests

| Test ID | Test Case | Steps | Expected Result | Priority |
|---------|-----------|-------|-----------------|----------|
| HS-001 | Header displays "My Tasks" | 1. Navigate to Home screen | Header shows "My Tasks" title | High |
| HS-002 | Empty state displays correctly | 1. Open Home with no tasks | Shows check icon, "No tasks yet!", and "Tap + to add one" message | High |
| HS-003 | FAB (Floating Action Button) visible | 1. View Home screen | Purple circular "+" button visible in bottom-right corner | Critical |
| HS-004 | FAB press animation | 1. Press and hold FAB | Button scales down on press, scales up on release | Low |
| HS-005 | FAB haptic feedback | 1. Tap FAB on physical device | Device provides haptic feedback | Low |
| HS-006 | Safe area insets applied | 1. View on device with notch | Content does not overlap with status bar, FAB positioned above home indicator | High |
| HS-007 | List scrolls when many tasks | 1. Add 20+ tasks 2. Scroll list | List scrolls smoothly, content appears below header | Medium |
| HS-008 | Dark mode support | 1. Enable dark mode 2. View Home screen | Colors adapt to dark theme | Medium |
| HS-009 | Back gesture disabled | 1. Try to swipe back from Home | Cannot navigate back to Welcome screen | High |

### 3. Add Todo Modal Tests

| Test ID | Test Case | Steps | Expected Result | Priority |
|---------|-----------|-------|-----------------|----------|
| AM-001 | Modal opens on FAB tap | 1. Tap FAB button | Modal slides up from bottom with "Add New Task" title | Critical |
| AM-002 | Close button (X) visible | 1. Open add modal | X button visible in top-right of modal header | High |
| AM-003 | Close button works | 1. Open modal 2. Tap X button | Modal closes, no task added | High |
| AM-004 | Text input field visible | 1. Open add modal | Multi-line text input with placeholder "What needs to be done?" | High |
| AM-005 | Text input auto-focuses | 1. Open add modal | Keyboard appears automatically, cursor in text field | Medium |
| AM-006 | Add Task button visible | 1. Open add modal | "Add Task" button visible below input | High |
| AM-007 | Add Task button disabled when empty | 1. Open modal with empty input | "Add Task" button is disabled/dimmed | High |
| AM-008 | Add Task button enabled with text | 1. Type text in input | "Add Task" button becomes active | High |
| AM-009 | Adding task closes modal | 1. Enter text 2. Tap "Add Task" | Modal closes, new task appears in list | Critical |
| AM-010 | Input clears after adding | 1. Add a task 2. Open modal again | Input field is empty | Medium |
| AM-011 | Keyboard avoidance | 1. Open modal 2. Keyboard shows | Modal content adjusts so input is visible above keyboard | High |
| AM-012 | Multi-line input works | 1. Enter long text with line breaks | Text wraps and input expands | Medium |
| AM-013 | Modal backdrop tap closes | 1. Open modal 2. Tap dark overlay | Modal closes (or stays open - verify expected behavior) | Low |

### 4. Todo Item Tests

| Test ID | Test Case | Steps | Expected Result | Priority |
|---------|-----------|-------|-----------------|----------|
| TI-001 | New task appears at top | 1. Add new task | Task appears at top of list | High |
| TI-002 | Task displays checkbox | 1. View task item | Empty checkbox visible on left side | High |
| TI-003 | Task displays text | 1. View task item | Task text visible in center | High |
| TI-004 | Task displays delete icon | 1. View task item | Trash icon visible on right side | High |
| TI-005 | Checkbox toggles on tap | 1. Tap checkbox | Checkbox fills with green color and checkmark | Critical |
| TI-006 | Text strikethrough on complete | 1. Mark task complete | Task text shows strikethrough style | High |
| TI-007 | Haptic feedback on toggle | 1. Toggle checkbox on device | Device provides light haptic feedback | Low |
| TI-008 | Unchecking task | 1. Mark task complete 2. Tap checkbox again | Checkbox empties, strikethrough removed | High |
| TI-009 | Delete task | 1. Tap trash icon | Task removed from list with fade animation | Critical |
| TI-010 | Haptic feedback on delete | 1. Delete task on device | Device provides medium haptic feedback | Low |
| TI-011 | Task press animation | 1. Press and hold task | Task scales down slightly | Low |
| TI-012 | Long task text wraps | 1. Add task with very long text | Text wraps to maximum 2 lines | Medium |
| TI-013 | Task animations | 1. Add/remove tasks | Tasks fade in/out and animate smoothly | Low |

### 5. Data Persistence Tests

| Test ID | Test Case | Steps | Expected Result | Priority |
|---------|-----------|-------|-----------------|----------|
| DP-001 | Tasks persist after app close | 1. Add tasks 2. Close app 3. Reopen app | All tasks are still visible | Critical |
| DP-002 | Completed status persists | 1. Mark tasks complete 2. Close app 3. Reopen | Completed tasks still show as completed | Critical |
| DP-003 | Deleted tasks stay deleted | 1. Delete task 2. Close app 3. Reopen | Deleted task does not reappear | Critical |
| DP-004 | First launch flag persists | 1. Complete welcome 2. Close app 3. Reopen | Welcome screen does not show again | Critical |
| DP-005 | Task order preserved | 1. Add multiple tasks 2. Close app 3. Reopen | Tasks appear in same order (newest first) | Medium |
| DP-006 | Data survives app update | 1. Add tasks 2. Update app 3. Open app | Tasks are preserved | High |

### 6. Theme and Visual Tests

| Test ID | Test Case | Steps | Expected Result | Priority |
|---------|-----------|-------|-----------------|----------|
| TV-001 | Light mode colors correct | 1. Set device to light mode 2. View all screens | Purple primary color (#7B68EE), light gray background | High |
| TV-002 | Dark mode colors correct | 1. Set device to dark mode 2. View all screens | Light purple primary (#C4B5FD), dark background | High |
| TV-003 | System theme follows device | 1. Change device theme setting | App theme changes to match | Medium |
| TV-004 | Typography is readable | 1. View all text | Text is clearly legible, proper font weights | High |
| TV-005 | Spacing is consistent | 1. View all screens | Consistent padding and margins throughout | Medium |
| TV-006 | App icon appears correctly | 1. View app in launcher | Cat face icon displays (no cutoff) | High |
| TV-007 | Splash screen displays | 1. Cold start app | Purple splash screen with cat icon shows briefly | Medium |

### 7. Error Handling Tests

| Test ID | Test Case | Steps | Expected Result | Priority |
|---------|-----------|-------|-----------------|----------|
| EH-001 | Empty task not added | 1. Open modal 2. Tap Add with empty/whitespace input | Task not added, button disabled | High |
| EH-002 | App handles storage errors | 1. Fill device storage 2. Try to add task | App handles gracefully (shows error or continues) | Medium |
| EH-003 | Error boundary catches crashes | 1. Force app crash (if possible) | Error fallback UI shows with restart option | Medium |

### 8. Performance Tests

| Test ID | Test Case | Steps | Expected Result | Priority |
|---------|-----------|-------|-----------------|----------|
| PF-001 | App launches quickly | 1. Cold start app | App loads within 3 seconds | High |
| PF-002 | Smooth scrolling | 1. Add 50+ tasks 2. Scroll rapidly | No jank, 60fps scrolling | Medium |
| PF-003 | Modal opens quickly | 1. Tap FAB | Modal appears within 300ms | Medium |
| PF-004 | Animations are smooth | 1. Interact with various elements | All animations run at 60fps | Medium |

---

## Test Execution Checklist

### Pre-Test Setup
- [ ] Fresh install of Expo Go
- [ ] Clear app data if testing first launch
- [ ] Verify development server is running
- [ ] Note device model and Android version

### Critical Path Tests (Must Pass)
- [ ] WS-007: Go button navigates to Home
- [ ] WS-008: Welcome screen skipped on second launch
- [ ] AM-001: Modal opens on FAB tap
- [ ] AM-009: Adding task closes modal
- [ ] TI-005: Checkbox toggles on tap
- [ ] TI-009: Delete task
- [ ] DP-001: Tasks persist after app close
- [ ] DP-002: Completed status persists
- [ ] DP-003: Deleted tasks stay deleted
- [ ] DP-004: First launch flag persists

### Regression Tests (Run After Changes)
- [ ] All Critical Path Tests
- [ ] Theme tests (TV-001 through TV-003)
- [ ] Navigation tests (WS-007, HS-009)

---

## Bug Report Template

```
Bug ID: [Auto-generated]
Title: [Brief description]
Severity: Critical / High / Medium / Low
Test Case ID: [Reference to test case]
Device: [Model and Android version]
Steps to Reproduce:
1. 
2. 
3. 
Expected Result: 
Actual Result: 
Screenshots/Video: [Attach if applicable]
Additional Notes:
```

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Lead | | | |
| Developer | | | |
| Product Owner | | | |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 2024 | Agent | Initial test plan creation |
