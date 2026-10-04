import { createContext, useContext, type ReactNode } from "react";
import type { DayRecord, Lang, Mood, Persisted, Settings, SheetState, Theme, ViewId } from "@/lib/omad/types";

export type OmadApi = {
  data: Persisted;
  view: ViewId;
  setView: (view: ViewId) => void;
  sheet: SheetState;
  closeSheet: () => void;
  openDay: (date: string) => void;
  activate: () => void;
  requestOff: (force?: boolean) => void;
  startEat: () => void;
  stopEat: () => void;
  requestCancel: () => void;
  addWater: (delta: number) => void;
  setMood: (mood: Mood | null) => void;
  setNotes: (notes: string) => void;
  setWeight: (kg: number | null) => void;
  setMealText: (date: string, mealId: string, text: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  setTheme: (theme: Theme) => void;
  setLang: (lang: Lang) => void;
  enableNotifications: (on: boolean) => Promise<void>;
  exportJson: () => void;
  beginImport: (text: string) => void;
  requestClear: () => void;
  confirmClear: () => void;
  confirmOff: () => void;
  confirmCancel: () => void;
  confirmImport: () => void;
  commitDay: (day: DayRecord) => void;
  deleteDay: (date: string) => void;
  canInstall: boolean;
  install: () => Promise<void>;
  banner: string | null;
};

const OmadContext = createContext<OmadApi | null>(null);

export function OmadProvider({ value, children }: { value: OmadApi; children: ReactNode }) {
  return <OmadContext.Provider value={value}>{children}</OmadContext.Provider>;
}

export function useOmad() {
  const value = useContext(OmadContext);
  if (!value) throw new Error("OMAD context missing");
  return value;
}
