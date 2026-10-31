"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import {
  Search,
  Plus,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Filter,
  Eye,
  UserRound,
  Stethoscope,
} from "lucide-react";

type AppointmentStatus =
  | "Scheduled"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "No-show";

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
  notes: string;
};

const initialAppointments: Appointment[] = [
  {
    id: "APT-2001",
    patient: "Aarav Patel",
    patientId: "PAT-1001",
    doctor: "Dr. Aarav Shah",
    department: "Cardiology",
    date: "2026-11-02",
    time: "09:00",
    type: "Follow-up",
    status: "Confirmed",
    notes: "Routine cardiac follow-up.",
  },
  {
    id: "APT-2002",
    patient: "Diya Shah",
    patientId: "PAT-1002",
    doctor: "Dr. Meera Patel",
    department: "Neurology",
    date: "2026-11-02",
    time: "09:30",
    type: "Consultation",
    status: "Scheduled",
    notes: "Initial neurological consultation.",
  },
  {
    id: "APT-2003",
    patient: "Vivaan Mehta",
    patientId: "PAT-1003",
    doctor: "Dr. Rohan Mehta",
    department: "Orthopedics",
    date: "2026-11-03",
    time: "10:00",
    type: "Follow-up",
    status: "Completed",
    notes: "Post-treatment review.",
  },
  {
    id: "APT-2004",
    patient: "Anaya Desai",
    patientId: "PAT-1004",
    doctor: "Dr. Ananya Desai",
    department: "Pediatrics",
    date: "2026-11-03",
    time: "11:15",
    type: "Consultation",
    status: "Confirmed",
    notes: "Routine pediatric check-up.",
  },
  {
    id: "APT-2005",
    patient: "Ishaan Joshi",
    patientId: "PAT-1005",
    doctor: "Dr. Ishita Joshi",
    department: "Dermatology",
    date: "2026-11-04",
    time: "13:00",
    type: "Consultation",
    status: "Cancelled",
    notes: "Patient requested cancellation.",
  },
  {
    id: "APT-2006",
    patient: "Kiara Trivedi",
    patientId: "PAT-1006",
    doctor: "Dr. Karan Trivedi",
    department: "General Medicine",
    date: "2026-11-04",
    time: "14:30",
    type: "Follow-up",
    status: "Scheduled",
    notes: "Review test results.",
  },
  {
    id: "APT-2007",
    patient: "Riya Mehta",
    patientId: "PAT-1007",
    doctor: "Dr. Aarav Shah",
    department: "Cardiology",
    date: "2026-11-05",
    time: "15:00",
    type: "Consultation",
    status: "No-show",
    notes: "Patient did not attend.",
  },
];

const emptyAppointment: Appointment = {
  id: "",
  patient: "",
  patientId: "",
  doctor: "",
  department: "",
  date: "",
  time: "",
  type: "Consultation",
  status: "Scheduled",
  notes: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0b1424] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10";

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
];

const doctors = [
  "Dr. Aarav Shah",
  "Dr. Meera Patel",
  "Dr. Rohan Mehta",
  "Dr. Ananya Desai",
  "Dr. Ishita Joshi",
  "Dr. Karan Trivedi",
];

