import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Bell,
  Wifi,
  Share2,
  Smartphone,
  ExternalLink,
  Clock,
  PartyPopper,
  Dumbbell,
  Landmark,
  type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NotifyToggle } from "@/components/app/notify-toggle";
import { EVENT } from "@/lib/agenda";

export const metadata: Metadata = { title: "Info" };

export default function InfoPage() {
  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-secondary">Venue &amp; Info</h1>
        <p className="text-sm text-muted">
          {EVENT.name} &middot; {EVENT.city}
        </p>
      </header>

      {/* ── Venue ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="venue-heading">
        <h2
          id="venue-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          Venue
        </h2>

        <Card className="overflow-hidden">
          <div className="border-l-4 border-primary p-5 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-secondary leading-tight">
                  {EVENT.venue}
                </p>
                <p className="text-sm text-muted">700 F St NW, Washington, DC 20004</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar
                className="h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p className="text-sm text-foreground">
                May 22–25, 2026 &nbsp;&middot;&nbsp; Friday–Monday
              </p>
            </div>

            {/* Rooms */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Rooms
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="rounded-lg bg-primary-50 px-3 py-2 text-sm">
                  <p className="font-semibold text-primary-800">Paris Ballroom</p>
                  <p className="text-xs text-muted">Main sessions &amp; Gala Dinner</p>
                </div>
                <div className="rounded-lg bg-primary-50 px-3 py-2 text-sm">
                  <p className="font-semibold text-primary-800">Athens Ballroom</p>
                  <p className="text-xs text-muted">Poster presentations &amp; Board</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ── Highlights ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="highlights-heading">
        <h2
          id="highlights-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          Event highlights
        </h2>

        <ul className="space-y-2">
          <HighlightItem
            icon={PartyPopper}
            title="Gala Dinner"
            when="Sunday, May 24 · 7:00–11:00 PM"
            detail="Paris Ballroom · Black tie optional"
          />
          <HighlightItem
            icon={Dumbbell}
            title="Morning Pilates"
            when="Sunday, May 24 · 7:15 AM"
            detail="RSVP required — limited spots"
            badge="RSVP"
          />
          <HighlightItem
            icon={Landmark}
            title="Museum Tour"
            when="Friday, May 22 · 3:00–5:00 PM"
            detail="National Mall area"
          />
        </ul>
      </section>

      {/* ── Reminders ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="reminders-heading">
        <h2
          id="reminders-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <Bell className="h-4 w-4" aria-hidden="true" />
            Reminders
          </span>
        </h2>

        <Card className="p-4">
          <p className="mb-4 text-sm text-muted leading-relaxed">
            Get a push notification 15 minutes before sessions on your saved
            agenda. Requires the app installed on your device.
          </p>
          <NotifyToggle />
        </Card>
      </section>

      {/* ── Add to Home Screen ──────────────────────────────────────────────── */}
      <section aria-labelledby="install-heading">
        <h2
          id="install-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            Add to home screen
          </span>
        </h2>

        <Card className="divide-y divide-border">
          {/* iOS */}
          <div className="flex items-start gap-3 p-4">
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-bold"
              aria-hidden="true"
            >
              iOS
            </span>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-secondary">iPhone / iPad</p>
              <p className="text-xs text-muted leading-relaxed">
                Tap the{" "}
                <Share2
                  className="inline h-3.5 w-3.5 align-text-top"
                  aria-label="Share"
                />{" "}
                <strong>Share</strong> button in Safari, then tap{" "}
                <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
              </p>
            </div>
          </div>

          {/* Android */}
          <div className="flex items-start gap-3 p-4">
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700 text-xs font-bold"
              aria-hidden="true"
            >
              And
            </span>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-secondary">Android</p>
              <p className="text-xs text-muted leading-relaxed">
                Tap the <strong>three-dot menu</strong> in Chrome, then tap{" "}
                <strong>&ldquo;Install app&rdquo;</strong> or{" "}
                <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
              </p>
            </div>
          </div>

          {/* Note */}
          <div className="flex items-center gap-2 px-4 py-3 bg-amber-50">
            <Wifi className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            <p className="text-xs text-amber-800">
              Push notifications on iOS require iOS&nbsp;16.4+ and the app
              installed to the home screen.
            </p>
          </div>
        </Card>
      </section>

      {/* ── Links ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="links-heading">
        <h2
          id="links-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          Links
        </h2>

        <Card className="divide-y divide-border">
          <NavLink href="/" label="IAMA main website" external />
          <NavLink href="/congress" label="Annual Meeting page" />
        </Card>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

function HighlightItem({
  icon: Icon,
  title,
  when,
  detail,
  badge,
}: {
  icon: LucideIcon;
  title: string;
  when: string;
  detail?: string;
  badge?: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-secondary leading-tight">
            {title}
          </p>
          {badge && (
            <Badge variant="warning" className="text-[10px]">
              {badge}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted flex items-center gap-1">
          <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
          {when}
        </p>
        {detail && <p className="text-xs text-muted">{detail}</p>}
      </div>
    </li>
  );
}

function NavLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-secondary hover:bg-primary-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    >
      <span>{label}</span>
      <ExternalLink
        className={`h-4 w-4 ${external ? "text-muted" : "text-muted rotate-0"}`}
        aria-hidden="true"
      />
    </Link>
  );
}
