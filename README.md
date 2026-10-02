# CODECHEF ABESEC — The Coding Crew Event Platform
> *"CODE. COMPETE. COLLABORATE."*
> **ABES Engineering College • Spaceship Mission Control // Chapter 26**

A production-grade, highly polished event management platform for **CodeChef ABESEC**, designed with an original **Spaceship & Among-Us-inspired** visual language.

The design embodies a calibrated **70% premium technology platform / 30% playful Among Us aesthetic**, combining dark cinematic cockpit panels, HUD telemetry, original vector crewmate illustrations, classified secrecy protocols, and an interactive 3D Emergency Meeting dispatch system with real-time event CRUD, search, registration, and seat management.

---

## 🚀 Key Brand & Design Identity

- **Brand**: CodeChef ABESEC
- **Concept**: *The Coding Crew*
- **Tagline**: `CODE. COMPETE. COLLABORATE.`
- **Hero Statement**: `THE NEXT MISSION BEGINS NOW.`
- **Supporting Line**: `Your next coding challenge, workshop or tech event is waiting.`

### Color Palette (Spaceship & Crew Accents)

| Token | Hex | Role |
|---|---|---|
| **Space Black** | `#080A0D` | Primary background, deep cosmos atmosphere |
| **Deep Navy** | `#101722` | Cockpit panel containers, modal bodies, card surfaces |
| **Space Navy** | `#182335` | Hover states, elevated command panels |
| **Crew Red** | `#E50914` | **Dominant Accent**: Primary CTA buttons, emergency badges, glowing visor details |
| **Dark Red** | `#8B0E16` | Gradients, shadow base, active alarm header |
| **Emergency Orange** | `#FF6A00` | Hazard border stripes, urgency indicators |
| **Crew Cyan** | `#54D8E8` | Radar sweep line, status blips, secondary tags |
| **Crew Yellow** | `#FFD447` | Alert text, stars, highlight badges |
| **Off White** | `#F4F4F1` | Primary readable typography |
| **Muted Gray** | `#87909C` | Metadata, coordinates, descriptions |

---

## 🛸 Homepage Structure (10 Sections)

1. **MISSION START — HERO**:
   - Cinematic space-station cockpit with animated stars, orbital rings, and cockpit grid lines.
   - Large bold typography: *"THE NEXT MISSION BEGINS NOW."*
   - Vector floating red astronaut illustration with CodeChef hat and reflection visor.
   - Live spinning radar HUD (`SpaceshipRadar`) and micro status indicators (`ALT 420KM`, `0 IMPOSTORS`).
   - Action buttons: `[ EXPLORE MISSIONS ]` and `[ JOIN THE CREW ]`.
   - Secrecy badges: `SHHH... MISSION IN PROGRESS`, `CLASSIFIED // 001`.

2. **FEATURED MISSION**:
   - Classified mission briefing card (`FEATURED MISSION // 001`) with real-time backend data.
   - Date, timestamp, coordinates, vacancies, and `[ VIEW MISSION → ]` directive.

3. **UPCOMING MISSIONS**:
   - Live flight manifest of algorithmic blitzes, DSA labs, and hackathons from the API.
   - Interactive Mission Cards with status indicators (`STATUS // OPEN`, `BERTHS FULL`).

4. **MISSION CATEGORIES**:
   - Spaceship modules: Competitive Programming, DSA, Workshops, Hackathons, Tech Talks, Contests, Community, Recruitment.
   - Clicking any module immediately opens the missions radar filtered to that sector.

5. **COMPLETE YOUR TASKS**:
   - Interactive spaceship task module translating Among Us tasks into coding club onboarding.
   - Tasks: Calibrate Rating, Inspect Subspace Comms, Clear Algorithmic Queue, Prime Spaceship Engine.
   - Dynamic progress bar gauge (`TOTAL CREW TASKS COMPLETED: %`).

6. **MEET THE CREW**:
   - Core chapter officers: Lead Commander, Flight Engineer, Navigation Officer, Comms Specialist.
   - Subtle crew suit colors (Red, Cyan, Yellow, Purple) and verified badges.

7. **COMPLETED MISSIONS**:
   - Chapter expedition archive: 1,250+ submissions, 18+ ICPC regionalists, ₹4.5L+ hackathon bounties, 350+ cadets deployed.

8. **EMERGENCY MEETING**:
   - Interactive 3D Emergency Meeting Button with hazard stripes and flip-up glass lid.
   - Clicking opens the **Emergency Dispatch Modal** (`REPORT AN ISSUE`, `REQUEST ASSISTANCE`, `CONTACT THE CREW`).

9. **FINAL CTA**:
   - *"THE CODING CREW IS CALLING. READY TO BOARD THE SPACESHIP?"*
   - Immediate registration and flight manifest buttons.

10. **SPACESHIP COMMS FOOTER**:
    - Chapter telemetry, social comms, navigation matrix, and emergency beacon callout.

---

## 📋 Comprehensive Pages & Features

- **Active Missions Catalog (`/events`)**:
  - Real-time search by keywords, category modules, upcoming/past status, and date sorting.
  - HUD telemetry showing live detection count (`RADAR DETECTED: X OF Y MISSIONS`).
- **Mission Briefing (`/event/:id`)**:
  - Classified intel display, coordinates, live berth capacity meter, shareable beacon link.
  - `[ ACCEPT MISSION → ]` button triggering registration.
- **Crew Assignment / Registration Modal**:
  - Full Name, Student Email, College & Year, Phone Number.
  - Generates verifiable digital ticket passes (e.g. `CREW-9767-CONT`).
  - Polished success animation: `MISSION ACCEPTED ✓`.
- **Meet The Crew (`/crew`)**:
  - Full roster of officers, designations, ratings, and open cadet recruitment roles.
- **Mission Achievements (`/achievements`)**:
  - CodeChef Star Coders Leaderboard, ICPC regional finishes, and Smart India Hackathon wins.
- **Chapter Briefing (`/about`)**:
  - Chapter history, no-gatekeeping philosophy, and timeline milestones.
- **Mission Control Admin Console (`/admin-dashboard`)**:
  - Protected officer access (credentials are stored securely in `.env.local`).
  - Active Missions management with full CRUD (Create, Edit, Delete, View).
  - Crew Registrations roster with search, mission filter, year filter, and CSV export.
  - Telemetry configuration and one-click seed restore.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**:
  - React 19 + TypeScript + Vite
  - Tailwind CSS v4 (`@theme` tokens with custom glows, cockpit grids, and starfields)
  - Lucide Icons
  - Canvas Confetti for mission acceptance celebration
- **Backend**:
  - Node.js + Express + TypeScript
  - High-performance local JSON-file database engine (`server/data/db.json`) with auto-fallback
  - JWT Bearer Authentication + bcrypt password hashing
  - Dynamic capacity and seat reservation logic
- **Port Mapping**:
  - Client Dev Server: `http://localhost:5173`
  - Backend API: `http://localhost:5000`

---

## 🔑 Officer Clearance (Admin Login)

- **URL**: `http://localhost:5173/#admin-login`
- **Email**: See your local `.env.local` file
- **Password**: See your local `.env.local` file
