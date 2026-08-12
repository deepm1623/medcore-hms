"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface DoctorProfile {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  hospital: string;
  department: string;
}

const defaultDoctorProfile: DoctorProfile = {
  fullName: "Doctor Name",
  email: "doctor@medcore.demo",
  phone: "+91 98765 43210",
  specialization: "General Medicine",
  licenseNumber: "MED-2026-001",
  hospital: "MedCore General Hospital",
  department: "General Medicine",
};

interface DoctorProfileContextType {
  profile: DoctorProfile;

  updateProfile: (
    updates: Partial<DoctorProfile>
  ) => void;

  resetProfile: () => void;
}

const DoctorProfileContext =
  createContext<DoctorProfileContextType | undefined>(
    undefined
  );

const STORAGE_KEY = "medcore_doctor_profile";

export function DoctorProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] =
    useState<DoctorProfile>(defaultDoctorProfile);

  /* =====================================================
     LOAD SAVED PROFILE
  ====================================================== */

  useEffect(() => {
    try {
      const savedProfile =
        sessionStorage.getItem(STORAGE_KEY);

      if (savedProfile) {
        const parsedProfile =
          JSON.parse(savedProfile);

        setProfile({
          ...defaultDoctorProfile,
          ...parsedProfile,
        });
      }
    } catch (error) {
      console.error(
        "Failed to load doctor profile:",
        error
      );
    }
  }, []);

  /* =====================================================
     UPDATE PROFILE
  ====================================================== */

  const updateProfile = (
    updates: Partial<DoctorProfile>
  ) => {
    setProfile((currentProfile) => {
      const updatedProfile = {
        ...currentProfile,
        ...updates,
      };

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedProfile)
        );
      } catch (error) {
        console.error(
          "Failed to save doctor profile:",
          error
        );
      }

      return updatedProfile;
    });
  };

  /* =====================================================
     RESET PROFILE
  ====================================================== */

  const resetProfile = () => {
    setProfile(defaultDoctorProfile);

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultDoctorProfile)
      );
    } catch (error) {
      console.error(
        "Failed to reset doctor profile:",
        error
      );
    }
  };

  return (
    <DoctorProfileContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
      }}
    >
      {children}
    </DoctorProfileContext.Provider>
  );
}

/* =======================================================
   HOOK
======================================================= */

export function useDoctorProfile() {
  const context = useContext(
    DoctorProfileContext
  );

  if (!context) {
    throw new Error(
      "useDoctorProfile must be used inside DoctorProfileProvider"
    );
  }

  return context;
}