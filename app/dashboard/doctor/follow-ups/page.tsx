"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Eye,
  FileText,
  Plus,
  Search,
  UserRound,
  X,
} from "lucide-react";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

/* =========================================================
   TYPES
========================================================= */

interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  date: string;
  time: string;
  reason: string;
  priority: "Low" | "Normal" | "High";
  status: "Scheduled" | "Completed" | "Pending";
  notes: string;
}

/* =========================================================
   MOCK PATIENTS
========================================================= */

const patients: Patient[] = [
  {
    id: "P-1001",
    name: "Aarav Patel",
    initials: "AP",
    age: 42,
    gender: "Male",
    bloodGroup: "B+",
  },
  {
    id: "P-1002",
    name: "Ananya Shah",
    initials: "AS",
    age: 31,
    gender: "Female",
    bloodGroup: "O+",
  },
  {
    id: "P-1003",
    name: "Raj Mehta",
    initials: "RM",
    age: 57,
    gender: "Male",
    bloodGroup: "A+",
  },
  {
    id: "P-1004",
    name: "Diya Joshi",
    initials: "DJ",
    age: 26,
    gender: "Female",
    bloodGroup: "AB+",
  },
  {
    id: "P-1005",
    name: "Vikram Singh",
    initials: "VS",
    age: 64,
    gender: "Male",
    bloodGroup: "O-",
  },
  {
    id: "P-1006",
    name: "Neha Desai",
    initials: "ND",
    age: 38,
    gender: "Female",
    bloodGroup: "A+",
  },
  {
    id: "P-1007",
    name: "Karan Shah",
    initials: "KS",
    age: 46,
    gender: "Male",
    bloodGroup: "B+",
  },
  {
    id: "P-1008",
    name: "Meera Patel",
    initials: "MP",
    age: 29,
    gender: "Female",
    bloodGroup: "O+",
  },
];

/* =========================================================
   MOCK FOLLOW-UPS
========================================================= */

