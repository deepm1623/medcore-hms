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
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useNotifications } from "@/lib/notifications";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  const router = useRouter();

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
  } = useNotifications();

  /* =========================================================
     GO TO DOCTOR DASHBOARD
  ========================================================= */

  const handleBrandClick = () => {
    setShowNotifications(false);
    router.push("/dashboard/doctor");
  };

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
      return;
    }

    window.dispatchEvent(
      new Event("medcore:toggle-sidebar")
    );
  };

  /* =========================================================
     CLOSE NOTIFICATION PANEL WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [showNotifications]);

  /* =========================================================
     DOCTOR PROFILE / SETTINGS
  ========================================================= */

  const handleDoctorProfile = () => {
    setShowNotifications(false);
    router.push("/dashboard/doctor/settings");
  };

  /* =========================================================
     NOTIFICATION TOGGLE
  ========================================================= */

  const handleNotificationToggle = () => {
    setShowNotifications((current) => !current);
  };

  /* =========================================================
     MARK ALL READ
  ========================================================= */

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  /* =========================================================
     CLEAR ALL NOTIFICATIONS
  ========================================================= */

  const handleClearNotifications = () => {
    clearNotifications();
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        h-[76px]
        w-full
        border-b
        border-white/[0.08]
        bg-slate-950/95
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =====================================================
            MOBILE LEFT
        ====================================================== */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
            lg:hidden
          "
        >

          {/* Mobile menu */}

          <button
            type="button"
            onClick={handleMenuClick}
            aria-label="Open navigation menu"
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/30
              bg-slate-900
              text-slate-300
              shadow-[0_0_24px_rgba(6,182,212,0.18)]
              transition-all
              duration-200
              hover:border-cyan-400/60
              hover:bg-slate-800
              hover:text-cyan-400
              hover:shadow-[0_0_30px_rgba(6,182,212,0.30)]
              active:scale-95
            "
          >
            <Menu
              size={25}
              strokeWidth={2}
            />
          </button>

          {/* Mobile MedCore brand */}

          <button
            type="button"
            onClick={handleBrandClick}
            aria-label="Go to Doctor Dashboard"
            className="
              min-w-0
              cursor-pointer
              text-left
              outline-none
              transition-all
              duration-200
              hover:opacity-80
              focus-visible:rounded-lg
              focus-visible:ring-2
              focus-visible:ring-cyan-400/50
              active:scale-[0.98]
            "
          >
            <p
              className="
                truncate
                text-base
                font-semibold
                leading-tight
                text-white
              "
            >
              MedCore
            </p>

            <p
              className="
                truncate
                text-xs
                leading-tight
                text-slate-500
              "
            >
              Doctor Portal
            </p>
          </button>
        </div>

        {/* =====================================================
            DESKTOP LEFT
        ====================================================== */}

        <div
          className="
            hidden
            flex-1
            items-center
            gap-6
            lg:flex
          "
        >

          {/* Desktop MedCore brand */}

          <button
            type="button"
            onClick={handleBrandClick}
            aria-label="Go to Doctor Dashboard"
            className="
              shrink-0
              cursor-pointer
              text-left
              outline-none
              transition-all
              duration-200
              hover:opacity-80
              focus-visible:rounded-lg
              focus-visible:ring-2
              focus-visible:ring-cyan-400/50
              active:scale-[0.98]
            "
          >
            <p
              className="
                text-base
                font-semibold
                leading-tight
                text-white
              "
            >
              MedCore
            </p>

            <p
              className="
                text-xs
                leading-tight
                text-slate-500
              "
            >
              Doctor Portal
            </p>
          </button>

          {/* Desktop Search */}

          <div
            className="
              flex
              flex-1
              max-w-xl
            "
          >
            <div
              className="
                relative
                w-full
              "
            >
              <Search
                size={19}
                strokeWidth={1.8}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="search"
                placeholder="Search patients, appointments..."
                aria-label="Search patients and appointments"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/[0.10]
                  bg-white/[0.035]
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  transition-all
                  duration-200
                  focus:border-cyan-400/50
                  focus:bg-white/[0.05]
                  focus:ring-2
                  focus:ring-cyan-400/10
                "
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            sm:gap-4
          "
        >

          {/* ===================================================
              NOTIFICATIONS
          ==================================================== */}

          <div
            ref={notificationRef}
            className="relative"
          >

            {/* Notification button */}

            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              onClick={handleNotificationToggle}
              className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-slate-400
                transition-all
                duration-200
                hover:bg-white/[0.05]
                hover:text-cyan-400
                active:scale-95
              "
            >
              <Bell
                size={23}
                strokeWidth={1.8}
              />

              {/* Unread count */}

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    right-[4px]
                    top-[3px]
                    flex
                    h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-cyan-400
                    px-1
                    text-[9px]
                    font-bold
                    text-slate-950
                    ring-2
                    ring-slate-950
                  "
                >
                  {unreadCount > 9
                    ? "9+"
                    : unreadCount}
                </span>
              )}
            </button>

            {/* =================================================
                NOTIFICATION DROPDOWN
            ================================================== */}

            {showNotifications && (
              <div
                className="
                  absolute
                  right-0
                  top-[56px]
                  z-[100]
                  w-[calc(100vw-32px)]
                  max-w-[390px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.10]
                  bg-slate-950
                  shadow-2xl
                  shadow-black/60
                  sm:w-[390px]
                "
              >

                {/* Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.08]
                    px-5
                    py-4
                  "
                >
                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      Notifications
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      {unreadCount > 0
                        ? `${unreadCount} unread ${
                            unreadCount === 1
                              ? "notification"
                              : "notifications"
                          }`
                        : "You&apos;re all caught up"}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                    "
                  >

                    {/* Mark all read */}

                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="
                          rounded-lg
                          px-2
                          py-1.5
                          text-[11px]
                          font-medium
                          text-cyan-400
                          transition
                          hover:bg-cyan-400/10
                          hover:text-cyan-300
                        "
                      >
                        Mark all read
                      </button>
                    )}

                    {/* Close */}

                    <button
                      type="button"
                      onClick={() =>
                        setShowNotifications(false)
                      }
                      aria-label="Close notifications"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        transition
                        hover:bg-white/[0.05]
                        hover:text-white
                      "
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Notification list */}

                <div
                  className="
                    max-h-[420px]
                    overflow-y-auto
                  "
                >

                  {notifications.length === 0 ? (
                    <div
                      className="
                        px-6
                        py-14
                        text-center
                      "
                    >
                      <div
                        className="
                          mx-auto
                          mb-4
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-white/[0.04]
                        "
                      >
                        <Bell
                          size={22}
                          className="text-slate-600"
                        />
                      </div>

                      <p
                        className="
                          text-sm
                          font-medium
                          text-slate-300
                        "
                      >
                        No notifications
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-600
                        "
                      >
                        You&apos;re all caught up.
                      </p>
                    </div>
                  ) : (
                    notifications.map(
                      (notification) => (
                        <div
                          key={notification.id}
                          className={`
                            border-b
                            border-white/[0.06]
                            px-5
                            py-4
                            transition
                            hover:bg-white/[0.025]
                            ${
                              !notification.read
                                ? "bg-cyan-400/[0.025]"
                                : ""
                            }
                          `}
                        >
                          <div
                            className="
                              flex
                              gap-3
                            "
                          >

                            {/* Status dot */}

                            <div
                              className={`
                                mt-1.5
                                h-2
                                w-2
                                shrink-0
                                rounded-full
                                ${
                                  notification.read
                                    ? "bg-slate-700"
                                    : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                                }
                              `}
                            />

                            <div
                              className="
                                min-w-0
                                flex-1
                              "
                            >

                              {/* Title */}

                              <div
                                className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-3
                                "
                              >
                                <p
                                  className="
                                    text-sm
                                    font-semibold
                                    text-white
                                  "
                                >
                                  {notification.title}
                                </p>

                                <span
                                  className="
                                    shrink-0
                                    text-[10px]
                                    text-slate-600
                                  "
                                >
                                  {formatNotificationTime(
                                    notification.createdAt
                                  )}
                                </span>
                              </div>

                              {/* Message */}

                              <p
                                className="
                                  mt-1
                                  text-xs
                                  leading-5
                                  text-slate-400
                                "
                              >
                                {notification.message}
                              </p>

                              {/* Actions */}

                              <div
                                className="
                                  mt-3
                                  flex
                                  items-center
                                  gap-2
                                "
                              >

                                {/* Mark read */}

                                {!notification.read && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      markAsRead(
                                        notification.id
                                      )
                                    }
                                    className="
                                      inline-flex
                                      items-center
                                      gap-1
                                      rounded-lg
                                      border
                                      border-white/[0.08]
                                      px-2
                                      py-1
                                      text-[10px]
                                      font-medium
                                      text-slate-400
                                      transition
                                      hover:border-cyan-400/20
                                      hover:bg-cyan-400/5
                                      hover:text-cyan-400
                                    "
                                  >
                                    <Check size={12} />
                                    Mark read
                                  </button>
                                )}

                                {/* Remove */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeNotification(
                                      notification.id
                                    )
                                  }
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    rounded-lg
                                    px-2
                                    py-1
                                    text-[10px]
                                    font-medium
                                    text-slate-500
                                    transition
                                    hover:bg-red-500/10
                                    hover:text-red-400
                                  "
                                >
                                  <Trash2 size={12} />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>

                {/* Footer */}

                {notifications.length > 0 && (
                  <div
                    className="
                      border-t
                      border-white/[0.08]
                      p-3
                    "
                  >
                    <button
                      type="button"
                      onClick={handleClearNotifications}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        py-2.5
                        text-xs
                        font-medium
                        text-slate-500
                        transition
                        hover:bg-red-500/[0.06]
                        hover:text-red-400
                      "
                    >
                      <Trash2 size={14} />
                      Clear all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ===================================================
              DIVIDER
          ==================================================== */}

          <div
            className="
              hidden
              h-9
              w-px
              bg-white/[0.10]
              sm:block
            "
          />

          {/* ===================================================
              DOCTOR PROFILE
          ==================================================== */}

          <button
            type="button"
            onClick={handleDoctorProfile}
            aria-label="Open doctor settings"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              px-1
              py-1.5
              text-left
              transition-all
              duration-200
              hover:bg-white/[0.04]
              active:scale-[0.98]
            "
          >

            {/* Avatar */}

            <div
              className="
                flex
                h-11
                w-11
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
                shadow-lg
                shadow-blue-500/20
              "
            >
              DR
            </div>

            {/* Doctor details */}

            <div
              className="
                hidden
                min-w-0
                md:block
              "
            >
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

            {/* Arrow */}

            <ChevronDown
              size={17}
              strokeWidth={1.8}
              className="
                hidden
                text-slate-500
                md:block
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   NOTIFICATION TIME FORMATTER
========================================================= */

function formatNotificationTime(
  timestamp: number
): string {
  const difference = Date.now() - timestamp;

  if (difference < 60 * 1000) {
    return "Just now";
  }

  const minutes = Math.floor(
    difference / (60 * 1000)
  );

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days === 1) {
    return "Yesterday";
  }

  return `${days}d ago`;
}