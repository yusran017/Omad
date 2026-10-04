import { useState } from "react";
import { Frown, Meh, Moon, Smile, Zap } from "lucide-react";
import { useOmad } from "@/components/omad/context";
import { cn } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import { fastBand, fastBandLabel, formatTime, present } from "@/lib/omad/logic";
import type { Mood } from "@/lib/omad/types";

const MOODS: { id: Mood; icon: typeof Smile; key: "moodGood" | "moodNormal" | "moodTired" | "moodDifficult" | "moodStrong" }[] = [
  { id: "good", icon: Smile, key: "moodGood" },
  { id: "normal", icon: Meh, key: "moodNormal" },
  { id: "tired", icon: Moon, key: "moodTired" },
  { id: "difficult", icon: Frown, key: "moodDifficult" },
  { id: "strong", icon: Zap, key: "moodStrong" },
];

export function LogView({ now }: { now: number }) {
  const { data, setMealText, saveFastLog } = useOmad();
  const lang = data.settings.lang;
  const view = present(data.days, now);
  const today = view.today;
  const todayKey = view.todayKey;
  const meal = view.derived?.openMeal ?? today?.meals.at(-1) ?? null;
  const fastMs = view.mode === "eating" ? view.derived?.fastingMs ?? 0 : view.derived?.phaseElapsedMs ?? view.derived?.fastingMs ?? 0;
  const band = fastBand(fastMs);
  const [mood, setMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState("");
  const [weight, setWeight] = useState("");
  const logs = [...(today?.logs ?? [])].reverse();
  const kg = weight.trim() ? Number(weight) : null;
  const weightOk = kg === null || (Number.isFinite(kg) && kg >= 20 && kg <= 400);
  const canSave = weightOk && (notes.trim().length > 0 || mood !== null || kg !== null);

  return (
    <div className="grid gap-3">
      <section className="card p-3">
        <h2 className="text-sm font-semibold">{t(lang, "journal")}</h2>
        <p className="mt-1 text-xs leading-snug text-muted">{t(lang, "logHint")}</p>
        <p className="mt-2 text-sm font-semibold" style={{ color: band.color }}>
          {fastBandLabel(fastMs, lang)}
        </p>
        <p className="mt-2 text-sm text-muted">{t(lang, "moodQ")}</p>
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
        {data.settings.weightEnabled ? (
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
              placeholder={t(lang, "kg")}
              onChange={(event) => setWeight(event.target.value)}
            />
          </label>
        ) : null}
        <button
          type="button"
          disabled={!canSave}
          className="btn-fast mt-3 min-h-12 w-full rounded-full text-sm font-semibold text-on-accent press disabled:opacity-40"
          onClick={() => {
            if (!canSave) return;
            saveFastLog({
              notes: notes.trim(),
              mood,
              weightKg: kg === null ? null : Math.round(kg * 10) / 10,
              fastingMs: fastMs,
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
        {logs.length === 0 ? <p className="text-sm text-muted">{t(lang, "logEmpty")}</p> : null}
        <ul className="grid gap-2">
          {logs.map((log) => (
            <li key={log.id} className="rounded-2xl bg-surface-2 px-3 py-2">
              <p className="text-sm font-semibold" style={{ color: fastBand(log.fastingMs).color }}>
                {fastBandLabel(log.fastingMs, lang)} · {formatTime(log.at, lang)}
              </p>
              <p className="mt-0.5 text-sm text-fg">{log.notes || t(lang, "dash")}</p>
              <p className="text-xs text-muted">
                {[log.mood ? t(lang, moodKey(log.mood)) : "", log.weightKg ? `${log.weightKg} ${t(lang, "kg")}` : ""].filter(Boolean).join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {meal && view.focusDate ? (
        <section className="card p-3">
          <label className="block text-sm text-muted">
            {t(lang, "mealFood")}
            <input
              className="field mt-1"
              value={meal.description}
              placeholder={t(lang, "mealPh")}
              onChange={(event) => setMealText(view.focusDate ?? todayKey, meal.id, event.target.value)}
            />
          </label>
        </section>
      ) : null}
    </div>
  );
}

function moodKey(mood: Mood) {
  if (mood === "good") return "moodGood" as const;
  if (mood === "tired") return "moodTired" as const;
  if (mood === "difficult") return "moodDifficult" as const;
  if (mood === "strong") return "moodStrong" as const;
  return "moodNormal" as const;
}
