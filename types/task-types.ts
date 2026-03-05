export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isLocal?: boolean;
}

export interface AddTask {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTask {
  completed: boolean;
}

export interface TaskResponse {
  todos: Task[];
  total: number;
  skip: number;
  limit: number;
}

export type TaskFilter = "all" | "completed" | "pending";
