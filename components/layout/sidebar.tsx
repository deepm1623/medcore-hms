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
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard/doctor",
    icon: LayoutDashboard,
  },
  {
    name: "Patients",
    href: "/dashboard/doctor/patients",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/dashboard/doctor/appointments",
    icon: CalendarDays,
  },
  {
    name: "EMR",
    href: "/dashboard/doctor/emr",
    icon: FileText,
  },
  {
    name: "Lab Results",
    href: "/dashboard/doctor/lab-results",
    icon: Beaker,
  },
  {
    name: "Prescriptions",
    href: "/dashboard/doctor/prescriptions",
    icon: Pill,
  },
  {
    name: "Follow-ups",
    href: "/dashboard/doctor/follow-ups",
    icon: ClipboardList,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  /*
   * The hamburger button is now controlled by Topbar.
   * Topbar dispatches:
   * "medcore:toggle-sidebar"
   */
  useEffect(() => {
    const toggleSidebar = () => {
      setIsOpen((previous) => !previous);
    };

    const closeSidebar = () => {
      setIsOpen(false);
    };

    window.addEventListener(
      "medcore:toggle-sidebar",
      toggleSidebar
    );

    window.addEventListener(
      "medcore:close-sidebar",
      closeSidebar
    );

    return () => {
      window.removeEventListener(
        "medcore:toggle-sidebar",
        toggleSidebar
      );

      window.removeEventListener(
        "medcore:close-sidebar",
        closeSidebar
      );
    };
  }, []);

  /*
   * Dashboard must ONLY be active on:
   * /dashboard/doctor
   *
   * Patients must ONLY be active on:
   * /dashboard/doctor/patients
   */
  const isActive = (href: string) => {
    if (href === "/dashboard/doctor") {
      return pathname === "/dashboard/doctor";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const closeMobileSidebar = () => {
    setIsOpen(false);

    window.dispatchEvent(
      new Event("medcore:close-sidebar")
    );
  };

  const handleLogout = () => {
    sessionStorage.removeItem("medcore_user");
    router.push("/login/doctor");
  };

  return (
    <>
      {/* =========================================================
          MOBILE OVERLAY
      ========================================================== */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={closeMobileSidebar}
          className="
            fixed
            inset-0
            z-[80]
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =========================================================
          MOBILE SIDEBAR
      ========================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[90]
          flex
          h-screen
          w-[320px]
          max-w-[88vw]
          flex-col
          border-r
          border-white/10
          bg-slate-950
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          lg:hidden
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Mobile Logo Header */}

        <div
          className="
            relative
            flex
            h-28
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-5
          "
        >
          <Link
            href="/dashboard/doctor"
            onClick={closeMobileSidebar}
            className="flex h-full items-center"
          >
            <Image
              src="/medcore-logo.png"
              alt="MedCore HMS"
              width={180}
              height={90}
              priority
              className="
                h-auto
                max-h-24
                w-[165px]
                object-contain
              "
            />
          </Link>

          {/* Close button */}

          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close navigation menu"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-4
            py-6

            [scrollbar-width:thin]
            [scrollbar-color:rgba(34,211,238,0.45)_transparent]

            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-cyan-400/40
            hover:[&::-webkit-scrollbar-thumb]:bg-cyan-400/60
          "
        >
          <p
            className="
              mb-4
              px-2
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Clinical Workspace
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileSidebar}
                  className={`
                    flex
                    min-h-[52px]
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    text-sm
                    font-medium
                    transition

                    ${
                      active
                        ? `
                          bg-cyan-400/10
                          text-cyan-400
                          shadow-[0_0_25px_rgba(34,211,238,0.08)]
                        `
                        : `
                          text-slate-400
                          hover:bg-white/[0.04]
                          hover:text-white
                        `
                    }
                  `}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Divider */}

          <div className="my-7 h-px bg-white/5" />

          {/* Settings */}

          <Link
            href="/dashboard/doctor/settings"
            onClick={closeMobileSidebar}
            className={`
              flex
              min-h-[52px]
              items-center
              gap-4
              rounded-2xl
              px-4
              text-sm
              font-medium
              transition

              ${
                pathname.startsWith(
                  "/dashboard/doctor/settings"
                )
                  ? "bg-cyan-400/10 text-cyan-400"
                  : `
                    text-slate-400
                    hover:bg-white/[0.04]
                    hover:text-white
                  `
              }
            `}
          >
            <Settings
              size={21}
              strokeWidth={1.8}
            />

            <span>Settings</span>
          </Link>
        </div>

        {/* =====================================================
            MOBILE DOCTOR PROFILE
        ====================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-4
          "
        >
          <div
            className="
              rounded-2xl
              bg-white/[0.035]
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-400
                  to-blue-600
                  text-sm
                  font-bold
                  text-white
                "
              >
                DR
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Doctor Name
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  General Medicine
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-3
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              text-slate-500
              transition
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <LogOut size={18} />

            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================== */}

      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          hidden
          h-screen
          w-72
          flex-col
          border-r
          border-white/10
          bg-slate-950
          lg:flex
        "
      >
        {/* Desktop Logo */}

        <div
          className="
            flex
            h-24
            shrink-0
            items-center
            justify-center
            border-b
            border-white/10
            px-5
          "
        >
          <Link
            href="/dashboard/doctor"
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
            "
          >
            <Image
              src="/medcore-logo.png"
              alt="MedCore HMS"
              width={190}
              height={90}
              priority
              className="
                h-[86px]
                w-auto
                object-contain
              "
            />
          </Link>
        </div>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-4
            py-6

            [scrollbar-width:thin]
            [scrollbar-color:rgba(34,211,238,0.45)_transparent]

            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-cyan-400/40
            hover:[&::-webkit-scrollbar-thumb]:bg-cyan-400/60
          "
        >
          <p
            className="
              mb-4
              px-3
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Clinical Workspace
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex
                    min-h-[52px]
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    text-sm
                    font-medium
                    transition

                    ${
                      active
                        ? `
                          bg-cyan-400/10
                          text-cyan-400
                          shadow-[0_0_25px_rgba(34,211,238,0.08)]
                        `
                        : `
                          text-slate-400
                          hover:bg-white/[0.04]
                          hover:text-white
                        `
                    }
                  `}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="my-7 h-px bg-white/5" />

          {/* Settings */}

          <Link
            href="/dashboard/doctor/settings"
            className={`
              flex
              min-h-[52px]
              items-center
              gap-4
              rounded-2xl
              px-4
              text-sm
              font-medium
              transition

              ${
                pathname.startsWith(
                  "/dashboard/doctor/settings"
                )
                  ? "bg-cyan-400/10 text-cyan-400"
                  : `
                    text-slate-400
                    hover:bg-white/[0.04]
                    hover:text-white
                  `
              }
            `}
          >
            <Settings
              size={21}
              strokeWidth={1.8}
            />

            <span>Settings</span>
          </Link>
        </div>

        {/* =====================================================
            DESKTOP DOCTOR PROFILE
        ====================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-4
          "
        >
          <div
            className="
              rounded-2xl
              bg-white/[0.035]
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-400
                  to-blue-600
                  text-sm
                  font-bold
                  text-white
                "
              >
                DR
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Doctor Name
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  General Medicine
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-3
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              text-slate-500
              transition
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <LogOut size={18} />

            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}