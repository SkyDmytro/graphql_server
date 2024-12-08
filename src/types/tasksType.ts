export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  completed?: boolean;
  dueDate: string;
}

export interface TaskFilters {
  completed?: boolean;
  startDate?: string;
  endDate?: string;
}
