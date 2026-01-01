import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  FadeIn,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button";
import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, Colors } from "@/constants/theme";
import { useTodos, Todo } from "@/hooks/useTodos";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TodoItemProps {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ item, onToggle, onDelete }: TodoItemProps) {
  const { theme, isDark } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  const handleToggle = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(item.id);
  };

  const handleDelete = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onDelete(item.id);
  };

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
    >
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleToggle}
        style={[
          styles.todoItem,
          {
            backgroundColor: theme.backgroundDefault,
          },
          animatedStyle,
        ]}
      >
        <Pressable
          onPress={handleToggle}
          style={[
            styles.checkbox,
            {
              borderColor: item.completed
                ? theme.success
                : theme.outline,
              backgroundColor: item.completed
                ? theme.success
                : "transparent",
            },
          ]}
        >
          {item.completed ? (
            <Feather name="check" size={16} color="#FFFFFF" />
          ) : null}
        </Pressable>

        <ThemedText
          type="body"
          style={[
            styles.todoText,
            item.completed && {
              textDecorationLine: "line-through",
              color: isDark ? Colors.dark.checked : Colors.light.checked,
            },
          ]}
          numberOfLines={2}
        >
          {item.text}
        </ThemedText>

        <Pressable
          onPress={handleDelete}
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="trash-2" size={20} color={theme.error} />
        </Pressable>
      </AnimatedPressable>
    </Animated.View>
  );
}

function EmptyState() {
  const { theme } = useTheme();

  return (
    <View style={styles.emptyContainer}>
      <Feather
        name="check-circle"
        size={80}
        color={theme.outline}
        style={styles.emptyIcon}
      />
      <ThemedText type="h4" style={styles.emptyTitle}>
        No tasks yet!
      </ThemedText>
      <ThemedText
        type="body"
        style={[styles.emptySubtitle, { color: theme.textSecondary }]}
      >
        Tap + to add one
      </ThemedText>
    </View>
  );
}

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (text: string) => void;
}

function AddTodoModal({ visible, onClose, onAdd }: AddTodoModalProps) {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
      onClose();
    }
  };

  const handleClose = () => {
    setText("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.backgroundRoot,
              paddingBottom: insets.bottom + Spacing.lg,
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <ThemedText type="h4">Add New Task</ThemedText>
            <Pressable testID="modal-close-button" onPress={handleClose}>
              <Feather name="x" size={24} color={theme.text} />
            </Pressable>
          </View>

          <KeyboardAwareScrollViewCompat
            style={styles.modalScroll}
            contentContainerStyle={styles.modalScrollContent}
          >
            <TextInput
              testID="task-input"
              style={[
                styles.input,
                {
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.text,
                  borderColor: theme.outline,
                },
              ]}
              placeholder="What needs to be done?"
              placeholderTextColor={theme.textSecondary}
              value={text}
              onChangeText={setText}
              autoFocus
              multiline
              textAlignVertical="top"
            />

            <View style={styles.modalButtons}>
              <Pressable
                testID="cancel-button"
                onPress={handleClose}
                style={[styles.cancelButton, { borderColor: theme.outline }]}
              >
                <ThemedText type="body" style={{ color: theme.textSecondary }}>
                  Cancel
                </ThemedText>
              </Pressable>
              <View style={styles.addButtonContainer}>
                <Button onPress={handleAdd} disabled={!text.trim()}>
                  Add Task
                </Button>
              </View>
            </View>
          </KeyboardAwareScrollViewCompat>
        </View>
      </View>
    </Modal>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  const fabScale = useSharedValue(1);

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const handleFabPressIn = () => {
    fabScale.value = withSpring(0.9, { damping: 15, stiffness: 200 });
  };

  const handleFabPressOut = () => {
    fabScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const handleFabPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  const handleAddTodo = useCallback(
    (text: string) => {
      addTodo(text);
    },
    [addTodo]
  );

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem item={item} onToggle={toggleTodo} onDelete={deleteTodo} />
    ),
    [toggleTodo, deleteTodo]
  );

  const keyExtractor = useCallback((item: Todo) => item.id, []);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: headerHeight + Spacing.xl,
            paddingBottom: insets.bottom + Spacing.xl + Spacing.fabSize + Spacing["2xl"],
          },
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        data={todos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={EmptyState}
        showsVerticalScrollIndicator={false}
      />

      <AnimatedPressable
        testID="add-task-fab"
        onPress={handleFabPress}
        onPressIn={handleFabPressIn}
        onPressOut={handleFabPressOut}
        style={[
          styles.fab,
          {
            backgroundColor: theme.primary,
            bottom: insets.bottom + Spacing.lg,
          },
          Shadows.fab,
          fabAnimatedStyle,
        ]}
      >
        <Feather name="plus" size={28} color="#FFFFFF" />
      </AnimatedPressable>

      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTodo}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    flexGrow: 1,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  todoText: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  deleteButton: {
    padding: Spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing["5xl"],
  },
  emptyIcon: {
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: Spacing.lg,
    width: Spacing.fabSize,
    height: Spacing.fabSize,
    borderRadius: Spacing.fabSize / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.md,
    borderTopRightRadius: BorderRadius.md,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalScrollContent: {
    gap: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  input: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    fontSize: 16,
    minHeight: 100,
    borderWidth: 1,
  },
  modalButtons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  addButtonContainer: {
    flex: 1,
  },
});
