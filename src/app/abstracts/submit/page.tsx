"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Save, Send } from "lucide-react";
import type { AbstractAuthor } from "@/types/database";

const categories = [
  { value: "cardiology", label: "Cardiology" },
  { value: "oncology", label: "Oncology" },
  { value: "surgery", label: "Surgery" },
  { value: "neurology", label: "Neurology" },
  { value: "internal-medicine", label: "Internal Medicine" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "radiology", label: "Radiology" },
  { value: "pathology", label: "Pathology" },
  { value: "public-health", label: "Public Health" },
  { value: "other", label: "Other" },
];

const emptyAuthor: AbstractAuthor = {
  name: "",
  affiliation: "",
  email: "",
  is_presenting: false,
};

export default function AbstractSubmitPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<AbstractAuthor[]>([
    { ...emptyAuthor, is_presenting: true },
  ]);
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [background, setBackground] = useState("");
  const [methods, setMethods] = useState("");
  const [results, setResults] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [coi, setCoi] = useState("");

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({ email: data.user.email ?? "" });
      }
      setLoading(false);
    });
  }, [supabase.auth]);

  const addAuthor = () => {
    setAuthors([...authors, { ...emptyAuthor }]);
  };

  const removeAuthor = (index: number) => {
    if (authors.length <= 1) return;
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const updateAuthor = (
    index: number,
    field: keyof AbstractAuthor,
    value: string | boolean
  ) => {
    const updated = [...authors];
    if (field === "is_presenting") {
      // Only one presenting author
      updated.forEach((a, i) => {
        a.is_presenting = i === index;
      });
    } else {
      (updated[index] as unknown as Record<string, string | boolean>)[field] = value;
    }
    setAuthors(updated);
  };

  const handleSaveDraft = async () => {
    setSubmitting(true);
    // Placeholder: save draft logic
    await new Promise((r) => setTimeout(r, 500));
    alert("Draft saved successfully!");
    setSubmitting(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Placeholder: submit logic
    await new Promise((r) => setTimeout(r, 500));
    alert("Abstract submitted successfully!");
    setSubmitting(false);
  };

  const wordCount = (text: string) =>
    text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;

  const totalWords =
    wordCount(background) +
    wordCount(methods) +
    wordCount(results) +
    wordCount(conclusion);

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
            title="Submit Abstract"
            subtitle="Sign in to submit your research abstract."
            breadcrumbs={[
              { label: "Abstracts" },
              { label: "Submit" },
            ]}
          />
          <section className="py-20">
            <div className="mx-auto max-w-md px-4 text-center">
              <p className="text-muted mb-6">
                You must be signed in to submit an abstract.
              </p>
              <Button
                asChild
                href="/auth/login?redirect=/abstracts/submit"
                size="lg"
              >
                Sign In to Submit
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
          title="Submit Abstract"
          subtitle="Submit your research for presentation at the IAMA Annual Congress 2026."
          breadcrumbs={[
            { label: "Abstracts" },
            { label: "Submit" },
          ]}
        />

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 space-y-6">
            {/* Title & Category */}
            <Card>
              <CardHeader>
                <CardTitle>Abstract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Abstract Title"
                  placeholder="Enter the title of your abstract"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select
                    label="Category"
                    options={categories}
                    placeholder="Select a category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <Input
                    label="Keywords"
                    placeholder="Comma-separated keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    helpText="Enter up to 5 keywords separated by commas"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Authors */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Authors</CardTitle>
                  <Button variant="outline" size="sm" onClick={addAuthor}>
                    <Plus className="h-4 w-4" />
                    Add Author
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {authors.map((author, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-secondary">
                        Author {index + 1}
                        {author.is_presenting && (
                          <span className="ml-2 text-xs text-primary font-normal">
                            (Presenting Author)
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        {!author.is_presenting && (
                          <button
                            type="button"
                            onClick={() =>
                              updateAuthor(index, "is_presenting", true)
                            }
                            className="text-xs text-primary hover:text-primary-dark cursor-pointer"
                          >
                            Set as presenting
                          </button>
                        )}
                        {authors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAuthor(index)}
                            className="text-muted hover:text-destructive cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Input
                        placeholder="Full Name"
                        value={author.name}
                        onChange={(e) =>
                          updateAuthor(index, "name", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Affiliation"
                        value={author.affiliation}
                        onChange={(e) =>
                          updateAuthor(index, "affiliation", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={author.email}
                        onChange={(e) =>
                          updateAuthor(index, "email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Structured Body */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Abstract Body</CardTitle>
                  <span
                    className={`text-sm ${
                      totalWords > 300 ? "text-destructive" : "text-muted"
                    }`}
                  >
                    {totalWords}/300 words
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  label="Background / Introduction"
                  placeholder="Describe the background and purpose of the study..."
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  helpText={`${wordCount(background)} words`}
                />
                <Textarea
                  label="Methods"
                  placeholder="Describe the study design, participants, and methods..."
                  value={methods}
                  onChange={(e) => setMethods(e.target.value)}
                  helpText={`${wordCount(methods)} words`}
                />
                <Textarea
                  label="Results"
                  placeholder="Summarize the key findings and data..."
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  helpText={`${wordCount(results)} words`}
                />
                <Textarea
                  label="Conclusion"
                  placeholder="State the conclusions and implications..."
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  helpText={`${wordCount(conclusion)} words`}
                />
              </CardContent>
            </Card>

            {/* Conflict of Interest */}
            <Card>
              <CardHeader>
                <CardTitle>Conflict of Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  label="Disclosure Statement"
                  placeholder='Declare any conflicts of interest or write "None"'
                  value={coi}
                  onChange={(e) => setCoi(e.target.value)}
                  helpText="List any financial relationships or other interests that could affect your research."
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={submitting}
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                <Send className="h-4 w-4" />
                Submit Abstract
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
