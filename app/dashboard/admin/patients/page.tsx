"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import {
  Search,
  Plus,
  Users,
  UserRound,
  CalendarDays,
  Activity,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Filter,
  Eye,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
} from "lucide-react";

type PatientStatus = "Active" | "Discharged" | "Critical";
type Gender = "Male" | "Female" | "Other";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  email: string;
  department: string;
  doctor: string;
  bloodGroup: string;
  status: PatientStatus;
  admissionDate: string;
  address: string;
};

const initialPatients: Patient[] = [
  {
    id: "PAT-1001",
    name: "Aarav Patel",
    age: 34,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "aarav.patel@example.com",
    department: "Cardiology",
    doctor: "Dr. Aarav Shah",
    bloodGroup: "O+",
    status: "Active",
    admissionDate: "2026-10-28",
    address: "Ahmedabad, Gujarat",
  },
  {
    id: "PAT-1002",
    name: "Diya Shah",
    age: 27,
    gender: "Female",
    phone: "+91 98765 43211",
    email: "diya.shah@example.com",
    department: "Neurology",
    doctor: "Dr. Meera Patel",
    bloodGroup: "A+",
    status: "Active",
    admissionDate: "2026-10-27",
    address: "Gandhinagar, Gujarat",
  },
  {
    id: "PAT-1003",
    name: "Vivaan Mehta",
    age: 56,
    gender: "Male",
    phone: "+91 98765 43212",
    email: "vivaan.mehta@example.com",
    department: "Orthopedics",
    doctor: "Dr. Rohan Mehta",
    bloodGroup: "B+",
    status: "Critical",
    admissionDate: "2026-10-25",
    address: "Sanand, Gujarat",
  },
  {
    id: "PAT-1004",
    name: "Anaya Desai",
    age: 8,
    gender: "Female",
    phone: "+91 98765 43213",
    email: "anaya.desai@example.com",
    department: "Pediatrics",
    doctor: "Dr. Ananya Desai",
    bloodGroup: "AB+",
    status: "Active",
    admissionDate: "2026-10-24",
    address: "Ahmedabad, Gujarat",
  },
  {
    id: "PAT-1005",
    name: "Ishaan Joshi",
    age: 42,
    gender: "Male",
    phone: "+91 98765 43214",
    email: "ishaan.joshi@example.com",
    department: "Dermatology",
    doctor: "Dr. Ishita Joshi",
    bloodGroup: "O-",
    status: "Discharged",
    admissionDate: "2026-10-20",
    address: "Vadodara, Gujarat",
  },
  {
    id: "PAT-1006",
    name: "Kiara Trivedi",
    age: 63,
    gender: "Female",
    phone: "+91 98765 43215",
    email: "kiara.trivedi@example.com",
    department: "General Medicine",
    doctor: "Dr. Karan Trivedi",
    bloodGroup: "B-",
    status: "Active",
    admissionDate: "2026-10-29",
    address: "Ahmedabad, Gujarat",
  },
];

