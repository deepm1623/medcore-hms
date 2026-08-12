"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ClipboardList,
  Eye,
  FileText,
  Pill,
  Plus,
  Search,
  Trash2,
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

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  instructions: string;
}

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  date: string;
  medicines: Medicine[];
  notes: string;
  status: "Active" | "Completed";
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
   MOCK PRESCRIPTION HISTORY
========================================================= */

const initialPrescriptions: Prescription[] = [
  {
    id: "RX-1001",
    patientId: "P-1001",
    patientName: "Aarav Patel",
    patientInitials: "AP",
    date: "12 Aug 2026",
    status: "Active",
    notes: "Continue medication and review after follow-up.",
    medicines: [
      {
        id: 1,
        name: "Metformin",
        dosage: "500 mg",
        frequency: "Twice daily",
        duration: "30 days",
        route: "Oral",
        instructions: "Take after meals.",
      },
      {
        id: 2,
        name: "Glimepiride",
        dosage: "1 mg",
        frequency: "Once daily",
        duration: "30 days",
        route: "Oral",
        instructions: "Take before breakfast.",
      },
    ],
  },
  {
    id: "RX-1002",
    patientId: "P-1002",
    patientName: "Ananya Shah",
    patientInitials: "AS",
    date: "11 Aug 2026",
    status: "Active",
    notes: "Review symptoms during next consultation.",
    medicines: [
      {
        id: 1,
        name: "Montelukast",
        dosage: "10 mg",
        frequency: "Once daily",
        duration: "14 days",
        route: "Oral",
        instructions: "Take at night.",
      },
    ],
  },
  {
    id: "RX-1003",
    patientId: "P-1003",
    patientName: "Raj Mehta",
    patientInitials: "RM",
    date: "10 Aug 2026",
    status: "Completed",
    notes: "Course completed.",
    medicines: [
      {
        id: 1,
        name: "Amlodipine",
        dosage: "5 mg",
        frequency: "Once daily",
        duration: "30 days",
        route: "Oral",
        instructions: "Take at the same time each day.",
      },
    ],
  },
];

/* =========================================================
   EMPTY MEDICINE
========================================================= */

const emptyMedicine = (): Medicine => ({
  id: Date.now(),
  name: "",
  dosage: "",
  frequency: "Once daily",
  duration: "7 days",
  route: "Oral",
  instructions: "",
});

/* =========================================================
   PAGE
========================================================= */

