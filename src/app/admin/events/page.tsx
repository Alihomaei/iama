"use client";

import { useState } from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  MapPin,
  Users,
  Plus,
  Pencil,
  X,
  Eye,
  Clock,
  DollarSign,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

interface SampleEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  venue: string;
  startDate: string;
  endDate: string;
  earlyBirdDeadline: string | null;
  regularDeadline: string | null;
  abstractDeadline: string | null;
  isActive: boolean;
  registrations: number;
  revenue: number;
}

const sampleEvents: SampleEvent[] = [
  {
    id: "evt-001",
    title: "2026 Annual Congress",
    slug: "2026-annual-congress",
    description:
      "The flagship annual gathering of IAMA members featuring keynote speakers, abstract presentations, CME workshops, and networking opportunities for Iranian-American medical professionals.",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    startDate: "2026-06-15",
    endDate: "2026-06-18",
    earlyBirdDeadline: "2026-04-15",
    regularDeadline: "2026-05-30",
    abstractDeadline: "2026-05-01",
    isActive: true,
    registrations: 342,
    revenue: 12450000,
  },
  {
    id: "evt-002",
    title: "Spring Webinar Series",
    slug: "spring-webinar-2026",
    description:
      "A series of virtual educational webinars covering the latest advances in various medical specialties, open to all IAMA members.",
    location: "Virtual",
    venue: "Zoom",
    startDate: "2026-04-10",
    endDate: "2026-05-15",
    earlyBirdDeadline: null,
    regularDeadline: "2026-04-08",
    abstractDeadline: null,
    isActive: true,
    registrations: 185,
    revenue: 925000,
  },
  {
    id: "evt-003",
    title: "Fall Research Symposium",
    slug: "fall-symposium-2026",
    description:
      "A focused symposium on emerging research methodologies and collaborative opportunities between Iranian-American researchers and global institutions.",
    location: "Boston, MA",
    venue: "Harvard Medical School Conference Center",
    startDate: "2026-10-22",
    endDate: "2026-10-24",
    earlyBirdDeadline: "2026-08-01",
    regularDeadline: "2026-10-10",
    abstractDeadline: "2026-09-01",
    isActive: false,
    registrations: 0,
    revenue: 0,
  },
  {
    id: "evt-004",
    title: "2025 Annual Congress",
    slug: "2025-annual-congress",
    description:
      "Last year's annual congress held in Los Angeles with over 500 attendees and 120 abstract presentations.",
    location: "Los Angeles, CA",
    venue: "LA Convention Center",
    startDate: "2025-06-20",
    endDate: "2025-06-23",
    earlyBirdDeadline: "2025-04-20",
    regularDeadline: "2025-06-05",
    abstractDeadline: "2025-05-01",
    isActive: false,
    registrations: 512,
    revenue: 18432000,
  },
];

// ---------------------------------------------------------------------------
// Event form panel
// ---------------------------------------------------------------------------

function EventFormPanel({
  event,
  onClose,
}: {
  event: SampleEvent | null;
  onClose: () => void;
}) {
  const isNew = !event;
  const [form, setForm] = useState({
    title: event?.title || "",
    slug: event?.slug || "",
    description: event?.description || "",
    location: event?.location || "",
    venue: event?.venue || "",
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    earlyBirdDeadline: event?.earlyBirdDeadline || "",
    regularDeadline: event?.regularDeadline || "",
    abstractDeadline: event?.abstractDeadline || "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-border bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border p-6">
        <h2 className="text-lg font-semibold text-foreground">
          {isNew ? "Create Event" : "Edit Event"}
        </h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-muted hover:bg-gray-100 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <Input
          label="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Event title"
        />
        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          placeholder="event-slug"
          helpText="URL-friendly identifier"
        />
        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Event description..."
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Location"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, State"
          />
          <Input
            label="Venue"
            value={form.venue}
            onChange={(e) => handleChange("venue", e.target.value)}
            placeholder="Venue name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={form.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={form.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>

        <p className="text-xs font-medium text-muted uppercase tracking-wider pt-2">
          Deadlines
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Early Bird Deadline"
            type="date"
            value={form.earlyBirdDeadline}
            onChange={(e) => handleChange("earlyBirdDeadline", e.target.value)}
          />
          <Input
            label="Regular Deadline"
            type="date"
            value={form.regularDeadline}
            onChange={(e) => handleChange("regularDeadline", e.target.value)}
          />
        </div>
        <Input
          label="Abstract Deadline"
          type="date"
          value={form.abstractDeadline}
          onChange={(e) => handleChange("abstractDeadline", e.target.value)}
        />
      </div>

      <div className="border-t border-border p-6 flex gap-3">
        <Button variant="primary" className="flex-1">
          {isNew ? "Create Event" : "Save Changes"}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EventsPage() {
  const [editingEvent, setEditingEvent] = useState<SampleEvent | null | undefined>(
    undefined
  );
  // undefined = closed, null = new event, SampleEvent = editing

  const panelOpen = editingEvent !== undefined;

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="mt-1 text-sm text-muted">
            Manage congresses, webinars, and other IAMA events.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setEditingEvent(null)}
        >
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      {/* Event cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {sampleEvents.map((evt) => {
          const isPast = new Date(evt.endDate) < new Date();
          return (
            <Card key={evt.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{evt.title}</CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {evt.location}
                      </span>
                      <span className="text-border">|</span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(evt.startDate)} &ndash;{" "}
                        {formatDate(evt.endDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {evt.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : isPast ? (
                      <Badge variant="outline">Past</Badge>
                    ) : (
                      <Badge variant="warning">Draft</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted line-clamp-2 mb-4">
                  {evt.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted">
                      <Users className="h-3.5 w-3.5" />
                      <span className="text-xs">Registrations</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {evt.registrations}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span className="text-xs">Revenue</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {formatCurrency(evt.revenue)}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="text-xs">Venue</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground truncate">
                      {evt.venue}
                    </p>
                  </div>
                </div>

                {/* Deadlines */}
                {(evt.earlyBirdDeadline ||
                  evt.regularDeadline ||
                  evt.abstractDeadline) && (
                  <div className="mt-4 space-y-1.5">
                    <p className="text-xs font-medium text-muted uppercase tracking-wider">
                      Deadlines
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                      {evt.earlyBirdDeadline && (
                        <span>
                          Early Bird:{" "}
                          <span className="text-foreground">
                            {formatDate(evt.earlyBirdDeadline)}
                          </span>
                        </span>
                      )}
                      {evt.regularDeadline && (
                        <span>
                          Regular:{" "}
                          <span className="text-foreground">
                            {formatDate(evt.regularDeadline)}
                          </span>
                        </span>
                      )}
                      {evt.abstractDeadline && (
                        <span>
                          Abstract:{" "}
                          <span className="text-foreground">
                            {formatDate(evt.abstractDeadline)}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingEvent(evt)}
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3.5 w-3.5" /> View Registrations
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit / Create panel */}
      {panelOpen && (
        <EventFormPanel
          event={editingEvent ?? null}
          onClose={() => setEditingEvent(undefined)}
        />
      )}
    </div>
  );
}
