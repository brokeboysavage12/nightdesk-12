import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { BoardView } from "@/components/board-view";

export const Route = createFileRoute("/board")({ component: BoardPage });

function BoardPage() {
  return (
    <AppShell>
      <BoardView />
    </AppShell>
  );
}
