"use client";

import {
  CalendarDays,
  Clock3,
  Filter,
  Search,
  UserRound,
  Video,
  Stethoscope,
  MapPin,
  Eye,
  Plus,
  ChevronDown,
} from "lucide-react";

import { useMemo, useState } from "react";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

type AppointmentStatus =
  | "Confirmed"
  | "In Progress"
  | "Waiting"
  | "Completed"
  | "Cancelled";

type AppointmentType =
  | "Consultation"
  | "Follow-up"
  | "Emergency"
  | "Check-up";

interface Appointment {
  id: string;
  time: string;
  patient: string;
  patientId: string;
  age: number;
  gender: string;
  type: AppointmentType;
  doctor: string;
  department: string;
  status: AppointmentStatus;
  date: string;
  location: string;
  mode: "In Person" | "Video";
}

/* =========================================================
   MOCK APPOINTMENTS
========================================================= */

const appointments: Appointment[] = [
  {
    id: "A-1001",
    time: "09:00 AM",
    patient: "Aarav Patel",
    patientId: "P-1001",
    age: 42,
    gender: "Male",
    type: "Consultation",
    doctor: "Doctor Name",
    department: "General Medicine",
    status: "Confirmed",
    date: "12 Aug 2026",
    location: "Room 101",
    mode: "In Person",
  },
  {
    id: "A-1002",
    time: "09:30 AM",
    patient: "Ananya Shah",
    patientId: "P-1002",
    age: 31,
    gender: "Female",
    type: "Follow-up",
    doctor: "Doctor Name",
    department: "General Medicine",
    status: "In Progress",
    date: "12 Aug 2026",
    location: "Room 102",
    mode: "In Person",
  },
  {
    id: "A-1003",
    time: "10:15 AM",
    patient: "Raj Mehta",
    patientId: "P-1003",
    age: 57,
    gender: "Male",
    type: "Consultation",
    doctor: "Doctor Name",
    department: "Cardiology",
    status: "Waiting",
    date: "12 Aug 2026",
    location: "Room 103",
    mode: "In Person",
  },
  {
    id: "A-1004",
    time: "11:00 AM",
    patient: "Diya Joshi",
    patientId: "P-1004",
    age: 26,
    gender: "Female",
    type: "Check-up",
    doctor: "Doctor Name",
    department: "Neurology",
    status: "Confirmed",
    date: "12 Aug 2026",
    location: "Room 104",
    mode: "In Person",
  },
  {
    id: "A-1005",
    time: "12:30 PM",
    patient: "Kabir Desai",
    patientId: "P-1005",
    age: 45,
    gender: "Male",
    type: "Follow-up",
    doctor: "Doctor Name",
    department: "General Medicine",
    status: "Completed",
    date: "12 Aug 2026",
    location: "Room 105",
    mode: "In Person",
  },
  {
    id: "A-1006",
    time: "02:00 PM",
    patient: "Meera Joshi",
    patientId: "P-1006",
    age: 38,
    gender: "Female",
    type: "Consultation",
    doctor: "Doctor Name",
    department: "General Medicine",
    status: "Confirmed",
    date: "12 Aug 2026",
    location: "Room 106",
    mode: "Video",
  },
  {
    id: "A-1007",
    time: "03:15 PM",
    patient: "Vivaan Patel",
    patientId: "P-1007",
    age: 29,
    gender: "Male",
    type: "Emergency",
    doctor: "Doctor Name",
    department: "Emergency",
    status: "Waiting",
    date: "12 Aug 2026",
    location: "Emergency Room",
    mode: "In Person",
  },
  {
    id: "A-1008",
    time: "04:30 PM",
    patient: "Riya Shah",
    patientId: "P-1008",
    age: 34,
    gender: "Female",
    type: "Follow-up",
    doctor: "Doctor Name",
    department: "General Medicine",
    status: "Cancelled",
    date: "12 Aug 2026",
    location: "Room 107",
    mode: "Video",
  },
];

/* =========================================================
   STATUS STYLES
========================================================= */

