import { ROLES, type Role } from "@/constants/roles";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  hospital: string;
  department?: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "USR-001",
    name: "Super Admin",
    email: "admin@medcore.demo",
    password: "MedCore@Admin01",
    role: ROLES.SUPER_ADMIN,
    hospital: "MedCore Health Network",
  },
  {
    id: "USR-002",
    name: "Hospital Administrator",
    email: "hospital.admin@medcore.demo",
    password: "MedCore@Hospital01",
    role: ROLES.HOSPITAL_ADMIN,
    hospital: "MedCore City Hospital",
  },
  {
    id: "USR-003",
    name: "Doctor Name",
    email: "doctor@medcore.demo",
    password: "MedCore@Doctor01",
    role: ROLES.DOCTOR,
    hospital: "MedCore City Hospital",
    department: "General Medicine",
  },
  {
    id: "USR-004",
    name: "Nurse Name",
    email: "nurse@medcore.demo",
    password: "MedCore@Nurse01",
    role: ROLES.NURSE,
    hospital: "MedCore City Hospital",
    department: "General Ward",
  },
  {
    id: "USR-005",
    name: "Receptionist",
    email: "reception@medcore.demo",
    password: "MedCore@Reception01",
    role: ROLES.RECEPTIONIST,
    hospital: "MedCore City Hospital",
  },
  {
    id: "USR-006",
    name: "Lab Technician",
    email: "lab@medcore.demo",
    password: "MedCore@Lab01",
    role: ROLES.LAB_TECHNICIAN,
    hospital: "MedCore City Hospital",
    department: "Laboratory",
  },
  {
    id: "USR-007",
    name: "Pharmacist",
    email: "pharmacy@medcore.demo",
    password: "MedCore@Pharmacy01",
    role: ROLES.PHARMACIST,
    hospital: "MedCore City Hospital",
    department: "Pharmacy",
  },
  {
    id: "USR-008",
    name: "Accountant",
    email: "accounts@medcore.demo",
    password: "MedCore@Accounts01",
    role: ROLES.ACCOUNTANT,
    hospital: "MedCore City Hospital",
    department: "Finance",
  },
  {
    id: "USR-009",
    name: "Patient Name",
    email: "patient@medcore.demo",
    password: "MedCore@Patient01",
    role: ROLES.PATIENT,
    hospital: "MedCore City Hospital",
  },
];