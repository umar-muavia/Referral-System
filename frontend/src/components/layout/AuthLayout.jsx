import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#0f766e_0%,#115e59_42%,#0f172a_100%)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)] sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-teal-300/20 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-2xl" />

        <p className="mb-6 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
          Referra
        </p>
        <h1 className="max-w-md font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-teal-50/85">
          {subtitle}
        </p>

        <div className="mt-10 flex items-center gap-3 text-sm text-teal-100/80">
          <span className="rounded-full bg-white/10 px-3 py-1">+10 points</span>
          <span>per successful referral</span>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--line)] bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
        {children}
        {footer ? (
          <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
            {footer}
          </p>
        ) : null}
        <p className="mt-4 text-center text-sm text-[var(--ink-faint)]">
          <Link href={ROUTES.HOME} className="underline-offset-4 hover:underline">
            Back to home
          </Link>
        </p>
      </section>
    </div>
  );
}
