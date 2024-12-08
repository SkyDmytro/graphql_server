import { resolvers } from '../../resolvers/tasksResolver';
import { TaskInput } from '../../types/tasksType';
function createTestTask(overrides: Partial<TaskInput> = {}): TaskInput {
  return {
    title: 'Test Task',
    description: 'Test Description',
    dueDate: new Date().toISOString(),
    completed: false,
    ...overrides,
  };
}

describe('Todo Resolvers', () => {
  beforeEach(() => {
    const deleteAll = resolvers.Mutation.deleteAllTasks;
    deleteAll();
  });

  describe('Task Creation', () => {
    test('Create task successfully', () => {
      const createTask = resolvers.Mutation.createTask;
      const input = createTestTask();

      const result = createTask(null, { input });

      expect(result).toBeDefined();
      expect(result.title).toBe(input.title);
      expect(result.completed).toBe(false);
      expect(result.id).toBeTruthy();
    });

    test('Fail to create task with empty title', () => {
      const createTask = resolvers.Mutation.createTask;
      const input = createTestTask({ title: '' });

      expect(() => {
        createTask(null, { input });
      }).toThrow('Title is required');
    });

    test('Fail to create task with overly long title', () => {
      const createTask = resolvers.Mutation.createTask;
      const longTitle = 'a'.repeat(101);
      const input = createTestTask({ title: longTitle });

      expect(() => {
        createTask(null, { input });
      }).toThrow('Title must be 100 characters or less');
    });
  });

  describe('Task Update', () => {
    test('Update task successfully', () => {
      const createTask = resolvers.Mutation.createTask;
      const updateTask = resolvers.Mutation.updateTask;

      const initialTask = createTask(null, { input: createTestTask() });

      const updateInput = {
        title: 'Updated Task',
        description: 'Updated Description',
        completed: true,
        dueDate: new Date().toISOString(),
      };

      const updatedTask = updateTask(null, {
        id: initialTask.id,
        input: updateInput,
      });

      expect(updatedTask.title).toBe('Updated Task');
      expect(updatedTask.description).toBe('Updated Description');
      expect(updatedTask.completed).toBe(true);
    });

    test('Fail to update non-existent task', () => {
      const updateTask = resolvers.Mutation.updateTask;

      expect(() => {
        updateTask(null, {
          id: 'non-existent-id',
          input: createTestTask(),
        });
      }).toThrow('Task with ID non-existent-id not found');
    });
  });

  describe('Task Deletion', () => {
    test('Delete task successfully', () => {
      const createTask = resolvers.Mutation.createTask;
      const deleteTask = resolvers.Mutation.deleteTask;

      const task = createTask(null, { input: createTestTask() });

      const result = deleteTask(null, { id: task.id });

      expect(result).toBe(true);

      const getTask = resolvers.Query.task;
      expect(() => {
        getTask(null, { id: task.id });
      }).toThrow(`Task with ID ${task.id} not found`);
    });

    test('Fail to delete non-existent task', () => {
      const deleteTask = resolvers.Mutation.deleteTask;

      expect(() => {
        deleteTask(null, { id: 'non-existent-id' });
      }).toThrow('Task with ID non-existent-id not found');
    });
  });

  describe('Task Querying and Filtering', () => {
    test('Filter tasks by completion status', () => {
      const createTask = resolvers.Mutation.createTask;
      const getTasks = resolvers.Query.tasks;

      createTask(null, { input: createTestTask({ completed: true }) });
      createTask(null, { input: createTestTask({ completed: false }) });
      createTask(null, { input: createTestTask({ completed: true }) });

      const completedTasks = getTasks(null, { completed: true });
      expect(completedTasks.length).toBe(2);

      const pendingTasks = getTasks(null, { completed: false });
      expect(pendingTasks.length).toBe(1);
    });

    test('Mark all tasks as completed', () => {
      const createTask = resolvers.Mutation.createTask;
      const markAllCompleted = resolvers.Mutation.markAllTasksCompleted;

      createTask(null, { input: createTestTask({ completed: false }) });
      createTask(null, { input: createTestTask({ completed: false }) });
      createTask(null, { input: createTestTask({ completed: false }) });

      const getTasks = resolvers.Query.tasks;

      const updatedCount = markAllCompleted();

      expect(updatedCount).toBe(3);

      const completedTasks = getTasks(null, { completed: true });
      expect(completedTasks.length).toBe(3);
    });
  });
});
