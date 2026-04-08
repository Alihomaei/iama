import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Video,
  FileText,
  GraduationCap,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Education & CME",
  description:
    "Access continuing medical education, webinars, articles, and clinical guidelines from the IAMA.",
};

const typeConfig = {
  cme: {
    label: "CME",
    icon: GraduationCap,
    color: "bg-primary-100 text-primary-800",
  },
  webinar: {
    label: "Webinar",
    icon: Video,
    color: "bg-blue-100 text-blue-800",
  },
  article: {
    label: "Article",
    icon: FileText,
    color: "bg-amber-100 text-amber-800",
  },
  guideline: {
    label: "Guideline",
    icon: BookOpen,
    color: "bg-green-100 text-green-800",
  },
};

const resources = [
  {
    id: "1",
    title: "Advances in Telehealth: Best Practices for Virtual Care",
    description:
      "A comprehensive CME course covering telehealth technology, patient communication, regulatory compliance, and clinical best practices.",
    type: "cme" as const,
    credits: "4.0 CME Credits",
    date: "February 2026",
  },
  {
    id: "2",
    title: "Precision Oncology: Targeted Therapies Update 2026",
    description:
      "Review the latest breakthroughs in molecularly targeted cancer treatments and personalized therapy selection.",
    type: "cme" as const,
    credits: "3.0 CME Credits",
    date: "January 2026",
  },
  {
    id: "3",
    title: "AI in Radiology: Current Applications and Future Directions",
    description:
      "Explore how artificial intelligence is transforming diagnostic imaging, from screening to treatment planning.",
    type: "webinar" as const,
    credits: "1.5 CME Credits",
    date: "March 2026",
  },
  {
    id: "4",
    title: "Cardiovascular Risk Assessment in Diverse Populations",
    description:
      "A recorded webinar examining population-specific risk factors and updated guidelines for cardiovascular screening.",
    type: "webinar" as const,
    credits: "1.0 CME Credits",
    date: "February 2026",
  },
  {
    id: "5",
    title: "Managing Physician Burnout: Evidence-Based Strategies",
    description:
      "Research-backed approaches to prevent and address burnout among physicians and healthcare professionals.",
    type: "article" as const,
    credits: "",
    date: "March 2026",
  },
  {
    id: "6",
    title: "The Future of Medical Education: Simulation and VR",
    description:
      "How virtual reality and advanced simulation technologies are reshaping medical training and surgical education.",
    type: "article" as const,
    credits: "",
    date: "January 2026",
  },
  {
    id: "7",
    title: "Clinical Practice Guidelines: Type 2 Diabetes Management",
    description:
      "Updated clinical guidelines incorporating the latest evidence on pharmacological and lifestyle interventions.",
    type: "guideline" as const,
    credits: "",
    date: "2026 Update",
  },
  {
    id: "8",
    title: "Hypertension Management: 2026 Evidence-Based Guidelines",
    description:
      "Comprehensive guidelines for screening, diagnosis, and treatment of hypertension in adults.",
    type: "guideline" as const,
    credits: "",
    date: "2026 Update",
  },
];

export default function EducationPage() {
  const types = ["cme", "webinar", "article", "guideline"] as const;

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Education & CME"
          subtitle="Access accredited continuing medical education, webinars, research articles, and clinical guidelines."
          breadcrumbs={[{ label: "Education" }]}
        />

        {/* Summary stats */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "CME Courses", count: "20+", icon: GraduationCap },
                { label: "Recorded Webinars", count: "35+", icon: Video },
                { label: "Articles", count: "50+", icon: FileText },
                { label: "CME Credits Available", count: "100+", icon: Award },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-secondary">
                        {stat.count}
                      </p>
                      <p className="text-xs text-muted">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resources grouped by type */}
        {types.map((type) => {
          const config = typeConfig[type];
          const Icon = config.icon;
          const items = resources.filter((r) => r.type === type);

          return (
            <section key={type} className="py-12 even:bg-gray-50">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-secondary">
                    {config.label}s
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {items.map((resource) => (
                    <Card
                      key={resource.id}
                      className="group hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-5">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
                          >
                            {config.label}
                          </span>
                          {resource.credits && (
                            <Badge variant="success">{resource.credits}</Badge>
                          )}
                          <span className="flex items-center gap-1 text-xs text-muted">
                            <Clock className="h-3 w-3" />
                            {resource.date}
                          </span>
                        </div>
                        <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted leading-relaxed">
                          {resource.description}
                        </p>
                        <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer">
                          View Resource
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
