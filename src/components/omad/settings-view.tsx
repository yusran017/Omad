import { useRef } from "react";
import { FileJson, FileSpreadsheet } from "lucide-react";
import { useOmad } from "@/components/omad/context";
import { Segmented, ToggleRow } from "@/components/omad/parts";
import { t } from "@/lib/omad/i18n";
import type { PlanId } from "@/lib/omad/types";

const PLANS: { id: PlanId; fast: number; eat: number; label?: "planCustom" }[] = [
  { id: "16:8", fast: 16 * 60, eat: 8 * 60 },
  { id: "18:6", fast: 18 * 60, eat: 6 * 60 },
  { id: "20:4", fast: 20 * 60, eat: 4 * 60 },
  { id: "omad", fast: 20 * 60, eat: 60 },
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
        </label>
        <label className="text-sm text-muted">
          {t(lang, "preferredEat")}
          <input
            className="field mt-1"
            type="time"
            value={data.settings.preferredEatingTime}
            onChange={(event) => updateSettings({ preferredEatingTime: event.target.value || "14:00" })}
          />
        </label>
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
