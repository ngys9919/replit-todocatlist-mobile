import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FIRST_LAUNCH_KEY = "@todocat_first_launch_completed";

export function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
      setIsFirstLaunch(value === null);
    } catch (error) {
      console.error("Failed to check first launch:", error);
      setIsFirstLaunch(true);
    } finally {
      setIsLoading(false);
    }
  };

  const completeFirstLaunch = useCallback(async () => {
    try {
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, "true");
      setIsFirstLaunch(false);
    } catch (error) {
      console.error("Failed to save first launch status:", error);
    }
  }, []);

  return {
    isFirstLaunch,
    isLoading,
    completeFirstLaunch,
  };
}
