import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { X } from "lucide-react";

export function cn(...parts: Array<string | false | null | undefined>) {
  return clsx(parts);
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path
        fill="currentColor"
        d="M16.1 7.4c.15 2.2-.65 3.55-1.6 4.6 1.65.05 3.15 1.2 3.65 2.95.6 2.05-.55 4.15-2.5 5.05-2.05.95-4.4.15-5.35-1.65-.75-1.45-.45-3 .3-4.35-1.05-1.3.2-3.4 2.1-4.95.7-.55 1.55-1.2 2.4-1.65z"
      />
    </svg>
  );
}

const TONE = {
  fast: "text-fast",
  eat: "text-eat",
  done: "text-done",
  muted: "text-muted",
} as const;

export function Ring({
  progress,
  tone,
  children,
  className,
  label,
}: {
  progress: number;
  tone: keyof typeof TONE;
  children?: ReactNode;
  className?: string;
  label: string;
}) {
  const radius = 46;
  const circ = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(progress, 1));
  return (
    <div className={cn("relative mx-auto grid place-items-center", className ?? "size-60")}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90" role="img" aria-label={label}>
        <circle cx="60" cy="60" r={radius} className="fill-none stroke-line" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          className={cn("fill-none", TONE[tone])}
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - clamped)}
        />
      </svg>
      <div className="relative z-10 px-6 text-center">{children}</div>
    </div>
  );
}

export function Sheet({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/50" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-xl lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:rounded-3xl">
          <div className="flex items-start gap-3 px-4 pt-4 pb-2">
            <div className="min-w-0 flex-1">
              <Dialog.Title className="text-lg font-semibold text-fg">{title}</Dialog.Title>
              <Dialog.Description className={description ? "mt-1 text-sm text-muted" : "sr-only"}>
                {description ?? title}
              </Dialog.Description>
            </div>
            <Dialog.Close className="grid size-11 place-items-center rounded-full text-fg press" aria-label="close">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <div className="overflow-y-auto px-4 pb-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
  cols,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
  cols: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("grid gap-1 rounded-2xl bg-surface-2 p-1", cols)}>
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-11 rounded-xl px-2 text-sm font-medium press",
              on ? "bg-fast-fill text-on-accent" : "text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface-2 px-3 py-3 text-left press"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-fg">{label}</span>
        {hint ? <span className="mt-0.5 block text-xs leading-snug text-muted">{hint}</span> : null}
      </span>
      <span className={cn("relative h-7 w-12 shrink-0 rounded-full", checked ? "bg-fast-fill" : "bg-line")} aria-hidden="true">
        <span className={cn("absolute top-0.5 left-0.5 size-6 rounded-full bg-knob shadow transition-transform", checked && "translate-x-5")} />
      </span>
    </button>
  );
}

export function PrimaryButton({
  children,
  onClick,
  tone = "fast",
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: "fast" | "eat";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-5 text-base font-semibold text-on-accent press",
        tone === "eat" ? "bg-eat-fill" : "bg-fast-fill",
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 rounded-full px-3 text-sm font-medium text-fg press">
      {children}
    </button>
  );
}
