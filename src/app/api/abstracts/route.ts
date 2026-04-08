import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { AbstractAuthor } from "@/types/database";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const status = searchParams.get("status");

    let query = supabase
      .from("abstracts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (eventId) {
      query = query.eq("event_id", eventId);
    }

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching abstracts:", error);
      return NextResponse.json(
        { error: "Failed to fetch abstracts" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Abstracts GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      event_id,
      title,
      authors,
      body_background,
      body_methods,
      body_results,
      body_conclusion,
      keywords,
      category,
      conflict_of_interest,
      status,
    } = body;

    // Validate required fields
    if (!event_id) {
      return NextResponse.json(
        { error: "event_id is required" },
        { status: 400 }
      );
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "title is required" },
        { status: 400 }
      );
    }

    // Validate status is either draft or submitted
    const abstractStatus = status === "submitted" ? "submitted" : "draft";

    // If submitting, validate all required fields are present
    if (abstractStatus === "submitted") {
      const missingFields: string[] = [];

      if (!authors || !Array.isArray(authors) || authors.length === 0) {
        missingFields.push("authors");
      } else {
        const invalidAuthors = (authors as AbstractAuthor[]).filter(
          (a) => !a.name || !a.affiliation || !a.email
        );
        if (invalidAuthors.length > 0) {
          return NextResponse.json(
            { error: "All authors must have name, affiliation, and email" },
            { status: 400 }
          );
        }

        const hasPresentingAuthor = (authors as AbstractAuthor[]).some(
          (a) => a.is_presenting
        );
        if (!hasPresentingAuthor) {
          return NextResponse.json(
            { error: "At least one author must be marked as presenting" },
            { status: 400 }
          );
        }
      }

      if (!body_background || !body_background.trim()) missingFields.push("body_background");
      if (!body_methods || !body_methods.trim()) missingFields.push("body_methods");
      if (!body_results || !body_results.trim()) missingFields.push("body_results");
      if (!body_conclusion || !body_conclusion.trim()) missingFields.push("body_conclusion");
      if (!keywords || !Array.isArray(keywords) || keywords.length === 0) missingFields.push("keywords");
      if (!category || !category.trim()) missingFields.push("category");

      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required fields for submission: ${missingFields.join(", ")}` },
          { status: 400 }
        );
      }
    }

    // Check abstract deadline
    if (abstractStatus === "submitted") {
      const { data: event } = await supabase
        .from("congress_events")
        .select("abstract_deadline")
        .eq("id", event_id)
        .single();

      if (event?.abstract_deadline && new Date() > new Date(event.abstract_deadline)) {
        return NextResponse.json(
          { error: "Abstract submission deadline has passed" },
          { status: 400 }
        );
      }
    }

    const insertData: Record<string, unknown> = {
      user_id: user.id,
      event_id,
      title: title.trim(),
      authors: authors || [],
      body_background: body_background || null,
      body_methods: body_methods || null,
      body_results: body_results || null,
      body_conclusion: body_conclusion || null,
      keywords: keywords || [],
      category: category || null,
      conflict_of_interest: conflict_of_interest || null,
      status: abstractStatus,
    };

    if (abstractStatus === "submitted") {
      insertData.submitted_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("abstracts")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Error creating abstract:", error);
      return NextResponse.json(
        { error: "Failed to create abstract" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Abstracts POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