const initialFollowUps: FollowUp[] = [
  {
    id: "FU-1001",
    patientId: "P-1001",
    patientName: "Aarav Patel",
    patientInitials: "AP",
    date: "19 Aug 2026",
    time: "10:00 AM",
    reason: "Diabetes follow-up",
    priority: "High",
    status: "Scheduled",
    notes:
      "Review blood glucose levels and HbA1c results.",
  },
  {
    id: "FU-1002",
    patientId: "P-1002",
    patientName: "Ananya Shah",
    patientInitials: "AS",
    date: "21 Aug 2026",
    time: "11:30 AM",
    reason: "Medication review",
    priority: "Normal",
    status: "Scheduled",
    notes:
      "Evaluate response to current medication.",
  },
  {
    id: "FU-1003",
    patientId: "P-1003",
    patientName: "Raj Mehta",
    patientInitials: "RM",
    date: "16 Aug 2026",
    time: "09:30 AM",
    reason: "Blood pressure review",
    priority: "High",
    status: "Pending",
    notes:
      "Review home blood pressure readings.",
  },
  {
    id: "FU-1004",
    patientId: "P-1005",
    patientName: "Vikram Singh",
    patientInitials: "VS",
    date: "08 Aug 2026",
    time: "04:00 PM",
    reason: "Post-treatment review",
    priority: "Normal",
    status: "Completed",
    notes:
      "Patient completed the prescribed treatment course.",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function FollowUpsPage() {
  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [patientSearch, setPatientSearch] = useState("");
  const [patientDropdownOpen, setPatientDropdownOpen] =
    useState(false);

  const [followUps, setFollowUps] =
    useState<FollowUp[]>(initialFollowUps);

  const [historySearch, setHistorySearch] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [reason, setReason] = useState("");
  const [priority, setPriority] =
    useState<FollowUp["priority"]>("Normal");
  const [notes, setNotes] = useState("");

  const [selectedFollowUp, setSelectedFollowUp] =
    useState<FollowUp | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  /* =========================================================
     FILTER PATIENTS
  ========================================================= */

  const filteredPatients = useMemo(() => {
    const query = patientSearch.trim().toLowerCase();

    if (!query) {
      return patients;
    }

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query)
    );
  }, [patientSearch]);

  /* =========================================================
     FILTER HISTORY
  ========================================================= */

  const filteredFollowUps = useMemo(() => {
    const query = historySearch.trim().toLowerCase();

    if (!query) {
      return followUps;
    }

    return followUps.filter(
      (followUp) =>
        followUp.patientName
          .toLowerCase()
          .includes(query) ||
        followUp.patientId
          .toLowerCase()
          .includes(query) ||
        followUp.reason.toLowerCase().includes(query) ||
        followUp.id.toLowerCase().includes(query)
    );
  }, [followUps, historySearch]);

  /* =========================================================
     SELECT PATIENT
  ========================================================= */

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
    setPatientDropdownOpen(false);
  };

  /* =========================================================
     CLEAR FORM
  ========================================================= */

  const clearForm = () => {
    setSelectedPatient(null);
    setPatientSearch("");
    setDate("");
    setTime("10:00");
    setReason("");
    setPriority("Normal");
    setNotes("");
  };

  /* =========================================================
     CREATE FOLLOW-UP
  ========================================================= */

  const handleCreateFollowUp = () => {
    if (!selectedPatient || !date || !reason.trim()) {
      return;
    }

    const formattedDate = new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = new Date(
      `1970-01-01T${time}`
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const newFollowUp: FollowUp = {
      id: `FU-${1001 + followUps.length}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientInitials: selectedPatient.initials,
      date: formattedDate,
      time: formattedTime,
      reason: reason.trim(),
      priority,
      status: "Scheduled",
      notes:
        notes.trim() ||
        "Follow-up appointment scheduled.",
    };

    setFollowUps((current) => [
      newFollowUp,
      ...current,
    ]);

    clearForm();

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  };

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const updateStatus = (
    id: string,
    status: FollowUp["status"]
  ) => {
    setFollowUps((current) =>
      current.map((followUp) =>
        followUp.id === id
          ? {
              ...followUp,
              status,
            }
          : followUp
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="min-h-screen lg:ml-72">
        <Topbar />

        <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-[1600px]">

            {/* =================================================
                HEADER
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
                  Follow-ups
                </h1>

                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                  Schedule and manage patient follow-up visits.
                </p>
              </div>

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
                  <ClipboardCheck size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Total Follow-ups
                  </p>

                  <p className="text-lg font-bold text-white">
                    {followUps.length}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                CREATE FOLLOW-UP
            ================================================== */}

            <section
              className="
                rounded-3xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-4
                shadow-xl
                shadow-black/10
                sm:p-6
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-400
                  "
                >
                  <Plus size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Schedule Follow-up
                  </h2>

                  <p className="text-sm text-slate-500">
                    Create a follow-up visit for a patient.
                  </p>
                </div>
              </div>

              {/* =================================================
                  PATIENT
              ================================================== */}

              <div className="relative mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Select Patient
                </label>

                <div className="relative">
                  <UserRound
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
                    value={patientSearch}
                    onChange={(event) => {
                      setPatientSearch(event.target.value);
                      setPatientDropdownOpen(true);
                      setSelectedPatient(null);
                    }}
                    onFocus={() =>
                      setPatientDropdownOpen(true)
                    }
                    placeholder="Search patient by name or patient ID..."
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
                      focus:border-cyan-400/50
                      focus:ring-2
                      focus:ring-cyan-400/10
                    "
                  />
                </div>

                {patientDropdownOpen && (
                  <>
                    {/* Outside click */}

                    <button
                      type="button"
                      aria-label="Close patient selector"
                      className="fixed inset-0 z-30 cursor-default"
                      onClick={() =>
                        setPatientDropdownOpen(false)
                      }
                    />

                    <div
                      className="
                        medcore-scrollbar
                        absolute
                        left-0
                        right-0
                        top-full
                        z-40
                        mt-2
                        max-h-72
                        overflow-y-auto
                        rounded-2xl
                        border
                        border-white/[0.10]
                        bg-slate-900
                        shadow-2xl
                        shadow-black/50
                      "
                    >
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <button
                            key={patient.id}
                            type="button"
                            onClick={() =>
                              handleSelectPatient(patient)
                            }
                            className="
                              flex
                              w-full
                              items-center
                              gap-3
                              border-b
                              border-white/[0.06]
                              px-4
                              py-4
                              text-left
                              last:border-b-0
                              hover:bg-white/[0.05]
                            "
                          >
                            <div
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-cyan-400/10
                                text-xs
                                font-bold
                                text-cyan-400
                              "
                            >
                              {patient.initials}
                            </div>

                            <div>
                              <p className="font-semibold text-white">
                                {patient.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {patient.id} • {patient.age} /{" "}
                                {patient.gender}
                              </p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="p-6 text-center text-sm text-slate-500">
                          No patients found.
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* =================================================
                  SELECTED PATIENT
              ================================================== */}

              {selectedPatient && (
                <div
                  className="
                    mb-6
                    rounded-2xl
                    border
                    border-cyan-400/15
                    bg-cyan-400/[0.035]
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-cyan-400
                        to-blue-600
                        font-bold
                        text-white
                      "
                    >
                      {selectedPatient.initials}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {selectedPatient.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {selectedPatient.id} •{" "}
                        {selectedPatient.age} years •{" "}
                        {selectedPatient.gender}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  DATE / TIME / PRIORITY
              ================================================== */}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Date */}

                <div>
                  <label
                    htmlFor="followup-date"
                    className="mb-2 block text-xs font-medium text-slate-400"
                  >
                    Follow-up Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                      "
                    />

                    <input
                      id="followup-date"
                      type="date"
                      value={date}
                      onChange={(event) =>
                        setDate(event.target.value)
                      }
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.10]
                        bg-slate-950/70
                        pl-10
                        pr-3
                        text-sm
                        text-white
                        outline-none
                        focus:border-cyan-400/50
                      "
                    />
                  </div>
                </div>

                {/* Time */}

                <div>
                  <label
                    htmlFor="followup-time"
                    className="mb-2 block text-xs font-medium text-slate-400"
                  >
                    Follow-up Time
                  </label>

                  <div className="relative">
                    <Clock
                      size={17}
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                      "
                    />

                    <input
                      id="followup-time"
                      type="time"
                      value={time}
                      onChange={(event) =>
                        setTime(event.target.value)
                      }
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.10]
                        bg-slate-950/70
                        pl-10
                        pr-3
                        text-sm
                        text-white
                        outline-none
                        focus:border-cyan-400/50
                      "
                    />
                  </div>
                </div>

                {/* Priority */}

                <SelectField
                  label="Priority"
                  value={priority}
                  onChange={(value) =>
                    setPriority(
                      value as FollowUp["priority"]
                    )
                  }
                  options={[
                    "Low",
                    "Normal",
                    "High",
                  ]}
                />
              </div>

              {/* =================================================
                  REASON
              ================================================== */}

              <div className="mt-4">
                <label
                  htmlFor="reason"
                  className="mb-2 block text-xs font-medium text-slate-400"
                >
                  Follow-up Reason
                </label>

                <input
                  id="reason"
                  type="text"
                  value={reason}
                  onChange={(event) =>
                    setReason(event.target.value)
                  }
                  placeholder="e.g. Diabetes follow-up, medication review..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-white/[0.10]
                    bg-slate-950/70
                    px-3
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-slate-600
                    focus:border-cyan-400/50
                  "
                />
              </div>

              {/* =================================================
                  NOTES
              ================================================== */}

              <div className="mt-4">
                <label
                  htmlFor="followup-notes"
                  className="mb-2 block text-xs font-medium text-slate-400"
                >
                  Notes
                </label>

                <textarea
                  id="followup-notes"
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  rows={4}
                  placeholder="Add follow-up instructions or clinical notes..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/[0.10]
                    bg-slate-950/70
                    px-3
                    py-3
                    text-sm
                    leading-6
                    text-white
                    outline-none
                    placeholder:text-slate-600
                    focus:border-cyan-400/50
                  "
                />
              </div>

              {/* =================================================
                  ACTIONS
              ================================================== */}

              <div
                className="
                  mt-6
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
                  onClick={clearForm}
                  className="
                    h-12
                    rounded-xl
                    border
                    border-white/[0.10]
                    bg-white/[0.025]
                    px-6
                    text-sm
                    font-medium
                    text-slate-300
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleCreateFollowUp}
                  disabled={
                    !selectedPatient ||
                    !date ||
                    !reason.trim()
                  }
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
                    px-7
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition
                    hover:from-cyan-400
                    hover:to-blue-500
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <Check size={18} />
                  Schedule Follow-up
                </button>
              </div>
            </section>

            {/* =================================================
                HISTORY
            ================================================== */}

            <section className="mt-8">
              <div
                className="
                  mb-5
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <p className="text-sm font-semibold text-cyan-400">
                    Follow-up History
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Scheduled Follow-ups
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Review and manage patient follow-up visits.
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-500
                    "
                  />

                  <input
                    type="search"
                    value={historySearch}
                    onChange={(event) =>
                      setHistorySearch(event.target.value)
                    }
                    placeholder="Search follow-ups..."
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-white/[0.10]
                      bg-white/[0.025]
                      pl-10
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-500
                      focus:border-cyan-400/50
                    "
                  />
                </div>
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
                  bg-white/[0.02]
                  lg:block
                "
              >
                <div
                  className="
                    grid
                    grid-cols-[1.4fr_1fr_1.4fr_0.9fr_0.8fr_0.8fr]
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
                  <span>Date / Time</span>
                  <span>Reason</span>
                  <span>Priority</span>
                  <span>Status</span>
                  <span className="text-right">
                    Action
                  </span>
                </div>

                {filteredFollowUps.map((followUp) => (
                  <div
                    key={followUp.id}
                    className="
                      grid
                      grid-cols-[1.4fr_1fr_1.4fr_0.9fr_0.8fr_0.8fr]
                      items-center
                      gap-4
                      border-b
                      border-white/[0.06]
                      px-5
                      py-5
                      last:border-b-0
                      hover:bg-white/[0.025]
                    "
                  >
                    {/* Patient */}

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
                          bg-cyan-400/10
                          text-xs
                          font-bold
                          text-cyan-400
                        "
                      >
                        {followUp.patientInitials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {followUp.patientName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {followUp.patientId}
                        </p>
                      </div>
                    </div>

                    {/* Date */}

                    <div>
                      <p className="text-sm text-white">
                        {followUp.date}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {followUp.time}
                      </p>
                    </div>

                    {/* Reason */}

                    <p className="text-sm text-slate-300">
                      {followUp.reason}
                    </p>

                    {/* Priority */}

                    <PriorityBadge
                      priority={followUp.priority}
                    />

                    {/* Status */}

                    <StatusSelect
                      status={followUp.status}
                      onChange={(status) =>
                        updateStatus(
                          followUp.id,
                          status
                        )
                      }
                    />

                    {/* View */}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFollowUp(followUp)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-white/[0.10]
                          px-3
                          py-2
                          text-xs
                          font-medium
                          text-slate-300
                          hover:border-cyan-400/30
                          hover:text-cyan-400
                        "
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* =================================================
                  MOBILE CARDS
              ================================================== */}

              <div className="space-y-4 lg:hidden">
                {filteredFollowUps.map((followUp) => (
                  <article
                    key={followUp.id}
                    className="
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      p-4
                    "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-400/10
                            text-xs
                            font-bold
                            text-cyan-400
                          "
                        >
                          {followUp.patientInitials}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {followUp.patientName}
                          </p>

                          <p className="text-xs text-slate-500">
                            {followUp.patientId}
                          </p>
                        </div>
                      </div>

                      <PriorityBadge
                        priority={followUp.priority}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <InfoBox
                        label="Date"
                        value={followUp.date}
                      />

                      <InfoBox
                        label="Time"
                        value={followUp.time}
                      />

                      <InfoBox
                        label="Reason"
                        value={followUp.reason}
                      />

                      <div
                        className="
                          rounded-xl
                          border
                          border-white/[0.06]
                          bg-slate-900/50
                          p-3
                        "
                      >
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          Status
                        </p>

                        <div className="mt-2">
                          <StatusSelect
                            status={followUp.status}
                            onChange={(status) =>
                              updateStatus(
                                followUp.id,
                                status
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedFollowUp(followUp)
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
                        text-sm
                        text-slate-300
                        hover:border-cyan-400/30
                        hover:text-cyan-400
                      "
                    >
                      <Eye size={17} />
                      View Follow-up
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* =====================================================
          SUCCESS TOAST
      ====================================================== */}

      {showSuccess && (
        <div
          className="
            fixed
            bottom-5
            right-5
            z-[120]
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-emerald-400/20
            bg-slate-900
            px-4
            py-3
            shadow-2xl
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-emerald-400/10
              text-emerald-400
            "
          >
            <Check size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Follow-up scheduled
            </p>

            <p className="text-xs text-slate-500">
              Frontend demo data updated.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW FOLLOW-UP MODAL
      ====================================================== */}

      {selectedFollowUp && (
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
              setSelectedFollowUp(null);
            }
          }}
        >
          <div
            className="
              medcore-scrollbar
              max-h-[92vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-3xl
              border
              border-white/[0.10]
              bg-slate-950
              shadow-2xl
              shadow-black/60
            "
          >
            {/* Modal Header */}

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
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-400
                  "
                >
                  <ClipboardCheck size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">
                    Follow-up Details
                  </h2>

                  <p className="text-xs text-slate-500">
                    {selectedFollowUp.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedFollowUp(null)
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-500
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
              {/* Patient */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  p-5
                "
              >
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Patient
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-cyan-400
                      to-blue-600
                      font-bold
                      text-white
                    "
                  >
                    {selectedFollowUp.patientInitials}
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      {selectedFollowUp.patientName}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {selectedFollowUp.patientId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Appointment details */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >
                <InfoBox
                  label="Follow-up Date"
                  value={selectedFollowUp.date}
                />

                <InfoBox
                  label="Time"
                  value={selectedFollowUp.time}
                />

                <InfoBox
                  label="Reason"
                  value={selectedFollowUp.reason}
                />

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    p-4
                  "
                >
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">
                    Priority
                  </p>

                  <div className="mt-2">
                    <PriorityBadge
                      priority={selectedFollowUp.priority}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  p-5
                "
              >
                <div className="flex items-center gap-2">
                  <FileText
                    size={17}
                    className="text-cyan-400"
                  />

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Notes
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {selectedFollowUp.notes}
                </p>
              </div>

              {/* Status */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  p-5
                "
              >
                <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">
                  Status
                </p>

                <StatusSelect
                  status={selectedFollowUp.status}
                  onChange={(status) => {
                    updateStatus(
                      selectedFollowUp.id,
                      status
                    );

                    setSelectedFollowUp({
                      ...selectedFollowUp,
                      status,
                    });
                  }}
                />
              </div>

              {/* Close */}

              <div className="flex justify-end border-t border-white/[0.08] pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedFollowUp(null)
                  }
                  className="
                    h-11
                    rounded-xl
                    border
                    border-white/[0.10]
                    px-5
                    text-sm
                    font-medium
                    text-slate-300
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
   SELECT FIELD
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="
            h-11
            w-full
            appearance-none
            rounded-xl
            border
            border-white/[0.10]
            bg-slate-950/70
            px-3
            pr-9
            text-sm
            text-white
            outline-none
            focus:border-cyan-400/50
          "
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-slate-900"
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({
  priority,
}: {
  priority: FollowUp["priority"];
}) {
  const classes =
    priority === "High"
      ? "border-red-400/20 bg-red-400/10 text-red-400"
      : priority === "Low"
        ? "border-slate-400/20 bg-slate-400/10 text-slate-400"
        : "border-cyan-400/20 bg-cyan-400/10 text-cyan-400";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${classes}`}
    >
      {priority}
    </span>
  );
}

/* =========================================================
   STATUS SELECT
========================================================= */

function StatusSelect({
  status,
  onChange,
}: {
  status: FollowUp["status"];
  onChange: (status: FollowUp["status"]) => void;
}) {
  return (
    <div className="relative">
      <select
        value={status}
        onChange={(event) =>
          onChange(
            event.target.value as FollowUp["status"]
          )
        }
        className="
          h-9
          appearance-none
          rounded-lg
          border
          border-white/[0.08]
          bg-slate-900
          px-3
          pr-8
          text-xs
          font-medium
          text-slate-300
          outline-none
          focus:border-cyan-400/40
        "
      >
        <option value="Scheduled">Scheduled</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <ChevronDown
        size={14}
        className="
          pointer-events-none
          absolute
          right-2
          top-1/2
          -translate-y-1/2
          text-slate-500
        "
      />
    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.02]
        p-4
      "
    >
      <p className="text-[11px] uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
}