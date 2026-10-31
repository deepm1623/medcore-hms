
"use client";

import Link from "next/link";
import {
  Stethoscope,
  ClipboardList,
  ArrowRight,
  Hospital,
  ShieldCheck,
} from "lucide-react";

const roles = [
  {
    title: "Admin Portal",
    description:
      "Manage users, doctors, departments, patients, appointments, reports, and hospital settings.",
    href: "/dashboard/admin",
    icon: ShieldCheck,
  },
  {
    title: "Doctor Portal",
    description:
      "Access patient records, appointments, EMR, prescriptions, and clinical tools.",
    href: "/dashboard/doctor",
    icon: Stethoscope,
  },
  {
    title: "Receptionist Portal",
    description:
      "Manage patient registration, appointments, and front-desk operations.",
    href: "/dashboard/receptionist",
    icon: ClipboardList,
  },
];

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Hospital size={30} className="text-cyan-400" />
          </div>

          <p className="mt-6 text-sm font-medium text-cyan-400">
            MEDCORE HMS
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Select Your Portal
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
            Choose the workspace you want to access.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <Link
                key={role.title}
                href={role.href}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.04] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    <Icon size={27} />
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400"
                  />
                </div>

                <h2 className="mt-6 text-xl font-semibold">{role.title}</h2>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
                  {role.description}
                </p>

                <div className="mt-6 border-t border-white/[0.08] pt-4 text-sm font-medium text-cyan-400">
                  Open Portal
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-slate-600">
          MedCore Hospital Management System
        </p>
      </div>
    </main>
  );
}
