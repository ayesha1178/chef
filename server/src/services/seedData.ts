import { IEvent, IRegistration } from '../models/types.js';

export const INITIAL_EVENTS: IEvent[] = [
  {
    id: 'evt-cook-off-blitz',
    name: 'COOK-OFF // SPEED BLITZ ARENA',
    category: 'Contests',
    date: '2026-10-14',
    time: '05:00 PM - 07:30 PM',
    venue: 'ABESEC Computing Lab 02 & CodeChef Portal',
    description: 'High-voltage 2.5 hour speed algorithmic clash. 6 problems ranging from binary search and segment trees to dynamic programming optimization. Live big-screen leaderboard with real-time verdicts.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    registrationDeadline: '2026-10-13',
    capacity: 150,
    featured: true,
    edition: 'FEATURED MISSION // 001',
    highlights: [
      '6 ICPC-style problems curated by CodeChef 5★ rated alumni',
      'Real-time live orbital radar scoreboard on lab projection screens',
      'Official CodeChef ABESEC merchandise and rating badges for top rankers',
      'Post-contest editorial breakdown & solution walkthrough with the problem setters'
    ],
    organizer: {
      team: 'CodeChef ABESEC Contest Operations',
      lead: 'Arjun Malhotra (Chapter President)',
      contactEmail: 'contest@codechefabesec.in'
    },
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-01T10:00:00.000Z'
  },
  {
    id: 'evt-dsa-expedition',
    name: 'DSA EXPEDITION: GRAPHS & ORBITAL TREES',
    category: 'DSA',
    date: '2026-10-22',
    time: '03:30 PM - 06:00 PM',
    venue: 'Innovation Hub, Ground Floor, ABESEC',
    description: 'Master advanced graph traversals, Dijkstra shortest-path navigation, Disjoint Set Union (DSU), and binary lifting tree algorithms. Hands-on problem solving sprint with senior crew mentors.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    registrationDeadline: '2026-10-21',
    capacity: 80,
    featured: false,
    edition: 'MISSION // 002',
    highlights: [
      'Interactive visual algorithmic step-throughs of graph networks',
      'Curated CodeChef problem set with testcase walkthroughs',
      '1v1 speed pair debugging drills',
      'Free digital DSA cheat-sheet dossier provided to all attendees'
    ],
    organizer: {
      team: 'CodeChef ABESEC DSA Guild',
      lead: 'Pooja Kashyap (CP Lead)',
      contactEmail: 'dsa@codechefabesec.in'
    },
    createdAt: '2026-09-05T12:00:00.000Z',
    updatedAt: '2026-09-05T12:00:00.000Z'
  },
  {
    id: 'evt-spacehack-2026',
    name: 'SPACEHACK 2026: 24H CODEFEST',
    category: 'Hackathon',
    date: '2026-11-04',
    time: '09:00 AM - 09:00 AM (24 Hours)',
    venue: 'ABES Auditorium & Virtual Mission Control',
    description: '24 hours. Zero gravity. Infinite code. Assemble your squad of 2-4 builders to architect real-world decentralized systems, developer tooling, and autonomous AI agents for cash prizes and fast-track interviews.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    registrationDeadline: '2026-11-02',
    capacity: 220,
    featured: false,
    edition: 'MISSION // 003',
    highlights: [
      '24-Hour continuous prototyping sprint in the campus mothership',
      'Over ₹1,00,000 in prizes, swags, and cloud credits',
      'Midnight pizza fuel station, gaming arena, and energy drinks',
      'Judged by senior engineering architects from top startups'
    ],
    organizer: {
      team: 'CodeChef ABESEC Hackathon Wing',
      lead: 'Devansh Singhal (Tech Lead)',
      contactEmail: 'hack@codechefabesec.in'
    },
    createdAt: '2026-09-10T14:00:00.000Z',
    updatedAt: '2026-09-10T14:00:00.000Z'
  },
  {
    id: 'evt-systems-rust',
    name: 'SYSTEMS ARCHITECTURE & RUST IN SPACE',
    category: 'Tech Talk',
    date: '2026-11-12',
    time: '04:00 PM - 06:00 PM',
    venue: 'Raman Block Seminar Hall 02, ABESEC',
    description: 'Where memory safety meets rocket telemetry. A deep technical talk exploring memory management without a garbage collector, zero-cost abstractions, and mission-critical embedded software.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    registrationDeadline: '2026-11-11',
    capacity: 120,
    featured: false,
    edition: 'MISSION // 004',
    highlights: [
      'Keynote by visiting Principal Systems Engineer',
      'Live memory-leak vs borrow-checker live coding demonstration',
      'Open mic session: Architecture debates and career path in systems programming'
    ],
    organizer: {
      team: 'CodeChef ABESEC Systems Division',
      lead: 'Tanya Saxena (Events Curator)',
      contactEmail: 'talks@codechefabesec.in'
    },
    createdAt: '2026-09-12T09:30:00.000Z',
    updatedAt: '2026-09-12T09:30:00.000Z'
  },
  {
    id: 'evt-bug-hunt-arena',
    name: 'CODE BATTLE: BUG HUNT // SUSPICIOUS CODE',
    category: 'Competitive Programming',
    date: '2026-11-20',
    time: '05:00 PM - 07:30 PM',
    venue: 'Computing Centre 4 & CodeChef Portal',
    description: 'Find the impostor in the codebase! High-intensity competitive debugging challenge. 8 tricky programs with subtle edge-case failures, integer overflows, and off-by-one errors. Fix them before time runs out.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    registrationDeadline: '2026-11-19',
    capacity: 95,
    featured: false,
    edition: 'MISSION // 005',
    highlights: [
      'Time-trial speed debugging rounds',
      'Test your understanding of boundary conditions and edge-cases',
      'Mechanical keyboard prize for the fastest code debugger'
    ],
    organizer: {
      team: 'CodeChef ABESEC CP Wing',
      lead: 'Vikram Sethi',
      contactEmail: 'cp@codechefabesec.in'
    },
    createdAt: '2026-09-15T16:00:00.000Z',
    updatedAt: '2026-09-15T16:00:00.000Z'
  },
  {
    id: 'evt-rookie-deployment',
    name: 'ROOKIE DEPLOYMENT: C++ & CP KICKSTART',
    category: 'Recruitment',
    date: '2026-11-28',
    time: '02:00 PM - 05:00 PM',
    venue: 'ABESEC Central Amphitheatre & Lab 1',
    description: 'Essential orientation for 1st and 2nd year students. Learn how to set up competitive programming environments, leverage C++ STL (vectors, sets, maps, priority queues), and climb the CodeChef division stars.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    registrationDeadline: '2026-11-27',
    capacity: 180,
    featured: false,
    edition: 'MISSION // 006',
    highlights: [
      'Beginner-friendly walkthrough from "Hello World" to dynamic arrays',
      'Setting up VS Code with CP fast snippets and compiler flags',
      'Direct interaction with 4★ and 5★ rated seniors',
      'Official induction into the CodeChef ABESEC Student Crew'
    ],
    organizer: {
      team: 'CodeChef ABESEC Community Crew',
      lead: 'Rhea Nambiar',
      contactEmail: 'crew@codechefabesec.in'
    },
    createdAt: '2026-09-18T11:00:00.000Z',
    updatedAt: '2026-09-18T11:00:00.000Z'
  }
];

