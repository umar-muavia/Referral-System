"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PointsStat } from "@/components/dashboard/PointsStat";
import { ReferralCodeCard } from "@/components/dashboard/ReferralCodeCard";
import { ReferredUsersList } from "@/components/dashboard/ReferredUsersList";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/hooks/useDashboard";

function DashboardContent() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useDashboard(true);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--ink-faint)]">
          Dashboard
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--ink)]">
          Welcome back, {data?.user?.name || user?.name}
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--ink-muted)]">
          Track your referral code, total points, and everyone who joined through
          your invite.
        </p>
      </div>

      {error ? (
        <div className="mb-6 space-y-3">
          <Alert tone="error">{error}</Alert>
          <Button variant="secondary" onClick={refetch}>
            Try again
          </Button>
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <ReferralCodeCard code={data?.referralCode} />
        <PointsStat
          points={data?.totalPoints ?? 0}
          referredCount={data?.referredUsers?.length ?? 0}
        />
      </div>

      <div className="mt-5">
        <ReferredUsersList users={data?.referredUsers || []} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
