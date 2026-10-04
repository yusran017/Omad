import type { Cell, CellObject, Sheet } from "write-excel-file/browser";
import { t } from "./i18n.ts";
import {
  computeStats,
  dateFromKey,
  dayOutcome,
  derive,
  endOfDay,
  fastBandLabel,
  fastSample,
  formatPrettyDate,
  listRange,
  localDateKey,
} from "./logic.ts";
import type { DayRecord, Lang, Mood, Outcome, Persisted } from "./types.ts";

const FONT = "Tahoma";
const INK = "#2a2118";
const CREAM = "#fbf6f0";
const PAPER = "#fffdfb";
const HEADER_BG = "#3a2a20";
const HEADER_FG = "#fff8f1";
const LABEL = "#6b5e54";
const LINE = "#c4b4a4";
const BAND = "#f3ebe3";
const SECTION = "#efe4d6";

const TONE: Record<Outcome, { bg: string; fg: string }> = {
  completed: { bg: "#e5f6ee", fg: "#146b42" },
  in_progress: { bg: "#fff1e0", fg: "#9a4e0c" },
  not_active: { bg: "#f6f1ea", fg: "#6b5e54" },
  multiple: { bg: "#fde8ee", fg: "#9a3450" },
  rest: { bg: "#e8f1fb", fg: "#1d5fa8" },
  other: { bg: "#fff6d8", fg: "#8a5a10" },
};

const MOOD_KEY: Record<Mood, "moodGood" | "moodNormal" | "moodTired" | "moodDifficult" | "moodStrong"> = {
  good: "moodGood",
  normal: "moodNormal",
  tired: "moodTired",
  difficult: "moodDifficult",
  strong: "moodStrong",
};

type Extras = Partial<CellObject> & { value?: string | number };

function cell(value: string | number | null | undefined, extras: Extras = {}): Cell {
  const missing = value === null || value === undefined;
  const numeric = typeof value === "number" && Number.isFinite(value);
  const { format, ...rest } = extras;
  return {
    fontFamily: FONT,
    fontSize: 11,
    alignVertical: "center",
    borderColor: LINE,
    borderStyle: "thin",
    backgroundColor: PAPER,
    textColor: INK,
    value: missing ? "—" : numeric ? value : String(value),
    type: numeric ? Number : String,
    ...rest,
    ...(numeric && format ? { format } : {}),
  };
}

function banner(text: string, span: number, extras: Extras = {}): Cell[] {
  return [
    cell(text, {
      columnSpan: span,
      fontSize: 18,
      fontWeight: "bold",
      backgroundColor: INK,
      textColor: HEADER_FG,
      borderColor: INK,
      height: 34,
      align: "left",
      ...extras,
    }),
    ...Array.from({ length: span - 1 }, () => null),
  ];
}

function headers(labels: string[]): Cell[] {
  return labels.map((label) =>
    cell(label, {
      fontWeight: "bold",
      fontSize: 11,
      backgroundColor: HEADER_BG,
      textColor: HEADER_FG,
      borderColor: "#2a2118",
      align: "center",
      wrap: true,
      height: 28,
    }),
  );
}

function outcomeLabel(outcome: Outcome, lang: Lang, hours = 0): string {
  if (hours >= 12) return fastBandLabel(hours * 3_600_000, lang);
  if (outcome === "not_active") return t(lang, "notActive");
  if (outcome === "in_progress") return t(lang, "inProgress");
  if (outcome === "completed") return t(lang, "completed");
  if (outcome === "multiple") return t(lang, "multiple");
  if (outcome === "rest") return t(lang, "rest");
  return t(lang, "other");
}

