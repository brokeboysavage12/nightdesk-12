import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { DeskHome } from "@/components/desk-home";
import { SetupDesk } from "@/components/setup-desk";
import { useDesk } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const channel = useDesk((s) => s.channel);
  const hydrated = useDesk((s) => s.hydrated);
  return (
    <AppShell>
      {hydrated ? channel ? <DeskHome /> : <SetupDesk /> : null}
    </AppShell>
  );
}
