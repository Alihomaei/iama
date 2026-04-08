import Link from "next/link";
import {
  Stethoscope,
  GraduationCap,
  Globe,
  HeartPulse,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1.5px, transparent 1.5px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 80%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px, 40px 40px, 50px 50px",
          }}
        />
      </div>

      {/* Gradient overlay shapes */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600 opacity-20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent opacity-10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[540px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center lg:px-8 lg:py-32">
        {/* Floating icons */}
        <div className="absolute left-[10%] top-[20%] hidden opacity-20 lg:block">
          <Stethoscope className="h-12 w-12" />
        </div>
        <div className="absolute right-[12%] top-[30%] hidden opacity-20 lg:block">
          <GraduationCap className="h-10 w-10" />
        </div>
        <div className="absolute left-[15%] bottom-[25%] hidden opacity-20 lg:block">
          <Globe className="h-10 w-10" />
        </div>
        <div className="absolute right-[10%] bottom-[20%] hidden opacity-20 lg:block">
          <HeartPulse className="h-12 w-12" />
        </div>

        <span className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          Iranian American Medical Association
        </span>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Advancing Healthcare{" "}
          <span className="text-primary-light">Excellence</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-100 sm:text-xl">
          Connecting physicians, researchers, and medical professionals through
          education, advocacy, and community. Join the leading network of Iranian
          American healthcare leaders.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/membership"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-primary-800 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl"
          >
            Become a Member
          </Link>
          <Link
            href="/congress"
            className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
          >
            Annual Congress 2026
          </Link>
        </div>
      </div>
    </section>
  );
}
