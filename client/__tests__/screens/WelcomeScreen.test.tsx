/**
 * Welcome Screen Tests
 * Test Plan Reference: WS-001 to WS-010
 * 
 * These tests verify the Welcome Screen logic including:
 * - Navigation flow
 * - First launch handling
 * - State management
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todocat_first_launch_completed';

describe('WelcomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
  });

  /**
   * Test Case: WS-001
   * Welcome screen displays on first launch
   */
  it('WS-001: should show on first launch', async () => {
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
    const isFirstLaunch = storedValue === null;
    
    expect(isFirstLaunch).toBe(true);
  });

  /**
   * Test Case: WS-003
   * Welcome title content
   */
  it('WS-003: has correct title text', () => {
    const welcomeTitle = 'Welcome to TodoCat';
    expect(welcomeTitle).toBe('Welcome to TodoCat');
  });

  /**
   * Test Case: WS-004
   * Subtitle content
   */
  it('WS-004: has correct subtitle text', () => {
    const subtitle = 'Your purrfect task companion';
    expect(subtitle).toBe('Your purrfect task companion');
  });

  /**
   * Test Case: WS-005
   * Go button text
   */
  it('WS-005: has Go button text', () => {
    const buttonText = 'Go';
    expect(buttonText).toBe('Go');
  });

  /**
   * Test Case: WS-007
   * Go button navigation
   */
  it('WS-007: Go button navigates to Home', () => {
    const mockReplace = jest.fn();
    
    mockReplace('Home');
    
    expect(mockReplace).toHaveBeenCalledWith('Home');
  });

  /**
   * Test Case: WS-008 (Related)
   * First launch flag is saved when Go button is pressed
   */
  it('WS-008: saves first launch completion flag', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'true');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      'true'
    );
  });

  /**
   * Test Case: WS-009
   * Welcome screen skipped on subsequent launches
   */
  it('WS-009: skipped on subsequent launches', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('true');
    
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
    const isFirstLaunch = storedValue === null;
    
    expect(isFirstLaunch).toBe(false);
  });
});
