// Blocos visuais da dashboard — server components puros (sem estado).

export function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-bold tracking-tight">{value}</p>
      {sub ? <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border bg-card p-4">
      <h2 className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function BarList({
  items,
  empty = "Sem dados ainda",
}: {
  items: { label: string; value: number; hint?: string }[];
  empty?: string;
}) {
  if (!items.length)
    return <p className="text-xs text-muted-foreground">{empty}</p>;
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((it, i) => (
        <li key={`${it.label}-${i}`} className="relative">
          <div
            className="absolute inset-y-0 left-0 rounded bg-primary/15"
            style={{ width: `${(it.value / max) * 100}%` }}
          />
          <div className="relative flex items-center justify-between px-2 py-1 text-sm">
            <span className="truncate font-mono text-xs">{it.label}</span>
            <span className="ml-3 shrink-0 font-mono text-xs text-muted-foreground">
              {it.hint ?? it.value}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Sparkline SVG simples de sessões/dia.
export function Sparkline({
  series,
}: {
  series: { day: string; sessions: number; pageviews: number }[];
}) {
  if (series.length < 2)
    return <p className="text-xs text-muted-foreground">Poucos dias de dados.</p>;
  const w = 640;
  const h = 120;
  const max = Math.max(...series.map((d) => d.pageviews), 1);
  const step = w / (series.length - 1);
  const line = (key: "sessions" | "pageviews") =>
    series
      .map((d, i) => `${i * step},${h - (d[key] / max) * h}`)
      .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <polyline points={line("pageviews")} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/40" />
      <polyline points={line("sessions")} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
    </svg>
  );
}
