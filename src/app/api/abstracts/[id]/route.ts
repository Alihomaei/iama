import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { AbstractAuthor } from "@/types/database";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("abstracts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Abstract not found" }, { status: 404 });
    }

    // Only the owner or a reviewer/admin can view
    if (data.user_id !== user.id && data.reviewer_id !== user.id) {
      // Check if user is an admin or abstract reviewer
      const { data: profile } = await supabase
        .from("profiles")
        .select("admin_role")
        .eq("id", user.id)
        .single();

      const isAdmin =
        profile?.admin_role === "super_admin" ||
        profile?.admin_role === "abstract_reviewer";

      if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Abstract GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch current abstract
    const { data: existing, error: fetchError } = await supabase
      .from("abstracts")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: "Abstract not found" }, { status: 404 });
    }

    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Can only update if draft or revision_requested
    if (existing.status !== "draft" && existing.status !== "revision_requested") {
      return NextResponse.json(
        { error: "Abstract can only be updated when in draft or revision_requested status" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
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

    // Determine new status
    const newStatus =
      status === "submitted" ? "submitted" : existing.status === "revision_requested" && status !== "draft" ? existing.status : (status || existing.status);

    // If submitting, validate
    if (newStatus === "submitted") {
      const finalTitle = title || existing.title;
      const finalAuthors = authors || existing.authors;
      const finalBackground = body_background ?? existing.body_background;
      const finalMethods = body_methods ?? existing.body_methods;
      const finalResults = body_results ?? existing.body_results;
      const finalConclusion = body_conclusion ?? existing.body_conclusion;
      const finalKeywords = keywords || existing.keywords;
      const finalCategory = category || existing.category;

      const missingFields: string[] = [];

      if (!finalTitle || !finalTitle.trim()) missingFields.push("title");
      if (!finalAuthors || !Array.isArray(finalAuthors) || finalAuthors.length === 0) {
        missingFields.push("authors");
      } else {
        const invalidAuthors = (finalAuthors as AbstractAuthor[]).filter(
          (a) => !a.name || !a.affiliation || !a.email
        );
        if (invalidAuthors.length > 0) {
          return NextResponse.json(
            { error: "All authors must have name, affiliation, and email" },
            { status: 400 }
          );
        }
        const hasPresentingAuthor = (finalAuthors as AbstractAuthor[]).some(
          (a) => a.is_presenting
        );
        if (!hasPresentingAuthor) {
          return NextResponse.json(
            { error: "At least one author must be marked as presenting" },
            { status: 400 }
          );
        }
      }

      if (!finalBackground || !finalBackground.trim()) missingFields.push("body_background");
      if (!finalMethods || !finalMethods.trim()) missingFields.push("body_methods");
      if (!finalResults || !finalResults.trim()) missingFields.push("body_results");
      if (!finalConclusion || !finalConclusion.trim()) missingFields.push("body_conclusion");
      if (!finalKeywords || !Array.isArray(finalKeywords) || finalKeywords.length === 0) missingFields.push("keywords");
      if (!finalCategory || !finalCategory.trim()) missingFields.push("category");

      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required fields for submission: ${missingFields.join(", ")}` },
          { status: 400 }
        );
      }

      // Check abstract deadline
      const { data: event } = await supabase
        .from("congress_events")
        .select("abstract_deadline")
        .eq("id", existing.event_id)
        .single();

      if (event?.abstract_deadline && new Date() > new Date(event.abstract_deadline)) {
        return NextResponse.json(
          { error: "Abstract submission deadline has passed" },
          { status: 400 }
        );
      }
    }

    const updateData: Record<string, unknown> = {};

    if (title !== undefined) updateData.title = title.trim();
    if (authors !== undefined) updateData.authors = authors;
    if (body_background !== undefined) updateData.body_background = body_background;
    if (body_methods !== undefined) updateData.body_methods = body_methods;
    if (body_results !== undefined) updateData.body_results = body_results;
    if (body_conclusion !== undefined) updateData.body_conclusion = body_conclusion;
    if (keywords !== undefined) updateData.keywords = keywords;
    if (category !== undefined) updateData.category = category;
    if (conflict_of_interest !== undefined) updateData.conflict_of_interest = conflict_of_interest;

    if (newStatus === "submitted") {
      updateData.status = "submitted";
      updateData.submitted_at = new Date().toISOString();
    } else if (status !== undefined) {
      updateData.status = status;
    }

    const { data, error } = await supabase
      .from("abstracts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating abstract:", error);
      return NextResponse.json(
        { error: "Failed to update abstract" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Abstract PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admin or abstract_reviewer can PATCH
    const { data: profile } = await supabase
      .from("profiles")
      .select("admin_role")
      .eq("id", user.id)
      .single();

    const isReviewer =
      profile?.admin_role === "super_admin" ||
      profile?.admin_role === "abstract_reviewer";

    if (!isReviewer) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { status, reviewer_comments, reviewer_id } = body;

    const updateData: Record<string, unknown> = {};

    if (status !== undefined) updateData.status = status;
    if (reviewer_comments !== undefined) updateData.reviewer_comments = reviewer_comments;
    if (reviewer_id !== undefined) updateData.reviewer_id = reviewer_id;

    // If assigning to review, set to under_review
    if (reviewer_id && !status) {
      updateData.status = "under_review";
    }

    if (status === "accepted" || status === "rejected" || status === "revision_requested") {
      updateData.reviewed_at = new Date().toISOString();
      if (!updateData.reviewer_id) {
        updateData.reviewer_id = user.id;
      }
    }

    const { data, error } = await supabase
      .from("abstracts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error patching abstract:", error);
      return NextResponse.json(
        { error: "Failed to update abstract" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Abstract PATCH error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
