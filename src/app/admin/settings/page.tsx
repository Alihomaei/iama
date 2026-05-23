"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building2,
  Home,
  BarChart3,
  Images,
  Handshake,
  Share2,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Info,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Initial values — these mirror what currently appears on the live site so an
// editor can adjust copy, numbers, images, and links without touching code.
// Wire these to Supabase (a `site_settings` table) to persist changes.
// ---------------------------------------------------------------------------

const initialOrg = {
  name: "Iranian American Medical Association",
  shortName: "IAMA",
  tagline: "Advancing healthcare excellence through education, advocacy, and community.",
  founded: "1993",
  email: "info@iama.org",
  phone: "(310) 555-1234",
  address: "P.O. Box 1234, Beverly Hills, CA 90210",
  ein: "501(c)(3) — non-profit, non-religious, non-political",
};

const initialHome = {
  heading: "Iranian American Medical Association",
  paragraph:
    "The Iranian American Medical Association (IAMA) is a 501(c)(3) NON-PROFIT, NON-RELIGIOUS, NON-POLITICAL organization established for charitable and educational purposes.",
  primaryCtaLabel: "Become a Member",
  primaryCtaHref: "/membership",
  secondaryCtaLabel: "Annual Congress 2026",
  secondaryCtaHref: "/congress",
};

const initialStats = [
  { label: "Active Members", value: "1,000+" },
  { label: "Regional Chapters", value: "25" },
  { label: "Annual Events", value: "40+" },
  { label: "Countries Represented", value: "12" },
];

const initialImages = ["/images/hero-1.jpg", "/images/hero-2.jpg"];

const initialPartners = [
  "UCLA Health",
  "Johns Hopkins",
  "Mayo Clinic",
  "Cleveland Clinic",
  "Stanford Medicine",
  "Cedars-Sinai",
];

const initialSocial = {
  x: "https://x.com/iama",
  linkedin: "https://linkedin.com/company/iama",
  facebook: "https://facebook.com/iama",
  instagram: "https://instagram.com/iama",
};

// ---------------------------------------------------------------------------
// Save bar — shared "save" affordance with demo confirmation
// ---------------------------------------------------------------------------

