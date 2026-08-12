"use client";

import type { ReactNode } from "react";
import {
  CalendarDays,
  ClipboardList,
  FlaskConical,
  Users,
} from "lucide-react";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { mockPatients } from "@/mock/patients";

/* =========================================================
   APPOINTMENT DATA
   Patient IDs connect appointments to mockPatients.
   This means the same patient names appear everywhere.
========================================================= */

const appointments = [
  {
    time: "09:00 AM",
    patientId: "P-1001",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    time: "09:30 AM",
    patientId: "P-1002",
    type: "Follow-up",
    status: "In Progress",
  },
  {
    time: "10:15 AM",
    patientId: "P-1003",
    type: "Consultation",
    status: "Waiting",
  },
];

/* =========================================================
   GET PATIENT
========================================================= */

function getPatient(patientId: string) {
  return mockPatients.find(
    (patient) => patient.id === patientId
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="min-w-0 lg:ml-72">
        {/* ===================================================
            TOPBAR
        ==================================================== */}

        <Topbar />

        {/* ===================================================
            DASHBOARD CONTENT
        ==================================================== */}

        <div
          className="
            px-4
            pb-10
            pt-8
            sm:px-6
            sm:pt-10
            lg:px-8
          "
        >
          {/* =================================================
              PAGE HEADING
          ================================================== */}

          <div className="mb-8">
            <p className="text-sm font-semibold text-cyan-400">
              Doctor Portal
            </p>

            <h1
              className="
                mt-2
                text-3xl
                font-bold
                tracking-tight
                text-white
                sm:text-4xl
              "
            >
              Good morning, Doctor
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Here&apos;s your clinical overview for today.
            </p>
          </div>

          {/* =================================================
              SUMMARY CARDS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            <DashboardCard
              title="Today's Appointments"
              value="12"
              icon={<CalendarDays size={23} />}
            />

            <DashboardCard
              title="My Patients"
              value="248"
              icon={<Users size={23} />}
            />

            <DashboardCard
              title="Pending Lab Results"
              value="5"
              icon={<FlaskConical size={23} />}
            />

            <DashboardCard
              title="Pending Follow-ups"
              value="8"
              icon={<ClipboardList size={23} />}
            />
          </div>

          {/* =================================================
              TODAY'S APPOINTMENTS
          ================================================== */}

          <section
            className="
              mt-6
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-4
              shadow-xl
              sm:p-6
              lg:p-7
            "
          >
            {/* Section heading */}

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Today&apos;s Appointments
              </h2>

              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Your scheduled patient visits.
              </p>
            </div>

            {/* =================================================
                DESKTOP / TABLET
            ================================================== */}

            <div className="hidden overflow-hidden rounded-2xl border border-white/5 md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Time
                      </th>

                      <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Patient
                      </th>

                      <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Type
                      </th>

                      <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((appointment) => {
                      const patient = getPatient(
                        appointment.patientId
                      );

                      if (!patient) return null;

                      return (
                        <AppointmentRow
                          key={appointment.patientId}
                          time={appointment.time}
                          patientName={patient.name}
                          patientId={patient.id}
                          type={appointment.type}
                          status={appointment.status}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =================================================
                MOBILE
            ================================================== */}

            <div className="space-y-3 md:hidden">
              {appointments.map((appointment) => {
                const patient = getPatient(
                  appointment.patientId
                );

                if (!patient) return null;

                return (
                  <MobileAppointment
                    key={appointment.patientId}
                    time={appointment.time}
                    patientName={patient.name}
                    patientId={patient.id}
                    type={appointment.type}
                    status={appointment.status}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* =============================================================
   DASHBOARD CARD
============================================================= */

function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div
      className="
        min-w-0
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-5
        shadow-xl
        transition
        hover:border-cyan-400/20
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">
        {/* Text */}

        <div className="min-w-0">
          <p className="truncate text-sm text-slate-400 sm:text-base">
            {title}
          </p>

          <p className="mt-3 text-4xl font-bold text-white">
            {value}
          </p>
        </div>

        {/* Icon */}

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-cyan-400/10
            text-cyan-400
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   DESKTOP APPOINTMENT ROW
============================================================= */

function AppointmentRow({
  time,
  patientName,
  patientId,
  type,
  status,
}: {
  time: string;
  patientName: string;
  patientId: string;
  type: string;
  status: string;
}) {
  return (
    <tr className="border-b border-white/5 last:border-0">
      {/* Time */}

      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-300">
        {time}
      </td>

      {/* Patient */}

      <td className="px-5 py-5">
        <div>
          <p className="whitespace-nowrap text-sm font-semibold text-white">
            {patientName}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {patientId}
          </p>
        </div>
      </td>

      {/* Type */}

      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-400">
        {type}
      </td>

      {/* Status */}

      <td className="whitespace-nowrap px-5 py-5">
        <StatusBadge status={status} />
      </td>
    </tr>
  );
}

/* =============================================================
   MOBILE APPOINTMENT CARD
============================================================= */

function MobileAppointment({
  time,
  patientName,
  patientId,
  type,
  status,
}: {
  time: string;
  patientName: string;
  patientId: string;
  type: string;
  status: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/5
        bg-white/[0.025]
        p-4
      "
    >
      {/* Top row */}

      <div className="flex items-start justify-between gap-3">
        {/* Time */}

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Time
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {time}
          </p>
        </div>

        {/* Status */}

        <StatusBadge status={status} />
      </div>

      {/* Details */}

      <div
        className="
          mt-4
          grid
          grid-cols-1
          gap-4
          border-t
          border-white/5
          pt-4
          min-[400px]:grid-cols-2
        "
      >
        {/* Patient */}

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Patient
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-white">
            {patientName}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {patientId}
          </p>
        </div>

        {/* Type */}

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Type
          </p>

          <p className="mt-1 break-words text-sm text-slate-400">
            {type}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   STATUS BADGE
============================================================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
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

  if (status === "Confirmed") {
    className =
      "bg-emerald-400/10 text-emerald-400 border-emerald-400/10";
  }

  return (
    <span
      className={`
        inline-flex
        shrink-0
        items-center
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-medium
        ${className}
      `}
    >
      {status}
    </span>
  );
}