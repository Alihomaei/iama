"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import type { AbstractStatus } from "@/types/database";

const statusConfig: Record<
  AbstractStatus,
  { label: string; variant: BadgeVariant; icon: typeof Clock }
> = {
  draft: { label: "Draft", variant: "outline", icon: FileText },
  submitted: { label: "Submitted", variant: "default", icon: Clock },
  under_review: { label: "Under Review", variant: "warning", icon: AlertCircle },
  accepted: { label: "Accepted", variant: "success", icon: CheckCircle },
  rejected: { label: "Rejected", variant: "destructive", icon: XCircle },
  revision_requested: {
    label: "Revision Requested",
    variant: "warning",
    icon: AlertCircle,
  },
};

// Sample data
const sampleAbstracts = [
  {
    id: "1",
    title: "Novel Biomarkers in Early Detection of Pancreatic Cancer",
    category: "Oncology",
    status: "submitted" as AbstractStatus,
    submitted_at: "2026-03-15",
    authors: ["Dr. Sara Mohammadi", "Dr. Leila Tehrani"],
  },
  {
    id: "2",
    title: "AI-Assisted Cardiac Risk Stratification in Diverse Populations",
    category: "Cardiology",
    status: "under_review" as AbstractStatus,
    submitted_at: "2026-03-10",
    authors: ["Dr. Kaveh Nasseri", "Dr. Babak Sharifi"],
  },
  {
    id: "3",
    title: "Outcomes of Robotic Surgery in Complex Urological Cases",
    category: "Surgery",
    status: "draft" as AbstractStatus,
    submitted_at: null,
    authors: ["Dr. Mehrdad Ayati"],
  },
];

export default function AbstractStatusPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { email: data.user.email ?? "" } : null);
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

  if (!user) {
    return (
      <>
        <Navbar />
        <main>
          <PageHeader
            title="My Submissions"
            subtitle="Sign in to view your abstract submissions."
            breadcrumbs={[
              { label: "Abstracts" },
              { label: "My Submissions" },
            ]}
          />
          <section className="py-20">
            <div className="mx-auto max-w-md px-4 text-center">
              <p className="text-muted mb-6">
                Please sign in to view your submissions.
              </p>
              <Button
                asChild
                href="/auth/login?redirect=/abstracts/status"
                size="lg"
              >
                Sign In
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="My Submissions"
          subtitle="Track the status of your submitted abstracts for the IAMA Annual Congress."
          breadcrumbs={[
            { label: "Abstracts" },
            { label: "My Submissions" },
          ]}
        />

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary">
                {sampleAbstracts.length} Abstract(s)
              </h2>
              <Button asChild href="/abstracts/submit" size="sm">
                <Plus className="h-4 w-4" />
                New Submission
              </Button>
            </div>

            <div className="space-y-4">
              {sampleAbstracts.map((abstract) => {
                const config = statusConfig[abstract.status];
                const StatusIcon = config.icon;

                return (
                  <Card key={abstract.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant={config.variant}>
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {config.label}
                            </Badge>
                            <span className="text-xs text-muted">
                              {abstract.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-secondary">
                            {abstract.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            Authors: {abstract.authors.join(", ")}
                          </p>
                          {abstract.submitted_at && (
                            <p className="mt-1 text-xs text-muted">
                              Submitted: {abstract.submitted_at}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {abstract.status === "draft" && (
                            <Button
                              asChild
                              href="/abstracts/submit"
                              variant="outline"
                              size="sm"
                            >
                              Continue Editing
                            </Button>
                          )}
                          {abstract.status === "revision_requested" && (
                            <Button
                              asChild
                              href="/abstracts/submit"
                              variant="outline"
                              size="sm"
                            >
                              Revise
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {sampleAbstracts.length === 0 && (
              <div className="py-20 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted/40" />
                <h3 className="mt-4 text-lg font-semibold text-secondary">
                  No abstracts yet
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Submit your first abstract for the IAMA Annual Congress.
                </p>
                <div className="mt-6">
                  <Button asChild href="/abstracts/submit">
                    Submit Abstract
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
