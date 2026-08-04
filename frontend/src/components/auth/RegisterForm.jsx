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

export function RegisterForm({ initialReferralCode = "" }) {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: initialReferralCode,
  });
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
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        referralCode: form.referralCode.trim() || undefined,
      });
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to create account"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)]">
          Create account
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Get your unique referral code and start earning points.
        </p>
      </div>

      <Alert tone="error">{error}</Alert>

      <Input
        label="Full name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Alex Morgan"
        value={form.name}
        onChange={handleChange}
        required
        minLength={2}
      />

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
        autoComplete="new-password"
        placeholder="At least 6 characters"
        value={form.password}
        onChange={handleChange}
        required
        minLength={6}
      />

      <Input
        label="Referral code (optional)"
        name="referralCode"
        type="text"
        placeholder="ABC12345"
        value={form.referralCode}
        onChange={handleChange}
        maxLength={8}
        hint="Enter a friend’s code to give them +10 points"
      />

      <Button type="submit" className="w-full" loading={loading}>
        Sign up
      </Button>

      <p className="text-sm text-[var(--ink-muted)]">
        Already have an account?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="font-semibold text-[var(--accent-strong)] underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
