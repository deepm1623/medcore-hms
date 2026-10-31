
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  Users,
  X,
  Phone,
  CalendarDays,
  Droplets,
  Activity,
  Eye,
} from "lucide-react";
import DashboardShell from "@/components/layout/dashboard-shell";
import { mockPatients, type MockPatient } from "@/mock/patients";

const statusStyles: Record<string, string> = {
  Stable: "bg-emerald-400/10 text-emerald-400",
  "Under Treatment": "bg-amber-400/10 text-amber-400",
  Critical: "bg-red-400/10 text-red-400",
};

const emptyPatient: Omit<MockPatient, "id"> = {
  name: "",
  age: 18,
  gender: "Male",
  bloodGroup: "O+",
  phone: "",
  condition: "",
  status: "Stable",
  lastVisit: "Not visited",
  department: "General Medicine",
};

export default function ReceptionistPatientsPage() {
  const [patients, setPatients] = useState<MockPatient[]>(mockPatients);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState<MockPatient | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyPatient);
  const [formError, setFormError] = useState("");

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch = [
        patient.id,
        patient.name,
        patient.phone,
        patient.condition,
        patient.department,
      ].some((value) => value.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (status === "All" || patient.status === status)
      );
    });
  }, [patients, search, status]);

  const openRegistration = () => {
    setForm(emptyPatient);
    setFormError("");
    setShowForm(true);
  };

  const registerPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setFormError("Patient name and phone number are required.");
      return;
    }

    const nextNumber =
      Math.max(
        1000,
        ...patients.map((patient) => {
          const number = Number(patient.id.replace("P-", ""));
          return Number.isFinite(number) ? number : 1000;
        })
      ) + 1;

    const newPatient: MockPatient = {
      ...form,
      id: `P-${nextNumber}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      condition: form.condition.trim() || "Not specified",
    };

    setPatients((current) => [newPatient, ...current]);
    setSearch("");
    setStatus("All");
    setShowForm(false);
  };

  const stats = [
    {
      label: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "text-cyan-400",
    },
    {
      label: "Stable",
      value: patients.filter((patient) => patient.status === "Stable").length,
      icon: Activity,
      color: "text-emerald-400",
    },
    {
      label: "Under Treatment",
      value: patients.filter(
        (patient) => patient.status === "Under Treatment"
      ).length,
      icon: CalendarDays,
      color: "text-amber-400",
    },
    {
      label: "Critical",
      value: patients.filter((patient) => patient.status === "Critical").length,
      icon: Droplets,
      color: "text-red-400",
    },
  ];

  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1600px] space-y-7">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-cyan-400">
              Reception Workspace
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Patients
            </h1>
            <p className="mt-2 text-slate-400">
              Search patient records and register new patients.
            </p>
          </div>

          <button
            type="button"
            onClick={openRegistration}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 font-semibold text-white transition hover:brightness-110"
          >
            <UserPlus size={19} />
            Register Patient
          </button>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <article
              key={label}
              className="rounded-2xl border border-white/[0.08] bg-slate-900/60 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-slate-400">{label}</p>
                <div className={`rounded-xl bg-white/[0.04] p-3 ${color}`}>
                  <Icon size={21} />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold">{value}</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/50">
          <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] p-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-semibold">Patient Directory</h2>
              <p className="mt-1 text-sm text-slate-400">
                Showing {filteredPatients.length} of {patients.length} patients
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-3 sm:min-w-64">
                <Search size={18} className="text-slate-500" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, ID, phone..."
                  aria-label="Search patients"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                />
              </div>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                aria-label="Filter patients by status"
                className="min-h-11 rounded-xl border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Stable">Stable</option>
                <option value="Under Treatment">Under Treatment</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">Patient</th>
                  <th className="px-5 py-4">Age / Gender</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Department</th>
                  <th className="px-5 py-4">Condition</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="transition hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-semibold text-cyan-400">
                          {patient.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {patient.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {patient.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                      {patient.age} years · {patient.gender}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                      {patient.phone}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {patient.department}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {patient.condition}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[patient.status]}`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedPatient(patient)}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredPatients.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No patients match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-patient-title"
            className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <h2
                  id="register-patient-title"
                  className="text-xl font-semibold"
                >
                  Register Patient
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter the patient&apos;s basic information.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close registration form"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={registerPatient} className="space-y-5 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  Full name *
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="Enter patient name"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white outline-none focus:border-cyan-400/50"
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  Phone number *
                  <input
                    required
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white outline-none focus:border-cyan-400/50"
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  Age
                  <input
                    type="number"
                    min={0}
                    max={125}
                    required
                    value={form.age}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        age: Number(event.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white outline-none focus:border-cyan-400/50"
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  Gender
                  <select
                    value={form.gender}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        gender: event.target.value as MockPatient["gender"],
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white outline-none focus:border-cyan-400/50"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  Blood group
                  <select
                    value={form.bloodGroup}
                    onChange={(event) =>
                      setForm({ ...form, bloodGroup: event.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white outline-none focus:border-cyan-400/50"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  Department
                  <select
                    value={form.department}
                    onChange={(event) =>
                      setForm({ ...form, department: event.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white outline-none focus:border-cyan-400/50"
                  >
                    {[
                      "General Medicine",
                      "Cardiology",
                      "Neurology",
                      "Endocrinology",
                      "Nephrology",
                      "Orthopedics",
                      "Pediatrics",
                    ].map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm text-slate-300 sm:col-span-2">
                  Condition
                  <input
                    value={form.condition}
                    onChange={(event) =>
                      setForm({ ...form, condition: event.target.value })
                    }
                    placeholder="Enter condition, if known"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white outline-none focus:border-cyan-400/50"
                  />
                </label>
              </div>

              {formError && (
                <p role="alert" className="text-sm text-red-400">
                  {formError}
                </p>
              )}

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/10 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
                >
                  Save Patient
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedPatient && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="patient-details-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 id="patient-details-title" className="text-xl font-semibold">
                Patient Details
              </h2>
              <button
                type="button"
                aria-label="Close patient details"
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-lg font-bold text-cyan-400">
                  {selectedPatient.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedPatient.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Age", `${selectedPatient.age} years`],
                  ["Gender", selectedPatient.gender],
                  ["Blood Group", selectedPatient.bloodGroup],
                  ["Department", selectedPatient.department],
                  ["Condition", selectedPatient.condition],
                  ["Last Visit", selectedPatient.lastVisit],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3"
                  >
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 break-words text-sm font-medium text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] p-3">
                <Phone size={18} className="text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm text-white">
                    {selectedPatient.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-400">Patient status</span>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[selectedPatient.status]}`}
                >
                  {selectedPatient.status}
                </span>
              </div>
            </div>
          </section>
        </div>
      )}
    </DashboardShell>
  );
}
