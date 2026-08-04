import { cn } from "@/lib/utils";

export function Spinner({ className }) {
  return (
    <div
      className={cn(
        "h-8 w-8 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]",
        className
      )}
      aria-label="Loading"
    />
  );
}
