"use client";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Trash2Icon, AlertCircle, PencilIcon } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { TaskEmpty } from "@/components/shared/task-empty";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task-types";

interface TaskItemProps {
  todos: Task[];
  isLoading?: boolean;
  isMutating?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  onToggle?: (id: number, completed: boolean) => Promise<void> | void;
  onDelete?: (id: number) => Promise<void> | void;
  onEdit?: (task: Task) => Promise<void> | void;
  emptyMessage?: string;
  className?: string;
  maxHeight?: string;
  showStatusBadge?: boolean;
  showEditButton?: boolean;
  confirmDialogText?: {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
  };
}

export function TaskItem({
  todos,
  isLoading = false,
  isMutating = false,
  error = null,
  onRetry,
  onToggle,
  onDelete,
  onEdit,
  emptyMessage = "No hay tareas disponibles",
  className,
  maxHeight = "440px",
  showStatusBadge = true,
  showEditButton = false,
  confirmDialogText = {
    title: "Eliminar tarea",
    description:
      "¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.",
    confirmText: "Eliminar",
    cancelText: "Cancelar",
  },
}: TaskItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDeleteClick = (id: number) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete !== null && onDelete) {
      await onDelete(taskToDelete);
      setShowConfirm(false);
      setTaskToDelete(null);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    if (onToggle) {
      await onToggle(id, completed);
    }
  };

  const handleEdit = (task: Task) => {
    if (onEdit) {
      setEditingTask(task);
      onEdit(task);
    }
  };

  if (error) {
    return (
      <div className={cn("w-full mx-auto p-4", className)}>
        <div className="flex flex-col items-center justify-center gap-4 py-12 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 font-medium mb-1">
              Ocurrió un error al cargar las tareas
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {error.message || "Por favor, intenta nuevamente"}
            </p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!todos.length) {
    return <TaskEmpty emptyMessage={emptyMessage} className={className} />;
  }

  return (
    <>
      <div className={cn("relative", className)}>
        <ul
          className="space-y-2 overflow-y-auto pr-1 md:pr-2 custom-scrollbar"
          style={{ maxHeight }}
        >
          {todos.map((task) => (
            <li
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-3 md:p-4",
                "bg-gray-50 dark:bg-gray-800/50 rounded-xl",
                "active:bg-gray-100 dark:active:bg-gray-800",
                "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                "border border-gray-200 dark:border-gray-700",
                isMutating && "opacity-50 pointer-events-none",
              )}
            >
              {onToggle && (
                <Checkbox
                  onClick={() => handleToggle(task.id, !task.completed)}
                  checked={task.completed}
                  disabled={isMutating}
                  className={cn(
                    "flex-shrink-0 transition-colors size-5",
                    task.completed
                      ? "bg-green-500 border-green-500 data-[state=checked]:bg-green-500"
                      : "bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600",
                  )}
                />
              )}

              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => handleToggle(task.id, !task.completed)}
              >
                <span
                  className={cn(
                    "block text-sm md:text-base transition-all break-words leading-snug",
                    task.completed
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-800 dark:text-gray-200",
                  )}
                  title={task.todo}
                >
                  {task.todo}
                </span>

                <div className="flex flex-wrap items-center gap-1.5 mt-1.5 sm:hidden">
                  {task.isLocal && (
                    <span
                      className="px-1.5 py-0.5 text-xs font-medium rounded-full flex items-center gap-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      title="Tarea local: solo visible en esta sesión"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm1 0v7h12V5H4zm-2 9a1 1 0 011-1h14a1 1 0 110 2H2a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Local
                    </span>
                  )}
                  {showStatusBadge && (
                    <span
                      className={cn(
                        "px-1.5 py-0.5 text-xs font-medium rounded-full flex items-center gap-1",
                        task.completed
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                      )}
                    >
                      {task.completed ? "Completada" : "Pendiente"}
                    </span>
                  )}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                {task.isLocal && (
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    title="Tarea local: solo visible en esta sesión, no guardada en el servidor"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm1 0v7h12V5H4zm-2 9a1 1 0 011-1h14a1 1 0 110 2H2a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Local
                  </span>
                )}
                {showStatusBadge && (
                  <span
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1",
                      task.completed
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                    )}
                    title={task.completed ? "Completada" : "Pendiente"}
                  >
                    {task.completed ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.293a1 1 0 010 1.414l-7.75 7.75a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.793 7.043-7.043a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 6h2v5H9V6zm0 7h2v2H9v-2z" />
                      </svg>
                    )}
                    {task.completed ? "Completada" : "Pendiente"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {showEditButton && onEdit && (
                  <Button
                    onClick={() => handleEdit(task)}
                    variant="outline"
                    disabled={isMutating}
                    title="Editar tarea"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <PencilIcon className="size-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    onClick={() => handleDeleteClick(task.id)}
                    variant="destructive"
                    disabled={isMutating}
                    title="Eliminar tarea"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {onDelete && (
        <ConfirmDialog
          open={showConfirm}
          onOpenChange={setShowConfirm}
          title={confirmDialogText.title || "Eliminar tarea"}
          description={
            confirmDialogText.description ||
            "¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer."
          }
          confirmText={confirmDialogText.confirmText || "Eliminar"}
          cancelText={confirmDialogText.cancelText}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
