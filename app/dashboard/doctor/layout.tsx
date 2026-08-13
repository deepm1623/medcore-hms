import { DoctorProfileProvider } from "@/lib/doctor-profile";
import { NotificationProvider } from "@/lib/notifications";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <DoctorProfileProvider>
        {children}
      </DoctorProfileProvider>
    </NotificationProvider>
  );
}