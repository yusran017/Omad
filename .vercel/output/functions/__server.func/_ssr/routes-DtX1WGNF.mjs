import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as CalendarDays, _ as Droplets, a as Sun, b as ChevronLeft, c as Pencil, d as House, f as History, g as FileJson, h as FileSpreadsheet, l as Moon, m as Flame, n as X, o as Smile, p as Frown, r as Utensils, s as Settings, t as Zap, u as Meh, v as CircleDashed, x as ChartColumn, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { a as Bar, i as Line, n as LineChart, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DtX1WGNF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OmadContext = (0, import_react.createContext)(null);
function OmadProvider({ value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OmadContext.Provider, {
		value,
		children
	});
}
function useOmad() {
	const value = (0, import_react.useContext)(OmadContext);
	if (!value) throw new Error("OMAD context missing");
	return value;
}
function cn(...parts) {
	return clsx(parts);
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "16",
			cy: "16",
			r: "12.25",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.75"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M16.1 7.4c.15 2.2-.65 3.55-1.6 4.6 1.65.05 3.15 1.2 3.65 2.95.6 2.05-.55 4.15-2.5 5.05-2.05.95-4.4.15-5.35-1.65-.75-1.45-.45-3 .3-4.35-1.05-1.3.2-3.4 2.1-4.95.7-.55 1.55-1.2 2.4-1.65z"
		})]
	});
}
var TONE$1 = {
	fast: "text-fast",
	eat: "text-eat",
	done: "text-done",
	muted: "text-muted"
};
function Ring({ progress, tone, children, className, label }) {
	const radius = 46;
	const circ = 2 * Math.PI * radius;
	const clamped = Math.max(0, Math.min(progress, 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative mx-auto grid place-items-center", className ?? "size-60"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 120 120",
			className: "absolute inset-0 size-full -rotate-90",
			role: "img",
			"aria-label": label,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: radius,
				className: "fill-none stroke-line",
				strokeWidth: "8"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: radius,
				className: cn("fill-none", TONE$1[tone]),
				stroke: "currentColor",
				strokeWidth: "8",
				strokeLinecap: "round",
				strokeDasharray: circ,
				strokeDashoffset: circ * (1 - clamped)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 px-6 text-center",
			children
		})]
	});
}
function Sheet({ open, title, description, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-ink/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-xl lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 px-4 pt-4 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-semibold text-fg",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: description ? "mt-1 text-sm text-muted" : "sr-only",
						children: description ?? title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "grid size-11 place-items-center rounded-full text-fg press",
					"aria-label": "close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-y-auto px-4 pb-6",
				children
			})]
		})] })
	});
}
function Segmented({ value, options, onChange, label, cols }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": label,
		className: cn("grid gap-1 rounded-2xl bg-surface-2 p-1", cols),
		children: options.map((option) => {
			const on = option.value === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "radio",
				"aria-checked": on,
				onClick: () => onChange(option.value),
				className: cn("min-h-11 rounded-xl px-2 text-sm font-medium press", on ? "bg-fast-fill text-on-accent" : "text-fg"),
				children: option.label
			}, option.value);
		})
	});
}
function ToggleRow({ label, hint, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		onClick: () => onChange(!checked),
		className: "flex w-full items-center gap-3 rounded-2xl border border-line bg-surface-2 px-3 py-3 text-left press",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-medium text-fg",
				children: label
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 block text-xs leading-snug text-muted",
				children: hint
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("relative h-7 w-12 shrink-0 rounded-full", checked ? "bg-fast-fill" : "bg-line"),
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 left-0.5 size-6 rounded-full bg-knob shadow transition-transform", checked && "translate-x-5") })
		})]
	});
}
function PrimaryButton({ children, onClick, tone = "fast" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-5 text-base font-semibold text-on-accent press", tone === "eat" ? "bg-eat-fill" : "bg-fast-fill"),
		children
	});
}
function GhostButton({ children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "min-h-11 rounded-full px-3 text-sm font-medium text-fg press",
		children
	});
}
var STR = {
	appName: {
		th: "OMAD Tracker",
		en: "OMAD Tracker"
	},
	tagline: {
		th: "ติดตามมื้อเดียวของวัน",
		en: "One meal a day"
	},
	home: {
		th: "หน้าแรก",
		en: "Home"
	},
	calendar: {
		th: "ปฏิทิน",
		en: "Calendar"
	},
	stats: {
		th: "สถิติ",
		en: "Stats"
	},
	history: {
		th: "ประวัติ",
		en: "History"
	},
	settings: {
		th: "ตั้งค่า",
		en: "Settings"
	},
	fasting: {
		th: "กำลังอดอาหาร",
		en: "Fasting"
	},
	eating: {
		th: "กำลังกิน",
		en: "Eating"
	},
	notActive: {
		th: "ไม่ได้ติดตาม",
		en: "Not active"
	},
	rest: {
		th: "วันพัก",
		en: "Rest day"
	},
	notActiveTitle: {
		th: "วันนี้ยังไม่ติดตาม",
		en: "Not tracking today"
	},
	notActiveBody: {
		th: "ไม่ได้เปิดติดตาม ไม่ได้แปลว่าทำไม่สำเร็จ",
		en: "Leaving a day off is not a miss"
	},
	restBody: {
		th: "วันนี้เป็นวันพักตามที่คุณตั้งไว้",
		en: "You marked today as rest"
	},
	startToday: {
		th: "เริ่มติดตามวันนี้",
		en: "Track today"
	},
	stopToday: {
		th: "ปิดการติดตาม",
		en: "Stop tracking"
	},
	trackingOn: {
		th: "กำลังติดตาม",
		en: "Active"
	},
	trackingOff: {
		th: "ไม่ได้ติดตาม",
		en: "Not active"
	},
	trackingGroup: {
		th: "สถานะวันนี้",
		en: "Today"
	},
	startEating: {
		th: "เริ่มกิน",
		en: "Start eating"
	},
	stopEating: {
		th: "จบมื้อ",
		en: "Stop eating"
	},
	cancelEating: {
		th: "ยกเลิกมื้อนี้",
		en: "Cancel meal"
	},
	editTime: {
		th: "แก้เวลา",
		en: "Edit times"
	},
	editStart: {
		th: "แก้เวลาเริ่มอด",
		en: "Edit fast start"
	},
	targetLine: {
		th: "เป้าหมาย {time}",
		en: "Target {time}"
	},
	remainingLine: {
		th: "เหลือ {time}",
		en: "Left {time}"
	},
	overLine: {
		th: "เกินเป้าหมาย {time}",
		en: "Past goal {time}"
	},
	eatOverLine: {
		th: "เลยช่วงกิน {time}",
		en: "Past window {time}"
	},
	startedFast: {
		th: "เริ่มอด {time}",
		en: "Fast started {time}"
	},
	startedEat: {
		th: "เริ่มกิน {time}",
		en: "Eating since {time}"
	},
	newFast: {
		th: "อดอาหารรอบใหม่หลังมื้อ",
		en: "New fast after the meal"
	},
	preferredLine: {
		th: "ช่วงกินที่ตั้งไว้ {time}",
		en: "Preferred meal {time}"
	},
	confirmOffTitle: {
		th: "ปิดการติดตามวันนี้?",
		en: "Stop tracking today?"
	},
	confirmOffBody: {
		th: "ข้อมูลที่บันทึกไว้ยังอยู่ วันนี้จะไม่ถูกนับว่าทำไม่สำเร็จ",
		en: "Logged notes stay. Today will not be counted as a miss"
	},
	confirmOffYes: {
		th: "ปิดการติดตาม",
		en: "Stop tracking"
	},
	stay: {
		th: "ติดตามต่อ",
		en: "Keep tracking"
	},
	confirmCancelTitle: {
		th: "ยกเลิกช่วงกินนี้?",
		en: "Cancel this meal?"
	},
	confirmCancelBody: {
		th: "เวลาเริ่มกินจะไม่ถูกบันทึก",
		en: "The start time will not be kept"
	},
	confirmCancelYes: {
		th: "ยกเลิกมื้อ",
		en: "Cancel meal"
	},
	back: {
		th: "กลับ",
		en: "Back"
	},
	savedMeal: {
		th: "บันทึกช่วงกินแล้ว",
		en: "Meal saved"
	},
	savedOmad: {
		th: "วันนี้กินมื้อเดียวตามแผน",
		en: "One meal logged for today"
	},
	todayTitle: {
		th: "วันนี้",
		en: "Today"
	},
	fastingShort: {
		th: "อดอาหาร",
		en: "Fasting"
	},
	eatingShort: {
		th: "กิน",
		en: "Eating"
	},
	meals: {
		th: "มื้อ",
		en: "Meals"
	},
	omad: {
		th: "OMAD",
		en: "OMAD"
	},
	completed: {
		th: "ทำตามแผน",
		en: "Completed"
	},
	inProgress: {
		th: "กำลังทำอยู่",
		en: "In progress"
	},
	multiple: {
		th: "มากกว่า 1 มื้อ",
		en: "More than one meal"
	},
	other: {
		th: "ไม่ได้บันทึกมื้อ",
		en: "No meal logged"
	},
	consistency: {
		th: "ความสม่ำเสมอ",
		en: "Consistency"
	},
	consistencyHint: {
		th: "คิดจากวันที่เปิดติดตามแล้วจบมื้อเดียว ไม่นับวันที่ไม่ได้ติดตามและวันพัก",
		en: "One-meal days among days you actually tracked. Days off and rest days are not misses"
	},
	recent: {
		th: "ย้อนหลังล่าสุด",
		en: "Recent days"
	},
	seeAll: {
		th: "ดูทั้งหมด",
		en: "See all"
	},
	water: {
		th: "น้ำ",
		en: "Water"
	},
	add250: {
		th: "+250",
		en: "+250"
	},
	add500: {
		th: "+500",
		en: "+500"
	},
	minus250: {
		th: "−250",
		en: "−250"
	},
	ml: {
		th: "มล.",
		en: "ml"
	},
	weight: {
		th: "น้ำหนักวันนี้",
		en: "Weight today"
	},
	kg: {
		th: "กก.",
		en: "kg"
	},
	journal: {
		th: "บันทึกวันนี้",
		en: "Today's note"
	},
	moodQ: {
		th: "วันนี้รู้สึกอย่างไร",
		en: "How did today feel"
	},
	moodGood: {
		th: "ดี",
		en: "Good"
	},
	moodNormal: {
		th: "ปกติ",
		en: "Okay"
	},
	moodTired: {
		th: "เหนื่อย",
		en: "Tired"
	},
	moodDifficult: {
		th: "ยาก",
		en: "Hard"
	},
	moodStrong: {
		th: "แข็งแรง",
		en: "Strong"
	},
	notes: {
		th: "โน้ต",
		en: "Notes"
	},
	notesPh: {
		th: "บันทึกสั้น ๆ ได้ตามใจ",
		en: "A short note, if you want"
	},
	mealPh: {
		th: "กินอะไร บันทึกแบบสั้น ๆ",
		en: "What you ate, briefly"
	},
	plan: {
		th: "แผน",
		en: "Plan"
	},
	planCustom: {
		th: "กำหนดเอง",
		en: "Custom"
	},
	goalFast: {
		th: "เป้าหมายอดอาหาร (ชม.)",
		en: "Fasting goal (hours)"
	},
	goalEat: {
		th: "ช่วงกิน (ชม.)",
		en: "Eating window (hours)"
	},
	preferredEat: {
		th: "เวลาที่อยากกิน",
		en: "Preferred meal time"
	},
	notifications: {
		th: "การแจ้งเตือน",
		en: "Notifications"
	},
	eatingReminder: {
		th: "เตือนถึงเวลาช่วงกิน",
		en: "Eating-time reminder"
	},
	fastingReminder: {
		th: "เตือนใกล้ถึงเป้าหมายอด",
		en: "Fasting-goal reminder"
	},
	notifHint: {
		th: "แจ้งเตือนได้ตอนเปิดแอปหรือเปิดค้างไว้ เบราว์เซอร์ไม่รับประกันว่าจะทำงานเบื้องหลังเหมือนแอปที่ติดตั้งจากร้าน",
		en: "Reminders fire while this app is open. Browsers do not guarantee background alerts the way an installed store app would"
	},
	notifUnsupported: {
		th: "เบราว์เซอร์นี้ไม่รองรับการแจ้งเตือน",
		en: "This browser has no notifications"
	},
	notifDenied: {
		th: "ยังไม่ได้รับสิทธิแจ้งเตือน",
		en: "Notification permission was not granted"
	},
	notifGranted: {
		th: "เปิดการแจ้งเตือนแล้ว",
		en: "Notifications are on"
	},
	waterTrack: {
		th: "ติดตามน้ำ",
		en: "Water tracking"
	},
	weightTrack: {
		th: "ติดตามน้ำหนัก",
		en: "Weight tracking"
	},
	waterGoal: {
		th: "เป้าหมายน้ำ (มล.)",
		en: "Water goal (ml)"
	},
	language: {
		th: "ภาษา",
		en: "Language"
	},
	theme: {
		th: "ธีม",
		en: "Theme"
	},
	themeDark: {
		th: "มืด",
		en: "Dark"
	},
	themeLight: {
		th: "สว่าง",
		en: "Light"
	},
	themeToggle: {
		th: "สลับธีม",
		en: "Toggle theme"
	},
	exportJson: {
		th: "ส่งออก JSON",
		en: "Export JSON"
	},
	exportExcel: {
		th: "ส่งออก Excel",
		en: "Export Excel"
	},
	exportFail: {
		th: "ส่งออกไฟล์ไม่สำเร็จ",
		en: "Could not export the file"
	},
	importJson: {
		th: "นำเข้า JSON",
		en: "Import JSON"
	},
	clearData: {
		th: "ลบข้อมูลทั้งหมด",
		en: "Clear all data"
	},
	dataTitle: {
		th: "ข้อมูลในเครื่อง",
		en: "Data on this device"
	},
	confirmClearTitle: {
		th: "ลบข้อมูลทั้งหมด?",
		en: "Delete all data?"
	},
	confirmClearBody: {
		th: "ลบจากเครื่องนี้แล้วกู้คืนไม่ได้ ถ้ายังไม่มีไฟล์สำรอง ให้ส่งออกก่อน",
		en: "This removes everything on this device. Export a backup first if you need one"
	},
	confirmClearYes: {
		th: "ลบข้อมูล",
		en: "Delete"
	},
	importTitle: {
		th: "แทนที่ด้วยไฟล์สำรอง?",
		en: "Replace with this backup?"
	},
	importBody: {
		th: "ไฟล์นี้มี {count} วัน จะเขียนทับข้อมูลปัจจุบัน",
		en: "This file has {count} days and will replace current data"
	},
	importYes: {
		th: "นำเข้า",
		en: "Import"
	},
	importBad: {
		th: "ไฟล์นี้ใช้ไม่ได้ ตรวจว่าเป็น JSON ที่ส่งออกจากแอป",
		en: "That file could not be read. Use a JSON backup from this app"
	},
	importOk: {
		th: "นำเข้าข้อมูลแล้ว",
		en: "Backup imported"
	},
	cleared: {
		th: "ลบข้อมูลแล้ว",
		en: "Data cleared"
	},
	install: {
		th: "ติดตั้งแอป",
		en: "Install"
	},
	installHint: {
		th: "บน Chrome ให้เปิดเมนูแล้วเลือกติดตั้งแอป หรือ Add to Home screen ไอคอนจะอยู่บนหน้าจอเครื่อง",
		en: "In Chrome, open the menu and choose Install app or Add to Home screen"
	},
	installBtn: {
		th: "ติดตั้งบนเครื่องนี้",
		en: "Install on this device"
	},
	about: {
		th: "เกี่ยวกับ",
		en: "About"
	},
	aboutBody: {
		th: "เครื่องมือจดพฤติกรรมส่วนตัว ไม่ใช่คำแนะนำทางการแพทย์ และไม่ได้รับรองผลต่อสุขภาพ ไอคอนใช้ Lucide (สัญญาอนุญาต ISC)",
		en: "A personal habit log, not medical advice, and not a promise about health. Icons are Lucide (ISC license)"
	},
	dataLocal: {
		th: "ข้อมูลอยู่บนเครื่องนี้เท่านั้น ไม่มีบัญชีผู้ใช้",
		en: "Data stays on this device. There is no account"
	},
	close: {
		th: "ปิด",
		en: "Close"
	},
	save: {
		th: "บันทึก",
		en: "Save"
	},
	saved: {
		th: "บันทึกแล้ว",
		en: "Saved"
	},
	addMeal: {
		th: "เพิ่มมื้อ",
		en: "Add meal"
	},
	deleteMeal: {
		th: "ลบมื้อ",
		en: "Remove meal"
	},
	deleteDay: {
		th: "ลบวันนี้",
		en: "Delete this day"
	},
	mealStart: {
		th: "เริ่มกิน",
		en: "Meal start"
	},
	mealEnd: {
		th: "จบกิน",
		en: "Meal end"
	},
	mealFood: {
		th: "อาหาร",
		en: "Food"
	},
	calories: {
		th: "แคลอรี่ (ไม่บังคับ)",
		en: "Calories (optional)"
	},
	mealNotes: {
		th: "โน้ตมื้อนี้",
		en: "Meal note"
	},
	fastStart: {
		th: "เวลาเริ่มอดอาหาร",
		en: "Fasting start"
	},
	activeDay: {
		th: "เปิดติดตามวันนี้",
		en: "Tracking on"
	},
	markRest: {
		th: "เป็นวันพัก",
		en: "Mark as rest"
	},
	invalidMeal: {
		th: "เวลาจบมื้อต้องหลังเวลาเริ่ม",
		en: "Meal end must be after the start"
	},
	invalidFast: {
		th: "เวลาเริ่มอดต้องไม่หลังมื้อแรก",
		en: "Fast start must be before the first meal"
	},
	noMeals: {
		th: "ยังไม่มีมื้อ",
		en: "No meals yet"
	},
	prevMonth: {
		th: "เดือนก่อน",
		en: "Previous month"
	},
	nextMonth: {
		th: "เดือนถัดไป",
		en: "Next month"
	},
	loadMore: {
		th: "โหลดเพิ่ม",
		en: "Load more"
	},
	avgFast: {
		th: "อดเฉลี่ย",
		en: "Avg fast"
	},
	longestFast: {
		th: "อดนานสุด",
		en: "Longest fast"
	},
	avgEat: {
		th: "กินเฉลี่ย",
		en: "Avg eating"
	},
	activeDays: {
		th: "วันที่ติดตาม",
		en: "Active days"
	},
	notActiveDays: {
		th: "วันที่ไม่ได้ติดตาม",
		en: "Days off"
	},
	completedCount: {
		th: "วันที่ทำตามแผน",
		en: "Completed days"
	},
	chartFast: {
		th: "ชั่วโมงอดอาหารก่อนมื้อ",
		en: "Hours fasted before the meal"
	},
	chartHint: {
		th: "แต่ละแท่งคือหนึ่งวัน วันนี้ถ้ายังอดอยู่จะนับต่อเนื่อง",
		en: "Each bar is a day. Today keeps counting while you fast"
	},
	chartEmpty: {
		th: "ยังไม่มีข้อมูลพอสำหรับกราฟ",
		en: "Not enough data for a chart yet"
	},
	emptyStats: {
		th: "เริ่มติดตามสักวัน แล้วตัวเลขจะมาอยู่ตรงนี้",
		en: "Track a day and the numbers will show up here"
	},
	range7: {
		th: "7 วัน",
		en: "7d"
	},
	range30: {
		th: "30 วัน",
		en: "30d"
	},
	range90: {
		th: "90 วัน",
		en: "90d"
	},
	rangeAll: {
		th: "ทั้งหมด",
		en: "All"
	},
	rangeLabel: {
		th: "ช่วงเวลา",
		en: "Range"
	},
	weightChart: {
		th: "น้ำหนัก",
		en: "Weight"
	},
	weightEmpty: {
		th: "ยังไม่มีน้ำหนักที่บันทึก",
		en: "No weight logged yet"
	},
	openDay: {
		th: "เปิดรายละเอียด {date}",
		en: "Open {date}"
	},
	dash: {
		th: "—",
		en: "—"
	},
	mealN: {
		th: "มื้อที่ {n}",
		en: "Meal {n}"
	},
	unclosed: {
		th: "มื้อยังไม่จบ",
		en: "Meal still open"
	},
	features: {
		th: "ตัวเสริม",
		en: "Extras"
	},
	reminders: {
		th: "ตัวเตือน",
		en: "Reminders"
	},
	appearance: {
		th: "การแสดงผล",
		en: "Appearance"
	}
};
function t(lang, key, vars) {
	let text = STR[key][lang];
	if (vars) for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, String(value));
	return text;
}
var STORAGE_KEY = "omad-tracker-v1";
var defaultSettings = {
	theme: "dark",
	lang: "th",
	plan: "omad",
	targetFastingMinutes: 1200,
	targetEatingMinutes: 60,
	preferredEatingTime: "14:00",
	notifications: false,
	eatingReminder: true,
	fastingGoalReminder: true,
	waterEnabled: true,
	waterGoalMl: 2500,
	weightEnabled: false
};
function emptyPersisted() {
	return {
		app: "omad-tracker",
		version: 1,
		settings: { ...defaultSettings },
		days: {}
	};
}
function localDateKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function dateFromKey(key) {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y || 1970, (m || 1) - 1, d || 1, 12, 0, 0, 0);
}
function addDays(key, amount) {
	const date = dateFromKey(key);
	date.setDate(date.getDate() + amount);
	return localDateKey(date);
}
function endOfDay(key) {
	const date = dateFromKey(key);
	date.setHours(23, 59, 59, 999);
	return date.getTime();
}
function formatHMS(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	const pad = (n) => String(n).padStart(2, "0");
	return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
function formatWords(ms, lang) {
	if (ms > 0 && ms < 6e4) {
		const seconds = Math.max(1, Math.round(ms / 1e3));
		return lang === "th" ? `${seconds} วินาที` : `${seconds}s`;
	}
	const totalMin = Math.max(0, Math.round(ms / 6e4));
	const h = Math.floor(totalMin / 60);
	const m = totalMin % 60;
	if (lang === "th") return h <= 0 ? `${m} นาที` : `${h} ชม. ${m} นาที`;
	return h <= 0 ? `${m} min` : `${h}h ${m}m`;
}
function formatHours(minutes, lang) {
	const rounded = Math.round(minutes / 60 * 10) / 10;
	const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
	return lang === "th" ? `${label} ชม.` : `${label} h`;
}
function formatHourNumber(hours, lang) {
	if (hours > 0 && hours < 1) return formatWords(hours * 36e5, lang);
	const rounded = Math.round(hours * 10) / 10;
	const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
	return lang === "th" ? `${label} ชม.` : `${label} h`;
}
function formatPrettyDate(key, lang, withYear = false) {
	return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short",
		...withYear ? { year: "numeric" } : {}
	}).format(dateFromKey(key));
}
function formatTime(iso, lang) {
	if (!iso) return "—";
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "—";
	return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).format(date);
}
function formatWhen(iso, lang, todayKey) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "—";
	const key = localDateKey(date);
	const time = formatTime(iso, lang);
	if (key === todayKey) return time;
	if (key === addDays(todayKey, -1)) return lang === "th" ? `เมื่อวาน ${time}` : `Yesterday ${time}`;
	return `${formatPrettyDate(key, lang)} ${time}`;
}
function toLocalInput(iso) {
	if (!iso) return "";
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	const p = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}`;
}
function fromLocalInput(value) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return date.toISOString();
}
function monthMatrix(year, monthIndex) {
	const first = new Date(year, monthIndex, 1);
	const cells = Array.from({ length: first.getDay() }, () => null);
	const count = new Date(year, monthIndex + 1, 0).getDate();
	for (let day = 1; day <= count; day += 1) cells.push(localDateKey(new Date(year, monthIndex, day)));
	while (cells.length % 7 !== 0) cells.push(null);
	return cells;
}
function monthTitle(year, monthIndex, lang) {
	return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
		month: "long",
		year: "numeric"
	}).format(new Date(year, monthIndex, 1));
}
var EMPTY_DERIVED = {
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
	fastingStart: null
};
function dayOutcome(day, todayKey) {
	if (!day) return "not_active";
	if (day.rest) return "rest";
	if (!day.active) return "not_active";
	const open = day.meals.some((meal) => !meal.end);
	if (day.meals.length > 1) return "multiple";
	if (day.meals.length === 1 && !open) return "completed";
	if (day.date === todayKey) return "in_progress";
	return "other";
}
function derive(day, now, todayKey) {
	if (!day) return { ...EMPTY_DERIVED };
	const meals = day.meals.filter((meal) => Number.isFinite(Date.parse(meal.start))).slice().sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
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
	const fastingMs = Number.isFinite(fastStartMs) ? Math.max(0, (Number.isFinite(firstStart) ? firstStart : now) - fastStartMs) : 0;
	const lastClosed = closed.slice().sort((a, b) => Date.parse(a.end ?? "") - Date.parse(b.end ?? "")).at(-1) ?? null;
	const newFastMs = !open && lastClosed?.end ? Math.max(0, now - Date.parse(lastClosed.end)) : 0;
	let phase = "inactive";
	if (open) phase = "eating";
	else if (day.rest) phase = "rest";
	else if (day.active) phase = "fasting";
	const phaseTargetMs = (phase === "eating" ? day.targetEatingMinutes : day.targetFastingMinutes) * 6e4;
	const phaseElapsedMs = phase === "eating" && open ? Math.max(0, now - Date.parse(open.start)) : phase === "fasting" ? lastClosed?.end ? newFastMs : fastingMs : 0;
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
		fastingStart: day.fastingStart
	};
}
/** Continuous fast may start the previous calendar day, after the last meal. */
function suggestFastingStart(days, now) {
	const windowMs = 1296e5;
	let best = -Infinity;
	let iso = null;
	for (const day of Object.values(days)) for (const meal of day.meals) {
		if (!meal.end) continue;
		const stamp = Date.parse(meal.end);
		if (!Number.isFinite(stamp) || stamp > now || now - stamp > windowMs || stamp <= best) continue;
		best = stamp;
		iso = new Date(stamp).toISOString();
	}
	return iso ?? new Date(now).toISOString();
}
function findOpenMeal(days, now) {
	let best = null;
	for (const day of Object.values(days)) for (const meal of day.meals) {
		if (meal.end) continue;
		const stamp = Date.parse(meal.start);
		if (!Number.isFinite(stamp) || now - stamp > 648e5) continue;
		if (!best || stamp > best.stamp) best = {
			date: day.date,
			meal,
			stamp
		};
	}
	return best ? {
		date: best.date,
		meal: best.meal
	} : null;
}
function present(days, now) {
	const todayKey = localDateKey(new Date(now));
	const today = days[todayKey] ?? null;
	const open = findOpenMeal(days, now);
	if (open) return {
		mode: "eating",
		todayKey,
		today,
		focusDate: open.date,
		derived: derive(days[open.date], now, todayKey)
	};
	if (today?.rest) return {
		mode: "rest",
		todayKey,
		today,
		focusDate: todayKey,
		derived: derive(today, now, todayKey)
	};
	if (!today?.active) return {
		mode: "inactive",
		todayKey,
		today,
		focusDate: null,
		derived: null
	};
	return {
		mode: "fasting",
		todayKey,
		today,
		focusDate: todayKey,
		derived: derive(today, now, todayKey)
	};
}
function shouldConfirmOff(day, now) {
	if (!day?.active) return false;
	if (day.meals.length > 0) return true;
	if (!day.fastingStart) return false;
	return now - Date.parse(day.fastingStart) > 6e4;
}
function fastSample(day, now, todayKey) {
	if (!day?.active || day.rest || !day.fastingStart) return {
		hours: 0,
		counted: false
	};
	const start = Date.parse(day.fastingStart);
	if (!Number.isFinite(start)) return {
		hours: 0,
		counted: false
	};
	const first = day.meals.map((meal) => Date.parse(meal.start)).filter(Number.isFinite).sort((a, b) => a - b)[0];
	if (first) return {
		hours: Math.max(0, (first - start) / 36e5),
		counted: true
	};
	if (day.date === todayKey) return {
		hours: Math.max(0, (now - start) / 36e5),
		counted: true
	};
	const from = Math.max(start, dateFromKey(day.date).setHours(0, 0, 0, 0));
	return {
		hours: Math.max(0, (endOfDay(day.date) - from) / 36e5),
		counted: false
	};
}
function listRange(days, range, now) {
	const today = localDateKey(new Date(now));
	if (range === "all") {
		const start = Object.keys(days).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key)).sort()[0] ?? today;
		const out = [];
		let cursor = start;
		for (let i = 0; i < 4e3 && cursor <= today; i += 1) {
			out.push(cursor);
			cursor = addDays(cursor, 1);
		}
		return out;
	}
	const count = Number(range);
	const out = [];
	for (let i = count - 1; i >= 0; i -= 1) out.push(addDays(today, -i));
	return out;
}
function computeStats(days, range, now) {
	const today = localDateKey(new Date(now));
	const keys = listRange(days, range, now);
	const stats = {
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
		bars: []
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
		stats.bars.push({
			date: key,
			hours: Math.round(sample.hours * 10) / 10,
			outcome
		});
		if (sample.counted) {
			fastSum += sample.hours;
			fastN += 1;
			if (sample.hours > stats.longestFastHours) stats.longestFastHours = sample.hours;
		}
		if (day && day.meals.length > 0) {
			const asOf = key === today ? now : Math.min(now, endOfDay(key));
			eatSum += derive(day, asOf, today).eatingMs / 36e5;
			eatN += 1;
		}
	}
	stats.avgFastHours = fastN ? fastSum / fastN : null;
	stats.avgEatHours = eatN ? eatSum / eatN : null;
	const tracked = stats.completed + stats.multiple + stats.other;
	stats.consistency = tracked ? stats.completed / tracked : null;
	return stats;
}
function validateDay(day) {
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
var MOODS$1 = /* @__PURE__ */ new Set([
	"good",
	"normal",
	"tired",
	"difficult",
	"strong"
]);
var PLANS$1 = /* @__PURE__ */ new Set([
	"16:8",
	"18:6",
	"20:4",
	"omad",
	"custom"
]);
function clip(value, max) {
	return typeof value === "string" ? value.slice(0, max) : "";
}
function numOrNull(value) {
	if (typeof value !== "number" || !Number.isFinite(value)) return null;
	return value;
}
function normalizeMeal(value) {
	if (!value || typeof value !== "object") return null;
	const meal = value;
	if (typeof meal.start !== "string" || !Number.isFinite(Date.parse(meal.start))) return null;
	const end = typeof meal.end === "string" && Number.isFinite(Date.parse(meal.end)) ? meal.end : null;
	const calories = numOrNull(meal.calories);
	return {
		id: typeof meal.id === "string" && meal.id ? meal.id : crypto.randomUUID(),
		start: meal.start,
		end,
		description: clip(meal.description, 500),
		notes: clip(meal.notes, 500),
		calories: calories === null ? null : Math.max(0, Math.min(2e4, calories))
	};
}
function normalizeDay(value, key) {
	if (!value || typeof value !== "object") return null;
	const day = value;
	const date = typeof day.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day.date) ? day.date : key;
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
	const meals = Array.isArray(day.meals) ? day.meals.map(normalizeMeal).filter((meal) => Boolean(meal)).slice(0, 12) : [];
	const weight = numOrNull(day.weightKg);
	return {
		date,
		active: Boolean(day.active),
		rest: Boolean(day.rest),
		fastingStart: typeof day.fastingStart === "string" && Number.isFinite(Date.parse(day.fastingStart)) ? day.fastingStart : null,
		meals,
		targetFastingMinutes: clampNum(day.targetFastingMinutes, 60, 4320, defaultSettings.targetFastingMinutes),
		targetEatingMinutes: clampNum(day.targetEatingMinutes, 15, 960, defaultSettings.targetEatingMinutes),
		notes: clip(day.notes, 2e3),
		waterMl: clampNum(day.waterMl, 0, 2e4, 0),
		weightKg: weight === null ? null : Math.max(20, Math.min(400, Math.round(weight * 10) / 10)),
		mood: typeof day.mood === "string" && MOODS$1.has(day.mood) ? day.mood : null
	};
}
function clampNum(value, min, max, fallback) {
	if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
	return Math.max(min, Math.min(max, value));
}
function parseBackup(input) {
	if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false };
	const raw = input;
	if (raw.version !== void 0 && raw.version !== 1) return { ok: false };
	if (!raw.days || typeof raw.days !== "object" || Array.isArray(raw.days)) return { ok: false };
	const settingsIn = raw.settings ?? {};
	const settings = {
		...defaultSettings,
		theme: settingsIn.theme === "light" ? "light" : "dark",
		lang: settingsIn.lang === "en" ? "en" : "th",
		plan: typeof settingsIn.plan === "string" && PLANS$1.has(settingsIn.plan) ? settingsIn.plan : defaultSettings.plan,
		targetFastingMinutes: clampNum(settingsIn.targetFastingMinutes, 60, 4320, defaultSettings.targetFastingMinutes),
		targetEatingMinutes: clampNum(settingsIn.targetEatingMinutes, 15, 960, defaultSettings.targetEatingMinutes),
		preferredEatingTime: typeof settingsIn.preferredEatingTime === "string" && /^\d{2}:\d{2}$/.test(settingsIn.preferredEatingTime) ? settingsIn.preferredEatingTime : defaultSettings.preferredEatingTime,
		notifications: Boolean(settingsIn.notifications),
		eatingReminder: settingsIn.eatingReminder !== false,
		fastingGoalReminder: settingsIn.fastingGoalReminder !== false,
		waterEnabled: settingsIn.waterEnabled !== false,
		waterGoalMl: clampNum(settingsIn.waterGoalMl, 250, 8e3, defaultSettings.waterGoalMl),
		weightEnabled: Boolean(settingsIn.weightEnabled)
	};
	const days = {};
	for (const [key, value] of Object.entries(raw.days)) {
		const day = normalizeDay(value, key);
		if (day) days[day.date] = day;
	}
	return {
		ok: true,
		data: {
			app: "omad-tracker",
			version: 1,
			settings,
			days
		}
	};
}
function serialize(data) {
	return JSON.stringify({
		...data,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString()
	}, null, 2);
}
function dueNotices(data, now, seen, prime) {
	const out = [];
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
			if (delta >= 0 && delta < 12e4 && !seen.has(id)) {
				seen.add(id);
				if (!prime) out.push({
					id,
					title: th ? "ถึงเวลาช่วงกิน" : "Eating window",
					body: th ? `เวลาที่ตั้งไว้ ${settings.preferredEatingTime}` : `Preferred time ${settings.preferredEatingTime}`
				});
			} else if (prime && delta >= 12e4) seen.add(id);
		}
	}
	if (settings.fastingGoalReminder && day?.active && !open && day.meals.length === 0 && day.fastingStart) {
		const remain = Date.parse(day.fastingStart) + day.targetFastingMinutes * 6e4 - now;
		const soonId = `soon:${todayKey}:${day.fastingStart}`;
		const hitId = `hit:${todayKey}:${day.fastingStart}`;
		if (prime) {
			if (remain < 84e4) seen.add(soonId);
			if (remain <= 0) seen.add(hitId);
		} else {
			if (remain <= 9e5 && remain > 0 && !seen.has(soonId)) {
				seen.add(soonId);
				out.push({
					id: soonId,
					title: th ? "ใกล้ถึงเป้าหมายการอดอาหาร" : "Fasting goal is close",
					body: th ? "อีกประมาณ 15 นาที ตามเวลาที่คุณตั้ง" : "About 15 minutes left on the time you set"
				});
			}
			if (remain <= 0 && remain > -12e4 && !seen.has(hitId)) {
				seen.add(hitId);
				out.push({
					id: hitId,
					title: th ? "ถึงเป้าหมายการอดอาหารแล้ว" : "Fasting goal reached",
					body: th ? "ครบเวลาที่คุณตั้งไว้" : "You reached the time you set"
				});
			}
		}
	}
	return out;
}
function loadPersisted(raw) {
	if (!raw) return emptyPersisted();
	try {
		const parsed = parseBackup(JSON.parse(raw));
		return parsed.ok ? parsed.data : emptyPersisted();
	} catch {
		return emptyPersisted();
	}
}
var MOODS = [
	{
		id: "good",
		icon: Smile,
		key: "moodGood"
	},
	{
		id: "normal",
		icon: Meh,
		key: "moodNormal"
	},
	{
		id: "tired",
		icon: Moon,
		key: "moodTired"
	},
	{
		id: "difficult",
		icon: Frown,
		key: "moodDifficult"
	},
	{
		id: "strong",
		icon: Zap,
		key: "moodStrong"
	}
];
function outcomeKey(outcome) {
	if (outcome === "completed") return "completed";
	if (outcome === "in_progress") return "inProgress";
	if (outcome === "multiple") return "multiple";
	if (outcome === "rest") return "rest";
	if (outcome === "other") return "other";
	return "notActive";
}
function HomeView({ now }) {
	const { data, activate, requestOff, startEat, stopEat, requestCancel, openDay, setView, addWater, setMood, setNotes, setWeight, setMealText } = useOmad();
	const lang = data.settings.lang;
	const view = present(data.days, now);
	const today = view.today;
	const derived = view.derived;
	const stats = computeStats(data.days, "7", now);
	const postMeal = view.mode === "fasting" && (derived?.newFastMs ?? 0) > 0 && Boolean(today?.meals.some((meal) => meal.end));
	const tone = view.mode === "eating" ? "eat" : derived?.outcome === "completed" && !postMeal ? "done" : "fast";
	const wash = view.mode === "eating" ? "eat-wash" : derived?.outcome === "completed" ? "done-wash" : "ember-wash";
	const meal = derived?.openMeal ?? today?.meals.at(-1) ?? null;
	const minuteStatus = statusLine(lang, view.mode, derived);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-4 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: cn("card relative overflow-hidden p-4", view.mode === "fasting" || view.mode === "eating" ? wash : ""),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedTrack, {
							on: Boolean(today?.active) && !today?.rest,
							lang,
							onActivate: activate,
							onOff: () => {
								if (shouldConfirmOff(today ?? void 0, now)) requestOff();
								else requestOff(true);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "sr-only",
							"aria-live": "polite",
							children: minuteStatus
						}),
						view.mode === "inactive" || view.mode === "rest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2 py-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto grid size-16 place-items-center rounded-full bg-surface-2 text-muted",
									children: view.mode === "rest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-7" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDashed, { className: "size-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-3xl font-semibold tracking-tight",
									children: t(lang, view.mode === "rest" ? "rest" : "notActiveTitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-2 max-w-xs text-sm text-muted",
									children: t(lang, view.mode === "rest" ? "restBody" : "notActiveBody")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
										onClick: activate,
										children: t(lang, "startToday")
									})
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ring, {
									progress: derived?.progress ?? 0,
									tone,
									label: minuteStatus,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-sm font-medium", tone === "eat" ? "text-eat" : tone === "done" ? "text-done" : "text-fast"),
										children: t(lang, view.mode === "eating" ? "eating" : "fasting")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "tabular text-4xl font-semibold tracking-tight text-fg sm:text-5xl",
										children: formatHMS(derived?.phaseElapsedMs ?? 0)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-center text-sm text-muted",
									children: [
										t(lang, "targetLine", { time: formatHours(view.mode === "eating" ? today?.targetEatingMinutes ?? data.settings.targetEatingMinutes : today?.targetFastingMinutes ?? data.settings.targetFastingMinutes, lang) }),
										" · ",
										derived && derived.remainingMs < 0 ? t(lang, view.mode === "eating" ? "eatOverLine" : "overLine", { time: formatHMS(-derived.remainingMs) }) : t(lang, "remainingLine", { time: formatHMS(derived?.remainingMs ?? 0) })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-center text-sm text-fg",
									children: view.mode === "eating" && derived?.openMeal ? t(lang, "startedEat", { time: formatWhen(derived.openMeal.start, lang, view.todayKey) }) : derived?.fastingStart ? t(lang, "startedFast", { time: formatWhen(derived.fastingStart, lang, view.todayKey) }) : t(lang, "preferredLine", { time: data.settings.preferredEatingTime })
								}),
								postMeal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-center text-xs text-done",
									children: t(lang, "newFast")
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: view.mode === "eating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
										tone: "eat",
										onClick: stopEat,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "size-5" }), t(lang, "stopEating")]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
										onClick: startEat,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "size-5" }), t(lang, "startEating")]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
										onClick: () => view.focusDate && openDay(view.focusDate),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), t(lang, view.mode === "eating" ? "editTime" : "editStart")]
										})
									}), view.mode === "eating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
										onClick: requestCancel,
										children: t(lang, "cancelEating")
									}) : null]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold text-muted",
								children: t(lang, "todayTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }),
										label: t(lang, "fastingShort"),
										value: formatWords(measure(today, now, view.todayKey).fast, lang)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "size-4" }),
										label: t(lang, "eatingShort"),
										value: formatWords(measure(today, now, view.todayKey).eat, lang)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-4" }),
										label: t(lang, "meals"),
										value: String(today?.meals.length ?? 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full", dotClass(dayOutcome(today ?? void 0, view.todayKey))) }),
										label: t(lang, "omad"),
										value: t(lang, outcomeKey(dayOutcome(today ?? void 0, view.todayKey)))
									})
								]
							}),
							meal && view.focusDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 block text-sm text-muted",
								children: [t(lang, "mealFood"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1",
									value: meal.description,
									placeholder: t(lang, "mealPh"),
									onChange: (event) => setMealText(view.focusDate ?? "", meal.id, event.target.value)
								})]
							}) : null
						]
					}),
					data.settings.waterEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "inline-flex items-center gap-2 text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "size-4 text-rest" }), t(lang, "water")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular text-sm text-fg",
									children: [
										(Math.round((today?.waterMl ?? 0) / 1e3 * 10) / 10).toFixed(1),
										" / ",
										(data.settings.waterGoalMl / 1e3).toFixed(1),
										" ",
										lang === "th" ? "ล." : "L"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-2 overflow-hidden rounded-full bg-surface-2",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-rest",
									style: { width: `${Math.min(100, (today?.waterMl ?? 0) / Math.max(1, data.settings.waterGoalMl) * 100)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										onClick: () => addWater(-250),
										children: t(lang, "minus250")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										onClick: () => addWater(250),
										children: t(lang, "add250")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										onClick: () => addWater(500),
										children: t(lang, "add500")
									})
								]
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: t(lang, "journal")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: t(lang, "moodQ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-5 gap-2",
								children: MOODS.map((mood) => {
									const Icon = mood.icon;
									const on = today?.mood === mood.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-pressed": on,
										onClick: () => setMood(on ? null : mood.id),
										className: cn("flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border px-1 text-xs press", on ? "border-fast-fill bg-fast-fill text-on-accent" : "border-line bg-surface-2 text-fg"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t(lang, mood.key)]
									}, mood.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 block text-sm text-muted",
								children: [t(lang, "notes"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "area mt-1",
									value: today?.notes ?? "",
									placeholder: t(lang, "notesPh"),
									onChange: (event) => setNotes(event.target.value)
								})]
							}),
							data.settings.weightEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 block text-sm text-muted",
								children: [t(lang, "weight"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1",
									inputMode: "decimal",
									type: "number",
									min: 20,
									max: 400,
									step: .1,
									value: today?.weightKg ?? "",
									placeholder: t(lang, "kg"),
									onChange: (event) => {
										const value = event.target.value;
										if (!value) {
											setWeight(null);
											return;
										}
										const kg = Number(value);
										if (Number.isFinite(kg)) setWeight(Math.round(kg * 10) / 10);
									}
								})]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card flex items-center gap-4 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
							progress: stats.consistency ?? 0,
							tone: "done",
							className: "size-16 shrink-0",
							label: t(lang, "consistency"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular text-sm font-semibold",
								children: stats.consistency === null ? t(lang, "dash") : `${Math.round(stats.consistency * 100)}%`
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold",
									children: t(lang, "consistency")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-fg",
									children: [
										t(lang, "completed"),
										" ",
										stats.completed,
										" · ",
										t(lang, "notActive"),
										" ",
										stats.notActive
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-snug text-muted",
									children: t(lang, "consistencyHint")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: [
										"7 ",
										lang === "th" ? "วัน" : "days",
										" · ",
										t(lang, "avgFast"),
										" ",
										stats.avgFastHours === null ? t(lang, "dash") : formatHourNumber(stats.avgFastHours, lang)
									]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-4 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "recent")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 text-sm font-medium text-fast press",
						onClick: () => setView("history"),
						children: t(lang, "seeAll")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-line",
					children: Array.from({ length: 4 }, (_, index) => addDays(view.todayKey, -index)).map((key) => {
						const record = data.days[key];
						const outcome = dayOutcome(record, view.todayKey);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex min-h-14 w-full items-center gap-3 py-2 text-left press",
							onClick: () => openDay(key),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("size-2.5 shrink-0 rounded-full", dotClass(outcome)),
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-medium",
										children: formatPrettyDate(key, lang)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: t(lang, outcomeKey(outcome))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: record ? formatWords(measure(record, now, view.todayKey).fast, lang) : t(lang, "dash")
								})
							]
						}) }, key);
					})
				})]
			})
		]
	});
}
function measure(day, now, todayKey) {
	if (!day) return {
		fast: 0,
		eat: 0
	};
	const derived = derive(day, day.date === todayKey ? now : Math.min(now, endOfDay(day.date)), todayKey);
	return {
		fast: derived.fastingMs,
		eat: derived.eatingMs
	};
}
function statusLine(lang, mode, derived) {
	if (mode === "inactive") return t(lang, "notActiveTitle");
	if (mode === "rest") return t(lang, "rest");
	const clock = formatHMS(derived?.phaseElapsedMs ?? 0).slice(0, 5);
	return `${t(lang, mode === "eating" ? "eating" : "fasting")} ${clock}`;
}
function SegmentedTrack({ on, lang, onActivate, onOff }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "radiogroup",
		"aria-label": t(lang, "trackingGroup"),
		className: "grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "radio",
			"aria-checked": on,
			className: cn("min-h-11 rounded-xl text-sm font-medium press", on ? "bg-fast-fill text-on-accent" : "text-fg"),
			onClick: onActivate,
			children: t(lang, "trackingOn")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "radio",
			"aria-checked": !on,
			className: cn("min-h-11 rounded-xl text-sm font-medium press", !on ? "bg-surface text-fg" : "text-fg"),
			onClick: onOff,
			children: t(lang, "trackingOff")
		})]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface-2 px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs text-muted",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-semibold text-fg",
			children: value
		})]
	});
}
function Mini({ children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "min-h-11 rounded-2xl bg-surface-2 text-sm font-semibold text-fg press",
		children
	});
}
function dotClass(outcome) {
	if (outcome === "completed") return "bg-done-fill";
	if (outcome === "in_progress") return "bg-fast-fill";
	if (outcome === "multiple") return "bg-multi";
	if (outcome === "rest") return "bg-rest";
	if (outcome === "other") return "bg-fast";
	return "bg-line";
}
var WEEK = [
	{
		th: "อา",
		en: "Su"
	},
	{
		th: "จ",
		en: "Mo"
	},
	{
		th: "อ",
		en: "Tu"
	},
	{
		th: "พ",
		en: "We"
	},
	{
		th: "พฤ",
		en: "Th"
	},
	{
		th: "ศ",
		en: "Fr"
	},
	{
		th: "ส",
		en: "Sa"
	}
];
function CalendarView({ now }) {
	const { data, openDay } = useOmad();
	const lang = data.settings.lang;
	const today = localDateKey(new Date(now));
	const initial = new Date(now);
	const [cursor, setCursor] = (0, import_react.useState)({
		year: initial.getFullYear(),
		month: initial.getMonth()
	});
	const cells = monthMatrix(cursor.year, cursor.month);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card p-3 sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-full press",
						"aria-label": t(lang, "prevMonth"),
						onClick: () => shift(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: monthTitle(cursor.year, cursor.month, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-full press",
						"aria-label": t(lang, "nextMonth"),
						onClick: () => shift(1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-7 gap-1 text-center text-xs text-muted",
				children: WEEK.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-2",
					children: day[lang]
				}, day.en))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: cells.map((key, index) => {
					if (!key) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `e-${index}`);
					const future = key > today;
					const outcome = dayOutcome(data.days[key], today);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: future,
						"aria-label": t(lang, "openDay", { date: key }),
						onClick: () => openDay(key),
						className: cn("flex aspect-square flex-col items-center justify-center rounded-2xl text-sm press", key === today ? "border border-fast" : "border border-transparent", future ? "text-muted" : "text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Number(key.slice(-2)) }), !future ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-1 size-1.5 rounded-full", dotClass(outcome)),
							"aria-hidden": "true"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5" })]
					}, key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid grid-cols-2 gap-2 text-xs text-muted",
				children: [
					"completed",
					"in_progress",
					"multiple",
					"rest",
					"other",
					"not_active"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", dotClass(item)) }), t(lang, item === "in_progress" ? "inProgress" : item === "not_active" ? "notActive" : item)]
				}, item))
			})
		]
	});
	function shift(delta) {
		setCursor((current) => {
			const date = new Date(current.year, current.month + delta, 1);
			return {
				year: date.getFullYear(),
				month: date.getMonth()
			};
		});
	}
}
function blankDay(date, settings) {
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
		mood: null
	};
}
function withDay(data, date, recipe) {
	const base = data.days[date] ?? blankDay(date, data.settings);
	return {
		...data,
		days: {
			...data.days,
			[date]: recipe(base)
		}
	};
}
function activateToday(data, now) {
	return withDay(data, localDateKey(new Date(now)), (day) => ({
		...day,
		active: true,
		rest: false,
		fastingStart: day.fastingStart ?? suggestFastingStart(data.days, now),
		targetFastingMinutes: data.settings.targetFastingMinutes,
		targetEatingMinutes: data.settings.targetEatingMinutes
	}));
}
function deactivateToday(data, now) {
	const key = localDateKey(new Date(now));
	if (!data.days[key]) return data;
	return withDay(data, key, (day) => ({
		...day,
		active: false
	}));
}
function startEating(data, now) {
	if (findOpenMeal(data.days, now)) return data;
	const key = localDateKey(new Date(now));
	const meal = {
		id: crypto.randomUUID(),
		start: new Date(now).toISOString(),
		end: null,
		description: "",
		notes: "",
		calories: null
	};
	return withDay(data, key, (day) => ({
		...day,
		active: true,
		rest: false,
		fastingStart: day.fastingStart ?? suggestFastingStart(data.days, now),
		targetFastingMinutes: data.settings.targetFastingMinutes,
		targetEatingMinutes: data.settings.targetEatingMinutes,
		meals: [...day.meals, meal]
	}));
}
function stopEating(data, now) {
	const open = findOpenMeal(data.days, now);
	if (!open) return data;
	const end = new Date(now).toISOString();
	return withDay(data, open.date, (day) => ({
		...day,
		meals: day.meals.map((meal) => meal.id === open.meal.id ? {
			...meal,
			end
		} : meal)
	}));
}
function cancelOpenMeal(data, now) {
	const open = findOpenMeal(data.days, now);
	if (!open) return data;
	return withDay(data, open.date, (day) => ({
		...day,
		meals: day.meals.filter((meal) => meal.id !== open.meal.id)
	}));
}
function saveDay(data, day) {
	const error = validateDay(day);
	if (error) return {
		data,
		error
	};
	const meals = day.meals.map((meal) => ({
		...meal,
		description: meal.description.slice(0, 500),
		notes: meal.notes.slice(0, 500)
	})).sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
	const next = {
		...day,
		meals,
		notes: day.notes.slice(0, 2e3)
	};
	return {
		data: {
			...data,
			days: {
				...data.days,
				[day.date]: next
			}
		},
		error: null
	};
}
function removeDay(data, date) {
	const days = { ...data.days };
	delete days[date];
	return {
		...data,
		days
	};
}
function updateSettings(data, patch, now) {
	const settings = {
		...data.settings,
		...patch
	};
	const key = localDateKey(new Date(now));
	const today = data.days[key];
	if (!today || !("targetFastingMinutes" in patch) && !("targetEatingMinutes" in patch)) return {
		...data,
		settings
	};
	return {
		...data,
		settings,
		days: {
			...data.days,
			[key]: {
				...today,
				targetFastingMinutes: settings.targetFastingMinutes,
				targetEatingMinutes: settings.targetEatingMinutes
			}
		}
	};
}
function addWater(data, delta, now) {
	return withDay(data, localDateKey(new Date(now)), (day) => ({
		...day,
		waterMl: Math.max(0, Math.min(2e4, day.waterMl + delta))
	}));
}
function setWeight(data, kg, now) {
	return withDay(data, localDateKey(new Date(now)), (day) => ({
		...day,
		weightKg: kg
	}));
}
function setMood(data, mood, now) {
	return withDay(data, localDateKey(new Date(now)), (day) => ({
		...day,
		mood
	}));
}
function setNotes(data, notes, now) {
	return withDay(data, localDateKey(new Date(now)), (day) => ({
		...day,
		notes: notes.slice(0, 2e3)
	}));
}
function setMealDescription(data, date, mealId, description) {
	return withDay(data, date, (day) => ({
		...day,
		meals: day.meals.map((meal) => meal.id === mealId ? {
			...meal,
			description: description.slice(0, 500)
		} : meal)
	}));
}
function DaySheet({ now }) {
	const { data, sheet, closeSheet, commitDay, deleteDay } = useOmad();
	const open = sheet?.type === "day";
	const date = open ? sheet.date : "";
	const lang = data.settings.lang;
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const dataRef = (0, import_react.useRef)(data);
	dataRef.current = data;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const current = dataRef.current;
		setDraft(current.days[date] ? structuredClone(current.days[date]) : blankDay(date, current.settings));
		setError(null);
	}, [open, date]);
	if (!draft || !open) return null;
	const asOf = draft.date === localDateKey(new Date(now)) ? now : Math.min(now, endOfDay(draft.date));
	const preview = derive({
		...draft,
		active: true,
		rest: false
	}, asOf, draft.date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		title: formatPrettyDate(draft.date, lang, true),
		description: t(lang, "editTime"),
		onClose: closeSheet,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						t(lang, "fastingShort"),
						" ",
						formatWords(preview.fastingMs, lang),
						" · ",
						t(lang, "eatingShort"),
						" ",
						formatWords(preview.eatingMs, lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: t(lang, "activeDay"),
					checked: draft.active,
					onChange: (active) => setDraft({
						...draft,
						active,
						rest: active ? false : draft.rest
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: t(lang, "markRest"),
					checked: draft.rest,
					onChange: (rest) => setDraft({
						...draft,
						rest,
						active: rest ? false : draft.active
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm text-muted",
					children: [t(lang, "fastStart"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-1",
						type: "datetime-local",
						value: toLocalInput(draft.fastingStart),
						onChange: (event) => setDraft({
							...draft,
							fastingStart: fromLocalInput(event.target.value)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [draft.meals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t(lang, "noMeals")
					}) : null, draft.meals.map((meal, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealFields, {
						meal,
						index,
						lang,
						onChange: (next) => setDraft({
							...draft,
							meals: draft.meals.map((item) => item.id === meal.id ? next : item)
						}),
						onRemove: () => setDraft({
							...draft,
							meals: draft.meals.filter((item) => item.id !== meal.id)
						})
					}, meal.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-2xl bg-surface-2 text-sm font-semibold press",
					onClick: () => setDraft({
						...draft,
						meals: [...draft.meals, {
							id: crypto.randomUUID(),
							start: (/* @__PURE__ */ new Date()).toISOString(),
							end: null,
							description: "",
							notes: "",
							calories: null
						}]
					}),
					children: t(lang, "addMeal")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm text-muted",
					children: [t(lang, "notes"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "area mt-1",
						value: draft.notes,
						onChange: (event) => setDraft({
							...draft,
							notes: event.target.value
						})
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-eat",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-12 rounded-full bg-fast-fill text-sm font-semibold text-on-accent press",
					onClick: () => {
						const problem = validateDay(draft);
						if (problem) {
							setError(t(lang, problem === "meal_order" ? "invalidMeal" : "invalidFast"));
							return;
						}
						commitDay(draft);
					},
					children: t(lang, "save")
				}),
				data.days[draft.date] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 text-sm font-medium text-eat press",
					onClick: () => deleteDay(draft.date),
					children: t(lang, "deleteDay")
				}) : null
			]
		})
	});
}
function MealFields({ meal, index, lang, onChange, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "grid gap-2 rounded-2xl border border-line p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "px-1 text-sm font-medium",
				children: t(lang, "mealN", { n: index + 1 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: [t(lang, "mealStart"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-1",
					type: "datetime-local",
					value: toLocalInput(meal.start),
					onChange: (event) => onChange({
						...meal,
						start: fromLocalInput(event.target.value) ?? meal.start
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: [t(lang, "mealEnd"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-1",
					type: "datetime-local",
					value: toLocalInput(meal.end),
					onChange: (event) => onChange({
						...meal,
						end: fromLocalInput(event.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: [t(lang, "mealFood"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-1",
					value: meal.description,
					onChange: (event) => onChange({
						...meal,
						description: event.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: [t(lang, "calories"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-1",
					inputMode: "numeric",
					type: "number",
					min: 0,
					value: meal.calories ?? "",
					onChange: (event) => onChange({
						...meal,
						calories: event.target.value === "" ? null : Number(event.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: [t(lang, "mealNotes"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-1",
					value: meal.notes,
					onChange: (event) => onChange({
						...meal,
						notes: event.target.value
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 text-sm text-eat press",
				onClick: onRemove,
				children: t(lang, "deleteMeal")
			})
		]
	});
}
function labelKey(outcome) {
	if (outcome === "in_progress") return "inProgress";
	if (outcome === "not_active") return "notActive";
	return outcome;
}
function HistoryView({ now }) {
	const { data, openDay } = useOmad();
	const lang = data.settings.lang;
	const today = localDateKey(new Date(now));
	const [span, setSpan] = (0, import_react.useState)(14);
	const keys = Array.from({ length: span }, (_, index) => addDays(today, -index));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: t(lang, "history")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-line",
				children: keys.map((key) => {
					const record = data.days[key];
					const outcome = dayOutcome(record, today);
					const asOf = key === today ? now : Math.min(now, endOfDay(key));
					const measured = record ? derive({
						...record,
						active: true,
						rest: false
					}, asOf, today) : null;
					const open = record?.meals.some((meal) => !meal.end);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-center gap-3 py-3 text-left press",
						onClick: () => openDay(key),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `size-2.5 shrink-0 rounded-full ${dotClass(outcome)}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: formatPrettyDate(key, lang, true)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-xs text-muted",
								children: [
									t(lang, labelKey(outcome)),
									measured && (measured.fastingMs > 0 || measured.eatingMs > 0) ? ` · ${t(lang, "fastingShort")} ${formatWords(measured.fastingMs, lang)} · ${t(lang, "eatingShort")} ${formatWords(measured.eatingMs, lang)}` : "",
									open ? ` · ${t(lang, "unclosed")}` : ""
								]
							})]
						})]
					}) }, key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 w-full rounded-2xl bg-surface-2 text-sm font-medium press",
				onClick: () => setSpan((value) => value + 30),
				children: t(lang, "loadMore")
			})
		]
	});
}
var PLANS = [
	{
		id: "16:8",
		fast: 960,
		eat: 480
	},
	{
		id: "18:6",
		fast: 1080,
		eat: 360
	},
	{
		id: "20:4",
		fast: 1200,
		eat: 240
	},
	{
		id: "omad",
		fast: 1200,
		eat: 60
	},
	{
		id: "custom",
		fast: 1200,
		eat: 60,
		label: "planCustom"
	}
];
function SettingsView() {
	const { data, updateSettings, setTheme, setLang, enableNotifications, exportJson, exportExcel, beginImport, requestClear, canInstall, install } = useOmad();
	const lang = data.settings.lang;
	const fileRef = (0, import_react.useRef)(null);
	const notifySupported = typeof window !== "undefined" && "Notification" in window;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card grid gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "plan")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2",
						children: PLANS.map((plan) => {
							const on = data.settings.plan === plan.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": on,
								className: `min-h-11 rounded-2xl px-2 text-sm font-medium press ${on ? "bg-fast-fill text-on-accent" : "bg-surface-2 text-fg"}`,
								onClick: () => {
									if (plan.id === "custom") updateSettings({ plan: "custom" });
									else updateSettings({
										plan: plan.id,
										targetFastingMinutes: plan.fast,
										targetEatingMinutes: plan.eat
									});
								},
								children: plan.label ? t(lang, plan.label) : plan.id
							}, plan.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: [t(lang, "goalFast"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							type: "number",
							min: 1,
							max: 72,
							step: .5,
							value: data.settings.targetFastingMinutes / 60,
							onChange: (event) => {
								const hours = Number(event.target.value);
								if (!Number.isFinite(hours)) return;
								updateSettings({
									plan: "custom",
									targetFastingMinutes: Math.round(Math.min(72, Math.max(1, hours)) * 60)
								});
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: [t(lang, "goalEat"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							type: "number",
							min: .25,
							max: 16,
							step: .25,
							value: data.settings.targetEatingMinutes / 60,
							onChange: (event) => {
								const hours = Number(event.target.value);
								if (!Number.isFinite(hours)) return;
								updateSettings({
									plan: "custom",
									targetEatingMinutes: Math.round(Math.min(16, Math.max(.25, hours)) * 60)
								});
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: [t(lang, "preferredEat"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							type: "time",
							value: data.settings.preferredEatingTime,
							onChange: (event) => updateSettings({ preferredEatingTime: event.target.value || "14:00" })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card grid gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "appearance")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
						label: t(lang, "language"),
						cols: "grid-cols-2",
						value: lang,
						onChange: setLang,
						options: [{
							value: "th",
							label: "ไทย"
						}, {
							value: "en",
							label: "English"
						}]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
						label: t(lang, "theme"),
						cols: "grid-cols-2",
						value: data.settings.theme,
						onChange: setTheme,
						options: [{
							value: "dark",
							label: t(lang, "themeDark")
						}, {
							value: "light",
							label: t(lang, "themeLight")
						}]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pt-2 text-sm font-semibold",
						children: t(lang, "features")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: t(lang, "waterTrack"),
						checked: data.settings.waterEnabled,
						onChange: (on) => updateSettings({ waterEnabled: on })
					}),
					data.settings.waterEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: [t(lang, "waterGoal"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							type: "number",
							min: 250,
							max: 8e3,
							step: 50,
							value: data.settings.waterGoalMl,
							onChange: (event) => updateSettings({ waterGoalMl: Math.round(Number(event.target.value) || 2500) })
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: t(lang, "weightTrack"),
						checked: data.settings.weightEnabled,
						onChange: (on) => updateSettings({ weightEnabled: on })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card grid gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "reminders")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: t(lang, "notifications"),
						checked: data.settings.notifications,
						onChange: (on) => void enableNotifications(on)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: t(lang, "eatingReminder"),
						checked: data.settings.eatingReminder,
						onChange: (on) => updateSettings({ eatingReminder: on })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: t(lang, "fastingReminder"),
						checked: data.settings.fastingGoalReminder,
						onChange: (on) => updateSettings({ fastingGoalReminder: on })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-snug text-muted",
						children: notifySupported ? t(lang, "notifHint") : t(lang, "notifUnsupported")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card grid gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "dataTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t(lang, "dataLocal")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-full bg-fast-fill text-on-accent press",
							"aria-label": t(lang, "exportJson"),
							onClick: exportJson,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-full bg-surface-2 press",
							"aria-label": t(lang, "exportExcel"),
							onClick: () => void exportExcel(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-2xl bg-surface-2 text-sm font-semibold press",
						onClick: () => fileRef.current?.click(),
						children: t(lang, "importJson")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json,.json",
						className: "sr-only",
						onChange: async (event) => {
							const file = event.target.files?.[0];
							event.target.value = "";
							if (!file) return;
							beginImport(await file.text());
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-2xl border border-line text-sm font-semibold text-eat press",
						onClick: requestClear,
						children: t(lang, "clearData")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pt-2 text-sm font-semibold",
						children: t(lang, "install")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-snug text-muted",
						children: t(lang, "installHint")
					}),
					canInstall ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-2xl bg-surface-2 text-sm font-semibold press",
						onClick: () => void install(),
						children: t(lang, "installBtn")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pt-2 text-sm font-semibold",
						children: t(lang, "about")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-snug text-muted",
						children: t(lang, "aboutBody")
					})
				]
			})
		]
	});
}
function StatsView({ now }) {
	const { data } = useOmad();
	const lang = data.settings.lang;
	const [range, setRange] = (0, import_react.useState)("7");
	const stats = computeStats(data.days, range, now);
	const bars = stats.bars.map((bar) => ({
		...bar,
		label: range === "7" ? formatPrettyDate(bar.date, lang).split(" ")[0] : bar.date.slice(8)
	}));
	const weights = Object.values(data.days).filter((day) => typeof day.weightKg === "number").sort((a, b) => a.date.localeCompare(b.date)).map((day) => ({
		date: day.date,
		label: day.date.slice(5),
		kg: day.weightKg
	}));
	const tracked = stats.completed + stats.inProgress + stats.multiple + stats.other;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: t(lang, "rangeLabel"),
					cols: "grid-cols-4",
					value: range,
					onChange: setRange,
					options: [
						{
							value: "7",
							label: t(lang, "range7")
						},
						{
							value: "30",
							label: t(lang, "range30")
						},
						{
							value: "90",
							label: t(lang, "range90")
						},
						{
							value: "all",
							label: t(lang, "rangeAll")
						}
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
						progress: stats.consistency ?? 0,
						tone: "done",
						className: "size-28 shrink-0",
						label: t(lang, "consistency"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular text-xl font-semibold",
							children: stats.consistency === null ? t(lang, "dash") : `${Math.round(stats.consistency * 100)}%`
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: t(lang, "consistency")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-fg",
							children: [
								t(lang, "completed"),
								" ",
								stats.completed
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								t(lang, "notActive"),
								" ",
								stats.notActive
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-snug text-muted",
							children: t(lang, "consistencyHint")
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card grid grid-cols-2 gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: t(lang, "avgFast"),
						value: stats.avgFastHours === null ? t(lang, "dash") : formatHourNumber(stats.avgFastHours, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: t(lang, "longestFast"),
						value: stats.longestFastHours ? formatHourNumber(stats.longestFastHours, lang) : t(lang, "dash")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: t(lang, "avgEat"),
						value: stats.avgEatHours === null ? t(lang, "dash") : formatHourNumber(stats.avgEatHours, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: t(lang, "completedCount"),
						value: String(stats.completed)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: t(lang, "activeDays"),
						value: String(tracked)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: t(lang, "notActiveDays"),
						value: String(stats.notActive)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-4 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "chartFast")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: t(lang, "chartHint")
					}),
					bars.every((bar) => bar.hours === 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: tracked === 0 ? t(lang, "emptyStats") : t(lang, "chartEmpty")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-48 w-full min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: bars,
								margin: {
									top: 8,
									right: 4,
									left: 4,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "label",
										tick: {
											fill: "var(--muted)",
											fontSize: 11
										},
										interval: bars.length > 10 ? Math.ceil(bars.length / 6) : 0,
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "color-mix(in srgb, var(--fg) 6%, transparent)" },
										contentStyle: {
											background: "var(--surface)",
											border: "1px solid var(--line)",
											borderRadius: 12,
											color: "var(--fg)"
										},
										formatter: (value) => [formatHourNumber(Number(value), lang), t(lang, "fastingShort")],
										labelFormatter: (_label, payload) => {
											const date = payload?.[0]?.payload?.date;
											return date ? formatPrettyDate(date, lang, true) : "";
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "hours",
										fill: "var(--fast-fill)",
										radius: [
											4,
											4,
											0,
											0
										],
										maxBarSize: 28,
										isAnimationActive: false
									})
								]
							})
						})
					})
				]
			}),
			data.settings.weightEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-4 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: t(lang, "weightChart")
				}), weights.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted",
					children: t(lang, "weightEmpty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-44 w-full min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: weights,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									tick: {
										fill: "var(--muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--surface)",
									border: "1px solid var(--line)",
									borderRadius: 12,
									color: "var(--fg)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "kg",
									stroke: "var(--done)",
									strokeWidth: 2,
									dot: { r: 3 },
									isAnimationActive: false
								})
							]
						})
					})
				})]
			}) : null
		]
	});
}
function Tile({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface-2 px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "tabular mt-1 text-lg font-semibold",
			children: value
		})]
	});
}
var FONT = "Tahoma";
var INK = "#2a2118";
var CREAM = "#fbf6f0";
var PAPER = "#fffdfb";
var HEADER_BG = "#3a2a20";
var HEADER_FG = "#fff8f1";
var LABEL = "#6b5e54";
var LINE = "#c4b4a4";
var BAND = "#f3ebe3";
var SECTION = "#efe4d6";
var TONE = {
	completed: {
		bg: "#e5f6ee",
		fg: "#146b42"
	},
	in_progress: {
		bg: "#fff1e0",
		fg: "#9a4e0c"
	},
	not_active: {
		bg: "#f6f1ea",
		fg: "#6b5e54"
	},
	multiple: {
		bg: "#fde8ee",
		fg: "#9a3450"
	},
	rest: {
		bg: "#e8f1fb",
		fg: "#1d5fa8"
	},
	other: {
		bg: "#fff6d8",
		fg: "#8a5a10"
	}
};
var MOOD_KEY = {
	good: "moodGood",
	normal: "moodNormal",
	tired: "moodTired",
	difficult: "moodDifficult",
	strong: "moodStrong"
};
function cell(value, extras = {}) {
	const missing = value === null || value === void 0;
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
		...numeric && format ? { format } : {}
	};
}
function banner(text, span, extras = {}) {
	return [cell(text, {
		columnSpan: span,
		fontSize: 18,
		fontWeight: "bold",
		backgroundColor: INK,
		textColor: HEADER_FG,
		borderColor: INK,
		height: 34,
		align: "left",
		...extras
	}), ...Array.from({ length: span - 1 }, () => null)];
}
function headers(labels) {
	return labels.map((label) => cell(label, {
		fontWeight: "bold",
		fontSize: 11,
		backgroundColor: HEADER_BG,
		textColor: HEADER_FG,
		borderColor: "#2a2118",
		align: "center",
		wrap: true,
		height: 28
	}));
}
function outcomeLabel(outcome, lang) {
	if (outcome === "not_active") return t(lang, "notActive");
	if (outcome === "in_progress") return t(lang, "inProgress");
	if (outcome === "completed") return t(lang, "completed");
	if (outcome === "multiple") return t(lang, "multiple");
	if (outcome === "rest") return t(lang, "rest");
	return t(lang, "other");
}
function moodLabel(mood, lang) {
	return mood ? t(lang, MOOD_KEY[mood]) : "—";
}
function round1(value) {
	return Math.round(value * 10) / 10;
}
function eatHours(day, key, now, today) {
	if (!day || day.meals.length === 0) return null;
	return derive(day, key === today ? now : Math.min(now, endOfDay(key)), today).eatingMs / 36e5;
}
function clock(iso, lang) {
	if (!iso) return "—";
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "—";
	return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).format(date);
}
function buildWorkbook(data, now = Date.now()) {
	const lang = data.settings.lang;
	const today = localDateKey(new Date(now));
	const stats = computeStats(data.days, "all", now);
	const keys = listRange(data.days, "all", now);
	const cols = 9;
	const latestWeight = [...keys].reverse().map((key) => data.days[key]?.weightKg).find((kg) => typeof kg === "number") ?? null;
	const waterDays = keys.map((key) => data.days[key]?.waterMl ?? 0).filter((ml) => ml > 0);
	const avgWater = waterDays.length ? Math.round(waterDays.reduce((sum, ml) => sum + ml, 0) / waterDays.length) : null;
	const kpis = [
		{
			label: t(lang, "consistency"),
			value: stats.consistency == null ? "—" : round1(stats.consistency * 100),
			format: "0.0"
		},
		{
			label: t(lang, "avgFast"),
			value: stats.avgFastHours == null ? "—" : round1(stats.avgFastHours),
			format: "0.0"
		},
		{
			label: t(lang, "longestFast"),
			value: round1(stats.longestFastHours),
			format: "0.0"
		},
		{
			label: t(lang, "avgEat"),
			value: stats.avgEatHours == null ? "—" : round1(stats.avgEatHours),
			format: "0.0"
		},
		{
			label: t(lang, "completedCount"),
			value: stats.completed,
			format: "0"
		},
		{
			label: t(lang, "activeDays"),
			value: stats.completed + stats.inProgress + stats.multiple + stats.other,
			format: "0"
		},
		{
			label: t(lang, "rest"),
			value: stats.rest,
			format: "0"
		},
		{
			label: lang === "th" ? "น้ำหนักล่าสุด" : "Latest weight",
			value: latestWeight == null ? "—" : round1(latestWeight),
			format: "0.0"
		},
		{
			label: lang === "th" ? "น้ำเฉลี่ย (มล.)" : "Avg water (ml)",
			value: avgWater == null ? "—" : avgWater,
			format: "#,##0"
		}
	];
	const dash = [
		banner(lang === "th" ? "แดชบอร์ด OMAD" : "OMAD dashboard", cols),
		[cell(lang === "th" ? `ส่งออก ${formatPrettyDate(today, lang, true)} · แผน ${data.settings.plan} · ข้อมูลอยู่บนเครื่องคุณ` : `Exported ${formatPrettyDate(today, lang, true)} · plan ${data.settings.plan} · stored on this device`, {
			columnSpan: cols,
			backgroundColor: "#4a382c",
			textColor: "#f3e6d8",
			borderColor: "#4a382c",
			fontSize: 10,
			height: 22
		}), ...Array.from({ length: 8 }, () => null)],
		[cell("", {
			columnSpan: cols,
			backgroundColor: CREAM,
			borderStyle: void 0,
			borderColor: CREAM,
			height: 10
		}), ...Array.from({ length: 8 }, () => null)],
		kpis.map((item) => cell(item.label, {
			backgroundColor: BAND,
			textColor: LABEL,
			fontSize: 10,
			fontWeight: "bold",
			align: "center",
			wrap: true,
			height: 32
		})),
		kpis.map((item) => cell(item.value, {
			format: typeof item.value === "number" ? item.format : void 0,
			backgroundColor: CREAM,
			fontSize: 16,
			fontWeight: "bold",
			align: "center",
			height: 30,
			textColor: INK
		})),
		[cell(lang === "th" ? "บันทึกรายวัน" : "Daily log", {
			columnSpan: cols,
			backgroundColor: SECTION,
			fontWeight: "bold",
			fontSize: 13,
			borderColor: "#e2d3c4",
			height: 24
		}), ...Array.from({ length: 8 }, () => null)],
		headers([
			lang === "th" ? "วันที่" : "Date",
			lang === "th" ? "รหัสวัน" : "ISO date",
			t(lang, "trackingGroup"),
			lang === "th" ? "อด (ชม.)" : "Fast (h)",
			lang === "th" ? "กิน (นาที)" : "Eat (min)",
			t(lang, "water"),
			t(lang, "weight"),
			t(lang, "moodQ"),
			t(lang, "notes")
		])
	];
	for (const key of keys) {
		const day = data.days[key];
		const outcome = dayOutcome(day, today);
		const tone = TONE[outcome];
		const sample = fastSample(day, now, today);
		const eat = eatHours(day, key, now, today);
		const base = {
			backgroundColor: tone.bg,
			textColor: INK
		};
		dash.push([
			cell(formatPrettyDate(key, lang, true), base),
			cell(key, {
				...base,
				align: "center"
			}),
			cell(outcomeLabel(outcome, lang), {
				...base,
				textColor: tone.fg,
				fontWeight: "bold",
				align: "center"
			}),
			cell(sample.hours > 0 || sample.counted ? round1(sample.hours) : null, {
				...base,
				format: "0.0",
				align: "right"
			}),
			cell(eat == null ? null : Math.round(eat * 60), {
				...base,
				format: "0",
				align: "right"
			}),
			cell(day && day.waterMl > 0 ? day.waterMl : null, {
				...base,
				format: "#,##0",
				align: "right"
			}),
			cell(day?.weightKg ?? null, {
				...base,
				format: "0.00",
				align: "right"
			}),
			cell(day ? moodLabel(day.mood, lang) : "—", {
				...base,
				align: "center"
			}),
			cell(day?.notes || null, {
				...base,
				wrap: true,
				align: "left"
			})
		]);
	}
	if (keys.length === 0) dash.push([cell(t(lang, "emptyStats"), {
		columnSpan: cols,
		backgroundColor: CREAM,
		align: "center",
		height: 28
	}), ...Array.from({ length: 8 }, () => null)]);
	const detail = [headers([
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
		t(lang, "notes")
	])];
	for (const key of keys) {
		const day = data.days[key];
		const outcome = dayOutcome(day, today);
		const tone = TONE[outcome];
		const base = {
			backgroundColor: tone.bg,
			textColor: INK
		};
		const sample = fastSample(day, now, today);
		(day?.meals.length ? day.meals : [null]).forEach((meal, index) => {
			const start = meal ? Date.parse(meal.start) : NaN;
			const end = meal?.end ? Date.parse(meal.end) : NaN;
			const eatMin = Number.isFinite(start) && Number.isFinite(end) && end > start ? Math.round((end - start) / 6e4) : null;
			detail.push([
				cell(formatPrettyDate(key, lang, true), base),
				cell(key, {
					...base,
					align: "center"
				}),
				cell(outcomeLabel(outcome, lang), {
					...base,
					textColor: tone.fg,
					fontWeight: "bold"
				}),
				cell(index === 0 ? clock(day?.fastingStart ?? null, lang) : "—", {
					...base,
					align: "center"
				}),
				cell(meal ? clock(meal.start, lang) : null, {
					...base,
					align: "center"
				}),
				cell(meal ? clock(meal.end, lang) : null, {
					...base,
					align: "center"
				}),
				cell(index === 0 && (sample.counted || sample.hours > 0) ? round1(sample.hours) : null, {
					...base,
					format: "0.0",
					align: "right"
				}),
				cell(eatMin, {
					...base,
					format: "0",
					align: "right"
				}),
				cell(index === 0 && day && day.waterMl > 0 ? day.waterMl : null, {
					...base,
					format: "#,##0",
					align: "right"
				}),
				cell(index === 0 ? day?.weightKg ?? null : null, {
					...base,
					format: "0.00",
					align: "right"
				}),
				cell(index === 0 && day ? moodLabel(day.mood, lang) : "—", {
					...base,
					align: "center"
				}),
				cell(meal?.description || null, {
					...base,
					wrap: true
				}),
				cell(meal?.notes || null, {
					...base,
					wrap: true
				}),
				cell(index === 0 ? day?.notes || null : null, {
					...base,
					wrap: true
				})
			]);
		});
	}
	const months = /* @__PURE__ */ new Map();
	for (const key of keys) {
		const id = key.slice(0, 7);
		const bucket = months.get(id) ?? {
			label: new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
				month: "long",
				year: "numeric"
			}).format(dateFromKey(`${id}-01`)),
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
			weightN: 0
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
	const monthRows = [headers([
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
		lang === "th" ? "น้ำหนักเฉลี่ย" : "Avg weight"
	])];
	for (const bucket of months.values()) {
		const denom = bucket.completed + bucket.multiple + bucket.other;
		const consistency = denom ? round1(bucket.completed / denom * 100) : null;
		const base = { backgroundColor: monthRows.length % 2 === 0 ? CREAM : PAPER };
		monthRows.push([
			cell(bucket.label, {
				...base,
				fontWeight: "bold"
			}),
			cell(bucket.tracked, {
				...base,
				format: "0",
				align: "right"
			}),
			cell(bucket.completed, {
				...base,
				format: "0",
				align: "right",
				textColor: "#146b42",
				fontWeight: "bold"
			}),
			cell(bucket.multiple, {
				...base,
				format: "0",
				align: "right"
			}),
			cell(bucket.rest, {
				...base,
				format: "0",
				align: "right"
			}),
			cell(bucket.off, {
				...base,
				format: "0",
				align: "right"
			}),
			cell(consistency, {
				...base,
				format: "0.0",
				align: "right"
			}),
			cell(bucket.fastN ? round1(bucket.fastSum / bucket.fastN) : null, {
				...base,
				format: "0.0",
				align: "right"
			}),
			cell(bucket.eatN ? round1(bucket.eatSum / bucket.eatN) : null, {
				...base,
				format: "0.0",
				align: "right"
			}),
			cell(bucket.water || null, {
				...base,
				format: "#,##0",
				align: "right"
			}),
			cell(bucket.weightN ? round1(bucket.weightSum / bucket.weightN) : null, {
				...base,
				format: "0.00",
				align: "right"
			})
		]);
	}
	const widths = (...list) => list.map((width) => ({ width }));
	return [
		{
			data: dash,
			sheet: lang === "th" ? "แดชบอร์ด" : "Dashboard",
			columns: widths(22, 14, 18, 12, 13, 12, 14, 16, 36),
			stickyRowsCount: 7,
			showGridLines: false,
			orientation: "landscape"
		},
		{
			data: detail,
			sheet: lang === "th" ? "รายวัน" : "Days",
			columns: widths(22, 14, 18, 16, 14, 14, 12, 13, 12, 14, 14, 28, 24, 32),
			stickyRowsCount: 1,
			showGridLines: false,
			orientation: "landscape"
		},
		{
			data: monthRows,
			sheet: lang === "th" ? "รายเดือน" : "Months",
			columns: widths(22, 16, 18, 18, 12, 18, 16, 12, 12, 16, 16),
			stickyRowsCount: 1,
			showGridLines: false,
			orientation: "landscape"
		}
	];
}
async function downloadExcel(data, now = Date.now()) {
	const writeXlsxFile = (await import("../_libs/write-excel-file.mjs").then((n) => n.t)).default;
	const blob = await (await writeXlsxFile(buildWorkbook(data, now), {
		fontFamily: FONT,
		fontSize: 11
	})).toBlob();
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `omad-dashboard-${localDateKey(new Date(now))}.xlsx`;
	link.click();
	URL.revokeObjectURL(url);
}
var NAV = [
	{
		id: "home",
		icon: House,
		label: "home"
	},
	{
		id: "calendar",
		icon: CalendarDays,
		label: "calendar"
	},
	{
		id: "stats",
		icon: ChartColumn,
		label: "stats"
	},
	{
		id: "history",
		icon: History,
		label: "history"
	},
	{
		id: "settings",
		icon: Settings,
		label: "settings"
	}
];
function OmadApp() {
	const [data, setData] = (0, import_react.useState)(null);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [view, setView] = (0, import_react.useState)("home");
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [banner, setBanner] = (0, import_react.useState)(null);
	const [installEvent, setInstallEvent] = (0, import_react.useState)(null);
	const seen = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const dataRef = (0, import_react.useRef)(data);
	dataRef.current = data;
	(0, import_react.useEffect)(() => {
		const loaded = loadPersisted(localStorage.getItem(STORAGE_KEY));
		setData(loaded);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!data) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		document.documentElement.dataset.theme = data.settings.theme;
		document.documentElement.lang = data.settings.lang === "en" ? "en" : "th";
		document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", data.settings.theme === "light" ? "#f6f1ea" : "#14110e");
	}, [data]);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		if (view !== "home") return;
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, [view]);
	(0, import_react.useEffect)(() => {
		if (!banner) return;
		const id = window.setTimeout(() => setBanner(null), 3200);
		return () => window.clearTimeout(id);
	}, [banner]);
	(0, import_react.useEffect)(() => {
		const onPrompt = (event) => {
			event.preventDefault();
			setInstallEvent(event);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		return () => window.removeEventListener("beforeinstallprompt", onPrompt);
	}, []);
	(0, import_react.useEffect)(() => {
		const tick = (prime) => {
			const current = dataRef.current;
			if (!current || typeof Notification === "undefined" || Notification.permission !== "granted") return;
			for (const notice of dueNotices(current, Date.now(), seen.current, prime)) try {
				new Notification(notice.title, {
					body: notice.body,
					lang: current.settings.lang
				});
			} catch {}
		};
		const id = window.setInterval(() => tick(false), 2e4);
		tick(true);
		return () => window.clearInterval(id);
	}, [Boolean(data)]);
	const api = (0, import_react.useMemo)(() => {
		if (!data) return null;
		const lang = data.settings.lang;
		const say = (key) => setBanner(t(lang, key));
		return {
			data,
			view,
			setView,
			sheet,
			banner,
			closeSheet: () => setSheet(null),
			openDay: (date) => {
				if (date > localDateKey(/* @__PURE__ */ new Date())) return;
				setSheet({
					type: "day",
					date
				});
			},
			activate: () => {
				setData((current) => current && activateToday(current, Date.now()));
				navigator.vibrate?.(12);
			},
			requestOff: (force) => {
				const today = data.days[localDateKey(/* @__PURE__ */ new Date())];
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
			updateSettings: (patch) => setData((current) => current && updateSettings(current, patch, Date.now())),
			setTheme: (theme) => setData((current) => current && updateSettings(current, { theme }, Date.now())),
			setLang: (next) => setData((current) => current && updateSettings(current, { lang: next }, Date.now())),
			enableNotifications: async (on) => {
				if (!on) {
					setData((current) => current && updateSettings(current, { notifications: false }, Date.now()));
					return;
				}
				if (typeof Notification === "undefined") {
					say("notifUnsupported");
					return;
				}
				if (await Notification.requestPermission() !== "granted") {
					setData((current) => current && updateSettings(current, { notifications: false }, Date.now()));
					say("notifDenied");
					return;
				}
				setData((current) => current && updateSettings(current, { notifications: true }, Date.now()));
				say("notifGranted");
			},
			exportJson: () => {
				const blob = new Blob([serialize(data)], { type: "application/json" });
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = `omad-backup-${localDateKey(/* @__PURE__ */ new Date())}.json`;
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
					setSheet({
						type: "import",
						data: parsed.data,
						count: Object.keys(parsed.data.days).length
					});
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
			}
		};
	}, [
		banner,
		data,
		installEvent,
		sheet,
		view
	]);
	if (!data || !api) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center px-6 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "mx-auto size-14 text-fast" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-lg font-semibold",
				children: "OMAD Tracker"
			})]
		})
	});
	const lang = data.settings.lang;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OmadProvider, {
		value: api,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-dvh lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-6 border-r border-line bg-surface/80 px-4 py-6 backdrop-blur-md lg:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-9 text-fast" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: t(lang, "appName")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t(lang, "tagline")
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "grid gap-1",
						"aria-label": "main",
						children: NAV.map((item) => {
							const Icon = item.icon;
							const on = view === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setView(item.id),
								className: cn("flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-medium press", on ? "bg-fast-fill text-on-accent" : "text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), t(lang, item.label)]
							}, item.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto flex min-h-16 w-full max-w-6xl items-center gap-3 px-4 py-2 lg:px-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 text-fast lg:hidden" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-semibold lg:text-base",
											children: t(lang, "appName")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted",
											children: formatPrettyDate(localDateKey(new Date(now)), lang, true)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 press",
										"aria-label": t(lang, "exportJson"),
										onClick: api.exportJson,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 press",
										"aria-label": t(lang, "exportExcel"),
										onClick: () => void api.exportExcel(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 place-items-center rounded-full press",
										"aria-label": t(lang, "themeToggle"),
										onClick: () => api.setTheme(data.settings.theme === "dark" ? "light" : "dark"),
										children: data.settings.theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 place-items-center rounded-full press lg:hidden",
										"aria-label": t(lang, "settings"),
										onClick: () => setView("settings"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							className: "mx-auto w-full max-w-6xl px-4 pt-4 pb-28 lg:px-8 lg:pb-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rise",
								children: [
									view === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, { now }) : null,
									view === "calendar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarView, { now }) : null,
									view === "stats" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsView, { now }) : null,
									view === "history" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryView, { now }) : null,
									view === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, {}) : null
								]
							}, view)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/90 backdrop-blur-md lg:hidden",
							style: { paddingBottom: "env(safe-area-inset-bottom)" },
							"aria-label": "main",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto grid max-w-lg grid-cols-5",
								children: NAV.map((item) => {
									const Icon = item.icon;
									const on = view === item.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setView(item.id),
										className: cn("relative flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium", on ? "text-fast" : "text-muted"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0 h-0.5 w-8 rounded-full bg-fast-fill", on ? "opacity-100" : "opacity-0") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }),
											t(lang, item.label)
										]
									}, item.id);
								})
							})
						})
					]
				})]
			}),
			banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				className: "fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-done-fill px-4 py-2 text-sm font-semibold text-on-accent shadow",
				children: banner
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySheet, { now }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: sheet?.type === "off",
				title: t(lang, "confirmOffTitle"),
				description: t(lang, "confirmOffBody"),
				onClose: () => setSheet(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-12 rounded-full bg-fast-fill text-sm font-semibold text-on-accent press",
						onClick: api.confirmOff,
						children: t(lang, "confirmOffYes")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 text-sm font-medium press",
						onClick: () => setSheet(null),
						children: t(lang, "stay")
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: sheet?.type === "cancel-meal",
				title: t(lang, "confirmCancelTitle"),
				description: t(lang, "confirmCancelBody"),
				onClose: () => setSheet(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-12 rounded-full bg-eat-fill text-sm font-semibold text-on-accent press",
						onClick: api.confirmCancel,
						children: t(lang, "confirmCancelYes")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 text-sm font-medium press",
						onClick: () => setSheet(null),
						children: t(lang, "back")
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: sheet?.type === "clear",
				title: t(lang, "confirmClearTitle"),
				description: t(lang, "confirmClearBody"),
				onClose: () => setSheet(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-12 rounded-full bg-eat-fill text-sm font-semibold text-on-accent press",
						onClick: api.confirmClear,
						children: t(lang, "confirmClearYes")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 text-sm font-medium press",
						onClick: () => setSheet(null),
						children: t(lang, "back")
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: sheet?.type === "import",
				title: t(lang, "importTitle"),
				description: t(lang, "importBody", { count: sheet?.type === "import" ? sheet.count : 0 }),
				onClose: () => setSheet(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-12 rounded-full bg-fast-fill text-sm font-semibold text-on-accent press",
						onClick: api.confirmImport,
						children: t(lang, "importYes")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 text-sm font-medium press",
						onClick: () => setSheet(null),
						children: t(lang, "back")
					})]
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OmadApp, {});
}
//#endregion
export { Home as component };
