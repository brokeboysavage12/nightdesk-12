import { PLAYBOOK } from "@/lib/playbook";

export function PlaybookView() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">Operating order</p>
      <h1 className="mt-2 font-display text-4xl italic sm:text-5xl">
        How a person who has never edited posts every day.
      </h1>
      <p className="mt-4 text-muted">
        NightDesk is the factory. YouTube Studio is the loading dock. Stay in one
        niche for thirty days before you change anything.
      </p>
      <div className="mt-12 space-y-16">
        {PLAYBOOK.map((chapter) => (
          <section key={chapter.id}>
            <h2 className="font-display text-3xl italic">{chapter.heading}</h2>
            <p className="mt-2 text-muted">{chapter.lede}</p>
            <ol className="mt-6 space-y-6">
              {chapter.steps.map((step) => (
                <li
                  key={step.kicker}
                  className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
                >
                  <p className="font-mono text-xs text-faint">{step.kicker}</p>
                  <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                  <div className="mt-3 space-y-2 text-sm text-muted">
                    {step.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
