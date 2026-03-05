"use client";

import { useTasks } from "@/hooks/use-task";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { TaskStats } from "@/components/task-stats";
import { PlusCircle } from "lucide-react";
import { AppPagination } from "@/components/shared/AppPagination";
import { useState } from "react";

export default function Home() {
  const { todos, allTodos, isLoading, mutating, retry } = useTasks();

  const stats = {
    all: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <Loader text="Cargando tareas..." />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        {mutating && (
          <div>
            <Loader text="Procesando..." />
          </div>
        )}

        <div className="w-full max-w-6xl mx-auto p-4">
          <div className="block lg:hidden mb-6">
            <TaskStats
              total={stats.all}
              completed={stats.completed}
              pending={stats.pending}
            />
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-2">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Mis Tareas
                  </h2>
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-1 order-1 lg:order-2">
              <TaskStats
                total={stats.all}
                completed={stats.completed}
                pending={stats.pending}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
