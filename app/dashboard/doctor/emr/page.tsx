"use client";

import {
  Activity,
  AlertCircle,
  ClipboardList,
  FileText,
  HeartPulse,
  Paperclip,
  Save,
  Search,
  Stethoscope,
  Syringe,
  UserRound,
  Weight,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ReactNode } from "react";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { mockPatients } from "@/mock/patients";

/* =========================================================
   TYPES
========================================================= */

interface EMRRecord {
  patientId: string;

  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenSaturation: string;
  weight: string;

  chiefComplaint: string;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;

  allergies: string;
  medicationHistory: string;
  vaccinationHistory: string;
  familyHistory: string;
}

/* =========================================================
   MOCK EMR DATA
========================================================= */

const mockEMRRecords: EMRRecord[] = [
  {
    patientId: "P-1001",

    bloodPressure: "128/82",
    heartRate: "76",
    temperature: "98.4 °F",
    oxygenSaturation: "98%",
    weight: "72 kg",

    chiefComplaint: "Routine diabetes follow-up",
    symptoms: "Occasional fatigue and increased thirst.",
    diagnosis: "Type 2 Diabetes Mellitus",
    treatmentPlan:
      "Continue current medication. Maintain diabetic diet and regular exercise.",

    allergies: "Penicillin",
    medicationHistory: "Metformin 500mg — twice daily",
    vaccinationHistory: "Influenza — 2025",
    familyHistory: "Father — Type 2 Diabetes",
  },

  {
    patientId: "P-1002",

    bloodPressure: "118/76",
    heartRate: "72",
    temperature: "98.1 °F",
    oxygenSaturation: "99%",
    weight: "61 kg",

    chiefComplaint: "Asthma follow-up",
    symptoms: "Mild shortness of breath during exercise.",
    diagnosis: "Bronchial Asthma",
    treatmentPlan:
      "Continue inhaler as prescribed and avoid known triggers.",

    allergies: "Dust",
    medicationHistory: "Salbutamol inhaler — as needed",
    vaccinationHistory: "Influenza — 2025",
    familyHistory: "No significant family history",
  },

  {
    patientId: "P-1003",

    bloodPressure: "142/88",
    heartRate: "81",
    temperature: "98.6 °F",
    oxygenSaturation: "97%",
    weight: "79 kg",

    chiefComplaint: "High blood pressure",
    symptoms: "Occasional headache and dizziness.",
    diagnosis: "Hypertension",
    treatmentPlan:
      "Monitor blood pressure regularly and continue prescribed medication.",

    allergies: "None known",
    medicationHistory: "Amlodipine 5mg — once daily",
    vaccinationHistory: "COVID-19 — completed",
    familyHistory: "Mother — Hypertension",
  },

  {
    patientId: "P-1004",

    bloodPressure: "116/74",
    heartRate: "70",
    temperature: "98.2 °F",
    oxygenSaturation: "99%",
    weight: "57 kg",

    chiefComplaint: "Recurring headache",
    symptoms: "Headache with sensitivity to light.",
    diagnosis: "Migraine",
    treatmentPlan:
      "Maintain hydration, adequate sleep and prescribed medication.",

    allergies: "None known",
    medicationHistory: "Sumatriptan — as needed",
    vaccinationHistory: "Influenza — 2025",
    familyHistory: "Mother — Migraine",
  },
];

/* =========================================================
   HELPER
========================================================= */

