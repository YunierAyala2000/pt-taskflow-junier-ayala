"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { TaskStats } from "@/components/task-stats";
import { TaskFilterTabs } from "@/components/taskFilterTabs";
import { Loader } from "@/components/shared/loader";
import { AppPagination } from "@/components/shared/AppPagination";
import { useTasks } from "@/hooks/use-task";
import { TaskItem } from "@/components/task-item";
import { AddTaskDrawer } from "@/components/modal-add-task";
import { PwaInstallButton } from "@/components/shared/PwaInstallButton";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { FloatButtonSendWhatsapp } from "@/components/shared/FloatButtomSendWhatsapp";

export default function Home() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    isLoading,
    mutating,
    retry,
    error,
    toggleTodo,
    removeTodo,
    addTodo,
    page,
    setPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setItemsPerPage,
  } = useTasks();

  const [showAddDrawer, setShowAddDrawer] = useState(false);

  const stats = {
    all: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  };

  const countsFiltered = {
    all: allTodos.length,
    completed: allTodos.filter((t) => t.completed).length,
    pending: allTodos.filter((t) => !t.completed).length,
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
      <div className="flex flex-col min-h-screen lg:items-center lg:justify-center bg-zinc-50 font-sans dark:bg-black">
        {mutating && (
          <div>
            <Loader text="Procesando..." />
          </div>
        )}

        <div className="flex flex-col flex-1 lg:flex-none w-full max-w-6xl mx-auto lg:p-4">
          <div className="block lg:hidden lg:mb-4 px-4">
            <TaskStats
              total={stats.all}
              completed={stats.completed}
              pending={stats.pending}
            />
          </div>

          <div className="flex flex-col flex-1 lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="flex flex-col flex-1 lg:col-span-2 order-2 lg:order-1">
              <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-200 lg:dark:border-gray-800 p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 md:mb-4 gap-2">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Mis Tareas
                  </h2>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                      variant="primary"
                      size="lg"
                      title="Agregar nueva Tarea"
                      onClick={() => setShowAddDrawer(true)}
                    >
                      <PlusCircle className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="mb-2 md:mb-2">
                  <TaskFilterTabs
                    filter={filter}
                    onChange={setFilter}
                    counts={countsFiltered}
                  />
                </div>

                <TaskItem
                  todos={todos}
                  isLoading={isLoading}
                  isMutating={mutating}
                  error={error}
                  onRetry={retry}
                  onToggle={(id, completed) => {
                    toggleTodo(id, completed);
                  }}
                  onDelete={removeTodo}
                  emptyMessage="No hay tareas en tu lista"
                  maxHeight="60vh"
                  showStatusBadge={true}
                />

                <div className="flex items-center justify-end mt-2 md:mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <AppPagination
                    page={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPageChange={setPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    itemsPerPageOptions={[10, 20, 30, 40, 50]}
                    showItemsPerPage={true}
                    showPageInfo={true}
                  />
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

        <AddTaskDrawer
          open={showAddDrawer}
          onOpenChange={() => setShowAddDrawer(false)}
          triggerText="Nueva Tarea"
          direction="bottom"
          addTodo={addTodo}
        />

        <PwaInstallButton />
        <FloatButtonSendWhatsapp />
      </div>
    </>
  );
}