function getStatusClass(status: AppointmentStatus) {
  switch (status) {
    case "Confirmed":
      return "border-cyan-400/20 bg-cyan-400/10 text-cyan-400";

    case "In Progress":
      return "border-blue-400/20 bg-blue-400/10 text-blue-400";

    case "Waiting":
      return "border-amber-400/20 bg-amber-400/10 text-amber-400";

    case "Completed":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";

    case "Cancelled":
      return "border-red-400/20 bg-red-400/10 text-red-400";

    default:
      return "border-white/10 bg-white/5 text-slate-400";
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Types");
  const [date, setDate] = useState("12 Aug 2026");

  const [showStatus, setShowStatus] = useState(false);
  const [showType, setShowType] = useState(false);

  /* =======================================================
     FILTER APPOINTMENTS
  ======================================================= */

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        appointment.patient.toLowerCase().includes(searchValue) ||
        appointment.patientId.toLowerCase().includes(searchValue) ||
        appointment.type.toLowerCase().includes(searchValue) ||
        appointment.department.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All Status" ||
        appointment.status === status;

      const matchesType =
        type === "All Types" ||
        appointment.type === type;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        appointment.date === date
      );
    });
  }, [search, status, type, date]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <main className="min-w-0 lg:ml-72">
        {/* ===================================================
            TOPBAR
        ==================================================== */}

        <Topbar />

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <section className="px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">

            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

              <div>
                <p className="mb-2 text-sm font-medium text-cyan-400">
                  Doctor Portal
                </p>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Appointments
                </h1>

                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                  Manage and review your scheduled patient appointments.
                </p>
              </div>

              {/* Add Appointment */}

              <button
                type="button"
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition
                  hover:from-cyan-400
                  hover:to-blue-500
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                <Plus size={19} />
                Add Appointment
              </button>
            </div>

            {/* =================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* Today's appointments */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-5
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Today&apos;s Appointments
                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">
                      12
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <CalendarDays size={21} />
                  </div>
                </div>
              </div>

              {/* Confirmed */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-5
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Confirmed
                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">
                      6
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Clock3 size={21} />
                  </div>
                </div>
              </div>

              {/* Waiting */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-5
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Waiting
                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">
                      2
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <UserRound size={21} />
                  </div>
                </div>
              </div>

              {/* Completed */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-5
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Completed
                    </p>

                    <p className="mt-3 text-3xl font-bold text-white">
                      3
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Stethoscope size={21} />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FILTER AREA
            ================================================== */}

            <div
              className="
                mb-6
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-4
                sm:p-5
              "
            >
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px_180px]">

                {/* Search */}

                <div className="relative">
                  <Search
                    size={19}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-500
                    "
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search patient, ID, appointment type..."
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-slate-900/70
                      pl-11
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-500
                      transition
                      focus:border-cyan-400/50
                      focus:ring-2
                      focus:ring-cyan-400/10
                    "
                  />
                </div>

                {/* Date */}

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-500
                    "
                  />

                  <input
                    type="text"
                    value={date}
                    onChange={(event) =>
                      setDate(event.target.value)
                    }
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-slate-900/70
                      pl-11
                      pr-3
                      text-sm
                      text-white
                      outline-none
                      focus:border-cyan-400/50
                    "
                  />
                </div>

                {/* Status */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowStatus(!showStatus)
                    }
                    className="
                      flex
                      h-12
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-slate-900/70
                      px-4
                      text-sm
                      text-slate-200
                    "
                  >
                    <span className="flex items-center gap-2">
                      <Filter
                        size={17}
                        className="text-slate-500"
                      />

                      {status}
                    </span>

                    <ChevronDown
                      size={17}
                      className="text-slate-500"
                    />
                  </button>

                  {showStatus && (
                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-14
                        z-30
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-slate-900
                        shadow-2xl
                      "
                    >
                      {[
                        "All Status",
                        "Confirmed",
                        "In Progress",
                        "Waiting",
                        "Completed",
                        "Cancelled",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setStatus(item);
                            setShowStatus(false);
                          }}
                          className="
                            block
                            w-full
                            px-4
                            py-3
                            text-left
                            text-sm
                            text-slate-300
                            transition
                            hover:bg-white/[0.05]
                            hover:text-cyan-400
                          "
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Appointment Type */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowType(!showType)
                    }
                    className="
                      flex
                      h-12
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-slate-900/70
                      px-4
                      text-sm
                      text-slate-200
                    "
                  >
                    <span className="flex items-center gap-2">
                      <Stethoscope
                        size={17}
                        className="text-slate-500"
                      />

                      {type}
                    </span>

                    <ChevronDown
                      size={17}
                      className="text-slate-500"
                    />
                  </button>

                  {showType && (
                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-14
                        z-30
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-slate-900
                        shadow-2xl
                      "
                    >
                      {[
                        "All Types",
                        "Consultation",
                        "Follow-up",
                        "Emergency",
                        "Check-up",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setType(item);
                            setShowType(false);
                          }}
                          className="
                            block
                            w-full
                            px-4
                            py-3
                            text-left
                            text-sm
                            text-slate-300
                            transition
                            hover:bg-white/[0.05]
                            hover:text-cyan-400
                          "
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                RESULTS COUNT
            ================================================== */}

            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-semibold text-white">
                  {filteredAppointments.length}
                </span>{" "}
                appointments
              </p>
            </div>

            {/* =================================================
                DESKTOP TABLE
            ================================================== */}

            <div
              className="
                hidden
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                lg:block
              "
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] border-collapse">

                  <thead>
                    <tr className="border-b border-white/[0.07] bg-white/[0.02]">

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Time
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Patient
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Type
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Department
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Mode
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    {filteredAppointments.map(
                      (appointment) => (
                        <tr
                          key={appointment.id}
                          className="
                            border-b
                            border-white/[0.06]
                            last:border-b-0
                            transition
                            hover:bg-white/[0.025]
                          "
                        >

                          {/* Time */}

                          <td className="px-5 py-5 align-middle">
                            <div className="flex items-center gap-2">
                              <Clock3
                                size={16}
                                className="text-cyan-400"
                              />

                              <span className="whitespace-nowrap text-sm font-semibold text-white">
                                {appointment.time}
                              </span>
                            </div>
                          </td>

                          {/* Patient */}

                          <td className="px-5 py-5">
                            <div className="flex items-center gap-3">

                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-cyan-500/10
                                  text-xs
                                  font-bold
                                  text-cyan-400
                                "
                              >
                                {appointment.patient
                                  .split(" ")
                                  .map((name) =>
                                    name[0]
                                  )
                                  .join("")
                                  .slice(0, 2)}
                              </div>

                              <div>
                                <p className="whitespace-nowrap text-sm font-semibold text-white">
                                  {appointment.patient}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {appointment.patientId} •{" "}
                                  {appointment.age} /{" "}
                                  {appointment.gender}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Type */}

                          <td className="px-5 py-5">
                            <p className="text-sm text-slate-200">
                              {appointment.type}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {appointment.id}
                            </p>
                          </td>

                          {/* Department */}

                          <td className="px-5 py-5">
                            <p className="text-sm text-slate-200">
                              {appointment.department}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                              <MapPin size={12} />
                              {appointment.location}
                            </p>
                          </td>

                          {/* Mode */}

                          <td className="px-5 py-5">
                            <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                              {appointment.mode ===
                              "Video" ? (
                                <Video
                                  size={16}
                                  className="text-blue-400"
                                />
                              ) : (
                                <UserRound
                                  size={16}
                                  className="text-slate-500"
                                />
                              )}

                              {appointment.mode}
                            </span>
                          </td>

                          {/* Status */}

                          <td className="px-5 py-5">
                            <span
                              className={`
                                inline-flex
                                rounded-full
                                border
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                ${getStatusClass(
                                  appointment.status
                                )}
                              `}
                            >
                              {appointment.status}
                            </span>
                          </td>

                          {/* Action */}

                          <td className="px-5 py-5 text-right">
                            <button
                              type="button"
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-white/[0.10]
                                bg-white/[0.025]
                                px-3
                                py-2
                                text-xs
                                font-medium
                                text-slate-300
                                transition
                                hover:border-cyan-400/30
                                hover:text-cyan-400
                              "
                            >
                              <Eye size={15} />
                              View
                            </button>
                          </td>

                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =================================================
                MOBILE / TABLET CARDS
            ================================================== */}

            <div className="space-y-4 lg:hidden">

              {filteredAppointments.map(
                (appointment) => (
                  <div
                    key={appointment.id}
                    className="
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      p-5
                    "
                  >

                    {/* Top */}

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-500/10
                            text-xs
                            font-bold
                            text-cyan-400
                          "
                        >
                          {appointment.patient
                            .split(" ")
                            .map((name) =>
                              name[0]
                            )
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-white">
                            {appointment.patient}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {appointment.patientId}
                          </p>

                        </div>
                      </div>

                      <span
                        className={`
                          shrink-0
                          rounded-full
                          border
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          ${getStatusClass(
                            appointment.status
                          )}
                        `}
                      >
                        {appointment.status}
                      </span>
                    </div>

                    {/* Time */}

                    <div className="mt-5 flex items-center gap-2 text-sm">
                      <Clock3
                        size={17}
                        className="text-cyan-400"
                      />

                      <span className="font-semibold text-white">
                        {appointment.time}
                      </span>

                      <span className="text-slate-600">
                        •
                      </span>

                      <span className="text-slate-400">
                        {appointment.date}
                      </span>
                    </div>

                    {/* Details */}

                    <div className="mt-4 grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-slate-900/70 p-3">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          Type
                        </p>

                        <p className="mt-1 text-sm text-slate-200">
                          {appointment.type}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-900/70 p-3">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          Department
                        </p>

                        <p className="mt-1 truncate text-sm text-slate-200">
                          {appointment.department}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-900/70 p-3">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          Patient
                        </p>

                        <p className="mt-1 text-sm text-slate-200">
                          {appointment.age} /{" "}
                          {appointment.gender}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-900/70 p-3">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          Mode
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-200">
                          {appointment.mode ===
                          "Video" ? (
                            <Video
                              size={14}
                              className="text-blue-400"
                            />
                          ) : (
                            <UserRound
                              size={14}
                              className="text-slate-500"
                            />
                          )}

                          {appointment.mode}
                        </p>
                      </div>

                    </div>

                    {/* Bottom */}

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">

                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={13} />
                        {appointment.location}
                      </span>

                      <button
                        type="button"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-white/[0.10]
                          px-3
                          py-2
                          text-xs
                          font-medium
                          text-slate-300
                          transition
                          hover:border-cyan-400/30
                          hover:text-cyan-400
                        "
                      >
                        <Eye size={15} />
                        View
                      </button>

                    </div>
                  </div>
                )
              )}
            </div>

            {/* =================================================
                NO RESULTS
            ================================================== */}

            {filteredAppointments.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-6
                  py-16
                  text-center
                "
              >
                <CalendarDays
                  size={40}
                  className="mx-auto text-slate-600"
                />

                <h3 className="mt-4 text-lg font-semibold text-white">
                  No appointments found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}

          </div>
        </section>
      </main>
    </div>
  );
}