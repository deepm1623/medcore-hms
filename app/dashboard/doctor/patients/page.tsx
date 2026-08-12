"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  UserPlus,
  Eye,
  ChevronDown,
  X,
} from "lucide-react";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

type PatientStatus = "Stable" | "Under Treatment" | "Critical";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  bloodGroup: string;
  condition: string;
  department: string;
  status: PatientStatus;
  lastVisit: string;
};

const patients: Patient[] = [
  {
    id: "P-1001",
    name: "Aarav Patel",
    age: 42,
    gender: "Male",
    bloodGroup: "B+",
    condition: "Type 2 Diabetes",
    department: "General Medicine",
    status: "Stable",
    lastVisit: "12 Aug 2026",
  },
  {
    id: "P-1002",
    name: "Ananya Shah",
    age: 31,
    gender: "Female",
    bloodGroup: "O+",
    condition: "Asthma",
    department: "General Medicine",
    status: "Under Treatment",
    lastVisit: "11 Aug 2026",
  },
  {
    id: "P-1003",
    name: "Raj Mehta",
    age: 57,
    gender: "Male",
    bloodGroup: "A+",
    condition: "Hypertension",
    department: "Cardiology",
    status: "Stable",
    lastVisit: "10 Aug 2026",
  },
  {
    id: "P-1004",
    name: "Diya Joshi",
    age: 26,
    gender: "Female",
    bloodGroup: "AB+",
    condition: "Migraine",
    department: "Neurology",
    status: "Stable",
    lastVisit: "09 Aug 2026",
  },
  {
    id: "P-1005",
    name: "Vivaan Desai",
    age: 48,
    gender: "Male",
    bloodGroup: "O-",
    condition: "High Cholesterol",
    department: "General Medicine",
    status: "Under Treatment",
    lastVisit: "08 Aug 2026",
  },
  {
    id: "P-1006",
    name: "Meera Patel",
    age: 35,
    gender: "Female",
    bloodGroup: "A-",
    condition: "Thyroid Disorder",
    department: "Endocrinology",
    status: "Stable",
    lastVisit: "07 Aug 2026",
  },
  {
    id: "P-1007",
    name: "Arjun Shah",
    age: 63,
    gender: "Male",
    bloodGroup: "B-",
    condition: "Coronary Artery Disease",
    department: "Cardiology",
    status: "Critical",
    lastVisit: "06 Aug 2026",
  },
  {
    id: "P-1008",
    name: "Kiara Mehta",
    age: 29,
    gender: "Female",
    bloodGroup: "AB-",
    condition: "Anemia",
    department: "General Medicine",
    status: "Under Treatment",
    lastVisit: "05 Aug 2026",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStatusClass(status: PatientStatus) {
  switch (status) {
    case "Stable":
      return "border-emerald-400/10 bg-emerald-500/10 text-emerald-400";

    case "Under Treatment":
      return "border-amber-400/10 bg-amber-500/10 text-amber-400";

    case "Critical":
      return "border-red-400/10 bg-red-500/10 text-red-400";

    default:
      return "border-slate-400/10 bg-slate-500/10 text-slate-400";
  }
}

export default function DoctorPatientsPage() {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "All" | PatientStatus
  >("All");

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.condition.toLowerCase().includes(query) ||
        patient.department.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar />

      {/* =====================================================
          MAIN AREA
      ====================================================== */}
      <main className="min-h-screen min-w-0 lg:ml-72">
        {/* ===================================================
            SHARED TOP BAR

            This replaces the old page-specific header.
            The shared Topbar should handle:
            - Mobile hamburger
            - Notification
            - Doctor profile
            - Desktop search
            - Responsive layout
        ==================================================== */}
        <Topbar />

        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}
        <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* =================================================
              PAGE HEADER
          ================================================== */}
          <div className="mb-7 flex flex-col gap-5 sm:mb-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="mb-2 text-sm font-semibold text-cyan-400">
                Doctor Portal
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Patients
              </h1>

              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Manage and review your assigned patients.
              </p>
            </div>

            {/* Add Patient */}
            <button
              type="button"
              className="
                flex h-12 w-full shrink-0
                items-center justify-center gap-2
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-5
                text-sm font-semibold
                text-white
                shadow-lg
                shadow-blue-500/10
                transition
                hover:from-cyan-400
                hover:to-blue-500
                active:scale-[0.98]
                sm:w-auto
              "
            >
              <UserPlus size={19} />
              Add Patient
            </button>
          </div>

          {/* =================================================
              SEARCH + FILTER
          ================================================== */}
          <div
            className="
              mb-7
              rounded-2xl
              border border-white/10
              bg-white/[0.025]
              p-3
              sm:p-4
            "
          >
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* Search */}
              <div className="relative min-w-0 flex-1">
                <Search
                  size={19}
                  className="
                    pointer-events-none
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by patient name, ID, condition..."
                  className="
                    h-12 w-full
                    rounded-xl
                    border border-white/10
                    bg-slate-900/70
                    pl-11 pr-4
                    text-sm text-white
                    outline-none
                    placeholder:text-slate-500
                    focus:border-cyan-400/50
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                />
              </div>

              {/* Status */}
              <div className="relative w-full lg:w-56">
                <SlidersHorizontal
                  size={18}
                  className="
                    pointer-events-none
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as
                        | "All"
                        | PatientStatus
                    )
                  }
                  className="
                    h-12 w-full
                    appearance-none
                    rounded-xl
                    border border-white/10
                    bg-slate-900/70
                    pl-11 pr-10
                    text-sm text-slate-200
                    outline-none
                    focus:border-cyan-400/50
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                >
                  <option value="All">All Status</option>
                  <option value="Stable">Stable</option>
                  <option value="Under Treatment">
                    Under Treatment
                  </option>
                  <option value="Critical">Critical</option>
                </select>

                <ChevronDown
                  size={17}
                  className="
                    pointer-events-none
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />
              </div>
            </div>
          </div>

          {/* =================================================
              RESULT COUNT
          ================================================== */}
          <div className="mb-4 px-1">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-200">
                {filteredPatients.length}
              </span>{" "}
              patients
            </p>
          </div>

          {/* =================================================
              DESKTOP TABLE
          ================================================== */}
          <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] xl:block">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Patient
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Age / Gender
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Blood Group
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Condition
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Last Visit
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="
                        border-b
                        border-white/[0.06]
                        transition
                        last:border-b-0
                        hover:bg-white/[0.025]
                      "
                    >
                      {/* Patient */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-semibold text-cyan-400">
                            {getInitials(patient.name)}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-white">
                              {patient.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {patient.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Age / Gender */}
                      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-300">
                        {patient.age} / {patient.gender}
                      </td>

                      {/* Blood */}
                      <td className="px-5 py-5">
                        <span
                          className="
                            inline-flex
                            rounded-lg
                            border border-rose-400/10
                            bg-rose-500/10
                            px-3 py-1
                            text-xs
                            font-semibold
                            text-rose-300
                          "
                        >
                          {patient.bloodGroup}
                        </span>
                      </td>

                      {/* Condition */}
                      <td className="px-5 py-5">
                        <p className="text-sm font-medium text-white">
                          {patient.condition}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {patient.department}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">
                        <span
                          className={`
                            inline-flex
                            whitespace-nowrap
                            rounded-full
                            border
                            px-3 py-1
                            text-xs
                            font-semibold
                            ${getStatusClass(patient.status)}
                          `}
                        >
                          {patient.status}
                        </span>
                      </td>

                      {/* Last Visit */}
                      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-300">
                        {patient.lastVisit}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPatient(patient)
                          }
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border border-white/10
                            bg-white/[0.02]
                            px-4 py-2
                            text-xs
                            font-semibold
                            text-slate-300
                            transition
                            hover:border-cyan-400/30
                            hover:bg-cyan-400/5
                            hover:text-cyan-400
                          "
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              TABLET TABLE
          ================================================== */}
          <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] md:block xl:hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[950px] w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
                      Patient
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
                      Age / Gender
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
                      Blood
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
                      Condition
                    </th>

                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-white/[0.06] last:border-0"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-xs font-semibold text-cyan-400">
                            {getInitials(patient.name)}
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              {patient.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {patient.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-300">
                        {patient.age} / {patient.gender}
                      </td>

                      <td className="px-5 py-5">
                        <span className="rounded-lg bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
                          {patient.bloodGroup}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm text-white">
                          {patient.condition}
                        </p>

                        <p className="text-xs text-slate-500">
                          {patient.department}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`
                            whitespace-nowrap
                            rounded-full
                            border
                            px-3 py-1
                            text-xs
                            font-semibold
                            ${getStatusClass(patient.status)}
                          `}
                        >
                          {patient.status}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPatient(patient)
                          }
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border border-white/10
                            px-4 py-2
                            text-xs
                            font-semibold
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================
              MOBILE PATIENT CARDS
          ================================================== */}
          <div className="space-y-4 md:hidden">
            {filteredPatients.map((patient) => (
              <article
                key={patient.id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.025]
                  p-4
                "
              >
                {/* Patient heading */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-semibold text-cyan-400">
                      {getInitials(patient.name)}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-base font-semibold text-white">
                        {patient.name}
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        {patient.id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      border
                      px-3 py-1
                      text-[11px]
                      font-semibold
                      ${getStatusClass(patient.status)}
                    `}
                  >
                    {patient.status}
                  </span>
                </div>

                {/* Patient information */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-900/70 p-3">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500">
                      Age / Gender
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-200">
                      {patient.age} / {patient.gender}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900/70 p-3">
                    <p className="text-[11px] uppercase tracking-wider text-slate-500">
                      Blood Group
                    </p>

                    <p className="mt-1 text-sm font-semibold text-rose-300">
                      {patient.bloodGroup}
                    </p>
                  </div>
                </div>

                {/* Condition */}
                <div className="mt-3 rounded-xl bg-slate-900/70 p-3">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">
                    Condition
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {patient.condition}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {patient.department}
                  </p>
                </div>

                {/* Last visit */}
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-500">
                      Last Visit
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {patient.lastVisit}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPatient(patient)
                    }
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      gap-2
                      rounded-xl
                      border border-white/10
                      bg-white/[0.03]
                      px-4 py-2.5
                      text-xs
                      font-semibold
                      text-slate-300
                      transition
                      hover:border-cyan-400/30
                      hover:text-cyan-400
                    "
                  >
                    <Eye size={16} />
                    View
                  </button>
                </div>
              </article>
            ))}

            {/* No results */}
            {filteredPatients.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-12 text-center">
                <p className="text-sm font-medium text-slate-300">
                  No patients found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try changing your search or status filter.
                </p>
              </div>
            )}
          </div>

          {/* =================================================
              DESKTOP NO RESULTS
          ================================================== */}
          {filteredPatients.length === 0 && (
            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-16 text-center md:block">
              <p className="text-sm font-medium text-slate-300">
                No patients found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* =====================================================
          PATIENT VIEW MODAL
      ====================================================== */}
      {selectedPatient && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            overflow-y-auto
            bg-black/70
            px-4 py-6
            backdrop-blur-sm
          "
          onClick={() => setSelectedPatient(null)}
        >
          <div
            className="
              my-auto
              w-full max-w-lg
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-slate-950
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="border-b border-white/10 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 font-semibold text-cyan-400">
                    {getInitials(selectedPatient.name)}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-white">
                      {selectedPatient.name}
                    </h2>

                    <p className="text-xs text-slate-500">
                      {selectedPatient.id}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPatient(null)}
                  className="
                    shrink-0
                    rounded-xl
                    p-2
                    text-slate-500
                    transition
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4">
                <span
                  className={`
                    inline-flex
                    rounded-full
                    border
                    px-3 py-1
                    text-xs
                    font-semibold
                    ${getStatusClass(selectedPatient.status)}
                  `}
                >
                  {selectedPatient.status}
                </span>
              </div>
            </div>

            {/* Modal Details */}
            <div className="grid grid-cols-2 gap-3 p-5 sm:p-6">
              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Age
                </p>

                <p className="mt-1 font-medium text-white">
                  {selectedPatient.age}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Gender
                </p>

                <p className="mt-1 font-medium text-white">
                  {selectedPatient.gender}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Blood Group
                </p>

                <p className="mt-1 font-medium text-rose-300">
                  {selectedPatient.bloodGroup}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Last Visit
                </p>

                <p className="mt-1 font-medium text-white">
                  {selectedPatient.lastVisit}
                </p>
              </div>

              <div className="col-span-2 rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-slate-500">
                  Condition
                </p>

                <p className="mt-1 font-medium text-white">
                  {selectedPatient.condition}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedPatient.department}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/10 p-5">
              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-white/[0.03]
                  text-sm
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}