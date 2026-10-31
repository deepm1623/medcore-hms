
"use client";

import {
  Activity,
  CalendarDays,
  ClipboardList,
  Stethoscope,
  Users,
  UserPlus,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import DashboardShell from "@/components/layout/dashboard-shell";

const stats = [
  {
    title: "Total Patients",
    value: "1,284",
    change: "+12.5%",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    title: "Total Doctors",
    value: "48",
    change: "+4 this month",
    icon: Stethoscope,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    title: "Appointments",
    value: "156",
    change: "Today",
    icon: CalendarDays,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    title: "Departments",
    value: "12",
    change: "Active",
    icon: Building2,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

const appointments = [
  {
    id: "APT-1024",
    patient: "Aarav Patel",
    doctor: "Dr. Mehta",
    department: "Cardiology",
    time: "09:30 AM",
    status: "Confirmed",
  },
  {
    id: "APT-1025",
    patient: "Diya Shah",
    doctor: "Dr. Desai",
    department: "Neurology",
    time: "10:00 AM",
    status: "Waiting",
  },
  {
    id: "APT-1026",
    patient: "Vivaan Joshi",
    doctor: "Dr. Patel",
    department: "Orthopedics",
    time: "10:30 AM",
    status: "Completed",
  },
  {
    id: "APT-1027",
    patient: "Anaya Trivedi",
    doctor: "Dr. Shah",
    department: "Pediatrics",
    time: "11:00 AM",
    status: "Cancelled",
  },
];

const quickActions = [
  {
    title: "Manage Users",
    description: "Manage hospital staff accounts",
    href: "/dashboard/admin/users",
    icon: UserPlus,
  },
  {
    title: "Manage Doctors",
    description: "View and manage doctors",
    href: "/dashboard/admin/doctors",
    icon: Stethoscope,
  },
  {
    title: "Departments",
    description: "Manage hospital departments",
    href: "/dashboard/admin/departments",
    icon: Building2,
  },
  {
    title: "View Reports",
    description: "Review hospital performance",
    href: "/dashboard/admin/reports",
    icon: ClipboardList,
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Confirmed: "bg-emerald-400/10 text-emerald-400",
    Waiting: "bg-amber-400/10 text-amber-400",
    Completed: "bg-cyan-400/10 text-cyan-400",
    Cancelled: "bg-red-400/10 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-slate-400/10 text-slate-400"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-cyan-400">Administration</p>
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Hospital Overview
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Monitor hospital activity and manage operations.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
            <Activity size={17} className="text-emerald-400" />
            System operational
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition hover:border-cyan-400/20"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                  >
                    <Icon size={23} />
                  </div>
                  <ArrowUpRight size={18} className="text-slate-600" />
                </div>

                <p className="mt-5 text-sm text-slate-400">{stat.title}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {stat.value}
                  </h2>
                  <span className="text-xs text-slate-500">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Common administrative tasks
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-cyan-400" />
                    <ArrowUpRight
                      size={18}
                      className="text-slate-600 transition group-hover:text-cyan-400"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent appointments */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <div className="flex flex-col justify-between gap-3 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Recent Appointments
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Today&apos;s appointment activity
              </p>
            </div>

            <Link
              href="/dashboard/admin/appointments"
              className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              View all appointments
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Appointment</th>
                  <th className="px-5 py-4 font-medium">Patient</th>
                  <th className="px-5 py-4 font-medium">Doctor</th>
                  <th className="px-5 py-4 font-medium">Department</th>
                  <th className="px-5 py-4 font-medium">Time</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="transition hover:bg-white/[0.025]"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-cyan-400">
                      {appointment.id}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-white">
                      {appointment.patient}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-300">
                      {appointment.doctor}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-400">
                      {appointment.department}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-400">
                      {appointment.time}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <StatusBadge status={appointment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
