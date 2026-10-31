"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import {
  Search,
  Plus,
  Building2,
  Users,
  Stethoscope,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Filter,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type DepartmentStatus = "Active" | "Inactive";

type Department = {
  id: string;
  name: string;
  code: string;
  head: string;
  doctors: number;
  patients: number;
  description: string;
  status: DepartmentStatus;
};

const initialDepartments: Department[] = [
  {
    id: "DEPT-001",
    name: "Cardiology",
    code: "CARD",
    head: "Dr. Aarav Shah",
    doctors: 12,
    patients: 248,
    description: "Diagnosis and treatment of heart and cardiovascular conditions.",
    status: "Active",
  },
  {
    id: "DEPT-002",
    name: "Neurology",
    code: "NEUR",
    head: "Dr. Meera Patel",
    doctors: 8,
    patients: 186,
    description: "Care for disorders of the brain, spine, and nervous system.",
    status: "Active",
  },
  {
    id: "DEPT-003",
    name: "Orthopedics",
    code: "ORTH",
    head: "Dr. Rohan Mehta",
    doctors: 10,
    patients: 213,
    description: "Musculoskeletal care, including bones, joints, and injuries.",
    status: "Active",
  },
  {
    id: "DEPT-004",
    name: "Pediatrics",
    code: "PEDI",
    head: "Dr. Ananya Desai",
    doctors: 7,
    patients: 164,
    description: "Medical care for infants, children, and adolescents.",
    status: "Active",
  },
  {
    id: "DEPT-005",
    name: "Dermatology",
    code: "DERM",
    head: "Dr. Ishita Joshi",
    doctors: 5,
    patients: 92,
    description: "Diagnosis and treatment of skin, hair, and nail conditions.",
    status: "Inactive",
  },
  {
    id: "DEPT-006",
    name: "General Medicine",
    code: "GENM",
    head: "Dr. Karan Trivedi",
    doctors: 14,
    patients: 302,
    description: "Primary care, diagnosis, and treatment of common illnesses.",
    status: "Active",
  },
];

