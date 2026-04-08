"use client";

import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  PaymentStatus,
  AbstractStatus,
  RegistrationCategory,
} from "@/types/database";
import {
  Users,
  CreditCard,
  FileText,
  CalendarDays,
  DollarSign,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

interface StatCard {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: React.ElementType;
}

const stats: StatCard[] = [
  {
    label: "Total Members",
    value: "1,248",
    change: "+12% from last month",
    changeType: "up",
    icon: Users,
  },
  {
    label: "Active Memberships",
    value: "943",
    change: "+8% from last month",
    changeType: "up",
    icon: CreditCard,
  },
  {
    label: "Pending Abstracts",
    value: "37",
    change: "5 new this week",
    changeType: "neutral",
    icon: FileText,
  },
  {
    label: "Upcoming Events",
    value: "3",
    change: "Next: Jun 15, 2026",
    changeType: "neutral",
    icon: CalendarDays,
  },
  {
    label: "Total Revenue",
    value: "$184,500",
    change: "+23% from last quarter",
    changeType: "up",
    icon: DollarSign,
  },
];

interface SampleRegistration {
  id: string;
  name: string;
  email: string;
  event: string;
  category: RegistrationCategory;
  paymentStatus: PaymentStatus;
  amount: number;
  date: string;
}

const recentRegistrations: SampleRegistration[] = [
  {
    id: "reg-001",
    name: "Dr. Sara Mohammadi",
    email: "sara.m@hospital.org",
    event: "2026 Annual Congress",
    category: "physician",
    paymentStatus: "completed",
    amount: 45000,
    date: "2026-04-05",
  },
  {
    id: "reg-002",
    name: "Dr. Reza Ahmadi",
    email: "reza.a@university.edu",
    event: "2026 Annual Congress",
    category: "physician",
    paymentStatus: "completed",
    amount: 45000,
    date: "2026-04-04",
  },
  {
    id: "reg-003",
    name: "Niloufar Tehrani",
    email: "n.tehrani@med.edu",
    event: "2026 Annual Congress",
    category: "student",
    paymentStatus: "completed",
    amount: 15000,
    date: "2026-04-03",
  },
  {
    id: "reg-004",
    name: "Dr. Kaveh Rad",
    email: "kaveh.rad@clinic.com",
    event: "Spring Webinar Series",
    category: "physician",
    paymentStatus: "pending",
    amount: 0,
    date: "2026-04-03",
  },
  {
    id: "reg-005",
    name: "Dr. Mina Farahani",
    email: "mfarahani@research.org",
    event: "2026 Annual Congress",
    category: "physician",
    paymentStatus: "completed",
    amount: 45000,
    date: "2026-04-02",
  },
  {
    id: "reg-006",
    name: "Arash Hosseini",
    email: "a.hosseini@hospital.org",
    event: "2026 Annual Congress",
    category: "resident",
    paymentStatus: "completed",
    amount: 25000,
    date: "2026-04-01",
  },
  {
    id: "reg-007",
    name: "Dr. Leila Naderi",
    email: "l.naderi@med.edu",
    event: "Spring Webinar Series",
    category: "virtual",
    paymentStatus: "completed",
    amount: 5000,
    date: "2026-03-31",
  },
  {
    id: "reg-008",
    name: "Parham Shirazi",
    email: "p.shirazi@university.edu",
    event: "2026 Annual Congress",
    category: "student",
    paymentStatus: "pending",
    amount: 15000,
    date: "2026-03-30",
  },
  {
    id: "reg-009",
    name: "Dr. Dariush Karimi",
    email: "d.karimi@clinic.com",
    event: "2026 Annual Congress",
    category: "physician",
    paymentStatus: "failed",
    amount: 45000,
    date: "2026-03-29",
  },
  {
    id: "reg-010",
    name: "Dr. Shirin Soltani",
    email: "s.soltani@hospital.org",
    event: "2026 Annual Congress",
    category: "physician",
    paymentStatus: "completed",
    amount: 45000,
    date: "2026-03-28",
  },
];

interface SampleAbstract {
  id: string;
  title: string;
  author: string;
  event: string;
  category: string;
  status: AbstractStatus;
  submittedDate: string;
}

const recentAbstracts: SampleAbstract[] = [
  {
    id: "abs-001",
    title: "Novel Biomarkers in Early Detection of Cardiac Disease",
    author: "Dr. Sara Mohammadi",
    event: "2026 Annual Congress",
    category: "Cardiology",
    status: "submitted",
    submittedDate: "2026-04-05",
  },
  {
    id: "abs-002",
    title: "Telemedicine Outcomes in Rural Iranian Communities",
    author: "Dr. Reza Ahmadi",
    event: "2026 Annual Congress",
    category: "Public Health",
    status: "under_review",
    submittedDate: "2026-04-03",
  },
  {
    id: "abs-003",
    title: "Machine Learning Applications in Radiology Diagnostics",
    author: "Niloufar Tehrani",
    event: "2026 Annual Congress",
    category: "Radiology",
    status: "submitted",
    submittedDate: "2026-04-02",
  },
  {
    id: "abs-004",
    title: "Genetic Markers of Familial Mediterranean Fever",
    author: "Dr. Kaveh Rad",
    event: "2026 Annual Congress",
    category: "Genetics",
    status: "accepted",
    submittedDate: "2026-03-28",
  },
  {
    id: "abs-005",
    title: "Pediatric Asthma Management: A Comparative Study",
    author: "Dr. Mina Farahani",
    event: "2026 Annual Congress",
    category: "Pediatrics",
    status: "revision_requested",
    submittedDate: "2026-03-25",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function paymentStatusBadge(status: PaymentStatus) {
  const map: Record<PaymentStatus, { variant: "success" | "warning" | "destructive" | "outline"; label: string }> = {
    completed: { variant: "success", label: "Completed" },
    pending: { variant: "warning", label: "Pending" },
    failed: { variant: "destructive", label: "Failed" },
    refunded: { variant: "outline", label: "Refunded" },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

function abstractStatusBadge(status: AbstractStatus) {
  const map: Record<AbstractStatus, { variant: "default" | "success" | "warning" | "destructive" | "outline"; label: string }> = {
    draft: { variant: "outline", label: "Draft" },
    submitted: { variant: "default", label: "Submitted" },
    under_review: { variant: "warning", label: "Under Review" },
    accepted: { variant: "success", label: "Accepted" },
    rejected: { variant: "destructive", label: "Rejected" },
    revision_requested: { variant: "warning", label: "Revision Requested" },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of IAMA administration activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">
                    {stat.label}
                  </span>
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p
                  className={cn(
                    "mt-1 flex items-center gap-1 text-xs",
                    stat.changeType === "up"
                      ? "text-success"
                      : stat.changeType === "down"
                        ? "text-destructive"
                        : "text-muted"
                  )}
                >
                  {stat.changeType === "up" && (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Registrations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Registrations</CardTitle>
          <Button variant="ghost" size="sm" asChild href="/admin/events">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-medium text-muted">Name</th>
                  <th className="pb-3 pr-4 font-medium text-muted">Event</th>
                  <th className="pb-3 pr-4 font-medium text-muted">
                    Category
                  </th>
                  <th className="pb-3 pr-4 font-medium text-muted">Amount</th>
                  <th className="pb-3 pr-4 font-medium text-muted">Status</th>
                  <th className="pb-3 font-medium text-muted">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-3 pr-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {reg.name}
                        </p>
                        <p className="text-xs text-muted">{reg.email}</p>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-foreground">{reg.event}</td>
                    <td className="py-3 pr-4 capitalize text-foreground">
                      {reg.category}
                    </td>
                    <td className="py-3 pr-4 text-foreground">
                      {formatCurrency(reg.amount)}
                    </td>
                    <td className="py-3 pr-4">
                      {paymentStatusBadge(reg.paymentStatus)}
                    </td>
                    <td className="py-3 whitespace-nowrap text-muted">
                      {formatDate(reg.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Abstracts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Abstract Submissions</CardTitle>
          <Button variant="ghost" size="sm" asChild href="/admin/abstracts">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-medium text-muted">Title</th>
                  <th className="pb-3 pr-4 font-medium text-muted">Author</th>
                  <th className="pb-3 pr-4 font-medium text-muted">
                    Category
                  </th>
                  <th className="pb-3 pr-4 font-medium text-muted">Status</th>
                  <th className="pb-3 font-medium text-muted">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {recentAbstracts.map((abs) => (
                  <tr
                    key={abs.id}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-3 pr-4 max-w-xs">
                      <p className="font-medium text-foreground truncate">
                        {abs.title}
                      </p>
                    </td>
                    <td className="py-3 pr-4 text-foreground whitespace-nowrap">
                      {abs.author}
                    </td>
                    <td className="py-3 pr-4 text-foreground">
                      {abs.category}
                    </td>
                    <td className="py-3 pr-4">
                      {abstractStatusBadge(abs.status)}
                    </td>
                    <td className="py-3 whitespace-nowrap text-muted">
                      {formatDate(abs.submittedDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
