"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallButton() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(display-mode: standalone)").matches,
  );
  const [visible, setVisible] = useState(!isInstalled);

  useEffect(() => {
    if (isInstalled) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setVisible(false);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    }
    setInstallPrompt(null);
  };

  if (!visible || isInstalled) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "animate-in fade-in slide-in-from-bottom-4 duration-300",
      )}
    >
      <Button
        onClick={handleInstall}
        size="lg"
        className="rounded-full shadow-lg px-5 gap-2 bg-blue-600 hover:bg-blue-700 text-white animate-pulse"
        title="Instalar TaskFlow"
      >
        <Download className="size-4" />
        <span className="hidden sm:inline">Instalar app</span>
      </Button>
    </div>
  );
}
