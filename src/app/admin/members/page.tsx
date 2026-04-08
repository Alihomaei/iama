"use client";

import { useState, useMemo } from "react";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MembershipTier, MembershipStatus } from "@/types/database";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  X,
  UserPlus,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

interface SampleMember {
  id: string;
  fullName: string;
  email: string;
  tier: MembershipTier;
  status: MembershipStatus;
  specialty: string;
  institution: string;
  joinedDate: string;
}

const sampleMembers: SampleMember[] = [
  { id: "m-001", fullName: "Dr. Sara Mohammadi", email: "sara.m@hospital.org", tier: "fellow", status: "active", specialty: "Cardiology", institution: "Johns Hopkins Hospital", joinedDate: "2022-03-15" },
  { id: "m-002", fullName: "Dr. Reza Ahmadi", email: "reza.a@university.edu", tier: "fellow", status: "active", specialty: "Neurology", institution: "UCLA Medical Center", joinedDate: "2021-08-20" },
  { id: "m-003", fullName: "Niloufar Tehrani", email: "n.tehrani@med.edu", tier: "student", status: "active", specialty: "Internal Medicine", institution: "Stanford Med School", joinedDate: "2025-09-01" },
  { id: "m-004", fullName: "Dr. Kaveh Rad", email: "kaveh.rad@clinic.com", tier: "associate", status: "active", specialty: "Dermatology", institution: "Mayo Clinic", joinedDate: "2023-01-10" },
  { id: "m-005", fullName: "Dr. Mina Farahani", email: "mfarahani@research.org", tier: "fellow", status: "active", specialty: "Oncology", institution: "MD Anderson Cancer Center", joinedDate: "2020-06-22" },
  { id: "m-006", fullName: "Arash Hosseini", email: "a.hosseini@hospital.org", tier: "associate", status: "expired", specialty: "Surgery", institution: "Mass General Hospital", joinedDate: "2023-04-14" },
  { id: "m-007", fullName: "Dr. Leila Naderi", email: "l.naderi@med.edu", tier: "faculty", status: "active", specialty: "Pediatrics", institution: "Children's Hospital of Philadelphia", joinedDate: "2019-11-05" },
  { id: "m-008", fullName: "Parham Shirazi", email: "p.shirazi@university.edu", tier: "student", status: "pending", specialty: "Psychiatry", institution: "Harvard Medical School", joinedDate: "2026-01-20" },
  { id: "m-009", fullName: "Dr. Dariush Karimi", email: "d.karimi@clinic.com", tier: "fellow", status: "active", specialty: "Gastroenterology", institution: "Cleveland Clinic", joinedDate: "2021-02-28" },
  { id: "m-010", fullName: "Dr. Shirin Soltani", email: "s.soltani@hospital.org", tier: "associate", status: "active", specialty: "Ophthalmology", institution: "Wilmer Eye Institute", joinedDate: "2022-07-18" },
  { id: "m-011", fullName: "Dr. Babak Tavakoli", email: "b.tavakoli@hospital.org", tier: "international", status: "active", specialty: "Orthopedics", institution: "Tehran University of Medical Sciences", joinedDate: "2024-05-11" },
  { id: "m-012", fullName: "Dr. Yasmin Nazari", email: "y.nazari@research.org", tier: "fellow", status: "cancelled", specialty: "Endocrinology", institution: "UCSF Medical Center", joinedDate: "2020-12-03" },
  { id: "m-013", fullName: "Dr. Omid Bahrami", email: "o.bahrami@university.edu", tier: "faculty", status: "active", specialty: "Pathology", institution: "University of Michigan", joinedDate: "2018-09-15" },
  { id: "m-014", fullName: "Elham Jafari", email: "e.jafari@med.edu", tier: "student", status: "active", specialty: "Family Medicine", institution: "Columbia Medical School", joinedDate: "2025-08-25" },
  { id: "m-015", fullName: "Dr. Farhad Azizi", email: "f.azizi@clinic.com", tier: "fellow", status: "expired", specialty: "Pulmonology", institution: "Northwestern Memorial", joinedDate: "2019-04-07" },
  { id: "m-016", fullName: "Dr. Nazanin Rostami", email: "n.rostami@hospital.org", tier: "associate", status: "active", specialty: "Anesthesiology", institution: "NYU Langone", joinedDate: "2023-10-30" },
  { id: "m-017", fullName: "Dr. Alireza Kamali", email: "a.kamali@research.org", tier: "fellow", status: "active", specialty: "Rheumatology", institution: "Brigham and Women's Hospital", joinedDate: "2021-06-14" },
  { id: "m-018", fullName: "Saba Moradi", email: "s.moradi@med.edu", tier: "student", status: "active", specialty: "Emergency Medicine", institution: "University of Pennsylvania", joinedDate: "2025-07-01" },
];

