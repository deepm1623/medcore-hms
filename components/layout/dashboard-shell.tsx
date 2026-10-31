"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

interface DashboardShellProps {
  children: ReactNode;
}

type DashboardRole = "doctor" | "receptionist" | "admin";

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const pathname = usePathname();

  const role: DashboardRole = pathname.startsWith("/dashboard/admin")
    ? "admin"
    : pathname.startsWith("/dashboard/receptionist")
      ? "receptionist"
      : "doctor";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar role={role} />

      <div className="min-h-screen min-w-0 lg:ml-72">
        <Topbar role={role} />

        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}