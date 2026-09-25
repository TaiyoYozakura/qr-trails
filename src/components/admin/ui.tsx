"use client";

import type { ReactNode } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- shells -- */

export function Panel({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-forest/10 bg-white p-5 shadow-card sm:p-6",
        className,
      )}
    >
      {(title || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="font-display text-xl font-semibold text-charcoal">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      )}
      <div className={title ? "mt-5" : undefined}>{children}</div>
    </section>
  );
}

export function Btn({
  children,
  onClick,
  variant = "secondary",
  type = "button",
  className,
  disabled,
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  title?: string;
}) {
  const styles = {
    primary: "bg-forest text-cream hover:bg-forest-deep",
    secondary:
      "border border-forest/20 bg-white text-forest hover:border-forest/40 hover:bg-forest/5",
    danger: "border border-berry/30 bg-white text-berry hover:bg-berry/5",
    ghost: "text-ink-soft hover:bg-forest/5 hover:text-forest",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        styles,
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="block text-xs font-semibold uppercase tracking-widest text-stone">
        {label}
      </span>
      {hint && <span className="mt-1 block text-xs text-stone">{hint}</span>}
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-forest/15 bg-cream/40 px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-forest/50 focus:bg-white";

export function TextInput({
  value,
  onChange,
  placeholder,
  mono,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mono?: boolean;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cn(inputClass, mono && "font-mono text-xs", className)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cn(inputClass, "resize-y leading-relaxed", className)}
    />
  );
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(event) => onChange(Number(event.target.value))}
      className={cn(inputClass, "w-24")}
    />
  );
}

export function SelectField<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
      className={cn(inputClass, "capitalize", className)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function ChipPicker<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
            option === value
              ? "border-forest bg-forest text-cream"
              : "border-forest/20 bg-white text-ink-soft hover:border-forest/40 hover:text-forest",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/** Editor for a list of plain strings (e.g. a discovery's explanation lines). */
export function StringListEditor({
  values,
  onChange,
  placeholder,
  addLabel = "Add line",
  multiline,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-2">
      {values.map((value, index) => (
        <div key={index} className="flex items-start gap-2">
          {multiline ? (
            <TextArea
              value={value}
              rows={2}
              placeholder={placeholder}
              onChange={(next) =>
                onChange(values.map((v, i) => (i === index ? next : v)))
              }
            />
          ) : (
            <TextInput
              value={value}
              placeholder={placeholder}
              onChange={(next) =>
                onChange(values.map((v, i) => (i === index ? next : v)))
              }
            />
          )}
          <Btn
            variant="ghost"
            title="Remove"
            onClick={() => onChange(values.filter((_, i) => i !== index))}
          >
            <X className="size-4" aria-hidden />
          </Btn>
        </div>
      ))}
      <Btn variant="secondary" onClick={() => onChange([...values, ""])}>
        <Plus className="size-3.5" aria-hidden />
        {addLabel}
      </Btn>
    </div>
  );
}

export function DeleteBtn({
  onDelete,
  label = "Delete",
}: {
  onDelete: () => void;
  label?: string;
}) {
  return (
    <Btn variant="danger" onClick={onDelete}>
      <Trash2 className="size-3.5" aria-hidden />
      {label}
    </Btn>
  );
}