function SaveBar({
  section,
  savedSection,
  onSave,
}: {
  section: string;
  savedSection: string | null;
  onSave: (section: string) => void;
}) {
  return (
    <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
      <Button variant="primary" size="sm" onClick={() => onSave(section)}>
        <Save className="h-4 w-4" /> Save Changes
      </Button>
      {savedSection === section && (
        <span className="flex items-center gap-1.5 text-sm font-medium text-success">
          <CheckCircle2 className="h-4 w-4" />
          Saved (demo — not yet persisted)
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SettingsPage() {
  const [org, setOrg] = useState(initialOrg);
  const [home, setHome] = useState(initialHome);
  const [stats, setStats] = useState(initialStats);
  const [images, setImages] = useState<string[]>(initialImages);
  const [partners, setPartners] = useState<string[]>(initialPartners);
  const [social, setSocial] = useState(initialSocial);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  function handleSave(section: string) {
    // Demo only — no persistence. Replace with a Supabase upsert.
    setSavedSection(section);
    setTimeout(
      () => setSavedSection((current) => (current === section ? null : current)),
      2500
    );
  }

  function updateOrg(field: keyof typeof initialOrg, value: string) {
    setOrg((prev) => ({ ...prev, [field]: value }));
  }
  function updateHome(field: keyof typeof initialHome, value: string) {
    setHome((prev) => ({ ...prev, [field]: value }));
  }
  function updateSocial(field: keyof typeof initialSocial, value: string) {
    setSocial((prev) => ({ ...prev, [field]: value }));
  }
  function updateStat(index: number, field: "label" | "value", value: string) {
    setStats((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Update editable content — organization details, homepage copy,
          statistics, images, partners, and social links.
        </p>
      </div>

      {/* Scope note */}
      <div className="flex items-start gap-3 rounded-lg border border-primary-100 bg-primary-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm text-primary-800">
          These controls cover <strong>non-structural changes</strong> — text,
          numbers, links, and images. Page layout and site structure are managed
          in code. In this demo, edits preview locally; connect Supabase to make
          them permanent.
        </p>
      </div>

      <Tabs defaultValue="organization">
        <TabsList className="flex-wrap">
          <TabsTrigger value="organization">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              Organization
            </span>
          </TabsTrigger>
          <TabsTrigger value="homepage">
            <span className="flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              Homepage
            </span>
          </TabsTrigger>
          <TabsTrigger value="stats">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" />
              Statistics
            </span>
          </TabsTrigger>
          <TabsTrigger value="carousel">
            <span className="flex items-center gap-1.5">
              <Images className="h-4 w-4" />
              Hero Carousel
            </span>
          </TabsTrigger>
          <TabsTrigger value="partners">
            <span className="flex items-center gap-1.5">
              <Handshake className="h-4 w-4" />
              Partners
            </span>
          </TabsTrigger>
          <TabsTrigger value="social">
            <span className="flex items-center gap-1.5">
              <Share2 className="h-4 w-4" />
              Social
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Organization */}
        <TabsContent value="organization">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Organization Name"
                  value={org.name}
                  onChange={(e) => updateOrg("name", e.target.value)}
                />
                <Input
                  label="Short Name"
                  value={org.shortName}
                  onChange={(e) => updateOrg("shortName", e.target.value)}
                />
                <Input
                  label="Founded"
                  value={org.founded}
                  onChange={(e) => updateOrg("founded", e.target.value)}
                />
                <Input
                  label="Contact Email"
                  type="email"
                  value={org.email}
                  onChange={(e) => updateOrg("email", e.target.value)}
                />
                <Input
                  label="Phone"
                  value={org.phone}
                  onChange={(e) => updateOrg("phone", e.target.value)}
                />
                <Input
                  label="Mailing Address"
                  value={org.address}
                  onChange={(e) => updateOrg("address", e.target.value)}
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Tax / Status Note"
                    value={org.ein}
                    onChange={(e) => updateOrg("ein", e.target.value)}
                    helpText="Shown in footers and the donation page."
                  />
                </div>
                <div className="sm:col-span-2">
                  <Textarea
                    label="Tagline"
                    value={org.tagline}
                    onChange={(e) => updateOrg("tagline", e.target.value)}
                  />
                </div>
              </div>
              <SaveBar
                section="organization"
                savedSection={savedSection}
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Homepage */}
        <TabsContent value="homepage">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-5">
                <Input
                  label="Hero Heading"
                  value={home.heading}
                  onChange={(e) => updateHome("heading", e.target.value)}
                />
                <Textarea
                  label="Hero Paragraph"
                  value={home.paragraph}
                  onChange={(e) => updateHome("paragraph", e.target.value)}
                  className="min-h-[120px]"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Primary Button Label"
                    value={home.primaryCtaLabel}
                    onChange={(e) =>
                      updateHome("primaryCtaLabel", e.target.value)
                    }
                  />
                  <Input
                    label="Primary Button Link"
                    value={home.primaryCtaHref}
                    onChange={(e) =>
                      updateHome("primaryCtaHref", e.target.value)
                    }
                  />
                  <Input
                    label="Secondary Button Label"
                    value={home.secondaryCtaLabel}
                    onChange={(e) =>
                      updateHome("secondaryCtaLabel", e.target.value)
                    }
                  />
                  <Input
                    label="Secondary Button Link"
                    value={home.secondaryCtaHref}
                    onChange={(e) =>
                      updateHome("secondaryCtaHref", e.target.value)
                    }
                  />
                </div>
              </div>
              <SaveBar
                section="homepage"
                savedSection={savedSection}
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics */}
        <TabsContent value="stats">
          <Card>
            <CardContent className="p-6">
              <p className="mb-4 text-sm text-muted">
                The four counters shown on the homepage.
              </p>
              <div className="space-y-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="grid gap-4 sm:grid-cols-[1fr_180px]"
                  >
                    <Input
                      label={i === 0 ? "Label" : undefined}
                      value={stat.label}
                      onChange={(e) => updateStat(i, "label", e.target.value)}
                    />
                    <Input
                      label={i === 0 ? "Value" : undefined}
                      value={stat.value}
                      onChange={(e) => updateStat(i, "value", e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <SaveBar
                section="stats"
                savedSection={savedSection}
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hero Carousel */}
        <TabsContent value="carousel">
          <Card>
            <CardContent className="p-6">
              <p className="mb-4 text-sm text-muted">
                Images that fade in along the edges of the homepage hero. Add or
                reorder paths (stored in <code>/public/images</code>).
              </p>
              <div className="space-y-3">
                {images.map((src, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Input
                      value={src}
                      onChange={(e) =>
                        setImages((prev) =>
                          prev.map((img, idx) =>
                            idx === i ? e.target.value : img
                          )
                        )
                      }
                      placeholder="/images/hero-3.jpg"
                    />
                    <button
                      onClick={() =>
                        setImages((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="shrink-0 rounded-lg p-2 text-muted hover:bg-red-50 hover:text-destructive"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setImages((prev) => [...prev, ""])}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
              >
                <Plus className="h-4 w-4" /> Add image
              </button>
              <SaveBar
                section="carousel"
                savedSection={savedSection}
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partners */}
        <TabsContent value="partners">
          <Card>
            <CardContent className="p-6">
              <p className="mb-4 text-sm text-muted">
                Partner and affiliate names listed on the homepage.
              </p>
              <div className="space-y-3">
                {partners.map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Input
                      value={name}
                      onChange={(e) =>
                        setPartners((prev) =>
                          prev.map((p, idx) => (idx === i ? e.target.value : p))
                        )
                      }
                      placeholder="Partner name"
                    />
                    <button
                      onClick={() =>
                        setPartners((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                      className="shrink-0 rounded-lg p-2 text-muted hover:bg-red-50 hover:text-destructive"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPartners((prev) => [...prev, ""])}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
              >
                <Plus className="h-4 w-4" /> Add partner
              </button>
              <SaveBar
                section="partners"
                savedSection={savedSection}
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social */}
        <TabsContent value="social">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="X (Twitter)"
                  value={social.x}
                  onChange={(e) => updateSocial("x", e.target.value)}
                />
                <Input
                  label="LinkedIn"
                  value={social.linkedin}
                  onChange={(e) => updateSocial("linkedin", e.target.value)}
                />
                <Input
                  label="Facebook"
                  value={social.facebook}
                  onChange={(e) => updateSocial("facebook", e.target.value)}
                />
                <Input
                  label="Instagram"
                  value={social.instagram}
                  onChange={(e) => updateSocial("instagram", e.target.value)}
                />
              </div>
              <SaveBar
                section="social"
                savedSection={savedSection}
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
