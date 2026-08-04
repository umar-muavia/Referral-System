"use client";

import { cn } from "@/lib/utils";

export function Input({
  label,
  id,
  error,
  hint,
  className,
  containerClassName,
  ...props
}) {
  const inputId = id || props.name;

  return (
    <label className={cn("flex w-full flex-col gap-2", containerClassName)}>
      {label ? (
        <span className="text-sm font-medium text-[var(--ink-muted)]">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-12 w-full rounded-xl border bg-white/80 px-4 text-[var(--ink)] outline-none transition placeholder:text-[var(--ink-faint)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]",
          error ? "border-[#dc2626]" : "border-[var(--line)]",
          className
        )}
        {...props}
      />
      {error ? <span className="text-sm text-[#dc2626]">{error}</span> : null}
      {!error && hint ? (
        <span className="text-sm text-[var(--ink-faint)]">{hint}</span>
      ) : null}
    </label>
  );
}
