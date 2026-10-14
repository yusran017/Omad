import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as FileJson, D as ChartColumn, E as ChevronLeft, O as CalendarDays, S as FileSpreadsheet, T as ChevronRight, _ as House, a as Target, b as Frown, c as Sparkles, d as Settings, f as Pencil, g as Leaf, h as Meh, l as Smile, m as Moon, n as X, o as Sunrise, p as NotebookPen, r as Utensils, s as Sun, t as Zap, u as Shield, v as History, w as Droplet, x as Flame, y as GlassWater } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { a as Bar, i as Line, n as LineChart, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bmp__O3A.js
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/icon-192.png`,
		alt: "",
		className: cn("rounded-xl object-cover", className)
	});
}
var STAGE_ICONS = {
	"0": Sunrise,
	"12": Flame,
	"16": Zap,
	"18": Sparkles,
	"20": Target,
	"24": Utensils,
	"36": Leaf,
	"48": Shield
};
function StageIcon({ id, className }) {
	const Icon = STAGE_ICONS[id] ?? Sunrise;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className: className ?? "size-4",
		strokeWidth: 2.25,
		"aria-hidden": "true"
	});
}
var STROKE = 12;
var RADIUS = 40;
function GlassDisc({ id, radius }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
		id,
		cx: "50%",
		cy: "38%",
		r: "62%",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
				offset: "0%",
				stopColor: "#ffffff",
				stopOpacity: "0.24"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
				offset: "58%",
				stopColor: "#ffffff",
				stopOpacity: "0.06"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
				offset: "100%",
				stopColor: "#ffffff",
				stopOpacity: "0"
			})
		]
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "60",
		cy: "60",
		r: radius - 8,
		fill: `url(#${id})`
	})] });
}
var TONE$1 = {
	fast: "text-fast",
	eat: "text-eat",
	done: "text-done",
	muted: "text-muted"
};
function Ring({ progress, tone, children, className, label }) {
	const radius = RADIUS;
	const circ = 2 * Math.PI * radius;
	const clamped = Math.max(0, Math.min(progress, 1));
	const gid = (0, import_react.useId)().replace(/:/g, "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative mx-auto grid place-items-center", className ?? "size-60"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 120 120",
			className: "absolute inset-0 size-full -rotate-90",
			role: "img",
			"aria-label": label,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassDisc, {
					id: gid,
					radius
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "60",
					cy: "60",
					r: radius,
					className: "fill-none stroke-line",
					strokeWidth: STROKE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "60",
					cy: "60",
					r: radius,
					className: cn("fill-none", TONE$1[tone]),
					stroke: "currentColor",
					strokeWidth: STROKE,
					strokeLinecap: "round",
					strokeDasharray: circ,
					strokeDashoffset: circ * (1 - clamped)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 max-w-[58%] px-1 text-center leading-none",
			children
		})]
	});
}
function StageRing({ hours, bands, children, className, label }) {
	const radius = RADIUS;
	const circ = 2 * Math.PI * radius;
	const cap = bands.at(-1)?.hours || 48;
	const safe = Math.max(0, hours);
	const count = Math.max(1, bands.length);
	const gid = (0, import_react.useId)().replace(/:/g, "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative mx-auto grid place-items-center", className ?? "size-44"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 120 120",
			className: "absolute inset-0 size-full -rotate-90",
			role: "img",
			"aria-label": label,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassDisc, {
					id: gid,
					radius
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "60",
					cy: "60",
					r: radius,
					className: "fill-none stroke-line",
					strokeWidth: STROKE
				}),
				bands.map((band, index) => {
					const next = bands[index + 1]?.hours ?? cap;
					const spanHours = Math.max(.001, next - band.hours);
					const within = next <= band.hours ? safe >= band.hours ? 1 : 0 : Math.max(0, Math.min(1, (safe - band.hours) / spanHours));
					if (within <= 0) return null;
					const length = within / count * circ;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "60",
						cy: "60",
						r: radius,
						fill: "none",
						stroke: band.color,
						strokeWidth: STROKE,
						strokeLinecap: "butt",
						strokeDasharray: `${length} ${circ - length}`,
						strokeDashoffset: -(index / count) * circ
					}, band.hours);
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 max-w-[58%] px-1 text-center leading-none",
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
		className: cn("flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-5 text-base font-semibold text-on-accent press", tone === "eat" ? "btn-eat" : "btn-fast"),
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
	log: {
		th: "บันทึก",
		en: "Log"
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
		th: "อยู่ในขอบเขต OMAD",
		en: "Inside OMAD"
	},
	inProgress: {
		th: "กำลังทำอยู่",
		en: "In progress"
	},
	multiple: {
		th: "เริ่มกินมากกว่า 1 ครั้ง",
		en: "More than one meal"
	},
	other: {
		th: "ไม่ได้บันทึกมื้อ",
		en: "No meal logged"
	},
	overWindow: {
		th: "กินเกิน 1 ชั่วโมง",
		en: "Ate longer than the window"
	},
	consistency: {
		th: "ความสม่ำเสมอ",
		en: "Consistency"
	},
	consistencyHint: {
		th: "นับวันที่จบมื้อเดียวภายในช่วงกิน ถ้ายกเลิกมื้อหรือจบทัน ยังอยู่ในขอบเขต วันที่ไม่ได้ติดตามและวันพักไม่นับว่าพลาด",
		en: "Days with one meal inside the eating window. Cancelling or finishing in time stays inside. Days off and rest days are not misses"
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
	saveLog: {
		th: "บันทึกช่วงนี้",
		en: "Save this stage"
	},
	logSaved: {
		th: "บันทึกแล้ว ผูกกับเวลาเริ่มอดจากหน้าแรก",
		en: "Saved. Linked to the fast you started on Home"
	},
	logHint: {
		th: "น้ำหนักนับจากเวลาที่กดเริ่มอดบนหน้าแรก ไม่ใช่เวลาที่กดบันทึก",
		en: "Weight follows the fast you started on Home, not the moment you save"
	},
	logEmpty: {
		th: "ยังไม่มีบันทึกของช่วงอด",
		en: "No note for a fast yet"
	},
	fastBegan: {
		th: "เริ่มอด {time} จากหน้าแรก",
		en: "Fast started {time} on Home"
	},
	weighedAt: {
		th: "ชั่งตอน {time}",
		en: "Weighed at {time}"
	},
	fastedFor: {
		th: "อดมาแล้ว {time}",
		en: "Fasted {time}"
	},
	weightHistory: {
		th: "ประวัติน้ำหนัก",
		en: "Weight history"
	},
	noteHistory: {
		th: "ประวัติโน้ต",
		en: "Note history"
	},
	weightHistEmpty: {
		th: "ยังไม่มีการชั่งที่ผูกกับช่วงอด",
		en: "No weigh-in linked to a fast yet"
	},
	omadWin: {
		th: "ชนะ OMAD วันนี้ กินภายในเป้า",
		en: "OMAD win. The meal stayed inside the window"
	},
	overEat: {
		th: "บันทึกแล้ว กินเกิน {time}",
		en: "Saved. Eating went past {time}"
	},
	eatClock: {
		th: "เริ่มกิน {time} · เป้า {target}",
		en: "Eating since {time} · target {target}"
	},
	eatLeft: {
		th: "เหลือ {time} ก่อนเกินเป้า",
		en: "{time} left before the window"
	},
	eatOverNow: {
		th: "เกินเป้าไป {time}",
		en: "Past the window by {time}"
	},
	winStreak: {
		th: "ชนะต่อเนื่อง",
		en: "Win streak"
	},
	omadWins: {
		th: "ชนะ OMAD",
		en: "OMAD wins"
	},
	withinTarget: {
		th: "ภายในเป้า",
		en: "Within window"
	},
	overTarget: {
		th: "เกินเป้า",
		en: "Over window"
	},
	noFastYet: {
		th: "ยังไม่เริ่มอดบนหน้าแรก น้ำหนักจะผูกเมื่อเริ่มติดตาม",
		en: "Start the fast on Home first. Weight links to that start"
	},
	mealClock: {
		th: "มื้อวันนี้",
		en: "Today's meal"
	},
	mealWait: {
		th: "ยังไม่กดเริ่มกิน แอปจะจำเวลาทันทีที่กด",
		en: "Not eating yet. The clock starts the moment you tap start"
	},
	ateFor: {
		th: "กินไป {time}",
		en: "Ate for {time}"
	},
	inBounds: {
		th: "จบมื้อภายในเวลา ยังอยู่ในขอบเขต OMAD",
		en: "Finished in time. Still inside OMAD"
	},
	mealOk: {
		th: "กินภายในเป้า",
		en: "Meal inside the window"
	},
	cancelKept: {
		th: "ยกเลิกมื้อแล้ว ยังอยู่ในขอบเขต OMAD",
		en: "Meal cancelled. Still inside OMAD"
	},
	outSecond: {
		th: "หลุด OMAD เพราะเริ่มกินครั้งที่ 2",
		en: "Out of OMAD. A second meal started"
	},
	goalFastHint: {
		th: "วงกลมเดินไปหาตัวเลขนี้ ถึงเป้าและกินมื้อเดียวในเวลาที่กำหนด จะขึ้นว่าชนะ แผน OMAD คืออด 23 ชั่วโมงในรอบ 24 ชั่วโมง",
		en: "The ring walks toward this number. Reaching it with one meal inside the window is a win. OMAD is a 23-hour fast inside a 24-hour day"
	},
	goalEatHint: {
		th: "กดเริ่มกินได้ครั้งเดียวในรอบนี้ และต้องจบภายในเวลานี้ เช่น 1 ชั่วโมง ถ้ายกเลิกหรือจบทัน จะยังอยู่ในขอบเขต ถ้ากินนานกว่านั้นหรือเริ่มครั้งที่ 2 จะหลุด",
		en: "Start eating once in this fast, and finish inside this time, such as 1 hour. Cancel or finish in time and you stay inside. A longer meal or a second start falls out"
	},
	clockHint: {
		th: "นาฬิกา 24 ชั่วโมง เช่น 14:00 คือบ่ายสองโมง ไม่มี AM/PM",
		en: "24-hour clock. 14:00 is 2 in the afternoon, not AM/PM"
	},
	hourLabel: {
		th: "ชั่วโมง",
		en: "Hour"
	},
	minuteLabel: {
		th: "นาที",
		en: "Minute"
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
	targetFastingMinutes: 1380,
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
	if (day.meals.length === 1 && !open) {
		const meal = day.meals[0];
		const start = Date.parse(meal.start);
		const end = meal.end ? Date.parse(meal.end) : NaN;
		if ((Number.isFinite(start) && Number.isFinite(end) ? Math.max(0, end - start) / 6e4 : Number.POSITIVE_INFINITY) <= day.targetEatingMinutes + 1e-6) return "completed";
		return "over";
	}
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
function scoreDay(day, now, todayKey) {
	const none = {
		fastHours: 0,
		eatMinutes: null,
		mealCount: 0,
		open: false,
		overTarget: false,
		mealOk: false,
		omadWin: false,
		fastingStart: null,
		mealStart: null,
		mealEnd: null
	};
	if (!day) return none;
	const derived = derive(day, day.date === todayKey ? now : Math.min(now, endOfDay(day.date)), todayKey);
	const meals = day.meals.filter((meal) => Number.isFinite(Date.parse(meal.start)));
	const eatMinutes = meals.length ? Math.round(derived.eatingMs / 6e4) : null;
	const fastHours = derived.fastingMs / 36e5;
	const open = meals.some((meal) => !meal.end);
	const overTarget = eatMinutes != null && !open && eatMinutes > day.targetEatingMinutes;
	const first = meals.slice().sort((a, b) => Date.parse(a.start) - Date.parse(b.start))[0] ?? null;
	const mealOk = meals.length === 1 && !open && eatMinutes != null && eatMinutes <= day.targetEatingMinutes;
	const omadWin = mealOk && fastHours + 1e-6 >= day.targetFastingMinutes / 60;
	return {
		fastHours,
		eatMinutes,
		mealCount: meals.length,
		open,
		overTarget,
		mealOk,
		omadWin,
		fastingStart: day.fastingStart,
		mealStart: first?.start ?? null,
		mealEnd: first?.end ?? null
	};
}
function winStreak(days, now) {
	const today = localDateKey(new Date(now));
	let cursor = today;
	let streak = 0;
	for (let i = 0; i < 400; i += 1) {
		const score = scoreDay(days[cursor], now, today);
		if (cursor === today && !score.omadWin) {
			cursor = addDays(cursor, -1);
			continue;
		}
		if (!score.omadWin) break;
		streak += 1;
		cursor = addDays(cursor, -1);
	}
	return streak;
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
		over: 0,
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
	const tracked = stats.completed + stats.multiple + stats.other + stats.over;
	stats.consistency = tracked ? stats.completed / tracked : null;
	return stats;
}
var FAST_BANDS = [
	{
		id: "0",
		hours: 0,
		color: "#60a5fa"
	},
	{
		id: "12",
		hours: 12,
		color: "#22d3ee"
	},
	{
		id: "16",
		hours: 16,
		color: "#f5b942"
	},
	{
		id: "18",
		hours: 18,
		color: "#a78bfa"
	},
	{
		id: "20",
		hours: 20,
		color: "#fb7185"
	},
	{
		id: "24",
		hours: 24,
		color: "#f472b6"
	},
	{
		id: "36",
		hours: 36,
		color: "#fb923c"
	},
	{
		id: "48",
		hours: 48,
		color: "#f43f5e"
	}
];
var BAND_COPY = {
	"0": {
		th: "เริ่มอด",
		en: "Started",
		noteTh: "ยังไม่ถึง 12 ชั่วโมง ร่างกายใช้น้ำตาลที่เก็บไว้เป็นหลัก",
		noteEn: "Under 12 hours. The body is still using stored sugar",
		mark: "🌅",
		verbTh: "เริ่ม",
		verbEn: "Start"
	},
	"12": {
		th: "12 ชม.",
		en: "12h",
		noteTh: "ผ่าน 12 ชม. เริ่มดึงไขมันมาใช้เป็นพลังงานมากขึ้น",
		noteEn: "12 hours. Fat is starting to cover more of the energy need",
		mark: "🔥",
		verbTh: "ไขมัน",
		verbEn: "Fat"
	},
	"16": {
		th: "16:8",
		en: "16:8",
		noteTh: "สูตร 16:8 อินซูลินมักต่ำลง และเริ่มใช้ไขมันชัดขึ้น",
		noteEn: "16:8. Insulin is often lower, and fat use is clearer",
		mark: "⚡",
		verbTh: "สลับ",
		verbEn: "Switch"
	},
	"18": {
		th: "18:6",
		en: "18:6",
		noteTh: "สูตร 18:6 เข้าออโตฟาจีช่วงต้น เซลล์เริ่มเก็บกวาดส่วนที่เสื่อม",
		noteEn: "18:6. Early autophagy. Cells start clearing worn parts",
		mark: "✨",
		verbTh: "กวาด",
		verbEn: "Clear"
	},
	"20": {
		th: "20:4",
		en: "20:4",
		noteTh: "สูตร 20:4 ใกล้ OMAD ร่างกายพึ่งไขมันเป็นพลังงานหลัก",
		noteEn: "20:4. Near one meal. Fat is the main fuel",
		mark: "🎯",
		verbTh: "ใกล้",
		verbEn: "Near"
	},
	"24": {
		th: "OMAD",
		en: "OMAD",
		noteTh: "ครบ 24 ชม. แบบ OMAD ออโตฟาจีชัดกว่าช่วงก่อนหน้า",
		noteEn: "24 hours, OMAD. Autophagy is clearer than earlier on",
		mark: "🍽️",
		verbTh: "มื้อ",
		verbEn: "One"
	},
	"36": {
		th: "36 ชม.",
		en: "36h",
		noteTh: "อด 36 ชม. ใช้ไขมันต่อเนื่อง และออโตฟาจียังทำงานอยู่",
		noteEn: "36 hours. Fat use continues, and autophagy is still active",
		mark: "🌿",
		verbTh: "ลึก",
		verbEn: "Deep"
	},
	"48": {
		th: "48 ชม.",
		en: "48h",
		noteTh: "ครบ 48 ชม. เป็นการอดระยะยาว ฟังความรู้สึกของร่างกายด้วย",
		noteEn: "48 hours. A long fast. Pay attention to how you feel",
		mark: "🛡️",
		verbTh: "ยาว",
		verbEn: "Long"
	}
};
function fastBand(ms) {
	const hours = Math.max(0, ms / 36e5);
	let current = FAST_BANDS[0];
	for (const band of FAST_BANDS) if (hours + 1e-9 >= band.hours) current = band;
	return current;
}
function fastBandLabel(ms, lang) {
	return BAND_COPY[fastBand(ms).id][lang];
}
function fastBandNoteFor(id, lang) {
	const copy = BAND_COPY[id];
	return lang === "th" ? copy.noteTh : copy.noteEn;
}
function fastBandNote(ms, lang) {
	return fastBandNoteFor(fastBand(ms).id, lang);
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
function normalizeLog(value) {
	if (!value || typeof value !== "object") return null;
	const log = value;
	if (typeof log.at !== "string" || !Number.isFinite(Date.parse(log.at))) return null;
	const weight = numOrNull(log.weightKg);
	return {
		id: typeof log.id === "string" && log.id ? log.id : crypto.randomUUID(),
		at: log.at,
		fastingMs: clampNum(log.fastingMs, 0, 432e6, 0),
		fastingStart: typeof log.fastingStart === "string" && Number.isFinite(Date.parse(log.fastingStart)) ? log.fastingStart : null,
		notes: clip(log.notes, 500),
		mood: typeof log.mood === "string" && MOODS$1.has(log.mood) ? log.mood : null,
		weightKg: weight === null ? null : Math.max(20, Math.min(400, Math.round(weight * 10) / 10))
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
		mood: typeof day.mood === "string" && MOODS$1.has(day.mood) ? day.mood : null,
		logs: Array.isArray(day.logs) ? day.logs.map(normalizeLog).filter((log) => Boolean(log)).slice(-40) : [],
		mealDraft: clip(day.mealDraft, 500)
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
var WATER = [
	50,
	100,
	150,
	250,
	500
];
function HomeView({ now }) {
	const { data, activate, requestOff, startEat, stopEat, requestCancel, openDay, addWater } = useOmad();
	const lang = data.settings.lang;
	const view = present(data.days, now);
	const today = view.today;
	const derived = view.derived;
	const fastingMs = view.mode === "eating" ? derived?.fastingMs ?? 0 : derived?.phaseElapsedMs ?? derived?.fastingMs ?? 0;
	const hours = fastingMs / 36e5;
	const band = fastBand(fastingMs);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const pickedBand = FAST_BANDS.find((item) => item.id === picked) ?? null;
	const shown = pickedBand ?? band;
	const minuteStatus = statusLine(lang, view.mode, derived);
	const tracking = view.mode === "fasting" || view.mode === "eating";
	const eatTarget = today?.targetEatingMinutes ?? data.settings.targetEatingMinutes;
	const eatLeft = (derived?.phaseElapsedMs ?? 0) - eatTarget * 6e4;
	const score = today ? scoreDay(today, now, view.todayKey) : null;
	const detail = pickedBand ? fastBandNoteFor(pickedBand.id, lang) : view.mode === "inactive" ? t(lang, "notActiveBody") : view.mode === "rest" ? t(lang, "restBody") : view.mode === "eating" ? eatLeft > 0 ? t(lang, "eatOverNow", { time: formatWords(eatLeft, lang) }) : t(lang, "eatLeft", { time: formatWords(-eatLeft, lang) }) : fastBandNoteFor(shown.id, lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card flex min-h-0 flex-1 flex-col p-3",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ring-slot py-1",
					children: view.mode === "eating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ring, {
						progress: derived?.progress ?? 0,
						tone: "eat",
						label: minuteStatus,
						className: "ring-fit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold leading-none text-eat",
							children: t(lang, "eating")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tabular mt-1 text-2xl font-semibold leading-none tracking-tight text-fg",
							children: formatHMS(derived?.phaseElapsedMs ?? 0)
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StageRing, {
						hours: view.mode === "fasting" ? hours : 0,
						bands: [...FAST_BANDS],
						label: minuteStatus,
						className: cn("ring-fit", view.mode === "fasting" && "ring-live"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold leading-none",
							style: { color: view.mode === "fasting" ? shown.color : void 0 },
							children: view.mode === "rest" ? t(lang, "rest") : view.mode === "fasting" ? fastBandLabel(shown.hours * 36e5, lang) : t(lang, "notActiveTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tabular mt-1 text-2xl font-semibold leading-none tracking-tight text-fg",
							children: formatHMS(view.mode === "fasting" ? derived?.phaseElapsedMs ?? 0 : 0)
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 grid shrink-0 grid-cols-7 gap-1",
					children: FAST_BANDS.filter((item) => item.hours > 0).map((item) => {
						const reached = view.mode === "fasting" && hours + 1e-9 >= item.hours;
						const active = shown.id === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": active,
							title: fastBandNoteFor(item.id, lang),
							onClick: () => setPicked((current) => current === item.id ? null : item.id),
							className: cn("flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl press", active ? "stage-on bg-surface-2" : ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: active || reached ? item.color : "var(--muted)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageIcon, {
									id: item.id,
									className: "size-4"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "micro font-semibold",
								style: { color: active || reached ? item.color : "var(--muted)" },
								children: fastBandLabel(item.hours * 36e5, lang)
							})]
						}, item.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 shrink-0 rounded-2xl bg-surface-2 px-3 py-2 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center justify-center gap-1.5 text-sm font-semibold",
						style: { color: pickedBand || view.mode === "fasting" ? shown.color : view.mode === "eating" ? "var(--eat)" : "var(--muted)" },
						children: [view.mode === "eating" && !pickedBand ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageIcon, {
							id: shown.id,
							className: "size-4"
						}), pickedBand ? fastBandLabel(pickedBand.hours * 36e5, lang) : view.mode === "eating" ? t(lang, "eating") : view.mode === "rest" ? t(lang, "rest") : view.mode === "fasting" ? fastBandLabel(shown.hours * 36e5, lang) : t(lang, "notActiveTitle")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-3 text-xs leading-snug text-muted",
						children: detail
					})]
				}),
				view.mode === "eating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-xs font-medium text-fg",
					children: t(lang, "eatClock", {
						time: formatTime(derived?.openMeal?.start ?? null, lang),
						target: formatHours(eatTarget, lang)
					})
				}) : null,
				score?.mealOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-xs font-semibold text-done",
					children: t(lang, "inBounds")
				}) : null,
				score && score.mealCount > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-xs font-semibold text-eat",
					children: t(lang, "outSecond")
				}) : null,
				score?.overTarget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-xs font-semibold text-eat",
					children: t(lang, "overWindow")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: view.mode === "inactive" || view.mode === "rest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
						onClick: activate,
						children: t(lang, "startToday")
					}) : view.mode === "eating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
						tone: "eat",
						onClick: stopEat,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "size-5" }), t(lang, "stopEating")]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrimaryButton, {
						onClick: startEat,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "size-5" }), t(lang, "startEating")]
					})
				}),
				tracking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-0.5 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
						onClick: () => view.focusDate && openDay(view.focusDate),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), t(lang, view.mode === "eating" ? "editTime" : "editStart")]
						})
					}), view.mode === "eating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
						onClick: requestCancel,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), t(lang, "cancelEating")]
						})
					}) : null]
				}) : null
			]
		}), data.settings.waterEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card shrink-0 px-3 py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "inline-flex items-center gap-1.5 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "size-4 text-water" }), t(lang, "water")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular text-sm text-fg",
						children: [
							today?.waterMl ?? 0,
							" / ",
							data.settings.waterGoalMl,
							" ",
							t(lang, "ml")
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-water",
						style: { width: `${Math.min(100, (today?.waterMl ?? 0) / Math.max(1, data.settings.waterGoalMl) * 100)}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 grid grid-cols-6 gap-1",
					children: [WATER.map((ml) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterButton, {
						ml,
						onClick: () => addWater(ml)
					}, ml)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterButton, {
						ml: -50,
						onClick: () => addWater(-50)
					})]
				})
			]
		}) : null]
	});
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
			className: cn("min-h-10 rounded-xl text-sm font-medium press", on ? "bg-fast-fill text-on-accent" : "text-fg"),
			onClick: onActivate,
			children: t(lang, "trackingOn")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "radio",
			"aria-checked": !on,
			className: cn("min-h-10 rounded-xl text-sm font-medium press", !on ? "bg-surface text-fg" : "text-fg"),
			onClick: onOff,
			children: t(lang, "trackingOff")
		})]
	});
}
function WaterButton({ ml, onClick }) {
	const minus = ml < 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl bg-surface-2 press",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassWater, { className: cn("size-6", minus ? "text-muted" : "text-water") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "micro font-medium text-muted",
			children: minus ? `−${Math.abs(ml)}` : `+${ml}`
		})]
	});
}
function dotClass(outcome) {
	if (outcome === "completed") return "bg-done-fill";
	if (outcome === "in_progress") return "bg-fast";
	if (outcome === "multiple") return "bg-multi";
	if (outcome === "over") return "bg-eat";
	if (outcome === "rest") return "bg-rest";
	if (outcome === "other") return "bg-window";
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
						className: cn("flex aspect-square flex-col items-center justify-center rounded-xl text-sm press", key === today ? "bg-surface-2 text-fast" : "", future ? "text-muted" : "text-fg"),
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
					"over",
					"rest",
					"other"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", dotClass(item)) }), t(lang, item === "in_progress" ? "inProgress" : item === "over" ? "overWindow" : item)]
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
		mood: null,
		logs: [],
		mealDraft: ""
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
		mealDraft: "",
		meals: [...day.meals, {
			...meal,
			description: day.mealDraft || ""
		}]
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
	const stored = data.days[day.date];
	const next = {
		...day,
		meals,
		notes: day.notes.slice(0, 2e3),
		waterMl: stored?.waterMl ?? day.waterMl,
		logs: stored?.logs ?? day.logs ?? [],
		mealDraft: (day.mealDraft ?? stored?.mealDraft ?? "").slice(0, 500)
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
function addFastLog(data, entry, now) {
	return withDay(data, localDateKey(new Date(now)), (day) => {
		const startMs = day.fastingStart ? Date.parse(day.fastingStart) : NaN;
		const firstMeal = day.meals.map((meal) => Date.parse(meal.start)).filter((stamp) => Number.isFinite(stamp) && stamp <= now).sort((a, b) => a - b)[0];
		const until = Number.isFinite(firstMeal) ? firstMeal : now;
		const fastingMs = Number.isFinite(startMs) ? Math.max(0, until - startMs) : 0;
		const log = {
			id: crypto.randomUUID(),
			at: new Date(now).toISOString(),
			fastingStart: Number.isFinite(startMs) ? day.fastingStart : null,
			fastingMs,
			notes: entry.notes.slice(0, 500),
			mood: entry.mood,
			weightKg: entry.weightKg
		};
		return {
			...day,
			notes: log.notes || day.notes,
			mood: entry.mood ?? day.mood,
			weightKg: entry.weightKg ?? day.weightKg,
			logs: [...day.logs ?? [], log].slice(-40)
		};
	});
}
function setMealDraft(data, text, now) {
	return withDay(data, localDateKey(new Date(now)), (day) => ({
		...day,
		mealDraft: text.slice(0, 500)
	}));
}
/** Old OMAD preset was 20 hours. The 24-hour day with a 1-hour meal is a 23-hour fast. */
function upgradeOmadGoal(data) {
	if (data.settings.plan !== "omad" || data.settings.targetFastingMinutes !== 1200 || data.settings.targetEatingMinutes !== 60) return data;
	const days = { ...data.days };
	for (const [key, day] of Object.entries(days)) if (day.targetFastingMinutes === 1200 && day.targetEatingMinutes === 60) days[key] = {
		...day,
		targetFastingMinutes: 1380
	};
	return {
		...data,
		settings: {
			...data.settings,
			targetFastingMinutes: 1380
		},
		days
	};
}
/** Keep a fast that started on Home running after midnight, with the same start time. */
function carryOpenFast(data, now) {
	const today = localDateKey(new Date(now));
	const existing = data.days[today];
	if (existing?.rest || existing?.fastingStart || existing && !existing.active || (existing?.meals.length ?? 0) > 0) return data;
	let cursor = addDays(today, -1);
	for (let i = 0; i < 3; i += 1) {
		const prev = data.days[cursor];
		cursor = addDays(cursor, -1);
		if (!prev) continue;
		if (prev.rest || !prev.active || !prev.fastingStart) return data;
		const startMs = Date.parse(prev.fastingStart);
		if (!Number.isFinite(startMs) || now < startMs || now - startMs > 2592e5) return data;
		if (prev.meals.some((meal) => {
			const stamp = Date.parse(meal.start);
			return Number.isFinite(stamp) && stamp >= startMs;
		})) return data;
		const start = prev.fastingStart;
		return withDay(data, today, (day) => ({
			...day,
			active: true,
			rest: false,
			fastingStart: start,
			targetFastingMinutes: prev.targetFastingMinutes,
			targetEatingMinutes: prev.targetEatingMinutes
		}));
	}
	return data;
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
	const { data, sheet, closeSheet, commitDay, deleteDay, addWater } = useOmad();
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
				data.settings.waterEnabled && draft.date === localDateKey(new Date(now)) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-1.5 text-sm font-semibold text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "size-4 text-water" }),
						t(lang, "water"),
						" ",
						data.days[draft.date]?.waterMl ?? draft.waterMl,
						" ",
						t(lang, "ml")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-6 gap-1",
					children: [
						50,
						100,
						150,
						250,
						500,
						-50
					].map((ml) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl bg-surface-2 press",
						onClick: () => addWater(ml),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassWater, { className: ml < 0 ? "size-6 text-muted" : "size-6 text-water" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "micro font-medium text-muted",
							children: ml < 0 ? `−${Math.abs(ml)}` : `+${ml}`
						})]
					}, ml))
				})] }) : null,
				preview.fastingMs >= 432e5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-semibold",
					style: { color: fastBand(preview.fastingMs).color },
					children: [
						fastBandLabel(preview.fastingMs, lang),
						" · ",
						fastBandNote(preview.fastingMs, lang)
					]
				}) : null,
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
	if (outcome === "over") return "overWindow";
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
				className: "mt-3 grid gap-2",
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
					const stage = measured && measured.fastingMs >= 432e5 ? fastBandLabel(measured.fastingMs, lang) : null;
					const times = measured && (measured.fastingMs > 0 || measured.eatingMs > 0) ? `${t(lang, "fastingShort")} ${formatWords(measured.fastingMs, lang)} · ${t(lang, "eatingShort")} ${formatWords(measured.eatingMs, lang)}` : "";
					const latest = record?.logs?.at(-1);
					const score = record ? scoreDay(record, now, today) : null;
					const won = Boolean(score?.omadWin);
					const windowBit = score?.overTarget ? t(lang, "overTarget") : score?.mealOk ? t(lang, "mealOk") : "";
					const detail = [
						won ? t(lang, "omadWins") : windowBit,
						stage ?? t(lang, labelKey(outcome)),
						times,
						latest?.notes ? latest.notes : "",
						open ? t(lang, "unclosed") : ""
					].filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-center gap-3 rounded-2xl bg-surface-2 px-3 py-3 text-left press",
						onClick: () => openDay(key),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `size-2.5 shrink-0 rounded-full ${dotClass(outcome)}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: formatPrettyDate(key, lang, true)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted",
								children: detail
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
function LogView({ now }) {
	const { data, setMealText, setMealDraft, saveFastLog } = useOmad();
	const lang = data.settings.lang;
	const view = present(data.days, now);
	const today = view.today;
	const meal = view.derived?.openMeal ?? today?.meals.at(-1) ?? null;
	const fastingStart = today?.fastingStart ?? null;
	const fastMs = linkedMs(today, now);
	const band = fastBand(fastMs);
	const [mood, setMood] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [weight, setWeight] = (0, import_react.useState)("");
	const notesLog = [...today?.logs ?? []].reverse().filter((log) => log.notes || log.mood);
	const weights = weightRows(data.days);
	const score = today ? scoreDay(today, now, view.todayKey) : null;
	const kg = weight.trim() ? Number(weight) : null;
	const canSave = Boolean(fastingStart) && (kg === null || Number.isFinite(kg) && kg >= 20 && kg <= 400) && (notes.trim().length > 0 || mood !== null || kg !== null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "journal")
					}),
					fastingStart ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-semibold",
						style: { color: band.color },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							style: { color: band.color },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageIcon, {
									id: band.id,
									className: "size-4"
								}),
								t(lang, "fastBegan", { time: formatTime(fastingStart, lang) }),
								" · ",
								t(lang, "fastedFor", { time: formatWords(fastMs, lang) })
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: t(lang, "noFastYet")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-snug text-muted",
						children: t(lang, "logHint")
					}),
					score?.mealStart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("mt-2 text-sm font-semibold", score.omadWin || score.mealOk ? "text-done" : score.overTarget ? "text-eat" : "text-fg"),
						children: [
							t(lang, "startedEat", { time: formatTime(score.mealStart, lang) }),
							score.eatMinutes != null ? ` · ${t(lang, "ateFor", { time: formatWords(score.eatMinutes * 6e4, lang) })}` : "",
							" · ",
							score.omadWin ? t(lang, "omadWin") : score.overTarget ? t(lang, "overTarget") : score.mealOk ? t(lang, "mealOk") : score.open ? t(lang, "eating") : t(lang, "dash")
						]
					}) : fastingStart ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: t(lang, "mealWait")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: t(lang, "moodQ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-5 gap-1.5",
						children: MOODS.map((item) => {
							const Icon = item.icon;
							const on = mood === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": on,
								onClick: () => setMood(on ? null : item.id),
								className: cn("flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border px-1 text-xs press", on ? "border-fast-fill bg-fast-fill text-on-accent" : "border-line bg-surface-2 text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t(lang, item.key)]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm text-muted",
						children: [t(lang, "notes"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "area mt-1",
							value: notes,
							placeholder: t(lang, "notesPh"),
							onChange: (event) => setNotes(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm text-muted",
						children: [t(lang, "weight"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							inputMode: "decimal",
							type: "number",
							min: 20,
							max: 400,
							step: .1,
							value: weight,
							placeholder: today?.weightKg ? String(today.weightKg) : t(lang, "kg"),
							onChange: (event) => setWeight(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm text-muted",
						children: [t(lang, "mealFood"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: meal && view.focusDate ? meal.description : today?.mealDraft ?? "",
							placeholder: t(lang, "mealPh"),
							onChange: (event) => {
								if (meal && view.focusDate) setMealText(view.focusDate, meal.id, event.target.value);
								else setMealDraft(event.target.value);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !canSave,
						className: "btn-fast mt-3 min-h-12 w-full rounded-2xl text-sm font-semibold text-on-accent press disabled:opacity-40",
						onClick: () => {
							if (!canSave) return;
							saveFastLog({
								notes: notes.trim(),
								mood,
								weightKg: kg === null ? null : Math.round(kg * 10) / 10
							});
							setNotes("");
							setMood(null);
							setWeight("");
						},
						children: t(lang, "saveLog")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "weightHistory")
					}),
					weights.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: t(lang, "weightHistEmpty")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-2",
						children: weights.map((row) => {
							const stage = fastBand(row.fastingMs);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-2xl bg-surface-2 px-3 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "tabular text-lg font-semibold",
										children: [
											row.kg,
											" ",
											t(lang, "kg")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "inline-flex items-center gap-1 text-sm font-medium",
										style: { color: stage.color },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageIcon, {
												id: stage.id,
												className: "size-4"
											}),
											row.fastingStart ? t(lang, "fastBegan", { time: formatTime(row.fastingStart, lang) }) : fastBandLabel(row.fastingMs, lang),
											" · ",
											t(lang, "fastedFor", { time: formatWords(row.fastingMs, lang) })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: t(lang, "weighedAt", { time: formatTime(row.at, lang) })
									}),
									row.delta != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: cn("text-xs font-semibold", row.delta > 0 ? "text-eat" : row.delta < 0 ? "text-done" : "text-muted"),
										children: [
											row.delta > 0 ? "+" : "",
											row.delta.toFixed(1),
											" ",
											t(lang, "kg")
										]
									}) : null
								]
							}, row.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t(lang, "noteHistory")
					}),
					notesLog.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: t(lang, "logEmpty")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-2",
						children: notesLog.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl bg-surface-2 px-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "inline-flex items-center gap-1 text-sm font-semibold",
									style: { color: fastBand(log.fastingMs).color },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageIcon, {
											id: fastBand(log.fastingMs).id,
											className: "size-4"
										}),
										fastBandLabel(log.fastingMs, lang),
										" · ",
										t(lang, "fastedFor", { time: formatWords(log.fastingMs, lang) })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-sm text-fg",
									children: log.notes || t(lang, "dash")
								}),
								log.mood ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: t(lang, moodKey(log.mood))
								}) : null
							]
						}, log.id))
					})
				]
			})
		]
	});
}
function linkedMs(day, now) {
	if (!day?.fastingStart) return 0;
	const start = Date.parse(day.fastingStart);
	if (!Number.isFinite(start)) return 0;
	const first = day.meals.map((meal) => Date.parse(meal.start)).filter((stamp) => Number.isFinite(stamp) && stamp <= now).sort((a, b) => a - b)[0];
	return Math.max(0, (first ?? now) - start);
}
function weightRows(days) {
	const rows = [];
	for (const day of Object.values(days)) {
		const logged = (day.logs ?? []).filter((log) => typeof log.weightKg === "number");
		for (const log of logged) rows.push({
			id: log.id,
			at: log.at,
			kg: log.weightKg,
			fastingStart: log.fastingStart ?? day.fastingStart,
			fastingMs: log.fastingMs,
			delta: null
		});
		if (typeof day.weightKg === "number" && logged.length === 0) rows.push({
			id: `${day.date}-weight`,
			at: day.fastingStart ?? `${day.date}T12:00:00`,
			kg: day.weightKg,
			fastingStart: day.fastingStart,
			fastingMs: linkedMs(day, day.fastingStart ? Date.parse(day.fastingStart) + 1 : Date.now()),
			delta: null
		});
	}
	const ordered = rows.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 30);
	for (let i = 0; i < ordered.length; i += 1) {
		const older = ordered[i + 1];
		ordered[i].delta = older ? Math.round((ordered[i].kg - older.kg) * 10) / 10 : null;
	}
	return ordered;
}
function moodKey(mood) {
	if (mood === "good") return "moodGood";
	if (mood === "tired") return "moodTired";
	if (mood === "difficult") return "moodDifficult";
	if (mood === "strong") return "moodStrong";
	return "moodNormal";
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
		fast: 1380,
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
						children: [
							t(lang, "goalFast"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs leading-snug",
								children: t(lang, "goalFastHint")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: [
							t(lang, "goalEat"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs leading-snug",
								children: t(lang, "goalEatHint")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockField, {
						lang,
						value: data.settings.preferredEatingTime,
						onChange: (value) => updateSettings({ preferredEatingTime: value })
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
function ClockField({ lang, value, onChange }) {
	const [rawH, rawM] = value.split(":");
	const hour = String(Math.min(23, Math.max(0, Number(rawH) || 0))).padStart(2, "0");
	const minute = String(Math.min(59, Math.max(0, Number(rawM) || 0))).padStart(2, "0");
	const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
	const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "text-sm text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: t(lang, "preferredEat") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t(lang, "hourLabel"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "field mt-1",
					value: hour,
					onChange: (event) => onChange(`${event.target.value}:${minute}`),
					children: hours.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item,
						children: item
					}, item))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t(lang, "minuteLabel"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "field mt-1",
					value: minute,
					onChange: (event) => onChange(`${hour}:${event.target.value}`),
					children: minutes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item,
						children: item
					}, item))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1 block text-xs leading-snug",
				children: [
					t(lang, "clockHint"),
					" · ",
					hour,
					":",
					minute,
					lang === "th" ? " น." : ""
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
	const weights = Object.values(data.days).flatMap((day) => {
		const logged = (day.logs ?? []).filter((log) => typeof log.weightKg === "number");
		if (logged.length) return logged.map((log) => ({
			date: log.at,
			label: day.date.slice(5),
			kg: log.weightKg
		}));
		return typeof day.weightKg === "number" ? [{
			date: day.date,
			label: day.date.slice(5),
			kg: day.weightKg
		}] : [];
	}).sort((a, b) => a.date.localeCompare(b.date));
	const tracked = stats.completed + stats.inProgress + stats.multiple + stats.other;
	const wins = Object.values(data.days).filter((day) => scoreDay(day, now, localDateKey(new Date(now))).omadWin).length;
	const streak = winStreak(data.days, now);
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
							className: "tabular block text-xs font-semibold leading-none whitespace-nowrap",
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
						label: t(lang, "omadWins"),
						value: String(wins)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: t(lang, "winStreak"),
						value: String(streak)
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
			weights.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card p-4 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: t(lang, "weightChart")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
	},
	over: {
		bg: "#fde8ee",
		fg: "#9f1239"
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
function journalText(day, lang) {
	if (!day) return null;
	const extra = (day.logs ?? []).map((log) => log.notes ? `${fastBandLabel(log.fastingMs, lang)}: ${log.notes}` : fastBandLabel(log.fastingMs, lang)).join(" · ");
	return [day.notes, extra].filter(Boolean).join(" · ") || null;
}
function outcomeLabel(outcome, lang, hours = 0) {
	if (outcome === "over") return t(lang, "overWindow");
	if (outcome === "multiple") return t(lang, "multiple");
	if (hours >= 12) return fastBandLabel(hours * 36e5, lang);
	if (outcome === "not_active") return t(lang, "notActive");
	if (outcome === "in_progress") return t(lang, "inProgress");
	if (outcome === "completed") return t(lang, "completed");
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
			label: t(lang, "omadWins"),
			value: keys.filter((key) => scoreDay(data.days[key], now, today).omadWin).length,
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
			cell(outcomeLabel(outcome, lang, sample.hours), {
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
			cell(journalText(day, lang), {
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
	dash.push([cell(lang === "th" ? "วิเคราะห์ OMAD" : "OMAD analysis", {
		columnSpan: cols,
		backgroundColor: SECTION,
		fontWeight: "bold",
		fontSize: 13,
		borderColor: "#e2d3c4",
		height: 24
	}), ...Array.from({ length: 8 }, () => null)]);
	dash.push(headers([
		lang === "th" ? "วันที่" : "Date",
		lang === "th" ? "เริ่มอด" : "Fast start",
		lang === "th" ? "เริ่มกิน" : "Meal start",
		lang === "th" ? "จบกิน" : "Meal end",
		lang === "th" ? "กิน (นาที)" : "Eat (min)",
		lang === "th" ? "หน้าต่าง 1 ชม." : "1h window",
		lang === "th" ? "ช่วงที่ถึง" : "Stage",
		t(lang, "omadWins"),
		t(lang, "weight")
	]));
	for (const key of keys) {
		const day = data.days[key];
		if (!day?.active && day?.meals.length !== 1 && !day?.logs?.length) continue;
		if (!day) continue;
		const score = scoreDay(day, now, today);
		const base = {
			backgroundColor: TONE[dayOutcome(day, today)].bg,
			textColor: INK
		};
		const windowLabel = score.eatMinutes == null ? "—" : score.overTarget ? t(lang, "overTarget") : t(lang, "withinTarget");
		const food = day.meals.map((meal) => meal.description.trim()).filter(Boolean).join(", ");
		const stage = fastBandLabel(score.fastHours * 36e5, lang);
		dash.push([
			cell(formatPrettyDate(key, lang, true), base),
			cell(clock(score.fastingStart, lang), {
				...base,
				align: "center"
			}),
			cell(clock(score.mealStart, lang), {
				...base,
				align: "center"
			}),
			cell(clock(score.mealEnd, lang), {
				...base,
				align: "center"
			}),
			cell(score.eatMinutes, {
				...base,
				format: "0",
				align: "right"
			}),
			cell(windowLabel, {
				...base,
				align: "center",
				fontWeight: "bold",
				textColor: score.overTarget ? "#9f1239" : score.mealOk ? "#3f6212" : INK
			}),
			cell(food ? `${stage} · ${food}` : stage, {
				...base,
				align: "left",
				wrap: true
			}),
			cell(score.omadWin ? t(lang, "omadWins") : score.mealOk ? t(lang, "mealOk") : "—", {
				...base,
				align: "center",
				fontWeight: "bold"
			}),
			cell(day.weightKg, {
				...base,
				format: "0.00",
				align: "right"
			})
		]);
	}
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
				cell(outcomeLabel(outcome, lang, index === 0 ? sample.hours : 0), {
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
				cell(index === 0 ? journalText(day, lang) : null, {
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
		id: "log",
		icon: NotebookPen,
		label: "log"
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
		setData(carryOpenFast(upgradeOmadGoal(loaded), Date.now()));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!data) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		document.documentElement.dataset.theme = data.settings.theme;
		document.documentElement.lang = data.settings.lang === "en" ? "en" : "th";
		document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", data.settings.theme === "light" ? "#eef2f5" : "#0e141b");
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
			if (!current) return;
			const carried = carryOpenFast(current, Date.now());
			if (carried !== current) setData(carried);
			if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
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
				const stamp = Date.now();
				const second = (data.days[localDateKey(new Date(stamp))]?.meals.length ?? 0) > 0;
				setData((current) => current && startEating(current, stamp));
				if (second) say("outSecond");
				navigator.vibrate?.(12);
			},
			stopEat: () => {
				const stamp = Date.now();
				const open = findOpenMeal(data.days, stamp);
				const next = stopEating(data, stamp);
				setData(next);
				const todayKey = localDateKey(new Date(stamp));
				const fastMs = open ? derive(next.days[open.date], stamp, todayKey).fastingMs : 0;
				const scored = open ? scoreDay(next.days[open.date], stamp, todayKey) : null;
				if ((scored?.mealCount ?? 0) > 1) say("outSecond");
				else if (scored?.overTarget) setBanner(t(lang, "overEat", { time: formatHours(next.days[open?.date ?? ""]?.targetEatingMinutes ?? data.settings.targetEatingMinutes, lang) }));
				else if (scored?.omadWin) say("omadWin");
				else if (scored?.mealOk) say("inBounds");
				else if (fastMs >= 432e5) setBanner(`${fastBandLabel(fastMs, lang)} · ${fastBandNote(fastMs, lang)}`);
				else say("savedMeal");
				navigator.vibrate?.(12);
			},
			requestCancel: () => setSheet({ type: "cancel-meal" }),
			addWater: (delta) => setData((current) => current && addWater(current, delta, Date.now())),
			setMood: (mood) => setData((current) => current && setMood(current, mood, Date.now())),
			setNotes: (notes) => setData((current) => current && setNotes(current, notes, Date.now())),
			saveFastLog: (entry) => {
				setData((current) => current && addFastLog(current, entry, Date.now()));
				setBanner(t(lang, "logSaved"));
			},
			setMealDraft: (text) => setData((current) => current && setMealDraft(current, text, Date.now())),
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
				say("cancelKept");
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
				className: cn("lg:flex", view === "home" ? "h-dvh overflow-hidden" : "min-h-dvh"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-6 border-r border-line bg-surface px-4 py-6 lg:flex",
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
					className: cn("flex min-h-0 min-w-0 flex-1 flex-col", view === "home" && "h-dvh"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "sticky top-0 z-20 border-b border-line bg-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto flex min-h-14 w-full max-w-6xl items-center gap-3 px-3 py-2 lg:px-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-9 text-fast lg:hidden" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-base font-semibold leading-tight",
											children: formatPrettyDate(localDateKey(new Date(now)), lang, true)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted",
											children: t(lang, "tagline")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 shrink-0 place-items-center rounded-full press",
										"aria-label": t(lang, "themeToggle"),
										onClick: () => api.setTheme(data.settings.theme === "dark" ? "light" : "dark"),
										children: data.settings.theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: cn("grid size-11 shrink-0 place-items-center rounded-full press", view === "settings" && "bg-surface-2 text-fast"),
										"aria-label": t(lang, "settings"),
										onClick: () => setView("settings"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							className: cn("mx-auto flex w-full max-w-6xl flex-col px-3 lg:px-6", view === "home" ? "min-h-0 flex-1 overflow-hidden pt-1 pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-3" : "pt-1 pb-28 lg:pb-10"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rise", view === "home" && "flex min-h-0 flex-1 flex-col"),
								children: [
									view === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, { now }) : null,
									view === "calendar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarView, { now }) : null,
									view === "stats" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsView, { now }) : null,
									view === "history" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryView, { now }) : null,
									view === "log" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogView, { now }) : null,
									view === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, {}) : null
								]
							}, view)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface lg:hidden",
							style: { paddingBottom: "env(safe-area-inset-bottom)" },
							"aria-label": "main",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto grid max-w-lg grid-cols-5 px-1",
								children: NAV.map((item) => {
									const Icon = item.icon;
									const on = view === item.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setView(item.id),
										className: cn("flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium", on ? "text-fast" : "text-muted"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("grid size-8 place-items-center rounded-xl", on ? "bg-fast-fill text-on-accent" : ""),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
										}), t(lang, item.label)]
									}, item.id);
								})
							})
						})
					]
				})]
			}),
			banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				className: "fixed top-4 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-2xl bg-surface px-4 py-2 text-sm font-semibold text-fg shadow",
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
