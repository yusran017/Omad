import type { DayRecord, Lang, Meal, Outcome, Persisted, RangeId, Settings } from "./types.ts";
import { defaultSettings, emptyPersisted } from "./types.ts";

export function localDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function dateFromKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y || 1970, (m || 1) - 1, d || 1, 12, 0, 0, 0);
}

export function addDays(key: string, amount: number): string {
  const date = dateFromKey(key);
  date.setDate(date.getDate() + amount);
  return localDateKey(date);
}

export function endOfDay(key: string): number {
  const date = dateFromKey(key);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
}

export function formatHMS(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function formatWords(ms: number, lang: Lang): string {
  if (ms > 0 && ms < 60_000) {
    const seconds = Math.max(1, Math.round(ms / 1000));
    return lang === "th" ? `${seconds} วินาที` : `${seconds}s`;
  }
  const totalMin = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (lang === "th") return h <= 0 ? `${m} นาที` : `${h} ชม. ${m} นาที`;
  return h <= 0 ? `${m} min` : `${h}h ${m}m`;
}

export function formatHours(minutes: number, lang: Lang): string {
  const rounded = Math.round((minutes / 60) * 10) / 10;
  const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return lang === "th" ? `${label} ชม.` : `${label} h`;
}

export function formatHourNumber(hours: number, lang: Lang): string {
  if (hours > 0 && hours < 1) return formatWords(hours * 3_600_000, lang);
  const rounded = Math.round(hours * 10) / 10;
  const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return lang === "th" ? `${label} ชม.` : `${label} h`;
}

export function formatPrettyDate(key: string, lang: Lang, withYear = false): string {
  return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" as const } : {}),
  }).format(dateFromKey(key));
}

export function formatTime(iso: string | null, lang: Lang): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

export function formatWhen(iso: string, lang: Lang, todayKey: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const key = localDateKey(date);
  const time = formatTime(iso, lang);
  if (key === todayKey) return time;
  if (key === addDays(todayKey, -1)) return lang === "th" ? `เมื่อวาน ${time}` : `Yesterday ${time}`;
  return `${formatPrettyDate(key, lang)} ${time}`;
}

