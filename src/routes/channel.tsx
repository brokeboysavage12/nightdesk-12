import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChannelView } from "@/components/channel-view";
import { SetupDesk } from "@/components/setup-desk";
import { useDesk } from "@/lib/store";

export const Route = createFileRoute("/channel")({ component: ChannelPage });

function ChannelPage() {
  const channel = useDesk((s) => s.channel);
  return <AppShell>{channel ? <ChannelView /> : <SetupDesk />}</AppShell>;
}
