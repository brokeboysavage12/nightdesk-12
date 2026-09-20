import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { VideoStudio } from "@/components/video-studio";

export const Route = createFileRoute("/video/$id")({ component: VideoPage });

function VideoPage() {
  const { id } = Route.useParams();
  return (
    <AppShell>
      <VideoStudio id={id} />
    </AppShell>
  );
}
