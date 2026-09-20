import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Clapperboard, LayoutList, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { useDesk, useHydrateDesk } from "@/lib/store";
import { cn, formatClock, formatDay } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Desk", icon: Radio },
  { to: "/board", label: "Board", icon: LayoutList },
  { to: "/playbook", label: "Playbook", icon: BookOpen },
  { to: "/channel", label: "Channel", icon: Clapperboard },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  useHydrateDesk();
  const hydrated = useDesk((s) => s.hydrated);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-baseline gap-3">
            <span className="font-display text-2xl italic tracking-tight">NightDesk</span>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-faint sm:inline">
              Overnight YouTube
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted transition-colors duration-150",
                  pathname === item.to && "bg-raised text-fg",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted">
            <span className="hidden sm:inline">{formatDay(now)}</span>
            <span className="tabular-nums">{formatClock(now)}</span>
            <span className="flex items-center gap-1.5 text-ok">
              <span className="size-1.5 rounded-full bg-ok" />
              Open
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-8 md:pb-16">
        {!hydrated ? (
          <div className="space-y-4">
            <div className="h-10 w-48 rounded-md bg-raised" />
            <div className="h-40 rounded-xl bg-surface" />
            <div className="h-64 rounded-xl bg-surface" />
          </div>
        ) : (
          children
        )}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 md:hidden">
        <div className="grid grid-cols-4">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] uppercase tracking-wider",
                  active ? "text-fg" : "text-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
