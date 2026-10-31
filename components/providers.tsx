
"use client";

import { ReactNode } from "react";
import { NotificationProvider } from "@/lib/notifications";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
}

