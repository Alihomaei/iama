"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const supabase = createClient();

  const handleGoogleSignUp = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });
    if (error) setError(error.message);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-secondary">
            Check your email
          </h1>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            We&apos;ve sent a verification link to{" "}
            <span className="font-medium text-secondary">{email}</span>. Click
            the link to verify your account and get started.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center text-sm text-primary hover:text-primary-dark"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="mb-8 inline-flex rounded-2xl bg-white px-6 py-4 shadow-lg">
            <Image
              src="/logo-transparent.png"
              alt="Iranian American Medical Association"
              width={766}
              height={326}
              className="h-14 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold">Join IAMA</h2>
          <p className="mt-4 text-lg text-primary-100 leading-relaxed">
            Become part of the premier network of Iranian American medical
            professionals. Access education, events, research opportunities, and
            a supportive community.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Access CME programs and educational resources",
              "Discounted congress and event registration",
              "Submit research abstracts",
              "Join our physician directory",
              "Connect with mentors and peers",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-primary-100">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo-transparent.png"
                alt="Iranian American Medical Association"
                width={766}
                height={326}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-secondary">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted">
            Join the IAMA community in minutes.
          </p>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignUp}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-secondary shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Dr. First Last"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helpText="Must be at least 6 characters"
            />

            {error && (
              <p className="rounded-md bg-red-50 p-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href={`/auth/login${redirect !== "/dashboard" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
              className="font-medium text-primary hover:text-primary-dark"
            >
              Sign In
            </Link>
          </p>

          <p className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs text-muted hover:text-primary transition-colors"
            >
              &larr; Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <SignupForm />
    </Suspense>
  );
}
