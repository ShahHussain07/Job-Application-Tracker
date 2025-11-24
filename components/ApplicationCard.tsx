"use client";

import Link from "next/link";
import type { JobApplication } from "../data/applications";

type Props = {
  app: JobApplication;
  onDelete?: (id: string) => void;
};

export default function ApplicationCard({ app, onDelete }: Props) {
  const formattedDate = new Date(app.appliedOn).toLocaleDateString();

  const shortNotes =
    app.notes && app.notes.length > 100
      ? app.notes.slice(0, 100) + "..."
      : app.notes;

  return (
    <article className="card">
      <div className="card-header-row">
        <div>
          <div className="company">{app.company}</div>
          <div className="role">{app.role}</div>
        </div>
        <span className="chip chip-status">{app.status}</span>
      </div>

      <div className="chip-row">
        <span className="chip">{app.location}</span>
        <span className="chip">Source: {app.source}</span>
        <span className="chip">Applied on {formattedDate}</span>
      </div>

      {shortNotes && (
        <p className="note-preview">
          <strong>Notes:</strong> {shortNotes}
        </p>
      )}

      <div className="btn-row">
        <Link href={`/applications/${app.id}`} className="btn primary">
          View details
        </Link>
        {onDelete && (
          <button
            className="btn danger"
            onClick={() => onDelete(app.id)}
            type="button"
          >
            Remove
          </button>
        )}
      </div>
    </article>
  );
}
