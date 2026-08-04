"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <header className="relative z-20 border-b border-white/40 bg-white/55 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href={ROUTES.HOME} className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent)] text-sm font-bold text-white shadow-[0_10px_24px_rgba(15,118,110,0.35)]">
            RF
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--ink)]">
            Referra
          </span>
        </Link>

        <nav className="flex min-h-10 items-center gap-2 sm:gap-3">
          {isLoading ? null : isAuthenticated ? (
            <>
              <Link
                href={ROUTES.DASHBOARD}
                className={cn(
                  "hidden rounded-xl px-3 py-2 text-sm font-medium transition sm:inline-flex",
                  pathname === ROUTES.DASHBOARD
                    ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                    : "text-[var(--ink-muted)] hover:bg-white/70"
                )}
              >
                Dashboard
              </Link>
              <span className="hidden text-sm text-[var(--ink-muted)] md:inline">
                {user?.name}
              </span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
