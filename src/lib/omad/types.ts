export type Lang = "th" | "en";
export type Theme = "light" | "dark";
export type PlanId = "16:8" | "18:6" | "20:4" | "omad" | "custom";
export type Mood = "good" | "normal" | "tired" | "difficult" | "strong";
export type Outcome = "completed" | "in_progress" | "not_active" | "multiple" | "rest" | "other";
export type ViewId = "home" | "calendar" | "stats" | "history" | "log" | "settings";
export type RangeId = "7" | "30" | "90" | "all";

export type Meal = {
  id: string;
  start: string;
  end: string | null;
  description: string;
  notes: string;
  calories: number | null;
};

export type FastLog = {
  id: string;
  at: string;
  fastingMs: number;
  notes: string;
  mood: Mood | null;
  weightKg: number | null;
};

export type DayRecord = {
  date: string;
  active: boolean;
  rest: boolean;
  fastingStart: string | null;
  meals: Meal[];
  targetFastingMinutes: number;
  targetEatingMinutes: number;
  notes: string;
  waterMl: number;
  weightKg: number | null;
  mood: Mood | null;
  logs: FastLog[];
};

export type Settings = {
  theme: Theme;
  lang: Lang;
  plan: PlanId;
  targetFastingMinutes: number;
  targetEatingMinutes: number;
  preferredEatingTime: string;
  notifications: boolean;
  eatingReminder: boolean;
  fastingGoalReminder: boolean;
  waterEnabled: boolean;
  waterGoalMl: number;
  weightEnabled: boolean;
};

export type Persisted = {
  app: "omad-tracker";
  version: 1;
  settings: Settings;
  days: Record<string, DayRecord>;
};

export type SheetState =
  | null
  | { type: "day"; date: string }
  | { type: "off" }
  | { type: "cancel-meal" }
  | { type: "clear" }
  | { type: "import"; data: Persisted; count: number };

export const STORAGE_KEY = "omad-tracker-v1";

export const defaultSettings: Settings = {
  theme: "dark",
  lang: "th",
  plan: "omad",
  targetFastingMinutes: 20 * 60,
  targetEatingMinutes: 60,
  preferredEatingTime: "14:00",
  notifications: false,
  eatingReminder: true,
  fastingGoalReminder: true,
  waterEnabled: true,
  waterGoalMl: 2500,
  weightEnabled: false,
};

export function emptyPersisted(): Persisted {
  return { app: "omad-tracker", version: 1, settings: { ...defaultSettings }, days: {} };
}
