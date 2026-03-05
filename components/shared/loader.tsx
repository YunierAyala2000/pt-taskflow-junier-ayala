"use client";

import { cn } from "@/lib/utils";

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "dots" | "pulse";
  overlayOpacity?: "light" | "medium" | "dark";
}

export function Loader({
  text = "Cargando...",
  fullScreen = true,
  className,
  size = "md",
  variant = "default",
  overlayOpacity = "dark",
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const overlayClasses = {
    light: "bg-black/20 dark:bg-black/40 backdrop-blur-sm",
    medium: "bg-black/50 dark:bg-black/60 backdrop-blur-md",
    dark: "bg-black/80 dark:bg-black/85 backdrop-blur-lg",
  };

  const variants = {
    default: (
      <div
        className={cn(
          "relative flex items-center justify-center",
          sizeClasses[size],
        )}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl animate-pulse"></div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"></div>

        <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="flex gap-1 items-center">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-1.5 rounded-full animate-bounce",
                  i === 0 && "h-8 bg-cyan-500",
                  i === 1 && "h-10 bg-blue-500 animation-delay-100",
                  i === 2 && "h-12 bg-indigo-500 animation-delay-200",
                  i === 3 && "h-8 bg-purple-500 animation-delay-300",
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>

        <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping animation-delay-150" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping animation-delay-300" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping animation-delay-450" />
      </div>
    ),

    minimal: (
      <div className="flex flex-col items-center gap-3">
        <div className={cn("relative", sizeClasses[size])}>
          <div className="absolute inset-0 rounded-full border-4 border-gray-200/30 dark:border-gray-700/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
    ),

    dots: (
      <div className="flex gap-3 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-gradient-to-br from-blue-400 to-blue-600 animate-bounce shadow-lg",
              size === "sm" && "w-2 h-2",
              size === "md" && "w-3 h-3",
              size === "lg" && "w-4 h-4",
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    ),

    pulse: (
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse shadow-xl",
            size === "sm" && "w-8 h-8",
            size === "md" && "w-12 h-12",
            size === "lg" && "w-16 h-16",
          )}
        />
      </div>
    ),
  };

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      {variants[variant]}
      {text && variant !== "dots" && (
        <p
          className={cn(
            "text-white font-medium animate-pulse drop-shadow-lg",
            textSizes[size],
          )}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300",
          overlayClasses[overlayOpacity],
        )}
      >
        {content}
      </div>
    );
  }

  return content;
}

export function LoadingOverlay({
  isLoading,
  children,
  text = "Cargando...",
  variant = "default",
  overlayOpacity = "dark",
}: {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
  variant?: LoaderProps["variant"];
  overlayOpacity?: LoaderProps["overlayOpacity"];
}) {
  if (!isLoading) return <>{children}</>;

  const overlayClasses = {
    light: "bg-black/20 dark:bg-black/40",
    medium: "bg-black/50 dark:bg-black/60",
    dark: "bg-black/80 dark:bg-black/85",
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute inset-0 z-40 flex items-center justify-center backdrop-blur-sm rounded-lg",
          overlayClasses[overlayOpacity],
        )}
      >
        <Loader
          fullScreen={false}
          text={text}
          variant={variant}
          size="md"
          overlayOpacity={overlayOpacity}
        />
      </div>
      <div className="opacity-30 pointer-events-none blur-[1px] select-none">
        {children}
      </div>
    </div>
  );
}
