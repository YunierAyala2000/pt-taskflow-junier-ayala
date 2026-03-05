"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import { getTasksPaginated, addTask, updateTask, removeTask } from "@/services/task-services";
import type { Task, TaskFilter, TaskResponse, AddTask } from "@/types/task-types";
import { toast } from "sonner";

const DEFAULT_ITEMS_PER_PAGE = 10;

export function useTasks(initialItemsPerPage: number = DEFAULT_ITEMS_PER_PAGE) {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [localTodos, setLocalTodos] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const localTaskIds = useRef<Set<number>>(new Set());
  const idTask = useRef<number>(10000);

  const skip = page * itemsPerPage;
  const swrKey = `todos-page-${page}-limit-${itemsPerPage}`;

  const { data, error, isLoading, mutate } = useSWR<TaskResponse>(swrKey, () => getTasksPaginated(itemsPerPage, skip), {
    revalidateOnFocus: false,
    keepPreviousData: false,
    onSuccess: (responseData) => {
      if (!isInitialized) {
        setLocalTodos(responseData.todos);
        setIsInitialized(true);
      }
    },
  });

  // Sincroniza cuando SWR devuelve datos y aún no se ha inicializado la página
  if (data && !isInitialized) {
    setLocalTodos(data.todos);
    setIsInitialized(true);
  }

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    setLocalTodos([]);
    setIsInitialized(false);
    localTaskIds.current.clear();
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(0);
    setLocalTodos([]);
    setIsInitialized(false);
    localTaskIds.current.clear();
  }, []);

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;
  const totalItems = data?.total || 0;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return localTodos.filter((t) => t.completed);
      case "pending":
        return localTodos.filter((t) => !t.completed);
      default:
        return localTodos;
    }
  }, [localTodos, filter]);

  const addTodo = useCallback(async (taskTitle: string) => {
    try {
      const newTask: AddTask = { todo: taskTitle.trim(), completed: false, userId: 1 };
      const newTaskData = await addTask(newTask);

      const localTask: Task = {
        id: idTask.current++,
        todo: newTask.todo,
        completed: newTask.completed,
        userId: newTask.userId,
        isLocal: true,
      };
      localTaskIds.current.add(localTask.id);

      setLocalTodos((prev) => [localTask, ...prev]);
      toast.success("Tarea añadida. Solo visible en esta sesión (la API no persiste nuevas tareas).");
      return localTask;
    } catch (err) {
      toast.error("Error al añadir la tarea");
      throw err;
    } finally {
      setMutating(false);
    }
  }, []);

  const toggleTodo = useCallback(async (id: number, completed: boolean) => {
    setMutating(true);
    try {
      if (localTaskIds.current.has(id)) {
        setLocalTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)));
        toast.success(completed ? "Tarea marcada como completada" : "Tarea marcada como pendiente");
        return;
      }

      const updated = await updateTask(id, { completed });
      setLocalTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: updated.completed } : t)));
      toast.success(completed ? "Tarea actualizada a completada" : "Tarea actualizada a pendiente");
      return updated;
    } catch (error) {
      toast.error("Error al actualizar la tarea");
      throw error;
    } finally {
      setMutating(false);
    }
  }, []);

  const removeTodo = useCallback(
    async (id: number) => {
      setMutating(true);
      try {
        if (localTaskIds.current.has(id)) {
          localTaskIds.current.delete(id);
          setLocalTodos((prev) => {
            const newTodos = prev.filter((t) => t.id !== id);
            if (newTodos.length === 0 && page > 0) handlePageChange(page - 1);
            return newTodos;
          });
          toast.success("Tarea local eliminada");
          return;
        }
        
        await removeTask(id);
        setLocalTodos((prev) => {
          const newTodos = prev.filter((t) => t.id !== id);
          if (newTodos.length === 0 && page > 0) handlePageChange(page - 1);
          return newTodos;
        });
        toast.success("Tarea eliminada con éxito");
      } catch (error) {
        toast.error("Error al eliminar la tarea");
        throw error;
      } finally {
        setMutating(false);
      }
    },
    [page, handlePageChange],
  );

  const itemsPerPageOptions = [10, 20, 30, 40, 50];

  return {
    todos: filteredTodos,
    allTodos: localTodos,
    isLoading,
    error,
    mutating,
    page,
    totalPages,
    totalItems,
    filter,
    setFilter,
    setPage: handlePageChange,
    itemsPerPage,
    setItemsPerPage: handleItemsPerPageChange,
    itemsPerPageOptions,
    addTodo,
    toggleTodo,
    removeTodo,
    retry: () => mutate(),
  };
}
