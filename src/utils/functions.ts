import { Task, TaskInput } from '../types/tasksType';

export function validateTaskInput(input: TaskInput): void {
  if (!input.title || input.title.trim() === '') {
    throw new Error('Title is required');
  }
  if (input.title.length > 100) {
    throw new Error('Title must be 100 characters or less');
  }

  if (input.description && input.description.length > 500) {
    throw new Error('Description must be 500 characters or less');
  }

  if (!input.dueDate) {
    throw new Error('Due date is required');
  }

  try {
    const parsedDate = new Date(input.dueDate);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }
  } catch (error) {
    throw new Error('Invalid date format. Use ISO format');
  }
}

export function matchesFilters(
  task: Task,
  filters: {
    completed?: boolean;
    startDate?: string;
    endDate?: string;
  },
): boolean {
  if (filters.completed !== undefined && task.completed !== filters.completed) {
    return false;
  }

  const taskDate = new Date(task.dueDate);

  if (filters.startDate) {
    const startDate = new Date(filters.startDate);
    if (taskDate < startDate) return false;
  }

  if (filters.endDate) {
    const endDate = new Date(filters.endDate);
    if (taskDate > endDate) return false;
  }

  return true;
}
