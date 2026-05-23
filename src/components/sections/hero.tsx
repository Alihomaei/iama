import Link from "next/link";
import Image from "next/image";

// Hero edge images. Carousel rotation is paused for now — the left edge always
// shows hero-1 (speaker) and the right edge always shows hero-2 (audience).
// To re-enable rotation later, cycle these in a small client component.
const leftImage = "/images/hero-1-v2.jpg";
const rightImage = "/images/hero-2.jpg";

const leftMask = "linear-gradient(to right, black, black 18%, transparent 92%)";
const rightMask = "linear-gradient(to left, black, black 18%, transparent 92%)";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
      {/* Left edge image, fades toward the center */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 hidden w-1/3 md:block lg:w-2/5"
        style={{ maskImage: leftMask, WebkitMaskImage: leftMask }}
      >
        <Image
          src={leftImage}
          alt=""
          fill
          sizes="40vw"
          priority
          className="object-cover"
        />
        {/* Teal tint so photos blend with the brand gradient */}
        <div className="absolute inset-0 bg-primary-900/45" />
      </div>

      {/* Right edge image, fades toward the center */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-1/3 md:block lg:w-2/5"
        style={{ maskImage: rightMask, WebkitMaskImage: rightMask }}
      >
        <Image
          src={rightImage}
          alt=""
          fill
          sizes="40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-900/45" />
      </div>

      {/* Decorative dot pattern */}
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

      <div className="relative z-10 mx-auto flex min-h-[540px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center lg:px-8 lg:py-32">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Iranian American Medical Association
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-100 sm:text-xl">
          The Iranian American Medical Association (IAMA) is a 501(c)(3)
          <br />
          Non-Profit, Non-Religious, Non-Political
          <br />
          organization established for charitable and educational purposes.
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