function getEMRRecord(patientId: string) {
  return mockEMRRecords.find(
    (record) => record.patientId === patientId
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function EMRPage() {
  const patientSelectorRef =
    useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");

  const [selectedPatientId, setSelectedPatientId] =
    useState("P-1001");

  const [activeSection, setActiveSection] =
    useState("Clinical Notes");

  const [showPatientList, setShowPatientList] =
    useState(false);

  const [saved, setSaved] = useState(false);

  /* =======================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ======================================================= */

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;

      if (
        patientSelectorRef.current &&
        !patientSelectorRef.current.contains(target)
      ) {
        setShowPatientList(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     SEARCH PATIENTS
  ======================================================= */

  const filteredPatients = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return mockPatients;
    }

    return mockPatients.filter(
      (patient) =>
        patient.name
          .toLowerCase()
          .includes(value) ||
        patient.id
          .toLowerCase()
          .includes(value)
    );
  }, [search]);

  /* =======================================================
     SELECTED PATIENT
  ======================================================= */

  const selectedPatient = mockPatients.find(
    (patient) =>
      patient.id === selectedPatientId
  );

  const selectedEMR =
    getEMRRecord(selectedPatientId);

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  /* =======================================================
     SELECT PATIENT
  ======================================================= */

  const handleSelectPatient = (
    patientId: string,
    patientName: string
  ) => {
    setSelectedPatientId(patientId);
    setSearch(patientName);
    setShowPatientList(false);
    setActiveSection("Clinical Notes");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* =================================================
          SIDEBAR
      ================================================== */}

      <Sidebar />

      {/* =================================================
          MAIN
      ================================================== */}

      <main className="min-w-0 lg:ml-72">

        {/* =================================================
            TOPBAR
        ================================================== */}

        <Topbar />

        {/* =================================================
            CONTENT
        ================================================== */}

        <section className="px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">

            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                mb-7
                flex
                flex-col
                gap-5
                xl:flex-row
                xl:items-end
                xl:justify-between
              "
            >
              <div>

                <p className="mb-2 text-sm font-medium text-cyan-400">
                  Doctor Portal
                </p>

                <h1
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  Electronic Medical Records
                </h1>

                <p
                  className="
                    mt-2
                    max-w-2xl
                    text-sm
                    leading-6
                    text-slate-400
                    sm:text-base
                  "
                >
                  Review and manage patient clinical
                  information, medical history and
                  treatment records.
                </p>

              </div>

              {/* SAVE */}

              <button
                type="button"
                onClick={handleSave}
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
                <Save size={18} />

                {saved
                  ? "Changes Saved"
                  : "Save Record"}
              </button>

            </div>

            {/* =================================================
                PATIENT SELECTOR
            ================================================== */}

            <div
              ref={patientSelectorRef}
              className="
                relative
                z-50
                mb-6
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-4
                sm:p-5
              "
            >

              {/* LABEL */}

              <div className="mb-3 flex items-center gap-2">

                <UserRound
                  size={18}
                  className="text-cyan-400"
                />

                <p className="text-sm font-semibold text-white">
                  Select Patient
                </p>

              </div>

              {/* SEARCH */}

              <div className="relative">

                <Search
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
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowPatientList(true);
                  }}
                  onFocus={() => {
                    setShowPatientList(true);
                  }}
                  placeholder="Search patient by name or patient ID..."
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
                    focus:border-cyan-400/50
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                />

                {/* =================================================
                    DROPDOWN
                ================================================== */}

                {showPatientList && (
                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-14
                      z-[100]
                      max-h-72
                      overflow-y-auto
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-slate-900
                      shadow-2xl
                      shadow-black/50

                      scrollbar-thin
                      scrollbar-track-slate-900
                      scrollbar-thumb-cyan-500/50
                    "
                  >

                    {filteredPatients.length > 0 ? (

                      filteredPatients.map(
                        (patient) => (

                          <button
                            key={patient.id}
                            type="button"
                            onClick={() =>
                              handleSelectPatient(
                                patient.id,
                                patient.name
                              )
                            }
                            className="
                              flex
                              w-full
                              items-center
                              gap-3
                              border-b
                              border-white/[0.05]
                              px-4
                              py-3
                              text-left
                              transition
                              last:border-0
                              hover:bg-white/[0.05]
                            "
                          >

                            {/* AVATAR */}

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
                              {patient.name
                                .split(" ")
                                .map(
                                  (name) =>
                                    name[0]
                                )
                                .join("")
                                .slice(0, 2)}
                            </div>

                            {/* INFORMATION */}

                            <div className="min-w-0">

                              <p
                                className="
                                  truncate
                                  text-sm
                                  font-semibold
                                  text-white
                                "
                              >
                                {patient.name}
                              </p>

                              <p
                                className="
                                  mt-1
                                  text-xs
                                  text-slate-500
                                "
                              >
                                {patient.id}
                                {" • "}
                                {patient.age}
                                {" / "}
                                {patient.gender}
                              </p>

                            </div>

                          </button>

                        )
                      )

                    ) : (

                      <div
                        className="
                          px-4
                          py-8
                          text-center
                          text-sm
                          text-slate-500
                        "
                      >
                        No patients found.
                      </div>

                    )}

                  </div>
                )}

              </div>

            </div>

            {/* =================================================
                PATIENT SUMMARY
            ================================================== */}

            {selectedPatient && (

              <div
                className="
                  mb-6
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-cyan-400/[0.025]
                  p-5
                  sm:p-6
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  {/* PATIENT */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-400
                        to-blue-600
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                        shadow-cyan-500/10
                      "
                    >
                      {selectedPatient.name
                        .split(" ")
                        .map(
                          (name) =>
                            name[0]
                        )
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0">

                      <h2
                        className="
                          truncate
                          text-xl
                          font-semibold
                          text-white
                        "
                      >
                        {selectedPatient.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {selectedPatient.id}
                      </p>

                    </div>

                  </div>

                  {/* BASIC INFORMATION */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-x-8
                      gap-y-3
                      sm:flex
                      sm:items-center
                      sm:gap-8
                    "
                  >

                    <PatientInfo
                      label="Age"
                      value={`${selectedPatient.age} years`}
                    />

                    <PatientInfo
                      label="Gender"
                      value={selectedPatient.gender}
                    />

                    <PatientInfo
                      label="Blood Group"
                      value={selectedPatient.bloodGroup}
                    />

                  </div>

                </div>

                {/* ALLERGY */}

                {selectedEMR?.allergies &&
                  selectedEMR.allergies !==
                    "None known" && (

                    <div
                      className="
                        mt-5
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        border-red-400/10
                        bg-red-400/[0.05]
                        p-4
                      "
                    >

                      <AlertCircle
                        size={19}
                        className="
                          mt-0.5
                          shrink-0
                          text-red-400
                        "
                      />

                      <div>

                        <p className="text-sm font-semibold text-red-300">
                          Known Allergy
                        </p>

                        <p className="mt-1 text-sm text-red-400/80">
                          {selectedEMR.allergies}
                        </p>

                      </div>

                    </div>

                  )}

              </div>

            )}

            {/* =================================================
                NO EMR DATA
            ================================================== */}

            {selectedPatient && !selectedEMR && (

              <div
                className="
                  mb-6
                  rounded-2xl
                  border
                  border-yellow-400/10
                  bg-yellow-400/[0.03]
                  p-6
                  text-center
                "
              >

                <div
                  className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-yellow-400/10
                    text-yellow-400
                  "
                >
                  <FileText size={22} />
                </div>

                <h3 className="mt-4 text-base font-semibold text-white">
                  No EMR data available
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  This patient does not have clinical
                  record data in the current frontend
                  demo.
                </p>

              </div>

            )}

            {/* =================================================
                SECTION NAVIGATION
            ================================================== */}

            <div
              className="
                mb-6
                overflow-x-auto
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
              "
            >

              <div className="flex min-w-max gap-1 p-2">

                {[
                  {
                    name: "Clinical Notes",
                    icon: (
                      <ClipboardList size={17} />
                    ),
                  },
                  {
                    name: "Vitals",
                    icon: (
                      <HeartPulse size={17} />
                    ),
                  },
                  {
                    name: "Medical History",
                    icon: (
                      <FileText size={17} />
                    ),
                  },
                  {
                    name: "Attachments",
                    icon: (
                      <Paperclip size={17} />
                    ),
                  },
                ].map((section) => (

                  <button
                    key={section.name}
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        section.name
                      )
                    }
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-medium
                      transition
                      ${
                        activeSection ===
                        section.name
                          ? "bg-cyan-400/10 text-cyan-400"
                          : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                      }
                    `}
                  >

                    {section.icon}

                    {section.name}

                  </button>

                ))}

              </div>

            </div>

            {/* =================================================
                CLINICAL NOTES
            ================================================== */}

            {activeSection ===
              "Clinical Notes" &&
              selectedEMR && (
                <ClinicalNotes
                  record={selectedEMR}
                />
              )}

            {/* =================================================
                VITALS
            ================================================== */}

            {activeSection === "Vitals" &&
              selectedEMR && (
                <Vitals
                  record={selectedEMR}
                />
              )}

            {/* =================================================
                MEDICAL HISTORY
            ================================================== */}

            {activeSection ===
              "Medical History" &&
              selectedEMR && (
                <MedicalHistory
                  record={selectedEMR}
                />
              )}

            {/* =================================================
                ATTACHMENTS
            ================================================== */}

            {activeSection ===
              "Attachments" && (
              <Attachments />
            )}

          </div>
        </section>

      </main>
    </div>
  );
}

/* =============================================================
   PATIENT INFO
============================================================= */

function PatientInfo({
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
          text-[11px]
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-medium
          text-slate-200
        "
      >
        {value}
      </p>

    </div>
  );
}

/* =============================================================
   CLINICAL NOTES
============================================================= */

function ClinicalNotes({
  record,
}: {
  record: EMRRecord;
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        xl:grid-cols-2
      "
    >

      <EMRTextArea
        label="Chief Complaint"
        icon={<Stethoscope size={17} />}
        value={record.chiefComplaint}
      />

      <EMRTextArea
        label="Symptoms"
        icon={<Activity size={17} />}
        value={record.symptoms}
      />

      <EMRTextArea
        label="Diagnosis"
        icon={<ClipboardList size={17} />}
        value={record.diagnosis}
      />

      <EMRTextArea
        label="Treatment Plan"
        icon={<FileText size={17} />}
        value={record.treatmentPlan}
        large
      />

    </div>
  );
}

/* =============================================================
   VITALS
============================================================= */

function Vitals({
  record,
}: {
  record: EMRRecord;
}) {
  return (
    <div>

      <div className="mb-5">

        <h2 className="text-xl font-semibold text-white">
          Patient Vitals
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest recorded clinical measurements.
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-5
        "
      >

        <VitalCard
          label="Blood Pressure"
          value={record.bloodPressure}
          unit="mmHg"
          icon={<HeartPulse size={20} />}
        />

        <VitalCard
          label="Heart Rate"
          value={record.heartRate}
          unit="BPM"
          icon={<Activity size={20} />}
        />

        <VitalCard
          label="Temperature"
          value={record.temperature}
          unit=""
          icon={<Activity size={20} />}
        />

        <VitalCard
          label="Oxygen Saturation"
          value={record.oxygenSaturation}
          unit="SpO₂"
          icon={<HeartPulse size={20} />}
        />

        <VitalCard
          label="Weight"
          value={record.weight}
          unit=""
          icon={<Weight size={20} />}
        />

      </div>

      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-2
        "
      >

        <EMRTextArea
          label="Vitals Notes"
          icon={<ClipboardList size={17} />}
          value="Patient is currently stable. Continue regular monitoring."
          large
        />

        <EMRTextArea
          label="Recorded By"
          icon={<UserRound size={17} />}
          value="Doctor Name — General Medicine"
          large
        />

      </div>

    </div>
  );
}

/* =============================================================
   VITAL CARD
============================================================= */

function VitalCard({
  label,
  value,
  unit,
  icon,
}: {
  label: string;
  value: string;
  unit: string;
  icon: ReactNode;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-5
      "
    >

      <div className="flex items-center justify-between gap-3">

        <p className="text-xs text-slate-500">
          {label}
        </p>

        <div className="text-cyan-400">
          {icon}
        </div>

      </div>

      <div className="mt-5 flex items-end gap-2">

        <p className="text-2xl font-bold text-white">
          {value}
        </p>

        {unit && (
          <p className="mb-1 text-xs text-slate-500">
            {unit}
          </p>
        )}

      </div>

    </div>
  );
}

/* =============================================================
   MEDICAL HISTORY
============================================================= */

function MedicalHistory({
  record,
}: {
  record: EMRRecord;
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        lg:grid-cols-2
      "
    >

      <HistoryCard
        title="Allergies"
        icon={<AlertCircle size={19} />}
        value={record.allergies}
        danger={
          record.allergies !== "None known"
        }
      />

      <HistoryCard
        title="Medication History"
        icon={<ClipboardList size={19} />}
        value={record.medicationHistory}
      />

      <HistoryCard
        title="Vaccination History"
        icon={<Syringe size={19} />}
        value={record.vaccinationHistory}
      />

      <HistoryCard
        title="Family History"
        icon={<UserRound size={19} />}
        value={record.familyHistory}
      />

    </div>
  );
}

/* =============================================================
   HISTORY CARD
============================================================= */

function HistoryCard({
  title,
  icon,
  value,
  danger = false,
}: {
  title: string;
  icon: ReactNode;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-5
        sm:p-6
      "
    >

      <div className="flex items-center gap-3">

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            ${
              danger
                ? "bg-red-400/10 text-red-400"
                : "bg-cyan-400/10 text-cyan-400"
            }
          `}
        >
          {icon}
        </div>

        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>

      </div>

      <p
        className={`
          mt-5
          text-sm
          leading-7
          ${
            danger
              ? "text-red-300"
              : "text-slate-400"
          }
        `}
      >
        {value}
      </p>

    </div>
  );
}

/* =============================================================
   ATTACHMENTS
============================================================= */

function Attachments() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-5
        sm:p-7
      "
    >

      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <h2 className="text-xl font-semibold text-white">
            Medical Attachments
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Upload and review patient-related
            clinical documents.
          </p>

        </div>

        <button
          type="button"
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-cyan-400/20
            bg-cyan-400/10
            px-4
            text-sm
            font-medium
            text-cyan-400
            transition
            hover:bg-cyan-400/15
          "
        >
          <Paperclip size={17} />
          Add Attachment
        </button>

      </div>

      {/* UPLOAD AREA */}

      <div
        className="
          mt-6
          flex
          min-h-48
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-white/10
          bg-slate-900/40
          px-6
          text-center
        "
      >

        <div
          className="
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
          <Paperclip size={24} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-white">
          No attachments yet
        </h3>

        <p
          className="
            mt-2
            max-w-sm
            text-xs
            leading-5
            text-slate-500
          "
        >
          Upload reports, scans or other clinical
          documents associated with this patient.
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   TEXT AREA
============================================================= */

function EMRTextArea({
  label,
  icon,
  value,
  large = false,
}: {
  label: string;
  icon: ReactNode;
  value: string;
  large?: boolean;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-5
        sm:p-6
      "
    >

      <div className="mb-4 flex items-center gap-3">

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
          {icon}
        </div>

        <label className="text-sm font-semibold text-white">
          {label}
        </label>

      </div>

      <textarea
        defaultValue={value}
        rows={large ? 6 : 4}
        className="
          w-full
          resize-y
          rounded-xl
          border
          border-white/[0.08]
          bg-slate-900/70
          px-4
          py-3
          text-sm
          leading-6
          text-slate-200
          outline-none
          placeholder:text-slate-500
          focus:border-cyan-400/50
          focus:ring-2
          focus:ring-cyan-400/10
        "
      />

    </div>
  );
}