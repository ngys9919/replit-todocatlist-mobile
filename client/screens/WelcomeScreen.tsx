import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useFirstLaunch } from "@/hooks/useFirstLaunch";
import { Spacing } from "@/constants/theme";
import type { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { completeFirstLaunch } = useFirstLaunch();

  const handleGoPress = async () => {
    await completeFirstLaunch();
    navigation.replace("Home");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundRoot,
          paddingTop: insets.top + Spacing.xl,
          paddingBottom: insets.bottom + Spacing.xl,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            testID="cat-icon"
            accessibilityLabel="Cat face icon"
            source={require("../../assets/images/icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <ThemedText type="h1" style={styles.title}>
          Welcome to TodoCat
        </ThemedText>

        <ThemedText
          type="body"
          style={[styles.subtitle, { color: theme.textSecondary }]}
        >
          Your purrfect task companion
        </ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleGoPress} style={styles.goButton}>
          Go
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: Spacing["3xl"],
  },
  icon: {
    width: 160,
    height: 160,
    borderRadius: 32,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  subtitle: {
    textAlign: "center",
  },
  buttonContainer: {
    paddingBottom: Spacing["2xl"],
  },
  goButton: {
    width: "100%",
  },
});
