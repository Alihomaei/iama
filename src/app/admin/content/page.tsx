"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Plus,
  Pencil,
  Trash2,
  EyeOff,
  X,
  Newspaper,
  GraduationCap,
  Globe,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

interface SampleNewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  author: string;
}

const sampleNewsPosts: SampleNewsPost[] = [
  {
    id: "news-001",
    title: "IAMA Announces 2026 Annual Congress Keynote Speakers",
    slug: "2026-congress-keynote-speakers",
    excerpt: "World-renowned physicians and researchers confirmed for the upcoming congress in San Francisco.",
    published: true,
    publishedAt: "2026-03-25",
    createdAt: "2026-03-20",
    author: "Dr. Leila Naderi",
  },
  {
    id: "news-002",
    title: "New Partnership with Tehran University of Medical Sciences",
    slug: "tehran-university-partnership",
    excerpt: "IAMA establishes formal collaboration with TUMS for research exchange and educational programs.",
    published: true,
    publishedAt: "2026-03-15",
    createdAt: "2026-03-10",
    author: "Dr. Omid Bahrami",
  },
  {
    id: "news-003",
    title: "IAMA Scholarship Recipients 2026",
    slug: "scholarship-recipients-2026",
    excerpt: "Ten outstanding medical students receive IAMA scholarships for academic excellence and community service.",
    published: true,
    publishedAt: "2026-03-01",
    createdAt: "2026-02-28",
    author: "Dr. Mina Farahani",
  },
  {
    id: "news-004",
    title: "Advocacy Update: Healthcare Access Legislation",
    slug: "healthcare-access-legislation-update",
    excerpt: "IAMA's advocacy committee provides an update on healthcare access legislation affecting our community.",
    published: false,
    publishedAt: null,
    createdAt: "2026-04-02",
    author: "Dr. Kaveh Rad",
  },
  {
    id: "news-005",
    title: "Member Spotlight: Dr. Sara Mohammadi's Cardiology Research",
    slug: "member-spotlight-sara-mohammadi",
    excerpt: "Highlighting the groundbreaking cardiac biomarker research by one of our fellow members.",
    published: false,
    publishedAt: null,
    createdAt: "2026-04-05",
    author: "Dr. Reza Ahmadi",
  },
  {
    id: "news-006",
    title: "IAMA Community Health Fair Recap",
    slug: "community-health-fair-recap",
    excerpt: "Over 500 community members attended the annual health fair providing free screenings and consultations.",
    published: true,
    publishedAt: "2026-02-20",
    createdAt: "2026-02-18",
    author: "Dr. Shirin Soltani",
  },
];

interface SampleEducationResource {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: "cme" | "webinar" | "article" | "guideline";
  published: boolean;
  createdAt: string;
}

