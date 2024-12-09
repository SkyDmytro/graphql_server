import { Task, TaskFilters, TaskInput } from '../types/tasksType';
import { matchesFilters, validateTaskInput } from '../utils/functions';
import { v4 as uuidv4 } from 'uuid';

export const getAllTasks =
  (tasks: Task[]) =>
  (
    _: unknown,
    {
      completed,
      startDate,
      endDate,
      page = 1,
      pageSize = 10,
    }: TaskFilters & { page?: number; pageSize?: number },
  ) => {
    const filteredTasks = tasks.filter((task) =>
      matchesFilters(task, { completed, startDate, endDate }),
    );

    const startIndex = (page - 1) * pageSize;
    return filteredTasks.slice(startIndex, startIndex + pageSize);
  };

export const getTaskById =
  (tasks: Task[]) =>
  (_: unknown, { id }: { id: string }) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return task;
  };

export const createTask =
  (tasks: Task[]) =>
  (_: unknown, { input }: { input: TaskInput }) => {
    validateTaskInput(input);

    const newTask: Task = {
      id: uuidv4(),
      ...input,
      completed: input.completed || false,
    };

    return [...tasks, newTask];
  };

export const updateTask =
  (tasks: Task[]) =>
  (_: unknown, { id, input }: { id: string; input: TaskInput }) => {
    validateTaskInput(input);

    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }

    const updatedTask = { ...tasks[taskIndex], ...input };
    return tasks.map((task, index) => (index === taskIndex ? updatedTask : task));
  };

export const deleteTask =
  (tasks: Task[]) =>
  (_: unknown, { id }: { id: string }) => {
    if (!tasks.some((task) => task.id === id)) {
      throw new Error(`Task with ID ${id} not found`);
    }

    return tasks.filter((task) => task.id !== id);
  };

export const deleteAllTasks = () => () => {
  return [];
};

export const markAllTasksCompleted = (tasks: Task[]) => () => {
  return tasks.map((task) => ({ ...task, completed: true }));
};
