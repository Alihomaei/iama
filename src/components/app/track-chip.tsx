import type { TrackId } from "@/lib/agenda/types";
import { cn } from "@/lib/utils";

/**
 * Tailwind background+text classes for every {@link TrackId}. Exported so other
 * components can color-coordinate (e.g. left rails, legends) without re-deriving.
 */
export const trackColors: Record<TrackId, string> = {
  surgery: "bg-rose-100 text-rose-800",
  cardiovascular: "bg-blue-100 text-blue-800",
  medicine: "bg-teal-100 text-teal-800",
  neurotech: "bg-violet-100 text-violet-800",
  neuroscience: "bg-indigo-100 text-indigo-800",
  dermatology: "bg-pink-100 text-pink-800",
  keynote: "bg-amber-100 text-amber-800",
  medtech: "bg-cyan-100 text-cyan-800",
  pitch: "bg-emerald-100 text-emerald-800",
  poster: "bg-slate-100 text-slate-800",
  social: "bg-fuchsia-100 text-fuchsia-800",
  break: "bg-gray-100 text-gray-700",
  business: "bg-stone-100 text-stone-800",
  wellness: "bg-green-100 text-green-800",
  general: "bg-gray-100 text-gray-700",
};

/** Human-friendly label for every {@link TrackId}. Exported for reuse. */
export const trackLabels: Record<TrackId, string> = {
  surgery: "Surgery",
  cardiovascular: "Cardiovascular",
  medicine: "Medicine",
  neurotech: "NeuroTech",
  neuroscience: "Neuroscience",
  dermatology: "Dermatology",
  keynote: "Keynote",
  medtech: "Med/Tech",
  pitch: "Pitch",
  poster: "Poster",
  social: "Social",
  break: "Break",
  business: "Business",
  wellness: "Wellness",
  general: "General",
};

export function TrackChip({
  track,
  className,
}: {
  track: TrackId;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        trackColors[track] ?? trackColors.general,
        className
      )}
    >
      {trackLabels[track] ?? trackLabels.general}
    </span>
  );
}
