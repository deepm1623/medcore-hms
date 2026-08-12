"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Eye,
  FileText,
  FlaskConical,
  Search,
  UserRound,
  X,
} from "lucide-react";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

/* =========================================================
   TYPES
========================================================= */

type LabStatus = "Completed" | "Pending" | "In Progress";

interface LabResult {
  id: string;
  patientId: string;
  patientName: string;
  initials: string;

  test: string;
  category: string;

  result: string;
  referenceRange: string;

  orderedDate: string;
  completedDate: string;

  priority: "Normal" | "High" | "Urgent";
  technician: string;

  status: LabStatus;

  clinicalNotes: string;
}

/* =========================================================
   MOCK DATA
========================================================= */

const labResults: LabResult[] = [
  {
    id: "LAB-1001",
    patientId: "P-1001",
    patientName: "Aarav Patel",
    initials: "AP",
    test: "HbA1c",
    category: "Diabetes",
    result: "7.2%",
    referenceRange: "Below 5.7%",
    orderedDate: "12 Aug 2026",
    completedDate: "12 Aug 2026",
    priority: "Normal",
    technician: "Lab Technician",
    status: "Completed",
    clinicalNotes:
      "HbA1c is above the normal reference range. Review diabetic management and follow-up plan.",
  },

  {
    id: "LAB-1002",
    patientId: "P-1002",
    patientName: "Ananya Shah",
    initials: "AS",
    test: "CBC",
    category: "Hematology",
    result: "Within Range",
    referenceRange: "See laboratory reference",
    orderedDate: "12 Aug 2026",
    completedDate: "12 Aug 2026",
    priority: "Normal",
    technician: "Lab Technician",
    status: "Completed",
    clinicalNotes:
      "Complete blood count is within the expected laboratory reference range.",
  },

  {
    id: "LAB-1003",
    patientId: "P-1003",
    patientName: "Raj Mehta",
    initials: "RM",
    test: "Lipid Profile",
    category: "Cardiology",
    result: "Pending",
    referenceRange: "See laboratory reference",
    orderedDate: "12 Aug 2026",
    completedDate: "—",
    priority: "Normal",
    technician: "Lab Technician",
    status: "Pending",
    clinicalNotes:
      "Lipid profile has been ordered. Results are awaiting completion.",
  },

  {
    id: "LAB-1004",
    patientId: "P-1004",
    patientName: "Diya Joshi",
    initials: "DJ",
    test: "Vitamin D",
    category: "General Medicine",
    result: "24 ng/mL",
    referenceRange: "30–100 ng/mL",
    orderedDate: "11 Aug 2026",
    completedDate: "12 Aug 2026",
    priority: "Normal",
    technician: "Lab Technician",
    status: "Completed",
    clinicalNotes:
      "Vitamin D level is below the laboratory reference range.",
  },

  {
    id: "LAB-1005",
    patientId: "P-1005",
    patientName: "Vikram Singh",
    initials: "VS",
    test: "Liver Function Test",
    category: "Biochemistry",
    result: "Processing",
    referenceRange: "See laboratory reference",
    orderedDate: "12 Aug 2026",
    completedDate: "—",
    priority: "Normal",
    technician: "Lab Technician",
    status: "In Progress",
    clinicalNotes:
      "Liver function test is currently being processed by the laboratory.",
  },

  {
    id: "LAB-1006",
    patientId: "P-1006",
    patientName: "Neha Desai",
    initials: "ND",
    test: "Thyroid Profile",
    category: "Endocrinology",
    result: "Pending",
    referenceRange: "See laboratory reference",
    orderedDate: "11 Aug 2026",
    completedDate: "—",
    priority: "High",
    technician: "Lab Technician",
    status: "Pending",
    clinicalNotes:
      "Thyroid profile is awaiting laboratory processing.",
  },

  {
    id: "LAB-1007",
    patientId: "P-1007",
    patientName: "Karan Shah",
    initials: "KS",
    test: "Kidney Function Test",
    category: "Nephrology",
    result: "Normal",
    referenceRange: "See laboratory reference",
    orderedDate: "10 Aug 2026",
    completedDate: "11 Aug 2026",
    priority: "Normal",
    technician: "Lab Technician",
    status: "Completed",
    clinicalNotes:
      "Kidney function markers are within the expected reference range.",
  },

  {
    id: "LAB-1008",
    patientId: "P-1008",
    patientName: "Meera Patel",
    initials: "MP",
    test: "Blood Glucose",
    category: "Diabetes",
    result: "146 mg/dL",
    referenceRange: "70–140 mg/dL",
    orderedDate: "10 Aug 2026",
    completedDate: "10 Aug 2026",
    priority: "Normal",
    technician: "Lab Technician",
    status: "Completed",
    clinicalNotes:
      "Blood glucose is slightly above the laboratory reference range.",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function LabResultsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LabStatus>(
    "All"
  );

  const [selectedResult, setSelectedResult] =
    useState<LabResult | null>(null);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    return labResults.filter((result) => {
      const matchesSearch =
        !query ||
        result.patientName.toLowerCase().includes(query) ||
        result.patientId.toLowerCase().includes(query) ||
        result.test.toLowerCase().includes(query) ||
        result.category.toLowerCase().includes(query) ||
        result.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        result.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  /* =======================================================
     STATUS STYLE
  ======================================================= */

  const getStatusStyle = (status: LabStatus) => {
    if (status === "Completed") {
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";
    }

    if (status === "In Progress") {
      return "border-blue-400/20 bg-blue-400/10 text-blue-400";
    }

    return "border-amber-400/20 bg-amber-400/10 text-amber-400";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <main className="min-h-screen lg:ml-72">
        <Topbar />

        <div
          className="
            medcore-scrollbar
            px-4
            py-6
            sm:px-6
            lg:px-8
            xl:px-10
          "
        >
          <div className="mx-auto w-full max-w-[1600px]">

            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <section
              className="
                mb-7
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <div>
                <p className="mb-2 text-sm font-semibold text-cyan-400">
                  Doctor Portal
                </p>

                <h1
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-white
                    sm:text-4xl
                  "
                >
                  Lab Results
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                  Review and manage laboratory results for your assigned
                  patients.
                </p>
              </div>

              {/* Summary */}

              <div
                className="
                  flex
                  w-fit
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-4
                  py-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-400
                  "
                >
                  <FlaskConical size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Total Results
                  </p>

                  <p className="text-lg font-bold text-white">
                    {labResults.length}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                FILTER BAR
            ================================================== */}

            <section
              className="
                mb-6
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-4
                shadow-xl
                shadow-black/10
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  lg:flex-row
                "
              >
                {/* Search */}

                <div className="relative flex-1">
                  <Search
                    size={19}
                    strokeWidth={1.8}
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
                    placeholder="Search patient, test, ID..."
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/[0.10]
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

                {/* Status */}

                <div className="relative lg:w-56">
                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value as
                          | "All"
                          | LabStatus
                      )
                    }
                    className="
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-white/[0.10]
                      bg-slate-900/70
                      px-4
                      pr-10
                      text-sm
                      text-slate-200
                      outline-none
                      transition
                      focus:border-cyan-400/50
                      focus:ring-2
                      focus:ring-cyan-400/10
                    "
                  >
                    <option
                      value="All"
                      className="bg-slate-900"
                    >
                      All Status
                    </option>

                    <option
                      value="Completed"
                      className="bg-slate-900"
                    >
                      Completed
                    </option>

                    <option
                      value="In Progress"
                      className="bg-slate-900"
                    >
                      In Progress
                    </option>

                    <option
                      value="Pending"
                      className="bg-slate-900"
                    >
                      Pending
                    </option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-500
                    "
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                RESULTS COUNT
            ================================================== */}

            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-semibold text-white">
                  {filteredResults.length}
                </span>{" "}
                lab results
              </p>
            </div>

            {/* =================================================
                DESKTOP TABLE
            ================================================== */}

            <section
              className="
                hidden
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.02]
                lg:block
              "
            >
              {/* Header */}

              <div
                className="
                  grid
                  grid-cols-[1.6fr_1.4fr_1.1fr_1.1fr_1fr_0.7fr]
                  gap-4
                  border-b
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-5
                  py-4
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                <span>Patient</span>
                <span>Test</span>
                <span>Result</span>
                <span>Ordered Date</span>
                <span>Status</span>
                <span className="text-right">
                  Action
                </span>
              </div>

              {/* Rows */}

              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="
                      grid
                      grid-cols-[1.6fr_1.4fr_1.1fr_1.1fr_1fr_0.7fr]
                      items-center
                      gap-4
                      border-b
                      border-white/[0.06]
                      px-5
                      py-5
                      transition
                      last:border-b-0
                      hover:bg-white/[0.025]
                    "
                  >
                    {/* Patient */}

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
                          bg-cyan-400/10
                          text-sm
                          font-bold
                          text-cyan-400
                        "
                      >
                        {result.initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {result.patientName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {result.patientId}
                        </p>
                      </div>
                    </div>

                    {/* Test */}

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {result.test}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {result.category}
                      </p>
                    </div>

                    {/* Result */}

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {result.result}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {result.referenceRange}
                      </p>
                    </div>

                    {/* Date */}

                    <p className="text-sm text-slate-300">
                      {result.orderedDate}
                    </p>

                    {/* Status */}

                    <div>
                      <span
                        className={`
                          inline-flex
                          items-center
                          rounded-full
                          border
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          ${getStatusStyle(result.status)}
                        `}
                      >
                        {result.status === "Completed" && (
                          <CheckCircle2
                            size={13}
                            className="mr-1.5"
                          />
                        )}

                        {result.status}
                      </span>
                    </div>

                    {/* Action */}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedResult(result)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
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
                          hover:bg-cyan-400/5
                          hover:text-cyan-400
                        "
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState />
              )}
            </section>

            {/* =================================================
                MOBILE CARDS
            ================================================== */}

            <section className="space-y-4 lg:hidden">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <article
                    key={result.id}
                    className="
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      p-4
                      shadow-lg
                      shadow-black/10
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
                            bg-cyan-400/10
                            text-sm
                            font-bold
                            text-cyan-400
                          "
                        >
                          {result.initials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white">
                            {result.patientName}
                          </p>

                          <p className="text-xs text-slate-500">
                            {result.patientId}
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
                          ${getStatusStyle(result.status)}
                        `}
                      >
                        {result.status}
                      </span>
                    </div>

                    {/* Test */}

                    <div
                      className="
                        mt-4
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-slate-900/60
                        p-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-cyan-400/10
                            text-cyan-400
                          "
                        >
                          <FlaskConical size={19} />
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {result.test}
                          </p>

                          <p className="text-xs text-slate-500">
                            {result.category}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Result
                          </p>

                          <p className="mt-1 text-sm font-semibold text-white">
                            {result.result}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Ordered
                          </p>

                          <p className="mt-1 text-sm text-slate-300">
                            {result.orderedDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Button */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedResult(result)
                      }
                      className="
                        mt-4
                        flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.10]
                        bg-white/[0.025]
                        text-sm
                        font-medium
                        text-slate-300
                        transition
                        hover:border-cyan-400/30
                        hover:bg-cyan-400/5
                        hover:text-cyan-400
                      "
                    >
                      <Eye size={17} />
                      View Lab Result
                    </button>
                  </article>
                ))
              ) : (
                <EmptyState />
              )}
            </section>
          </div>
        </div>
      </main>

      {/* =======================================================
          LAB RESULT MODAL
      ======================================================= */}

      {selectedResult && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/70
            p-3
            backdrop-blur-sm
            sm:p-6
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedResult(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Lab Result"
            className="
              medcore-scrollbar
              max-h-[92vh]
              w-full
              max-w-3xl
              overflow-y-auto
              rounded-3xl
              border
              border-white/[0.10]
              bg-slate-950
              shadow-2xl
              shadow-black/60
            "
          >
            {/* =================================================
                MODAL HEADER
            ================================================== */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                items-center
                justify-between
                border-b
                border-white/[0.08]
                bg-slate-950/95
                px-5
                py-5
                backdrop-blur-xl
                sm:px-7
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-cyan-400/10
                    text-cyan-400
                  "
                >
                  <FileText size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white sm:text-xl">
                    Lab Result
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {selectedResult.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                aria-label="Close lab result"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-500
                  transition
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                <X size={21} />
              </button>
            </div>

            {/* =================================================
                MODAL CONTENT
            ================================================== */}

            <div className="space-y-6 p-5 sm:p-7">

              {/* Patient */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  p-5
                "
              >
                <p
                  className="
                    mb-4
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Patient
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-cyan-400/10
                      font-bold
                      text-cyan-400
                    "
                  >
                    {selectedResult.initials}
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      {selectedResult.patientName}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedResult.patientId}
                    </p>
                  </div>
                </div>
              </section>

              {/* Test */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  p-5
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Test
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {selectedResult.test}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {selectedResult.category}
                    </p>
                  </div>

                  <span
                    className={`
                      inline-flex
                      shrink-0
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      ${getStatusStyle(selectedResult.status)}
                    `}
                  >
                    {selectedResult.status === "Completed" && (
                      <CheckCircle2 size={14} />
                    )}

                    {selectedResult.status}
                  </span>
                </div>

                {/* Result Box */}

                <div
                  className="
                    mt-6
                    rounded-2xl
                    border
                    border-cyan-400/15
                    bg-cyan-400/[0.035]
                    p-5
                  "
                >
                  <p
                    className="
                      text-xs
                      font-medium
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    Result
                  </p>

                  <p className="mt-3 text-4xl font-bold text-white">
                    {selectedResult.result}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Reference range:{" "}
                    <span className="text-slate-400">
                      {selectedResult.referenceRange}
                    </span>
                  </p>
                </div>

                {/* Details */}

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InfoItem
                    label="Ordered Date"
                    value={selectedResult.orderedDate}
                  />

                  <InfoItem
                    label="Completed Date"
                    value={selectedResult.completedDate}
                  />

                  <InfoItem
                    label="Priority"
                    value={selectedResult.priority}
                  />

                  <InfoItem
                    label="Technician"
                    value={selectedResult.technician}
                  />
                </div>
              </section>

              {/* Clinical Notes */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  p-5
                "
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-cyan-400/10
                      text-cyan-400
                    "
                  >
                    <ClipboardList size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Clinical Notes
                    </h3>

                    <p className="text-xs text-slate-500">
                      Laboratory observation
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-7 text-slate-400">
                  {selectedResult.clinicalNotes}
                </p>
              </section>

              {/* Footer */}

              <div
                className="
                  flex
                  flex-col-reverse
                  gap-3
                  border-t
                  border-white/[0.08]
                  pt-5
                  sm:flex-row
                  sm:justify-end
                "
              >
                <button
                  type="button"
                  onClick={() => setSelectedResult(null)}
                  className="
                    h-11
                    rounded-xl
                    border
                    border-white/[0.10]
                    bg-white/[0.025]
                    px-5
                    text-sm
                    font-medium
                    text-slate-300
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wider
          text-slate-500
        "
      >
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <div className="px-6 py-16 text-center">
      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-cyan-400/10
          text-cyan-400
        "
      >
        <FlaskConical size={25} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-white">
        No lab results found
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
        Try changing your search or status filter.
      </p>
    </div>
  );
}