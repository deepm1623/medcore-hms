"use client";

import type { ReactNode } from "react";
import {
  ArrowRight, CalendarDays, CheckCircle2, ClipboardList, Clock3, Eye,
  FileText, FlaskConical, HeartPulse, Plus, Search, Stethoscope, Users, X, XCircle
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { mockPatients } from "@/mock/patients";

type Status = "Confirmed" | "In Progress" | "Waiting" | "Completed" | "Cancelled";

type Appointment = {
  id: string;
  time: string;
  patientId: string;
  type: string;
  status: Status;
};

type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: ReactNode;
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "APT-1001", time: "09:00 AM", patientId: "P-1001", type: "Consultation", status: "Confirmed" },
  { id: "APT-1002", time: "09:30 AM", patientId: "P-1002", type: "Follow-up", status: "In Progress" },
  { id: "APT-1003", time: "10:15 AM", patientId: "P-1003", type: "Consultation", status: "Waiting" },
];

const STATUS_FILTERS: ("All" | Status)[] = [
  "All", "Confirmed", "Waiting", "In Progress", "Completed", "Cancelled",
];

const getPatient = (id: string) => mockPatients.find((p) => p.id === id);
const getInitials = (name: string) =>
  name.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase();

const modules = [
  {
    title: "Pending Lab Results",
    description: "Review test results",
    count: 5,
    icon: <FlaskConical size={20} />,
    href: "/dashboard/doctor/lab-results",
  },
  {
    title: "Pending Follow-ups",
    description: "Review patient follow-ups",
    count: 8,
    icon: <ClipboardList size={20} />,
    href: "/dashboard/doctor/follow-ups",
  },
];

