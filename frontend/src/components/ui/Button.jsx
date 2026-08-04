"use client";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] shadow-[0_10px_30px_rgba(15,118,110,0.28)]",
  secondary:
    "bg-white/80 text-[var(--ink)] border border-[var(--line)] hover:bg-white",
  ghost: "bg-transparent text-[var(--ink)] hover:bg-white/60",
  danger: "bg-[#c2410c] text-white hover:bg-[#9a3412]",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
