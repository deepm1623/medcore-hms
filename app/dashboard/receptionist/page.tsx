
"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Search,
  Users,
  UserPlus,
  ArrowRight,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/layout/dashboard-shell";

type AppointmentStatus = "Confirmed" | "Waiting" | "Completed";

interface Appointment {
  id: string;
  patient: string;
  time: string;
  doctor: string;
  type: string;
  status: AppointmentStatus;
}

const appointments: Appointment[] = [
  {
    id: "A-1001",
    patient: "Aarav Patel",
    time: "09:00 AM",
    doctor: "Dr. Sharma",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: "A-1002",
    patient: "Ananya Shah",
    time: "09:30 AM",
    doctor: "Dr. Mehta",
    type: "Follow-up",
    status: "Waiting",
  },
  {
    id: "A-1003",
    patient: "Raj Mehta",
    time: "10:00 AM",
    doctor: "Dr. Sharma",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: "A-1004",
    patient: "Diya Joshi",
    time: "10:30 AM",
    doctor: "Dr. Patel",
    type: "Check-up",
    status: "Completed",
  },
  {
    id: "A-1005",
    patient: "Krish Desai",
    time: "11:00 AM",
    doctor: "Dr. Mehta",
    type: "Consultation",
    status: "Waiting",
  },
];

const statusStyles: Record<AppointmentStatus, string> = {
  Confirmed: "bg-cyan-400/10 text-cyan-400",
  Waiting: "bg-amber-400/10 text-amber-400",
  Completed: "bg-emerald-400/10 text-emerald-400",
};

export default function ReceptionistDashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesSearch = [
        appointment.id,
        appointment.patient,
        appointment.doctor,
        appointment.type,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        status === "All" || appointment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const stats = [
    {
      label: "Today's Appointments",
      value: appointments.length,
      icon: CalendarDays,
      color: "text-cyan-400",
    },
    {
      label: "Registered Patients",
      value: 248,
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Waiting",
      value: appointments.filter((a) => a.status === "Waiting").length,
      icon: Clock,
      color: "text-amber-400",
    },
    {
      label: "Completed",
      value: appointments.filter((a) => a.status === "Completed").length,
      icon: CheckCircle2,
      color: "text-emerald-400",
    },
  ];

  const navigation = [
    {
      label: "Settings",
      icon: Settings,
      path: "/dashboard/receptionist/settings",
    },
    {
      label: "Notifications",
      icon: Bell,
      action: () => window.alert("Demo: No new notifications."),
    },
    {
      label: "Logout",
      icon: LogOut,
      action: () => router.push("/"),
    },
  ];

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1600px] space-y-8">
        {/* Page Heading */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-cyan-400">
              Reception Workspace
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Staff Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Manage patient registrations and daily appointments.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              window.alert(
                "Demo: Patient registration is not implemented yet."
              )
            }
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 font-semibold text-white shadow-lg shadow-cyan-950/30 transition hover:brightness-110"
          >
            <UserPlus size={19} />
            Register Patient
          </button>
        </header>

        {/* Quick Navigation */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {navigation.map(({ label, icon: Icon, path, action }) => (
            <button
              key={label}
              type="button"
              onClick={() => (path ? router.push(path) : action?.())}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-slate-900/60 p-4 text-left transition hover:border-cyan-400/30 hover:bg-slate-900"
            >
              <span className="flex items-center gap-3">
                <span className="rounded-lg bg-cyan-400/10 p-2 text-cyan-400">
                  <Icon size={19} />
                </span>
                <span className="font-medium">{label}</span>
              </span>

              <ArrowRight size={16} className="text-slate-500" />
            </button>
          ))}
        </section>

        {/* Statistics */}
        <section
          aria-label="Reception statistics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map(({ label, value, icon: Icon, color }) => (
            <article
              key={label}
              className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-slate-400">{label}</p>

                <div className={`rounded-xl bg-white/[0.04] p-3 ${color}`}>
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold">{value}</p>
            </article>
          ))}
        </section>

        {/* Appointments */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/50">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Today&apos;s Appointments
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Review and track scheduled patient visits.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-3 sm:min-w-64">
                <Search size={18} className="shrink-0 text-slate-500" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search appointments..."
                  aria-label="Search appointments"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                aria-label="Filter appointments by status"
                className="min-h-11 rounded-xl border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Waiting">Waiting</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">Time / ID</th>
                  <th className="px-5 py-4">Patient</th>
                  <th className="px-5 py-4">Doctor</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="transition hover:bg-white/[0.02]"
                  >
                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="font-semibold">{appointment.time}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {appointment.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {appointment.patient}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                      {appointment.doctor}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {appointment.type}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[appointment.status]}`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          window.alert(
                            `Demo appointment: ${appointment.id} - ${appointment.patient}`
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                      >
                        View <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredAppointments.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No appointments match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-slate-500">
          Demonstration interface — all appointment information is mock data.
        </p>
      </div>
    </DashboardShell>
  );
}
