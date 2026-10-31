
"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  Search,
  Plus,
  X,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DashboardShell from "@/components/layout/dashboard-shell";

type AppointmentStatus =
  | "Scheduled"
  | "Checked In"
  | "Completed"
  | "Cancelled";

type Appointment = {
  id: string;
  patient: string;
  patientId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: string;
  status: AppointmentStatus;
  phone: string;
};

const initialAppointments: Appointment[] = [
  {
    id: "APT-1001",
    patient: "Aarav Patel",
    patientId: "PAT-1001",
    doctor: "Dr. Mehta",
    department: "Cardiology",
    date: "2026-10-26",
    time: "09:00 AM",
    type: "Consultation",
    status: "Checked In",
    phone: "9876543210",
  },
  {
    id: "APT-1002",
    patient: "Diya Shah",
    patientId: "PAT-1002",
    doctor: "Dr. Desai",
    department: "General Medicine",
    date: "2026-10-26",
    time: "09:30 AM",
    type: "Follow-up",
    status: "Scheduled",
    phone: "9876543211",
  },
  {
    id: "APT-1003",
    patient: "Rohan Patel",
    patientId: "PAT-1003",
    doctor: "Dr. Mehta",
    department: "Cardiology",
    date: "2026-10-26",
    time: "10:00 AM",
    type: "Consultation",
    status: "Completed",
    phone: "9876543212",
  },
  {
    id: "APT-1004",
    patient: "Isha Joshi",
    patientId: "PAT-1004",
    doctor: "Dr. Shah",
    department: "Dermatology",
    date: "2026-10-26",
    time: "10:30 AM",
    type: "Consultation",
    status: "Scheduled",
    phone: "9876543213",
  },
  {
    id: "APT-1005",
    patient: "Vivaan Mehta",
    patientId: "PAT-1005",
    doctor: "Dr. Desai",
    department: "General Medicine",
    date: "2026-10-26",
    time: "11:00 AM",
    type: "Follow-up",
    status: "Cancelled",
    phone: "9876543214",
  },
  {
    id: "APT-1006",
    patient: "Anaya Trivedi",
    patientId: "PAT-1006",
    doctor: "Dr. Shah",
    department: "Dermatology",
    date: "2026-10-26",
    time: "11:30 AM",
    type: "Consultation",
    status: "Scheduled",
    phone: "9876543215",
  },
];

const statusStyles: Record<AppointmentStatus, string> = {
  Scheduled: "bg-blue-400/10 text-blue-400",
  "Checked In": "bg-amber-400/10 text-amber-400",
  Completed: "bg-emerald-400/10 text-emerald-400",
  Cancelled: "bg-red-400/10 text-red-400",
};

const today = "2026-10-26";

const emptyAppointment = {
  patient: "",
  patientId: "",
  doctor: "",
  department: "General Medicine",
  date: today,
  time: "09:00 AM",
  type: "Consultation",
  phone: "",
};

export default function ReceptionistAppointmentsPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(today);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [form, setForm] = useState(emptyAppointment);

  const filteredAppointments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patient.toLowerCase().includes(query) ||
        appointment.id.toLowerCase().includes(query) ||
        appointment.patientId.toLowerCase().includes(query) ||
        appointment.doctor.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        appointment.status === statusFilter;

      const matchesDate =
        !dateFilter || appointment.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, search, statusFilter, dateFilter]);

  const stats = [
    {
      label: "Total Appointments",
      value: appointments.filter((a) => a.date === today).length,
      icon: CalendarDays,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      label: "Scheduled",
      value: appointments.filter(
        (a) => a.date === today && a.status === "Scheduled"
      ).length,
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Checked In",
      value: appointments.filter(
        (a) => a.date === today && a.status === "Checked In"
      ).length,
      icon: Users,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Completed",
      value: appointments.filter(
        (a) => a.date === today && a.status === "Completed"
      ).length,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  const updateStatus = (
    id: string,
    status: AppointmentStatus
  ) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );
  };

  const handleAddAppointment = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.patient.trim() || !form.doctor.trim()) {
      return;
    }

    const newAppointment: Appointment = {
      ...form,
      id: `APT-${Date.now().toString().slice(-6)}`,
      status: "Scheduled",
    };

    setAppointments((current) => [
      newAppointment,
      ...current,
    ]);

    setShowModal(false);
    setForm(emptyAppointment);
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-cyan-400">
              Receptionist Workspace
            </p>

            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Appointments
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage patient appointments and daily schedules.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Plus size={18} />
            Add Appointment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    {stat.label}
                  </p>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
                  >
                    <Icon
                      size={21}
                      className={stat.color}
                    />
                  </div>
                </div>

                <p className="mt-4 text-3xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Appointment List */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Appointment List
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredAppointments.length} appointments found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search appointments..."
                  className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50 sm:w-64"
                />
              </div>

              <input
                type="date"
                value={dateFilter}
                onChange={(event) =>
                  setDateFilter(event.target.value)
                }
                className="h-11 rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-cyan-400/50"
              />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-11 rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-cyan-400/50"
              >
                <option value="All">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Checked In">Checked In</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-white/[0.025]">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4 font-medium">
                    Patient
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Appointment ID
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Doctor
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Date & Time
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Type
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>
                  <th className="px-5 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="transition hover:bg-white/[0.025]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-400">
                          {appointment.patient
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {appointment.patient}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {appointment.patientId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-400">
                      {appointment.id}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-300">
                        {appointment.doctor}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {appointment.department}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-300">
                        {appointment.date}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {appointment.time}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-400">
                      {appointment.type}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[appointment.status]}`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={appointment.status}
                          onChange={(event) =>
                            updateStatus(
                              appointment.id,
                              event.target.value as AppointmentStatus
                            )
                          }
                          aria-label={`Update ${appointment.id} status`}
                          className="max-w-[125px] rounded-lg border border-white/10 bg-slate-900 px-2 py-2 text-xs text-slate-300 outline-none focus:border-cyan-400/50"
                        >
                          <option value="Scheduled">
                            Scheduled
                          </option>
                          <option value="Checked In">
                            Checked In
                          </option>
                          <option value="Completed">
                            Completed
                          </option>
                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>

                        <button
                          onClick={() =>
                            setSelectedAppointment(appointment)
                          }
                          aria-label="View appointment"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-cyan-400"
                        >
                          <MoreHorizontal size={19} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredAppointments.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-14 text-center"
                    >
                      <CalendarDays
                        size={32}
                        className="mx-auto text-slate-600"
                      />

                      <p className="mt-3 text-sm font-medium text-slate-300">
                        No appointments found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-4">
            <p className="text-xs text-slate-500">
              Showing {filteredAppointments.length} appointments
            </p>

            <div className="flex gap-2">
              <button
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-600 disabled:opacity-50"
              >
                <ChevronLeft size={17} />
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400 text-sm font-semibold text-slate-950">
                1
              </button>

              <button
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-600 disabled:opacity-50"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Add Appointment
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter the patient and appointment details.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleAddAppointment}
              className="space-y-4 p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Patient Name
                  </label>

                  <input
                    required
                    value={form.patient}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        patient: event.target.value,
                      })
                    }
                    placeholder="Enter patient name"
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Patient ID
                  </label>

                  <input
                    value={form.patientId}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        patientId: event.target.value,
                      })
                    }
                    placeholder="PAT-1001"
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Phone
                  </label>

                  <input
                    value={form.phone}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        phone: event.target.value,
                      })
                    }
                    placeholder="Phone number"
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Doctor
                  </label>

                  <input
                    required
                    value={form.doctor}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        doctor: event.target.value,
                      })
                    }
                    placeholder="Dr. Name"
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Department
                  </label>

                  <select
                    value={form.department}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        department: event.target.value,
                      })
                    }
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-cyan-400/50"
                  >
                    <option>General Medicine</option>
                    <option>Cardiology</option>
                    <option>Dermatology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Pediatrics</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Date
                  </label>

                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        date: event.target.value,
                      })
                    }
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Time
                  </label>

                  <input
                    required
                    value={form.time}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        time: event.target.value,
                      })
                    }
                    placeholder="09:00 AM"
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Appointment Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        type: event.target.value,
                      })
                    }
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none focus:border-cyan-400/50"
                  >
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Emergency</option>
                    <option>Routine Checkup</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setForm(emptyAppointment);
                  }}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Appointment Details
              </h2>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {[
                ["Appointment ID", selectedAppointment.id],
                ["Patient", selectedAppointment.patient],
                ["Patient ID", selectedAppointment.patientId],
                ["Doctor", selectedAppointment.doctor],
                ["Department", selectedAppointment.department],
                ["Date", selectedAppointment.date],
                ["Time", selectedAppointment.time],
                ["Phone", selectedAppointment.phone || "Not provided"],
                ["Type", selectedAppointment.type],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-white/[0.06] pb-3"
                >
                  <span className="text-sm text-slate-500">
                    {label}
                  </span>

                  <span className="text-right text-sm font-medium text-slate-200">
                    {value}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm text-slate-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[selectedAppointment.status]}`}
                >
                  {selectedAppointment.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedAppointment(null)}
              className="mt-6 w-full rounded-xl bg-cyan-400 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
