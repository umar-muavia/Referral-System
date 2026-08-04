"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to log in"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)]">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Sign in to view your referral code and points.
        </p>
      </div>

      <Alert tone="error">{error}</Alert>

      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
        required
        minLength={6}
      />

      <Button type="submit" className="w-full" loading={loading}>
        Log in
      </Button>

      <p className="text-sm text-[var(--ink-muted)]">
        New here?{" "}
        <Link
          href={ROUTES.REGISTER}
          className="font-semibold text-[var(--accent-strong)] underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
