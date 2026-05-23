import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news and updates from the Iranian American Medical Association.",
};

const allNews = [
  {
    id: "1",
    title: "30 Years of IAMA. One Future for Med-Tech.",
    excerpt:
      "Led by Dr. Ehsan Vaghefi and team, the Shark Tank–style innovation program returns at the 30th Annual IAMA Meeting.",
    date: "February 3, 2026",
    category: "Community",
    slug: "shark-tank-30th-annual-meeting",
    image: "/images/news/shark-tank.jpg",
  },
  {
    id: "2",
    title: "IAMA Letter of Statement",
    excerpt:
      "A statement from the Iranian American Medical Association to its members and community.",
    date: "January 24, 2026",
    category: "Community",
    slug: "iama-letter-of-statement",
    image: "/images/news/healthcare-workers.jpg",
  },
  {
    id: "3",
    title: "Join Your Colleagues at the 30th Annual Meeting",
    excerpt:
      "Kimpton Hotel Monaco, Washington, D.C. Reserve your room at the discounted rate for attendees and register today.",
    date: "June 9, 2025",
    category: "Community",
    slug: "join-30th-annual-meeting",
    image: "/images/news/annual-meeting-balloons.jpg",
  },
  {
    id: "4",
    title: "Call for Abstracts!",
    excerpt:
      "Abstract submissions are open with a deadline of March 1, 2026. Junior members submitting abstracts can also apply for a travel grant.",
    date: "June 9, 2025",
    category: "Community",
    slug: "call-for-abstracts",
    image: "/images/news/call-for-abstracts.jpg",
  },
  {
    id: "5",
    title: "30th Annual Meeting",
    excerpt:
      "Annual Meeting in Washington, D.C., May 23–25, 2026. Make your reservations at the Kimpton Hotel Monaco.",
    date: "June 9, 2025",
    category: "Community",
    slug: "30th-annual-meeting",
    image: "/images/news/dc-annual-meeting.jpg",
  },
];

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="News & Updates"
          subtitle="Stay informed with the latest from the Iranian American Medical Association."
          breadcrumbs={[{ label: "News" }]}
        />

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allNews.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-primary-50">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
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
                    <Link
                      href={`/news/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-white text-sm font-medium">
                1
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted hover:bg-gray-50 text-sm cursor-pointer">
                2
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted hover:bg-gray-50 text-sm cursor-pointer">
                3
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted hover:bg-gray-50 cursor-pointer">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
