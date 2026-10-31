"use client";

import {
  Beaker,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Pill,
  Settings,
  Users,
  Building2,
  UserCog,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardRole = "doctor" | "receptionist" | "admin";

interface SidebarProps {
  role?: DashboardRole;
}

export default function Sidebar({ role = "doctor" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isReceptionist = role === "receptionist";
  const isAdmin = role === "admin";

  const [isOpen, setIsOpen] = useState(false);

  const basePath = `/dashboard/${role}`;

  const navItems = isAdmin
    ? [
        { name: "Dashboard", href: basePath, icon: LayoutDashboard },
        { name: "Users", href: `${basePath}/users`, icon: UserCog },
        { name: "Doctors", href: `${basePath}/doctors`, icon: Users },
        { name: "Departments", href: `${basePath}/departments`, icon: Building2 },
        { name: "Patients", href: `${basePath}/patients`, icon: Users },
        { name: "Appointments", href: `${basePath}/appointments`, icon: CalendarDays },
        { name: "Reports", href: `${basePath}/reports`, icon: FileText },
      ]
    : isReceptionist
      ? [
          { name: "Dashboard", href: basePath, icon: LayoutDashboard },
          { name: "Patients", href: `${basePath}/patients`, icon: Users },
          { name: "Appointments", href: `${basePath}/appointments`, icon: CalendarDays },
        ]
      : [
          { name: "Dashboard", href: basePath, icon: LayoutDashboard },
          { name: "Patients", href: `${basePath}/patients`, icon: Users },
          { name: "Appointments", href: `${basePath}/appointments`, icon: CalendarDays },
          { name: "EMR", href: `${basePath}/emr`, icon: FileText },
          { name: "Lab Results", href: `${basePath}/lab-results`, icon: Beaker },
          { name: "Prescriptions", href: `${basePath}/prescriptions`, icon: Pill },
          { name: "Follow-ups", href: `${basePath}/follow-ups`, icon: ClipboardList },
        ];

  const settingsHref = `${basePath}/settings`;

  useEffect(() => {
    const toggleSidebar = () => setIsOpen((previous) => !previous);
    const closeSidebar = () => setIsOpen(false);

    window.addEventListener("medcore:toggle-sidebar", toggleSidebar);
    window.addEventListener("medcore:close-sidebar", closeSidebar);

    return () => {
      window.removeEventListener("medcore:toggle-sidebar", toggleSidebar);
      window.removeEventListener("medcore:close-sidebar", closeSidebar);
    };
  }, []);

  const isActive = (href: string) =>
    href === basePath
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const closeMobileSidebar = () => {
    setIsOpen(false);
    window.dispatchEvent(new Event("medcore:close-sidebar"));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("medcore_user");
    router.push(
      isAdmin
        ? "/login/admin"
        : isReceptionist
          ? "/login/receptionist"
          : "/login/doctor"
    );
  };

  const workspaceLabel = isAdmin
    ? "Administration"
    : isReceptionist
      ? "Reception Workspace"
      : "Clinical Workspace";

  const profileName = isAdmin
    ? "Administrator"
    : isReceptionist
      ? "Receptionist"
      : "Doctor Name";

  const profileRole = isAdmin
    ? "Hospital Admin"
    : isReceptionist
      ? "Front Desk"
      : "General Medicine";

  const profileInitials = isAdmin ? "AD" : isReceptionist ? "RC" : "DR";

  const navigation = (
    <div className="flex-1 overflow-y-auto px-4 py-6 [scrollbar-width:thin] [scrollbar-color:rgba(34,211,238,0.45)_transparent]">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {workspaceLabel}
      </p>

      <nav className="space-y-1.5">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMobileSidebar}
            className={`flex min-h-[52px] items-center gap-4 rounded-2xl px-4 text-sm font-medium transition ${
              isActive(href)
                ? "bg-cyan-400/10 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Icon size={21} strokeWidth={1.8} className="shrink-0" />
            <span>{name}</span>
          </Link>
        ))}
      </nav>

      <div className="my-7 h-px bg-white/5" />

      <Link
        href={settingsHref}
        onClick={closeMobileSidebar}
        className={`flex min-h-[52px] items-center gap-4 rounded-2xl px-4 text-sm font-medium transition ${
          isActive(settingsHref)
            ? "bg-cyan-400/10 text-cyan-400"
            : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
        }`}
      >
        <Settings size={21} strokeWidth={1.8} />
        <span>Settings</span>
      </Link>
    </div>
  );

  const profile = (
    <div className="shrink-0 border-t border-white/10 p-4">
      <div className="rounded-2xl bg-white/[0.035] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
            {profileInitials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {profileName}
            </p>
            <p className="truncate text-xs text-slate-500">{profileRole}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut size={18} />
        <span>Sign out</span>
      </button>
    </div>
  );

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[90] flex h-screen w-[320px] max-w-[88vw] flex-col border-r border-white/10 bg-slate-950 shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-24 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link
            href={basePath}
            onClick={closeMobileSidebar}
            className="flex h-full items-center"
          >
            <Image
              src="/medcore-logo.png"
              alt="MedCore HMS"
              width={180}
              height={90}
              priority
              className="max-h-20 w-[165px] object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close navigation menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {navigation}
        {profile}
      </aside>

      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col border-r border-white/10 bg-slate-950 lg:flex">
        <div className="flex h-24 shrink-0 items-center justify-center border-b border-white/10 px-5">
          <Link
            href={basePath}
            className="flex h-full w-full items-center justify-center"
          >
            <Image
              src="/medcore-logo.png"
              alt="MedCore HMS"
              width={190}
              height={90}
              priority
              className="h-[86px] w-auto object-contain"
            />
          </Link>
        </div>

        {navigation}
        {profile}
      </aside>
    </>
  );
}