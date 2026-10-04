import { addDays, findOpenMeal, localDateKey, suggestFastingStart, validateDay } from "./logic.ts";
import type { DayRecord, FastLog, Meal, Persisted, Settings } from "./types.ts";

export function blankDay(date: string, settings: Settings): DayRecord {
  return {
    date,
    active: false,
    rest: false,
    fastingStart: null,
    meals: [],
    targetFastingMinutes: settings.targetFastingMinutes,
    targetEatingMinutes: settings.targetEatingMinutes,
    notes: "",
    waterMl: 0,
    weightKg: null,
    mood: null,
    logs: [],
    mealDraft: "",
  };
}

function withDay(data: Persisted, date: string, recipe: (day: DayRecord) => DayRecord): Persisted {
  const base = data.days[date] ?? blankDay(date, data.settings);
  return { ...data, days: { ...data.days, [date]: recipe(base) } };
}

export function activateToday(data: Persisted, now: number): Persisted {
  const key = localDateKey(new Date(now));
  return withDay(data, key, (day) => ({
    ...day,
    active: true,
    rest: false,
    fastingStart: day.fastingStart ?? suggestFastingStart(data.days, now),
    targetFastingMinutes: data.settings.targetFastingMinutes,
    targetEatingMinutes: data.settings.targetEatingMinutes,
  }));
}

export function deactivateToday(data: Persisted, now: number): Persisted {
  const key = localDateKey(new Date(now));
  if (!data.days[key]) return data;
  return withDay(data, key, (day) => ({ ...day, active: false }));
}

export function startEating(data: Persisted, now: number): Persisted {
  if (findOpenMeal(data.days, now)) return data;
  const key = localDateKey(new Date(now));
  const meal: Meal = {
    id: crypto.randomUUID(),
    start: new Date(now).toISOString(),
    end: null,
    description: "",
    notes: "",
    calories: null,
  };
  return withDay(data, key, (day) => ({
    ...day,
    active: true,
    rest: false,
    fastingStart: day.fastingStart ?? suggestFastingStart(data.days, now),
    targetFastingMinutes: data.settings.targetFastingMinutes,
    targetEatingMinutes: data.settings.targetEatingMinutes,
    mealDraft: "",
    meals: [...day.meals, { ...meal, description: day.mealDraft || "" }],
  }));
}

export function stopEating(data: Persisted, now: number): Persisted {
  const open = findOpenMeal(data.days, now);
  if (!open) return data;
  const end = new Date(now).toISOString();
  return withDay(data, open.date, (day) => ({
    ...day,
    meals: day.meals.map((meal) => (meal.id === open.meal.id ? { ...meal, end } : meal)),
  }));
}

export function cancelOpenMeal(data: Persisted, now: number): Persisted {
  const open = findOpenMeal(data.days, now);
  if (!open) return data;
  return withDay(data, open.date, (day) => ({
    ...day,
    meals: day.meals.filter((meal) => meal.id !== open.meal.id),
  }));
}

export function saveDay(data: Persisted, day: DayRecord): { data: Persisted; error: "meal_order" | "fast_after_meal" | null } {
  const error = validateDay(day);
  if (error) return { data, error };
  const meals = day.meals
    .map((meal) => ({
      ...meal,
      description: meal.description.slice(0, 500),
      notes: meal.notes.slice(0, 500),
    }))
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  const stored = data.days[day.date];
  const next = {
    ...day,
    meals,
    notes: day.notes.slice(0, 2000),
    waterMl: stored?.waterMl ?? day.waterMl,
    logs: stored?.logs ?? day.logs ?? [],
    mealDraft: (day.mealDraft ?? stored?.mealDraft ?? "").slice(0, 500),
  };
  return { data: { ...data, days: { ...data.days, [day.date]: next } }, error: null };
}

export function removeDay(data: Persisted, date: string): Persisted {
  const days = { ...data.days };
  delete days[date];
  return { ...data, days };
}

export function updateSettings(data: Persisted, patch: Partial<Settings>, now: number): Persisted {
  const settings = { ...data.settings, ...patch };
  const key = localDateKey(new Date(now));
  const today = data.days[key];
  if (!today || (!("targetFastingMinutes" in patch) && !("targetEatingMinutes" in patch))) {
    return { ...data, settings };
  }
  return {
    ...data,
    settings,
    days: {
      ...data.days,
      [key]: {
        ...today,
        targetFastingMinutes: settings.targetFastingMinutes,
        targetEatingMinutes: settings.targetEatingMinutes,
      },
    },
  };
}

