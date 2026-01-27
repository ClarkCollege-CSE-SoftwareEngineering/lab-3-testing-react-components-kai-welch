import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchTasks, createTask, deleteTask, toggleTask } from '../api/taskApi';

describe('taskApi', () => {
  // Store the original fetch
  const originalFetch = global.fetch;

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Restore original fetch after tests
    global.fetch = originalFetch;
  });

  describe('fetchTasks', () => {
    it('returns tasks on successful response', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: true },
      ];

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      } as Response);

      const result = await fetchTasks();

      expect(result).toEqual(mockTasks);
      expect(global.fetch).toHaveBeenCalledWith('/api/tasks');
    });

    it('throws error on failed response', async () => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(fetchTasks()).rejects.toThrow('Failed to fetch tasks');
    });
  });

  // TODO: Add tests for createTask
  describe('createTask', () => {
  // - Test successful creation (mock POST request, verify body and headers)
    it('create a task successfly', async () => {
      const mockTask = { id: '1', title: 'Task 1', completed: false};

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTask),
      } as Response);

      const result = await createTask({ title: "Task 1" });

      expect(result).toEqual(mockTask);
      expect(global.fetch).toHaveBeenCalledWith('/api/tasks', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: "Task 1" }),
      });
    });
  // - Test error handling
    it('handles error', async()  => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(createTask({ title: "Task 1" })).rejects.toThrow('Failed to create task');
    });
  });

  // TODO: Add tests for deleteTask
  describe('deleteTask', () => {
  // - Test successful deletion (mock DELETE request)
    it('delete a task successfly', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: true },
      ];

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      } as Response);

      await deleteTask("2");

      expect(global.fetch).toHaveBeenCalledWith(`${'/api/tasks'}/${2}`, { 
        method: 'DELETE',
      });
    });
  // - Test error handling
    it('handles error', async()  => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(deleteTask("2")).rejects.toThrow('Failed to delete task');
    });
  });

  // TODO: Add tests for toggleTask
  describe('toggleTask', () => {
  // - Test successful toggle (mock PATCH request, verify body)
    it('toggle a task successfly', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', completed: false },
      ];

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      } as Response);

      await toggleTask("1", true);

      expect(global.fetch).toHaveBeenCalledWith(`${'/api/tasks'}/${1}`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
    });
  // - Test error handling
    it('handles error', async()  => {
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(toggleTask("1", true)).rejects.toThrow('Failed to update task');
    });
  });
});