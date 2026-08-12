"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="min-h-screen lg:pl-64">

        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="px-6 py-8">
          {children}
        </main>

      </div>

    </div>
  );
}