"use server";

import type { Task, TaskResponse, AddTask, UpdateTask } from "@/types/task-types";

const BASE_URL: string = process.env.BASE_URL_API || "";

async function serverRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(errorBody?.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getTasksPaginated(limit: number = 10, skip: number = 0): Promise<TaskResponse> {
  return serverRequest<TaskResponse>(`/todos?limit=${limit}&skip=${skip}`);
}

export async function addTask(payload: AddTask): Promise<Task> {
  return serverRequest<Task>("/todos/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTask(id: number, payload: UpdateTask): Promise<Task> {
  return serverRequest<Task>(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function removeTask(id: number): Promise<Task> {
  return serverRequest<Task>(`/todos/${id}`, {
    method: "DELETE",
  });
}
