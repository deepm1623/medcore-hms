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
  useState,
} from "react";

/* =========================================================
   TYPES
========================================================= */

export type NotificationType =
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

/* =========================================================
   CONTEXT
========================================================= */

const NotificationContext =
  createContext<NotificationContextType | null>(null);

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "medcore_notifications";

/* =========================================================
   DEFAULT NOTIFICATIONS
========================================================= */

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
   NOTIFICATION TIME FORMATTER
   Used by Topbar
========================================================= */

export function formatNotificationTime(
  timestamp: number
): string {
  const difference = Math.max(
    0,
    Date.now() - timestamp
  );

  if (difference < 60 * 1000) {
    return "Just now";
  }

  const minutes = Math.floor(
    difference / (60 * 1000)
  );

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Yesterday";
  }

  return `${days}d ago`;
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

      if (saved) {
        const parsed: unknown =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setNotifications(parsed);
        } else {
          setNotifications(
            DEFAULT_NOTIFICATIONS
          );
        }
      } else {
        setNotifications(
          DEFAULT_NOTIFICATIONS
        );
      }
    } catch {
      setNotifications(
        DEFAULT_NOTIFICATIONS
      );
    }

    setHydrated(true);
  }, []);

  /* =======================================================
     SAVE NOTIFICATIONS
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
      // Ignore localStorage errors.
    }
  }, [notifications, hydrated]);

  /* =======================================================
     SHOW NOTIFICATION
  ======================================================= */

  const showNotification = useCallback(
    ({
      type = "info",
      title,
      message,
    }: ShowNotificationOptions) => {
      const now = Date.now();

      const id =
        `notification-${now}-` +
        Math.random()
          .toString(36)
          .slice(2);

      const newNotification: AppNotification = {
        id,
        type,
        title,
        message,
        createdAt: now,
        read: false,
      };

      setNotifications((current) => [
        newNotification,
        ...current,
      ]);

      /*
        Automatically remove toast notification
        after 6 seconds.

        The notification remains available in the
        notification panel until removed/cleared.
      */

      window.setTimeout(() => {
        setNotifications((current) =>
          current.filter(
            (notification) =>
              notification.id !== id
          )
        );
      }, 6000);
    },
    []
  );

  /* =======================================================
     MARK ONE AS READ
  ======================================================= */

  const markAsRead = useCallback(
    (id: string) => {
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true,
              }
            : notification
        )
      );
    },
    []
  );

  /* =======================================================
     MARK ALL AS READ
  ======================================================= */

  const markAllAsRead = useCallback(() => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }, []);

  /* =======================================================
     REMOVE ONE NOTIFICATION
  ======================================================= */

  const removeNotification = useCallback(
    (id: string) => {
      setNotifications((current) =>
        current.filter(
          (notification) =>
            notification.id !== id
        )
      );
    },
    []
  );

  /* =======================================================
     CLEAR ALL NOTIFICATIONS
  ======================================================= */

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /* =======================================================
     UNREAD COUNT
  ======================================================= */

  const unreadCount = notifications.filter(
    (notification) =>
      !notification.read
  ).length;

  /* =======================================================
     PROVIDER
  ======================================================= */

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        showNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearNotifications,
      }}
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
  removeNotification: (id: string) => void;
}) {
  const [
    currentTime,
    setCurrentTime,
  ] = useState(() => Date.now());

  /*
    Refresh the age of notifications so the toast
    visibility stays accurate.
  */

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);

    return () => {
      window.clearInterval(interval);
    };
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
        left-3
        right-3
        top-3
        z-[200]
        flex
        max-h-[calc(100vh-24px)]
        flex-col
        gap-3
        overflow-hidden
        sm:left-auto
        sm:right-6
        sm:top-6
        sm:w-[390px]
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
      iconClass: "text-emerald-400",
      borderClass:
        "border-emerald-400/20",
    },

    error: {
      icon: XCircle,
      iconClass: "text-red-400",
      borderClass:
        "border-red-400/20",
    },

    warning: {
      icon: AlertCircle,
      iconClass: "text-amber-400",
      borderClass:
        "border-amber-400/20",
    },

    info: {
      icon: Info,
      iconClass: "text-cyan-400",
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
        min-w-0
        gap-3
        rounded-2xl
        border
        ${config.borderClass}
        bg-slate-950/95
        p-4
        shadow-2xl
        shadow-black/40
        backdrop-blur-xl
      `}
    >
      {/* Icon */}

      <Icon
        size={21}
        className={`
          mt-0.5
          shrink-0
          ${config.iconClass}
        `}
      />

      {/* Content */}

      <div className="min-w-0 flex-1">
        <p
          className="
            break-words
            text-sm
            font-semibold
            leading-5
            text-white
          "
        >
          {notification.title}
        </p>

        <p
          className="
            mt-1
            break-words
            text-xs
            leading-5
            text-slate-400
          "
        >
          {notification.message}
        </p>
      </div>

      {/* Close */}

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
        <X size={16} />
      </button>
    </div>
  );
}