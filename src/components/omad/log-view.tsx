import { Frown, Meh, Moon, Smile, Zap } from "lucide-react";
import { useOmad } from "@/components/omad/context";
import { cn } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import { fastBandLabel, present } from "@/lib/omad/logic";
import type { Mood } from "@/lib/omad/types";

const MOODS: { id: Mood; icon: typeof Smile; key: "moodGood" | "moodNormal" | "moodTired" | "moodDifficult" | "moodStrong" }[] = [
  { id: "good", icon: Smile, key: "moodGood" },
  { id: "normal", icon: Meh, key: "moodNormal" },
  { id: "tired", icon: Moon, key: "moodTired" },
  { id: "difficult", icon: Frown, key: "moodDifficult" },
  { id: "strong", icon: Zap, key: "moodStrong" },
];

export function LogView({ now }: { now: number }) {
  const { data, setMood, setNotes, setWeight, setMealText } = useOmad();
  const lang = data.settings.lang;
  const view = present(data.days, now);
  const today = view.today;
  const meal = view.derived?.openMeal ?? today?.meals.at(-1) ?? null;
  const fastMs = view.derived?.fastingMs ?? 0;

  return (
    <div className="grid gap-3">
      <section className="card p-3">
        <h2 className="text-sm font-semibold">{t(lang, "journal")}</h2>
        <p className="mt-1 text-sm text-muted">{t(lang, "moodQ")}</p>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {MOODS.map((mood) => {
            const Icon = mood.icon;
            const on = today?.mood === mood.id;
            return (
              <button
                key={mood.id}
                type="button"
                aria-pressed={on}
                onClick={() => setMood(on ? null : mood.id)}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border px-1 text-xs press",
                  on ? "border-fast-fill bg-fast-fill text-on-accent" : "border-line bg-surface-2 text-fg",
                )}
              >
                <Icon className="size-4" />
                {t(lang, mood.key)}
              </button>
            );
          })}
        </div>
        <label className="mt-3 block text-sm text-muted">
          {t(lang, "notes")}
          <textarea className="area mt-1" value={today?.notes ?? ""} placeholder={t(lang, "notesPh")} onChange={(event) => setNotes(event.target.value)} />
        </label>
      </section>

      {meal && view.focusDate ? (
        <section className="card p-3">
          <label className="block text-sm text-muted">
            {t(lang, "mealFood")}
            <input
              className="field mt-1"
              value={meal.description}
              placeholder={t(lang, "mealPh")}
              onChange={(event) => setMealText(view.focusDate ?? "", meal.id, event.target.value)}
            />
          </label>
          {fastMs > 0 ? (
            <p className="mt-2 text-xs text-muted">
              {t(lang, "fastingShort")} · {fastBandLabel(fastMs, lang)}
            </p>
          ) : null}
        </section>
      ) : null}

      {data.settings.weightEnabled ? (
        <section className="card p-3">
          <label className="block text-sm text-muted">
            {t(lang, "weight")}
            <input
              className="field mt-1"
              inputMode="decimal"
              type="number"
              min={20}
              max={400}
              step={0.1}
              value={today?.weightKg ?? ""}
              placeholder={t(lang, "kg")}
              onChange={(event) => {
                const value = event.target.value;
                if (!value) {
                  setWeight(null);
                  return;
                }
                const kg = Number(value);
                if (Number.isFinite(kg)) setWeight(Math.round(kg * 10) / 10);
              }}
            />
          </label>
        </section>
      ) : null}
    </div>
  );
}
