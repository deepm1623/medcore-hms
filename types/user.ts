import type { Role } from "@/constants/roles";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  hospital: string;
  department?: string;
}