import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getTaskById,
  markAllTasksCompleted,
  updateTask,
} from '../services/taskService';
import { Task, TaskFilters, TaskInput } from '../types/tasksType';

let tasks: Task[] = [];

export const resolvers = {
  Query: {
    tasks: (_: unknown, args: TaskFilters & { page?: number; pageSize?: number }) =>
      getAllTasks(tasks)(_, args),
    task: (_: unknown, args: { id: string }) => getTaskById(tasks)(_, args),
  },

  Mutation: {
    createTask: (_: unknown, args: { input: TaskInput }) => {
      tasks = createTask(tasks)(_, args);
      return tasks[tasks.length - 1];
    },
    updateTask: (_: unknown, args: { id: string; input: TaskInput }) => {
      // tasks = 
      return updateTask(tasks)(_, args);
      // return tasks.find((task) => task.id === args.id);
    },
    deleteTask: (_: unknown, args: { id: string }) => {
      tasks = deleteTask(tasks)(_, args);
      return true;
    },
    deleteAllTasks: () => {
      tasks = deleteAllTasks()();
      return true;
    },
    markAllTasksCompleted: () => {
      tasks = markAllTasksCompleted(tasks)();
      return tasks.length;
    },
  },
};
