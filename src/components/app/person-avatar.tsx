import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-xl",
};

/** Pixel dimensions handed to next/image so it can optimize correctly. */
const sizePx: Record<AvatarSize, number> = {
  sm: 36,
  md: 48,
  lg: 64,
};

/** First letters of the first and last name, max two characters. */
function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase() || "?";
}

export function PersonAvatar({
  name,
  photoUrl,
  size = "md",
}: {
  name: string;
  photoUrl?: string;
  size?: AvatarSize;
}) {
  if (photoUrl) {
    const px = sizePx[size];
    return (
      <Image
        src={photoUrl}
        alt={name}
        width={px}
        height={px}
        className={cn(
          "shrink-0 rounded-full object-cover",
          sizeClasses[size]
        )}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700",
        sizeClasses[size]
      )}
    >
      {initialsFor(name)}
    </div>
  );
}
