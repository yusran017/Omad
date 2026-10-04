import { findOpenMeal, localDateKey, suggestFastingStart, validateDay } from "./logic.ts";
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
    meals: [...day.meals, meal],
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
  entry: { notes: string; mood: FastLog["mood"]; weightKg: number | null; fastingMs: number },
  now: number,
): Persisted {
  const key = localDateKey(new Date(now));
  const log: FastLog = {
    id: crypto.randomUUID(),
    at: new Date(now).toISOString(),
    fastingMs: Math.max(0, Math.round(entry.fastingMs)),
    notes: entry.notes.slice(0, 500),
    mood: entry.mood,
    weightKg: entry.weightKg,
  };
  return withDay(data, key, (day) => ({
    ...day,
    notes: log.notes || day.notes,
    mood: entry.mood ?? day.mood,
    weightKg: entry.weightKg ?? day.weightKg,
    logs: [...(day.logs ?? []), log].slice(-40),
  }));
}

export function setMealDescription(data: Persisted, date: string, mealId: string, description: string): Persisted {
  return withDay(data, date, (day) => ({
    ...day,
    meals: day.meals.map((meal) => (meal.id === mealId ? { ...meal, description: description.slice(0, 500) } : meal)),
  }));
}
