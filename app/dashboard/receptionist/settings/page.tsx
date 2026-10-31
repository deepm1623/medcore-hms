
"use client";

import { useState } from "react";
import {
  UserRound,
  Bell,
  ShieldCheck,
  Save,
  LockKeyhole,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import DashboardShell from "@/components/layout/dashboard-shell";

export default function ReceptionistSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Receptionist",
    email: "receptionist@medcore.com",
    phone: "+91 98765 43210",
    hospital: "MedCore Hospital",
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    reminders: true,
    updates: false,
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const updateProfile = (key: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    window.alert("Settings saved successfully! (Demo)");
  };

  const handlePasswordChange = () => {
    if (!password.current || !password.new || !password.confirm) {
      window.alert("Please fill in all password fields.");
      return;
    }

    if (password.new !== password.confirm) {
      window.alert("New passwords do not match.");
      return;
    }

    window.alert("Password updated successfully! (Demo)");
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-5xl space-y-8">
        <header>
          <p className="mb-2 text-sm font-semibold text-cyan-400">
            Reception Workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Settings
          </h1>
          <p className="mt-2 text-slate-400">
            Manage your profile, notifications, and account security.
          </p>
        </header>

        {/* Profile */}
        <section className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400">
              <UserRound size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <p className="text-sm text-slate-400">
                Update your personal and workplace details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { key: "name", label: "Full Name", icon: UserRound },
              { key: "email", label: "Email Address", icon: Mail },
              { key: "phone", label: "Phone Number", icon: Phone },
              { key: "hospital", label: "Hospital", icon: Building2 },
            ].map(({ key, label, icon: Icon }) => (
              <label key={key} className="space-y-2">
                <span className="text-sm text-slate-300">{label}</span>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/70 px-3">
                  <Icon size={17} className="shrink-0 text-slate-500" />
                  <input
                    value={profile[key as keyof typeof profile]}
                    onChange={(e) =>
                      updateProfile(key as keyof typeof profile, e.target.value)
                    }
                    className="min-h-11 w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-400/10 p-3 text-blue-400">
              <Bell size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-slate-400">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {[
              {
                key: "appointments",
                label: "Appointment Notifications",
                description: "Get notified about new and updated appointments.",
              },
              {
                key: "reminders",
                label: "Appointment Reminders",
                description: "Receive reminders for upcoming appointments.",
              },
              {
                key: "updates",
                label: "System Updates",
                description: "Receive updates about the MedCore system.",
              },
            ].map(({ key, label, description }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium">{label}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {description}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications[key as keyof typeof notifications]}
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof notifications],
                    }))
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    notifications[key as keyof typeof notifications]
                      ? "bg-cyan-500"
                      : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      notifications[key as keyof typeof notifications]
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Account Security</h2>
              <p className="text-sm text-slate-400">
                Update your account password.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { key: "current", label: "Current Password" },
              { key: "new", label: "New Password" },
              { key: "confirm", label: "Confirm New Password" },
            ].map(({ key, label }) => (
              <label key={key} className="space-y-2">
                <span className="text-sm text-slate-300">{label}</span>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/70 px-3">
                  <LockKeyhole size={17} className="shrink-0 text-slate-500" />
                  <input
                    type="password"
                    value={password[key as keyof typeof password]}
                    onChange={(e) =>
                      setPassword((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                    className="min-h-11 w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePasswordChange}
            className="mt-5 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Update Password
          </button>
        </section>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 font-semibold text-white shadow-lg shadow-cyan-950/30 transition hover:brightness-110"
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Demo interface — settings are not connected to a backend.
        </p>
      </div>
    </DashboardShell>
  );
}
