import { useState } from "react";
import { Droplet, GlassWater, Pencil, Utensils } from "lucide-react";
import { useOmad } from "@/components/omad/context";
import { GhostButton, PrimaryButton, Ring, StageIcon, StageRing, cn } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import { FAST_BANDS, fastBand, fastBandLabel, fastBandNoteFor, formatHMS, formatHours, formatTime, formatWords, present, shouldConfirmOff, type FastBandId } from "@/lib/omad/logic";
import type { Outcome } from "@/lib/omad/types";

const WATER = [50, 100, 150, 250, 500] as const;

export function HomeView({ now }: { now: number }) {
  const { data, activate, requestOff, startEat, stopEat, requestCancel, openDay, addWater } = useOmad();
  const lang = data.settings.lang;
  const view = present(data.days, now);
  const today = view.today;
  const derived = view.derived;
  const fastingMs = view.mode === "eating" ? derived?.fastingMs ?? 0 : derived?.phaseElapsedMs ?? derived?.fastingMs ?? 0;
  const hours = fastingMs / 3_600_000;
  const band = fastBand(fastingMs);
  const [picked, setPicked] = useState<FastBandId | null>(null);
  const pickedBand = FAST_BANDS.find((item) => item.id === picked) ?? null;
  const shown = pickedBand ?? band;
  const minuteStatus = statusLine(lang, view.mode, derived);
  const tracking = view.mode === "fasting" || view.mode === "eating";
  const eatTarget = today?.targetEatingMinutes ?? data.settings.targetEatingMinutes;
  const eatLeft = (derived?.phaseElapsedMs ?? 0) - eatTarget * 60_000;
  const detail = pickedBand
    ? fastBandNoteFor(pickedBand.id, lang)
    : view.mode === "inactive"
      ? t(lang, "notActiveBody")
      : view.mode === "rest"
        ? t(lang, "restBody")
        : view.mode === "eating"
          ? eatLeft > 0
            ? t(lang, "eatOverNow", { time: formatWords(eatLeft, lang) })
            : t(lang, "eatLeft", { time: formatWords(-eatLeft, lang) })
          : fastBandNoteFor(shown.id, lang);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <section className="card flex min-h-0 flex-1 flex-col p-3">
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
        <div className="ring-slot py-1">
          {view.mode === "eating" ? (
            <Ring progress={derived?.progress ?? 0} tone="eat" label={minuteStatus} className="ring-fit">
              <p className="text-xs font-semibold leading-none text-eat">{t(lang, "eating")}</p>
              <p className="tabular mt-1 text-2xl font-semibold leading-none tracking-tight text-fg">{formatHMS(derived?.phaseElapsedMs ?? 0)}</p>
            </Ring>
          ) : (
            <StageRing hours={view.mode === "fasting" ? hours : 0} bands={[...FAST_BANDS]} label={minuteStatus} className={cn("ring-fit", view.mode === "fasting" && "ring-live")}>
              <p className="text-xs font-semibold leading-none" style={{ color: view.mode === "fasting" ? shown.color : undefined }}>
                {view.mode === "rest" ? t(lang, "rest") : view.mode === "fasting" ? fastBandLabel(shown.hours * 3_600_000, lang) : t(lang, "notActiveTitle")}
              </p>
              <p className="tabular mt-1 text-2xl font-semibold leading-none tracking-tight text-fg">
                {formatHMS(view.mode === "fasting" ? derived?.phaseElapsedMs ?? 0 : 0)}
              </p>
            </StageRing>
          )}
        </div>
        <div className="mt-1 grid shrink-0 grid-cols-7 gap-1">
          {FAST_BANDS.filter((item) => item.hours > 0).map((item) => {
            const reached = view.mode === "fasting" && hours + 1e-9 >= item.hours;
            const active = shown.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                title={fastBandNoteFor(item.id, lang)}
                onClick={() => setPicked((current) => (current === item.id ? null : item.id))}
                className={cn("flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl press", active ? "stage-on bg-surface-2" : "")}
              >
                <span style={{ color: active || reached ? item.color : "var(--muted)" }}>
                  <StageIcon id={item.id} className="size-4" />
                </span>
                <span className="micro font-semibold" style={{ color: active || reached ? item.color : "var(--muted)" }}>
                  {fastBandLabel(item.hours * 3_600_000, lang)}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2 shrink-0 rounded-2xl bg-surface-2 px-3 py-2 text-center">
          <p
            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold"
            style={{ color: pickedBand || view.mode === "fasting" ? shown.color : view.mode === "eating" ? "var(--eat)" : "var(--muted)" }}
          >
            {view.mode === "eating" && !pickedBand ? <Utensils className="size-4" /> : <StageIcon id={shown.id} className="size-4" />}
            {pickedBand
              ? fastBandLabel(pickedBand.hours * 3_600_000, lang)
              : view.mode === "eating"
                ? t(lang, "eating")
                : view.mode === "rest"
                  ? t(lang, "rest")
                  : view.mode === "fasting"
                    ? fastBandLabel(shown.hours * 3_600_000, lang)
                    : t(lang, "notActiveTitle")}
          </p>
          <p className="mt-1 line-clamp-3 text-xs leading-snug text-muted">{detail}</p>
        </div>
        {view.mode === "eating" ? (
          <p className="mt-1 text-center text-xs font-medium text-fg">{t(lang, "eatClock", { time: formatTime(derived?.openMeal?.start ?? null, lang), target: formatHours(eatTarget, lang) })}</p>
        ) : null}
        <div className="mt-2">
          {view.mode === "inactive" || view.mode === "rest" ? (
            <PrimaryButton onClick={activate}>{t(lang, "startToday")}</PrimaryButton>
          ) : view.mode === "eating" ? (
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
        {tracking ? (
          <div className="mt-0.5 flex justify-center gap-2">
            <GhostButton onClick={() => view.focusDate && openDay(view.focusDate)}>
              <span className="inline-flex items-center gap-1">
                <Pencil className="size-4" />
                {t(lang, view.mode === "eating" ? "editTime" : "editStart")}
              </span>
            </GhostButton>
            {view.mode === "eating" ? <GhostButton onClick={requestCancel}>{t(lang, "cancelEating")}</GhostButton> : null}
          </div>
        ) : null}
      </section>

      {data.settings.waterEnabled ? (
        <section className="card -mx-2 shrink-0 px-3 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="inline-flex items-center gap-1.5 text-sm font-semibold">
              <Droplet className="size-4 text-water" />
              {t(lang, "water")}
            </h2>
            <p className="tabular text-sm text-fg">
              {today?.waterMl ?? 0} / {data.settings.waterGoalMl} {t(lang, "ml")}
            </p>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
            <div
              className="h-full rounded-full bg-water"
              style={{ width: `${Math.min(100, ((today?.waterMl ?? 0) / Math.max(1, data.settings.waterGoalMl)) * 100)}%` }}
            />
          </div>
          <div className="mt-1.5 grid grid-cols-6 gap-1">
            {WATER.map((ml) => (
              <WaterButton key={ml} ml={ml} onClick={() => addWater(ml)} />
            ))}
            <WaterButton ml={-50} onClick={() => addWater(-50)} />
          </div>
        </section>
      ) : null}
    </div>
  );
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
      <button type="button" role="radio" aria-checked={on} className={cn("min-h-10 rounded-xl text-sm font-medium press", on ? "bg-fast-fill text-on-accent" : "text-fg")} onClick={onActivate}>
        {t(lang, "trackingOn")}
      </button>
      <button type="button" role="radio" aria-checked={!on} className={cn("min-h-10 rounded-xl text-sm font-medium press", !on ? "bg-surface text-fg" : "text-fg")} onClick={onOff}>
        {t(lang, "trackingOff")}
      </button>
    </div>
  );
}

function WaterButton({ ml, onClick }: { ml: number; onClick: () => void }) {
  const minus = ml < 0;
  return (
    <button type="button" onClick={onClick} className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl bg-surface-2 press">
      <GlassWater className={cn("size-6", minus ? "text-muted" : "text-water")} />
      <span className="micro font-medium text-muted">{minus ? `−${Math.abs(ml)}` : `+${ml}`}</span>
    </button>
  );
}

export function dotClass(outcome: Outcome) {
  if (outcome === "completed") return "bg-done-fill";
  if (outcome === "in_progress") return "bg-fast";
  if (outcome === "multiple") return "bg-multi";
  if (outcome === "rest") return "bg-rest";
  if (outcome === "other") return "bg-window";
  return "bg-line";
}
