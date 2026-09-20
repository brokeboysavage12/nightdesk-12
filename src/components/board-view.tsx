import { Link } from "@tanstack/react-router";
import { STATUS_LABEL, STATUS_ORDER } from "@/lib/types";
import { useDesk } from "@/lib/store";
import { selectedTitle } from "@/lib/export";

export function BoardView() {
  const videos = useDesk((s) => s.videos);
  const columns = STATUS_ORDER.filter((s) => s !== "voiced" && s !== "visuals");

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-muted">Production board</p>
      <h1 className="mt-2 font-display text-4xl italic">The rundown</h1>
      <p className="mt-3 max-w-xl text-muted">
        Slugged, written, cut, posted. Keep the rightmost column moving.
      </p>
      <div className="mt-8 flex gap-3 overflow-x-auto pb-4">
        {columns.map((status) => {
          const items = videos.filter((v) => {
            if (status === "scripted") {
              return v.status === "scripted" || v.status === "voiced" || v.status === "visuals";
            }
            return v.status === status;
          });
          return (
            <section
              key={status}
              className="w-64 shrink-0 rounded-xl bg-surface p-3 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-baseline justify-between px-1">
                <h2 className="text-xs uppercase tracking-[0.16em] text-muted">
                  {STATUS_LABEL[status]}
                </h2>
                <span className="font-mono text-xs tabular-nums text-faint">{items.length}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {items.map((video) => (
                  <li key={video.id}>
                    <Link
                      to="/video/$id"
                      params={{ id: video.id }}
                      className="block rounded-md bg-raised px-3 py-3 shadow-[var(--shadow-border)]"
                    >
                      <p className="font-mono text-[11px] text-faint">{video.slug}</p>
                      <p className="mt-1 text-sm leading-snug">{selectedTitle(video)}</p>
                    </Link>
                  </li>
                ))}
                {items.length === 0 ? (
                  <li className="px-1 py-6 text-xs text-faint">Empty</li>
                ) : null}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
