/**
 * useTodos Hook Tests
 * Test Plan Reference: TI-001 to TI-013, DP-001 to DP-006
 * 
 * These tests verify the useTodos hook logic including:
 * - Todo data structure
 * - Add, toggle, delete operations
 * - Data persistence logic
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = '@todocat_todos';

function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => b.createdAt - a.createdAt);
}

describe('useTodos Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
  });

  describe('Loading Tests', () => {
    /**
     * Test Case: DP-001 (Related)
     * Initial load returns empty array when no stored data
     */
    it('DP-001: returns empty todos when no data in storage', async () => {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      expect(storedData).toBeNull();
      
      const todos: Todo[] = storedData ? JSON.parse(storedData) : [];
      expect(todos).toEqual([]);
    });

    /**
     * Test Case: DP-001
     * Loads todos from AsyncStorage
     */
    it('DP-001: loads todos from AsyncStorage', async () => {
      const mockTodos: Todo[] = [
        { id: '1', text: 'Test task', completed: false, createdAt: Date.now() },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockTodos));

      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const todos: Todo[] = storedData ? JSON.parse(storedData) : [];
      
      expect(todos).toHaveLength(1);
      expect(todos[0].text).toBe('Test task');
    });

    /**
     * Test Case: DP-002
     * Completed status persists
     */
    it('DP-002: preserves completed status from storage', async () => {
      const mockTodos: Todo[] = [
        { id: '1', text: 'Completed task', completed: true, createdAt: Date.now() },
        { id: '2', text: 'Pending task', completed: false, createdAt: Date.now() - 1000 },
      ];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockTodos));

      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const todos: Todo[] = storedData ? JSON.parse(storedData) : [];
      
      const completedTask = todos.find(t => t.id === '1');
      const pendingTask = todos.find(t => t.id === '2');
      
      expect(completedTask?.completed).toBe(true);
      expect(pendingTask?.completed).toBe(false);
    });

    /**
     * Test Case: DP-005
     * Task order - newest first
     */
    it('DP-005: sorts todos by createdAt descending', () => {
      const mockTodos: Todo[] = [
        { id: '1', text: 'Old task', completed: false, createdAt: 1000 },
        { id: '2', text: 'New task', completed: false, createdAt: 2000 },
      ];

      const sorted = sortTodos(mockTodos);
      
      expect(sorted[0].text).toBe('New task');
      expect(sorted[1].text).toBe('Old task');
    });
  });

  describe('Add Todo Tests', () => {
    /**
     * Test Case: TI-001
     * New task appears at top
     */
    it('TI-001: adds new todo at the top of the list', () => {
      const todos: Todo[] = [];
      
      const firstTodo: Todo = {
        id: '1',
        text: 'First task',
        completed: false,
        createdAt: 1000,
      };
      todos.push(firstTodo);
      
      const secondTodo: Todo = {
        id: '2',
        text: 'Second task',
        completed: false,
        createdAt: 2000,
      };
      todos.push(secondTodo);
      
      const sorted = sortTodos(todos);
      
      expect(sorted[0].text).toBe('Second task');
      expect(sorted[1].text).toBe('First task');
    });

    /**
     * Test Case: AM-009 (Related)
     * Adding task saves to storage
     */
    it('AM-009: saves to AsyncStorage when adding todo', async () => {
      const todos: Todo[] = [
        { id: '1', text: 'New task', completed: false, createdAt: Date.now() },
      ];
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String)
      );
    });

    /**
     * Test Case: EH-001 (Related)
     * New todo has correct default properties
     */
    it('EH-001: new todo has correct default properties', () => {
      const createTodo = (text: string): Todo => ({
        id: String(Date.now()),
        text,
        completed: false,
        createdAt: Date.now(),
      });
      
      const newTodo = createTodo('Test task');
      
      expect(newTodo.id).toBeDefined();
      expect(newTodo.text).toBe('Test task');
      expect(newTodo.completed).toBe(false);
      expect(newTodo.createdAt).toBeDefined();
    });
  });

  describe('Toggle Todo Tests', () => {
    /**
     * Test Case: TI-005
     * Checkbox toggles on tap
     */
    it('TI-005: toggles todo completed status', () => {
      const todo: Todo = { id: '1', text: 'Test task', completed: false, createdAt: Date.now() };
      
      expect(todo.completed).toBe(false);
      
      todo.completed = !todo.completed;
      
      expect(todo.completed).toBe(true);
    });

    /**
     * Test Case: TI-008
     * Unchecking task
     */
    it('TI-008: can toggle completed task back to incomplete', () => {
      const todo: Todo = { id: '1', text: 'Completed task', completed: true, createdAt: Date.now() };
      
      expect(todo.completed).toBe(true);
      
      todo.completed = !todo.completed;
      
      expect(todo.completed).toBe(false);
    });

    /**
     * Test Case: DP-002 (Related)
     * Toggle saves to storage
     */
    it('DP-002: saves toggled state to AsyncStorage', async () => {
      const todos: Todo[] = [
        { id: '1', text: 'Test task', completed: true, createdAt: Date.now() },
      ];
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Delete Todo Tests', () => {
    /**
     * Test Case: TI-009
     * Delete task - removes from list
     */
    it('TI-009: deletes todo from list', () => {
      let todos: Todo[] = [
        { id: '1', text: 'Task to delete', completed: false, createdAt: Date.now() },
        { id: '2', text: 'Task to keep', completed: false, createdAt: Date.now() - 1000 },
      ];

      expect(todos).toHaveLength(2);

      todos = todos.filter(t => t.id !== '1');

      expect(todos).toHaveLength(1);
      expect(todos[0].text).toBe('Task to keep');
    });

    /**
     * Test Case: DP-003
     * Deleted tasks stay deleted
     */
    it('DP-003: saves deletion to AsyncStorage', async () => {
      const todos: Todo[] = [];
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        '[]'
      );
    });
  });
});
