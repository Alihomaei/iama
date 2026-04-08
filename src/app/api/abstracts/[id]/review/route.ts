import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendAbstractStatusNotification } from "@/lib/email";

export async function POST(
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

    // Only admin or abstract_reviewer can review
    const { data: reviewerProfile } = await supabase
      .from("profiles")
      .select("admin_role")
      .eq("id", user.id)
      .single();

    const isReviewer =
      reviewerProfile?.admin_role === "super_admin" ||
      reviewerProfile?.admin_role === "abstract_reviewer";

    if (!isReviewer) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { decision, comments } = body as {
      decision: "accepted" | "rejected" | "revision_requested";
      comments?: string;
    };

    if (!decision || !["accepted", "rejected", "revision_requested"].includes(decision)) {
      return NextResponse.json(
        { error: "Invalid decision. Must be accepted, rejected, or revision_requested" },
        { status: 400 }
      );
    }

    // Fetch the abstract
    const { data: abstract, error: fetchError } = await supabase
      .from("abstracts")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !abstract) {
      return NextResponse.json({ error: "Abstract not found" }, { status: 404 });
    }

    // Must be submitted or under_review to be reviewed
    if (abstract.status !== "submitted" && abstract.status !== "under_review") {
      return NextResponse.json(
        { error: "Abstract must be in submitted or under_review status to be reviewed" },
        { status: 400 }
      );
    }

    // Update the abstract
    const { data: updated, error: updateError } = await supabase
      .from("abstracts")
      .update({
        status: decision,
        reviewer_id: user.id,
        reviewer_comments: comments || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating abstract review:", updateError);
      return NextResponse.json(
        { error: "Failed to update abstract" },
        { status: 500 }
      );
    }

    // Send notification email to the author
    const { data: authorProfile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", abstract.user_id)
      .single();

    if (authorProfile) {
      try {
        await sendAbstractStatusNotification({
          to: authorProfile.email,
          name: authorProfile.full_name || authorProfile.email,
          abstractTitle: abstract.title,
          status: decision,
          comments: comments || undefined,
        });
      } catch (emailError) {
        console.error("Failed to send abstract notification email:", emailError);
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Abstract review POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
