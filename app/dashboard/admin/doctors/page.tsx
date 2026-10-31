
"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Users,
  Stethoscope,
  ShieldCheck,
  X,
} from "lucide-react";
import DashboardShell from "@/components/layout/dashboard-shell";

type DoctorStatus = "Active" | "Inactive";

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  status: DoctorStatus;
}

const initialDoctors: Doctor[] = [
  {
    id: "DOC-001",
    name: "Dr. Aarav Mehta",
    email: "aarav.mehta@medcore.demo",
    phone: "+91 98765 43210",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    status: "Active",
  },
  {
    id: "DOC-002",
    name: "Dr. Diya Shah",
    email: "diya.shah@medcore.demo",
    phone: "+91 98765 43211",
    department: "Neurology",
    specialization: "Clinical Neurology",
    status: "Active",
  },
  {
    id: "DOC-003",
    name: "Dr. Rohan Patel",
    email: "rohan.patel@medcore.demo",
    phone: "+91 98765 43212",
    department: "Orthopedics",
    specialization: "Joint Replacement",
    status: "Inactive",
  },
  {
    id: "DOC-004",
    name: "Dr. Neha Desai",
    email: "neha.desai@medcore.demo",
    phone: "+91 98765 43213",
    department: "Pediatrics",
    specialization: "Child Health",
    status: "Active",
  },
];

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Medicine",
  "Dermatology",
];

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Cardiology",
    specialization: "",
  });

  const filteredDoctors = useMemo(() => {
    const query = search.toLowerCase().trim();

    return doctors.filter((doctor) => {
      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.email.toLowerCase().includes(query) ||
        doctor.id.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        doctor.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" || doctor.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [doctors, search, departmentFilter, statusFilter]);

  const activeCount = doctors.filter(
    (doctor) => doctor.status === "Active"
  ).length;
  const inactiveCount = doctors.length - activeCount;

  function addDoctor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newDoctor: Doctor = {
      id: `DOC-${String(Date.now()).slice(-6)}`,
      ...form,
      status: "Active",
    };

    setDoctors((current) => [newDoctor, ...current]);
    setForm({
      name: "",
      email: "",
      phone: "",
      department: "Cardiology",
      specialization: "",
    });
    setShowForm(false);
  }

  function toggleStatus(id: string) {
    setDoctors((current) =>
      current.map((doctor) =>
        doctor.id === id
          ? {
              ...doctor,
              status:
                doctor.status === "Active" ? "Inactive" : "Active",
            }
          : doctor
      )
    );
  }

  function deleteDoctor(id: string) {
    if (confirm("Delete this doctor from the demo directory?")) {
      setDoctors((current) =>
        current.filter((doctor) => doctor.id !== id)
      );
    }
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-cyan-400">Administration</p>
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Doctor Management
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage doctor profiles, departments, and account status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <UserPlus size={18} />
            Add Doctor
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Doctors",
              value: doctors.length,
              icon: Users,
              color: "text-cyan-400",
            },
            {
              label: "Active Doctors",
              value: activeCount,
              icon: ShieldCheck,
              color: "text-emerald-400",
            },
            {
              label: "Inactive Doctors",
              value: inactiveCount,
              icon: Stethoscope,
              color: "text-violet-400",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <Icon size={20} className={item.color} />
                </div>
                <p className="mt-3 text-2xl font-bold text-white">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <div className="flex flex-col gap-3 border-b border-white/[0.08] p-5 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, doctor ID, or specialization..."
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              className="h-11 rounded-xl border border-white/10 bg-slate-950 px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
            >
              <option value="All">All departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-xl border border-white/10 bg-slate-950 px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Doctor</th>
                  <th className="px-5 py-4 font-medium">Doctor ID</th>
                  <th className="px-5 py-4 font-medium">Department</th>
                  <th className="px-5 py-4 font-medium">Specialization</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-slate-300">
                          {doctor.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {doctor.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {doctor.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-400">
                      {doctor.id}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-400">
                      {doctor.department}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-400">
                      {doctor.specialization}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          doctor.status === "Active"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : "bg-slate-400/10 text-slate-400"
                        }`}
                      >
                        {doctor.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(doctor.id)}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400"
                        >
                          {doctor.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteDoctor(doctor.id)}
                          aria-label={`Delete ${doctor.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredDoctors.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No doctors match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Add Doctor
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  aria-label="Close form"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={addDoctor} className="space-y-4">
                <FormField label="Full name">
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    className="form-input"
                    placeholder="Enter full name"
                  />
                </FormField>

                <FormField label="Email address">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                    className="form-input"
                    placeholder="name@medcore.demo"
                  />
                </FormField>

                <FormField label="Phone">
                  <input
                    required
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    className="form-input"
                    placeholder="+91 00000 00000"
                  />
                </FormField>

                <FormField label="Department">
                  <select
                    value={form.department}
                    onChange={(event) =>
                      setForm({ ...form, department: event.target.value })
                    }
                    className="form-input"
                  >
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Specialization">
                  <input
                    required
                    value={form.specialization}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        specialization: event.target.value,
                      })
                    }
                    className="form-input"
                    placeholder="e.g. Clinical Cardiology"
                  />
                </FormField>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                  >
                    Add Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <style jsx>{`
          .form-input {
            width: 100%;
            height: 2.75rem;
            border: 1px solid rgb(255 255 255 / 10%);
            border-radius: 0.75rem;
            background: rgb(255 255 255 / 3%);
            padding: 0 0.75rem;
            font-size: 0.875rem;
            color: white;
            outline: none;
          }
          .form-input:focus {
            border-color: rgb(34 211 238 / 50%);
          }
          .form-input option {
            background: #020617;
            color: white;
          }
        `}</style>
      </div>
    </DashboardShell>
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
    <div>
      <label className="mb-2 block text-sm text-slate-400">{label}</label>
      {children}
    </div>
  );
}