export default function DoctorDashboard() {
  const router = useRouter();

  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [quickOpen, setQuickOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | Status>("All");

  const [activity, setActivity] = useState<Activity[]>([
    {
      id: "activity-1",
      title: "Lab result available",
      description: "HbA1c result is ready for review.",
      time: "10 min ago",
      icon: <FlaskConical size={17} />,
    },
    {
      id: "activity-2",
      title: "Follow-up reminder",
      description: "A follow-up appointment is scheduled for today.",
      time: "25 min ago",
      icon: <ClipboardList size={17} />,
    },
    {
      id: "activity-3",
      title: "Appointment confirmed",
      description: "A patient appointment was confirmed.",
      time: "42 min ago",
      icon: <CalendarDays size={17} />,
    },
  ]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return appointments.filter((a) => {
      const p = getPatient(a.patientId);
      const matchesSearch =
        !q ||
        [a.id, a.patientId, a.type, p?.name]
          .some((value) => value?.toLowerCase().includes(q));

      return matchesSearch && (filter === "All" || a.status === filter);
    });
  }, [appointments, search, filter]);

  const count = (status: Status) =>
    appointments.filter((a) => a.status === status).length;

  const navigate = (path: string) => {
    setQuickOpen(false);
    router.push(path);
  };

  const addActivity = (
    title: string,
    description: string,
    icon: ReactNode
  ) => {
    setActivity((current) => [
      {
        id: `${Date.now()}`,
        title,
        description,
        time: "Just now",
        icon,
      },
      ...current,
    ].slice(0, 5));
  };

  const updateStatus = (id: string, status: Status) => {
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) return;

    const name = getPatient(appointment.patientId)?.name ?? "Patient";

    setAppointments((current) =>
      current.map((a) => (a.id === id ? { ...a, status } : a))
    );

    const updates: Partial<Record<Status, [string, ReactNode, string]>> = {
      "In Progress": [
        "Consultation started",
        <Stethoscope key="progress" size={17} />,
        `${name}'s consultation is now in progress.`,
      ],
      Completed: [
        "Appointment completed",
        <CheckCircle2 key="completed" size={17} />,
        `${name}'s appointment has been completed.`,
      ],
      Cancelled: [
        "Appointment cancelled",
        <XCircle key="cancelled" size={17} />,
        `${name}'s appointment has been cancelled.`,
      ],
      Confirmed: [
        "Appointment confirmed",
        <CalendarDays key="confirmed" size={17} />,
        `${name}'s appointment has been confirmed.`,
      ],
      Waiting: [
        "Patient waiting",
        <Clock3 key="waiting" size={17} />,
        `${name} is currently waiting for consultation.`,
      ],
    };

    const update = updates[status];
    if (update) addActivity(update[0], update[2], update[1]);

    setSelected(null);
  };

  const openEMR = (appointment: Appointment) => {
    setSelected(null);
    const p = getPatient(appointment.patientId);

    router.push(
      p
        ? `/dashboard/doctor/emr?patientId=${encodeURIComponent(p.id)}`
        : "/dashboard/doctor/emr"
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 lg:ml-72">
        <Topbar />

        <div className="min-w-0 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-400">Doctor Portal</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Good morning, Doctor
              </h1>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Here&apos;s your clinical overview for today.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setQuickOpen((v) => !v)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
            >
              <Plus size={18} />
              Quick Action
            </button>
          </header>

          {quickOpen && (
            <section className="mb-6 rounded-3xl border border-cyan-400/10 bg-cyan-400/[.025] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold">Quick Actions</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Open a frequently used Doctor Portal module.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setQuickOpen(false)}
                  aria-label="Close quick actions"
                  className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <QuickAction
                  title="Patients"
                  description="Open patient records"
                  icon={<Users size={19} />}
                  onClick={() => navigate("/dashboard/doctor/patients")}
                />
                <QuickAction
                  title="Appointments"
                  description="Manage appointments"
                  icon={<CalendarDays size={19} />}
                  onClick={() => navigate("/dashboard/doctor/appointments")}
                />
                <QuickAction
                  title="Lab Results"
                  description="Review test results"
                  icon={<FlaskConical size={19} />}
                  onClick={() => navigate("/dashboard/doctor/lab-results")}
                />
                <QuickAction
                  title="Follow-ups"
                  description="Review follow-ups"
                  icon={<ClipboardList size={19} />}
                  onClick={() => navigate("/dashboard/doctor/follow-ups")}
                />
              </div>
            </section>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              title="Today's Appointments"
              value={String(appointments.filter((a) => a.status !== "Cancelled").length)}
              description="Scheduled today"
              icon={<CalendarDays size={23} />}
              onClick={() => navigate("/dashboard/doctor/appointments")}
            />
            <DashboardCard
              title="My Patients"
              value={String(mockPatients.length)}
              description="Registered patients"
              icon={<Users size={23} />}
              onClick={() => navigate("/dashboard/doctor/patients")}
            />
            <DashboardCard
              title="Pending Lab Results"
              value="5"
              description="Need your review"
              icon={<FlaskConical size={23} />}
              onClick={() => navigate("/dashboard/doctor/lab-results")}
            />
            <DashboardCard
              title="Pending Follow-ups"
              value="8"
              description="Require attention"
              icon={<ClipboardList size={23} />}
              onClick={() => navigate("/dashboard/doctor/follow-ups")}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat label="Confirmed" value={count("Confirmed")} icon={<CheckCircle2 size={16} />} />
            <MiniStat label="Waiting" value={count("Waiting")} icon={<Clock3 size={16} />} />
            <MiniStat label="In Progress" value={count("In Progress")} icon={<Stethoscope size={16} />} />
            <MiniStat label="Completed" value={count("Completed")} icon={<CheckCircle2 size={16} />} />
          </div>

          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[.04] p-4 shadow-xl sm:p-5">
            <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search appointments, patients, or patient ID..."
                  className="h-11 w-full rounded-xl border border-white/[.08] bg-slate-950/60 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {STATUS_FILTERS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFilter(status)}
                    className={`h-10 shrink-0 rounded-xl border px-3 text-xs font-medium transition ${
                      filter === status
                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                        : "border-white/[.08] text-slate-500 hover:bg-white/[.04] hover:text-slate-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {(search || filter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setFilter("All");
                  }}
                  className="h-10 shrink-0 rounded-xl border border-white/[.08] px-3 text-xs text-slate-500 hover:bg-white/[.04] hover:text-white"
                >
                  <X size={14} className="mr-1 inline" />
                  Clear
                </button>
              )}
            </div>
          </section>

          <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <section className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] p-4 shadow-xl sm:p-6">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Today&apos;s Appointments
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Your scheduled patient visits.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/dashboard/doctor/appointments")}
                  className="group inline-flex h-10 items-center gap-2 self-start rounded-xl border border-cyan-400/20 px-4 text-xs font-semibold text-cyan-300 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10 active:scale-95"
                >
                  View all
                  <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </button>
              </div>

              <div className="hidden overflow-hidden rounded-2xl border border-white/5 md:block">
                <table className="w-full table-fixed text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[.02]">
                      {["Time", "Patient", "Type", "Status", "Action"].map((x) => (
                        <th key={x} className="px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                          {x}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.length ? (
                      filtered.map((a) => {
                        const p = getPatient(a.patientId);
                        if (!p) return null;

                        return (
                          <AppointmentRow
                            key={a.id}
                            appointment={a}
                            patientName={p.name}
                            patientId={p.id}
                            onView={() => setSelected(a)}
                            onStart={() => updateStatus(a.id, "In Progress")}
                          />
                        );
                      })
                    ) : (
                      <EmptyRow />
                    )}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 md:hidden">
                {filtered.length ? (
                  filtered.map((a) => {
                    const p = getPatient(a.patientId);
                    if (!p) return null;

                    return (
                      <MobileAppointment
                        key={a.id}
                        appointment={a}
                        patientName={p.name}
                        patientId={p.id}
                        onView={() => setSelected(a)}
                        onStart={() => updateStatus(a.id, "In Progress")}
                      />
                    );
                  })
                ) : (
                  <Empty />
                )}
              </div>
            </section>

            <section className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] p-5 shadow-xl sm:p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <p className="mt-1 text-xs text-slate-500">Latest clinical updates</p>
                </div>
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <HeartPulse size={18} />
                </div>
              </div>

              {activity.map((item, index) => (
                <div key={item.id} className="relative flex gap-3 rounded-2xl p-3 hover:bg-white/[.025]">
                  {index < activity.length - 1 && (
                    <span className="absolute left-[21px] top-12 h-8 w-px bg-white/[.07]" />
                  )}
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                    <p className="mt-1 text-[10px] text-slate-600">{item.time}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>

          <section className="mt-6 grid gap-4 md:grid-cols-2">
            {modules.map((module) => (
              <ModuleCard
                key={module.title}
                {...module}
                onClick={() => router.push(module.href)}
              />
            ))}
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/[.06] to-blue-500/[.03] p-5 shadow-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    <HeartPulse size={18} />
                  </div>
                  <p className="font-semibold">Clinical overview</p>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  You currently have{" "}
                  <b className="text-white">
                    {appointments.filter((a) => a.status !== "Cancelled").length}
                  </b>{" "}
                  active appointments, <b className="text-white">5</b> lab results
                  waiting for review, and <b className="text-white">8</b> follow-ups
                  requiring attention.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/dashboard/doctor/patients")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[.08] px-5 text-sm text-slate-300 hover:border-cyan-400/20 hover:bg-cyan-400/[.06] hover:text-cyan-300"
              >
                View patients
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </div>
      </main>

      {selected && (
        <AppointmentModal
          appointment={selected}
          onClose={() => setSelected(null)}
          onStart={() => updateStatus(selected.id, "In Progress")}
          onComplete={() => updateStatus(selected.id, "Completed")}
          onCancel={() => updateStatus(selected.id, "Cancelled")}
          onOpenEMR={() => openEMR(selected)}
        />
      )}
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
  icon,
  onClick,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group min-w-0 rounded-3xl border border-white/10 bg-white/[.04] p-5 text-left shadow-xl transition hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[.055]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-400">{title}</p>
          <p className="mt-3 text-4xl font-bold">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>

        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-400 transition group-hover:scale-105">
          {icon}
        </div>
      </div>

      <span className="mt-5 flex items-center gap-1 text-xs font-medium text-cyan-400">
        Open module
        <ArrowRight size={14} className="transition group-hover:translate-x-1" />
      </span>
    </button>
  );
}

function MiniStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/[.07] bg-white/[.025] p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs text-slate-500">{label}</p>
        <span className="text-slate-600">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function QuickAction({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[.025] p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[.05]"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="mt-1 truncate text-xs text-slate-500">{description}</p>
      </div>
      <ArrowRight size={15} className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400" />
    </button>
  );
}

function ModuleCard({
  title,
  description,
  count,
  icon,
  href,
  onClick,
}: {
  title: string;
  description: string;
  count: number;
  icon: ReactNode;
  href: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${title}`}
      data-module={href}
      className="group flex min-w-0 items-center gap-4 rounded-3xl border border-white/10 bg-white/[.04] p-5 text-left shadow-xl transition hover:-translate-y-0.5 hover:border-cyan-400/20"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold">{title}</h3>
          <span className="shrink-0 rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-400">
            {count}
          </span>
        </div>
        <p className="mt-1 truncate text-xs text-slate-500">{description}</p>
      </div>
      <ArrowRight size={17} className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400" />
    </button>
  );
}

const statusClass: Record<Status, string> = {
  Confirmed: "bg-emerald-400/10 text-emerald-400 border-emerald-400/10",
  Completed: "bg-emerald-400/10 text-emerald-400 border-emerald-400/10",
  "In Progress": "bg-blue-400/10 text-blue-400 border-blue-400/10",
  Waiting: "bg-amber-400/10 text-amber-400 border-amber-400/10",
  Cancelled: "bg-red-400/10 text-red-400 border-red-400/10",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${statusClass[status]}`}>
      {status}
    </span>
  );
}

function AppointmentRow({
  appointment,
  patientName,
  patientId,
  onView,
  onStart,
}: {
  appointment: Appointment;
  patientName: string;
  patientId: string;
  onView: () => void;
  onStart: () => void;
}) {
  const canStart = appointment.status === "Confirmed" || appointment.status === "Waiting";

  return (
    <tr className="border-b border-white/5 last:border-0 transition hover:bg-white/[.02]">
      <td className="px-3 py-5 text-sm text-slate-300">
        <Clock3 size={15} className="mr-2 inline text-slate-600" />
        {appointment.time}
      </td>
      <td className="min-w-0 px-3 py-5">
        <p className="truncate text-sm font-semibold">{patientName}</p>
        <p className="mt-1 text-xs text-slate-500">{patientId}</p>
      </td>
      <td className="px-3 py-5 text-sm text-slate-400">{appointment.type}</td>
      <td className="px-3 py-5"><StatusBadge status={appointment.status} /></td>
      <td className="px-3 py-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onView}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[.08] px-3 text-xs text-slate-400 hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-400"
          >
            <Eye size={14} /> View
          </button>

          {canStart && (
            <button
              type="button"
              onClick={onStart}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 text-xs text-cyan-400 hover:bg-cyan-500/15"
            >
              <Stethoscope size={14} /> Start
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function MobileAppointment({
  appointment,
  patientName,
  patientId,
  onView,
  onStart,
}: {
  appointment: Appointment;
  patientName: string;
  patientId: string;
  onView: () => void;
  onStart: () => void;
}) {
  const canStart = appointment.status === "Confirmed" || appointment.status === "Waiting";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[.025] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">Time</p>
          <p className="mt-1 text-sm font-semibold">{appointment.time}</p>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-500">Patient</p>
          <p className="mt-1 break-words text-sm font-semibold">{patientName}</p>
          <p className="mt-1 text-xs text-slate-500">{patientId}</p>
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-500">Type</p>
          <p className="mt-1 break-words text-sm text-slate-400">{appointment.type}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 border-t border-white/5 pt-4">
        <button
          type="button"
          onClick={onView}
          className="h-10 flex-1 rounded-xl border border-white/[.08] text-xs text-slate-400 hover:border-cyan-400/20 hover:text-cyan-400"
        >
          <Eye size={14} className="mr-1 inline" /> View
        </button>

        {canStart && (
          <button
            type="button"
            onClick={onStart}
            className="h-10 flex-1 rounded-xl bg-cyan-500/10 text-xs text-cyan-400 hover:bg-cyan-500/15"
          >
            <Stethoscope size={14} className="mr-1 inline" /> Start
          </button>
        )}
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[.02] p-10 text-center">
      <Search size={24} className="mx-auto text-slate-700" />
      <p className="mt-3 text-sm text-slate-400">No appointments found</p>
      <p className="mt-1 text-xs text-slate-600">Try changing your search or filter.</p>
    </div>
  );
}

function EmptyRow() {
  return (
    <tr>
      <td colSpan={5} className="p-4">
        <Empty />
      </td>
    </tr>
  );
}

function AppointmentModal({
  appointment,
  onClose,
  onStart,
  onComplete,
  onCancel,
  onOpenEMR,
}: {
  appointment: Appointment;
  onClose: () => void;
  onStart: () => void;
  onComplete: () => void;
  onCancel: () => void;
  onOpenEMR: () => void;
}) {
  const p = getPatient(appointment.patientId);
  if (!p) return null;

  const canStart = appointment.status === "Confirmed" || appointment.status === "Waiting";
  const canComplete = appointment.status === "In Progress";
  const canCancel = appointment.status !== "Completed" && appointment.status !== "Cancelled";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[.08] px-5 py-4">
          <div>
            <p className="text-xs text-cyan-400">Appointment</p>
            <h3 className="mt-1 text-lg font-semibold">Appointment Details</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close appointment details"
            className="rounded-xl p-2 text-slate-500 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="rounded-2xl border border-white/[.07] bg-white/[.025] p-4">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold">
                {getInitials(p.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{p.name}</p>
                <p className="mt-1 text-xs text-slate-500">{p.id}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/[.07] pt-4">
              <Detail label="Time" value={appointment.time} />
              <Detail label="Type" value={appointment.type} />
              <Detail label="Status" value={appointment.status} />
              <Detail label="Patient ID" value={p.id} />
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <ModalButton onClick={onOpenEMR} icon={<FileText size={17} />} label="Open EMR" />

            {canStart && (
              <ModalButton
                onClick={onStart}
                icon={<Stethoscope size={17} />}
                label="Start Consultation"
                accent="cyan"
              />
            )}

            {canComplete && (
              <ModalButton
                onClick={onComplete}
                icon={<CheckCircle2 size={17} />}
                label="Complete"
                accent="emerald"
              />
            )}

            {canCancel && (
              <ModalButton
                onClick={onCancel}
                icon={<X size={17} />}
                label="Cancel"
                accent="red"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalButton({
  onClick,
  icon,
  label,
  accent = "default",
}: {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  accent?: "default" | "cyan" | "emerald" | "red";
}) {
  const classes = {
    default: "border-white/[.08] text-slate-300 hover:border-cyan-400/20 hover:text-cyan-400",
    cyan: "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/15",
    emerald: "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15",
    red: "bg-red-500/10 text-red-400 hover:bg-red-500/15",
  }[accent];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl text-sm transition ${classes}`}
    >
      {icon}
      {label}
    </button>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-slate-600">{label}</p>
      <p className="mt-1 truncate text-sm text-slate-300">{value}</p>
    </div>
  );
}