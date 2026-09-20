import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CADENCE_LABEL, NICHES, VOICES } from "@/lib/niches";
import { useDesk } from "@/lib/store";
import type { Cadence, FormatKind, VoiceId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ChannelView() {
  const channel = useDesk((s) => s.channel);
  const patchChannel = useDesk((s) => s.patchChannel);
  const videos = useDesk((s) => s.videos);

  if (!channel) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Identity</p>
        <h1 className="mt-2 font-display text-4xl italic">{channel.name}</h1>
        <p className="mt-2 text-muted">@{channel.handle}</p>
      </div>

      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="nm">Name</Label>
            <Input
              id="nm"
              className="mt-2"
              value={channel.name}
              onChange={(e) => patchChannel({ name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="hd">Handle</Label>
            <Input
              id="hd"
              className="mt-2"
              value={channel.handle}
              onChange={(e) =>
                patchChannel({
                  handle: e.target.value.replace(/[^a-z0-9._]/gi, "").toLowerCase(),
                })
              }
            />
          </div>
        </div>
      </section>

      <section>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Niche</p>
        <div className="mt-3 grid gap-2">
          {NICHES.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => patchChannel({ nicheId: n.id })}
              className={cn(
                "rounded-lg bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)]",
                channel.nicheId === n.id && "shadow-[var(--shadow-border-hover)]",
              )}
            >
              <span className="font-mono text-xs text-faint">{n.index}</span>
              <span className="ml-3">{n.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Format</p>
          <div className="mt-3 flex flex-col gap-2">
            {(["short", "long"] as FormatKind[]).map((f) => (
              <Button
                key={f}
                variant={channel.format === f ? "default" : "ghost"}
                onClick={() => patchChannel({ format: f })}
              >
                {f === "short" ? "Shorts" : "Long form"}
              </Button>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Cadence</p>
          <div className="mt-3 flex flex-col gap-2">
            {(Object.keys(CADENCE_LABEL) as Cadence[]).map((c) => (
              <Button
                key={c}
                variant={channel.cadence === c ? "default" : "ghost"}
                onClick={() => patchChannel({ cadence: c })}
              >
                {CADENCE_LABEL[c]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Voice</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {VOICES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => patchChannel({ voiceId: v.id as VoiceId })}
              className={cn(
                "rounded-md px-3 py-3 text-left",
                channel.voiceId === v.id ? "bg-raised text-fg" : "text-muted",
              )}
            >
              <p className="text-sm text-fg">{v.name}</p>
              <p className="mt-1 text-xs text-muted">{v.line}</p>
            </button>
          ))}
        </div>
      </section>

      <p className="text-sm text-muted">
        {videos.length} files on this desk. Switching niche mid-month is how channels stall.
      </p>
    </div>
  );
}
