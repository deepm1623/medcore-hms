"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  Globe,
  Hospital,
  LockKeyhole,
  Mail,
  MapPin,
  Moon,
  Phone,
  Save,
  ShieldCheck,
  User,
  UserRound,
} from "lucide-react";

import {
  DoctorProfile,
  useDoctorProfile,
} from "@/lib/doctor-profile";

type SettingsTab =
  | "profile"
  | "hospital"
  | "notifications"
  | "preferences"
  | "security";

export default function DoctorSettingsPage() {
  const { profile, updateProfile } = useDoctorProfile();

  const [activeTab, setActiveTab] =
    useState<SettingsTab>("profile");

  const [draftProfile, setDraftProfile] =
    useState<DoctorProfile>(profile);

  const [saved, setSaved] = useState(false);

  /* =====================================================
     KEEP LOCAL FORM IN SYNC WITH SHARED PROFILE
  ====================================================== */

  useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  /* =====================================================
     DOCTOR INITIALS
  ====================================================== */

  const initials = useMemo(() => {
    const name = draftProfile.fullName.trim();

    if (!name) {
      return "DR";
    }

    const parts = name.split(/\s+/);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return (
      parts[0][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  }, [draftProfile.fullName]);

  /* =====================================================
     UPDATE LOCAL FIELD
  ====================================================== */

  const updateField = (
    field: keyof DoctorProfile,
    value: string
  ) => {
    setDraftProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  /* =====================================================
     SAVE PROFILE
  ====================================================== */

  const handleSaveChanges = () => {
    updateProfile({
      fullName: draftProfile.fullName,
      email: draftProfile.email,
      phone: draftProfile.phone,
      specialization:
        draftProfile.specialization,
      licenseNumber:
        draftProfile.licenseNumber,
      hospital: draftProfile.hospital,
      department: draftProfile.department,
    });

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="min-h-full bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================== */}

        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium text-cyan-400">
                Doctor Portal
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Manage your profile, preferences,
              notifications, and account security.
            </p>
          </div>

          {/* SAVE BUTTON */}

          {activeTab === "profile" && (
            <button
              type="button"
              onClick={handleSaveChanges}
              className="
                inline-flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-6
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition
                hover:from-cyan-400
                hover:to-blue-500
                active:scale-[0.98]
              "
            >
              {saved ? (
                <>
                  <Check size={18} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          )}
        </div>

        {/* =================================================
            SETTINGS LAYOUT
        ================================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* =================================================
              SETTINGS NAVIGATION
          ================================================== */}

          <aside
            className="
              h-fit
              rounded-2xl
              border
              border-white/[0.08]
              bg-slate-950/70
              p-2
              shadow-xl
              shadow-black/10
            "
          >
            <SettingsNavItem
              active={activeTab === "profile"}
              icon={<User size={18} />}
              label="Profile"
              onClick={() =>
                setActiveTab("profile")
              }
            />

            <SettingsNavItem
              active={activeTab === "hospital"}
              icon={<Hospital size={18} />}
              label="Hospital"
              onClick={() =>
                setActiveTab("hospital")
              }
            />

            <SettingsNavItem
              active={
                activeTab === "notifications"
              }
              icon={<Bell size={18} />}
              label="Notifications"
              onClick={() =>
                setActiveTab("notifications")
              }
            />

            <SettingsNavItem
              active={
                activeTab === "preferences"
              }
              icon={<Globe size={18} />}
              label="Preferences"
              onClick={() =>
                setActiveTab("preferences")
              }
            />

            <SettingsNavItem
              active={activeTab === "security"}
              icon={<LockKeyhole size={18} />}
              label="Security"
              onClick={() =>
                setActiveTab("security")
              }
            />
          </aside>

          {/* =================================================
              CONTENT
          ================================================== */}

          <section className="min-w-0">

            {/* =================================================
                PROFILE
            ================================================== */}

            {activeTab === "profile" && (
              <ProfileSettings
                profile={draftProfile}
                initials={initials}
                onChange={updateField}
              />
            )}

            {/* =================================================
                HOSPITAL
            ================================================== */}

            {activeTab === "hospital" && (
              <HospitalSettings
                profile={draftProfile}
                onChange={updateField}
              />
            )}

            {/* =================================================
                NOTIFICATIONS
            ================================================== */}

            {activeTab === "notifications" && (
              <NotificationsSettings />
            )}

            {/* =================================================
                PREFERENCES
            ================================================== */}

            {activeTab === "preferences" && (
              <PreferencesSettings />
            )}

            {/* =================================================
                SECURITY
            ================================================== */}

            {activeTab === "security" && (
              <SecuritySettings />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SETTINGS NAV ITEM
========================================================= */

function SettingsNavItem({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-left
        text-sm
        font-medium
        transition
        ${
          active
            ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.05)]"
            : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
        }
      `}
    >
      <span
        className={
          active
            ? "text-cyan-400"
            : "text-slate-500"
        }
      >
        {icon}
      </span>

      <span>{label}</span>
    </button>
  );
}

/* =========================================================
   PROFILE SETTINGS
========================================================= */

function ProfileSettings({
  profile,
  initials,
  onChange,
}: {
  profile: DoctorProfile;
  initials: string;
  onChange: (
    field: keyof DoctorProfile,
    value: string
  ) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-950/70 p-5 shadow-xl shadow-black/10 sm:p-7">

      {/* HEADER */}

      <div className="mb-8 flex items-start gap-4">
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-cyan-400/10
            text-cyan-400
          "
        >
          <User size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Doctor Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your professional information.
          </p>
        </div>
      </div>

      {/* PROFILE IDENTITY */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">

        {/* AVATAR */}

        <div
          className="
            flex
            h-24
            w-24
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-cyan-400
            to-blue-600
            text-2xl
            font-bold
            text-white
            shadow-xl
            shadow-blue-500/20
          "
        >
          {initials}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            {profile.fullName || "Doctor Name"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Doctor account
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
            <ShieldCheck
              size={14}
              className="text-cyan-400"
            />
            Verified clinical account
          </div>
        </div>
      </div>

      {/* FORM */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <InputField
          label="Full Name"
          value={profile.fullName}
          placeholder="Doctor Name"
          onChange={(value) =>
            onChange("fullName", value)
          }
        />

        <InputField
          label="Email Address"
          type="email"
          value={profile.email}
          placeholder="doctor@medcore.demo"
          icon={<Mail size={17} />}
          onChange={(value) =>
            onChange("email", value)
          }
        />

        <InputField
          label="Phone Number"
          value={profile.phone}
          placeholder="+91 98765 43210"
          icon={<Phone size={17} />}
          onChange={(value) =>
            onChange("phone", value)
          }
        />

        <InputField
          label="Specialization"
          value={profile.specialization}
          placeholder="General Medicine"
          onChange={(value) =>
            onChange(
              "specialization",
              value
            )
          }
        />

        <InputField
          label="Medical License Number"
          value={profile.licenseNumber}
          placeholder="MED-2026-001"
          onChange={(value) =>
            onChange(
              "licenseNumber",
              value
            )
          }
        />

        <InputField
          label="Department"
          value={profile.department}
          placeholder="General Medicine"
          onChange={(value) =>
            onChange(
              "department",
              value
            )
          }
        />

      </div>

      {/* INFORMATION */}

      <div className="mt-8 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
        <div className="flex gap-3">
          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0 text-cyan-400"
          />

          <div>
            <p className="text-sm font-medium text-slate-300">
              Frontend Demo Profile
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Profile changes are stored locally for
              this frontend demo. No backend or
              external database is connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HOSPITAL SETTINGS
========================================================= */

function HospitalSettings({
  profile,
  onChange,
}: {
  profile: DoctorProfile;
  onChange: (
    field: keyof DoctorProfile,
    value: string
  ) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-950/70 p-5 shadow-xl shadow-black/10 sm:p-7">

      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
          <Hospital size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Hospital
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View your current hospital and department
            assignment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <InputField
          label="Hospital Name"
          value={profile.hospital}
          placeholder="MedCore General Hospital"
          icon={<Hospital size={17} />}
          onChange={(value) =>
            onChange("hospital", value)
          }
        />

        <InputField
          label="Department"
          value={profile.department}
          placeholder="General Medicine"
          onChange={(value) =>
            onChange(
              "department",
              value
            )
          }
        />

      </div>

      <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">

        <div className="flex items-start gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
            <MapPin size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Hospital Assignment
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              This frontend demo currently uses one
              hospital assignment for the doctor.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function NotificationsSettings() {
  const [settings, setSettings] = useState({
    appointments: true,
    labResults: true,
    prescriptions: true,
    followUps: true,
    system: true,
  });

  const toggle = (
    key: keyof typeof settings
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-950/70 p-5 shadow-xl shadow-black/10 sm:p-7">

      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
          <Bell size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Notifications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose which clinical notifications you
            want to receive.
          </p>
        </div>
      </div>

      <div className="space-y-2">

        <NotificationRow
          title="Appointments"
          description="Appointment confirmations, changes and reminders."
          enabled={settings.appointments}
          onToggle={() =>
            toggle("appointments")
          }
        />

        <NotificationRow
          title="Lab Results"
          description="Notify me when new laboratory results are available."
          enabled={settings.labResults}
          onToggle={() =>
            toggle("labResults")
          }
        />

        <NotificationRow
          title="Prescriptions"
          description="Prescription-related notifications and updates."
          enabled={settings.prescriptions}
          onToggle={() =>
            toggle("prescriptions")
          }
        />

        <NotificationRow
          title="Follow-ups"
          description="Upcoming patient follow-up reminders."
          enabled={settings.followUps}
          onToggle={() =>
            toggle("followUps")
          }
        />

        <NotificationRow
          title="System Notifications"
          description="Important MedCore system notifications."
          enabled={settings.system}
          onToggle={() =>
            toggle("system")
          }
        />

      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATION ROW
========================================================= */

function NotificationRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

      <div className="min-w-0">
        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={`Toggle ${title}`}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition
          ${
            enabled
              ? "bg-cyan-500"
              : "bg-slate-700"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow
            transition
            ${
              enabled
                ? "left-6"
                : "left-1"
            }
          `}
        />
      </button>
    </div>
  );
}

/* =========================================================
   PREFERENCES
========================================================= */

function PreferencesSettings() {
  const [compactMode, setCompactMode] =
    useState(false);

  const [animations, setAnimations] =
    useState(true);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-950/70 p-5 shadow-xl shadow-black/10 sm:p-7">

      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
          <Globe size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customize your clinical workspace.
          </p>
        </div>
      </div>

      <div className="space-y-3">

        <PreferenceRow
          title="Dark Interface"
          description="Use the dark MedCore clinical interface."
          icon={<Moon size={18} />}
          enabled
          disabled
        />

        <PreferenceRow
          title="Compact Mode"
          description="Reduce spacing across clinical tables and lists."
          icon={<Globe size={18} />}
          enabled={compactMode}
          onToggle={() =>
            setCompactMode(
              !compactMode
            )
          }
        />

        <PreferenceRow
          title="Interface Animations"
          description="Enable subtle transitions throughout the dashboard."
          icon={<Globe size={18} />}
          enabled={animations}
          onToggle={() =>
            setAnimations(
              !animations
            )
          }
        />

      </div>
    </div>
  );
}

/* =========================================================
   PREFERENCE ROW
========================================================= */

function PreferenceRow({
  title,
  description,
  icon,
  enabled,
  onToggle,
  disabled,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

      <div className="flex min-w-0 items-center gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-400">
          {icon}
        </div>

        <div>
          <p className="text-sm font-medium text-white">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition
          ${
            enabled
              ? "bg-cyan-500"
              : "bg-slate-700"
          }
          ${
            disabled
              ? "cursor-not-allowed opacity-70"
              : ""
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow
            transition
            ${
              enabled
                ? "left-6"
                : "left-1"
            }
          `}
        />
      </button>

    </div>
  );
}

/* =========================================================
   SECURITY
========================================================= */

function SecuritySettings() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-slate-950/70 p-5 shadow-xl shadow-black/10 sm:p-7">

      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
          <LockKeyhole size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Security
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your account security settings.
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <SecurityCard
          icon={<LockKeyhole size={19} />}
          title="Password"
          description="Your password is protected in this frontend demo."
          button="Change Password"
        />

        <SecurityCard
          icon={<ShieldCheck size={19} />}
          title="Two-Factor Authentication"
          description="Add an additional verification step to your account."
          button="Configure 2FA"
        />

        <SecurityCard
          icon={<UserRound size={19} />}
          title="Active Sessions"
          description="Review devices currently signed in to your account."
          button="View Sessions"
        />

      </div>

      <div className="mt-6 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-4">

        <div className="flex gap-3">

          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0 text-amber-400"
          />

          <p className="text-xs leading-5 text-slate-500">
            Authentication and security actions are
            visual frontend demonstrations only. No
            backend authentication service is connected.
          </p>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SECURITY CARD
========================================================= */

function SecurityCard({
  icon,
  title,
  description,
  button,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  button: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-start gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-400">
          {icon}
        </div>

        <div>
          <p className="text-sm font-medium text-white">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        onClick={() => {
          alert(
            `${button} is available as a frontend demo only.`
          );
        }}
        className="
          shrink-0
          rounded-lg
          border
          border-white/[0.10]
          bg-white/[0.03]
          px-4
          py-2
          text-xs
          font-medium
          text-slate-300
          transition
          hover:border-cyan-400/30
          hover:bg-cyan-400/[0.05]
          hover:text-cyan-400
        "
      >
        {button}
      </button>
    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  value,
  placeholder,
  type = "text",
  icon,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`
            h-12
            w-full
            rounded-xl
            border
            border-white/[0.09]
            bg-white/[0.025]
            ${
              icon
                ? "pl-11"
                : "px-4"
            }
            pr-4
            text-sm
            text-white
            outline-none
            transition
            placeholder:text-slate-600
            focus:border-cyan-400/50
            focus:bg-white/[0.04]
            focus:ring-2
            focus:ring-cyan-400/10
          `}
        />

      </div>
    </div>
  );
}