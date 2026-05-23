import type { ReactNode } from "react";
import Link from "next/link";
import type { Person, Talk } from "@/lib/agenda/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function RoleBadge({ role }: { role: Talk["role"] }) {
  if (role === "keynote") return <Badge variant="warning">Keynote</Badge>;
  if (role === "poster") return <Badge variant="outline">Poster</Badge>;
  return null;
}

export function TalkRow({
  talk,
  speakers,
  href,
  action,
}: {
  talk: Talk;
  speakers: Person[];
  href?: string;
  action?: ReactNode;
}) {
  const speakerNames = speakers.map((s) => s.name).join(", ");

  const inner = (
    <div className="flex items-start gap-3">
      {talk.start && (
        <span className="w-12 shrink-0 pt-0.5 text-xs font-medium tabular-nums text-muted">
          {talk.start}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="min-w-0 font-medium leading-snug text-secondary">
            {talk.title}
          </h4>
          <RoleBadge role={talk.role} />
        </div>
        {speakerNames && (
          <p className="mt-0.5 truncate text-sm text-muted">{speakerNames}</p>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card transition-colors",
        href && "hover:bg-primary-50/40"
      )}
    >
      {href ? (
        <Link
          href={href}
          className={cn(
            "block rounded-lg px-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            action && "pr-12"
          )}
        >
          {inner}
        </Link>
      ) : (
        <div className={cn("px-3 py-2.5", action && "pr-12")}>{inner}</div>
      )}

      {/* Action slot — outside the Link so it stays independently tappable. */}
      {action && (
        <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
          {action}
        </div>
      )}
    </div>
  );
}
