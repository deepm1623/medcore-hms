"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Eye,
  FileText,
  FlaskConical,
  HeartPulse,
  Plus,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { mockPatients } from "@/mock/patients";

/* =========================================================
   TYPES
========================================================= */

type AppointmentStatus =
  | "Confirmed"
  | "In Progress"
  | "Waiting"
  | "Completed"
  | "Cancelled";

type Appointment = {
  id: string;
  time: string;
  patientId: string;
  type: string;
  status: AppointmentStatus;
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: ReactNode;
};

/* =========================================================
   DEMO DATA
========================================================= */

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-1001",
    time: "09:00 AM",
    patientId: "P-1001",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: "APT-1002",
    time: "09:30 AM",
    patientId: "P-1002",
    type: "Follow-up",
    status: "In Progress",
  },
  {
    id: "APT-1003",
    time: "10:15 AM",
    patientId: "P-1003",
    type: "Consultation",
    status: "Waiting",
  },
];

const PENDING_LAB_RESULTS = 5;
const PENDING_FOLLOW_UPS = 8;

/* =========================================================
   HELPERS
========================================================= */

function getPatient(patientId: string) {
  return mockPatients.find((patient) => patient.id === patientId);
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function DoctorDashboard() {
  const router = useRouter();

  const [appointments, setAppointments] =
    useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [showQuickActions, setShowQuickActions] = useState(false);

  const [activity, setActivity] = useState<ActivityItem[]>([
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

  const activeAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) =>
          appointment.status !== "Completed" &&
          appointment.status !== "Cancelled"
      ),
    [appointments]
  );

  const todayAppointments = activeAppointments.length;
  const patientCount = mockPatients.length;

  const addActivity = (
    title: string,
    description: string,
    icon: ReactNode
  ) => {
    const newActivity: ActivityItem = {
      id: `activity-${Date.now()}`,
      title,
      description,
      time: "Just now",
      icon,
    };

    setActivity((current) => [newActivity, ...current].slice(0, 5));
  };

  const updateAppointmentStatus = (
    appointmentId: string,
    status: AppointmentStatus
  ) => {
    const appointment = appointments.find(
      (item) => item.id === appointmentId
    );

    if (!appointment) return;

    const patient = getPatient(appointment.patientId);
    const patientName = patient?.name ?? "Patient";

    setAppointments((current) =>
      current.map((item) =>
        item.id === appointmentId ? { ...item, status } : item
      )
    );

    if (status === "In Progress") {
      addActivity(
        "Consultation started",
        `${patientName}'s consultation is now in progress.`,
        <Stethoscope size={17} />
      );
    }

    if (status === "Completed") {
      addActivity(
        "Appointment completed",
        `${patientName}'s appointment has been completed.`,
        <CheckCircle2 size={17} />
      );
    }

    if (status === "Cancelled") {
      addActivity(
        "Appointment cancelled",
        `${patientName}'s appointment has been cancelled.`,
        <X size={17} />
      );
    }

    setSelectedAppointment(null);
  };

  const openEMR = (appointment: Appointment) => {
    const patient = getPatient(appointment.patientId);

    if (patient?.id) {
      router.push(
        `/dashboard/doctor/emr?patientId=${encodeURIComponent(patient.id)}`
      );
    } else {
      router.push("/dashboard/doctor/emr");
    }

    setSelectedAppointment(null);
  };

  const handleQuickAction = (destination: string) => {
    setShowQuickActions(false);
    router.push(destination);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Sidebar />

      <main className="min-w-0 lg:ml-72">
        <Topbar />

        <div className="px-4 pb-10 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          {/* =================================================
              HEADER
          ================================================== */}

          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-400">
                Doctor Portal
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Good morning, Doctor
              </h1>

              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Here&apos;s your clinical overview for today.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowQuickActions((current) => !current)}
              className="
                inline-flex h-11 items-center justify-center gap-2
                rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
                px-5 text-sm font-semibold text-white shadow-lg
                shadow-blue-500/20 transition-all duration-200
                hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500
                hover:shadow-cyan-500/20 active:translate-y-0 active:scale-[0.98]
              "
            >
              <Plus size={18} />
              Quick Action
            </button>
          </div>

          {/* =================================================
              QUICK ACTION MENU
          ================================================== */}

          {showQuickActions && (
            <section className="mb-6 rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Quick Actions
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Open a frequently used Doctor Portal module.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowQuickActions(false)}
                  aria-label="Close quick actions"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <QuickAction
                  title="Patients"
                  description="Open patient records"
                  icon={<Users size={19} />}
                  onClick={() =>
                    handleQuickAction("/dashboard/doctor/patients")
                  }
                />

                <QuickAction
                  title="Appointments"
                  description="Manage appointments"
                  icon={<CalendarDays size={19} />}
                  onClick={() =>
                    handleQuickAction("/dashboard/doctor/appointments")
                  }
                />

                <QuickAction
                  title="Lab Results"
                  description="Review test results"
                  icon={<FlaskConical size={19} />}
                  onClick={() =>
                    handleQuickAction("/dashboard/doctor/lab-results")
                  }
                />

                <QuickAction
                  title="Follow-ups"
                  description="Review follow-ups"
                  icon={<ClipboardList size={19} />}
                  onClick={() =>
                    handleQuickAction("/dashboard/doctor/follow-ups")
                  }
                />
              </div>
            </section>
          )}

          {/* =================================================
              SUMMARY CARDS
          ================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              title="Today's Appointments"
              value={String(todayAppointments)}
              icon={<CalendarDays size={23} />}
              description="Scheduled today"
              onClick={() =>
                router.push("/dashboard/doctor/appointments")
              }
            />

            <DashboardCard
              title="My Patients"
              value={String(patientCount)}
              icon={<Users size={23} />}
              description="Registered patients"
              onClick={() =>
                router.push("/dashboard/doctor/patients")
              }
            />

            <DashboardCard
              title="Pending Lab Results"
              value={String(PENDING_LAB_RESULTS)}
              icon={<FlaskConical size={23} />}
              description="Need your review"
              onClick={() =>
                router.push("/dashboard/doctor/lab-results")
              }
            />

            <DashboardCard
              title="Pending Follow-ups"
              value={String(PENDING_FOLLOW_UPS)}
              icon={<ClipboardList size={23} />}
              description="Require attention"
              onClick={() =>
                router.push("/dashboard/doctor/follow-ups")
              }
            />
          </div>

          {/* =================================================
              MAIN GRID
          ================================================== */}

          <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            {/* =================================================
                TODAY'S APPOINTMENTS
            ================================================== */}

            <section className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-xl sm:p-6 lg:p-7">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    Today&apos;s Appointments
                  </h2>

                  <p className="mt-2 text-sm text-slate-400 sm:text-base">
                    Your scheduled patient visits.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/dashboard/doctor/appointments")
                  }
                  className="
                    group inline-flex h-10 shrink-0 items-center justify-center
                    gap-2 self-start rounded-xl border border-cyan-400/20
                    bg-transparent px-4 text-xs font-semibold text-cyan-300
                    transition-all duration-200
                    hover:-translate-y-0.5 hover:border-cyan-400/50
                    hover:bg-cyan-400/10 hover:text-cyan-200
                    hover:shadow-[0_8px_28px_rgba(6,182,212,0.14)]
                    active:translate-y-0 active:scale-[0.98]
                  "
                >
                  <span>View all</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* Desktop/tablet: table is contained and never creates page-level horizontal scroll. */}
              <div className="hidden w-full overflow-hidden rounded-2xl border border-white/5 md:block">
                <table className="w-full table-fixed text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="w-[15%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-500 lg:px-4">
                        Time
                      </th>
                      <th className="w-[25%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-500 lg:px-4">
                        Patient
                      </th>
                      <th className="w-[19%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-500 lg:px-4">
                        Type
                      </th>
                      <th className="w-[18%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-500 lg:px-4">
                        Status
                      </th>
                      <th className="w-[23%] px-3 py-4 text-xs font-medium uppercase tracking-wider text-slate-500 lg:px-4">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((appointment) => {
                      const patient = getPatient(appointment.patientId);

                      if (!patient) return null;

                      return (
                        <AppointmentRow
                          key={appointment.id}
                          appointment={appointment}
                          patientName={patient.name}
                          patientId={patient.id}
                          onView={() =>
                            setSelectedAppointment(appointment)
                          }
                          onStart={() =>
                            updateAppointmentStatus(
                              appointment.id,
                              "In Progress"
                            )
                          }
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile: cards instead of a horizontally scrollable table. */}
              <div className="space-y-3 md:hidden">
                {appointments.map((appointment) => {
                  const patient = getPatient(appointment.patientId);

                  if (!patient) return null;

                  return (
                    <MobileAppointment
                      key={appointment.id}
                      appointment={appointment}
                      patientName={patient.name}
                      patientId={patient.id}
                      onView={() =>
                        setSelectedAppointment(appointment)
                      }
                      onStart={() =>
                        updateAppointmentStatus(
                          appointment.id,
                          "In Progress"
                        )
                      }
                    />
                  );
                })}
              </div>
            </section>

            {/* =================================================
                RECENT ACTIVITY
            ================================================== */}

            <section className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-white">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Latest clinical updates
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <HeartPulse size={18} />
                </div>
              </div>

              <div className="space-y-1">
                {activity.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative flex gap-3 rounded-2xl p-3 transition hover:bg-white/[0.025]"
                  >
                    {index < activity.length - 1 && (
                      <span className="absolute left-[21px] top-12 h-8 w-px bg-white/[0.07]" />
                    )}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onStart={() =>
            updateAppointmentStatus(
              selectedAppointment.id,
              "In Progress"
            )
          }
          onComplete={() =>
            updateAppointmentStatus(
              selectedAppointment.id,
              "Completed"
            )
          }
          onCancel={() =>
            updateAppointmentStatus(
              selectedAppointment.id,
              "Cancelled"
            )
          }
          onOpenEMR={() => openEMR(selectedAppointment)}
        />
      )}
    </div>
  );
}