export default function PrescriptionsPage() {
  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [patientSearch, setPatientSearch] = useState("");
  const [patientDropdownOpen, setPatientDropdownOpen] =
    useState(false);

  const [medicines, setMedicines] = useState<Medicine[]>([
    emptyMedicine(),
  ]);

  const [notes, setNotes] = useState("");

  const [prescriptions, setPrescriptions] = useState<
    Prescription[]
  >(initialPrescriptions);

  const [searchHistory, setSearchHistory] = useState("");

  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  /* =======================================================
     PATIENT FILTER
  ======================================================= */

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

  /* =======================================================
     PRESCRIPTION HISTORY FILTER
  ======================================================= */

  const filteredHistory = useMemo(() => {
    const query = searchHistory.trim().toLowerCase();

    if (!query) {
      return prescriptions;
    }

    return prescriptions.filter(
      (prescription) =>
        prescription.patientName
          .toLowerCase()
          .includes(query) ||
        prescription.patientId
          .toLowerCase()
          .includes(query) ||
        prescription.id.toLowerCase().includes(query)
    );
  }, [prescriptions, searchHistory]);

  /* =======================================================
     SELECT PATIENT
  ======================================================= */

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
    setPatientDropdownOpen(false);
  };

  /* =======================================================
     ADD MEDICINE
  ======================================================= */

  const addMedicine = () => {
    setMedicines((current) => [
      ...current,
      emptyMedicine(),
    ]);
  };

  /* =======================================================
     REMOVE MEDICINE
  ======================================================= */

  const removeMedicine = (id: number) => {
    if (medicines.length === 1) {
      return;
    }

    setMedicines((current) =>
      current.filter((medicine) => medicine.id !== id)
    );
  };

  /* =======================================================
     UPDATE MEDICINE
  ======================================================= */

  const updateMedicine = (
    id: number,
    field: keyof Medicine,
    value: string
  ) => {
    setMedicines((current) =>
      current.map((medicine) =>
        medicine.id === id
          ? {
              ...medicine,
              [field]: value,
            }
          : medicine
      )
    );
  };

  /* =======================================================
     SAVE PRESCRIPTION
  ======================================================= */

  const handleSavePrescription = () => {
    if (!selectedPatient) {
      return;
    }

    const validMedicines = medicines.filter(
      (medicine) => medicine.name.trim() !== ""
    );

    if (validMedicines.length === 0) {
      return;
    }

    const newPrescription: Prescription = {
      id: `RX-${1000 + prescriptions.length + 1}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientInitials: selectedPatient.initials,
      date: "12 Aug 2026",
      status: "Active",
      notes:
        notes.trim() ||
        "Prescription created during patient consultation.",
      medicines: validMedicines,
    };

    setPrescriptions((current) => [
      newPrescription,
      ...current,
    ]);

    setMedicines([emptyMedicine()]);
    setNotes("");

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
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
                  Prescriptions
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                  Create, review and manage patient prescriptions.
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
                  <Pill size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Prescriptions
                  </p>

                  <p className="text-lg font-bold text-white">
                    {prescriptions.length}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                CREATE PRESCRIPTION
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
              {/* Section heading */}

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
                  <FileText size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Create Prescription
                  </h2>

                  <p className="text-sm text-slate-500">
                    Select a patient and add prescribed medicines.
                  </p>
                </div>
              </div>

              {/* =================================================
                  SELECT PATIENT
              ================================================== */}

              <div className="relative mb-6">
                <label
                  htmlFor="patient"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-300
                  "
                >
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
                    id="patient"
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
                      transition
                      focus:border-cyan-400/50
                      focus:ring-2
                      focus:ring-cyan-400/10
                    "
                  />
                </div>

                {/* Patient dropdown */}

                {patientDropdownOpen && (
                  <>
                    {/* Outside click layer */}

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

                            <div className="min-w-0">
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
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
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

                    <div className="hidden text-right sm:block">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Blood Group
                      </p>

                      <p className="mt-1 font-semibold text-cyan-400">
                        {selectedPatient.bloodGroup}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  MEDICINES
              ================================================== */}

              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">
                      Medicines
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Add medicines and dosage instructions.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addMedicine}
                    className="
                      inline-flex
                      h-10
                      items-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      px-4
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-blue-500/20
                      transition
                      hover:from-cyan-400
                      hover:to-blue-500
                    "
                  >
                    <Plus size={17} />
                    <span className="hidden sm:inline">
                      Add Medicine
                    </span>
                    <span className="sm:hidden">
                      Add
                    </span>
                  </button>
                </div>

                <div className="space-y-4">
                  {medicines.map((medicine, index) => (
                    <div
                      key={medicine.id}
                      className="
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-slate-900/50
                        p-4
                        sm:p-5
                      "
                    >
                      {/* Medicine header */}

                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              bg-cyan-400/10
                              text-cyan-400
                            "
                          >
                            <Pill size={17} />
                          </div>

                          <p className="text-sm font-semibold text-white">
                            Medicine {index + 1}
                          </p>
                        </div>

                        {medicines.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeMedicine(medicine.id)
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              text-slate-500
                              transition
                              hover:bg-red-500/10
                              hover:text-red-400
                            "
                            aria-label="Remove medicine"
                          >
                            <Trash2 size={17} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* Name */}

                        <Field
                          label="Medicine Name"
                          placeholder="e.g. Metformin"
                          value={medicine.name}
                          onChange={(value) =>
                            updateMedicine(
                              medicine.id,
                              "name",
                              value
                            )
                          }
                        />

                        {/* Dosage */}

                        <Field
                          label="Dosage"
                          placeholder="e.g. 500 mg"
                          value={medicine.dosage}
                          onChange={(value) =>
                            updateMedicine(
                              medicine.id,
                              "dosage",
                              value
                            )
                          }
                        />

                        {/* Frequency */}

                        <SelectField
                          label="Frequency"
                          value={medicine.frequency}
                          onChange={(value) =>
                            updateMedicine(
                              medicine.id,
                              "frequency",
                              value
                            )
                          }
                          options={[
                            "Once daily",
                            "Twice daily",
                            "Three times daily",
                            "Four times daily",
                            "As needed",
                            "At bedtime",
                          ]}
                        />

                        {/* Duration */}

                        <SelectField
                          label="Duration"
                          value={medicine.duration}
                          onChange={(value) =>
                            updateMedicine(
                              medicine.id,
                              "duration",
                              value
                            )
                          }
                          options={[
                            "3 days",
                            "5 days",
                            "7 days",
                            "14 days",
                            "30 days",
                            "60 days",
                            "90 days",
                          ]}
                        />

                        {/* Route */}

                        <SelectField
                          label="Route"
                          value={medicine.route}
                          onChange={(value) =>
                            updateMedicine(
                              medicine.id,
                              "route",
                              value
                            )
                          }
                          options={[
                            "Oral",
                            "Topical",
                            "Inhalation",
                            "Injection",
                            "Sublingual",
                          ]}
                        />

                        {/* Instructions */}

                        <div className="md:col-span-2 lg:col-span-1">
                          <Field
                            label="Instructions"
                            placeholder="e.g. Take after meals"
                            value={medicine.instructions}
                            onChange={(value) =>
                              updateMedicine(
                                medicine.id,
                                "instructions",
                                value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* =================================================
                  NOTES
              ================================================== */}

              <div className="mb-6">
                <label
                  htmlFor="notes"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-300
                  "
                >
                  Prescription Notes
                </label>

                <textarea
                  id="notes"
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  rows={4}
                  placeholder="Add clinical instructions or notes..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/[0.10]
                    bg-slate-900/70
                    px-4
                    py-3
                    text-sm
                    leading-6
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

              {/* =================================================
                  SAVE
              ================================================== */}

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
                  onClick={() => {
                    setSelectedPatient(null);
                    setPatientSearch("");
                    setMedicines([emptyMedicine()]);
                    setNotes("");
                  }}
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
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleSavePrescription}
                  disabled={
                    !selectedPatient ||
                    !medicines.some(
                      (medicine) =>
                        medicine.name.trim() !== ""
                    )
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
                  Save Prescription
                </button>
              </div>
            </section>

            {/* =================================================
                SUCCESS
            ================================================== */}

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
                  shadow-black/40
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
                    Prescription saved
                  </p>

                  <p className="text-xs text-slate-500">
                    Frontend demo data updated.
                  </p>
                </div>
              </div>
            )}

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
                    Prescription History
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Previous Prescriptions
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Review prescriptions created for your patients.
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
                    value={searchHistory}
                    onChange={(event) =>
                      setSearchHistory(event.target.value)
                    }
                    placeholder="Search prescriptions..."
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

              {/* Desktop history */}

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
                    grid-cols-[1.4fr_1fr_1.4fr_1fr_0.7fr]
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
                  <span>Prescription ID</span>
                  <span>Medicines</span>
                  <span>Date</span>
                  <span className="text-right">
                    Action
                  </span>
                </div>

                {filteredHistory.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="
                      grid
                      grid-cols-[1.4fr_1fr_1.4fr_1fr_0.7fr]
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
                        {prescription.patientInitials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {prescription.patientName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {prescription.patientId}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300">
                      {prescription.id}
                    </p>

                    <div>
                      <p className="text-sm text-white">
                        {prescription.medicines
                          .map((medicine) => medicine.name)
                          .filter(Boolean)
                          .join(", ") || "No medicine"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {prescription.medicines.length} medicine
                        {prescription.medicines.length !== 1
                          ? "s"
                          : ""}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300">
                      {prescription.date}
                    </p>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPrescription(
                            prescription
                          )
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

              {/* Mobile history */}

              <div className="space-y-4 lg:hidden">
                {filteredHistory.map((prescription) => (
                  <article
                    key={prescription.id}
                    className="
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      p-4
                    "
                  >
                    <div className="flex items-center justify-between gap-3">
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
                          {prescription.patientInitials}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {prescription.patientName}
                          </p>

                          <p className="text-xs text-slate-500">
                            {prescription.id}
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          rounded-full
                          border
                          border-emerald-400/20
                          bg-emerald-400/10
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          text-emerald-400
                        "
                      >
                        {prescription.status}
                      </span>
                    </div>

                    <div className="mt-4 rounded-xl bg-slate-900/60 p-4">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Medicines
                      </p>

                      <p className="mt-2 text-sm text-white">
                        {prescription.medicines
                          .map((medicine) => medicine.name)
                          .filter(Boolean)
                          .join(", ") || "No medicine"}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        {prescription.date}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPrescription(
                          prescription
                        )
                      }
                      className="
                        mt-3
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
                      View Prescription
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* =====================================================
          PRESCRIPTION VIEW MODAL
      ====================================================== */}

      {selectedPrescription && (
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
              setSelectedPrescription(null);
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
            {/* Header */}

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
                  <Pill size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">
                    Prescription
                  </h2>

                  <p className="text-xs text-slate-500">
                    {selectedPrescription.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedPrescription(null)
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
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-cyan-400/10
                      font-bold
                      text-cyan-400
                    "
                  >
                    {selectedPrescription.patientInitials}
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      {selectedPrescription.patientName}
                    </p>

                    <p className="text-xs text-slate-500">
                      {selectedPrescription.patientId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medicines */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  p-5
                "
              >
                <div className="mb-4 flex items-center gap-3">
                  <ClipboardList
                    size={19}
                    className="text-cyan-400"
                  />

                  <h3 className="font-semibold text-white">
                    Medicines
                  </h3>
                </div>

                <div className="space-y-3">
                  {selectedPrescription.medicines.map(
                    (medicine, index) => (
                      <div
                        key={medicine.id}
                        className="
                          rounded-xl
                          border
                          border-white/[0.07]
                          bg-slate-900/60
                          p-4
                        "
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">
                              {index + 1}.{" "}
                              {medicine.name || "Medicine"}
                            </p>

                            <p className="mt-1 text-sm text-cyan-400">
                              {medicine.dosage ||
                                "Dosage not specified"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                          <div>
                            <p className="text-[11px] uppercase text-slate-500">
                              Frequency
                            </p>

                            <p className="mt-1 text-slate-300">
                              {medicine.frequency}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] uppercase text-slate-500">
                              Duration
                            </p>

                            <p className="mt-1 text-slate-300">
                              {medicine.duration}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] uppercase text-slate-500">
                              Route
                            </p>

                            <p className="mt-1 text-slate-300">
                              {medicine.route}
                            </p>
                          </div>
                        </div>

                        {medicine.instructions && (
                          <div className="mt-4 border-t border-white/[0.06] pt-3">
                            <p className="text-[11px] uppercase text-slate-500">
                              Instructions
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                              {medicine.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  )}
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
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Notes
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {selectedPrescription.notes}
                </p>
              </div>

              {/* Footer */}

              <div
                className="
                  flex
                  justify-end
                  border-t
                  border-white/[0.08]
                  pt-5
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPrescription(null)
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
   TEXT FIELD
========================================================= */

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
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
          focus:ring-2
          focus:ring-cyan-400/10
        "
      />
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
            focus:ring-2
            focus:ring-cyan-400/10
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