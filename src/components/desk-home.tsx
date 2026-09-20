import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, ListPlus, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { generateIdeas, generatePackage } from "@/lib/ai";
import { getNiche } from "@/lib/niches";
import { useDesk } from "@/lib/store";
import type { VideoItem } from "@/lib/types";
import { STATUS_LABEL } from "@/lib/types";
import { cn, formatDuration } from "@/lib/utils";

export function DeskHome() {
  const navigate = useNavigate();
  const channel = useDesk((s) => s.channel)!;
  const videos = useDesk((s) => s.videos);
  const addIdeas = useDesk((s) => s.addIdeas);
  const setPackage = useDesk((s) => s.setPackage);
  const niche = getNiche(channel.nicheId);
  const [busy, setBusy] = useState<"ideas" | "pack" | null>(null);
  const [packingId, setPackingId] = useState<string | null>(null);

  const open = videos.filter((v) => v.status !== "posted");
  const posted = videos.filter((v) => v.status === "posted");
  const ready = videos.filter((v) => v.status === "ready" || v.status === "assembled");

  async function rundown(count = 5) {
    setBusy("ideas");
    try {
      const result = await generateIdeas({
        data: {
          nicheId: channel.nicheId,
          format: channel.format,
          avoid: videos.map((v) => v.idea.workingTitle),
          count,
        },
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      addIdeas(result.ideas);
      toast.success(`${result.ideas.length} slugs on the desk.`);
    } finally {
      setBusy(null);
    }
  }

  async function writePack(video: VideoItem) {
    setBusy("pack");
    setPackingId(video.id);
    try {
      const result = await generatePackage({
        data: {
          nicheId: video.nicheId,
          format: video.format,
          channelName: channel.name,
          idea: video.idea,
        },
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setPackage(video.id, result.pack);
      toast.success("Package is on the desk.");
      void navigate({ to: "/video/$id", params: { id: video.id } });
    } finally {
      setBusy(null);
      setPackingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            {niche.index} · {niche.name}
          </p>
          <h1 className="mt-2 font-display text-3xl italic sm:text-4xl">{channel.name}</h1>
          <p className="mt-3 max-w-xl text-muted">{niche.hookStyle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => rundown(5)} disabled={busy !== null}>
            {busy === "ideas" ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <ListPlus />
            )}
            Tonight's rundown
          </Button>
          <Button variant="secondary" onClick={() => rundown(7)} disabled={busy !== null}>
            Fill the week
          </Button>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        <Stat label="On desk" value={open.length} />
        <Stat label="Ready" value={ready.length} />
        <Stat label="Posted" value={posted.length} />
      </dl>

      {videos.length === 0 ? (
        <EmptyRundown onGenerate={() => rundown(5)} busy={busy === "ideas"} />
      ) : (
        <section className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <div className="hidden grid-cols-12 gap-3 border-b border-line px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-faint sm:grid">
            <span className="col-span-2">Slug</span>
            <span className="col-span-5">Hook</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-1">Dur</span>
            <span className="col-span-2 text-right">Action</span>
          </div>
          <ul>
            {videos.slice(0, 18).map((video) => (
              <li
                key={video.id}
                className="grid grid-cols-1 gap-3 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-12 sm:items-center"
              >
                <div className="sm:col-span-2">
                  <p className="font-mono text-xs text-muted">{video.slug}</p>
                  <p className="mt-1 text-sm">{video.idea.workingTitle}</p>
                </div>
                <p className="text-sm text-muted sm:col-span-5">{video.idea.hook}</p>
                <p className="text-sm sm:col-span-2">
                  <StatusChip status={video.status} />
                </p>
                <p className="font-mono text-sm tabular-nums text-muted sm:col-span-1">
                  {formatDuration(video.pack?.durationSec ?? (video.format === "short" ? 48 : 480))}
                </p>
                <div className="flex justify-start gap-2 sm:col-span-2 sm:justify-end">
                  {video.pack ? (
                    <Button size="sm" variant="secondary" asChild>
                      <Link to="/video/$id" params={{ id: video.id }}>
                        Open
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => writePack(video)}
                      disabled={busy !== null}
                    >
                      {packingId === video.id ? (
                        <LoaderCircle className="animate-spin" />
                      ) : null}
                      Write
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-surface px-4 py-4 shadow-[var(--shadow-border)]">
      <p className="text-[11px] uppercase tracking-[0.16em] text-faint">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums">{value}</p>
    </div>
  );
}

function StatusChip({ status }: { status: VideoItem["status"] }) {
  return (
    <span
      className={cn(
        "text-sm",
        status === "ready" || status === "assembled" ? "text-ok" : "text-muted",
        status === "posted" && "text-faint",
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function EmptyRundown({ onGenerate, busy }: { onGenerate: () => void; busy: boolean }) {
  return (
    <div className="rounded-xl bg-surface px-6 py-10 text-center shadow-[var(--shadow-border)]">
      <p className="font-display text-3xl italic">The desk is clear.</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">
        Generate tonight's rundown. Five original slugs in your niche, each with a
        cold-open hook. You pick one. The desk writes the rest.
      </p>
      <Button className="mt-8" onClick={onGenerate} disabled={busy}>
        {busy ? <LoaderCircle className="animate-spin" /> : <ListPlus />}
        Generate rundown
      </Button>
    </div>
  );
}
