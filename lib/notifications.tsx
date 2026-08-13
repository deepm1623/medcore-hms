"use client";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: number;
  read: boolean;
}

interface ShowNotificationOptions {
  type?: NotificationType;
  title: string;
  message: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;

  showNotification: (
    options: ShowNotificationOptions
  ) => void;

  markAsRead: (id: string) => void;

  markAllAsRead: () => void;

  removeNotification: (id: string) => void;

  clearNotifications: () => void;
}

const NotificationContext =
  createContext<NotificationContextType | null>(null);

const STORAGE_KEY = "medcore_notifications";

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notification-1",
    type: "info",
    title: "New appointment scheduled",
    message:
      "Aarav Patel has an appointment scheduled for 09:00 AM.",
    createdAt: Date.now() - 1000 * 60 * 8,
    read: false,
  },
  {
    id: "notification-2",
    type: "success",
    title: "Lab result available",
    message:
      "HbA1c result for Aarav Patel is ready for review.",
    createdAt: Date.now() - 1000 * 60 * 25,
    read: false,
  },
  {
    id: "notification-3",
    type: "warning",
    title: "Follow-up reminder",
    message:
      "Ananya Shah has a follow-up scheduled for today.",
    createdAt: Date.now() - 1000 * 60 * 45,
    read: false,
  },
];

/* =========================================================
   TIME FORMATTER
========================================================= */

export function formatNotificationTime(
  createdAt: number
): string {
  const difference = Math.max(
    0,
    Date.now() - createdAt
  );

  const seconds = Math.floor(
    difference / 1000
  );

  const minutes = Math.floor(
    seconds / 60
  );

  const hours = Math.floor(
    minutes / 60
  );

  const days = Math.floor(
    hours / 24
  );

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1 ? "min" : "mins"
    } ago`;
  }

  if (hours < 24) {
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} ${
    days === 1 ? "day" : "days"
  } ago`;
}

