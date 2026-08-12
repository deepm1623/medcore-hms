export interface MockPatient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  bloodGroup: string;
  phone: string;
  condition: string;
  status: "Stable" | "Under Treatment" | "Critical";
  lastVisit: string;
  department: string;
}

export const mockPatients: MockPatient[] = [
  {
    id: "P-1001",
    name: "Aarav Patel",
    age: 42,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+91 98765 10001",
    condition: "Type 2 Diabetes",
    status: "Stable",
    lastVisit: "12 Aug 2026",
    department: "General Medicine",
  },
  {
    id: "P-1002",
    name: "Ananya Shah",
    age: 31,
    gender: "Female",
    bloodGroup: "O+",
    phone: "+91 98765 10002",
    condition: "Asthma",
    status: "Under Treatment",
    lastVisit: "11 Aug 2026",
    department: "General Medicine",
  },
  {
    id: "P-1003",
    name: "Raj Mehta",
    age: 57,
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 98765 10003",
    condition: "Hypertension",
    status: "Stable",
    lastVisit: "10 Aug 2026",
    department: "Cardiology",
  },
  {
    id: "P-1004",
    name: "Diya Joshi",
    age: 26,
    gender: "Female",
    bloodGroup: "AB+",
    phone: "+91 98765 10004",
    condition: "Migraine",
    status: "Stable",
    lastVisit: "09 Aug 2026",
    department: "Neurology",
  },
  {
    id: "P-1005",
    name: "Vikram Singh",
    age: 64,
    gender: "Male",
    bloodGroup: "O-",
    phone: "+91 98765 10005",
    condition: "Coronary Artery Disease",
    status: "Under Treatment",
    lastVisit: "08 Aug 2026",
    department: "Cardiology",
  },
  {
    id: "P-1006",
    name: "Meera Desai",
    age: 38,
    gender: "Female",
    bloodGroup: "A-",
    phone: "+91 98765 10006",
    condition: "Thyroid Disorder",
    status: "Stable",
    lastVisit: "07 Aug 2026",
    department: "Endocrinology",
  },
  {
    id: "P-1007",
    name: "Rohan Shah",
    age: 49,
    gender: "Male",
    bloodGroup: "B-",
    phone: "+91 98765 10007",
    condition: "Chronic Kidney Disease",
    status: "Critical",
    lastVisit: "06 Aug 2026",
    department: "Nephrology",
  },
  {
    id: "P-1008",
    name: "Isha Patel",
    age: 22,
    gender: "Female",
    bloodGroup: "O+",
    phone: "+91 98765 10008",
    condition: "Iron Deficiency",
    status: "Under Treatment",
    lastVisit: "05 Aug 2026",
    department: "General Medicine",
  },
];