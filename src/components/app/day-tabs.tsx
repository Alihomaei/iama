"use client";

import type { Day } from "@/lib/agenda/types";
import { cn } from "@/lib/utils";

/** Shorten "Saturday, May 23" -> "May 23" for the compact tab label. */
function shortLabel(day: Day): string {
  const parts = day.label.split(",");
  return (parts[1] ?? parts[0] ?? day.label).trim();
}

export function DayTabs({
  days,
  value,
  onChange,
}: {
  days: Day[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="sticky top-14 z-30 -mx-4 bg-gray-50/90 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-gray-50/75">
      <div
        role="tablist"
        aria-label="Conference days"
        className="flex gap-1 overflow-x-auto rounded-lg bg-gray-200/60 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {days.map((day) => {
          const active = day.id === value;
          return (
            <button
              key={day.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(day.id)}
              className={cn(
                "flex min-h-11 shrink-0 flex-col items-center justify-center rounded-md px-3.5 py-1.5 leading-tight transition-colors",
                active
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted hover:text-secondary"
              )}
            >
              <span className="text-[11px] font-medium uppercase tracking-wide">
                {day.weekday.slice(0, 3)}
              </span>
              <span className="text-sm font-semibold">{shortLabel(day)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
