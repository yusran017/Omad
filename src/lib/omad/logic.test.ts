import assert from "node:assert/strict";
import test from "node:test";
import { derive, formatHMS, localDateKey, parseBackup, present, scoreDay, suggestFastingStart } from "./logic.ts";
import { addFastLog, carryOpenFast } from "./actions.ts";
import type { DayRecord, Persisted } from "./types.ts";
import { defaultSettings } from "./types.ts";

function day(partial: Partial<DayRecord> & Pick<DayRecord, "date">): DayRecord {
  return {
    active: true,
    rest: false,
    fastingStart: null,
    meals: [],
    targetFastingMinutes: 20 * 60,
    targetEatingMinutes: 60,
    notes: "",
    waterMl: 0,
    weightKg: null,
    mood: null,
    logs: [],
    mealDraft: "",
    ...partial,
  };
}

test("continuous fast across midnight matches 18:42", () => {
  const start = new Date(2026, 9, 3, 18, 30);
  const now = new Date(2026, 9, 4, 13, 12);
  const record = day({
    date: "2026-10-04",
    fastingStart: start.toISOString(),
  });
  const derived = derive(record, now.getTime(), localDateKey(now));
  assert.equal(derived.phase, "fasting");
  assert.equal(formatHMS(derived.phaseElapsedMs), "18:42:00");
  assert.equal(derived.outcome, "in_progress");
});

test("eating window and overtime", () => {
  const now = new Date(2026, 9, 4, 15, 45, 20);
  const record = day({
    date: localDateKey(now),
    fastingStart: new Date(2026, 9, 3, 18, 0).toISOString(),
    meals: [
      {
        id: "m1",
        start: new Date(2026, 9, 4, 14, 30).toISOString(),
        end: null,
        description: "",
        notes: "",
        calories: null,
      },
    ],
  });
  const derived = derive(record, now.getTime(), localDateKey(now));
  assert.equal(derived.phase, "eating");
  assert.equal(formatHMS(derived.phaseElapsedMs), "01:15:20");
  assert.ok(derived.remainingMs < 0);
});

test("one finished meal is completed and starts a new fast", () => {
  const now = new Date(2026, 9, 4, 16, 0);
  const record = day({
    date: localDateKey(now),
    fastingStart: new Date(2026, 9, 3, 18, 0).toISOString(),
    meals: [
      {
        id: "m1",
        start: new Date(2026, 9, 4, 14, 0).toISOString(),
        end: new Date(2026, 9, 4, 15, 0).toISOString(),
        description: "rice",
        notes: "",
        calories: null,
      },
    ],
  });
  const derived = derive(record, now.getTime(), localDateKey(now));
  assert.equal(derived.outcome, "completed");
  assert.equal(derived.phase, "fasting");
  assert.equal(formatHMS(derived.fastingMs), "20:00:00");
  assert.equal(formatHMS(derived.newFastMs), "01:00:00");
});

test("inactive is not a miss outcome", () => {
  const now = new Date(2026, 9, 4, 12, 0);
  const view = present({}, now.getTime());
  assert.equal(view.mode, "inactive");
});

test("suggest fasting start uses a recent meal end", () => {
  const now = new Date(2026, 9, 4, 12, 0).getTime();
  const end = new Date(2026, 9, 3, 15, 0).toISOString();
  const days = {
    "2026-10-03": day({
      date: "2026-10-03",
      meals: [{ id: "m", start: new Date(2026, 9, 3, 14, 0).toISOString(), end, description: "", notes: "", calories: null }],
    }),
  };
  assert.equal(suggestFastingStart(days, now), new Date(end).toISOString());
});

test("rejects a backup that is not an object of days", () => {
  assert.equal(parseBackup(null).ok, false);
  assert.equal(parseBackup([]).ok, false);
  const parsed = parseBackup({ version: 1, settings: { lang: "en", theme: "light" }, days: {} });
  assert.equal(parsed.ok, true);
  if (parsed.ok) {
    assert.equal(parsed.data.settings.lang, "en");
    assert.equal(parsed.data.settings.plan, defaultSettings.plan);
  }
});

test("one meal inside an hour stays inside OMAD even if the fast is short", () => {
  const now = new Date(2026, 9, 4, 16, 0);
  const record = day({
    date: localDateKey(now),
    fastingStart: new Date(2026, 9, 4, 8, 0).toISOString(),
    meals: [
      {
        id: "m1",
        start: new Date(2026, 9, 4, 14, 0).toISOString(),
        end: new Date(2026, 9, 4, 14, 40).toISOString(),
        description: "",
        notes: "",
        calories: null,
      },
    ],
  });
  assert.equal(derive(record, now.getTime(), localDateKey(now)).outcome, "completed");
});

test("a meal longer than one hour falls out of OMAD", () => {
  const now = new Date(2026, 9, 4, 16, 0);
  const record = day({
    date: localDateKey(now),
    fastingStart: new Date(2026, 9, 3, 18, 0).toISOString(),
    meals: [
      {
        id: "m1",
        start: new Date(2026, 9, 4, 13, 0).toISOString(),
        end: new Date(2026, 9, 4, 14, 30).toISOString(),
        description: "",
        notes: "",
        calories: null,
      },
    ],
  });
  assert.equal(derive(record, now.getTime(), localDateKey(now)).outcome, "over");
});

test("one meal inside an hour after a long fast is an OMAD win", () => {
  const now = new Date(2026, 9, 4, 16, 0);
  const record = day({
    date: localDateKey(now),
    fastingStart: new Date(2026, 9, 3, 18, 0).toISOString(),
    meals: [
      {
        id: "m1",
        start: new Date(2026, 9, 4, 14, 0).toISOString(),
        end: new Date(2026, 9, 4, 14, 40).toISOString(),
        description: "soup",
        notes: "",
        calories: null,
      },
    ],
  });
  const score = scoreDay(record, now.getTime(), localDateKey(now));
  assert.equal(score.mealOk, true);
  assert.equal(score.omadWin, true);
  assert.equal(score.eatMinutes, 40);
});

test("eating past one hour is not a win", () => {
  const now = new Date(2026, 9, 4, 16, 0);
  const record = day({
    date: localDateKey(now),
    fastingStart: new Date(2026, 9, 3, 16, 0).toISOString(),
    meals: [
      {
        id: "m1",
        start: new Date(2026, 9, 4, 13, 0).toISOString(),
        end: new Date(2026, 9, 4, 15, 10).toISOString(),
        description: "rice",
        notes: "",
        calories: null,
      },
    ],
  });
  const score = scoreDay(record, now.getTime(), localDateKey(now));
  assert.equal(score.overTarget, true);
  assert.equal(score.omadWin, false);
});

test("weight log keeps the home fast start, not the weigh-in time", () => {
  const start = new Date(2026, 9, 3, 20, 0).toISOString();
  const now = new Date(2026, 9, 4, 14, 0).getTime();
  const persisted: Persisted = {
    app: "omad-tracker",
    version: 1,
    settings: { ...defaultSettings },
    days: {
      "2026-10-03": day({ date: "2026-10-03", fastingStart: start }),
    },
  };
  const carried = carryOpenFast(persisted, now);
  assert.equal(carried.days["2026-10-04"]?.fastingStart, start);
  const saved = addFastLog(carried, { notes: "เช้า", mood: "good", weightKg: 70.4 }, now);
  const log = saved.days["2026-10-04"]?.logs[0];
  assert.equal(log?.fastingStart, start);
  assert.ok((log?.fastingMs ?? 0) > 17 * 3_600_000);
  assert.notEqual(log?.at, start);
});
