import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/dashboard-auth";
import { logout } from "./actions";
import {
  getOverview,
  getDailySeries,
  getFunnel,
  getContactBreakdown,
  getTopProjects,
  getDimension,
  getReferrers,
  getBlogReads,
  getAiAgents,
  getRecent,
} from "@/lib/dashboard-queries";
import { Stat, Panel, BarList, Sparkline } from "./ui";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard — Analytics", robots: { index: false } };

const RANGES = [7, 30, 90] as const;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  if (!(await isAuthed())) redirect("/dashboard/login");

  const { days: daysParam } = await searchParams;
  const days = RANGES.includes(Number(daysParam) as never)
    ? Number(daysParam)
    : 30;

  const [
    overview,
    series,
    funnel,
    contact,
    projects,
    countries,
    locales,
    devices,
    referrers,
    blog,
    ai,
    recent,
  ] = await Promise.all([
    getOverview(days),
    getDailySeries(days),
    getFunnel(days),
    getContactBreakdown(days),
    getTopProjects(days),
    getDimension(days, "country"),
    getDimension(days, "locale"),
    getDimension(days, "device"),
    getReferrers(days),
    getBlogReads(days),
    getAiAgents(days),
    getRecent(50),
  ]);

  const convRate = funnel.total
    ? ((funnel.converted / funnel.total) * 100).toFixed(1)
    : "0";

  const funnelSteps = [
    { label: "Sessões", value: funnel.total },
    { label: "Viu Work", value: funnel.work },
    { label: "Viu Contact", value: funnel.contact },
    { label: "Contact intent", value: funnel.converted },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Analytics</h1>
          <p className="font-mono text-xs text-muted-foreground">
            johnenrique.tech · últimos {days} dias
          </p>
        </div>
        <div className="flex items-center gap-2">
          <nav className="flex gap-1 rounded-md border p-0.5">
            {RANGES.map((r) => (
              <a
                key={r}
                href={`/dashboard?days=${r}`}
                className={`rounded px-2.5 py-1 font-mono text-xs ${
                  r === days
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}d
              </a>
            ))}
          </nav>
          <form action={logout}>
            <button className="rounded-md border px-2.5 py-1 font-mono text-xs text-muted-foreground hover:text-foreground">
              Sair
            </button>
          </form>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Sessões" value={overview.sessions} />
        <Stat label="Pageviews" value={overview.pageviews} />
        <Stat
          label="Contato"
          value={overview.contactIntents}
          sub={`${convRate}% das sessões`}
        />
        <Stat label="Mobile" value={`${overview.mobilePct}%`} />
        <Stat label="Leitura média" value={`${overview.avgReadSeconds}s`} />
      </div>

      <div className="mt-3">
        <Panel title="Sessões · pageviews por dia">
          <Sparkline series={series} />
        </Panel>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Panel title="Funil de conversão">
          <BarList
            items={funnelSteps.map((s) => ({
              label: s.label,
              value: s.value,
              hint: `${s.value}${
                funnel.total
                  ? ` · ${Math.round((s.value / funnel.total) * 100)}%`
                  : ""
              }`,
            }))}
          />
        </Panel>
        <Panel title="Intenção de contato (por CTA)">
          <BarList
            items={contact.map((c) => ({
              label: `${c.location} · ${c.method}`,
              value: c.n,
            }))}
          />
        </Panel>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Panel title="Projetos mais clicados">
          <BarList
            items={projects.map((p) => ({
              label: p.project,
              value: p.clicks + p.stories + p.proofs,
              hint: `${p.clicks}↗ ${p.stories}★ ${p.proofs}✓`,
            }))}
          />
        </Panel>
        <Panel title="Leitura do blog">
          <BarList
            items={blog.map((b) => ({
              label: b.slug,
              value: b.started,
              hint: `${b.finished}/${b.started} 100%`,
            }))}
          />
        </Panel>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-4">
        <Panel title="Países">
          <BarList items={countries.map((c) => ({ label: c.k, value: c.n }))} />
        </Panel>
        <Panel title="Idioma">
          <BarList items={locales.map((l) => ({ label: l.k, value: l.n }))} />
        </Panel>
        <Panel title="Dispositivo">
          <BarList items={devices.map((d) => ({ label: d.k, value: d.n }))} />
        </Panel>
        <Panel title="Referrers">
          <BarList items={referrers.map((r) => ({ label: r.host, value: r.n }))} />
        </Panel>
      </div>

      <div className="mt-3">
        <Panel title="Agentes de IA (WebMCP · llms.txt · posts-index)">
          <BarList
            items={ai.map((a) => ({
              label: a.tool ? `${a.name} · ${a.tool}` : a.name,
              value: a.n,
            }))}
            empty="Nenhum agente de IA acessou ainda"
          />
        </Panel>
      </div>

      <div className="mt-3">
        <Panel title="Eventos recentes">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="py-1 pr-3">quando</th>
                  <th className="py-1 pr-3">evento</th>
                  <th className="py-1 pr-3">path</th>
                  <th className="py-1 pr-3">geo</th>
                  <th className="py-1">props</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e, i) => (
                  <tr key={i} className="border-t border-border/50">
                    <td className="py-1 pr-3 whitespace-nowrap text-muted-foreground">
                      {e.ts.slice(5, 16).replace("T", " ")}
                    </td>
                    <td className="py-1 pr-3 whitespace-nowrap">
                      {e.name}
                      {e.isBot ? (
                        <span className="ml-1 text-muted-foreground/60">bot</span>
                      ) : null}
                    </td>
                    <td className="py-1 pr-3 max-w-[160px] truncate">{e.path}</td>
                    <td className="py-1 pr-3 whitespace-nowrap text-muted-foreground">
                      {[e.country, e.device].filter(Boolean).join(" ")}
                    </td>
                    <td className="py-1 max-w-[220px] truncate text-muted-foreground">
                      {Object.keys(e.props).length ? JSON.stringify(e.props) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </main>
  );
}
