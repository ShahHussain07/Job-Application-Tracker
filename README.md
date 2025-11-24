#  Job Application Tracker (Next.js 14 + TypeScript)

A clean and practical **Job Application Tracker** built with **Next.js 14 (App Router)** and **TypeScript** to organize and track job applications.  
You can add applications, filter/search them, view details, and your data stays saved in the browser using `localStorage`.

---

## Features

### Add Job Applications
Each application includes:
- Company  
- Role / Position  
- Location  
- Status (Applied, OA, Interview, Offer, Rejected, On Hold)  
- Source (LinkedIn, Referral, Company site, etc.)  
- Applied date  
- Notes

### Dashboard View
- List of all job applications
- Status, location, source, and applied date shown as small chips
- Short notes preview

### Detail Page (Dynamic Route)
- Each application has a dedicated detail page
- Uses Next.js **dynamic routing**: `/applications/[id]`
- Shows all fields in a clean layout

### Search & Filter
- Search by **company** or **role**
- Filter by **status**
- Clear all filters with one click

### Data Persistence
- Uses **localStorage**
- Your added applications stay even after page refresh

### API Route (Demo)
- Simple API endpoint using Next.js **Route Handlers**:
  - `GET /api/applications` → returns sample application data

---

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **LocalStorage** for persistence
- **Next.js Route Handlers** for API
- **Custom CSS** (no UI libraries)

---

## Project Structure

```text
app/
 ├─ page.tsx                  // Main dashboard: list + filters + add form
 ├─ layout.tsx                // Root layout
 ├─ globals.css               // Global styles
 ├─ applications/
 │    └─ [id]/page.tsx        // Dynamic detail page
 └─ api/
      └─ applications/route.ts // Demo API returning seed data

components/
 └─ ApplicationCard.tsx       // Reusable card for each application

data/
 └─ applications.ts           // Type definitions + seed data
