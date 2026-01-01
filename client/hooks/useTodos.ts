import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const TODOS_STORAGE_KEY = "@todocat_todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const stored = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Todo[];
        setTodos(parsed.sort((a, b) => b.createdAt - a.createdAt));
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(newTodos));
    } catch (error) {
      console.error("Failed to save todos:", error);
    }
  };

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => {
      const updated = [newTodo, ...prev];
      saveTodos(updated);
      return updated;
    });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos(updated);
      return updated;
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.filter((todo) => todo.id !== id);
      saveTodos(updated);
      return updated;
    });
  }, []);

  return {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
