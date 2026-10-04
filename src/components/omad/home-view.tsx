import type { ReactNode } from "react";
import { CircleDashed, Droplets, Flame, Moon, Pencil, Utensils, Frown, Meh, Smile, Zap } from "lucide-react";
import { useOmad } from "@/components/omad/context";
import { GhostButton, Mark, PrimaryButton, Ring, cn } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import {
  addDays,
  computeStats,
  dayOutcome,
  derive,
  endOfDay,
  formatHMS,
  formatHourNumber,
  formatHours,
  formatPrettyDate,
  formatWhen,
  formatWords,
  present,
  shouldConfirmOff,
} from "@/lib/omad/logic";
import type { DayRecord, Mood, Outcome } from "@/lib/omad/types";

const MOODS: { id: Mood; icon: typeof Smile; key: "moodGood" | "moodNormal" | "moodTired" | "moodDifficult" | "moodStrong" }[] = [
  { id: "good", icon: Smile, key: "moodGood" },
  { id: "normal", icon: Meh, key: "moodNormal" },
  { id: "tired", icon: Moon, key: "moodTired" },
  { id: "difficult", icon: Frown, key: "moodDifficult" },
  { id: "strong", icon: Zap, key: "moodStrong" },
];

function outcomeKey(outcome: Outcome) {
  if (outcome === "completed") return "completed" as const;
  if (outcome === "in_progress") return "inProgress" as const;
  if (outcome === "multiple") return "multiple" as const;
  if (outcome === "rest") return "rest" as const;
  if (outcome === "other") return "other" as const;
  return "notActive" as const;
}

