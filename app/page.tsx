"use client";

import { useEffect, useMemo, useState } from "react";
import {
  seedApplications,
  type ApplicationStatus,
  type JobApplication,
} from "../data/applications";
import ApplicationCard from "../components/ApplicationCard";

const STORAGE_KEY = "job-app-tracker:v1";

function loadFromStorage(): JobApplication[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JobApplication[];
  } catch {
    return null;
  }
}

function saveToStorage(applications: JobApplication[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

const statuses: ApplicationStatus[] = [
  "Applied",
  "Online Assessment",
  "Interview Scheduled",
  "Offer",
  "Rejected",
  "On Hold",
];

export default function HomePage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [source, setSource] = useState("LinkedIn");
  const [appliedOn, setAppliedOn] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored && stored.length > 0) {
      setApplications(stored);
    } else {
      setApplications(seedApplications);
    }
  }, []);

  useEffect(() => {
    if (applications.length > 0) {
      saveToStorage(applications);
    }
  }, [applications]);

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        app.company.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const newApp: JobApplication = {
      id: `${company.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString(
        36
      )}`,
      company: company.trim(),
      role: role.trim(),
      location: location.trim() || "Not specified",
      status,
      source: source.trim() || "Other",
      appliedOn: appliedOn || new Date().toISOString().slice(0, 10),
      notes: notes.trim(),
    };

    setApplications((prev) => [newApp, ...prev]);

    setCompany("");
    setRole("");
    setLocation("");
    setStatus("Applied");
    setSource("LinkedIn");
    setAppliedOn("");
    setNotes("");
  }

  function handleDelete(id: string) {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  }

  const distinctStatuses = useMemo(
    () => ["All", ...Array.from(new Set(applications.map((a) => a.status)))],
    [applications]
  );

  return (
    <div>
      <header className="header">
        <div className="header-title">
          <span>📌</span>
          <span>Job Application Tracker</span>
        </div>
        <p className="header-sub">
          Manage your job applications, track progress, and add new entries.
        </p>
      </header>

      <div className="grid">
        <section>
          <div className="filters">
            <input
              className="input"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {distinctStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              className="btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
            >
              Clear
            </button>
          </div>

          {filtered.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onDelete={handleDelete}
            />
          ))}
        </section>

        <section>
          <form className="card" onSubmit={handleAdd}>
            <div className="form-title">Add New Application</div>

            <div className="form-grid">
              <div className="field">
                <label className="label">Company *</label>
                <input
                  className="input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label className="label">Role *</label>
                <input
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label className="label">Location</label>
                <input
                  className="input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Status</label>
                <select
                  className="select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as ApplicationStatus)
                  }
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">Source</label>
                <input
                  className="input"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Applied On</label>
                <input
                  className="input"
                  type="date"
                  value={appliedOn}
                  onChange={(e) => setAppliedOn(e.target.value)}
                />
              </div>
            </div>

            <div className="field" style={{ marginTop: 10 }}>
              <label className="label">Notes</label>
              <textarea
                className="textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button className="btn primary" type="submit" style={{ marginTop: 10 }}>
              Add Application
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