export function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}`;
}

export function fromLocalInput(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function monthMatrix(year: number, monthIndex: number): (string | null)[] {
  const first = new Date(year, monthIndex, 1);
  const cells: (string | null)[] = Array.from({ length: first.getDay() }, () => null);
  const count = new Date(year, monthIndex + 1, 0).getDate();
  for (let day = 1; day <= count; day += 1) cells.push(localDateKey(new Date(year, monthIndex, day)));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function monthTitle(year: number, monthIndex: number, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, monthIndex, 1));
}

export type Derived = {
  phase: "inactive" | "rest" | "fasting" | "eating";
  outcome: Outcome;
  phaseElapsedMs: number;
  phaseTargetMs: number;
  remainingMs: number;
  progress: number;
  fastingMs: number;
  eatingMs: number;
  newFastMs: number;
  openMeal: Meal | null;
  fastingStart: string | null;
};

const EMPTY_DERIVED: Derived = {
  phase: "inactive",
  outcome: "not_active",
  phaseElapsedMs: 0,
  phaseTargetMs: 0,
  remainingMs: 0,
  progress: 0,
  fastingMs: 0,
  eatingMs: 0,
  newFastMs: 0,
  openMeal: null,
  fastingStart: null,
};

export function dayOutcome(day: DayRecord | undefined, todayKey: string): Outcome {
  if (!day) return "not_active";
  if (day.rest) return "rest";
  if (!day.active) return "not_active";
  const open = day.meals.some((meal) => !meal.end);
  if (day.meals.length > 1) return "multiple";
  if (day.meals.length === 1 && !open) return "completed";
  if (day.date === todayKey) return "in_progress";
  return "other";
}

export function derive(day: DayRecord | null | undefined, now: number, todayKey: string): Derived {
  if (!day) return { ...EMPTY_DERIVED };

  const meals = day.meals
    .filter((meal) => Number.isFinite(Date.parse(meal.start)))
    .slice()
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  const open = meals.find((meal) => !meal.end) ?? null;
  const closed = meals.filter((meal) => meal.end && Number.isFinite(Date.parse(meal.end)));
  const fastStartMs = day.fastingStart ? Date.parse(day.fastingStart) : NaN;
  const firstStart = meals[0] ? Date.parse(meals[0].start) : NaN;

  let eatingMs = 0;
  for (const meal of meals) {
    const start = Date.parse(meal.start);
    const end = meal.end ? Date.parse(meal.end) : now;
    if (Number.isFinite(start) && Number.isFinite(end) && end > start) eatingMs += end - start;
  }

  const fastingMs = Number.isFinite(fastStartMs)
    ? Math.max(0, (Number.isFinite(firstStart) ? firstStart : now) - fastStartMs)
    : 0;
  const lastClosed = closed.slice().sort((a, b) => Date.parse(a.end ?? "") - Date.parse(b.end ?? "")).at(-1) ?? null;
  const newFastMs = !open && lastClosed?.end ? Math.max(0, now - Date.parse(lastClosed.end)) : 0;

  let phase: Derived["phase"] = "inactive";
  if (open) phase = "eating";
  else if (day.rest) phase = "rest";
  else if (day.active) phase = "fasting";

  const phaseTargetMs = (phase === "eating" ? day.targetEatingMinutes : day.targetFastingMinutes) * 60_000;
  const phaseElapsedMs = phase === "eating" && open
    ? Math.max(0, now - Date.parse(open.start))
    : phase === "fasting"
      ? (lastClosed?.end ? newFastMs : fastingMs)
      : 0;

  return {
    phase,
    outcome: dayOutcome(day, todayKey),
    phaseElapsedMs,
    phaseTargetMs,
    remainingMs: phase === "inactive" || phase === "rest" ? 0 : phaseTargetMs - phaseElapsedMs,
    progress: phase === "inactive" || phase === "rest" || phaseTargetMs <= 0 ? 0 : phaseElapsedMs / phaseTargetMs,
    fastingMs,
    eatingMs,
    newFastMs,
    openMeal: open,
    fastingStart: day.fastingStart,
  };
}

/** Continuous fast may start the previous calendar day, after the last meal. */
export function suggestFastingStart(days: Record<string, DayRecord>, now: number): string {
  const windowMs = 36 * 60 * 60 * 1000;
  let best = -Infinity;
  let iso: string | null = null;
  for (const day of Object.values(days)) {
    for (const meal of day.meals) {
      if (!meal.end) continue;
      const stamp = Date.parse(meal.end);
      if (!Number.isFinite(stamp) || stamp > now || now - stamp > windowMs || stamp <= best) continue;
      best = stamp;
      iso = new Date(stamp).toISOString();
    }
  }
  return iso ?? new Date(now).toISOString();
}

export function findOpenMeal(days: Record<string, DayRecord>, now: number): { date: string; meal: Meal } | null {
  let best: { date: string; meal: Meal; stamp: number } | null = null;
  for (const day of Object.values(days)) {
    for (const meal of day.meals) {
      if (meal.end) continue;
      const stamp = Date.parse(meal.start);
      if (!Number.isFinite(stamp) || now - stamp > 18 * 60 * 60 * 1000) continue;
      if (!best || stamp > best.stamp) best = { date: day.date, meal, stamp };
    }
  }
  return best ? { date: best.date, meal: best.meal } : null;
}

export type Mode = "eating" | "fasting" | "inactive" | "rest";

export function present(days: Record<string, DayRecord>, now: number): {
  mode: Mode;
  todayKey: string;
  today: DayRecord | null;
  focusDate: string | null;
  derived: Derived | null;
} {
  const todayKey = localDateKey(new Date(now));
  const today = days[todayKey] ?? null;
  const open = findOpenMeal(days, now);
  if (open) {
    return {
      mode: "eating",
      todayKey,
      today,
      focusDate: open.date,
      derived: derive(days[open.date], now, todayKey),
    };
  }
  if (today?.rest) {
    return { mode: "rest", todayKey, today, focusDate: todayKey, derived: derive(today, now, todayKey) };
  }
  if (!today?.active) {
    return { mode: "inactive", todayKey, today, focusDate: null, derived: null };
  }
  return { mode: "fasting", todayKey, today, focusDate: todayKey, derived: derive(today, now, todayKey) };
}

export function shouldConfirmOff(day: DayRecord | undefined, now: number): boolean {
  if (!day?.active) return false;
  if (day.meals.length > 0) return true;
  if (!day.fastingStart) return false;
  return now - Date.parse(day.fastingStart) > 60_000;
}

export function fastSample(day: DayRecord | undefined, now: number, todayKey: string): { hours: number; counted: boolean } {
  if (!day?.active || day.rest || !day.fastingStart) return { hours: 0, counted: false };
  const start = Date.parse(day.fastingStart);
  if (!Number.isFinite(start)) return { hours: 0, counted: false };
  const first = day.meals.map((meal) => Date.parse(meal.start)).filter(Number.isFinite).sort((a, b) => a - b)[0];
  if (first) return { hours: Math.max(0, (first - start) / 3_600_000), counted: true };
  if (day.date === todayKey) return { hours: Math.max(0, (now - start) / 3_600_000), counted: true };
  const from = Math.max(start, dateFromKey(day.date).setHours(0, 0, 0, 0));
  return { hours: Math.max(0, (endOfDay(day.date) - from) / 3_600_000), counted: false };
}

export type Stats = {
  avgFastHours: number | null;
  longestFastHours: number;
  avgEatHours: number | null;
  completed: number;
  inProgress: number;
  notActive: number;
  multiple: number;
  rest: number;
  other: number;
  consistency: number | null;
  bars: { date: string; hours: number; outcome: Outcome }[];
};

export function listRange(days: Record<string, DayRecord>, range: RangeId, now: number): string[] {
  const today = localDateKey(new Date(now));
  if (range === "all") {
    const keys = Object.keys(days).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key)).sort();
    const start = keys[0] ?? today;
    const out: string[] = [];
    let cursor = start;
    for (let i = 0; i < 4000 && cursor <= today; i += 1) {
      out.push(cursor);
      cursor = addDays(cursor, 1);
    }
    return out;
  }
  const count = Number(range);
  const out: string[] = [];
  for (let i = count - 1; i >= 0; i -= 1) out.push(addDays(today, -i));
  return out;
}

export function computeStats(days: Record<string, DayRecord>, range: RangeId, now: number): Stats {
  const today = localDateKey(new Date(now));
  const keys = listRange(days, range, now);
  const stats: Stats = {
    avgFastHours: null,
    longestFastHours: 0,
    avgEatHours: null,
    completed: 0,
    inProgress: 0,
    notActive: 0,
    multiple: 0,
    rest: 0,
    other: 0,
    consistency: null,
    bars: [],
  };
  let fastSum = 0;
  let fastN = 0;
  let eatSum = 0;
  let eatN = 0;

  for (const key of keys) {
    const day = days[key];
    const outcome = dayOutcome(day, today);
    stats[outcome === "not_active" ? "notActive" : outcome === "in_progress" ? "inProgress" : outcome] += 1;
    const sample = fastSample(day, now, today);
    stats.bars.push({ date: key, hours: Math.round(sample.hours * 10) / 10, outcome });
    if (sample.counted) {
      fastSum += sample.hours;
      fastN += 1;
      if (sample.hours > stats.longestFastHours) stats.longestFastHours = sample.hours;
    }
    if (day && day.meals.length > 0) {
      const asOf = key === today ? now : Math.min(now, endOfDay(key));
      eatSum += derive(day, asOf, today).eatingMs / 3_600_000;
      eatN += 1;
    }
  }

  stats.avgFastHours = fastN ? fastSum / fastN : null;
  stats.avgEatHours = eatN ? eatSum / eatN : null;
  const tracked = stats.completed + stats.multiple + stats.other;
  stats.consistency = tracked ? stats.completed / tracked : null;
  return stats;
}

export function validateDay(day: DayRecord): "meal_order" | "fast_after_meal" | null {
  const meals = day.meals.slice().sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  for (const meal of meals) {
    const start = Date.parse(meal.start);
    if (!Number.isFinite(start)) return "meal_order";
    if (meal.end) {
      const end = Date.parse(meal.end);
      if (!Number.isFinite(end) || end < start) return "meal_order";
    }
  }
  if (day.fastingStart && meals[0] && Date.parse(day.fastingStart) > Date.parse(meals[0].start)) return "fast_after_meal";
  return null;
}

const MOODS = new Set(["good", "normal", "tired", "difficult", "strong"]);
const PLANS = new Set(["16:8", "18:6", "20:4", "omad", "custom"]);

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

function numOrNull(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

function normalizeMeal(value: unknown): Meal | null {
  if (!value || typeof value !== "object") return null;
  const meal = value as Partial<Meal>;
  if (typeof meal.start !== "string" || !Number.isFinite(Date.parse(meal.start))) return null;
  const end = typeof meal.end === "string" && Number.isFinite(Date.parse(meal.end)) ? meal.end : null;
  const calories = numOrNull(meal.calories);
  return {
    id: typeof meal.id === "string" && meal.id ? meal.id : crypto.randomUUID(),
    start: meal.start,
    end,
    description: clip(meal.description, 500),
    notes: clip(meal.notes, 500),
    calories: calories === null ? null : Math.max(0, Math.min(20000, calories)),
  };
}

function normalizeDay(value: unknown, key: string): DayRecord | null {
  if (!value || typeof value !== "object") return null;
  const day = value as Partial<DayRecord>;
  const date = typeof day.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day.date) ? day.date : key;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const meals = Array.isArray(day.meals) ? day.meals.map(normalizeMeal).filter((meal): meal is Meal => Boolean(meal)).slice(0, 12) : [];
  const weight = numOrNull(day.weightKg);
  return {
    date,
    active: Boolean(day.active),
    rest: Boolean(day.rest),
    fastingStart: typeof day.fastingStart === "string" && Number.isFinite(Date.parse(day.fastingStart)) ? day.fastingStart : null,
    meals,
    targetFastingMinutes: clampNum(day.targetFastingMinutes, 60, 72 * 60, defaultSettings.targetFastingMinutes),
    targetEatingMinutes: clampNum(day.targetEatingMinutes, 15, 16 * 60, defaultSettings.targetEatingMinutes),
    notes: clip(day.notes, 2000),
    waterMl: clampNum(day.waterMl, 0, 20000, 0),
    weightKg: weight === null ? null : Math.max(20, Math.min(400, Math.round(weight * 10) / 10)),
    mood: typeof day.mood === "string" && MOODS.has(day.mood) ? (day.mood as DayRecord["mood"]) : null,
  };
}

function clampNum(value: unknown, min: number, max: number, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

export function parseBackup(input: unknown): { ok: true; data: Persisted } | { ok: false } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false };
  const raw = input as Partial<Persisted> & { settings?: Partial<Settings> };
  if (raw.version !== undefined && raw.version !== 1) return { ok: false };
  if (!raw.days || typeof raw.days !== "object" || Array.isArray(raw.days)) return { ok: false };
  const settingsIn = (raw.settings ?? {}) as Partial<Settings>;
  const settings: Settings = {
    ...defaultSettings,
    theme: settingsIn.theme === "light" ? "light" : "dark",
    lang: settingsIn.lang === "en" ? "en" : "th",
    plan: typeof settingsIn.plan === "string" && PLANS.has(settingsIn.plan) ? (settingsIn.plan as Settings["plan"]) : defaultSettings.plan,
    targetFastingMinutes: clampNum(settingsIn.targetFastingMinutes, 60, 72 * 60, defaultSettings.targetFastingMinutes),
    targetEatingMinutes: clampNum(settingsIn.targetEatingMinutes, 15, 16 * 60, defaultSettings.targetEatingMinutes),
    preferredEatingTime: typeof settingsIn.preferredEatingTime === "string" && /^\d{2}:\d{2}$/.test(settingsIn.preferredEatingTime)
      ? settingsIn.preferredEatingTime
      : defaultSettings.preferredEatingTime,
    notifications: Boolean(settingsIn.notifications),
    eatingReminder: settingsIn.eatingReminder !== false,
    fastingGoalReminder: settingsIn.fastingGoalReminder !== false,
    waterEnabled: settingsIn.waterEnabled !== false,
    waterGoalMl: clampNum(settingsIn.waterGoalMl, 250, 8000, defaultSettings.waterGoalMl),
    weightEnabled: Boolean(settingsIn.weightEnabled),
  };
  const days: Record<string, DayRecord> = {};
  for (const [key, value] of Object.entries(raw.days)) {
    const day = normalizeDay(value, key);
    if (day) days[day.date] = day;
  }
  return { ok: true, data: { app: "omad-tracker", version: 1, settings, days } };
}

export function serialize(data: Persisted): string {
  return JSON.stringify({ ...data, exportedAt: new Date().toISOString() }, null, 2);
}

export type Notice = { id: string; title: string; body: string };

export function dueNotices(data: Persisted, now: number, seen: Set<string>, prime: boolean): Notice[] {
  const out: Notice[] = [];
  const { settings } = data;
  if (!settings.notifications) return out;
  const todayKey = localDateKey(new Date(now));
  const day = data.days[todayKey];
  const open = findOpenMeal(data.days, now);
  const th = settings.lang === "th";

  if (settings.eatingReminder && day?.active && !open && day.meals.length === 0) {
    const [hh, mm] = settings.preferredEatingTime.split(":").map(Number);
    if (Number.isFinite(hh) && Number.isFinite(mm)) {
      const when = new Date(now);
      when.setHours(hh ?? 0, mm ?? 0, 0, 0);
      const delta = now - when.getTime();
      const id = `eat:${todayKey}`;
      if (delta >= 0 && delta < 120_000 && !seen.has(id)) {
        seen.add(id);
        if (!prime) {
          out.push({
            id,
            title: th ? "ถึงเวลาช่วงกิน" : "Eating window",
            body: th ? `เวลาที่ตั้งไว้ ${settings.preferredEatingTime}` : `Preferred time ${settings.preferredEatingTime}`,
          });
        }
      } else if (prime && delta >= 120_000) seen.add(id);
    }
  }

  if (settings.fastingGoalReminder && day?.active && !open && day.meals.length === 0 && day.fastingStart) {
    const remain = Date.parse(day.fastingStart) + day.targetFastingMinutes * 60_000 - now;
    const soonId = `soon:${todayKey}:${day.fastingStart}`;
    const hitId = `hit:${todayKey}:${day.fastingStart}`;
    if (prime) {
      if (remain < 14 * 60_000) seen.add(soonId);
      if (remain <= 0) seen.add(hitId);
    } else {
      if (remain <= 15 * 60_000 && remain > 0 && !seen.has(soonId)) {
        seen.add(soonId);
        out.push({
          id: soonId,
          title: th ? "ใกล้ถึงเป้าหมายการอดอาหาร" : "Fasting goal is close",
          body: th ? "อีกประมาณ 15 นาที ตามเวลาที่คุณตั้ง" : "About 15 minutes left on the time you set",
        });
      }
      if (remain <= 0 && remain > -120_000 && !seen.has(hitId)) {
        seen.add(hitId);
        out.push({
          id: hitId,
          title: th ? "ถึงเป้าหมายการอดอาหารแล้ว" : "Fasting goal reached",
          body: th ? "ครบเวลาที่คุณตั้งไว้" : "You reached the time you set",
        });
      }
    }
  }
  return out;
}

export function loadPersisted(raw: string | null): Persisted {
  if (!raw) return emptyPersisted();
  try {
    const parsed = parseBackup(JSON.parse(raw));
    return parsed.ok ? parsed.data : emptyPersisted();
  } catch {
    return emptyPersisted();
  }
}
