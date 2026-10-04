import { useEffect, useRef, useState } from "react";
import { useOmad } from "@/components/omad/context";
import { Sheet, ToggleRow } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import { blankDay } from "@/lib/omad/actions";
import { derive, endOfDay, fastBand, fastBandLabel, fastBandNote, formatPrettyDate, formatWords, fromLocalInput, localDateKey, toLocalInput, validateDay } from "@/lib/omad/logic";
import type { DayRecord, Meal } from "@/lib/omad/types";

export function DaySheet({ now }: { now: number }) {
  const { data, sheet, closeSheet, commitDay, deleteDay } = useOmad();
  const open = sheet?.type === "day";
  const date = open ? sheet.date : "";
  const lang = data.settings.lang;
  const [draft, setDraft] = useState<DayRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dataRef = useRef(data);
  dataRef.current = data;

  useEffect(() => {
    if (!open) return;
    const current = dataRef.current;
    setDraft(current.days[date] ? structuredClone(current.days[date]) : blankDay(date, current.settings));
    setError(null);
  }, [open, date]);

  if (!draft || !open) return null;
  const asOf = draft.date === localDateKey(new Date(now)) ? now : Math.min(now, endOfDay(draft.date));
  const preview = derive({ ...draft, active: true, rest: false }, asOf, draft.date);

  return (
    <Sheet open={open} title={formatPrettyDate(draft.date, lang, true)} description={t(lang, "editTime")} onClose={closeSheet}>
      <div className="grid gap-3">
        <p className="text-sm text-muted">
          {t(lang, "fastingShort")} {formatWords(preview.fastingMs, lang)} · {t(lang, "eatingShort")} {formatWords(preview.eatingMs, lang)}
        </p>
        {preview.fastingMs >= 12 * 3_600_000 ? (
          <p className="text-sm font-semibold" style={{ color: fastBand(preview.fastingMs).color }}>
            {fastBandLabel(preview.fastingMs, lang)} · {fastBandNote(preview.fastingMs, lang)}
          </p>
        ) : null}
        <ToggleRow label={t(lang, "activeDay")} checked={draft.active} onChange={(active) => setDraft({ ...draft, active, rest: active ? false : draft.rest })} />
        <ToggleRow label={t(lang, "markRest")} checked={draft.rest} onChange={(rest) => setDraft({ ...draft, rest, active: rest ? false : draft.active })} />
        <label className="text-sm text-muted">
          {t(lang, "fastStart")}
          <input className="field mt-1" type="datetime-local" value={toLocalInput(draft.fastingStart)} onChange={(event) => setDraft({ ...draft, fastingStart: fromLocalInput(event.target.value) })} />
        </label>
        <div className="grid gap-3">
          {draft.meals.length === 0 ? <p className="text-sm text-muted">{t(lang, "noMeals")}</p> : null}
          {draft.meals.map((meal, index) => (
            <MealFields
              key={meal.id}
              meal={meal}
              index={index}
              lang={lang}
              onChange={(next) => setDraft({ ...draft, meals: draft.meals.map((item) => (item.id === meal.id ? next : item)) })}
              onRemove={() => setDraft({ ...draft, meals: draft.meals.filter((item) => item.id !== meal.id) })}
            />
          ))}
        </div>
        <button
          type="button"
          className="min-h-11 rounded-2xl bg-surface-2 text-sm font-semibold press"
          onClick={() =>
            setDraft({
              ...draft,
              meals: [
                ...draft.meals,
                { id: crypto.randomUUID(), start: new Date().toISOString(), end: null, description: "", notes: "", calories: null },
              ],
            })
          }
        >
          {t(lang, "addMeal")}
        </button>
        <label className="text-sm text-muted">
          {t(lang, "notes")}
          <textarea className="area mt-1" value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} />
        </label>
        {error ? <p className="text-sm text-eat">{error}</p> : null}
        <button
          type="button"
          className="min-h-12 rounded-full bg-fast-fill text-sm font-semibold text-on-accent press"
          onClick={() => {
            const problem = validateDay(draft);
            if (problem) {
              setError(t(lang, problem === "meal_order" ? "invalidMeal" : "invalidFast"));
              return;
            }
            commitDay(draft);
          }}
        >
          {t(lang, "save")}
        </button>
        {data.days[draft.date] ? (
          <button type="button" className="min-h-11 text-sm font-medium text-eat press" onClick={() => deleteDay(draft.date)}>
            {t(lang, "deleteDay")}
          </button>
        ) : null}
      </div>
    </Sheet>
  );
}

function MealFields({
  meal,
  index,
  lang,
  onChange,
  onRemove,
}: {
  meal: Meal;
  index: number;
  lang: "th" | "en";
  onChange: (meal: Meal) => void;
  onRemove: () => void;
}) {
  return (
    <fieldset className="grid gap-2 rounded-2xl border border-line p-3">
      <legend className="px-1 text-sm font-medium">{t(lang, "mealN", { n: index + 1 })}</legend>
      <label className="text-sm text-muted">
        {t(lang, "mealStart")}
        <input className="field mt-1" type="datetime-local" value={toLocalInput(meal.start)} onChange={(event) => onChange({ ...meal, start: fromLocalInput(event.target.value) ?? meal.start })} />
      </label>
      <label className="text-sm text-muted">
        {t(lang, "mealEnd")}
        <input className="field mt-1" type="datetime-local" value={toLocalInput(meal.end)} onChange={(event) => onChange({ ...meal, end: fromLocalInput(event.target.value) })} />
      </label>
      <label className="text-sm text-muted">
        {t(lang, "mealFood")}
        <input className="field mt-1" value={meal.description} onChange={(event) => onChange({ ...meal, description: event.target.value })} />
      </label>
      <label className="text-sm text-muted">
        {t(lang, "calories")}
        <input
          className="field mt-1"
          inputMode="numeric"
          type="number"
          min={0}
          value={meal.calories ?? ""}
          onChange={(event) => onChange({ ...meal, calories: event.target.value === "" ? null : Number(event.target.value) })}
        />
      </label>
      <label className="text-sm text-muted">
        {t(lang, "mealNotes")}
        <input className="field mt-1" value={meal.notes} onChange={(event) => onChange({ ...meal, notes: event.target.value })} />
      </label>
      <button type="button" className="min-h-11 text-sm text-eat press" onClick={onRemove}>
        {t(lang, "deleteMeal")}
      </button>
    </fieldset>
  );
}
