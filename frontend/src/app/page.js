import Link from "next/link";
import { ROUTES, REFERRAL_REWARD_POINTS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_55%)]" />
      <div className="hero-glow pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="hero-glow pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col justify-center px-5 py-16 sm:px-8">
        <p className="fade-up font-[family-name:var(--font-display)] text-5xl tracking-tight text-[var(--ink)] sm:text-7xl">
          Referra
        </p>

        <h1 className="fade-up-delay mt-6 max-w-3xl font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight text-[var(--ink)] sm:text-5xl">
          Invite friends. Earn {REFERRAL_REWARD_POINTS} points. Grow together.
        </h1>

        <p className="fade-up-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg">
          Create your account, get a unique referral code, and track every
          successful signup from one clean dashboard.
        </p>

        <div className="fade-up-delay-2 mt-9 flex flex-wrap gap-3">
          <Link href={ROUTES.REGISTER}>
            <Button size="lg">Create free account</Button>
          </Link>
          <Link href={ROUTES.LOGIN}>
            <Button size="lg" variant="secondary">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
