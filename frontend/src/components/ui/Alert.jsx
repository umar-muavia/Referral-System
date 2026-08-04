import { cn } from "@/lib/utils";

const tones = {
  error: "border-[#fecaca] bg-[#fef2f2] text-[#991b1b]",
  success: "border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]",
  info: "border-[#bae6fd] bg-[#f0f9ff] text-[#075985]",
};

export function Alert({ children, tone = "info", className }) {
  if (!children) return null;

  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border px-4 py-3 text-sm font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </div>
  );
}
