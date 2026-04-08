"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import type { RegistrationCategory, PricingTier } from "@/types/database";

const categories: { value: RegistrationCategory; label: string }[] = [
  { value: "physician", label: "Physician" },
  { value: "resident", label: "Resident / Fellow" },
  { value: "student", label: "Student" },
  { value: "virtual", label: "Virtual Attendance" },
];

// Prices in dollars for display
const pricing: Record<
  RegistrationCategory,
  Record<PricingTier, { member: number; nonMember: number }>
> = {
  physician: {
    early_bird: { member: 450, nonMember: 600 },
    regular: { member: 550, nonMember: 750 },
    late: { member: 650, nonMember: 850 },
  },
  resident: {
    early_bird: { member: 200, nonMember: 300 },
    regular: { member: 250, nonMember: 375 },
    late: { member: 300, nonMember: 450 },
  },
  student: {
    early_bird: { member: 100, nonMember: 150 },
    regular: { member: 125, nonMember: 200 },
    late: { member: 150, nonMember: 250 },
  },
  virtual: {
    early_bird: { member: 150, nonMember: 250 },
    regular: { member: 200, nonMember: 300 },
    late: { member: 250, nonMember: 350 },
  },
};

const currentTier: PricingTier = "early_bird";

export default function CongressRegisterPage() {
  const [category, setCategory] = useState<RegistrationCategory>("physician");
  const [isMember, setIsMember] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { email: data.user.email ?? "" } : null);
      setLoading(false);
    });
  }, [supabase.auth]);

  const price = pricing[category][currentTier];
  const total = isMember ? price.member : price.nonMember;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="text-muted">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main>
          <PageHeader
            title="Congress Registration"
            subtitle="Please sign in to register for the IAMA Annual Congress 2026."
            breadcrumbs={[
              { label: "Congress", href: "/congress" },
              { label: "Register" },
            ]}
          />
          <section className="py-20">
            <div className="mx-auto max-w-md px-4 text-center">
              <p className="text-muted mb-6">
                You need to be signed in to register for the congress.
              </p>
              <Button
                asChild
                href="/auth/login?redirect=/congress/register"
                size="lg"
              >
                Sign In to Register
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Congress Registration"
          subtitle="Register for the IAMA Annual Congress 2026 — October 16-18, Beverly Hilton, Los Angeles."
          breadcrumbs={[
            { label: "Congress", href: "/congress" },
            { label: "Register" },
          ]}
        />

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Registration form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <p className="text-sm text-muted mb-1">Registered as</p>
                      <p className="font-medium text-secondary">{user.email}</p>
                    </div>

                    <Select
                      label="Registration Category"
                      options={categories}
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value as RegistrationCategory)
                      }
                    />

                    <div>
                      <p className="mb-2 text-sm font-medium text-foreground">
                        Are you an IAMA member?
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsMember(true)}
                          className={cn(
                            "flex-1 rounded-lg border-2 p-3 text-sm font-medium transition-colors cursor-pointer",
                            isMember
                              ? "border-primary bg-primary-50 text-primary"
                              : "border-border text-muted hover:border-gray-300"
                          )}
                        >
                          Yes, I&apos;m a member
                        </button>
                        <button
                          onClick={() => setIsMember(false)}
                          className={cn(
                            "flex-1 rounded-lg border-2 p-3 text-sm font-medium transition-colors cursor-pointer",
                            !isMember
                              ? "border-primary bg-primary-50 text-primary"
                              : "border-border text-muted hover:border-gray-300"
                          )}
                        >
                          Not yet
                        </button>
                      </div>
                      {!isMember && (
                        <p className="mt-2 text-xs text-muted">
                          <a
                            href="/membership"
                            className="text-primary hover:text-primary-dark"
                          >
                            Become a member
                          </a>{" "}
                          to save on registration.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing for {categories.find((c) => c.value === category)?.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="py-2 text-left font-medium text-muted">
                              Period
                            </th>
                            <th className="py-2 text-right font-medium text-muted">
                              Member
                            </th>
                            <th className="py-2 text-right font-medium text-muted">
                              Non-Member
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(
                            ["early_bird", "regular", "late"] as PricingTier[]
                          ).map((tier) => (
                            <tr
                              key={tier}
                              className={cn(
                                "border-b border-border",
                                tier === currentTier && "bg-primary-50"
                              )}
                            >
                              <td className="py-3 capitalize flex items-center gap-2">
                                {tier.replace("_", " ")}
                                {tier === currentTier && (
                                  <Badge variant="success">Current</Badge>
                                )}
                              </td>
                              <td className="py-3 text-right font-medium">
                                ${pricing[category][tier].member}
                              </td>
                              <td className="py-3 text-right font-medium">
                                ${pricing[category][tier].nonMember}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#635bff] px-6 py-3 text-sm font-medium text-white hover:bg-[#5851db] transition-colors cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      Pay with Stripe — ${total}
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0070ba] px-6 py-3 text-sm font-medium text-white hover:bg-[#005ea6] transition-colors cursor-pointer">
                      <Shield className="h-4 w-4" />
                      Pay with PayPal — ${total}
                    </button>
                    <p className="text-center text-xs text-muted">
                      Your payment is secure and encrypted. A confirmation email
                      will be sent upon completion.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary Sidebar */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted">Event</span>
                        <span className="font-medium text-secondary">
                          Annual Congress 2026
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Category</span>
                        <span className="font-medium text-secondary">
                          {categories.find((c) => c.value === category)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Period</span>
                        <span className="font-medium text-secondary capitalize">
                          Early Bird
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Rate</span>
                        <span className="font-medium text-secondary">
                          {isMember ? "Member" : "Non-Member"}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-lg font-bold text-secondary">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      {[
                        "Full 3-day access",
                        "CME credits included",
                        "Conference materials",
                        "Networking reception",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs text-muted"
                        >
                          <CheckCircle className="h-3.5 w-3.5 text-success" />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3">
                      <Clock className="h-4 w-4 text-amber-600 shrink-0" />
                      <p className="text-xs text-amber-700">
                        Early bird pricing ends July 15, 2026
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
