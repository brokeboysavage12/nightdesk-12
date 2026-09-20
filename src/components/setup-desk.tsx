import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CADENCE_LABEL, NICHES, VOICES } from "@/lib/niches";
import { useDesk } from "@/lib/store";
import type { Cadence, FormatKind, VoiceId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SetupDesk() {
  const setupChannel = useDesk((s) => s.setupChannel);
  const [name, setName] = useState("Last Light Files");
  const [handle, setHandle] = useState("lastlightfiles");
  const [nicheId, setNicheId] = useState(NICHES[0].id);
  const [cadence, setCadence] = useState<Cadence>("daily");
  const [voiceId, setVoiceId] = useState<VoiceId>("atlas");
  const [format, setFormat] = useState<FormatKind>("short");

  const niche = NICHES.find((n) => n.id === nicheId) ?? NICHES[0];

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">Assignment desk</p>
      <h1 className="mt-3 font-display text-4xl italic sm:text-5xl">
        You never have to open an editor.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Pick a faceless niche. NightDesk writes the script, speaks it, paints the
        stills, and cuts a Short you can upload tonight. Same desk, every day,
        until the channel looks inevitable.
      </p>

      <div className="mt-10 space-y-8">
        <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <Label htmlFor="channel-name">Channel name</Label>
          <Input
            id="channel-name"
            className="mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mt-4">
            <Label htmlFor="handle">Handle</Label>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-muted">@</span>
              <Input
                id="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value.replace(/[^a-z0-9._]/gi, "").toLowerCase())}
              />
            </div>
          </div>
        </section>

        <section>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Niche — pick one and stay</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {NICHES.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setNicheId(n.id)}
                className={cn(
                  "rounded-lg bg-surface p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150",
                  nicheId === n.id && "shadow-[var(--shadow-border-hover)]",
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-xs text-faint">{n.index}</span>
                  {nicheId === n.id ? (
                    <span className="text-xs uppercase tracking-wider text-ok">Assigned</span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-display text-xl">{n.name}</h3>
                <p className="mt-2 text-sm text-muted">{n.blurb}</p>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">{niche.why}</p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Fieldset legend="Format">
            {(
              [
                ["short", "Shorts — fastest"],
                ["long", "Long — later"],
              ] as const
            ).map(([id, label]) => (
              <Choice key={id} active={format === id} onClick={() => setFormat(id)}>
                {label}
              </Choice>
            ))}
          </Fieldset>
          <Fieldset legend="Cadence">
            {(Object.keys(CADENCE_LABEL) as Cadence[]).map((id) => (
              <Choice key={id} active={cadence === id} onClick={() => setCadence(id)}>
                {CADENCE_LABEL[id]}
              </Choice>
            ))}
          </Fieldset>
          <Fieldset legend="Voice">
            {VOICES.map((v) => (
              <Choice key={v.id} active={voiceId === v.id} onClick={() => setVoiceId(v.id)}>
                {v.name}
              </Choice>
            ))}
          </Fieldset>
        </section>

        <div className="sticky bottom-16 z-20 -mx-4 bg-bg/95 px-4 py-3 md:static md:mx-0 md:bg-transparent md:px-0 md:py-0">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() =>
              setupChannel({
                name: name.trim() || "Night Desk",
                handle: handle.trim() || "nightdesk",
                nicheId,
                cadence,
                voiceId,
                format,
              })
            }
          >
            Open the desk
          </Button>
        </div>
      </div>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">{legend}</p>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-2 text-left text-sm text-muted transition-colors duration-150",
        active && "bg-raised text-fg",
      )}
    >
      {children}
    </button>
  );
}