function moodLabel(mood: Mood | null, lang: Lang): string {
  return mood ? t(lang, MOOD_KEY[mood]) : "—";
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function eatHours(day: DayRecord | undefined, key: string, now: number, today: string): number | null {
  if (!day || day.meals.length === 0) return null;
  const asOf = key === today ? now : Math.min(now, endOfDay(key));
  return derive(day, asOf, today).eatingMs / 3_600_000;
}

function clock(iso: string | null, lang: Lang): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

export function buildWorkbook(data: Persisted, now = Date.now()): Array<Sheet<Blob>> {
  const lang = data.settings.lang;
  const today = localDateKey(new Date(now));
  const stats = computeStats(data.days, "all", now);
  const keys = listRange(data.days, "all", now);
  const cols = 9;

  const latestWeight = [...keys].reverse().map((key) => data.days[key]?.weightKg).find((kg) => typeof kg === "number") ?? null;
  const waterDays = keys.map((key) => data.days[key]?.waterMl ?? 0).filter((ml) => ml > 0);
  const avgWater = waterDays.length ? Math.round(waterDays.reduce((sum, ml) => sum + ml, 0) / waterDays.length) : null;

  const kpis: { label: string; value: string | number; format?: string }[] = [
    { label: t(lang, "consistency"), value: stats.consistency == null ? "—" : round1(stats.consistency * 100), format: "0.0" },
    { label: t(lang, "avgFast"), value: stats.avgFastHours == null ? "—" : round1(stats.avgFastHours), format: "0.0" },
    { label: t(lang, "longestFast"), value: round1(stats.longestFastHours), format: "0.0" },
    { label: t(lang, "avgEat"), value: stats.avgEatHours == null ? "—" : round1(stats.avgEatHours), format: "0.0" },
    { label: t(lang, "completedCount"), value: stats.completed, format: "0" },
    { label: t(lang, "activeDays"), value: stats.completed + stats.inProgress + stats.multiple + stats.other, format: "0" },
    { label: t(lang, "rest"), value: stats.rest, format: "0" },
    { label: lang === "th" ? "น้ำหนักล่าสุด" : "Latest weight", value: latestWeight == null ? "—" : round1(latestWeight), format: "0.0" },
    { label: lang === "th" ? "น้ำเฉลี่ย (มล.)" : "Avg water (ml)", value: avgWater == null ? "—" : avgWater, format: "#,##0" },
  ];

  const dash: Cell[][] = [
    banner(lang === "th" ? "แดชบอร์ด OMAD" : "OMAD dashboard", cols),
    [
      cell(
        lang === "th"
          ? `ส่งออก ${formatPrettyDate(today, lang, true)} · แผน ${data.settings.plan} · ข้อมูลอยู่บนเครื่องคุณ`
          : `Exported ${formatPrettyDate(today, lang, true)} · plan ${data.settings.plan} · stored on this device`,
        {
          columnSpan: cols,
          backgroundColor: "#4a382c",
          textColor: "#f3e6d8",
          borderColor: "#4a382c",
          fontSize: 10,
          height: 22,
        },
      ),
      ...Array.from({ length: cols - 1 }, () => null),
    ],
    [cell("", { columnSpan: cols, backgroundColor: CREAM, borderStyle: undefined, borderColor: CREAM, height: 10 }), ...Array.from({ length: cols - 1 }, () => null)],
    kpis.map((item) =>
      cell(item.label, {
        backgroundColor: BAND,
        textColor: LABEL,
        fontSize: 10,
        fontWeight: "bold",
        align: "center",
        wrap: true,
        height: 32,
      }),
    ),
    kpis.map((item) =>
      cell(item.value, {
        format: typeof item.value === "number" ? item.format : undefined,
        backgroundColor: CREAM,
        fontSize: 16,
        fontWeight: "bold",
        align: "center",
        height: 30,
        textColor: INK,
      }),
    ),
    [
      cell(lang === "th" ? "บันทึกรายวัน" : "Daily log", {
        columnSpan: cols,
        backgroundColor: SECTION,
        fontWeight: "bold",
        fontSize: 13,
        borderColor: "#e2d3c4",
        height: 24,
      }),
      ...Array.from({ length: cols - 1 }, () => null),
    ],
    headers([
      lang === "th" ? "วันที่" : "Date",
      lang === "th" ? "รหัสวัน" : "ISO date",
      t(lang, "trackingGroup"),
      lang === "th" ? "อด (ชม.)" : "Fast (h)",
      lang === "th" ? "กิน (นาที)" : "Eat (min)",
      t(lang, "water"),
      t(lang, "weight"),
      t(lang, "moodQ"),
      t(lang, "notes"),
    ]),
  ];

  for (const key of keys) {
    const day = data.days[key];
    const outcome = dayOutcome(day, today);
    const tone = TONE[outcome];
    const sample = fastSample(day, now, today);
    const eat = eatHours(day, key, now, today);
    const base = { backgroundColor: tone.bg, textColor: INK };
    dash.push([
      cell(formatPrettyDate(key, lang, true), base),
      cell(key, { ...base, align: "center" }),
      cell(outcomeLabel(outcome, lang, sample.hours), { ...base, textColor: tone.fg, fontWeight: "bold", align: "center" }),
      cell(sample.hours > 0 || sample.counted ? round1(sample.hours) : null, { ...base, format: "0.0", align: "right" }),
      cell(eat == null ? null : Math.round(eat * 60), { ...base, format: "0", align: "right" }),
      cell(day && day.waterMl > 0 ? day.waterMl : null, { ...base, format: "#,##0", align: "right" }),
      cell(day?.weightKg ?? null, { ...base, format: "0.00", align: "right" }),
      cell(day ? moodLabel(day.mood, lang) : "—", { ...base, align: "center" }),
      cell(day?.notes || null, { ...base, wrap: true, align: "left" }),
    ]);
  }

  if (keys.length === 0) {
    dash.push([
      cell(t(lang, "emptyStats"), { columnSpan: cols, backgroundColor: CREAM, align: "center", height: 28 }),
      ...Array.from({ length: cols - 1 }, () => null),
    ]);
  }

  const detailHeader = headers([
    lang === "th" ? "วันที่" : "Date",
    lang === "th" ? "รหัสวัน" : "ISO date",
    t(lang, "trackingGroup"),
    t(lang, "fastStart"),
    t(lang, "mealStart"),
    t(lang, "mealEnd"),
    lang === "th" ? "อด (ชม.)" : "Fast (h)",
    lang === "th" ? "กิน (นาที)" : "Eat (min)",
    t(lang, "water"),
    t(lang, "weight"),
    t(lang, "moodQ"),
    t(lang, "mealFood"),
    t(lang, "mealNotes"),
    t(lang, "notes"),
  ]);

  const detail: Cell[][] = [detailHeader];
  for (const key of keys) {
    const day = data.days[key];
    const outcome = dayOutcome(day, today);
    const tone = TONE[outcome];
    const base = { backgroundColor: tone.bg, textColor: INK };
    const sample = fastSample(day, now, today);
    const meals = day?.meals.length ? day.meals : [null];
    meals.forEach((meal, index) => {
      const start = meal ? Date.parse(meal.start) : NaN;
      const end = meal?.end ? Date.parse(meal.end) : NaN;
      const eatMin = Number.isFinite(start) && Number.isFinite(end) && end > start ? Math.round((end - start) / 60000) : null;
      detail.push([
        cell(formatPrettyDate(key, lang, true), base),
        cell(key, { ...base, align: "center" }),
        cell(outcomeLabel(outcome, lang, index === 0 ? sample.hours : 0), { ...base, textColor: tone.fg, fontWeight: "bold" }),
        cell(index === 0 ? clock(day?.fastingStart ?? null, lang) : "—", { ...base, align: "center" }),
        cell(meal ? clock(meal.start, lang) : null, { ...base, align: "center" }),
        cell(meal ? clock(meal.end, lang) : null, { ...base, align: "center" }),
        cell(index === 0 && (sample.counted || sample.hours > 0) ? round1(sample.hours) : null, { ...base, format: "0.0", align: "right" }),
        cell(eatMin, { ...base, format: "0", align: "right" }),
        cell(index === 0 && day && day.waterMl > 0 ? day.waterMl : null, { ...base, format: "#,##0", align: "right" }),
        cell(index === 0 ? (day?.weightKg ?? null) : null, { ...base, format: "0.00", align: "right" }),
        cell(index === 0 && day ? moodLabel(day.mood, lang) : "—", { ...base, align: "center" }),
        cell(meal?.description || null, { ...base, wrap: true }),
        cell(meal?.notes || null, { ...base, wrap: true }),
        cell(index === 0 ? day?.notes || null : null, { ...base, wrap: true }),
      ]);
    });
  }

  type Month = {
    label: string;
    tracked: number;
    completed: number;
    multiple: number;
    other: number;
    rest: number;
    off: number;
    fastSum: number;
    fastN: number;
    eatSum: number;
    eatN: number;
    water: number;
    weightSum: number;
    weightN: number;
  };
  const months = new Map<string, Month>();
  for (const key of keys) {
    const id = key.slice(0, 7);
    const bucket = months.get(id) ?? {
      label: new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", { month: "long", year: "numeric" }).format(dateFromKey(`${id}-01`)),
      tracked: 0,
      completed: 0,
      multiple: 0,
      other: 0,
      rest: 0,
      off: 0,
      fastSum: 0,
      fastN: 0,
      eatSum: 0,
      eatN: 0,
      water: 0,
      weightSum: 0,
      weightN: 0,
    };
    const day = data.days[key];
    const outcome = dayOutcome(day, today);
    if (outcome === "completed") bucket.completed += 1;
    else if (outcome === "multiple") bucket.multiple += 1;
    else if (outcome === "other") bucket.other += 1;
    else if (outcome === "rest") bucket.rest += 1;
    else if (outcome === "not_active") bucket.off += 1;
    if (outcome !== "not_active") bucket.tracked += 1;
    const sample = fastSample(day, now, today);
    if (sample.counted) {
      bucket.fastSum += sample.hours;
      bucket.fastN += 1;
    }
    const eat = eatHours(day, key, now, today);
    if (eat != null) {
      bucket.eatSum += eat;
      bucket.eatN += 1;
    }
    if (day) {
      bucket.water += day.waterMl;
      if (typeof day.weightKg === "number") {
        bucket.weightSum += day.weightKg;
        bucket.weightN += 1;
      }
    }
    months.set(id, bucket);
  }

  const monthRows: Cell[][] = [
    headers([
      lang === "th" ? "เดือน" : "Month",
      t(lang, "activeDays"),
      t(lang, "completedCount"),
      t(lang, "multiple"),
      t(lang, "rest"),
      t(lang, "notActiveDays"),
      t(lang, "consistency"),
      t(lang, "avgFast"),
      t(lang, "avgEat"),
      lang === "th" ? "น้ำรวม (มล.)" : "Water (ml)",
      lang === "th" ? "น้ำหนักเฉลี่ย" : "Avg weight",
    ]),
  ];
  for (const bucket of months.values()) {
    const denom = bucket.completed + bucket.multiple + bucket.other;
    const consistency = denom ? round1((bucket.completed / denom) * 100) : null;
    const stripe = monthRows.length % 2 === 0 ? CREAM : PAPER;
    const base = { backgroundColor: stripe };
    monthRows.push([
      cell(bucket.label, { ...base, fontWeight: "bold" }),
      cell(bucket.tracked, { ...base, format: "0", align: "right" }),
      cell(bucket.completed, { ...base, format: "0", align: "right", textColor: "#146b42", fontWeight: "bold" }),
      cell(bucket.multiple, { ...base, format: "0", align: "right" }),
      cell(bucket.rest, { ...base, format: "0", align: "right" }),
      cell(bucket.off, { ...base, format: "0", align: "right" }),
      cell(consistency, { ...base, format: "0.0", align: "right" }),
      cell(bucket.fastN ? round1(bucket.fastSum / bucket.fastN) : null, { ...base, format: "0.0", align: "right" }),
      cell(bucket.eatN ? round1(bucket.eatSum / bucket.eatN) : null, { ...base, format: "0.0", align: "right" }),
      cell(bucket.water || null, { ...base, format: "#,##0", align: "right" }),
      cell(bucket.weightN ? round1(bucket.weightSum / bucket.weightN) : null, { ...base, format: "0.00", align: "right" }),
    ]);
  }

  const widths = (...list: number[]) => list.map((width) => ({ width }));

  return [
    {
      data: dash,
      sheet: lang === "th" ? "แดชบอร์ด" : "Dashboard",
      columns: widths(22, 14, 18, 12, 13, 12, 14, 16, 36),
      stickyRowsCount: 7,
      showGridLines: false,
      orientation: "landscape",
    },
    {
      data: detail,
      sheet: lang === "th" ? "รายวัน" : "Days",
      columns: widths(22, 14, 18, 16, 14, 14, 12, 13, 12, 14, 14, 28, 24, 32),
      stickyRowsCount: 1,
      showGridLines: false,
      orientation: "landscape",
    },
    {
      data: monthRows,
      sheet: lang === "th" ? "รายเดือน" : "Months",
      columns: widths(22, 16, 18, 18, 12, 18, 16, 12, 12, 16, 16),
      stickyRowsCount: 1,
      showGridLines: false,
      orientation: "landscape",
    },
  ];
}

export async function downloadExcel(data: Persisted, now = Date.now()): Promise<void> {
  const writeXlsxFile = (await import("write-excel-file/browser")).default;
  const file = await writeXlsxFile(buildWorkbook(data, now), { fontFamily: FONT, fontSize: 11 });
  const blob = await file.toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `omad-dashboard-${localDateKey(new Date(now))}.xlsx`;
  link.click();
  URL.revokeObjectURL(url);
}
