"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  seedApplications,
  type JobApplication,
} from "../../../data/applications";

const STORAGE_KEY = "job-app-tracker:v1";

type Props = {
  params: { id: string };
};

function loadAllApplications(): JobApplication[] {
  if (typeof window === "undefined") return seedApplications;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedApplications;
    return JSON.parse(raw) as JobApplication[];
  } catch {
    return seedApplications;
  }
}

export default function ApplicationDetailPage({ params }: Props) {
  const [application, setApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    const all = loadAllApplications();
    const match = all.find((a) => a.id === params.id) ?? null;
    setApplication(match);
  }, [params.id]);

  if (!application) {
    return (
      <div className="detail">
        <Link href="/" className="btn">
          ← Back to dashboard
        </Link>
        <p>Application not found.</p>
      </div>
    );
  }

  const formattedDate = new Date(application.appliedOn).toLocaleDateString();

  return (
    <div className="detail">
      <Link href="/" className="btn">
        ← Back to dashboard
      </Link>

      <h1 style={{ fontSize: 22 }}>
        {application.role} @ {application.company}
      </h1>

      <div className="detail-meta">
        <span className="chip chip-status">{application.status}</span>
        <span className="chip">{application.location}</span>
        <span className="chip">Source: {application.source}</span>
        <span className="chip">Applied on {formattedDate}</span>
      </div>

      {application.notes && (
        <p style={{ fontSize: 14, marginTop: 8 }}>{application.notes}</p>
      )}

      <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
        Your future is created by what you do TODAY, not tomorrow.
      </p>
    </div>
  );
}
