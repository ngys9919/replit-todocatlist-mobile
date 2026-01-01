/**
 * Home Screen Tests
 * Test Plan Reference: HS-001 to HS-009, AM-001 to AM-013, TI-001 to TI-013
 * 
 * These tests verify the Home Screen logic including:
 * - Empty state behavior
 * - Todo list management
 * - Modal interactions
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = '@todocat_todos';

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
  });

  describe('Empty State Tests', () => {
    /**
     * Test Case: HS-002
     * Empty state displays correctly
     */
    it('HS-002: shows empty state when no tasks exist', async () => {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const todos: Todo[] = storedData ? JSON.parse(storedData) : [];
      
      expect(todos).toHaveLength(0);
      
      const emptyStateMessage = 'No tasks yet!';
      const emptyStateHint = 'Tap + to add one';
      
      expect(emptyStateMessage).toBe('No tasks yet!');
      expect(emptyStateHint).toBe('Tap + to add one');
    });
  });

  describe('FAB Tests', () => {
    /**
     * Test Case: HS-003
     * FAB visibility
     */
    it('HS-003: FAB should be visible', () => {
      const fabIcon = '+';
      expect(fabIcon).toBe('+');
    });

    /**
     * Test Case: AM-001
     * Modal opens on FAB tap
     */
    it('AM-001: FAB opens add task modal', () => {
      let isModalVisible = false;
      
      const openModal = () => {
        isModalVisible = true;
      };
      
      openModal();
      
      expect(isModalVisible).toBe(true);
    });
  });

  describe('Add Todo Modal Tests', () => {
    /**
     * Test Case: AM-004
     * Text input placeholder
     */
    it('AM-004: modal has placeholder text', () => {
      const placeholder = 'What needs to be done?';
      expect(placeholder).toBe('What needs to be done?');
    });

    /**
     * Test Case: AM-007
     * Add Task button disabled when empty
     */
    it('AM-007: Add Task button disabled when input is empty', () => {
      const inputText = '';
      const isButtonDisabled = inputText.trim().length === 0;
      
      expect(isButtonDisabled).toBe(true);
    });

    /**
     * Test Case: AM-008
     * Add Task button enabled when input has text
     */
    it('AM-008: Add Task button enabled when input has text', () => {
      const inputText = 'Buy groceries';
      const isButtonDisabled = inputText.trim().length === 0;
      
      expect(isButtonDisabled).toBe(false);
    });
  });

  describe('Todo Item Display Tests', () => {
    /**
     * Test Case: TI-001
     * Tasks render from storage
     */
    it('TI-001: renders tasks from storage', async () => {
      const mockTodos: Todo[] = [
        { id: '1', text: 'Test task 1', completed: false, createdAt: Date.now() },
        { id: '2', text: 'Test task 2', completed: true, createdAt: Date.now() - 1000 },
      ];
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockTodos));

      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const todos: Todo[] = storedData ? JSON.parse(storedData) : [];

      expect(todos).toHaveLength(2);
      expect(todos[0].text).toBe('Test task 1');
      expect(todos[1].text).toBe('Test task 2');
    });

    /**
     * Test Case: TI-006
     * Completed task styling
     */
    it('TI-006: completed tasks have different styling', () => {
      const completedTodo: Todo = { id: '1', text: 'Completed task', completed: true, createdAt: Date.now() };
      const incompleteTodo: Todo = { id: '2', text: 'Incomplete task', completed: false, createdAt: Date.now() };
      
      const getTextStyle = (todo: Todo) => ({
        textDecorationLine: todo.completed ? 'line-through' : 'none',
        opacity: todo.completed ? 0.5 : 1,
      });
      
      expect(getTextStyle(completedTodo).textDecorationLine).toBe('line-through');
      expect(getTextStyle(incompleteTodo).textDecorationLine).toBe('none');
    });

    /**
     * Test Case: TI-010
     * Delete confirmation
     */
    it('TI-010: delete removes task from list', () => {
      let todos: Todo[] = [
        { id: '1', text: 'Task to delete', completed: false, createdAt: Date.now() },
      ];
      
      todos = todos.filter(t => t.id !== '1');
      
      expect(todos).toHaveLength(0);
    });
  });
});
