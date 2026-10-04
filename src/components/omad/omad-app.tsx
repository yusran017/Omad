import { useEffect, useMemo, useRef, useState } from "react";
import { BarChart3, CalendarDays, FileJson, FileSpreadsheet, History, House, Moon, Settings, Sun } from "lucide-react";
import { CalendarView } from "@/components/omad/calendar-view";
import { OmadProvider, type OmadApi } from "@/components/omad/context";
import { DaySheet } from "@/components/omad/day-sheet";
import { HistoryView } from "@/components/omad/history-view";
import { HomeView } from "@/components/omad/home-view";
import { Mark, Sheet, cn } from "@/components/omad/parts";
import { SettingsView } from "@/components/omad/settings-view";
import { StatsView } from "@/components/omad/stats-view";
import {
  activateToday,
  addWater,
  cancelOpenMeal,
  deactivateToday,
  removeDay,
  saveDay,
  setMealDescription,
  setMood,
  setNotes,
  setWeight,
  startEating,
  stopEating,
  updateSettings as patchSettings,
} from "@/lib/omad/actions";
import { t } from "@/lib/omad/i18n";
import { downloadExcel } from "@/lib/omad/excel";
import { dayOutcome, dueNotices, findOpenMeal, formatPrettyDate, loadPersisted, localDateKey, parseBackup, serialize, shouldConfirmOff } from "@/lib/omad/logic";
import { STORAGE_KEY, emptyPersisted, type Persisted, type SheetState, type ViewId } from "@/lib/omad/types";

const NAV: { id: ViewId; icon: typeof House; label: "home" | "calendar" | "stats" | "history" | "settings" }[] = [
  { id: "home", icon: House, label: "home" },
  { id: "calendar", icon: CalendarDays, label: "calendar" },
  { id: "stats", icon: BarChart3, label: "stats" },
  { id: "history", icon: History, label: "history" },
  { id: "settings", icon: Settings, label: "settings" },
];

type InstallEvent = Event & { prompt: () => Promise<void> };