export function addWater(data: Persisted, delta: number, now: number): Persisted {
  const key = localDateKey(new Date(now));
  return withDay(data, key, (day) => ({
    ...day,
    waterMl: Math.max(0, Math.min(20_000, day.waterMl + delta)),
  }));
}

export function setWeight(data: Persisted, kg: number | null, now: number): Persisted {
  const key = localDateKey(new Date(now));
  return withDay(data, key, (day) => ({ ...day, weightKg: kg }));
}

export function setMood(data: Persisted, mood: DayRecord["mood"], now: number): Persisted {
  const key = localDateKey(new Date(now));
  return withDay(data, key, (day) => ({ ...day, mood }));
}

export function setNotes(data: Persisted, notes: string, now: number): Persisted {
  const key = localDateKey(new Date(now));
  return withDay(data, key, (day) => ({ ...day, notes: notes.slice(0, 2000) }));
}

export function addFastLog(
  data: Persisted,
  entry: { notes: string; mood: FastLog["mood"]; weightKg: number | null },
  now: number,
): Persisted {
  const key = localDateKey(new Date(now));
  return withDay(data, key, (day) => {
    const startMs = day.fastingStart ? Date.parse(day.fastingStart) : NaN;
    const firstMeal = day.meals
      .map((meal) => Date.parse(meal.start))
      .filter((stamp) => Number.isFinite(stamp) && stamp <= now)
      .sort((a, b) => a - b)[0];
    const until = Number.isFinite(firstMeal) ? firstMeal : now;
    const fastingMs = Number.isFinite(startMs) ? Math.max(0, until - startMs) : 0;
    const log: FastLog = {
      id: crypto.randomUUID(),
      at: new Date(now).toISOString(),
      fastingStart: Number.isFinite(startMs) ? day.fastingStart : null,
      fastingMs,
      notes: entry.notes.slice(0, 500),
      mood: entry.mood,
      weightKg: entry.weightKg,
    };
    return {
      ...day,
      notes: log.notes || day.notes,
      mood: entry.mood ?? day.mood,
      weightKg: entry.weightKg ?? day.weightKg,
      logs: [...(day.logs ?? []), log].slice(-40),
    };
  });
}

export function setMealDraft(data: Persisted, text: string, now: number): Persisted {
  const key = localDateKey(new Date(now));
  return withDay(data, key, (day) => ({ ...day, mealDraft: text.slice(0, 500) }));
}

/** Old OMAD preset was 20 hours. The 24-hour day with a 1-hour meal is a 23-hour fast. */
export function upgradeOmadGoal(data: Persisted): Persisted {
  if (data.settings.plan !== "omad" || data.settings.targetFastingMinutes !== 20 * 60 || data.settings.targetEatingMinutes !== 60) return data;
  const days = { ...data.days };
  for (const [key, day] of Object.entries(days)) {
    if (day.targetFastingMinutes === 20 * 60 && day.targetEatingMinutes === 60) {
      days[key] = { ...day, targetFastingMinutes: 23 * 60 };
    }
  }
  return { ...data, settings: { ...data.settings, targetFastingMinutes: 23 * 60 }, days };
}

/** Keep a fast that started on Home running after midnight, with the same start time. */
export function carryOpenFast(data: Persisted, now: number): Persisted {
  const today = localDateKey(new Date(now));
  const existing = data.days[today];
  if (existing?.rest || existing?.fastingStart || (existing && !existing.active) || (existing?.meals.length ?? 0) > 0) return data;

  let cursor = addDays(today, -1);
  for (let i = 0; i < 3; i += 1) {
    const prev = data.days[cursor];
    cursor = addDays(cursor, -1);
    if (!prev) continue;
    if (prev.rest || !prev.active || !prev.fastingStart) return data;
    const startMs = Date.parse(prev.fastingStart);
    if (!Number.isFinite(startMs) || now < startMs || now - startMs > 72 * 3_600_000) return data;
    const ate = prev.meals.some((meal) => {
      const stamp = Date.parse(meal.start);
      return Number.isFinite(stamp) && stamp >= startMs;
    });
    if (ate) return data;
    const start = prev.fastingStart;
    return withDay(data, today, (day) => ({
      ...day,
      active: true,
      rest: false,
      fastingStart: start,
      targetFastingMinutes: prev.targetFastingMinutes,
      targetEatingMinutes: prev.targetEatingMinutes,
    }));
  }
  return data;
}

export function setMealDescription(data: Persisted, date: string, mealId: string, description: string): Persisted {
  return withDay(data, date, (day) => ({
    ...day,
    meals: day.meals.map((meal) => (meal.id === mealId ? { ...meal, description: description.slice(0, 500) } : meal)),
  }));
}
