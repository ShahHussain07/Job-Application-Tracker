import { NextResponse } from "next/server";
import { seedApplications } from "../../../data/applications";

export async function GET() {
  return NextResponse.json({ applications: seedApplications });
}
