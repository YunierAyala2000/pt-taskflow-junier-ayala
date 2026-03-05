"use client";

import { useState } from "react";
import type { TaskFilter } from "@/types/task-types";
import { cn } from "@/lib/utils";

interface TaskFilterTabsProps {
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  counts: {
    all: number;
    completed: number;
    pending: number;
  };
}

const filters: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "completed", label: "Completadas" },
  { value: "pending", label: "Pendientes" },
];

export function TaskFilterTabs({ filter, onChange, counts }: TaskFilterTabsProps) {
  const [activeIndex, setActiveIndex] = useState(() => filters.findIndex((f) => f.value === filter));

  const handleChange = (value: TaskFilter, index: number) => {
    setActiveIndex(index);
    onChange(value);
  };

  return (
    <div
      className="flex items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-sm animate-in fade-in duration-500"
      style={{ animationDelay: "200ms" }}
    >
      {filters.map((f, index) => {
        const isActive = filter === f.value;
        const count = counts[f.value];

        return (
          <button
            key={f.value}
            onClick={() => handleChange(f.value, index)}
            className={cn(
              "relative flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 z-10",
              isActive
                ? "text-gray-900 dark:text-gray-100 bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
            )}
            aria-pressed={isActive}
          >
            <span>{f.label}</span>
            <span
              className={cn(
                "tabular-nums text-xs",
                isActive ? "dark:text-gray-100" : "text-gray-400 dark:text-gray-500",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
