"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  Star,
  Users,
  Info,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = { label: string; href: string; icon: LucideIcon };

const tabs: Tab[] = [
  { label: "Today", href: "/app", icon: Home },
  { label: "Schedule", href: "/app/schedule", icon: CalendarDays },
  { label: "Saved", href: "/app/my-agenda", icon: Star },
  { label: "Speakers", href: "/app/people", icon: Users },
  { label: "Info", href: "/app/info", icon: Info },
];

function isTabActive(pathname: string, href: string): boolean {
  if (href === "/app") return pathname === "/app";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AppNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-14 w-full border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-screen-sm items-center justify-between px-4">
          <Link
            href="/app"
            className="flex items-center gap-2"
            aria-label="IAMA Meeting home"
          >
            <Image
              src="/logo.png"
              alt="IAMA"
              width={1636}
              height={696}
              priority
              className="h-7 w-auto"
            />
            <span className="text-sm font-semibold text-secondary">
              Meeting
            </span>
          </Link>

          <Link
            href="/"
            className="flex h-11 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Full site</span>
          </Link>
        </div>
      </header>

      {/* Bottom tab bar */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white pb-[env(safe-area-inset-bottom)]"
      >
        <div className="mx-auto grid max-w-screen-sm grid-cols-5">
          {tabs.map(({ label, href, icon: Icon }) => {
            const active = isTabActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-14 min-h-11 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted hover:text-secondary"
                )}
              >
                <Icon
                  className="h-5 w-5"
                  strokeWidth={active ? 2.4 : 2}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
