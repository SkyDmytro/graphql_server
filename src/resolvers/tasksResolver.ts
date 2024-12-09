import { v4 as uuidv4 } from 'uuid';
import { Task, TaskInput, TaskFilters } from '../types/tasksType';
import { validateTaskInput, matchesFilters } from '../utils/functions';

const tasks: Task[] = [];

export const resolvers = {
  Query: {
    tasks: (
      _: unknown,
      {
        completed,
        startDate,
        endDate,
        page = 1,
        pageSize = 10,
      }: TaskFilters & { page?: number; pageSize?: number },
    ) => {
      let filteredTasks = tasks.filter((task) =>
        matchesFilters(task, { completed, startDate, endDate }),
      );

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return filteredTasks.slice(startIndex, endIndex);
    },

    task: (_: unknown, { id }: { id: string }) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        throw new Error(`Task with ID ${id} not found`);
      }
      return task;
    },
  },

  Mutation: {
    createTask: (_: unknown, { input }: { input: TaskInput }) => {
      validateTaskInput(input);

      const newTask: Task = {
        id: uuidv4(),
        ...input,
        completed: input.completed || false,
      };

      tasks.push(newTask);
      return newTask;
    },

    updateTask: (_: unknown, { id, input }: { id: string; input: TaskInput }) => {
      validateTaskInput(input);

      const taskIndex = tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) {
        throw new Error(`Task with ID ${id} not found`);
      }

      const updatedTask = {
        ...tasks[taskIndex],
        ...input,
      };

      tasks[taskIndex] = updatedTask;
      return updatedTask;
    },

    deleteTask: (_: unknown, { id }: { id: string }) => {
      const taskIndex = tasks.findIndex((t) => t.id === id);
      if (taskIndex === -1) {
        throw new Error(`Task with ID ${id} not found`);
      }

      tasks.splice(taskIndex, 1);
      return true;
    },

    deleteAllTasks: () => {
      tasks.splice(0, tasks.length);
      return true;
    },

    markAllTasksCompleted: () => {
      tasks.forEach((task) => {
        task.completed = true;
      });
      return true;
    },
  },
};