export function HomeView({ now }: { now: number }) {
  const { data, activate, requestOff, startEat, stopEat, requestCancel, openDay, setView, addWater, setMood, setNotes, setWeight, setMealText } = useOmad();
  const lang = data.settings.lang;
  const view = present(data.days, now);
  const today = view.today;
  const derived = view.derived;
  const stats = computeStats(data.days, "7", now);
  const postMeal = view.mode === "fasting" && (derived?.newFastMs ?? 0) > 0 && Boolean(today?.meals.some((meal) => meal.end));
  const tone = view.mode === "eating" ? "eat" : derived?.outcome === "completed" && !postMeal ? "done" : "fast";
  const wash = view.mode === "eating" ? "eat-wash" : derived?.outcome === "completed" ? "done-wash" : "ember-wash";
  const meal = derived?.openMeal ?? today?.meals.at(-1) ?? null;
  const minuteStatus = statusLine(lang, view.mode, derived);

  return (
    <div className="grid items-start gap-4 lg:grid-cols-2">
      <section className={cn("card relative overflow-hidden p-4", view.mode === "fasting" || view.mode === "eating" ? wash : "")}>
        <div className="relative">
          <SegmentedTrack
            on={Boolean(today?.active) && !today?.rest}
            lang={lang}
            onActivate={activate}
            onOff={() => {
              if (shouldConfirmOff(today ?? undefined, now)) requestOff();
              else requestOff(true);
            }}
          />
          <p className="sr-only" aria-live="polite">
            {minuteStatus}
          </p>
          {view.mode === "inactive" || view.mode === "rest" ? (
            <div className="px-2 py-8 text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-surface-2 text-muted">
                {view.mode === "rest" ? <Moon className="size-7" /> : <CircleDashed className="size-7" />}
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {t(lang, view.mode === "rest" ? "rest" : "notActiveTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
                {t(lang, view.mode === "rest" ? "restBody" : "notActiveBody")}
              </p>
              <div className="mt-6">
                <PrimaryButton onClick={activate}>{t(lang, "startToday")}</PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="pt-4">
              <Ring
                progress={derived?.progress ?? 0}
                tone={tone}
                label={minuteStatus}
              >
                <p className={cn("text-sm font-medium", tone === "eat" ? "text-eat" : tone === "done" ? "text-done" : "text-fast")}>
                  {t(lang, view.mode === "eating" ? "eating" : "fasting")}
                </p>
                <p className="tabular text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                  {formatHMS(derived?.phaseElapsedMs ?? 0)}
                </p>
              </Ring>
              <p className="mt-2 text-center text-sm text-muted">
                {t(lang, "targetLine", {
                  time: formatHours(
                    view.mode === "eating" ? (today?.targetEatingMinutes ?? data.settings.targetEatingMinutes) : (today?.targetFastingMinutes ?? data.settings.targetFastingMinutes),
                    lang,
                  ),
                })}
                {" · "}
                {derived && derived.remainingMs < 0
                  ? t(lang, view.mode === "eating" ? "eatOverLine" : "overLine", { time: formatHMS(-derived.remainingMs) })
                  : t(lang, "remainingLine", { time: formatHMS(derived?.remainingMs ?? 0) })}
              </p>
              <p className="mt-1 text-center text-sm text-fg">
                {view.mode === "eating" && derived?.openMeal
                  ? t(lang, "startedEat", { time: formatWhen(derived.openMeal.start, lang, view.todayKey) })
                  : derived?.fastingStart
                    ? t(lang, "startedFast", { time: formatWhen(derived.fastingStart, lang, view.todayKey) })
                    : t(lang, "preferredLine", { time: data.settings.preferredEatingTime })}
              </p>
              {postMeal ? <p className="mt-1 text-center text-xs text-done">{t(lang, "newFast")}</p> : null}
              <div className="mt-4">
                {view.mode === "eating" ? (
                  <PrimaryButton tone="eat" onClick={stopEat}>
                    <Utensils className="size-5" />
                    {t(lang, "stopEating")}
                  </PrimaryButton>
                ) : (
                  <PrimaryButton onClick={startEat}>
                    <Utensils className="size-5" />
                    {t(lang, "startEating")}
                  </PrimaryButton>
                )}
              </div>
              <div className="mt-1 flex justify-center gap-2">
                <GhostButton onClick={() => view.focusDate && openDay(view.focusDate)}>
                  <span className="inline-flex items-center gap-1">
                    <Pencil className="size-4" />
                    {t(lang, view.mode === "eating" ? "editTime" : "editStart")}
                  </span>
                </GhostButton>
                {view.mode === "eating" ? <GhostButton onClick={requestCancel}>{t(lang, "cancelEating")}</GhostButton> : null}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="grid gap-4">
        <section className="card p-4">
          <h2 className="text-sm font-semibold text-muted">{t(lang, "todayTitle")}</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat icon={<Flame className="size-4" />} label={t(lang, "fastingShort")} value={formatWords(measure(today, now, view.todayKey).fast, lang)} />
            <Stat icon={<Utensils className="size-4" />} label={t(lang, "eatingShort")} value={formatWords(measure(today, now, view.todayKey).eat, lang)} />
            <Stat icon={<Mark className="size-4" />} label={t(lang, "meals")} value={String(today?.meals.length ?? 0)} />
            <Stat
              icon={<span className={cn("size-2.5 rounded-full", dotClass(dayOutcome(today ?? undefined, view.todayKey)))} />}
              label={t(lang, "omad")}
              value={t(lang, outcomeKey(dayOutcome(today ?? undefined, view.todayKey)))}
            />
          </div>
          {meal && view.focusDate ? (
            <label className="mt-3 block text-sm text-muted">
              {t(lang, "mealFood")}
              <input
                className="field mt-1"
                value={meal.description}
                placeholder={t(lang, "mealPh")}
                onChange={(event) => setMealText(view.focusDate ?? "", meal.id, event.target.value)}
              />
            </label>
          ) : null}
        </section>

        {data.settings.waterEnabled ? (
          <section className="card p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
                <Droplets className="size-4 text-rest" />
                {t(lang, "water")}
              </h2>
              <p className="tabular text-sm text-fg">
                {(Math.round(((today?.waterMl ?? 0) / 1000) * 10) / 10).toFixed(1)} / {(data.settings.waterGoalMl / 1000).toFixed(1)} {lang === "th" ? "ล." : "L"}
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
              <div
                className="h-full rounded-full bg-rest"
                style={{ width: `${Math.min(100, ((today?.waterMl ?? 0) / Math.max(1, data.settings.waterGoalMl)) * 100)}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Mini onClick={() => addWater(-250)}>{t(lang, "minus250")}</Mini>
              <Mini onClick={() => addWater(250)}>{t(lang, "add250")}</Mini>
              <Mini onClick={() => addWater(500)}>{t(lang, "add500")}</Mini>
            </div>
          </section>
        ) : null}

        <section className="card p-4">
          <h2 className="text-sm font-semibold">{t(lang, "journal")}</h2>
          <p className="mt-1 text-sm text-muted">{t(lang, "moodQ")}</p>
          <div className="mt-2 grid grid-cols-5 gap-2">
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
          ) : null}
        </section>

        <section className="card flex items-center gap-4 p-4">
          <Ring progress={stats.consistency ?? 0} tone="done" className="size-16 shrink-0" label={t(lang, "consistency")}>
            <span className="tabular text-sm font-semibold">{stats.consistency === null ? t(lang, "dash") : `${Math.round(stats.consistency * 100)}%`}</span>
          </Ring>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold">{t(lang, "consistency")}</h2>
            <p className="mt-1 text-sm text-fg">
              {t(lang, "completed")} {stats.completed} · {t(lang, "notActive")} {stats.notActive}
            </p>
            <p className="mt-1 text-xs leading-snug text-muted">{t(lang, "consistencyHint")}</p>
            <p className="mt-1 text-xs text-muted">
              7 {lang === "th" ? "วัน" : "days"} · {t(lang, "avgFast")} {stats.avgFastHours === null ? t(lang, "dash") : formatHourNumber(stats.avgFastHours, lang)}
            </p>
          </div>
        </section>
      </div>

      <section className="card p-4 lg:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">{t(lang, "recent")}</h2>
          <button type="button" className="min-h-11 text-sm font-medium text-fast press" onClick={() => setView("history")}>
            {t(lang, "seeAll")}
          </button>
        </div>
        <ul className="mt-2 divide-y divide-line">
          {Array.from({ length: 4 }, (_, index) => addDays(view.todayKey, -index)).map((key) => {
            const record = data.days[key];
            const outcome = dayOutcome(record, view.todayKey);
            return (
              <li key={key}>
                <button type="button" className="flex min-h-14 w-full items-center gap-3 py-2 text-left press" onClick={() => openDay(key)}>
                  <span className={cn("size-2.5 shrink-0 rounded-full", dotClass(outcome))} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{formatPrettyDate(key, lang)}</span>
                    <span className="block text-xs text-muted">{t(lang, outcomeKey(outcome))}</span>
                  </span>
                  <span className="text-xs text-muted">{record ? formatWords(measure(record, now, view.todayKey).fast, lang) : t(lang, "dash")}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function measure(day: DayRecord | null | undefined, now: number, todayKey: string) {
  if (!day) return { fast: 0, eat: 0 };
  const asOf = day.date === todayKey ? now : Math.min(now, endOfDay(day.date));
  const derived = derive(day, asOf, todayKey);
  return { fast: derived.fastingMs, eat: derived.eatingMs };
}

function statusLine(lang: "th" | "en", mode: string, derived: { phaseElapsedMs: number } | null) {
  if (mode === "inactive") return t(lang, "notActiveTitle");
  if (mode === "rest") return t(lang, "rest");
  const clock = formatHMS(derived?.phaseElapsedMs ?? 0).slice(0, 5);
  return `${t(lang, mode === "eating" ? "eating" : "fasting")} ${clock}`;
}

function SegmentedTrack({
  on,
  lang,
  onActivate,
  onOff,
}: {
  on: boolean;
  lang: "th" | "en";
  onActivate: () => void;
  onOff: () => void;
}) {
  return (
    <div role="radiogroup" aria-label={t(lang, "trackingGroup")} className="grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1">
      <button type="button" role="radio" aria-checked={on} className={cn("min-h-11 rounded-xl text-sm font-medium press", on ? "bg-fast-fill text-on-accent" : "text-fg")} onClick={onActivate}>
        {t(lang, "trackingOn")}
      </button>
      <button type="button" role="radio" aria-checked={!on} className={cn("min-h-11 rounded-xl text-sm font-medium press", !on ? "bg-surface text-fg" : "text-fg")} onClick={onOff}>
        {t(lang, "trackingOff")}
      </button>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 px-3 py-3">
      <div className="flex items-center gap-2 text-xs text-muted">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold text-fg">{value}</p>
    </div>
  );
}

function Mini({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 rounded-2xl bg-surface-2 text-sm font-semibold text-fg press">
      {children}
    </button>
  );
}

export function dotClass(outcome: Outcome) {
  if (outcome === "completed") return "bg-done-fill";
  if (outcome === "in_progress") return "bg-fast-fill";
  if (outcome === "multiple") return "bg-multi";
  if (outcome === "rest") return "bg-rest";
  if (outcome === "other") return "bg-fast";
  return "bg-line";
}
