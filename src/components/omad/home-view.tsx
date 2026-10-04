import { CircleDashed, GlassWater, Moon, Pencil, Utensils } from "lucide-react";
import { useOmad } from "@/components/omad/context";
import { GhostButton, PrimaryButton, Ring, StageRing, cn } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import { FAST_BANDS, fastBand, fastBandLabel, fastBandNote, formatHMS, formatHours, present, shouldConfirmOff } from "@/lib/omad/logic";
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
  const minuteStatus = statusLine(lang, view.mode, derived);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <section className="card flex min-h-0 flex-1 flex-col overflow-hidden p-3">
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
          <div className="grid flex-1 place-items-center px-2 text-center">
            <div>
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-surface-2 text-muted">
                {view.mode === "rest" ? <Moon className="size-6" /> : <CircleDashed className="size-6" />}
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                {t(lang, view.mode === "rest" ? "rest" : "notActiveTitle")}
              </h2>
              <p className="mx-auto mt-1 max-w-xs text-sm text-muted">
                {t(lang, view.mode === "rest" ? "restBody" : "notActiveBody")}
              </p>
              <div className="mt-4">
                <PrimaryButton onClick={activate}>{t(lang, "startToday")}</PrimaryButton>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            {view.mode === "eating" ? (
              <Ring progress={derived?.progress ?? 0} tone="eat" label={minuteStatus} className="mx-auto size-[clamp(8rem,30dvh,11rem)] shrink-0">
                <p className="text-xs font-semibold leading-none text-eat">{t(lang, "eating")}</p>
                <p className="tabular mt-1 text-lg font-semibold leading-none tracking-tight text-fg">{formatHMS(derived?.phaseElapsedMs ?? 0)}</p>
              </Ring>
            ) : (
              <StageRing hours={hours} bands={[...FAST_BANDS]} label={minuteStatus} className="mx-auto size-[clamp(8rem,30dvh,11rem)] shrink-0">
                <p className="text-xs font-semibold leading-none" style={{ color: band.color }}>
                  {fastBandLabel(fastingMs, lang)}
                </p>
                <p className="tabular mt-1 text-lg font-semibold leading-none tracking-tight text-fg">{formatHMS(derived?.phaseElapsedMs ?? 0)}</p>
              </StageRing>
            )}
            <p className="mt-1 text-center text-xs text-muted">
              {view.mode === "eating"
                ? t(lang, "targetLine", { time: formatHours(today?.targetEatingMinutes ?? data.settings.targetEatingMinutes, lang) })
                : fastBandNote(fastingMs, lang)}
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {FAST_BANDS.filter((item) => item.hours > 0).map((item) => {
                const on = hours >= item.hours && view.mode !== "eating";
                return (
                  <span
                    key={item.id}
                    className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none", on ? "" : "bg-surface-2 text-muted")}
                    style={on ? { background: item.color, color: inkOn(item.color) } : undefined}
                  >
                    {fastBandLabel(item.hours * 3_600_000, lang)}
                  </span>
                );
              })}
            </div>
            <div className="mt-3">
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
            <div className="mt-0.5 flex justify-center gap-2">
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
      </section>

      {data.settings.waterEnabled ? (
        <section className="card shrink-0 p-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
              <GlassWater className="size-4 text-rest" />
              {t(lang, "water")}
            </h2>
            <p className="tabular text-sm text-fg">
              {today?.waterMl ?? 0} / {data.settings.waterGoalMl} {t(lang, "ml")}
            </p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
            <div
              className="h-full rounded-full bg-rest"
              style={{ width: `${Math.min(100, ((today?.waterMl ?? 0) / Math.max(1, data.settings.waterGoalMl)) * 100)}%` }}
            />
          </div>
          <div className="mt-2 grid grid-cols-6 gap-1">
            {WATER.map((ml) => (
              <WaterButton key={ml} ml={ml} unit={t(lang, "ml")} onClick={() => addWater(ml)} />
            ))}
            <WaterButton ml={-50} unit={t(lang, "ml")} onClick={() => addWater(-50)} />
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

function WaterButton({ ml, unit, onClick }: { ml: number; unit: string; onClick: () => void }) {
  const minus = ml < 0;
  return (
    <button type="button" onClick={onClick} className="flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl bg-surface-2 px-0.5 press">
      <GlassWater className={cn("size-3.5", minus ? "text-muted" : "text-rest")} />
      <span className="text-xs font-semibold leading-none">{minus ? `−${Math.abs(ml)}` : `+${ml}`}</span>
      <span className="text-[10px] leading-none text-muted">{unit}</span>
    </button>
  );
}

function inkOn(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16);
  const y = (((n >> 16) & 255) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000;
  return y > 160 ? "#06211e" : "#f8fffd";
}

export function dotClass(outcome: Outcome) {
  if (outcome === "completed") return "bg-done-fill";
  if (outcome === "in_progress") return "bg-fast-fill";
  if (outcome === "multiple") return "bg-multi";
  if (outcome === "rest") return "bg-rest";
  if (outcome === "other") return "bg-fast";
  return "bg-line";
}
