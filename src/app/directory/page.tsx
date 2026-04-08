"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building2, Stethoscope } from "lucide-react";

const specialties = [
  { value: "", label: "All Specialties" },
  { value: "cardiology", label: "Cardiology" },
  { value: "oncology", label: "Oncology" },
  { value: "surgery", label: "Surgery" },
  { value: "neurology", label: "Neurology" },
  { value: "internal-medicine", label: "Internal Medicine" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "radiology", label: "Radiology" },
  { value: "pathology", label: "Pathology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "orthopedics", label: "Orthopedics" },
];

const sampleDoctors = [
  {
    id: "1",
    name: "Dr. Reza Ahmadi",
    specialty: "Cardiology",
    institution: "UCLA Medical Center",
    city: "Los Angeles",
    state: "CA",
    tier: "Fellow",
  },
  {
    id: "2",
    name: "Dr. Sara Mohammadi",
    specialty: "Oncology",
    institution: "Johns Hopkins Hospital",
    city: "Baltimore",
    state: "MD",
    tier: "Fellow",
  },
  {
    id: "3",
    name: "Dr. Kaveh Nasseri",
    specialty: "Neurology",
    institution: "Mayo Clinic",
    city: "Rochester",
    state: "MN",
    tier: "Fellow",
  },
  {
    id: "4",
    name: "Dr. Mina Karimi",
    specialty: "Internal Medicine",
    institution: "Stanford Health Care",
    city: "Palo Alto",
    state: "CA",
    tier: "Faculty",
  },
  {
    id: "5",
    name: "Dr. Amir Hosseini",
    specialty: "Surgery",
    institution: "Cleveland Clinic",
    city: "Cleveland",
    state: "OH",
    tier: "Fellow",
  },
  {
    id: "6",
    name: "Dr. Leila Tehrani",
    specialty: "Pathology",
    institution: "Cedars-Sinai Medical Center",
    city: "Los Angeles",
    state: "CA",
    tier: "Faculty",
  },
  {
    id: "7",
    name: "Dr. Babak Sharifi",
    specialty: "Cardiology",
    institution: "Stanford Health Care",
    city: "Palo Alto",
    state: "CA",
    tier: "Faculty",
  },
  {
    id: "8",
    name: "Dr. Nima Rezaei",
    specialty: "Surgery",
    institution: "Stanford University",
    city: "Stanford",
    state: "CA",
    tier: "Associate",
  },
  {
    id: "9",
    name: "Dr. Parisa Tehrani",
    specialty: "Oncology",
    institution: "MD Anderson Cancer Center",
    city: "Houston",
    state: "TX",
    tier: "Fellow",
  },
  {
    id: "10",
    name: "Dr. Mehrdad Ayati",
    specialty: "Surgery",
    institution: "USC Keck School of Medicine",
    city: "Los Angeles",
    state: "CA",
    tier: "Faculty",
  },
  {
    id: "11",
    name: "Dr. Azadeh Moini",
    specialty: "Dermatology",
    institution: "NYU Langone Health",
    city: "New York",
    state: "NY",
    tier: "Associate",
  },
  {
    id: "12",
    name: "Dr. Farshad Nazarian",
    specialty: "Orthopedics",
    institution: "Hospital for Special Surgery",
    city: "New York",
    state: "NY",
    tier: "Fellow",
  },
];

export default function DirectoryPage() {
  const [searchName, setSearchName] = useState("");
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filtered = sampleDoctors.filter((doc) => {
    const nameMatch = doc.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const specialtyMatch =
      !searchSpecialty ||
      doc.specialty.toLowerCase().replace(/\s+/g, "-") === searchSpecialty;
    const locationMatch =
      !searchLocation ||
      doc.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
      doc.state.toLowerCase().includes(searchLocation.toLowerCase());
    return nameMatch && specialtyMatch && locationMatch;
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Find a Doctor"
          subtitle="Search our directory of IAMA member physicians by name, specialty, or location."
          breadcrumbs={[{ label: "Find a Doctor" }]}
        />

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Search bar */}
            <Card className="mb-10">
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="flex h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <Select
                    options={specialties}
                    value={searchSpecialty}
                    onChange={(e) => setSearchSpecialty(e.target.value)}
                    placeholder="All Specialties"
                  />
                  <Input
                    placeholder="City or State"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      setSearchName("");
                      setSearchSpecialty("");
                      setSearchLocation("");
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <p className="mb-6 text-sm text-muted">
              Showing {filtered.length} of {sampleDoctors.length} physicians
            </p>

            {filtered.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((doc) => (
                  <Card
                    key={doc.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-lg font-bold">
                          {doc.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-secondary truncate">
                            {doc.name}
                          </h3>
                          <div className="mt-1 space-y-1">
                            <p className="flex items-center gap-1.5 text-sm text-primary">
                              <Stethoscope className="h-3.5 w-3.5 shrink-0" />
                              {doc.specialty}
                            </p>
                            <p className="flex items-center gap-1.5 text-sm text-muted">
                              <Building2 className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">
                                {doc.institution}
                              </span>
                            </p>
                            <p className="flex items-center gap-1.5 text-sm text-muted">
                              <MapPin className="h-3.5 w-3.5 shrink-0" />
                              {doc.city}, {doc.state}
                            </p>
                          </div>
                          <Badge variant="outline" className="mt-2">
                            {doc.tier} Member
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Search className="mx-auto h-12 w-12 text-muted/40" />
                <h3 className="mt-4 text-lg font-semibold text-secondary">
                  No results found
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