export const INITIAL_REGISTRATIONS: IRegistration[] = [
  {
    id: 'reg-001',
    eventId: 'evt-cook-off-blitz',
    eventName: 'COOK-OFF // SPEED BLITZ ARENA',
    name: 'Kabir Sharma',
    email: 'kabir.sharma@abes.ac.in',
    collegeYear: 'ABESEC - 3rd Year',
    phone: '9876543210',
    department: 'Computer Science & Engineering',
    ticketId: 'CREW-8821-BLITZ',
    registeredAt: '2026-09-22T10:14:00.000Z',
    status: 'Confirmed'
  },
  {
    id: 'reg-002',
    eventId: 'evt-cook-off-blitz',
    eventName: 'COOK-OFF // SPEED BLITZ ARENA',
    name: 'Ananya Mehra',
    email: 'ananya.m@abes.ac.in',
    collegeYear: 'ABESEC - 2nd Year',
    phone: '9812345678',
    department: 'Information Technology',
    ticketId: 'CREW-9932-BLITZ',
    registeredAt: '2026-09-23T14:22:00.000Z',
    status: 'Confirmed'
  },
  {
    id: 'reg-003',
    eventId: 'evt-dsa-expedition',
    eventName: 'DSA EXPEDITION: GRAPHS & ORBITAL TREES',
    name: 'Rohan Verma',
    email: 'rohan.v@abes.ac.in',
    collegeYear: 'ABESEC - 3rd Year',
    phone: '9723456789',
    department: 'AI & Machine Learning',
    ticketId: 'CREW-4412-DSA',
    registeredAt: '2026-09-24T11:05:00.000Z',
    status: 'Confirmed'
  },
  {
    id: 'reg-004',
    eventId: 'evt-spacehack-2026',
    eventName: 'SPACEHACK 2026: 24H CODEFEST',
    name: 'Tanvi Chawla',
    email: 'tanvi.c@abes.ac.in',
    collegeYear: 'ABESEC - 4th Year',
    phone: '9988776655',
    department: 'Computer Science & Engineering',
    ticketId: 'CREW-3310-HACK',
    registeredAt: '2026-09-25T16:45:00.000Z',
    status: 'Confirmed'
  }
];
