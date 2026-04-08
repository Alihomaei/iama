"use client";

import { useEffect, useRef, useState } from "react";
import { Users, MapPin, Calendar, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: 3500, suffix: "+", label: "Active Members" },
  { icon: MapPin, value: 25, suffix: "", label: "Regional Chapters" },
  { icon: Calendar, value: 40, suffix: "+", label: "Annual Events" },
  { icon: Globe, value: 12, suffix: "", label: "Countries Represented" },
];

function AnimatedCounter({
  target,
  suffix,
  isVisible,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative -mt-12 z-10 mx-auto max-w-6xl px-4 lg:px-8"
    >
      <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:grid-cols-4 lg:gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold text-secondary sm:text-3xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
