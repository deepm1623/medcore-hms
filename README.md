# MedCore HMS
## Hospital Management System — Frontend Documentation

## 1. Project Overview

MedCore HMS is a frontend hospital management application built to provide role-based workspaces for hospital administrators, doctors, and receptionists.

The application provides interfaces for managing hospital operations, patient information, appointments, and clinical workflows.

### Project Objectives

- Provide a centralized hospital management interface.
- Organize features into role-based portals.
- Create a consistent, responsive user experience.
- Demonstrate common hospital workflows using mock data.
- Provide a frontend foundation for future backend integration.

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and routing |
| React | UI development |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling and responsive layouts |
| Lucide React | Icons |
| npm | Package management |

## 3. Project Scope

This project is currently **frontend-only**.

- Pages use mock data and client-side state.
- No live backend or database is connected.
- Authentication infrastructure is not implemented.
- Payment, email, SMS, and push notification services are not connected.
- Some actions simulate workflows for demonstration.
- Data may reset when the page is refreshed.

## 4. Prerequisites

Install the following before running the project:

- Node.js (LTS recommended)
- npm
- Visual Studio Code
- Git (optional)

## 5. How to Start the Project

### Step 1 — Open the project

Open Visual Studio Code and select **File → Open Folder**. Choose the `medcore-hms` project directory.

### Step 2 — Open the terminal

In VS Code, select **Terminal → New Terminal**.

### Step 3 — Install dependencies

Run this command from the project root:

```bash
npm install
```

### Step 4 — Start the development server

```bash
npm run dev
```

### Step 5 — Open the application

Visit:

[http://localhost:3000/dashboard](http://localhost:3000/dashboard)

The portal-selection page will appear.

Keep the terminal running while using the application. To stop the server, press `Ctrl + C` in the terminal.

## 6. How to Open Each Portal

From the portal-selection page, select **Open Portal** on the relevant card. You can also enter the dashboard URL directly.

| Portal | URL |
|---|---|
| Admin | `http://localhost:3000/dashboard/admin` |
| Doctor | `http://localhost:3000/dashboard/doctor` |
| Receptionist | `http://localhost:3000/dashboard/receptionist` |

## 7. Completed Modules

### Admin Portal

The Admin Portal includes:

- Dashboard
- Users
- Doctors
- Departments
- Patients
- Appointments
- Reports
- Settings

Administrators can explore hospital overview information, manage mock records, view appointment information, and interact with report and settings interfaces.

### Doctor Portal

The Doctor Portal includes:

- Dashboard
- Appointments
- Patients
- EMR (Electronic Medical Records)
- Prescriptions
- Lab Results
- Follow-ups
- Settings

Doctors can explore patient and appointment information and interact with mock clinical workflows.

### Receptionist Portal

The Receptionist Portal includes:

- Dashboard
- Appointments
- Patients
- Settings

Receptionists can explore patient registration and appointment-management interfaces using mock data.

## 8. Project Folder Structure

The following structure is based on the project organization visible in the provided VS Code screenshot. Some small or obscured entries may need verification in the local project.

```text
medcore-hms/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── doctor/
│   │           └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── admin/
│   │   │   ├── appointments/
│   │   │   │   └── page.tsx
│   │   │   ├── departments/
│   │   │   │   └── page.tsx
│   │   │   ├── doctors/
│   │   │   │   └── page.tsx
│   │   │   ├── patients/
│   │   │   │   └── page.tsx
│   │   │   ├── reports/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── doctor/
│   │   │   ├── appointments/
│   │   │   │   └── page.tsx
│   │   │   ├── emr/
│   │   │   │   └── page.tsx
│   │   │   ├── follow-ups/
│   │   │   │   └── page.tsx
│   │   │   ├── lab-results/
│   │   │   │   └── page.tsx
│   │   │   ├── patients/
│   │   │   │   └── page.tsx
│   │   │   ├── prescriptions/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── receptionist/
│   │   │   ├── appointments/
│   │   │   │   └── page.tsx
│   │   │   ├── patients/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   │
│   │   └── page.tsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── dashboard-shell.tsx
│   │   ├── sidebar.tsx
│   │   └── topbar.tsx
│   └── ui/
│
├── constants/
├── context/
├── hooks/
├── lib/
├── mock/
├── public/
├── types/
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

### Folder Descriptions

| Folder | Purpose |
|---|---|
| `app/` | App Router pages, layouts, and global styles |
| `app/(auth)/` | Authentication-related routes |
| `app/dashboard/admin/` | Admin portal pages |
| `app/dashboard/doctor/` | Doctor portal pages |
| `app/dashboard/receptionist/` | Receptionist portal pages |
| `components/layout/` | Shared dashboard shell, sidebar, and topbar |
| `components/ui/` | Reusable UI components |
| `constants/` | Shared application constants |
| `context/` | React context providers |
| `hooks/` | Reusable React hooks |
| `lib/` | Shared utilities and helper functions |
| `mock/` | Mock data for frontend pages |
| `public/` | Static assets |
| `types/` | TypeScript type definitions |

## 9. Shared UI and Navigation

The project uses shared layout components to maintain a consistent interface across portal pages.

- `dashboard-shell.tsx` — shared dashboard layout
- `sidebar.tsx` — portal navigation
- `topbar.tsx` — dashboard header and controls

The portal-selection page links to each role's dashboard. The sidebar provides navigation between the pages within each portal.

## 10. Troubleshooting

### The project does not start

1. Confirm Node.js and npm are installed.
2. Run `npm install` from the project root.
3. Run `npm run dev`.
4. Review terminal output for errors.

### Port 3000 is already in use

Stop the process using port 3000, or use the alternate local URL printed by Next.js.

### A page does not open

- Confirm the development server is running.
- Verify the URL matches the route listed in this guide.
- Check the VS Code terminal and browser console for errors.

## 11. Production Build

To check the production build:

```bash
npm run build
```

If the build succeeds, start the production server:

```bash
npm run start
```

## 12. Future Enhancements

Potential future work, outside the current frontend scope:

- Backend API integration
- Database persistence
- Real authentication and role-based authorization
- Live notifications
- Payment integration
- Automated testing
- Production deployment

---

**Project:** MedCore HMS  
**Current status:** Frontend modules completed for Admin, Doctor, and Receptionist portals  
**Data:** Mock data and client-side state  
**Purpose:** Frontend demonstration and future full-stack development