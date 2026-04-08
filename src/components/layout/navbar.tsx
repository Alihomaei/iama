"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Membership", href: "/membership" },
  {
    label: "Congress",
    href: "/congress",
    children: [
      { label: "Overview", href: "/congress" },
      { label: "Register", href: "/congress/register" },
      { label: "Schedule", href: "/congress/schedule" },
      { label: "Speakers", href: "/congress/speakers" },
    ],
  },
  {
    label: "Abstracts",
    href: "/abstracts/submit",
    children: [
      { label: "Submit Abstract", href: "/abstracts/submit" },
      { label: "My Submissions", href: "/abstracts/status" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Education", href: "/education" },
  { label: "Find a Doctor", href: "/directory" },
  { label: "Advocacy", href: "/advocacy" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-200",
        scrolled && "shadow-md"
      )}
    >
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-primary-800" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
            I
          </div>
          <span className="text-xl font-bold text-secondary">
            IAMA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            if (item.children) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "text-primary"
                        : "text-secondary hover:text-primary hover:bg-primary-50"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full w-48 rounded-lg border border-border bg-white py-1 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors",
                            pathname === child.href
                              ? "bg-primary-50 text-primary"
                              : "text-secondary hover:bg-primary-50 hover:text-primary"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-secondary hover:text-primary hover:bg-primary-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: auth buttons or user menu */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 transition-colors hover:bg-primary-200 cursor-pointer"
              >
                <User className="h-4 w-4" />
              </button>
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-border bg-white py-1 shadow-lg">
                    <div className="border-b border-border px-4 py-2">
                      <p className="text-sm font-medium text-secondary truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:bg-primary-50 hover:text-primary"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-secondary hover:bg-primary-50 hover:text-primary cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-secondary hover:bg-primary-50 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                        isActive
                          ? "text-primary bg-primary-50"
                          : "text-secondary hover:bg-primary-50"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm transition-colors",
                              pathname === child.href
                                ? "text-primary bg-primary-50"
                                : "text-muted hover:text-primary hover:bg-primary-50"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary-50"
                      : "text-secondary hover:bg-primary-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="border-t border-border pt-4 mt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-secondary hover:bg-primary-50"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-secondary hover:bg-primary-50 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-secondary hover:bg-primary-50"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-dark"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
