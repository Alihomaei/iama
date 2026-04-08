"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  FileText,
  Ticket,
  UserCircle,
  ArrowRight,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, [supabase.auth]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="text-muted">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-[calc(100vh-5rem)]">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
            <h1 className="text-2xl font-bold text-secondary">
              Welcome back, {displayName}
            </h1>
            <p className="mt-1 text-sm text-muted">
              Manage your membership, registrations, and abstract submissions.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Membership Status */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Membership Status
                    </CardTitle>
                    <Badge variant="success">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted">Tier</p>
                      <p className="font-semibold text-secondary">Fellow</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted">Member Since</p>
                      <p className="font-semibold text-secondary">
                        January 2023
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted">Expires</p>
                      <p className="font-semibold text-secondary">
                        December 2026
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                    <CheckCircle className="h-3.5 w-3.5 text-success" />
                    Auto-renewal is enabled
                  </div>
                </CardContent>
              </Card>

              {/* Recent Registrations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-primary" />
                    Event Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary">
                            IAMA Annual Congress 2026
                          </p>
                          <p className="text-sm text-muted">
                            October 16-18, 2026 &middot; Physician &middot;
                            Early Bird
                          </p>
                        </div>
                      </div>
                      <Badge variant="success">Confirmed</Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary">
                            Spring CME Symposium
                          </p>
                          <p className="text-sm text-muted">
                            May 10, 2026 &middot; Virtual
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Registered</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Abstract Submissions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Abstract Submissions
                    </CardTitle>
                    <Link
                      href="/abstracts/status"
                      className="text-sm text-primary hover:text-primary-dark"
                    >
                      View all
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="font-medium text-secondary text-sm">
                          Novel Biomarkers in Early Detection of Pancreatic
                          Cancer
                        </p>
                        <p className="text-xs text-muted mt-1">
                          Submitted March 15, 2026 &middot; Oncology
                        </p>
                      </div>
                      <Badge variant="default">
                        <Clock className="mr-1 h-3 w-3" />
                        Submitted
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="font-medium text-secondary text-sm">
                          AI-Assisted Cardiac Risk Stratification
                        </p>
                        <p className="text-xs text-muted mt-1">
                          Submitted March 10, 2026 &middot; Cardiology
                        </p>
                      </div>
                      <Badge variant="warning">Under Review</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    {
                      label: "Submit Abstract",
                      href: "/abstracts/submit",
                      icon: FileText,
                      description: "Submit research for Congress 2026",
                    },
                    {
                      label: "Register for Congress",
                      href: "/congress/register",
                      icon: Ticket,
                      description: "Early bird pricing available",
                    },
                    {
                      label: "Update Profile",
                      href: "/dashboard",
                      icon: UserCircle,
                      description: "Edit your member profile",
                    },
                    {
                      label: "Manage Billing",
                      href: "/dashboard",
                      icon: CreditCard,
                      description: "View invoices and payment methods",
                    },
                  ].map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.label}
                        href={action.href}
                        className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-primary-50 group"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-muted group-hover:bg-primary-100 group-hover:text-primary transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                            {action.label}
                          </p>
                          <p className="text-xs text-muted">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      date: "June 1, 2026",
                      label: "Abstract Submission Deadline",
                    },
                    {
                      date: "July 15, 2026",
                      label: "Early Bird Registration Ends",
                    },
                    {
                      date: "September 1, 2026",
                      label: "Regular Registration Ends",
                    },
                  ].map((deadline) => (
                    <div
                      key={deadline.label}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary">
                          {deadline.label}
                        </p>
                        <p className="text-xs text-muted">{deadline.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Email</span>
                    <span className="font-medium text-secondary truncate ml-4">
                      {user?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Member ID</span>
                    <span className="font-medium text-secondary font-mono">
                      IAMA-2023-0042
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Joined</span>
                    <span className="font-medium text-secondary">
                      January 2023
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