const emptyDepartment: Department = {
  id: "",
  name: "",
  code: "",
  head: "",
  doctors: 0,
  patients: 0,
  description: "",
  status: "Active",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0b1424] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10";

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | DepartmentStatus>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [form, setForm] = useState<Department>(emptyDepartment);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);

  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return departments.filter((department) => {
      const matchesSearch =
        !query ||
        department.name.toLowerCase().includes(query) ||
        department.code.toLowerCase().includes(query) ||
        department.head.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || department.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [departments, search, statusFilter]);

  const activeCount = departments.filter((d) => d.status === "Active").length;
  const totalDoctors = departments.reduce((sum, d) => sum + d.doctors, 0);
  const totalPatients = departments.reduce((sum, d) => sum + d.patients, 0);

  function openAddModal() {
    setEditingDepartment(null);
    setForm({ ...emptyDepartment });
    setModalOpen(true);
  }

  function openEditModal(department: Department) {
    setEditingDepartment(department);
    setForm({ ...department });
    setMenuId(null);
    setModalOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingDepartment) {
      setDepartments((current) =>
        current.map((department) =>
          department.id === editingDepartment.id
            ? { ...form, id: editingDepartment.id }
            : department
        )
      );
    } else {
      const newDepartment: Department = {
        ...form,
        id: `DEPT-${String(Date.now()).slice(-6)}`,
      };
      setDepartments((current) => [newDepartment, ...current]);
    }

    setModalOpen(false);
    setEditingDepartment(null);
    setForm({ ...emptyDepartment });
  }

  function confirmDelete() {
    if (!deleteTarget) return;

    setDepartments((current) =>
      current.filter((department) => department.id !== deleteTarget.id)
    );
    setDeleteTarget(null);
  }

  function toggleStatus(department: Department) {
    setDepartments((current) =>
      current.map((item) =>
        item.id === department.id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
    setMenuId(null);
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-7 pb-10">
        {/* Page header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm text-slate-400">
              Admin <span className="mx-2 text-slate-600">/</span> Departments
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Departments
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage hospital departments and their assigned resources.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Plus size={18} />
            Add Department
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Departments"
            value={departments.length}
            icon={<Building2 size={20} />}
            accent="cyan"
          />
          <SummaryCard
            label="Active Departments"
            value={activeCount}
            icon={<CheckCircle2 size={20} />}
            accent="emerald"
          />
          <SummaryCard
            label="Total Doctors"
            value={totalDoctors}
            icon={<Stethoscope size={20} />}
            accent="blue"
          />
          <SummaryCard
            label="Assigned Patients"
            value={totalPatients.toLocaleString()}
            icon={<Users size={20} />}
            accent="violet"
          />
        </div>

        {/* Departments table */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111c2e]/80 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-white">All Departments</h2>
              <p className="mt-1 text-sm text-slate-400">
                {filteredDepartments.length} departments found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search departments..."
                  className="w-full rounded-xl border border-white/10 bg-[#0b1424] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50 sm:w-64"
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
                    setStatusFilter(event.target.value as "All" | DepartmentStatus)
                  }
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#0b1424] py-2.5 pl-9 pr-8 text-sm text-slate-300 outline-none focus:border-cyan-400/50 sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-white/[0.02]">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Department Head</th>
                  <th className="px-6 py-4 font-medium">Doctors</th>
                  <th className="px-6 py-4 font-medium">Patients</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {filteredDepartments.map((department) => (
                  <tr
                    key={department.id}
                    className="transition hover:bg-white/[0.025]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-300">
                          <Building2 size={19} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-100">
                            {department.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {department.code} · {department.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-200">{department.head}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                        <Stethoscope size={15} className="text-slate-500" />
                        {department.doctors}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                        <Users size={15} className="text-slate-500" />
                        {department.patients}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={department.status} />
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setMenuId(menuId === department.id ? null : department.id)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        aria-label={`Actions for ${department.name}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {menuId === department.id && (
                        <div className="absolute right-8 top-12 z-20 w-48 rounded-xl border border-white/10 bg-[#172337] p-1.5 text-left shadow-2xl">
                          <button
                            onClick={() => openEditModal(department)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white"
                          >
                            <Pencil size={15} />
                            Edit department
                          </button>
                          <button
                            onClick={() => toggleStatus(department)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white"
                          >
                            {department.status === "Active" ? (
                              <XCircle size={15} />
                            ) : (
                              <CheckCircle2 size={15} />
                            )}
                            {department.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTarget(department);
                              setMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-rose-300 hover:bg-rose-400/10"
                          >
                            <Trash2 size={15} />
                            Delete department
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredDepartments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <Building2
                        size={30}
                        className="mx-auto mb-3 text-slate-600"
                      />
                      <p className="font-medium text-slate-300">
                        No departments found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or status filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-white/[0.08] px-6 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredDepartments.length} of {departments.length} departments
            </span>
            <span>Mock data · Changes are local to this session</span>
          </div>
        </section>
      </div>

      {/* Add / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111c2e] shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/[0.08] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {editingDepartment ? "Edit Department" : "Add Department"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter the department details below.
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
                <FormField label="Department Name">
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="e.g. Cardiology"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Department Code">
                  <input
                    required
                    value={form.code}
                    onChange={(event) =>
                      setForm({ ...form, code: event.target.value.toUpperCase() })
                    }
                    placeholder="e.g. CARD"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Department Head">
                  <input
                    required
                    value={form.head}
                    onChange={(event) =>
                      setForm({ ...form, head: event.target.value })
                    }
                    placeholder="Doctor name"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        status: event.target.value as DepartmentStatus,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </FormField>

                <FormField label="Number of Doctors">
                  <input
                    type="number"
                    min={0}
                    value={form.doctors}
                    onChange={(event) =>
                      setForm({ ...form, doctors: Number(event.target.value) })
                    }
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Number of Patients">
                  <input
                    type="number"
                    min={0}
                    value={form.patients}
                    onChange={(event) =>
                      setForm({ ...form, patients: Number(event.target.value) })
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>

              <FormField label="Description">
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  placeholder="Briefly describe this department..."
                  className={`${inputClass} resize-none`}
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
                  {editingDepartment ? "Save Changes" : "Create Department"}
                </button>
              </div>
            </form>
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
            <h2 className="text-lg font-semibold text-white">
              Delete department?
            </h2>
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
  accent: "cyan" | "emerald" | "blue" | "violet";
}) {
  const accents = {
    cyan: "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
    emerald: "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
    blue: "border-blue-400/15 bg-blue-400/10 text-blue-300",
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

function StatusBadge({ status }: { status: DepartmentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${
        status === "Active"
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
          : "border-slate-400/20 bg-slate-400/10 text-slate-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active" ? "bg-emerald-400" : "bg-slate-500"
        }`}
      />
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