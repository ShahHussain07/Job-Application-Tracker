export type ApplicationStatus =
  | "Applied"
  | "Online Assessment"
  | "Interview Scheduled"
  | "Offer"
  | "Rejected"
  | "On Hold";

export type JobApplication = {
  id: string;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  source: string;
  appliedOn: string;
  notes?: string;
};

export const seedApplications: JobApplication[] = [
  {
    id: "amazon-sde-2025",
    company: "Amazon",
    role: "SDE Intern",
    location: "Bangalore, India",
    status: "Online Assessment",
    source: "Company Careers",
    appliedOn: "2025-11-18",
    notes: "Completed OA, waiting for result.",
  },
  {
    id: "oracle-fsd-2025",
    company: "Oracle",
    role: "Full Stack Developer",
    location: "Bangalore, India",
    status: "Applied",
    source: "LinkedIn",
    appliedOn: "2025-11-20",
    notes: "Resume tailored for backend + React.",
  },
  {
    id: "frontlines-frontend-2025",
    company: "Frontlines Media",
    role: "Frontend Developer",
    location: "Hyderabad, India",
    status: "Interview Scheduled",
    source: "Referral",
    appliedOn: "2025-11-21",
    notes: "Next interview round on Monday.",
  },
];
