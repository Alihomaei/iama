import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { FeaturedEvents } from "@/components/sections/featured-events";
import { LatestNews } from "@/components/sections/latest-news";
import { MembershipCTA } from "@/components/sections/membership-cta";
import { Partners } from "@/components/sections/partners";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeaturedEvents />
        <LatestNews />
        <MembershipCTA />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