export function OmadApp() {
  const [data, setData] = useState<Persisted | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [view, setView] = useState<ViewId>("home");
  const [sheet, setSheet] = useState<SheetState>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  const seen = useRef(new Set<string>());
  const dataRef = useRef(data);
  dataRef.current = data;

  useEffect(() => {
    const loaded = loadPersisted(localStorage.getItem(STORAGE_KEY));
    setData(loaded);
  }, []);

  useEffect(() => {
    if (!data) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    document.documentElement.dataset.theme = data.settings.theme;
    document.documentElement.lang = data.settings.lang === "en" ? "en" : "th";
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", data.settings.theme === "light" ? "#f6f1ea" : "#14110e");
  }, [data]);

  useEffect(() => {
    setNow(Date.now());
    if (view !== "home") return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [view]);

  useEffect(() => {
    if (!banner) return;
    const id = window.setTimeout(() => setBanner(null), 3200);
    return () => window.clearTimeout(id);
  }, [banner]);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  useEffect(() => {
    const tick = (prime: boolean) => {
      const current = dataRef.current;
      if (!current || typeof Notification === "undefined" || Notification.permission !== "granted") return;
      for (const notice of dueNotices(current, Date.now(), seen.current, prime)) {
        try {
          new Notification(notice.title, { body: notice.body, lang: current.settings.lang });
        } catch {
          /* Browsers can reject a notification without failing the tracker. */
        }
      }
    };
    const id = window.setInterval(() => tick(false), 20_000);
    tick(true);
    return () => window.clearInterval(id);
  }, [Boolean(data)]);

  const api = useMemo<OmadApi | null>(() => {
    if (!data) return null;
    const lang = data.settings.lang;
    const say = (key: Parameters<typeof t>[1]) => setBanner(t(lang, key));
    return {
      data,
      view,
      setView,
      sheet,
      banner,
      closeSheet: () => setSheet(null),
      openDay: (date) => {
        const today = localDateKey(new Date());
        if (date > today) return;
        setSheet({ type: "day", date });
      },
      activate: () => {
        setData((current) => current && activateToday(current, Date.now()));
        navigator.vibrate?.(12);
      },
      requestOff: (force) => {
        const today = data.days[localDateKey(new Date())];
        if (!force && shouldConfirmOff(today, Date.now())) {
          setSheet({ type: "off" });
          return;
        }
        setData((current) => current && deactivateToday(current, Date.now()));
        setSheet(null);
      },
      startEat: () => {
        setData((current) => current && startEating(current, Date.now()));
        navigator.vibrate?.(12);
      },
      stopEat: () => {
        const stamp = Date.now();
        const open = findOpenMeal(data.days, stamp);
        const next = stopEating(data, stamp);
        setData(next);
        const todayKey = localDateKey(new Date(stamp));
        const outcome = open ? dayOutcome(next.days[open.date], todayKey) : "other";
        say(outcome === "completed" ? "savedOmad" : "savedMeal");
        navigator.vibrate?.(12);
      },
      requestCancel: () => setSheet({ type: "cancel-meal" }),
      addWater: (delta) => setData((current) => current && addWater(current, delta, Date.now())),
      setMood: (mood) => setData((current) => current && setMood(current, mood, Date.now())),
      setNotes: (notes) => setData((current) => current && setNotes(current, notes, Date.now())),
      setWeight: (kg) => setData((current) => current && setWeight(current, kg, Date.now())),
      setMealText: (date, mealId, text) => setData((current) => current && setMealDescription(current, date, mealId, text)),
      updateSettings: (patch) => setData((current) => current && patchSettings(current, patch, Date.now())),
      setTheme: (theme) => setData((current) => current && patchSettings(current, { theme }, Date.now())),
      setLang: (next) => setData((current) => current && patchSettings(current, { lang: next }, Date.now())),
      enableNotifications: async (on) => {
        if (!on) {
          setData((current) => current && patchSettings(current, { notifications: false }, Date.now()));
          return;
        }
        if (typeof Notification === "undefined") {
          say("notifUnsupported");
          return;
        }
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          setData((current) => current && patchSettings(current, { notifications: false }, Date.now()));
          say("notifDenied");
          return;
        }
        setData((current) => current && patchSettings(current, { notifications: true }, Date.now()));
        say("notifGranted");
      },
      exportJson: () => {
        const blob = new Blob([serialize(data)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `omad-backup-${localDateKey(new Date())}.json`;
        link.click();
        URL.revokeObjectURL(url);
      },
      exportExcel: async () => {
        try {
          await downloadExcel(data);
        } catch {
          say("exportFail");
        }
      },
      beginImport: (text) => {
        try {
          const parsed = parseBackup(JSON.parse(text));
          if (!parsed.ok) {
            say("importBad");
            return;
          }
          setSheet({ type: "import", data: parsed.data, count: Object.keys(parsed.data.days).length });
        } catch {
          say("importBad");
        }
      },
      requestClear: () => setSheet({ type: "clear" }),
      confirmClear: () => {
        setData(emptyPersisted());
        setSheet(null);
        say("cleared");
      },
      confirmOff: () => {
        setData((current) => current && deactivateToday(current, Date.now()));
        setSheet(null);
      },
      confirmCancel: () => {
        setData((current) => current && cancelOpenMeal(current, Date.now()));
        setSheet(null);
      },
      confirmImport: () => {
        if (sheet?.type !== "import") return;
        setData(sheet.data);
        setSheet(null);
        say("importOk");
      },
      commitDay: (day) => {
        const result = saveDay(data, day);
        if (result.error) return;
        setData(result.data);
        setSheet(null);
        say("saved");
      },
      deleteDay: (date) => {
        setData((current) => current && removeDay(current, date));
        setSheet(null);
      },
      canInstall: Boolean(installEvent),
      install: async () => {
        if (!installEvent) return;
        await installEvent.prompt();
        setInstallEvent(null);
      },
    };
  }, [banner, data, installEvent, sheet, view]);

  if (!data || !api) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-fg">
        <div className="text-center">
          <Mark className="mx-auto size-14 text-fast" />
          <p className="mt-3 text-lg font-semibold">OMAD Tracker</p>
        </div>
      </div>
    );
  }

  const lang = data.settings.lang;

  return (
    <OmadProvider value={api}>
      <div className="min-h-dvh lg:flex">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-6 border-r border-line bg-surface/80 px-4 py-6 backdrop-blur-md lg:flex">
          <div className="flex items-center gap-3 px-2">
            <Mark className="size-9 text-fast" />
            <div>
              <p className="font-semibold">{t(lang, "appName")}</p>
              <p className="text-xs text-muted">{t(lang, "tagline")}</p>
            </div>
          </div>
          <nav className="grid gap-1" aria-label="main">
            {NAV.map((item) => {
              const Icon = item.icon;
              const on = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setView(item.id)}
                  className={cn("flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-medium press", on ? "bg-fast-fill text-on-accent" : "text-fg")}
                >
                  <Icon className="size-5" />
                  {t(lang, item.label)}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-md">
            <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center gap-3 px-4 py-2 lg:px-8">
              <Mark className="size-8 text-fast lg:hidden" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold lg:text-base">{t(lang, "appName")}</p>
                <p className="truncate text-xs text-muted">{formatPrettyDate(localDateKey(new Date(now)), lang, true)}</p>
              </div>
              <button
                type="button"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 press"
                aria-label={t(lang, "exportJson")}
                onClick={api.exportJson}
              >
                <FileJson className="size-5" />
              </button>
              <button
                type="button"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 press"
                aria-label={t(lang, "exportExcel")}
                onClick={() => void api.exportExcel()}
              >
                <FileSpreadsheet className="size-5" />
              </button>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full press"
                aria-label={t(lang, "themeToggle")}
                onClick={() => api.setTheme(data.settings.theme === "dark" ? "light" : "dark")}
              >
                {data.settings.theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <button type="button" className="grid size-11 place-items-center rounded-full press lg:hidden" aria-label={t(lang, "settings")} onClick={() => setView("settings")}>
                <Settings className="size-5" />
              </button>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl px-4 pt-4 pb-28 lg:px-8 lg:pb-10">
            <div key={view} className="rise">
              {view === "home" ? <HomeView now={now} /> : null}
              {view === "calendar" ? <CalendarView now={now} /> : null}
              {view === "stats" ? <StatsView now={now} /> : null}
              {view === "history" ? <HistoryView now={now} /> : null}
              {view === "settings" ? <SettingsView /> : null}
            </div>
          </main>

          <nav
            className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/90 backdrop-blur-md lg:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            aria-label="main"
          >
            <div className="mx-auto grid max-w-lg grid-cols-5">
              {NAV.map((item) => {
                const Icon = item.icon;
                const on = view === item.id;
                return (
                  <button key={item.id} type="button" onClick={() => setView(item.id)} className={cn("relative flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium", on ? "text-fast" : "text-muted")}>
                    <span className={cn("absolute top-0 h-0.5 w-8 rounded-full bg-fast-fill", on ? "opacity-100" : "opacity-0")} />
                    <Icon className="size-5" />
                    {t(lang, item.label)}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {banner ? (
        <div role="status" className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-done-fill px-4 py-2 text-sm font-semibold text-on-accent shadow">
          {banner}
        </div>
      ) : null}

      <DaySheet now={now} />
      <Sheet open={sheet?.type === "off"} title={t(lang, "confirmOffTitle")} description={t(lang, "confirmOffBody")} onClose={() => setSheet(null)}>
        <div className="grid gap-2">
          <button type="button" className="min-h-12 rounded-full bg-fast-fill text-sm font-semibold text-on-accent press" onClick={api.confirmOff}>
            {t(lang, "confirmOffYes")}
          </button>
          <button type="button" className="min-h-11 text-sm font-medium press" onClick={() => setSheet(null)}>
            {t(lang, "stay")}
          </button>
        </div>
      </Sheet>
      <Sheet open={sheet?.type === "cancel-meal"} title={t(lang, "confirmCancelTitle")} description={t(lang, "confirmCancelBody")} onClose={() => setSheet(null)}>
        <div className="grid gap-2">
          <button type="button" className="min-h-12 rounded-full bg-eat-fill text-sm font-semibold text-on-accent press" onClick={api.confirmCancel}>
            {t(lang, "confirmCancelYes")}
          </button>
          <button type="button" className="min-h-11 text-sm font-medium press" onClick={() => setSheet(null)}>
            {t(lang, "back")}
          </button>
        </div>
      </Sheet>
      <Sheet open={sheet?.type === "clear"} title={t(lang, "confirmClearTitle")} description={t(lang, "confirmClearBody")} onClose={() => setSheet(null)}>
        <div className="grid gap-2">
          <button type="button" className="min-h-12 rounded-full bg-eat-fill text-sm font-semibold text-on-accent press" onClick={api.confirmClear}>
            {t(lang, "confirmClearYes")}
          </button>
          <button type="button" className="min-h-11 text-sm font-medium press" onClick={() => setSheet(null)}>
            {t(lang, "back")}
          </button>
        </div>
      </Sheet>
      <Sheet
        open={sheet?.type === "import"}
        title={t(lang, "importTitle")}
        description={t(lang, "importBody", { count: sheet?.type === "import" ? sheet.count : 0 })}
        onClose={() => setSheet(null)}
      >
        <div className="grid gap-2">
          <button type="button" className="min-h-12 rounded-full bg-fast-fill text-sm font-semibold text-on-accent press" onClick={api.confirmImport}>
            {t(lang, "importYes")}
          </button>
          <button type="button" className="min-h-11 text-sm font-medium press" onClick={() => setSheet(null)}>
            {t(lang, "back")}
          </button>
        </div>
      </Sheet>
    </OmadProvider>
  );
}
