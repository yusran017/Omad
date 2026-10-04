import { useState } from "react";
import { Frown, Meh, Moon, Smile, Zap } from "lucide-react";
import { useOmad } from "@/components/omad/context";
import { StageIcon, cn } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import { fastBand, fastBandLabel, formatTime, formatWords, present, scoreDay } from "@/lib/omad/logic";
import type { DayRecord, Mood } from "@/lib/omad/types";

const MOODS: { id: Mood; icon: typeof Smile; key: "moodGood" | "moodNormal" | "moodTired" | "moodDifficult" | "moodStrong" }[] = [
  { id: "good", icon: Smile, key: "moodGood" },
  { id: "normal", icon: Meh, key: "moodNormal" },
  { id: "tired", icon: Moon, key: "moodTired" },
  { id: "difficult", icon: Frown, key: "moodDifficult" },
  { id: "strong", icon: Zap, key: "moodStrong" },
];

export function LogView({ now }: { now: number }) {
  const { data, setMealText, setMealDraft, saveFastLog } = useOmad();
  const lang = data.settings.lang;
  const view = present(data.days, now);
  const today = view.today;
  const meal = view.derived?.openMeal ?? today?.meals.at(-1) ?? null;
  const fastingStart = today?.fastingStart ?? null;
  const fastMs = linkedMs(today, now);
  const band = fastBand(fastMs);
  const [mood, setMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState("");
  const [weight, setWeight] = useState("");
  const logs = [...(today?.logs ?? [])].reverse();
  const notesLog = logs.filter((log) => log.notes || log.mood);
  const weights = weightRows(data.days);
  const score = today ? scoreDay(today, now, view.todayKey) : null;
  const kg = weight.trim() ? Number(weight) : null;
  const weightOk = kg === null || (Number.isFinite(kg) && kg >= 20 && kg <= 400);
  const canSave = Boolean(fastingStart) && weightOk && (notes.trim().length > 0 || mood !== null || kg !== null);

  return (
    <div className="grid gap-3">
      <section className="card p-3">
        <h2 className="text-sm font-semibold">{t(lang, "journal")}</h2>
        {fastingStart ? (
          <p className="mt-1 text-sm font-semibold" style={{ color: band.color }}>
            <span className="inline-flex items-center gap-1" style={{ color: band.color }}>
              <StageIcon id={band.id} className="size-4" />
              {t(lang, "fastBegan", { time: formatTime(fastingStart, lang) })} · {t(lang, "fastedFor", { time: formatWords(fastMs, lang) })}
            </span>
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted">{t(lang, "noFastYet")}</p>
        )}
        <p className="mt-1 text-xs leading-snug text-muted">{t(lang, "logHint")}</p>
        {score?.mealStart ? (
          <p className={cn("mt-2 text-sm font-semibold", score.omadWin || score.mealOk ? "text-done" : score.overTarget ? "text-eat" : "text-fg")}>
            {t(lang, "startedEat", { time: formatTime(score.mealStart, lang) })}
            {score.eatMinutes != null ? ` · ${t(lang, "ateFor", { time: formatWords(score.eatMinutes * 60_000, lang) })}` : ""}
            {" · "}
            {score.omadWin ? t(lang, "omadWin") : score.overTarget ? t(lang, "overTarget") : score.mealOk ? t(lang, "mealOk") : score.open ? t(lang, "eating") : t(lang, "dash")}
          </p>
        ) : fastingStart ? (
          <p className="mt-2 text-sm text-muted">{t(lang, "mealWait")}</p>
        ) : null}
        <p className="mt-3 text-sm text-muted">{t(lang, "moodQ")}</p>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {MOODS.map((item) => {
            const Icon = item.icon;
            const on = mood === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => setMood(on ? null : item.id)}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border px-1 text-xs press",
                  on ? "border-fast-fill bg-fast-fill text-on-accent" : "border-line bg-surface-2 text-fg",
                )}
              >
                <Icon className="size-4" />
                {t(lang, item.key)}
              </button>
            );
          })}
        </div>
        <label className="mt-3 block text-sm text-muted">
          {t(lang, "notes")}
          <textarea className="area mt-1" value={notes} placeholder={t(lang, "notesPh")} onChange={(event) => setNotes(event.target.value)} />
        </label>
        <label className="mt-3 block text-sm text-muted">
          {t(lang, "weight")}
          <input
            className="field mt-1"
            inputMode="decimal"
            type="number"
            min={20}
            max={400}
            step={0.1}
            value={weight}
            placeholder={today?.weightKg ? String(today.weightKg) : t(lang, "kg")}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>
        <label className="mt-3 block text-sm text-muted">
          {t(lang, "mealFood")}
          <input
            className="field mt-1"
            value={meal && view.focusDate ? meal.description : today?.mealDraft ?? ""}
            placeholder={t(lang, "mealPh")}
            onChange={(event) => {
              if (meal && view.focusDate) setMealText(view.focusDate, meal.id, event.target.value);
              else setMealDraft(event.target.value);
            }}
          />
        </label>
        <button
          type="button"
          disabled={!canSave}
          className="btn-fast mt-3 min-h-12 w-full rounded-2xl text-sm font-semibold text-on-accent press disabled:opacity-40"
          onClick={() => {
            if (!canSave) return;
            saveFastLog({
              notes: notes.trim(),
              mood,
              weightKg: kg === null ? null : Math.round(kg * 10) / 10,
            });
            setNotes("");
            setMood(null);
            setWeight("");
          }}
        >
          {t(lang, "saveLog")}
        </button>
      </section>

      <section className="card p-3">
        <h2 className="text-sm font-semibold">{t(lang, "weightHistory")}</h2>
        {weights.length === 0 ? <p className="mt-2 text-sm text-muted">{t(lang, "weightHistEmpty")}</p> : null}
        <ul className="mt-2 grid gap-2">
          {weights.map((row) => {
            const stage = fastBand(row.fastingMs);
            return (
              <li key={row.id} className="rounded-2xl bg-surface-2 px-3 py-2">
                <p className="tabular text-lg font-semibold">{row.kg} {t(lang, "kg")}</p>
                <p className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: stage.color }}>
                  <StageIcon id={stage.id} className="size-4" />
                  {row.fastingStart ? t(lang, "fastBegan", { time: formatTime(row.fastingStart, lang) }) : fastBandLabel(row.fastingMs, lang)}
                  {" · "}
                  {t(lang, "fastedFor", { time: formatWords(row.fastingMs, lang) })}
                </p>
                <p className="text-xs text-muted">{t(lang, "weighedAt", { time: formatTime(row.at, lang) })}</p>
                {row.delta != null ? (
                  <p className={cn("text-xs font-semibold", row.delta > 0 ? "text-eat" : row.delta < 0 ? "text-done" : "text-muted")}>
                    {row.delta > 0 ? "+" : ""}
                    {row.delta.toFixed(1)} {t(lang, "kg")}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="card p-3">
        <h2 className="text-sm font-semibold">{t(lang, "noteHistory")}</h2>
        {notesLog.length === 0 ? <p className="mt-2 text-sm text-muted">{t(lang, "logEmpty")}</p> : null}
        <ul className="mt-2 grid gap-2">
          {notesLog.map((log) => (
            <li key={log.id} className="rounded-2xl bg-surface-2 px-3 py-2">
              <p className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: fastBand(log.fastingMs).color }}>
                <StageIcon id={fastBand(log.fastingMs).id} className="size-4" />
                {fastBandLabel(log.fastingMs, lang)} · {t(lang, "fastedFor", { time: formatWords(log.fastingMs, lang) })}
              </p>
              <p className="mt-0.5 text-sm text-fg">{log.notes || t(lang, "dash")}</p>
              {log.mood ? <p className="text-xs text-muted">{t(lang, moodKey(log.mood))}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function linkedMs(day: DayRecord | null, now: number) {
  if (!day?.fastingStart) return 0;
  const start = Date.parse(day.fastingStart);
  if (!Number.isFinite(start)) return 0;
  const first = day.meals.map((meal) => Date.parse(meal.start)).filter((stamp) => Number.isFinite(stamp) && stamp <= now).sort((a, b) => a - b)[0];
  return Math.max(0, (first ?? now) - start);
}

function weightRows(days: Record<string, DayRecord>) {
  const rows: { id: string; at: string; kg: number; fastingStart: string | null; fastingMs: number; delta: number | null }[] = [];
  for (const day of Object.values(days)) {
    const logged = (day.logs ?? []).filter((log) => typeof log.weightKg === "number");
    for (const log of logged) {
      rows.push({
        id: log.id,
        at: log.at,
        kg: log.weightKg as number,
        fastingStart: log.fastingStart ?? day.fastingStart,
        fastingMs: log.fastingMs,
        delta: null,
      });
    }
    if (typeof day.weightKg === "number" && logged.length === 0) {
      rows.push({
        id: `${day.date}-weight`,
        at: day.fastingStart ?? `${day.date}T12:00:00`,
        kg: day.weightKg,
        fastingStart: day.fastingStart,
        fastingMs: linkedMs(day, day.fastingStart ? Date.parse(day.fastingStart) + 1 : Date.now()),
        delta: null,
      });
    }
  }
  const ordered = rows.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 30);
  for (let i = 0; i < ordered.length; i += 1) {
    const older = ordered[i + 1];
    ordered[i].delta = older ? Math.round((ordered[i].kg - older.kg) * 10) / 10 : null;
  }
  return ordered;
}

function moodKey(mood: Mood) {
  if (mood === "good") return "moodGood" as const;
  if (mood === "tired") return "moodTired" as const;
  if (mood === "difficult") return "moodDifficult" as const;
  if (mood === "strong") return "moodStrong" as const;
  return "moodNormal" as const;
}
