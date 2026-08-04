"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ReferralCodeCard({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-8 top-0 h-28 w-28 rounded-full bg-teal-400/15 blur-2xl" />
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--ink-faint)]">
        Your referral code
      </p>
      <p className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-[0.18em] text-[var(--ink)] sm:text-5xl">
        {code || "--------"}
      </p>
      <p className="mt-3 max-w-sm text-sm text-[var(--ink-muted)]">
        Share this code. When someone signs up with it, you earn 10 points.
      </p>
      <Button className="mt-6" variant="secondary" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy code"}
      </Button>
    </article>
  );
}