const sampleEducation: SampleEducationResource[] = [
  {
    id: "edu-001",
    title: "CME: Advances in Interventional Cardiology 2026",
    slug: "cme-interventional-cardiology-2026",
    description: "A comprehensive CME module covering the latest techniques and evidence in interventional cardiology.",
    type: "cme",
    published: true,
    createdAt: "2026-03-10",
  },
  {
    id: "edu-002",
    title: "Webinar: AI in Medical Imaging — Current State and Future",
    slug: "webinar-ai-medical-imaging",
    description: "Expert panel discussion on the role of artificial intelligence in diagnostic medical imaging.",
    type: "webinar",
    published: true,
    createdAt: "2026-03-05",
  },
  {
    id: "edu-003",
    title: "Clinical Guideline: Management of Familial Mediterranean Fever",
    slug: "guideline-fmf-management",
    description: "Updated clinical guideline for diagnosis and management of FMF in diverse populations.",
    type: "guideline",
    published: true,
    createdAt: "2026-02-20",
  },
  {
    id: "edu-004",
    title: "Article: Cross-Cultural Communication in Clinical Settings",
    slug: "article-cross-cultural-communication",
    description: "Best practices for effective cross-cultural patient communication, with focus on Iranian-American contexts.",
    type: "article",
    published: false,
    createdAt: "2026-04-01",
  },
  {
    id: "edu-005",
    title: "CME: Pediatric Emergency Medicine Updates",
    slug: "cme-pediatric-emergency",
    description: "Essential updates in pediatric emergency medicine protocols and evidence-based practices.",
    type: "cme",
    published: true,
    createdAt: "2026-01-15",
  },
  {
    id: "edu-006",
    title: "Webinar: Physician Wellness and Burnout Prevention",
    slug: "webinar-physician-wellness",
    description: "Strategies for maintaining wellness, preventing burnout, and accessing mental health resources.",
    type: "webinar",
    published: false,
    createdAt: "2026-04-03",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function educationTypeBadge(type: SampleEducationResource["type"]) {
  const map: Record<string, { variant: "default" | "success" | "warning" | "outline"; label: string }> = {
    cme: { variant: "default", label: "CME" },
    webinar: { variant: "success", label: "Webinar" },
    article: { variant: "outline", label: "Article" },
    guideline: { variant: "warning", label: "Guideline" },
  };
  const { variant, label } = map[type];
  return <Badge variant={variant}>{label}</Badge>;
}

// ---------------------------------------------------------------------------
// News form panel
// ---------------------------------------------------------------------------

function NewsFormPanel({
  post,
  onClose,
}: {
  post: SampleNewsPost | null;
  onClose: () => void;
}) {
  const isNew = !post;
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-border bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border p-6">
        <h2 className="text-lg font-semibold text-foreground">
          {isNew ? "Create News Post" : "Edit News Post"}
        </h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-muted hover:bg-gray-100 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <Input
          label="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Post title"
        />
        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          placeholder="post-slug"
          helpText="URL-friendly identifier"
        />
        <Textarea
          label="Excerpt"
          value={form.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          placeholder="Brief summary..."
        />
        <Textarea
          label="Content"
          value={form.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Full post content (Markdown supported)..."
          className="min-h-[200px]"
        />
      </div>

      <div className="border-t border-border p-6 flex gap-3">
        <Button variant="primary" className="flex-1">
          {isNew ? "Create Post" : "Save Changes"}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Education form panel
// ---------------------------------------------------------------------------

function EducationFormPanel({
  resource,
  onClose,
}: {
  resource: SampleEducationResource | null;
  onClose: () => void;
}) {
  const isNew = !resource;
  const [form, setForm] = useState({
    title: resource?.title || "",
    slug: resource?.slug || "",
    description: resource?.description || "",
    type: resource?.type || "article",
    content: "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const typeOptions = [
    { value: "cme", label: "CME" },
    { value: "webinar", label: "Webinar" },
    { value: "article", label: "Article" },
    { value: "guideline", label: "Guideline" },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-border bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-border p-6">
        <h2 className="text-lg font-semibold text-foreground">
          {isNew ? "Create Resource" : "Edit Resource"}
        </h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-muted hover:bg-gray-100 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <Input
          label="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Resource title"
        />
        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          placeholder="resource-slug"
          helpText="URL-friendly identifier"
        />
        <Select
          label="Type"
          options={typeOptions}
          value={form.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />
        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Brief description..."
        />
        <Textarea
          label="Content"
          value={form.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Full content (Markdown supported)..."
          className="min-h-[200px]"
        />
      </div>

      <div className="border-t border-border p-6 flex gap-3">
        <Button variant="primary" className="flex-1">
          {isNew ? "Create Resource" : "Save Changes"}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContentPage() {
  const [newsPosts, setNewsPosts] = useState(sampleNewsPosts);
  const [education, setEducation] = useState(sampleEducation);
  const [editingNews, setEditingNews] = useState<SampleNewsPost | null | undefined>(undefined);
  const [editingEducation, setEditingEducation] = useState<SampleEducationResource | null | undefined>(undefined);

  function toggleNewsPublish(id: string) {
    setNewsPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              published: !p.published,
              publishedAt: !p.published ? new Date().toISOString().split("T")[0] : null,
            }
          : p
      )
    );
  }

  function deleteNewsPost(id: string) {
    setNewsPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function toggleEducationPublish(id: string) {
    setEducation((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, published: !r.published } : r
      )
    );
  }

  function deleteEducationResource(id: string) {
    setEducation((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Content Management
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage news posts and educational resources.
        </p>
      </div>

      <Tabs defaultValue="news">
        <TabsList>
          <TabsTrigger value="news">
            <span className="flex items-center gap-1.5">
              <Newspaper className="h-4 w-4" />
              News Posts
            </span>
          </TabsTrigger>
          <TabsTrigger value="education">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" />
              Education Resources
            </span>
          </TabsTrigger>
        </TabsList>

        {/* News Posts Tab */}
        <TabsContent value="news">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setEditingNews(null)}
              >
                <Plus className="h-4 w-4" /> New Post
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-6 py-3 font-medium text-muted">
                          Title
                        </th>
                        <th className="px-6 py-3 font-medium text-muted">
                          Author
                        </th>
                        <th className="px-6 py-3 font-medium text-muted">
                          Status
                        </th>
                        <th className="px-6 py-3 font-medium text-muted">
                          Date
                        </th>
                        <th className="px-6 py-3 font-medium text-muted">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsPosts.map((post) => (
                        <tr
                          key={post.id}
                          className="border-b border-border/50 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-medium text-foreground">
                              {post.title}
                            </p>
                            <p className="text-xs text-muted mt-0.5 truncate max-w-md">
                              {post.excerpt}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-foreground">
                            {post.author}
                          </td>
                          <td className="px-6 py-4">
                            {post.published ? (
                              <Badge variant="success">Published</Badge>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-muted">
                            {formatDate(
                              post.publishedAt || post.createdAt
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setEditingNews(post)}
                                className="rounded-lg p-1.5 text-muted hover:bg-gray-100 hover:text-foreground"
                                title="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => toggleNewsPublish(post.id)}
                                className="rounded-lg p-1.5 text-muted hover:bg-gray-100 hover:text-foreground"
                                title={
                                  post.published ? "Unpublish" : "Publish"
                                }
                              >
                                {post.published ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Globe className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={() => deleteNewsPost(post.id)}
                                className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-destructive"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {newsPosts.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center text-muted"
                          >
                            No news posts yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Education Resources Tab */}
        <TabsContent value="education">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setEditingEducation(null)}
              >
                <Plus className="h-4 w-4" /> New Resource
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-6 py-3 font-medium text-muted">
                          Title
                        </th>
                        <th className="px-6 py-3 font-medium text-muted">
                          Type
                        </th>
                        <th className="px-6 py-3 font-medium text-muted">
                          Status
                        </th>
                        <th className="px-6 py-3 font-medium text-muted">
                          Created
                        </th>
                        <th className="px-6 py-3 font-medium text-muted">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {education.map((resource) => (
                        <tr
                          key={resource.id}
                          className="border-b border-border/50 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-medium text-foreground">
                              {resource.title}
                            </p>
                            <p className="text-xs text-muted mt-0.5 truncate max-w-md">
                              {resource.description}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            {educationTypeBadge(resource.type)}
                          </td>
                          <td className="px-6 py-4">
                            {resource.published ? (
                              <Badge variant="success">Published</Badge>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-muted">
                            {formatDate(resource.createdAt)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  setEditingEducation(resource)
                                }
                                className="rounded-lg p-1.5 text-muted hover:bg-gray-100 hover:text-foreground"
                                title="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  toggleEducationPublish(resource.id)
                                }
                                className="rounded-lg p-1.5 text-muted hover:bg-gray-100 hover:text-foreground"
                                title={
                                  resource.published
                                    ? "Unpublish"
                                    : "Publish"
                                }
                              >
                                {resource.published ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Globe className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  deleteEducationResource(resource.id)
                                }
                                className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-destructive"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {education.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center text-muted"
                          >
                            No education resources yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* News form panel */}
      {editingNews !== undefined && (
        <NewsFormPanel
          post={editingNews}
          onClose={() => setEditingNews(undefined)}
        />
      )}

      {/* Education form panel */}
      {editingEducation !== undefined && (
        <EducationFormPanel
          resource={editingEducation}
          onClose={() => setEditingEducation(undefined)}
        />
      )}
    </div>
  );
}