/* =========================================================
   PROVIDER
========================================================= */

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] =
    useState<AppNotification[]>([]);

  const [hydrated, setHydrated] =
    useState(false);

  /* =======================================================
     LOAD NOTIFICATIONS
  ======================================================= */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        setNotifications(
          DEFAULT_NOTIFICATIONS
        );

        setHydrated(true);
        return;
      }

      const parsed: unknown =
        JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        setNotifications(
          DEFAULT_NOTIFICATIONS
        );

        setHydrated(true);
        return;
      }

      const validNotifications =
        parsed.filter(
          (notification): notification is AppNotification =>
            notification &&
            typeof notification ===
              "object" &&
            typeof notification.id ===
              "string" &&
            typeof notification.type ===
              "string" &&
            typeof notification.title ===
              "string" &&
            typeof notification.message ===
              "string" &&
            typeof notification.createdAt ===
              "number" &&
            typeof notification.read ===
              "boolean"
        );

      setNotifications(
        validNotifications
      );
    } catch {
      setNotifications(
        DEFAULT_NOTIFICATIONS
      );
    }

    setHydrated(true);
  }, []);

  /* =======================================================
     SAVE TO LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notifications)
      );
    } catch {
      // Frontend demo mode:
      // Ignore localStorage errors.
    }
  }, [
    notifications,
    hydrated,
  ]);

  /* =======================================================
     SHOW NOTIFICATION
  ======================================================= */

  const showNotification =
    useCallback(
      ({
        type = "info",
        title,
        message,
      }: ShowNotificationOptions) => {
        const id =
          `notification-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`;

        const newNotification: AppNotification =
          {
            id,
            type,
            title,
            message,
            createdAt: Date.now(),
            read: false,
          };

        setNotifications(
          (current) => [
            newNotification,
            ...current,
          ]
        );

        /*
         * Toast automatically disappears
         * after 6 seconds.
         *
         * The notification remains available
         * in the notification center.
         */

        window.setTimeout(() => {
          // Nothing is removed here.
          // The toast component decides
          // whether it should remain visible.
        }, 6000);
      },
      []
    );

  /* =======================================================
     MARK ONE AS READ
  ======================================================= */

  const markAsRead =
    useCallback((id: string) => {
      setNotifications(
        (current) =>
          current.map(
            (notification) =>
              notification.id === id
                ? {
                    ...notification,
                    read: true,
                  }
                : notification
          )
      );
    }, []);

  /* =======================================================
     MARK ALL AS READ
  ======================================================= */

  const markAllAsRead =
    useCallback(() => {
      setNotifications(
        (current) =>
          current.map(
            (notification) => ({
              ...notification,
              read: true,
            })
          )
      );
    }, []);

  /* =======================================================
     REMOVE ONE
  ======================================================= */

  const removeNotification =
    useCallback((id: string) => {
      setNotifications(
        (current) =>
          current.filter(
            (notification) =>
              notification.id !== id
          )
      );
    }, []);

  /* =======================================================
     CLEAR ALL
  ======================================================= */

  const clearNotifications =
    useCallback(() => {
      setNotifications([]);
    }, []);

  /* =======================================================
     UNREAD COUNT
  ======================================================= */

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.read
      ).length,
    [notifications]
  );

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const contextValue =
    useMemo<NotificationContextType>(
      () => ({
        notifications,
        unreadCount,
        showNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearNotifications,
      }),
      [
        notifications,
        unreadCount,
        showNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearNotifications,
      ]
    );

  return (
    <NotificationContext.Provider
      value={contextValue}
    >
      {children}

      <NotificationToasts
        notifications={notifications}
        removeNotification={
          removeNotification
        }
      />
    </NotificationContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useNotifications() {
  const context =
    useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
}

/* =========================================================
   TOAST CONTAINER
========================================================= */

function NotificationToasts({
  notifications,
  removeNotification,
}: {
  notifications: AppNotification[];
  removeNotification: (
    id: string
  ) => void;
}) {
  const [
    currentTime,
    setCurrentTime,
  ] = useState(Date.now());

  /*
   * Refresh every second so the toast
   * automatically disappears after 6.5 sec.
   */

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);

    return () =>
      window.clearInterval(interval);
  }, []);

  const visibleNotifications =
    notifications.filter(
      (notification) =>
        currentTime -
          notification.createdAt <
        6500
    );

  if (
    visibleNotifications.length === 0
  ) {
    return null;
  }

  return (
    <div
      className="
        pointer-events-none
        fixed
        right-4
        top-4
        z-[100]
        flex
        w-[calc(100vw-2rem)]
        max-w-sm
        flex-col
        gap-3
        sm:right-6
        sm:top-6
      "
    >
      {visibleNotifications
        .slice(0, 4)
        .map((notification) => (
          <Toast
            key={notification.id}
            notification={notification}
            onClose={() =>
              removeNotification(
                notification.id
              )
            }
          />
        ))}
    </div>
  );
}

/* =========================================================
   TOAST
========================================================= */

function Toast({
  notification,
  onClose,
}: {
  notification: AppNotification;
  onClose: () => void;
}) {
  const config = {
    success: {
      icon: CheckCircle2,
      iconClass:
        "text-emerald-400",
      borderClass:
        "border-emerald-400/20",
    },

    error: {
      icon: XCircle,
      iconClass:
        "text-red-400",
      borderClass:
        "border-red-400/20",
    },

    warning: {
      icon: AlertCircle,
      iconClass:
        "text-amber-400",
      borderClass:
        "border-amber-400/20",
    },

    info: {
      icon: Info,
      iconClass:
        "text-cyan-400",
      borderClass:
        "border-cyan-400/20",
    },
  }[notification.type];

  const Icon = config.icon;

  return (
    <div
      className={`
        pointer-events-auto
        flex
        gap-3
        rounded-2xl
        border
        ${config.borderClass}
        bg-slate-950/95
        p-4
        shadow-2xl
        shadow-black/40
        backdrop-blur-xl
        animate-in
        slide-in-from-right-5
        fade-in
        duration-300
      `}
    >
      {/* ICON */}

      <Icon
        size={21}
        strokeWidth={2}
        className={`
          mt-0.5
          shrink-0
          ${config.iconClass}
        `}
      />

      {/* CONTENT */}

      <div className="min-w-0 flex-1">
        <div
          className="
            flex
            items-start
            justify-between
            gap-2
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
      </div>

      {/* CLOSE */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-slate-500
          transition
          hover:bg-white/5
          hover:text-white
          active:scale-95
        "
      >
        <X
          size={16}
          strokeWidth={2}
        />
      </button>
    </div>
  );
}