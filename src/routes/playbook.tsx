import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PlaybookView } from "@/components/playbook-view";

export const Route = createFileRoute("/playbook")({ component: PlaybookPage });

function PlaybookPage() {
  return (
    <AppShell>
      <PlaybookView />
    </AppShell>
  );
}
