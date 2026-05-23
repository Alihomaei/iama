import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const newsPosts = [
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
    title: "Join Your Colleagues at the 30th Annual Meeting",
    excerpt:
      "Kimpton Hotel Monaco, Washington, D.C. Reserve your room at the discounted rate for attendees and register today.",
    date: "June 9, 2025",
    category: "Community",
    slug: "join-30th-annual-meeting",
    image: "/images/news/annual-meeting-balloons.jpg",
  },
  {
    id: "3",
    title: "Call for Abstracts!",
    excerpt:
      "Abstract submissions are open with a deadline of March 1, 2026. Junior members submitting abstracts can also apply for a travel grant.",
    date: "June 9, 2025",
    category: "Community",
    slug: "call-for-abstracts",
    image: "/images/news/call-for-abstracts.jpg",
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
