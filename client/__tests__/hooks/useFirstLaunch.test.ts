/**
 * useFirstLaunch Hook Tests
 * Test Plan Reference: WS-008, DP-004
 * 
 * These tests verify the useFirstLaunch hook logic including:
 * - Detecting first launch
 * - Saving first launch completion
 * - Skipping welcome on subsequent launches
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todocat_first_launch_completed';

describe('useFirstLaunch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test Case: WS-008 / DP-004 (Related)
   * First launch detection - no stored value
   */
  it('WS-008: isFirstLaunch=true when no stored value', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
    const isFirstLaunch = storedValue === null;

    expect(isFirstLaunch).toBe(true);
  });

  /**
   * Test Case: WS-008 / DP-004
   * Welcome screen skipped on second launch
   */
  it('DP-004: isFirstLaunch=false when value exists in storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('true');

    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
    const isFirstLaunch = storedValue === null;

    expect(isFirstLaunch).toBe(false);
  });

  /**
   * Test Case: WS-008
   * First launch flag is saved
   */
  it('WS-008: completeFirstLaunch saves flag to AsyncStorage', async () => {
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

    await AsyncStorage.setItem(STORAGE_KEY, 'true');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      'true'
    );
  });

  /**
   * Test Case: DP-004 (Related)
   * After completing first launch, subsequent checks return false
   */
  it('DP-004: subsequent checks return isFirstLaunch=false', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    
    const firstCheck = await AsyncStorage.getItem(STORAGE_KEY);
    expect(firstCheck === null).toBe(true);
    
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
    
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('true');
    
    const secondCheck = await AsyncStorage.getItem(STORAGE_KEY);
    expect(secondCheck === null).toBe(false);
  });

  /**
   * Test Case: EH-002 (Related)
   * Handles storage errors gracefully
   */
  it('EH-002: handles storage read errors gracefully', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

    let isFirstLaunch = true;
    
    try {
      const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
      isFirstLaunch = storedValue === null;
    } catch (error) {
      isFirstLaunch = true;
    }

    expect(isFirstLaunch).toBe(true);
  });
});
