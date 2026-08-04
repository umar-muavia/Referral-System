import { formatDate } from "@/lib/utils";

export function ReferredUsersList({ users = [] }) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--line)] bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--ink)]">
            Referred users
          </h2>
          <p className="mt-1 text-sm text-[var(--ink-muted)]">
            People who joined using your code
          </p>
        </div>
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-semibold text-[var(--accent-strong)]">
          {users.length}
        </span>
      </div>

      {users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface-soft)] px-5 py-10 text-center">
          <p className="font-medium text-[var(--ink)]">No referrals yet</p>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Share your code to see referrals appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[var(--line)]">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-[var(--ink)]">{user.name}</p>
                <p className="text-sm text-[var(--ink-muted)]">{user.email}</p>
              </div>
              <p className="text-sm text-[var(--ink-faint)]">
                Joined {formatDate(user.referredAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
