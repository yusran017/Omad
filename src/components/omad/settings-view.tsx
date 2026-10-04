import { useRef } from "react";
import { FileJson, FileSpreadsheet } from "lucide-react";
import { useOmad } from "@/components/omad/context";
import { Segmented, ToggleRow } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import type { Lang, PlanId } from "@/lib/omad/types";

const PLANS: { id: PlanId; fast: number; eat: number; label?: "planCustom" }[] = [
  { id: "16:8", fast: 16 * 60, eat: 8 * 60 },
  { id: "18:6", fast: 18 * 60, eat: 6 * 60 },
  { id: "20:4", fast: 20 * 60, eat: 4 * 60 },
  { id: "omad", fast: 23 * 60, eat: 60 },
  { id: "custom", fast: 20 * 60, eat: 60, label: "planCustom" },
];

export function SettingsView() {
  const app = useOmad();
  const { data, updateSettings, setTheme, setLang, enableNotifications, exportJson, exportExcel, beginImport, requestClear, canInstall, install } = app;
  const lang = data.settings.lang;
  const fileRef = useRef<HTMLInputElement>(null);
  const notifySupported = typeof window !== "undefined" && "Notification" in window;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="card grid gap-3 p-4">
        <h2 className="text-sm font-semibold">{t(lang, "plan")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {PLANS.map((plan) => {
            const on = data.settings.plan === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                aria-pressed={on}
                className={`min-h-11 rounded-2xl px-2 text-sm font-medium press ${on ? "bg-fast-fill text-on-accent" : "bg-surface-2 text-fg"}`}
                onClick={() => {
                  if (plan.id === "custom") updateSettings({ plan: "custom" });
                  else updateSettings({ plan: plan.id, targetFastingMinutes: plan.fast, targetEatingMinutes: plan.eat });
                }}
              >
                {plan.label ? t(lang, plan.label) : plan.id}
              </button>
            );
          })}
        </div>
        <label className="text-sm text-muted">
          {t(lang, "goalFast")}
          <input
            className="field mt-1"
            type="number"
            min={1}
            max={72}
            step={0.5}
            value={data.settings.targetFastingMinutes / 60}
            onChange={(event) => {
              const hours = Number(event.target.value);
              if (!Number.isFinite(hours)) return;
              updateSettings({ plan: "custom", targetFastingMinutes: Math.round(Math.min(72, Math.max(1, hours)) * 60) });
            }}
          />
          <span className="mt-1 block text-xs leading-snug">{t(lang, "goalFastHint")}</span>
        </label>
        <label className="text-sm text-muted">
          {t(lang, "goalEat")}
          <input
            className="field mt-1"
            type="number"
            min={0.25}
            max={16}
            step={0.25}
            value={data.settings.targetEatingMinutes / 60}
            onChange={(event) => {
              const hours = Number(event.target.value);
              if (!Number.isFinite(hours)) return;
              updateSettings({ plan: "custom", targetEatingMinutes: Math.round(Math.min(16, Math.max(0.25, hours)) * 60) });
            }}
          />
          <span className="mt-1 block text-xs leading-snug">{t(lang, "goalEatHint")}</span>
        </label>
        <ClockField
          lang={lang}
          value={data.settings.preferredEatingTime}
          onChange={(value) => updateSettings({ preferredEatingTime: value })}
        />
      </section>

      <section className="card grid gap-3 p-4">
        <h2 className="text-sm font-semibold">{t(lang, "appearance")}</h2>
        <Segmented
          label={t(lang, "language")}
          cols="grid-cols-2"
          value={lang}
          onChange={setLang}
          options={[
            { value: "th", label: "ไทย" },
            { value: "en", label: "English" },
          ]}
        />
        <Segmented
          label={t(lang, "theme")}
          cols="grid-cols-2"
          value={data.settings.theme}
          onChange={setTheme}
          options={[
            { value: "dark", label: t(lang, "themeDark") },
            { value: "light", label: t(lang, "themeLight") },
          ]}
        />
        <h2 className="pt-2 text-sm font-semibold">{t(lang, "features")}</h2>
        <ToggleRow label={t(lang, "waterTrack")} checked={data.settings.waterEnabled} onChange={(on) => updateSettings({ waterEnabled: on })} />
        {data.settings.waterEnabled ? (
          <label className="text-sm text-muted">
            {t(lang, "waterGoal")}
            <input
              className="field mt-1"
              type="number"
              min={250}
              max={8000}
              step={50}
              value={data.settings.waterGoalMl}
              onChange={(event) => updateSettings({ waterGoalMl: Math.round(Number(event.target.value) || 2500) })}
            />
          </label>
        ) : null}
        <ToggleRow label={t(lang, "weightTrack")} checked={data.settings.weightEnabled} onChange={(on) => updateSettings({ weightEnabled: on })} />
      </section>

      <section className="card grid gap-3 p-4">
        <h2 className="text-sm font-semibold">{t(lang, "reminders")}</h2>
        <ToggleRow label={t(lang, "notifications")} checked={data.settings.notifications} onChange={(on) => void enableNotifications(on)} />
        <ToggleRow label={t(lang, "eatingReminder")} checked={data.settings.eatingReminder} onChange={(on) => updateSettings({ eatingReminder: on })} />
        <ToggleRow label={t(lang, "fastingReminder")} checked={data.settings.fastingGoalReminder} onChange={(on) => updateSettings({ fastingGoalReminder: on })} />
        <p className="text-xs leading-snug text-muted">{notifySupported ? t(lang, "notifHint") : t(lang, "notifUnsupported")}</p>
      </section>

      <section className="card grid gap-3 p-4">
        <h2 className="text-sm font-semibold">{t(lang, "dataTitle")}</h2>
        <p className="text-sm text-muted">{t(lang, "dataLocal")}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-fast-fill text-on-accent press"
            aria-label={t(lang, "exportJson")}
            onClick={exportJson}
          >
            <FileJson className="size-5" />
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-surface-2 press"
            aria-label={t(lang, "exportExcel")}
            onClick={() => void exportExcel()}
          >
            <FileSpreadsheet className="size-5" />
          </button>
        </div>
        <button type="button" className="min-h-11 rounded-2xl bg-surface-2 text-sm font-semibold press" onClick={() => fileRef.current?.click()}>
          {t(lang, "importJson")}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (!file) return;
            beginImport(await file.text());
          }}
        />
        <button type="button" className="min-h-11 rounded-2xl border border-line text-sm font-semibold text-eat press" onClick={requestClear}>
          {t(lang, "clearData")}
        </button>
        <h2 className="pt-2 text-sm font-semibold">{t(lang, "install")}</h2>
        <p className="text-xs leading-snug text-muted">{t(lang, "installHint")}</p>
        {canInstall ? (
          <button type="button" className="min-h-11 rounded-2xl bg-surface-2 text-sm font-semibold press" onClick={() => void install()}>
            {t(lang, "installBtn")}
          </button>
        ) : null}
        <h2 className="pt-2 text-sm font-semibold">{t(lang, "about")}</h2>
        <p className="text-xs leading-snug text-muted">{t(lang, "aboutBody")}</p>
      </section>
    </div>
  );
}

function ClockField({ lang, value, onChange }: { lang: Lang; value: string; onChange: (value: string) => void }) {
  const [rawH, rawM] = value.split(":");
  const hour = String(Math.min(23, Math.max(0, Number(rawH) || 0))).padStart(2, "0");
  const minute = String(Math.min(59, Math.max(0, Number(rawM) || 0))).padStart(2, "0");
  const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"));
  return (
    <fieldset className="text-sm text-muted">
      <legend>{t(lang, "preferredEat")}</legend>
      <div className="mt-1 grid grid-cols-2 gap-2">
        <label>
          {t(lang, "hourLabel")}
          <select className="field mt-1" value={hour} onChange={(event) => onChange(`${event.target.value}:${minute}`)}>
            {hours.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          {t(lang, "minuteLabel")}
          <select className="field mt-1" value={minute} onChange={(event) => onChange(`${hour}:${event.target.value}`)}>
            {minutes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <span className="mt-1 block text-xs leading-snug">{t(lang, "clockHint")} · {hour}:{minute}{lang === "th" ? " น." : ""}</span>
    </fieldset>
  );
}