const emptyPatient: Patient = {
  id: "",
  name: "",
  age: 0,
  gender: "Male",
  phone: "",
  email: "",
  department: "",
  doctor: "",
  bloodGroup: "",
  status: "Active",
  admissionDate: new Date().toISOString().slice(0, 10),
  address: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0b1424] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PatientStatus>("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewPatient, setViewPatient] = useState<Patient | null>(null);
  const [form, setForm] = useState<Patient>(emptyPatient);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Patient | null>(null);

  const departments = useMemo(
    () => Array.from(new Set(patients.map((patient) => patient.department))).sort(),
    [patients]
  );

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query) ||
        patient.doctor.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || patient.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        patient.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [patients, search, statusFilter, departmentFilter]);

  const activeCount = patients.filter((p) => p.status === "Active").length;
  const criticalCount = patients.filter((p) => p.status === "Critical").length;
  const dischargedCount = patients.filter(
    (p) => p.status === "Discharged"
  ).length;

  function openAddModal() {
    setEditingPatient(null);
    setForm({ ...emptyPatient });
    setModalOpen(true);
  }

  function openEditModal(patient: Patient) {
    setEditingPatient(patient);
    setForm({ ...patient });
    setMenuId(null);
    setViewPatient(null);
    setModalOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingPatient) {
      setPatients((current) =>
        current.map((patient) =>
          patient.id === editingPatient.id
            ? { ...form, id: editingPatient.id }
            : patient
        )
      );
    } else {
      const newPatient: Patient = {
        ...form,
        id: `PAT-${String(Date.now()).slice(-6)}`,
      };
      setPatients((current) => [newPatient, ...current]);
    }

    setModalOpen(false);
    setEditingPatient(null);
    setForm({ ...emptyPatient });
  }

  function confirmDelete() {
    if (!deleteTarget) return;

    setPatients((current) =>
      current.filter((patient) => patient.id !== deleteTarget.id)
    );
    setDeleteTarget(null);
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-7 pb-10">
        {/* Page header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm text-slate-400">
              Admin <span className="mx-2 text-slate-600">/</span> Patients
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Patients
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage patient records, contact details, and care status.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Plus size={18} />
            Add Patient
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Patients"
            value={patients.length}
            icon={<Users size={20} />}
            accent="cyan"
          />
          <SummaryCard
            label="Active Patients"
            value={activeCount}
            icon={<UserRound size={20} />}
            accent="emerald"
          />
          <SummaryCard
            label="Critical Patients"
            value={criticalCount}
            icon={<HeartPulse size={20} />}
            accent="rose"
          />
          <SummaryCard
            label="Discharged"
            value={dischargedCount}
            icon={<Activity size={20} />}
            accent="violet"
          />
        </div>

        {/* Patients table */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111c2e]/80 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-white">All Patients</h2>
              <p className="mt-1 text-sm text-slate-400">
                {filteredPatients.length} patients found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search patients..."
                  className="w-full rounded-xl border border-white/10 bg-[#0b1424] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50 sm:w-60"
                />
              </div>

              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as "All" | PatientStatus)
                  }
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#0b1424] py-2.5 pl-9 pr-8 text-sm text-slate-300 outline-none focus:border-cyan-400/50 sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Critical">Critical</option>
                  <option value="Discharged">Discharged</option>
                </select>
              </div>

              <select
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-cyan-400/50 sm:w-44"
              >
                <option value="All">All Departments</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-white/[0.02]">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-medium">Patient</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Doctor</th>
                  <th className="px-6 py-4 font-medium">Admission</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="transition hover:bg-white/[0.025]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={patient.name} />
                        <div>
                          <p className="font-medium text-slate-100">
                            {patient.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {patient.id} · {patient.age} yrs · {patient.gender}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-300">{patient.phone}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {patient.email}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300">
                        {patient.department}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-300">
                      {patient.doctor}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                        <CalendarDays size={15} className="text-slate-500" />
                        {formatDate(patient.admissionDate)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={patient.status} />
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setMenuId(menuId === patient.id ? null : patient.id)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        aria-label={`Actions for ${patient.name}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {menuId === patient.id && (
                        <div className="absolute right-8 top-12 z-20 w-48 rounded-xl border border-white/10 bg-[#172337] p-1.5 text-left shadow-2xl">
                          <button
                            onClick={() => {
                              setViewPatient(patient);
                              setMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white"
                          >
                            <Eye size={15} />
                            View details
                          </button>
                          <button
                            onClick={() => openEditModal(patient)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white"
                          >
                            <Pencil size={15} />
                            Edit patient
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTarget(patient);
                              setMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-rose-300 hover:bg-rose-400/10"
                          >
                            <Trash2 size={15} />
                            Delete patient
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <Users
                        size={30}
                        className="mx-auto mb-3 text-slate-600"
                      />
                      <p className="font-medium text-slate-300">
                        No patients found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/[0.08] px-6 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredPatients.length} of {patients.length} patients
            </span>
            <span>Mock data · Changes are local to this session</span>
          </div>
        </section>
      </div>

      {/* Add / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-[#111c2e] shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/[0.08] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {editingPatient ? "Edit Patient" : "Add Patient"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter the patient details below.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Full Name">
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="Patient name"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Age">
                  <input
                    required
                    type="number"
                    min={0}
                    max={120}
                    value={form.age || ""}
                    onChange={(event) =>
                      setForm({ ...form, age: Number(event.target.value) })
                    }
                    placeholder="Age"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Gender">
                  <select
                    value={form.gender}
                    onChange={(event) =>
                      setForm({ ...form, gender: event.target.value as Gender })
                    }
                    className={inputClass}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </FormField>

                <FormField label="Blood Group">
                  <select
                    value={form.bloodGroup}
                    onChange={(event) =>
                      setForm({ ...form, bloodGroup: event.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Select blood group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      )
                    )}
                  </select>
                </FormField>

                <FormField label="Phone Number">
                  <input
                    required
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    placeholder="+91..."
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Email Address">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                    placeholder="patient@example.com"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Department">
                  <input
                    required
                    value={form.department}
                    onChange={(event) =>
                      setForm({ ...form, department: event.target.value })
                    }
                    placeholder="e.g. Cardiology"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Assigned Doctor">
                  <input
                    required
                    value={form.doctor}
                    onChange={(event) =>
                      setForm({ ...form, doctor: event.target.value })
                    }
                    placeholder="Doctor name"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Admission Date">
                  <input
                    required
                    type="date"
                    value={form.admissionDate}
                    onChange={(event) =>
                      setForm({ ...form, admissionDate: event.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        status: event.target.value as PatientStatus,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="Active">Active</option>
                    <option value="Critical">Critical</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </FormField>
              </div>

              <FormField label="Address">
                <input
                  value={form.address}
                  onChange={(event) =>
                    setForm({ ...form, address: event.target.value })
                  }
                  placeholder="City, State"
                  className={inputClass}
                />
              </FormField>

              <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  {editingPatient ? "Save Changes" : "Create Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient details modal */}
      {viewPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#111c2e] shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/[0.08] px-6 py-5">
              <div className="flex items-center gap-3">
                <Avatar name={viewPatient.name} large />
                <div>
                  <h2 className="font-semibold text-white">{viewPatient.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{viewPatient.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewPatient(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <DetailItem label="Age / Gender">
                {viewPatient.age} years · {viewPatient.gender}
              </DetailItem>
              <DetailItem label="Blood Group">{viewPatient.bloodGroup || "—"}</DetailItem>
              <DetailItem label="Phone">
                <span className="inline-flex items-center gap-2">
                  <Phone size={14} /> {viewPatient.phone}
                </span>
              </DetailItem>
              <DetailItem label="Email">
                <span className="inline-flex items-center gap-2 break-all">
                  <Mail size={14} /> {viewPatient.email || "—"}
                </span>
              </DetailItem>
              <DetailItem label="Department">{viewPatient.department}</DetailItem>
              <DetailItem label="Assigned Doctor">{viewPatient.doctor}</DetailItem>
              <DetailItem label="Admission Date">
                {formatDate(viewPatient.admissionDate)}
              </DetailItem>
              <DetailItem label="Status">
                <StatusBadge status={viewPatient.status} />
              </DetailItem>
              <div className="sm:col-span-2">
                <DetailItem label="Address">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={14} /> {viewPatient.address || "—"}
                  </span>
                </DetailItem>
              </div>
            </div>

            <div className="flex justify-end border-t border-white/[0.08] p-5">
              <button
                onClick={() => openEditModal(viewPatient)}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
              >
                <Pencil size={15} />
                Edit Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111c2e] p-6 shadow-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-400/10 text-rose-300">
              <Trash2 size={20} />
            </div>
            <h2 className="text-lg font-semibold text-white">Delete patient?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-slate-200">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: "cyan" | "emerald" | "rose" | "violet";
}) {
  const accents = {
    cyan: "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
    emerald: "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
    rose: "border-rose-400/15 bg-rose-400/10 text-rose-300",
    violet: "border-violet-400/15 bg-violet-400/10 text-violet-300",
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111c2e]/80 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${accents[accent]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, large = false }: { name: string; large?: boolean }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 font-semibold text-cyan-300 ${
        large ? "h-14 w-14 text-lg" : "h-11 w-11 text-sm"
      }`}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: PatientStatus }) {
  const styles = {
    Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Critical: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    Discharged: "border-slate-400/20 bg-slate-400/10 text-slate-400",
  };

  const dotStyles = {
    Active: "bg-emerald-400",
    Critical: "bg-rose-400",
    Discharged: "bg-slate-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function DetailItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="text-sm text-slate-200">{children}</div>
    </div>
  );
}

function formatDate(date: string) {
  if (!date) return "—";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}