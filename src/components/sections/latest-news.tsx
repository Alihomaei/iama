import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const newsPosts = [
  {
    id: "1",
    title: "IAMA Announces Partnership with Johns Hopkins for Research Initiative",
    excerpt:
      "A groundbreaking collaboration to advance medical research and training for Iranian American physicians across the nation.",
    date: "March 28, 2026",
    category: "Partnerships",
    slug: "iama-johns-hopkins-partnership",
  },
  {
    id: "2",
    title: "Call for Abstracts: Annual Congress 2026 Now Open",
    excerpt:
      "Submit your research abstracts for oral and poster presentations at this year's premier gathering of Iranian American medical professionals.",
    date: "March 15, 2026",
    category: "Congress",
    slug: "call-for-abstracts-2026",
  },
  {
    id: "3",
    title: "IAMA Members Recognized in Top Physicians List 2026",
    excerpt:
      "Over 50 IAMA members have been recognized across multiple specialties in this year's national physician rankings.",
    date: "March 5, 2026",
    category: "Recognition",
    slug: "top-physicians-2026",
  },
];

export function LatestNews() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
              Latest News
            </h2>
            <p className="mt-3 text-lg text-muted">
              Stay informed with updates from our community.
            </p>
          </div>
          <Link
            href="/news"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors sm:inline-flex"
          >
            View All News
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsPosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-md transition-shadow"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/9] rounded-t-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary/20">
                  IAMA
                </span>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Clock className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-secondary leading-snug group-hover:text-primary transition-colors">
                  <Link href={`/news/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View All News
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
