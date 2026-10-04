import { useState } from "react";
import { dotClass } from "@/components/omad/home-view";
import { useOmad } from "@/components/omad/context";
import { t } from "@/lib/omad/i18n";
import { addDays, dayOutcome, derive, endOfDay, formatPrettyDate, formatWords, localDateKey } from "@/lib/omad/logic";
import type { Outcome } from "@/lib/omad/types";

function labelKey(outcome: Outcome) {
  if (outcome === "in_progress") return "inProgress" as const;
  if (outcome === "not_active") return "notActive" as const;
  return outcome;
}

export function HistoryView({ now }: { now: number }) {
  const { data, openDay } = useOmad();
  const lang = data.settings.lang;
  const today = localDateKey(new Date(now));
  const [span, setSpan] = useState(14);
  const keys = Array.from({ length: span }, (_, index) => addDays(today, -index));

  return (
    <section className="card p-4">
      <h2 className="text-base font-semibold">{t(lang, "history")}</h2>
      <ul className="mt-2 divide-y divide-line">
        {keys.map((key) => {
          const record = data.days[key];
          const outcome = dayOutcome(record, today);
          const asOf = key === today ? now : Math.min(now, endOfDay(key));
          const measured = record ? derive({ ...record, active: true, rest: false }, asOf, today) : null;
          const open = record?.meals.some((meal) => !meal.end);
          return (
            <li key={key}>
              <button type="button" className="flex w-full items-center gap-3 py-3 text-left press" onClick={() => openDay(key)}>
                <span className={`size-2.5 shrink-0 rounded-full ${dotClass(outcome)}`} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{formatPrettyDate(key, lang, true)}</span>
                  <span className="block text-xs text-muted">
                    {t(lang, labelKey(outcome))}
                    {measured && (measured.fastingMs > 0 || measured.eatingMs > 0)
                      ? ` · ${t(lang, "fastingShort")} ${formatWords(measured.fastingMs, lang)} · ${t(lang, "eatingShort")} ${formatWords(measured.eatingMs, lang)}`
                      : ""}
                    {open ? ` · ${t(lang, "unclosed")}` : ""}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className="mt-3 min-h-11 w-full rounded-2xl bg-surface-2 text-sm font-medium press" onClick={() => setSpan((value) => value + 30)}>
        {t(lang, "loadMore")}
      </button>
    </section>
  );
}