const PAGE_SIZE = 8;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tierBadge(tier: MembershipTier) {
  const map: Record<MembershipTier, { variant: "default" | "success" | "warning" | "outline"; label: string }> = {
    fellow: { variant: "default", label: "Fellow" },
    associate: { variant: "outline", label: "Associate" },
    student: { variant: "warning", label: "Student" },
    international: { variant: "success", label: "International" },
    faculty: { variant: "default", label: "Faculty" },
  };
  const { variant, label } = map[tier];
  return <Badge variant={variant}>{label}</Badge>;
}

function statusBadge(status: MembershipStatus) {
  const map: Record<MembershipStatus, { variant: "success" | "warning" | "destructive" | "outline"; label: string }> = {
    active: { variant: "success", label: "Active" },
    pending: { variant: "warning", label: "Pending" },
    expired: { variant: "destructive", label: "Expired" },
    cancelled: { variant: "outline", label: "Cancelled" },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ---------------------------------------------------------------------------
// Detail panel
// ---------------------------------------------------------------------------

function MemberDetailPanel({
  member,
  onClose,
}: {
  member: SampleMember;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-border bg-white shadow-xl overflow-y-auto">
      <div className="flex items-center justify-between border-b border-border p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Member Details
        </h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-muted hover:bg-gray-100 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6 p-6">
        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
            {member.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {member.fullName}
            </p>
            <p className="text-sm text-muted">{member.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-muted">Tier</p>
            <div className="mt-1">{tierBadge(member.tier)}</div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Status</p>
            <div className="mt-1">{statusBadge(member.status)}</div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Specialty</p>
            <p className="mt-1 text-sm text-foreground">{member.specialty}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Institution</p>
            <p className="mt-1 text-sm text-foreground">{member.institution}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-medium text-muted">Joined</p>
            <p className="mt-1 text-sm text-foreground">
              {formatDate(member.joinedDate)}
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="primary" size="sm" className="flex-1">
            <Pencil className="h-4 w-4" /> Edit Member
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4" /> View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<SampleMember | null>(
    null
  );

  const filtered = useMemo(() => {
    return sampleMembers.filter((m) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        m.fullName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q);
      const matchesTier = !tierFilter || m.tier === tierFilter;
      const matchesStatus = !statusFilter || m.status === statusFilter;
      return matchesSearch && matchesTier && matchesStatus;
    });
  }, [search, tierFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const tierOptions = [
    { value: "", label: "All Tiers" },
    { value: "fellow", label: "Fellow" },
    { value: "associate", label: "Associate" },
    { value: "student", label: "Student" },
    { value: "international", label: "International" },
    { value: "faculty", label: "Faculty" },
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "expired", label: "Expired" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Members</h1>
          <p className="mt-1 text-sm text-muted">
            Manage IAMA member accounts and memberships.
          </p>
        </div>
        <Button variant="primary" size="sm">
          <UserPlus className="h-4 w-4" /> Add Member
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                options={tierOptions}
                value={tierFilter}
                onChange={(e) => {
                  setTierFilter(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-6 py-3 font-medium text-muted">Name</th>
                  <th className="px-6 py-3 font-medium text-muted">Email</th>
                  <th className="px-6 py-3 font-medium text-muted">Tier</th>
                  <th className="px-6 py-3 font-medium text-muted">Status</th>
                  <th className="px-6 py-3 font-medium text-muted">Joined</th>
                  <th className="px-6 py-3 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-muted"
                    >
                      No members found matching your filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((member) => (
                    <tr
                      key={member.id}
                      onClick={() => setSelectedMember(member)}
                      className="cursor-pointer border-b border-border/50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">
                          {member.fullName}
                        </p>
                        <p className="text-xs text-muted">
                          {member.specialty}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {member.email}
                      </td>
                      <td className="px-6 py-4">{tierBadge(member.tier)}</td>
                      <td className="px-6 py-4">
                        {statusBadge(member.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted">
                        {formatDate(member.joinedDate)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMember(member);
                            }}
                            className="rounded-lg p-1.5 text-muted hover:bg-gray-100 hover:text-foreground"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMember(member);
                            }}
                            className="rounded-lg p-1.5 text-muted hover:bg-gray-100 hover:text-foreground"
                            title="Edit member"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <p className="text-sm text-muted">
                Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                {Math.min(currentPage * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length} members
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail side panel */}
      {selectedMember && (
        <MemberDetailPanel
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