/* =============================================================
   DASHBOARD CARD
============================================================= */

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
      className="
        group min-w-0 rounded-3xl border border-white/10 bg-white/[0.04]
        p-5 text-left shadow-xl transition-all duration-200
        hover:-translate-y-0.5 hover:border-cyan-400/20
        hover:bg-white/[0.055] hover:shadow-cyan-950/20
        active:translate-y-0
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-400">{title}</p>
          <p className="mt-3 text-4xl font-bold text-white">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400 transition-transform duration-200 group-hover:scale-105">
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1 text-xs font-medium text-cyan-400">
        Open module
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </button>
  );
}

/* =============================================================
   QUICK ACTION
============================================================= */

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
      className="
        group flex min-w-0 items-center gap-3 rounded-2xl border
        border-white/10 bg-white/[0.025] p-4 text-left
        transition-all duration-200 hover:-translate-y-0.5
        hover:border-cyan-400/20 hover:bg-cyan-400/[0.05]
      "
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {title}
        </p>
        <p className="mt-1 truncate text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ArrowRight
        size={15}
        className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400"
      />
    </button>
  );
}

/* =============================================================
   DESKTOP APPOINTMENT ROW
============================================================= */

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
  const canStart =
    appointment.status === "Confirmed" ||
    appointment.status === "Waiting";

  return (
    <tr className="border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]">
      <td className="px-3 py-5 text-sm text-slate-300 lg:px-4">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Clock3 size={15} className="shrink-0 text-slate-600" />
          {appointment.time}
        </div>
      </td>

      <td className="min-w-0 px-3 py-5 lg:px-4">
        <p className="truncate text-sm font-semibold text-white">
          {patientName}
        </p>
        <p className="mt-1 text-xs text-slate-500">{patientId}</p>
      </td>

      <td className="px-3 py-5 text-sm text-slate-400 lg:px-4">
        <span className="block truncate">{appointment.type}</span>
      </td>

      <td className="px-3 py-5 lg:px-4">
        <StatusBadge status={appointment.status} />
      </td>

      <td className="px-3 py-5 lg:px-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onView}
            className="
              inline-flex h-9 items-center gap-1.5 rounded-lg border
              border-white/[0.08] px-3 text-xs font-medium text-slate-400
              transition hover:border-cyan-400/20 hover:bg-cyan-400/5
              hover:text-cyan-400
            "
          >
            <Eye size={14} />
            View
          </button>

          {canStart && (
            <button
              type="button"
              onClick={onStart}
              className="
                inline-flex h-9 items-center gap-1.5 rounded-lg
                bg-cyan-500/10 px-3 text-xs font-medium text-cyan-400
                transition hover:bg-cyan-500/15
              "
            >
              <Stethoscope size={14} />
              Start
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

/* =============================================================
   MOBILE APPOINTMENT
============================================================= */

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
  const canStart =
    appointment.status === "Confirmed" ||
    appointment.status === "Waiting";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.025] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Time
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {appointment.time}
          </p>
        </div>

        <StatusBadge status={appointment.status} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 border-t border-white/5 pt-4 min-[400px]:grid-cols-2">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Patient
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-white">
            {patientName}
          </p>

          <p className="mt-1 text-xs text-slate-500">{patientId}</p>
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Type
          </p>

          <p className="mt-1 break-words text-sm text-slate-400">
            {appointment.type}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 border-t border-white/5 pt-4">
        <button
          type="button"
          onClick={onView}
          className="
            inline-flex h-10 flex-1 items-center justify-center gap-1.5
            rounded-xl border border-white/[0.08] text-xs font-medium
            text-slate-400 transition hover:border-cyan-400/20
            hover:bg-cyan-400/5 hover:text-cyan-400
          "
        >
          <Eye size={14} />
          View
        </button>

        {canStart && (
          <button
            type="button"
            onClick={onStart}
            className="
              inline-flex h-10 flex-1 items-center justify-center gap-1.5
              rounded-xl bg-cyan-500/10 text-xs font-medium text-cyan-400
              transition hover:bg-cyan-500/15
            "
          >
            <Stethoscope size={14} />
            Start
          </button>
        )}
      </div>
    </div>
  );
}

