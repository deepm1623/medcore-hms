import { DoctorProfileProvider } from "@/lib/doctor-profile";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorProfileProvider>
      {children}
    </DoctorProfileProvider>
  );
}