import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dotClass } from "@/components/omad/home-view";
import { useOmad } from "@/components/omad/context";
import { cn } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import { dayOutcome, localDateKey, monthMatrix, monthTitle } from "@/lib/omad/logic";

const WEEK = [
  { th: "อา", en: "Su" },
  { th: "จ", en: "Mo" },
  { th: "อ", en: "Tu" },
  { th: "พ", en: "We" },
  { th: "พฤ", en: "Th" },
  { th: "ศ", en: "Fr" },
  { th: "ส", en: "Sa" },
];

export function CalendarView({ now }: { now: number }) {
  const { data, openDay } = useOmad();
  const lang = data.settings.lang;
  const today = localDateKey(new Date(now));
  const initial = new Date(now);
  const [cursor, setCursor] = useState({ year: initial.getFullYear(), month: initial.getMonth() });
  const cells = monthMatrix(cursor.year, cursor.month);

  return (
    <section className="card p-3 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <button type="button" className="grid size-11 place-items-center rounded-full press" aria-label={t(lang, "prevMonth")} onClick={() => shift(-1)}>
          <ChevronLeft className="size-5" />
        </button>
        <h2 className="text-base font-semibold">{monthTitle(cursor.year, cursor.month, lang)}</h2>
        <button type="button" className="grid size-11 place-items-center rounded-full press" aria-label={t(lang, "nextMonth")} onClick={() => shift(1)}>
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-muted">
        {WEEK.map((day) => (
          <div key={day.en} className="py-2">{day[lang]}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((key, index) => {
          if (!key) return <div key={`e-${index}`} />;
          const future = key > today;
          const outcome = dayOutcome(data.days[key], today);
          return (
            <button
              key={key}
              type="button"
              disabled={future}
              aria-label={t(lang, "openDay", { date: key })}
              onClick={() => openDay(key)}
              className={cn(
                "flex aspect-square flex-col items-center justify-center rounded-xl text-sm press",
                key === today ? "bg-surface-2 text-fast" : "",
                future ? "text-muted" : "text-fg",
              )}
            >
              <span>{Number(key.slice(-2))}</span>
              {!future ? <span className={cn("mt-1 size-1.5 rounded-full", dotClass(outcome))} aria-hidden="true" /> : <span className="mt-1 size-1.5" />}
            </button>
          );
        })}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
        {(["completed", "in_progress", "multiple", "rest", "other", "not_active"] as const).map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className={cn("size-2 rounded-full", dotClass(item))} />
            {t(lang, item === "in_progress" ? "inProgress" : item === "not_active" ? "notActive" : item)}
          </li>
        ))}
      </ul>
    </section>
  );

  function shift(delta: number) {
    setCursor((current) => {
      const date = new Date(current.year, current.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }
}
