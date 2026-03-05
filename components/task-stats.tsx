"use client";

import {
  CheckCircle2,
  Circle,
  TrendingUp,
  Calendar,
  Award,
  BarChart3,
  Divide,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
}

export function TaskStats({ total, completed, pending }: TaskStatsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  if (isMobile) {
    return (
      <>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              className={cn(
                "fixed bottom-30 right-2 z-50",
                "h-auto py-3 px-4",
                "bg-gradient-to-r from-blue-600 to-purple-600",
                "hover:from-blue-700 hover:to-purple-700",
                "text-white shadow-xl hover:shadow-2xl",
                "rounded-2xl border-0",
                "transition-all duration-300",
                "animate-in slide-in-from-bottom-5",
                "hover:scale-105 active:scale-95",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <BarChart3 className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-2 py-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{completed}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-2 py-1">
                    <Circle className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{pending}</span>
                  </div>
                </div>

                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      className="text-white/30"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 14}
                      strokeDashoffset={
                        2 * Math.PI * 14 * (1 - completionPercentage / 100)
                      }
                      className="text-white transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
            </Button>
          </DrawerTrigger>

          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader className="border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <DrawerTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Estadísticas de tareas
                  </DrawerTitle>
                  <DrawerDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Resumen de tu progreso general
                  </DrawerDescription>
                </div>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <span className="sr-only">Cerrar</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="p-5 space-y-5 overflow-y-auto">
              <div className="flex items-center gap-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-blue-200 dark:text-blue-800"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 36}
                      strokeDashoffset={
                        2 * Math.PI * 36 * (1 - completionPercentage / 100)
                      }
                      className="text-blue-600 dark:text-blue-400 transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {completionPercentage}%
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      completado
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Progreso General
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Has completado {completed} de {total} tareas
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0"
                    >
                      {Math.round((completed / (total || 1)) * 100)}%
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{completed}</div>
                  <div className="text-xs opacity-90">Tareas completadas</div>
                  <div className="mt-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${(completed / (total || 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Circle className="w-5 h-5" />
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0"
                    >
                      {Math.round((pending / (total || 1)) * 100)}%
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{pending}</div>
                  <div className="text-xs opacity-90">Tareas pendientes</div>
                  <div className="mt-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${(pending / (total || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Detalles del progreso
                </h4>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Rendimiento general
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                    >
                      {completionPercentage}% completo
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Meta diaria
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {completed} / {Math.max(5, Math.ceil(total / 7))} tareas
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tasa de éxito
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {pending === 0 && total > 0 ? (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8" />
                    <div>
                      <h4 className="font-semibold">¡Felicidades! 🎉</h4>
                      <p className="text-sm opacity-90">
                        Has completado todas tus tareas. ¡Excelente trabajo!
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                completed > 0 && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8" />
                      <div>
                        <h4 className="font-semibold">¡Sigue así! 💪</h4>
                        <p className="text-sm opacity-90">
                          Has completado {completed}{" "}
                          {completed === 1 ? "tarea" : "tareas"}. Te quedan{" "}
                          {pending} por hacer.
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 md:p-5">
      <div className="max-h-[85vh] ">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Estadísticas de tareas
              </h2>
              <h4 className="text-sm text-gray-500 dark:text-gray-400">
                Resumen de tu progreso general
              </h4>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          <div className="flex items-center gap-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-blue-200 dark:text-blue-800"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 36}
                  strokeDashoffset={
                    2 * Math.PI * 36 * (1 - completionPercentage / 100)
                  }
                  className="text-blue-600 dark:text-blue-400 transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {completionPercentage}%
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  completado
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Progreso General
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Has completado {completed} de {total} tareas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-0"
                >
                  {Math.round((completed / (total || 1)) * 100)}%
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{completed}</div>
              <div className="text-xs opacity-90">Tareas completadas</div>
              <div className="mt-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${(completed / (total || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Circle className="w-5 h-5" />
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-0"
                >
                  {Math.round((pending / (total || 1)) * 100)}%
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{pending}</div>
              <div className="text-xs opacity-90">Tareas pendientes</div>
              <div className="mt-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${(pending / (total || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 space-y-1">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Detalles del progreso
            </h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Rendimiento general
                </span>
                <Badge
                  variant="outline"
                  className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                >
                  {completionPercentage}% completo
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Meta diaria
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {completed} / {Math.max(5, Math.ceil(total / 7))} tareas
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Tasa de éxito
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {completionPercentage}%
                </span>
              </div>
            </div>
          </div>

          {pending === 0 && total > 0 ? (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <h4 className="font-semibold">¡Felicidades! 🎉</h4>
                  <p className="text-sm opacity-90">
                    Has completado todas tus tareas. ¡Excelente trabajo!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            completed > 0 &&
            pending > 0 && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 text-white">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <h4 className="font-semibold">¡Sigue así! 💪</h4>
                    <p className="text-sm opacity-90">
                      Has completado {completed}{" "}
                      {completed === 1 ? "tarea" : "tareas"}. Te quedan{" "}
                      {pending} por hacer.
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
