
"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import DashboardShell from "@/components/layout/dashboard-shell";

type SettingsTab = "Profile" | "Hospital" | "Notifications" | "Security";

const tabs: { label: SettingsTab; icon: typeof UserRound }[] = [
  { label: "Profile", icon: UserRound },
  { label: "Hospital", icon: Building2 },
  { label: "Notifications", icon: Bell },
  { label: "Security", icon: LockKeyhole },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@medcore.com",
    phone: "+91 98765 43210",
    role: "Hospital Administrator",
  });

  const [hospital, setHospital] = useState({
    name: "MedCore General Hospital",
    email: "contact@medcore.com",
    phone: "+91 79 4000 1234",
    address: "Ahmedabad, Gujarat, India",
    website: "www.medcore.com",
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    newPatients: true,
    reports: false,
    systemUpdates: true,
    email: true,
    push: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
  });

  const updateProfile = (key: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const updateHospital = (key: keyof typeof hospital, value: string) => {
    setHospital((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const updateNotification = (
    key: keyof typeof notifications,
    value: boolean
  ) => {
    setNotifications((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const saveSettings = () => {
    if (
      activeTab === "Security" &&
      security.newPassword &&
      security.newPassword !== security.confirmPassword
    ) {
      alert("New password and confirmation do not match.");
      return;
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500";

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your account, hospital details, and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Settings navigation */}
          <aside className="h-fit rounded-2xl border border-white/[0.07] bg-[#111c2e]/80 p-3">
            <nav className="space-y-1">
              {tabs.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => {
                    setActiveTab(label);
                    setSaved(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    activeTab === label
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Settings content */}
          <section className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111c2e]/80">
            <div className="border-b border-white/[0.07] p-5 sm:p-6">
              <h2 className="font-semibold text-white">{activeTab} Settings</h2>
              <p className="mt-1 text-sm text-slate-400">
                Update your {activeTab.toLowerCase()} preferences.
              </p>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              {activeTab === "Profile" && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-xl font-semibold text-cyan-400">
                      {profile.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white">{profile.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{profile.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Full Name">
                      <input
                        className={inputClass}
                        value={profile.name}
                        onChange={(e) => updateProfile("name", e.target.value)}
                      />
                    </Field>
                    <Field label="Email Address">
                      <input
                        type="email"
                        className={inputClass}
                        value={profile.email}
                        onChange={(e) => updateProfile("email", e.target.value)}
                      />
                    </Field>
                    <Field label="Phone Number">
                      <input
                        className={inputClass}
                        value={profile.phone}
                        onChange={(e) => updateProfile("phone", e.target.value)}
                      />
                    </Field>
                    <Field label="Role">
                      <input
                        className={`${inputClass} cursor-not-allowed opacity-60`}
                        value={profile.role}
                        readOnly
                      />
                    </Field>
                  </div>
                </>
              )}

              {activeTab === "Hospital" && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Hospital Name">
                    <input
                      className={inputClass}
                      value={hospital.name}
                      onChange={(e) => updateHospital("name", e.target.value)}
                    />
                  </Field>
                  <Field label="Contact Email">
                    <input
                      type="email"
                      className={inputClass}
                      value={hospital.email}
                      onChange={(e) => updateHospital("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Contact Phone">
                    <input
                      className={inputClass}
                      value={hospital.phone}
                      onChange={(e) => updateHospital("phone", e.target.value)}
                    />
                  </Field>
                  <Field label="Website">
                    <input
                      className={inputClass}
                      value={hospital.website}
                      onChange={(e) => updateHospital("website", e.target.value)}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Address">
                      <textarea
                        rows={3}
                        className={inputClass}
                        value={hospital.address}
                        onChange={(e) => updateHospital("address", e.target.value)}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {activeTab === "Notifications" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-white">
                      Notification Events
                    </h3>
                    <div className="divide-y divide-white/[0.06]">
                      <ToggleRow
                        title="Appointment updates"
                        description="Receive notifications about appointment changes."
                        checked={notifications.appointments}
                        onChange={(value) =>
                          updateNotification("appointments", value)
                        }
                      />
                      <ToggleRow
                        title="New patient registrations"
                        description="Get notified when a new patient is added."
                        checked={notifications.newPatients}
                        onChange={(value) =>
                          updateNotification("newPatients", value)
                        }
                      />
                      <ToggleRow
                        title="Report generation"
                        description="Receive updates when reports are ready."
                        checked={notifications.reports}
                        onChange={(value) => updateNotification("reports", value)}
                      />
                      <ToggleRow
                        title="System updates"
                        description="Important maintenance and system announcements."
                        checked={notifications.systemUpdates}
                        onChange={(value) =>
                          updateNotification("systemUpdates", value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-medium text-white">
                      Delivery Preferences
                    </h3>
                    <div className="divide-y divide-white/[0.06]">
                      <ToggleRow
                        title="Email notifications"
                        description="Send notifications to your registered email."
                        checked={notifications.email}
                        onChange={(value) => updateNotification("email", value)}
                      />
                      <ToggleRow
                        title="Push notifications"
                        description="Receive browser push notifications."
                        checked={notifications.push}
                        onChange={(value) => updateNotification("push", value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Security" && (
                <div className="space-y-6">
                  <div className="flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] p-4">
                    <ShieldCheck className="mt-0.5 shrink-0 text-cyan-400" size={20} />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Account security
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Keep your account secure by using a strong password and
                        enabling two-factor authentication.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <Field label="Current Password">
                      <input
                        type="password"
                        className={inputClass}
                        value={security.currentPassword}
                        onChange={(e) =>
                          setSecurity((current) => ({
                            ...current,
                            currentPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter current password"
                      />
                    </Field>
                    <Field label="New Password">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`${inputClass} pr-11`}
                          value={security.newPassword}
                          onChange={(e) =>
                            setSecurity((current) => ({
                              ...current,
                              newPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                    </Field>
                    <Field label="Confirm New Password">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={inputClass}
                        value={security.confirmPassword}
                        onChange={(e) =>
                          setSecurity((current) => ({
                            ...current,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm new password"
                      />
                    </Field>
                  </div>

                  <div className="border-t border-white/[0.07] pt-5">
                    <ToggleRow
                      title="Two-factor authentication"
                      description="Add an extra layer of security to your account."
                      checked={security.twoFactor}
                      onChange={(value) => {
                        setSecurity((current) => ({
                          ...current,
                          twoFactor: value,
                        }));
                        setSaved(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-slate-500">
                {saved ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <Check size={14} />
                    Changes saved locally.
                  </span>
                ) : (
                  "Changes are stored in this demo session only."
                )}
              </p>
              <button
                onClick={saveSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-cyan-500" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
