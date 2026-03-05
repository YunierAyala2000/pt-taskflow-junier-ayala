import { cn } from "@/lib/utils";

interface TaskEmptyProps {
  emptyMessage?: string;
  className?: string;
}

export function TaskEmpty({
  emptyMessage = "No hay tareas disponibles",
  className,
}: TaskEmptyProps) {
  return (
    <div
      className={cn(
        "w-full py-12 flex flex-col items-center justify-center text-center",
        className,
      )}
    >
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
        <svg
          className="w-8 h-8 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-2">{emptyMessage}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        ¡Agrega una nueva tarea para comenzar!
      </p>
    </div>
  );
}
