"use client";

import * as React from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Task } from "@/types/task-types";

interface AddTaskDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerText?: string;
  triggerVariant?: "default" | "outline" | "ghost";
  className?: string;
  direction?: "bottom" | "right" | "top" | "left";
  addTodo: (title: string) => Promise<Task>;
}

// Componente de formulario reutilizable
function TaskForm({
  addTodo,
  onCancel,
  title: initialTitle = "",
}: {
  addTodo: (title: string) => Promise<Task>;
  onCancel?: () => void;
  title?: string;
}) {
  const [title, setTitle] = React.useState(initialTitle);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addTodo(title.trim());
      setTitle("");
      onCancel?.();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-6">
        {/* Campo Título */}
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tarea <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Comprar leche, Estudiar React, Hacer ejercicio..."
            className={cn("h-12 text-base transition-all")}
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Sugerencias rápidas:</p>
          <div className="flex flex-wrap gap-2">
            {["Estudiar React ⚛️", "Hacer ejercicio 💪", "Llamar al médico 📞"].map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTitle(suggestion)}
                className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="w-full sm:w-auto">
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creando...
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Crear tarea
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function AddTaskDrawer({
  open = false,
  onOpenChange,
  triggerText = "Agregar tarea",
  triggerVariant = "default",
  className,
  direction = "bottom",
  addTodo,
}: AddTaskDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const contentClasses = cn(
    "mx-auto w-full max-w-2xl",
    direction === "bottom" && "rounded-t-2xl",
    direction === "right" && "h-full rounded-l-2xl",
    direction === "top" && "rounded-b-2xl",
    direction === "left" && "h-full rounded-r-2xl",
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <div className="relative h-24 bg-gradient-to-r from-blue-600 to-purple-700">
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl rotate-6 shadow-xl animate-float" />
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl -rotate-3 opacity-50 blur-xl" />
                <PlusCircle className="absolute inset-0 w-16 h-16 text-white p-4 transform -rotate-6" />
              </div>
            </div>
          </div>

          <DialogHeader className="pt-10 px-6 pb-4">
            <DialogTitle className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              Nueva tarea
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 dark:text-gray-400">
              Completa los detalles para crear una nueva tarea en tu lista.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6">
            <TaskForm addTodo={addTodo} onCancel={() => onOpenChange?.(false)} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={direction}>
      <DrawerContent className={contentClasses}>
        <DrawerHeader className="border-b border-gray-200 dark:border-gray-800">
          <div className="relative  h-18 w-full bg-gradient-to-r from-blue-600 to-purple-700">
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl rotate-6 shadow-xl animate-float" />
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl -rotate-3 opacity-50 blur-xl" />
                <PlusCircle className="absolute inset-0 w-16 h-16 text-white p-4 transform -rotate-6" />
              </div>
            </div>
          </div>
          <DrawerTitle className="text-2xl font-semibold text-center mt-4 text-gray-900 dark:text-gray-100">
            Nueva tarea
          </DrawerTitle>
          <DrawerDescription className="text-center text-gray-500 dark:text-gray-400">
            Completa los detalles para crear una nueva tarea en tu lista.
          </DrawerDescription>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="p-4">
          <TaskForm addTodo={addTodo} onCancel={() => onOpenChange?.(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
