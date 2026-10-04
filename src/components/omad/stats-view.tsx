import { useState } from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useOmad } from "@/components/omad/context";
import { Ring, Segmented } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import { computeStats, formatHourNumber, formatPrettyDate } from "@/lib/omad/logic";
import type { RangeId } from "@/lib/omad/types";

export function StatsView({ now }: { now: number }) {
  const { data } = useOmad();
  const lang = data.settings.lang;
  const [range, setRange] = useState<RangeId>("7");
  const stats = computeStats(data.days, range, now);
  const bars = stats.bars.map((bar) => ({
    ...bar,
    label: range === "7" ? formatPrettyDate(bar.date, lang).split(" ")[0] : bar.date.slice(8),
  }));
  const weights = Object.values(data.days)
    .filter((day) => typeof day.weightKg === "number")
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((day) => ({ date: day.date, label: day.date.slice(5), kg: day.weightKg }));
  const tracked = stats.completed + stats.inProgress + stats.multiple + stats.other;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="card p-4">
        <Segmented
          label={t(lang, "rangeLabel")}
          cols="grid-cols-4"
          value={range}
          onChange={setRange}
          options={[
            { value: "7", label: t(lang, "range7") },
            { value: "30", label: t(lang, "range30") },
            { value: "90", label: t(lang, "range90") },
            { value: "all", label: t(lang, "rangeAll") },
          ]}
        />
        <div className="mt-4 flex items-center gap-4">
          <Ring progress={stats.consistency ?? 0} tone="done" className="size-28 shrink-0" label={t(lang, "consistency")}>
            <span className="tabular block text-xs font-semibold leading-none whitespace-nowrap">{stats.consistency === null ? t(lang, "dash") : `${Math.round(stats.consistency * 100)}%`}</span>
          </Ring>
          <div>
            <h2 className="text-base font-semibold">{t(lang, "consistency")}</h2>
            <p className="mt-1 text-sm text-fg">{t(lang, "completed")} {stats.completed}</p>
            <p className="text-sm text-muted">{t(lang, "notActive")} {stats.notActive}</p>
            <p className="mt-2 text-xs leading-snug text-muted">{t(lang, "consistencyHint")}</p>
          </div>
        </div>
      </section>

      <section className="card grid grid-cols-2 gap-3 p-4">
        <Tile label={t(lang, "avgFast")} value={stats.avgFastHours === null ? t(lang, "dash") : formatHourNumber(stats.avgFastHours, lang)} />
        <Tile label={t(lang, "longestFast")} value={stats.longestFastHours ? formatHourNumber(stats.longestFastHours, lang) : t(lang, "dash")} />
        <Tile label={t(lang, "avgEat")} value={stats.avgEatHours === null ? t(lang, "dash") : formatHourNumber(stats.avgEatHours, lang)} />
        <Tile label={t(lang, "completedCount")} value={String(stats.completed)} />
        <Tile label={t(lang, "activeDays")} value={String(tracked)} />
        <Tile label={t(lang, "notActiveDays")} value={String(stats.notActive)} />
      </section>

      <section className="card p-4 lg:col-span-2">
        <h2 className="text-sm font-semibold">{t(lang, "chartFast")}</h2>
        <p className="mt-1 text-xs text-muted">{t(lang, "chartHint")}</p>
        {bars.every((bar) => bar.hours === 0) ? (
          <p className="py-10 text-center text-sm text-muted">{tracked === 0 ? t(lang, "emptyStats") : t(lang, "chartEmpty")}</p>
        ) : (
          <div className="mt-3 h-48 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
                <XAxis dataKey="label" tick={{ fill: "var(--muted)", fontSize: 11 }} interval={bars.length > 10 ? Math.ceil(bars.length / 6) : 0} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "color-mix(in srgb, var(--fg) 6%, transparent)" }}
                  contentStyle={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--fg)" }}
                  formatter={(value) => [formatHourNumber(Number(value), lang), t(lang, "fastingShort")]}
                  labelFormatter={(_label, payload) => {
                    const date = payload?.[0]?.payload?.date as string | undefined;
                    return date ? formatPrettyDate(date, lang, true) : "";
                  }}
                />
                <Bar dataKey="hours" fill="var(--fast-fill)" radius={[4, 4, 0, 0]} maxBarSize={28} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {data.settings.weightEnabled ? (
        <section className="card p-4 lg:col-span-2">
          <h2 className="text-sm font-semibold">{t(lang, "weightChart")}</h2>
          {weights.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">{t(lang, "weightEmpty")}</p>
          ) : (
            <div className="mt-3 h-44 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weights} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <XAxis dataKey="label" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--fg)" }} />
                  <Line type="monotone" dataKey="kg" stroke="var(--done)" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 px-3 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="tabular mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
