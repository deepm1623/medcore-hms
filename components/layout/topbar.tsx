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

import {
  formatNotificationTime,
  useNotifications,
} from "@/lib/notifications";

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
     CLOSE NOTIFICATIONS WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    if (!showNotifications) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [showNotifications]);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!showNotifications) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [showNotifications]);

  /* =========================================================
     DOCTOR PROFILE
  ========================================================= */

  const handleDoctorProfile = () => {
    setShowNotifications(false);

    router.push(
      "/dashboard/doctor/settings"
    );
  };

  /* =========================================================
     NOTIFICATION TOGGLE
  ========================================================= */

  const handleNotificationToggle = () => {
    setShowNotifications(
      (current) => !current
    );
  };

  /* =========================================================
     MARK ALL READ
  ========================================================= */

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  /* =========================================================
     CLEAR ALL
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
          gap-3
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =====================================================
            MOBILE BRAND / MENU
        ====================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-1
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
              active:scale-95
            "
          >
            <Menu
              size={25}
              strokeWidth={2}
            />
          </button>

          {/* Brand */}

          <button
            type="button"
            onClick={handleBrandClick}
            aria-label="Go to Doctor Dashboard"
            className="
              min-w-0
              cursor-pointer
              text-left
              outline-none
              transition
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
            DESKTOP BRAND + SEARCH
        ====================================================== */}

        <div
          className="
            hidden
            min-w-0
            flex-1
            items-center
            gap-6
            lg:flex
          "
        >
          {/* Desktop brand */}

          <button
            type="button"
            onClick={handleBrandClick}
            aria-label="Go to Doctor Dashboard"
            className="
              shrink-0
              cursor-pointer
              text-left
              outline-none
              transition
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

          {/* Search */}

          <div
            className="
              flex
              min-w-0
              flex-1
              max-w-2xl
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
            gap-1
            sm:gap-3
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
              aria-haspopup="dialog"
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

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    right-[3px]
                    top-[2px]
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
                NOTIFICATION PANEL

                IMPORTANT:
                Mobile = fixed to viewport
                Desktop = absolute to notification button

                This prevents the panel from going
                outside the screen.
            ================================================== */}

            {showNotifications && (
              <div
                role="dialog"
                aria-label="Notifications"
                className="
                  fixed
                  left-3
                  right-3
                  top-[84px]
                  z-[100]
                  flex
                  max-h-[calc(100vh-100px)]
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.10]
                  bg-slate-950
                  shadow-2xl
                  shadow-black/70
                  backdrop-blur-xl

                  sm:absolute
                  sm:left-auto
                  sm:right-0
                  sm:top-[56px]
                  sm:w-[390px]
                  sm:max-h-[calc(100vh-90px)]
                "
              >

                {/* =================================================
                    HEADER
                ================================================== */}

                <div
                  className="
                    flex
                    shrink-0
                    items-start
                    justify-between
                    gap-3
                    border-b
                    border-white/[0.08]
                    px-4
                    py-4
                    sm:px-5
                  "
                >
                  <div className="min-w-0">
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
                        : "You're all caught up"}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                    "
                  >
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
                          active:scale-95
                        "
                      >
                        Mark all read
                      </button>
                    )}

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
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        transition
                        hover:bg-white/[0.05]
                        hover:text-white
                        active:scale-95
                      "
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

                {/* =================================================
                    NOTIFICATION LIST
                ================================================== */}

                <div
                  className="
                    min-h-0
                    flex-1
                    overflow-x-hidden
                    overflow-y-auto
                    overscroll-contain
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
                        You're all caught up.
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
                            px-4
                            py-4
                            transition
                            hover:bg-white/[0.025]
                            sm:px-5
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
                              min-w-0
                              gap-3
                            "
                          >
                            {/* Status */}

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

                            {/* Content */}

                            <div
                              className="
                                min-w-0
                                flex-1
                              "
                            >
                              {/* Title + time */}

                              <div
                                className="
                                  flex
                                  min-w-0
                                  flex-col
                                  gap-1
                                  sm:flex-row
                                  sm:items-start
                                  sm:justify-between
                                  sm:gap-3
                                "
                              >
                                <p
                                  className="
                                    min-w-0
                                    break-words
                                    text-sm
                                    font-semibold
                                    leading-5
                                    text-white
                                  "
                                >
                                  {
                                    notification.title
                                  }
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
                                  break-words
                                  text-xs
                                  leading-5
                                  text-slate-400
                                "
                              >
                                {
                                  notification.message
                                }
                              </p>

                              {/* Actions */}

                              <div
                                className="
                                  mt-3
                                  flex
                                  flex-wrap
                                  items-center
                                  gap-2
                                "
                              >
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
                                      gap-1.5
                                      rounded-lg
                                      border
                                      border-white/[0.08]
                                      px-2.5
                                      py-1.5
                                      text-[10px]
                                      font-medium
                                      text-slate-400
                                      transition
                                      hover:border-cyan-400/20
                                      hover:bg-cyan-400/5
                                      hover:text-cyan-400
                                      active:scale-95
                                    "
                                  >
                                    <Check
                                      size={12}
                                    />

                                    Mark read
                                  </button>
                                )}

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
                                    gap-1.5
                                    rounded-lg
                                    px-2.5
                                    py-1.5
                                    text-[10px]
                                    font-medium
                                    text-slate-500
                                    transition
                                    hover:bg-red-500/10
                                    hover:text-red-400
                                    active:scale-95
                                  "
                                >
                                  <Trash2
                                    size={12}
                                  />

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

                {/* =================================================
                    FOOTER
                ================================================== */}

                {notifications.length > 0 && (
                  <div
                    className="
                      shrink-0
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
                        active:scale-[0.99]
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