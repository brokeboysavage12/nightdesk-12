import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      toastOptions={{
        classNames: {
          toast:
            "bg-surface text-fg shadow-[0_0_0_1px_rgba(236,234,228,0.08)] border-0",
          description: "text-muted",
          actionButton: "bg-accent text-accent-fg",
        },
      }}
    />
  );
}
