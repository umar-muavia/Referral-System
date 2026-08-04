export function PointsStat({ points = 0, referredCount = 0 }) {
  return (
    <article className="rounded-[1.75rem] bg-[linear-gradient(145deg,#0f766e_0%,#134e4a_55%,#0f172a_100%)] p-6 text-white shadow-[0_24px_60px_rgba(15,118,110,0.28)]">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-100/75">
        Total points
      </p>
      <p className="mt-4 font-[family-name:var(--font-display)] text-6xl tracking-tight">
        {points}
      </p>
      <p className="mt-3 text-sm text-teal-50/85">
        {referredCount} successful referral{referredCount === 1 ? "" : "s"}
      </p>
    </article>
  );
}
