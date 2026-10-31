
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Users,
  ShieldCheck,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import DashboardShell from "@/components/layout/dashboard-shell";

type UserRole = "Admin" | "Doctor" | "Receptionist";
type UserStatus = "Active" | "Inactive";

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
}

const initialUsers: StaffUser[] = [
  {
    id: "USR-001",
    name: "Dr. Aarav Mehta",
    email: "aarav.mehta@medcore.demo",
    role: "Doctor",
    department: "Cardiology",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Dr. Diya Shah",
    email: "diya.shah@medcore.demo",
    role: "Doctor",
    department: "Neurology",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Riya Patel",
    email: "riya.patel@medcore.demo",
    role: "Receptionist",
    department: "Front Desk",
    status: "Active",
  },
  {
    id: "USR-004",
    name: "Karan Joshi",
    email: "karan.joshi@medcore.demo",
    role: "Receptionist",
    department: "Front Desk",
    status: "Inactive",
  },
  {
    id: "USR-005",
    name: "Admin User",
    email: "admin@medcore.demo",
    role: "Admin",
    department: "Administration",
    status: "Active",
  },
];

const roleStyles: Record<UserRole, string> = {
  Admin: "bg-violet-400/10 text-violet-400",
  Doctor: "bg-cyan-400/10 text-cyan-400",
  Receptionist: "bg-amber-400/10 text-amber-400",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Doctor" as UserRole,
    department: "",
  });

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const addUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser: StaffUser = {
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      ...form,
      status: "Active",
    };

    setUsers((current) => [newUser, ...current]);
    setForm({
      name: "",
      email: "",
      role: "Doctor",
      department: "",
    });
    setShowForm(false);
  };

  const toggleStatus = (id: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const deleteUser = (id: string) => {
    if (id === "USR-005") {
      alert("The primary admin account cannot be deleted.");
      return;
    }

    if (confirm("Delete this user from the demo directory?")) {
      setUsers((current) => current.filter((user) => user.id !== id));
    }
  };

  const activeCount = users.filter((user) => user.status === "Active").length;
  const doctorCount = users.filter((user) => user.role === "Doctor").length;
  const receptionistCount = users.filter(
    (user) => user.role === "Receptionist"
  ).length;

  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-cyan-400">Administration</p>
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              User Management
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage hospital staff accounts and access.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <UserPlus size={18} />
            Add User
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Users",
              value: users.length,
              icon: Users,
              color: "text-cyan-400",
            },
            {
              label: "Active Users",
              value: activeCount,
              icon: ShieldCheck,
              color: "text-emerald-400",
            },
            {
              label: "Doctors",
              value: doctorCount,
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
                placeholder="Search name, email, or user ID..."
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="h-11 rounded-xl border border-white/10 bg-slate-950 px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
            >
              <option value="All">All roles</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Receptionist">Receptionist</option>
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
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">User</th>
                  <th className="px-5 py-4 font-medium">User ID</th>
                  <th className="px-5 py-4 font-medium">Role</th>
                  <th className="px-5 py-4 font-medium">Department</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-slate-300">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {user.id}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${roleStyles[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {user.department}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : "bg-slate-400/10 text-slate-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(user.id)}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400"
                        >
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteUser(user.id)}
                          aria-label={`Delete ${user.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No users match your search.
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
                <h2 className="text-lg font-semibold text-white">Add User</h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  aria-label="Close form"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={addUser} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Full name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-cyan-400/50"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Email address
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-cyan-400/50"
                    placeholder="name@medcore.demo"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        role: event.target.value as UserRole,
                      })
                    }
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none focus:border-cyan-400/50"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Department
                  </label>
                  <input
                    required
                    value={form.department}
                    onChange={(event) =>
                      setForm({ ...form, department: event.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-cyan-400/50"
                    placeholder="Enter department"
                  />
                </div>

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
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
