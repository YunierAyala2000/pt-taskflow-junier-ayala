"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const handleClick = () => {
    toast.success("Tarea creada correctamente");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant="default" onClick={handleClick}>
        Mostrar notificación
      </Button>
    </div>
  );
}
