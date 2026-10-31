
"use client";

import {
  Bell,
  Check,
  ChevronDown,
  Menu,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  formatNotificationTime,
  useNotifications,
} from "@/lib/notifications";

type DashboardRole = "doctor" | "receptionist" | "admin";

interface TopbarProps {
  onMenuClick?: () => void;
  role?: DashboardRole;
}

export default function Topbar({
  onMenuClick,
  role = "doctor",
}: TopbarProps) {
  const router = useRouter();

  const isAdmin = role === "admin";
  const isReceptionist = role === "receptionist";

  const roleName = isAdmin
    ? "Administrator"
    : isReceptionist
      ? "Receptionist"
      : "Doctor";

  const portalName = isAdmin
    ? "Admin Portal"
    : isReceptionist
      ? "Reception Portal"
      : "Doctor Portal";

  const profileRole = isAdmin
    ? "Hospital Admin"
    : isReceptionist
      ? "Front Desk"
      : "General Medicine";

  const initials = isAdmin ? "AD" : isReceptionist ? "RC" : "DR";
  const basePath = `/dashboard/${role}`;

  const notificationRef = useRef<HTMLDivElement>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
  } = useNotifications();

  const handleBrandClick = () => {
    setShowNotifications(false);
    router.push(basePath);
  };

  const handleProfileClick = () => {
    setShowNotifications(false);
    router.push(`${basePath}/settings`);
  };

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
      return;
    }

    window.dispatchEvent(new Event("medcore:toggle-sidebar"));
  };

  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showNotifications]);

  return (
    <header className="sticky top-0 z-50 h-[76px] w-full border-b border-white/[0.08] bg-slate-950/95 backdrop-blur-xl">
      <div className="flex h-full w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile brand and menu */}
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={handleMenuClick}
            aria-label="Open navigation menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-slate-900 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            <Menu size={24} />
          </button>

          <button
            type="button"
            onClick={handleBrandClick}
            className="min-w-0 text-left transition hover:opacity-80"
          >
            <p className="truncate text-base font-semibold leading-tight text-white">
              MedCore
            </p>
            <p className="truncate text-xs leading-tight text-slate-500">
              {portalName}
            </p>
          </button>
        </div>

        {/* Desktop brand and search */}
        <div className="hidden min-w-0 flex-1 items-center gap-6 lg:flex">
          <button
            type="button"
            onClick={handleBrandClick}
            className="shrink-0 text-left transition hover:opacity-80"
          >
            <p className="text-base font-semibold leading-tight text-white">
              MedCore
            </p>
            <p className="text-xs leading-tight text-slate-500">
              {portalName}
            </p>
          </button>

          <div className="relative w-full max-w-2xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              placeholder="Search patients, appointments..."
              aria-label="Search patients and appointments"
              className="h-12 w-full rounded-xl border border-white/[0.10] bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>
        </div>

        {/* Notifications and profile */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <div ref={notificationRef} className="relative">
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              onClick={() => setShowNotifications((current) => !current)}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/[0.05] hover:text-cyan-400"
            >
              <Bell size={23} strokeWidth={1.8} />

              {unreadCount > 0 && (
                <span className="absolute right-[3px] top-[2px] flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-400 px-1 text-[9px] font-bold text-slate-950 ring-2 ring-slate-950">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                role="dialog"
                aria-label="Notifications"
                className="fixed left-3 right-3 top-[84px] z-[100] flex max-h-[calc(100vh-100px)] flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-slate-950 shadow-2xl shadow-black/70 sm:absolute sm:left-auto sm:right-0 sm:top-[56px] sm:w-[390px]"
              >
                <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-5">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                      Notifications
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {unreadCount > 0
                        ? `${unreadCount} unread ${
                            unreadCount === 1
                              ? "notification"
                              : "notifications"
                          }`
                        : "You're all caught up"}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="rounded-lg px-2 py-1.5 text-[11px] font-medium text-cyan-400 transition hover:bg-cyan-400/10"
                      >
                        Mark all read
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      aria-label="Close notifications"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-6 py-14 text-center">
                      <Bell
                        size={24}
                        className="mx-auto mb-4 text-slate-600"
                      />
                      <p className="text-sm font-medium text-slate-300">
                        No notifications
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        You &apos;re all caught up.
                      </p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border-b border-white/[0.06] px-4 py-4 transition hover:bg-white/[0.025] sm:px-5 ${
                          !notification.read ? "bg-cyan-400/[0.025]" : ""
                        }`}
                      >
                        <div className="flex min-w-0 gap-3">
                          <div
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                              notification.read
                                ? "bg-slate-700"
                                : "bg-cyan-400"
                            }`}
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                              <p className="break-words text-sm font-semibold leading-5 text-white">
                                {notification.title}
                              </p>
                              <span className="shrink-0 text-[10px] text-slate-600">
                                {formatNotificationTime(
                                  notification.createdAt
                                )}
                              </span>
                            </div>

                            <p className="mt-1 break-words text-xs leading-5 text-slate-400">
                              {notification.message}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {!notification.read && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    markAsRead(notification.id)
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[10px] font-medium text-slate-400 transition hover:text-cyan-400"
                                >
                                  <Check size={12} />
                                  Mark read
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  removeNotification(notification.id)
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                              >
                                <Trash2 size={12} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="shrink-0 border-t border-white/[0.08] p-3">
                    <button
                      type="button"
                      onClick={clearNotifications}
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-medium text-slate-500 transition hover:bg-red-500/[0.06] hover:text-red-400"
                    >
                      <Trash2 size={14} />
                      Clear all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden h-9 w-px bg-white/[0.10] sm:block" />

          <button
            type="button"
            onClick={handleProfileClick}
            aria-label={`Open ${roleName.toLowerCase()} settings`}
            className="flex items-center gap-2 rounded-xl px-1 py-1.5 text-left transition hover:bg-white/[0.04]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
              {initials}
            </div>

            <div className="hidden min-w-0 md:block">
              <p className="truncate text-sm font-semibold text-white">
                {roleName}
              </p>
              <p className="truncate text-xs text-slate-500">
                {profileRole}
              </p>
            </div>

            <ChevronDown
              size={17}
              className="hidden text-slate-500 md:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
