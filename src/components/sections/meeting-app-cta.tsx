import Link from "next/link";
import { Smartphone, CalendarDays, Star, Bell, ArrowRight } from "lucide-react";

/**
 * Promo banner that points attendees to the installable Meeting App (/app).
 * Drop it onto marketing pages (home, congress, annual-meeting) during the
 * event. Server component — no client JS.
 */
export function MeetingAppCta({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          {/* subtle dot texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
              backgroundSize: "44px 44px, 28px 28px",
            }}
          />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                <Smartphone className="h-3.5 w-3.5" />
                Live now · 30th Annual Meeting
              </span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Get the Meeting App
              </h2>
              <p className="mt-2 text-primary-100 leading-relaxed">
                The full agenda in your pocket — browse every session and talk,
                star them into your personal schedule, see what&apos;s happening
                now, and add it to your home screen like a native app.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-100">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary-light" />
                  Full schedule &amp; speakers
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary-light" />
                  Save your sessions
                </span>
                <span className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary-light" />
                  Session reminders
                </span>
              </div>
            </div>
            <div className="shrink-0">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-50"
              >
                Open the Meeting App
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
