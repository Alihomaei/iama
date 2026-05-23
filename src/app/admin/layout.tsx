"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Profile, AdminRole } from "@/types/database";
import {
  LayoutDashboard,
  Users,
  FileText,
  CalendarDays,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────
// ⚠️  TEMPORARY ADMIN BYPASS — REMOVE WHEN SUPABASE IS CONNECTED
// Production has no Supabase backend yet (the Vercel project has no env vars,
// so the client falls back to https://placeholder.supabase.co and real auth
// cannot run). Until Supabase is wired up, /admin is protected by a hardcoded
// passphrase instead of a real login.
//
// NOTE: this is a CLIENT-SIDE gate only — the passphrase ships in the JS
// bundle, so it is a speed bump, not real security. It is acceptable only
// because there is no real data behind it yet (every admin page renders local
// sample data). To restore real auth: set ADMIN_BYPASS = false and finish the
// Supabase setup documented in README → "Admin access (temporary bypass)".
const ADMIN_BYPASS = true;
const ADMIN_BYPASS_PASSWORD = "iama-admin-2026";
const ADMIN_BYPASS_PROFILE: Profile = {
  id: "bypass-admin",
  email: "ali.homaei2012@gmail.com",
  full_name: "Ali Homaei",
  first_name: "Ali",
  last_name: "Homaei",
  avatar_url: null,
  phone: null,
  specialty: null,
  institution: null,
  city: null,
  state: null,
  country: null,
  bio: null,
  is_public_directory: false,
  admin_role: "super_admin",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
// ─────────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: AdminRole[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["super_admin", "content_editor", "abstract_reviewer", "event_manager"],
  },
  {
    label: "Members",
    href: "/admin/members",
    icon: Users,
    roles: ["super_admin"],
  },
  {
    label: "Abstracts",
    href: "/admin/abstracts",
    icon: FileText,
    roles: ["super_admin", "abstract_reviewer"],
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: CalendarDays,
    roles: ["super_admin", "event_manager"],
  },
  {
    label: "Content",
    href: "/admin/content",
    icon: Newspaper,
    roles: ["super_admin", "content_editor"],
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["super_admin"],
  },
];

function getRoleLabel(role: AdminRole): string {
  const labels: Record<AdminRole, string> = {
    super_admin: "Super Admin",
    content_editor: "Content Editor",
    abstract_reviewer: "Abstract Reviewer",
    event_manager: "Event Manager",
  };
  return labels[role];
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Temporary passphrase gate state (see ADMIN_BYPASS above)
  const [bypassGate, setBypassGate] = useState(false);
  const [bypassInput, setBypassInput] = useState("");
  const [bypassError, setBypassError] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      // TEMPORARY: hardcoded passphrase gate while Supabase is not connected.
      if (ADMIN_BYPASS) {
        if (sessionStorage.getItem("iama_admin_bypass") === "ok") {
          setProfile(ADMIN_BYPASS_PROFILE);
          setLoading(false);
        } else {
          setBypassGate(true);
          setLoading(false);
        }
        return;
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login?redirect=/admin");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profileData?.admin_role) {
        router.replace("/dashboard");
        return;
      }

      setProfile(profileData as Profile);
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  async function handleSignOut() {
    if (ADMIN_BYPASS) {
      sessionStorage.removeItem("iama_admin_bypass");
      router.replace("/");
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/");
  }

  function handleBypassSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (bypassInput === ADMIN_BYPASS_PASSWORD) {
      sessionStorage.setItem("iama_admin_bypass", "ok");
      setProfile(ADMIN_BYPASS_PROFILE);
      setBypassGate(false);
      setBypassError("");
    } else {
      setBypassError("Incorrect passphrase. Try again.");
    }
  }

  const visibleNavItems = navItems.filter(
    (item) => profile?.admin_role && item.roles.includes(profile.admin_role)
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-3 text-sm text-muted">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // TEMPORARY passphrase gate (shown while Supabase auth is not connected)
  if (bypassGate) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleBypassSubmit}
          className="w-full max-w-sm rounded-xl border border-border bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold text-secondary">IAMA Admin</h1>
          </div>
          <p className="mb-4 text-sm text-muted">
            Temporary access. Enter the admin passphrase to continue.
          </p>
          <input
            type="password"
            value={bypassInput}
            onChange={(e) => setBypassInput(e.target.value)}
            placeholder="Passphrase"
            autoFocus
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {bypassError && (
            <p className="mt-2 text-sm text-destructive">{bypassError}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Enter
          </button>
          <p className="mt-4 text-center text-xs text-muted">
            Temporary bypass — real login returns once Supabase is connected.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-secondary text-white transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary-light" />
            <span className="text-lg font-bold">IAMA Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {visibleNavItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info at bottom */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-white truncate">
              {profile?.full_name}
            </p>
            <p className="text-xs text-white/60 truncate">{profile?.email}</p>
            {profile?.admin_role && (
              <span className="mt-1 inline-block rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary-light">
                {getRoleLabel(profile.admin_role)}
              </span>
            )}
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-muted hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-sm font-medium text-muted">
              IAMA Administration Panel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              View Site
            </Link>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">
                {profile?.first_name?.charAt(0)}
                {profile?.last_name?.charAt(0)}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
