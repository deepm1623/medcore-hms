"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { mockUsers } from "@/mock/users";
import { ROLES } from "@/constants/roles";

export default function DoctorLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    const user = mockUsers.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password &&
        user.role === ROLES.DOCTOR
    );

    setTimeout(() => {
      if (!user) {
        setError("Invalid doctor credentials. Please try again.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("medcore_user", JSON.stringify(user));

      router.push("/dashboard/doctor");
    }, 700);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">

          {/* ================= BRAND ================= */}
          <div className="mb-8 text-center">

            {/* MedCore Logo */}
            <div className="mx-auto mb-4 flex h-24 w-48 items-center justify-center">
              <Image
                src="/medcore-logo.png"
                alt="MedCore HMS"
                width={192}
                height={96}
                priority
                className="h-auto w-full object-contain"
              />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              MedCore
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Hospital Management System
            </p>
          </div>

          {/* ================= LOGIN CARD ================= */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">

            {/* Header */}
            <div className="mb-8">

              <div className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
                Doctor Portal
              </div>

              <h2 className="text-2xl font-semibold">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Sign in to access your clinical workspace.
              </p>

            </div>

            {/* ================= FORM ================= */}
            <form onSubmit={handleLogin}>

              {/* ================= EMAIL ================= */}
              <div className="mb-5">

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="doctor@medcore.demo"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                  />

                </div>
              </div>

              {/* ================= PASSWORD ================= */}
              <div className="mb-4">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
                    onClick={() => {
                      setError(
                        "Password recovery is not available in the frontend demo."
                      );
                    }}
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* ================= REMEMBER ME ================= */}
              <div className="mb-6 flex items-center gap-2">

                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-400"
                >
                  Keep me signed in
                </label>

              </div>

              {/* ================= ERROR ================= */}
              {error && (
                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* ================= LOGIN BUTTON ================= */}
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? "Signing in..."
                  : "Sign in to Doctor Portal"}
              </button>

            </form>

            {/* ================= SECURITY MESSAGE ================= */}
            <div className="mt-6 flex gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-4">

              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-cyan-400"
              />

              <p className="text-xs leading-5 text-slate-500">
                Protected clinical workspace. Access is restricted
                according to your assigned role.
              </p>

            </div>

            {/* ================= DEMO CREDENTIALS ================= */}
            <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">

              <p className="text-xs font-medium text-slate-400">
                Demo credentials
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Email:{" "}
                <span className="text-slate-300">
                  doctor@medcore.demo
                </span>
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Password:{" "}
                <span className="text-slate-300">
                  MedCore@Doctor01
                </span>
              </p>

            </div>

          </div>

          {/* ================= FOOTER ================= */}
          <p className="mt-6 text-center text-xs text-slate-600">
            © 2026 MedCore HMS
          </p>

        </div>
      </div>
    </main>
  );
}