/* =============================================================
   APPOINTMENT MODAL
============================================================= */

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
  const patient = getPatient(appointment.patientId);

  if (!patient) return null;

  const canStart =
    appointment.status === "Confirmed" ||
    appointment.status === "Waiting";

  const canComplete = appointment.status === "In Progress";

  const canCancel =
    appointment.status !== "Completed" &&
    appointment.status !== "Cancelled";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/[0.10] bg-slate-950 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <div>
            <p className="text-xs font-medium text-cyan-400">
              Appointment
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              Appointment Details
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close appointment details"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
                {patient.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="text-base font-semibold text-white">
                  {patient.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {patient.id}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-4">
              <DetailItem label="Time" value={appointment.time} />
              <DetailItem label="Type" value={appointment.type} />
              <DetailItem
                label="Status"
                value={appointment.status}
              />
              <DetailItem label="Patient ID" value={patient.id} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onOpenEMR}
              className="
                inline-flex h-11 items-center justify-center gap-2
                rounded-xl border border-white/[0.08] text-sm font-medium
                text-slate-300 transition hover:border-cyan-400/20
                hover:bg-cyan-400/5 hover:text-cyan-400
              "
            >
              <FileText size={17} />
              Open EMR
            </button>

            {canStart && (
              <button
                type="button"
                onClick={onStart}
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl bg-cyan-500/10 text-sm font-medium
                  text-cyan-400 transition hover:bg-cyan-500/15
                "
              >
                <Stethoscope size={17} />
                Start Consultation
              </button>
            )}

            {canComplete && (
              <button
                type="button"
                onClick={onComplete}
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl bg-emerald-500/10 text-sm font-medium
                  text-emerald-400 transition hover:bg-emerald-500/15
                "
              >
                <CheckCircle2 size={17} />
                Complete
              </button>
            )}

            {canCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl bg-red-500/10 text-sm font-medium
                  text-red-400 transition hover:bg-red-500/15
                "
              >
                <X size={17} />
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   DETAIL ITEM
============================================================= */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 truncate text-sm text-slate-300">
        {value}
      </p>
    </div>
  );
}

/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({ status }: { status: AppointmentStatus }) {
  let className =
    "bg-cyan-400/10 text-cyan-400 border-cyan-400/10";

  if (status === "In Progress") {
    className =
      "bg-blue-400/10 text-blue-400 border-blue-400/10";
  }

  if (status === "Waiting") {
    className =
      "bg-amber-400/10 text-amber-400 border-amber-400/10";
  }

  if (status === "Confirmed" || status === "Completed") {
    className =
      "bg-emerald-400/10 text-emerald-400 border-emerald-400/10";
  }

  if (status === "Cancelled") {
    className =
      "bg-red-400/10 text-red-400 border-red-400/10";
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}