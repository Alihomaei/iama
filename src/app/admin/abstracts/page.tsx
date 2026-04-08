"use client";

import { useState, useMemo } from "react";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import type { AbstractStatus } from "@/types/database";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

interface SampleAbstract {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  event: string;
  eventId: string;
  category: string;
  status: AbstractStatus;
  submittedDate: string;
  reviewer: string | null;
  reviewerComments: string | null;
  keywords: string[];
  background: string;
  methods: string;
  results: string;
  conclusion: string;
}

const reviewerOptions = [
  { value: "", label: "Unassigned" },
  { value: "dr-mohammadi", label: "Dr. Sara Mohammadi" },
  { value: "dr-ahmadi", label: "Dr. Reza Ahmadi" },
  { value: "dr-farahani", label: "Dr. Mina Farahani" },
  { value: "dr-naderi", label: "Dr. Leila Naderi" },
];

const sampleAbstracts: SampleAbstract[] = [
  {
    id: "abs-001",
    title: "Novel Biomarkers in Early Detection of Cardiac Disease",
    authorName: "Dr. Sara Mohammadi",
    authorEmail: "sara.m@hospital.org",
    event: "2026 Annual Congress",
    eventId: "evt-001",
    category: "Cardiology",
    status: "submitted",
    submittedDate: "2026-04-05",
    reviewer: null,
    reviewerComments: null,
    keywords: ["biomarkers", "cardiac", "early detection"],
    background: "Cardiovascular disease remains the leading cause of morbidity and mortality worldwide. Early detection through novel biomarkers could significantly improve patient outcomes.",
    methods: "We conducted a prospective cohort study of 500 patients at risk for cardiac disease, measuring serum levels of six novel biomarkers over a 24-month period.",
    results: "Three biomarkers demonstrated significant predictive value (p < 0.001) for cardiac events within 12 months. The combined panel achieved an AUC of 0.92.",
    conclusion: "Our novel biomarker panel shows promise for early cardiac disease detection, potentially enabling earlier intervention and improved patient outcomes.",
  },
  {
    id: "abs-002",
    title: "Telemedicine Outcomes in Rural Iranian Communities",
    authorName: "Dr. Reza Ahmadi",
    authorEmail: "reza.a@university.edu",
    event: "2026 Annual Congress",
    eventId: "evt-001",
    category: "Public Health",
    status: "under_review",
    submittedDate: "2026-04-03",
    reviewer: "Dr. Mina Farahani",
    reviewerComments: null,
    keywords: ["telemedicine", "rural health", "Iran"],
    background: "Access to healthcare in rural Iranian communities remains a challenge. Telemedicine presents a potential solution to bridge the gap in healthcare delivery.",
    methods: "A randomized controlled trial involving 12 rural clinics across 3 provinces compared telemedicine-augmented care versus standard care over 18 months.",
    results: "Telemedicine group showed 34% improvement in chronic disease management scores, 28% reduction in unnecessary referrals, and high patient satisfaction (4.2/5).",
    conclusion: "Telemedicine significantly improves healthcare delivery in rural Iranian communities and should be considered for broader implementation.",
  },
  {
    id: "abs-003",
    title: "Machine Learning Applications in Radiology Diagnostics",
    authorName: "Niloufar Tehrani",
    authorEmail: "n.tehrani@med.edu",
    event: "2026 Annual Congress",
    eventId: "evt-001",
    category: "Radiology",
    status: "submitted",
    submittedDate: "2026-04-02",
    reviewer: null,
    reviewerComments: null,
    keywords: ["machine learning", "radiology", "AI", "diagnostics"],
    background: "Artificial intelligence and machine learning are transforming medical imaging diagnostics. This study evaluates a novel CNN architecture for chest X-ray interpretation.",
    methods: "We trained and validated a deep learning model on 50,000 chest X-rays, comparing performance against board-certified radiologists on a test set of 2,000 images.",
    results: "The model achieved 96.3% sensitivity and 94.7% specificity for detecting pneumonia, comparable to senior radiologists and significantly outperforming junior residents.",
    conclusion: "Our ML model demonstrates radiologist-level performance in pneumonia detection and could serve as a valuable diagnostic aid.",
  },
  {
    id: "abs-004",
    title: "Genetic Markers of Familial Mediterranean Fever",
    authorName: "Dr. Kaveh Rad",
    authorEmail: "kaveh.rad@clinic.com",
    event: "2026 Annual Congress",
    eventId: "evt-001",
    category: "Genetics",
    status: "accepted",
    submittedDate: "2026-03-28",
    reviewer: "Dr. Reza Ahmadi",
    reviewerComments: "Excellent methodology and significant findings. Accepted for oral presentation.",
    keywords: ["FMF", "genetics", "MEFV gene", "Mediterranean"],
    background: "Familial Mediterranean Fever (FMF) disproportionately affects populations of Mediterranean descent. Understanding the full spectrum of MEFV gene mutations is critical.",
    methods: "Whole exome sequencing of 300 FMF patients and 300 matched controls from Iranian populations to identify novel pathogenic variants.",
    results: "We identified 4 novel MEFV variants associated with disease severity, including 2 previously unreported mutations in exon 10.",
    conclusion: "These findings expand the known mutational landscape of FMF and have implications for genetic counseling in Iranian populations.",
  },
  {
    id: "abs-005",
    title: "Pediatric Asthma Management: A Comparative Study",
    authorName: "Dr. Mina Farahani",
    authorEmail: "mfarahani@research.org",
    event: "2026 Annual Congress",
    eventId: "evt-001",
    category: "Pediatrics",
    status: "revision_requested",
    submittedDate: "2026-03-25",
    reviewer: "Dr. Leila Naderi",
    reviewerComments: "The study design is sound, but the sample size is small for the conclusions drawn. Please expand the discussion on limitations and consider adding the subgroup analysis for ages 5-8.",
    keywords: ["pediatric", "asthma", "management", "comparative"],
    background: "Asthma management protocols in pediatric populations vary significantly across institutions. This study compares outcomes of two prevalent management approaches.",
    methods: "A multicenter comparative study of 150 pediatric asthma patients across 4 hospitals, comparing guideline-based management versus individualized care plans.",
    results: "Individualized care plans showed 22% fewer emergency visits but no significant difference in hospitalization rates. Adherence was higher in the individualized group.",
    conclusion: "Individualized care plans may reduce emergency visits in pediatric asthma, though larger studies are needed to confirm these findings.",
  },
  {
    id: "abs-006",
    title: "Impact of Mediterranean Diet on Type 2 Diabetes Control",
    authorName: "Dr. Dariush Karimi",
    authorEmail: "d.karimi@clinic.com",
    event: "2026 Annual Congress",
    eventId: "evt-001",
    category: "Endocrinology",
    status: "submitted",
    submittedDate: "2026-04-01",
    reviewer: null,
    reviewerComments: null,
    keywords: ["Mediterranean diet", "diabetes", "HbA1c", "nutrition"],
    background: "Dietary interventions are a cornerstone of type 2 diabetes management. The Mediterranean diet has shown promise but evidence in Middle Eastern populations is limited.",
    methods: "A 12-month RCT with 200 T2DM patients randomized to Mediterranean diet intervention versus standard dietary counseling, measuring HbA1c, lipid profiles, and weight.",
    results: "Mediterranean diet group showed significantly greater HbA1c reduction (-1.2% vs -0.6%, p<0.001) and improved lipid profiles at 12 months.",
    conclusion: "The Mediterranean diet is an effective dietary intervention for type 2 diabetes control in Middle Eastern populations.",
  },
  {
    id: "abs-007",
    title: "Surgical Outcomes of Minimally Invasive Spinal Fusion",
    authorName: "Arash Hosseini",
    authorEmail: "a.hosseini@hospital.org",
    event: "Spring Webinar Series",
    eventId: "evt-002",
    category: "Surgery",
    status: "rejected",
    submittedDate: "2026-03-20",
    reviewer: "Dr. Sara Mohammadi",
    reviewerComments: "The methodology section lacks sufficient detail for reproducibility. Statistical analysis is inadequate for the study design.",
    keywords: ["spinal fusion", "minimally invasive", "surgical outcomes"],
    background: "Minimally invasive spinal fusion techniques have gained popularity. This study evaluates outcomes at a single institution.",
    methods: "Retrospective chart review of 75 patients who underwent MIS spinal fusion between 2023-2025.",
    results: "Mean operative time was 180 minutes, blood loss 150mL. 90% of patients reported improvement at 6-month follow-up.",
    conclusion: "MIS spinal fusion shows favorable outcomes in our institutional experience.",
  },
  {
    id: "abs-008",
    title: "Prevalence of Depression in Iranian-American Medical Professionals",
    authorName: "Dr. Shirin Soltani",
    authorEmail: "s.soltani@hospital.org",
    event: "2026 Annual Congress",
    eventId: "evt-001",
    category: "Psychiatry",
    status: "under_review",
    submittedDate: "2026-03-30",
    reviewer: "Dr. Reza Ahmadi",
    reviewerComments: null,
    keywords: ["depression", "physician wellness", "Iranian-American", "mental health"],
    background: "Physician burnout and depression are increasingly recognized concerns. Cultural factors may uniquely affect Iranian-American medical professionals.",
    methods: "Cross-sectional survey of 450 IAMA members using validated PHQ-9 and Maslach Burnout Inventory instruments, supplemented by qualitative interviews.",
    results: "31% of respondents screened positive for depression, with higher rates among those in residency. Cultural stigma was the most cited barrier to seeking help.",
    conclusion: "Depression prevalence among Iranian-American medical professionals is concerning and culturally-informed support programs are needed.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
// Review panel
// ---------------------------------------------------------------------------

function ReviewPanel({
  abstract,
  onClose,
  onUpdateStatus,
}: {
  abstract: SampleAbstract;
  onClose: () => void;
  onUpdateStatus: (id: string, status: AbstractStatus, comments: string) => void;
}) {
  const [comments, setComments] = useState(abstract.reviewerComments || "");
  const [assignedReviewer, setAssignedReviewer] = useState(
    abstract.reviewer
      ? reviewerOptions.find((r) => r.label === abstract.reviewer)?.value || ""
      : ""
  );

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-border bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Abstract Review
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            {abstract.id.toUpperCase()}
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-muted hover:bg-gray-100 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Meta */}
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            {abstract.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>{abstract.authorName}</span>
            <span className="text-border">|</span>
            <span>{abstract.event}</span>
            <span className="text-border">|</span>
            <span>{abstract.category}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            {abstractStatusBadge(abstract.status)}
            <span className="text-xs text-muted">
              Submitted {formatDate(abstract.submittedDate)}
            </span>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
            Keywords
          </p>
          <div className="flex flex-wrap gap-1.5">
            {abstract.keywords.map((kw) => (
              <Badge key={kw} variant="outline">
                {kw}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sections */}
        {[
          { label: "Background", content: abstract.background },
          { label: "Methods", content: abstract.methods },
          { label: "Results", content: abstract.results },
          { label: "Conclusion", content: abstract.conclusion },
        ].map((section) => (
          <div key={section.label}>
            <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
              {section.label}
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {section.content}
            </p>
          </div>
        ))}

        {/* Assign reviewer */}
        <div className="border-t border-border pt-6">
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-3">
            Review Actions
          </p>

          <div className="space-y-4">
            <Select
              label="Assign Reviewer"
              options={reviewerOptions}
              value={assignedReviewer}
              onChange={(e) => setAssignedReviewer(e.target.value)}
            />

            <Textarea
              label="Reviewer Comments"
              placeholder="Enter review comments..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-t border-border p-6">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              onUpdateStatus(abstract.id, "accepted", comments)
            }
          >
            <CheckCircle2 className="h-4 w-4" /> Accept
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onUpdateStatus(abstract.id, "revision_requested", comments)
            }
          >
            <RotateCcw className="h-4 w-4" /> Request Revision
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() =>
              onUpdateStatus(abstract.id, "rejected", comments)
            }
          >
            <XCircle className="h-4 w-4" /> Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AbstractsPage() {
  const [abstracts, setAbstracts] = useState(sampleAbstracts);
  const [statusFilter, setStatusFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedAbstract, setSelectedAbstract] =
    useState<SampleAbstract | null>(null);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 6;

  const filtered = useMemo(() => {
    return abstracts.filter((a) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.authorName.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || a.status === statusFilter;
      const matchesEvent = !eventFilter || a.eventId === eventFilter;
      return matchesSearch && matchesStatus && matchesEvent;
    });
  }, [abstracts, search, statusFilter, eventFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "submitted", label: "Submitted" },
    { value: "under_review", label: "Under Review" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "revision_requested", label: "Revision Requested" },
  ];

  const eventOptions = [
    { value: "", label: "All Events" },
    { value: "evt-001", label: "2026 Annual Congress" },
    { value: "evt-002", label: "Spring Webinar Series" },
  ];

  function handleUpdateStatus(
    id: string,
    status: AbstractStatus,
    comments: string
  ) {
    setAbstracts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status, reviewerComments: comments } : a
      )
    );
    setSelectedAbstract(null);
  }

  // Quick stats
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    abstracts.forEach((a) => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return counts;
  }, [abstracts]);

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Abstract Management
        </h1>
        <p className="mt-1 text-sm text-muted">
          Review and manage abstract submissions.
        </p>
      </div>

      {/* Quick stat badges */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Submitted", count: statusCounts["submitted"] || 0, variant: "default" as const },
          { label: "Under Review", count: statusCounts["under_review"] || 0, variant: "warning" as const },
          { label: "Accepted", count: statusCounts["accepted"] || 0, variant: "success" as const },
          { label: "Rejected", count: statusCounts["rejected"] || 0, variant: "destructive" as const },
          { label: "Revision", count: statusCounts["revision_requested"] || 0, variant: "warning" as const },
        ].map((s) => (
          <Card key={s.label} className="px-4 py-3">
            <div className="flex items-center gap-2">
              <Badge variant={s.variant}>{s.count}</Badge>
              <span className="text-sm text-muted">{s.label}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <Input
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="w-full md:w-52">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="w-full md:w-52">
              <Select
                options={eventOptions}
                value={eventFilter}
                onChange={(e) => {
                  setEventFilter(e.target.value);
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
                  <th className="px-6 py-3 font-medium text-muted">Title</th>
                  <th className="px-6 py-3 font-medium text-muted">Author</th>
                  <th className="px-6 py-3 font-medium text-muted">Event</th>
                  <th className="px-6 py-3 font-medium text-muted">
                    Category
                  </th>
                  <th className="px-6 py-3 font-medium text-muted">Status</th>
                  <th className="px-6 py-3 font-medium text-muted">
                    Submitted
                  </th>
                  <th className="px-6 py-3 font-medium text-muted">
                    Reviewer
                  </th>
                  <th className="px-6 py-3 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-muted"
                    >
                      No abstracts found matching your filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((abs) => (
                    <tr
                      key={abs.id}
                      onClick={() => setSelectedAbstract(abs)}
                      className="cursor-pointer border-b border-border/50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 max-w-xs">
                        <p className="font-medium text-foreground truncate">
                          {abs.title}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-foreground">
                        {abs.authorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-foreground">
                        {abs.event}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {abs.category}
                      </td>
                      <td className="px-6 py-4">
                        {abstractStatusBadge(abs.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted">
                        {formatDate(abs.submittedDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-foreground">
                        {abs.reviewer || (
                          <span className="text-muted italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAbstract(abs);
                          }}
                        >
                          <Eye className="h-4 w-4" /> Review
                        </Button>
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
                {filtered.length} abstracts
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
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
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review side panel */}
      {selectedAbstract && (
        <ReviewPanel
          abstract={selectedAbstract}
          onClose={() => setSelectedAbstract(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