const patients = [
  { id: "PAT-1001", name: "Aarav Patel" },
  { id: "PAT-1002", name: "Diya Shah" },
  { id: "PAT-1003", name: "Vivaan Mehta" },
  { id: "PAT-1004", name: "Anaya Desai" },
  { id: "PAT-1005", name: "Ishaan Joshi" },
  { id: "PAT-1006", name: "Kiara Trivedi" },
  { id: "PAT-1007", name: "Riya Mehta" },
];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | AppointmentStatus
  >("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [viewAppointment, setViewAppointment] =
    useState<Appointment | null>(null);
  const [form, setForm] = useState<Appointment>(emptyAppointment);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesSearch =
        !query ||
        appointment.patient.toLowerCase().includes(query) ||
        appointment.patientId.toLowerCase().includes(query) ||
        appointment.doctor.toLowerCase().includes(query) ||
        appointment.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        appointment.department === departmentFilter;

      const matchesDate = !dateFilter || appointment.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesDate
      );
    });
  }, [appointments, search, statusFilter, departmentFilter, dateFilter]);

  const scheduledCount = appointments.filter(
    (a) => a.status === "Scheduled"
  ).length;
  const confirmedCount = appointments.filter(
    (a) => a.status === "Confirmed"
  ).length;
  const completedCount = appointments.filter(
    (a) => a.status === "Completed"
  ).length;
  const cancelledCount = appointments.filter(
    (a) => a.status === "Cancelled"
  ).length;

  function openAddModal() {
    setEditingAppointment(null);
    setForm({ ...emptyAppointment });
    setModalOpen(true);
  }

  function openEditModal(appointment: Appointment) {
    setEditingAppointment(appointment);
    setForm({ ...appointment });
    setMenuId(null);
    setViewAppointment(null);
    setModalOpen(true);
  }

  function handlePatientChange(patientId: string) {
    const selectedPatient = patients.find((patient) => patient.id === patientId);
    setForm((current) => ({
      ...current,
      patientId,
      patient: selectedPatient?.name ?? "",
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingAppointment) {
      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === editingAppointment.id
            ? { ...form, id: editingAppointment.id }
            : appointment
        )
      );
    } else {
      const newAppointment: Appointment = {
        ...form,
        id: `APT-${String(Date.now()).slice(-6)}`,
      };
      setAppointments((current) => [newAppointment, ...current]);
    }

    setModalOpen(false);
    setEditingAppointment(null);
    setForm({ ...emptyAppointment });
  }

  function updateStatus(
    appointment: Appointment,
    status: AppointmentStatus
  ) {
    setAppointments((current) =>
      current.map((item) =>
        item.id === appointment.id ? { ...item, status } : item
      )
    );
    setMenuId(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;

    setAppointments((current) =>
      current.filter((appointment) => appointment.id !== deleteTarget.id)
    );
    setDeleteTarget(null);
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-7 pb-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm text-slate-400">
              Admin <span className="mx-2 text-slate-600">/</span> Appointments
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Appointments
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Schedule and manage patient appointments across departments.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Plus size={18} />
            New Appointment
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Appointments"
            value={appointments.length}
            icon={<CalendarDays size={20} />}
            accent="cyan"
          />
          <SummaryCard
            label="Scheduled"
            value={scheduledCount}
            icon={<Clock size={20} />}
            accent="blue"
          />
          <SummaryCard
            label="Confirmed"
            value={confirmedCount}
            icon={<CheckCircle2 size={20} />}
            accent="emerald"
          />
          <SummaryCard
            label="Completed"
            value={completedCount}
            icon={<CheckCircle2 size={20} />}
            accent="violet"
          />
        </div>

        {/* Appointment table */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111c2e]/80 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-white">All Appointments</h2>
              <p className="mt-1 text-sm text-slate-400">
                {filteredAppointments.length} appointments found
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
                  placeholder="Search appointments..."
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
                    setStatusFilter(
                      event.target.value as "All" | AppointmentStatus
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#0b1424] py-2.5 pl-9 pr-8 text-sm text-slate-300 outline-none focus:border-cyan-400/50 sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="No-show">No-show</option>
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

              <input
                type="date"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                aria-label="Filter by appointment date"
                className="w-full rounded-xl border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-cyan-400/50 sm:w-40"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-white/[0.02]">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-medium">Patient</th>
                  <th className="px-6 py-4 font-medium">Doctor</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="transition hover:bg-white/[0.025]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={appointment.patient} />
                        <div>
                          <p className="font-medium text-slate-100">
                            {appointment.patient}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {appointment.patientId} · {appointment.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-200">
                        {appointment.doctor}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300">
                        {appointment.department}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="inline-flex items-center gap-2 text-sm text-slate-300">
                        <CalendarDays size={15} className="text-slate-500" />
                        {formatDate(appointment.date)}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-2 pl-5 text-xs text-slate-500">
                        <Clock size={13} />
                        {formatTime(appointment.time)}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-300">
                      {appointment.type}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={appointment.status} />
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setMenuId(
                            menuId === appointment.id ? null : appointment.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        aria-label={`Actions for ${appointment.id}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {menuId === appointment.id && (
                        <div className="absolute right-8 top-12 z-20 w-52 rounded-xl border border-white/10 bg-[#172337] p-1.5 text-left shadow-2xl">
                          <button
                            onClick={() => {
                              setViewAppointment(appointment);
                              setMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white"
                          >
                            <Eye size={15} />
                            View details
                          </button>
                          <button
                            onClick={() => openEditModal(appointment)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white"
                          >
                            <Pencil size={15} />
                            Edit appointment
                          </button>
                          <div className="my-1 border-t border-white/[0.08]" />
                          {(
                            [
                              "Scheduled",
                              "Confirmed",
                              "Completed",
                              "Cancelled",
                              "No-show",
                            ] as AppointmentStatus[]
                          ).map((status) => (
                            <button
                              key={status}
                              onClick={() => updateStatus(appointment, status)}
                              className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/[0.06] hover:text-white"
                            >
                              Set {status}
                            </button>
                          ))}
                          <div className="my-1 border-t border-white/[0.08]" />
                          <button
                            onClick={() => {
                              setDeleteTarget(appointment);
                              setMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-rose-300 hover:bg-rose-400/10"
                          >
                            <Trash2 size={15} />
                            Delete appointment
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredAppointments.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <CalendarDays
                        size={30}
                        className="mx-auto mb-3 text-slate-600"
                      />
                      <p className="font-medium text-slate-300">
                        No appointments found
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
              Showing {filteredAppointments.length} of {appointments.length} appointments
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
                  {editingAppointment
                    ? "Edit Appointment"
                    : "New Appointment"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter the appointment details below.
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
                <FormField label="Patient">
                  <select
                    required
                    value={form.patientId}
                    onChange={(event) => handlePatientChange(event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} ({patient.id})
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Doctor">
                  <select
                    required
                    value={form.doctor}
                    onChange={(event) =>
                      setForm({ ...form, doctor: event.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Select doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor} value={doctor}>
                        {doctor}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Department">
                  <select
                    required
                    value={form.department}
                    onChange={(event) =>
                      setForm({ ...form, department: event.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Select department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Appointment Type">
                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm({ ...form, type: event.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Routine Check-up">Routine Check-up</option>
                  </select>
                </FormField>

                <FormField label="Date">
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm({ ...form, date: event.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Time">
                  <input
                    required
                    type="time"
                    value={form.time}
                    onChange={(event) =>
                      setForm({ ...form, time: event.target.value })
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
                        status: event.target.value as AppointmentStatus,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No-show">No-show</option>
                  </select>
                </FormField>
              </div>

              <FormField label="Notes">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(event) =>
                    setForm({ ...form, notes: event.target.value })
                  }
                  placeholder="Additional appointment notes..."
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
                  {editingAppointment
                    ? "Save Changes"
                    : "Create Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment details modal */}
      {viewAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#111c2e] shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/[0.08] px-6 py-5">
              <div>
                <p className="text-xs text-slate-500">
                  {viewAppointment.id}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  Appointment Details
                </h2>
              </div>
              <button
                onClick={() => setViewAppointment(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <DetailItem label="Patient">
                <span className="inline-flex items-center gap-2">
                  <UserRound size={15} />
                  {viewAppointment.patient}
                </span>
              </DetailItem>
              <DetailItem label="Patient ID">
                {viewAppointment.patientId}
              </DetailItem>
              <DetailItem label="Doctor">
                <span className="inline-flex items-center gap-2">
                  <Stethoscope size={15} />
                  {viewAppointment.doctor}
                </span>
              </DetailItem>
              <DetailItem label="Department">
                {viewAppointment.department}
              </DetailItem>
              <DetailItem label="Date">
                {formatDate(viewAppointment.date)}
              </DetailItem>
              <DetailItem label="Time">
                {formatTime(viewAppointment.time)}
              </DetailItem>
              <DetailItem label="Appointment Type">
                {viewAppointment.type}
              </DetailItem>
              <DetailItem label="Status">
                <StatusBadge status={viewAppointment.status} />
              </DetailItem>
              <div className="sm:col-span-2">
                <DetailItem label="Notes">
                  {viewAppointment.notes || "No notes added."}
                </DetailItem>
              </div>
            </div>

            <div className="flex justify-end border-t border-white/[0.08] p-5">
              <button
                onClick={() => openEditModal(viewAppointment)}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
              >
                <Pencil size={15} />
                Edit Appointment
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
            <h2 className="text-lg font-semibold text-white">
              Delete appointment?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Are you sure you want to delete appointment{" "}
              <span className="font-medium text-slate-200">
                {deleteTarget.id}
              </span>{" "}
              for {deleteTarget.patient}? This action cannot be undone.
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
  accent: "cyan" | "blue" | "emerald" | "violet";
}) {
  const accents = {
    cyan: "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
    blue: "border-blue-400/15 bg-blue-400/10 text-blue-300",
    emerald: "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
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

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-sm font-semibold text-cyan-300">
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const styles: Record<AppointmentStatus, string> = {
    Scheduled: "border-blue-400/20 bg-blue-400/10 text-blue-300",
    Confirmed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Completed: "border-violet-400/20 bg-violet-400/10 text-violet-300",
    Cancelled: "border-slate-400/20 bg-slate-400/10 text-slate-400",
    "No-show": "border-rose-400/20 bg-rose-400/10 text-rose-300",
  };

  const dotStyles: Record<AppointmentStatus, string> = {
    Scheduled: "bg-blue-400",
    Confirmed: "bg-emerald-400",
    Completed: "bg-violet-400",
    Cancelled: "bg-slate-500",
    "No-show": "bg-rose-400",
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

function formatTime(time: string) {
  if (!time) return "—";
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}