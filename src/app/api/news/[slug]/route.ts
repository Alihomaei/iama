import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("news_posts")
      .select(
        "*, profiles!news_posts_author_id_fkey(full_name, avatar_url)"
      )
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "News post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("News slug GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin or content_editor
    const { data: profile } = await supabase
      .from("profiles")
      .select("admin_role")
      .eq("id", user.id)
      .single();

    const canManageNews =
      profile?.admin_role === "super_admin" ||
      profile?.admin_role === "content_editor";

    if (!canManageNews) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Find existing post by slug
    const { data: existing, error: fetchError } = await supabase
      .from("news_posts")
      .select("id, published, published_at")
      .eq("slug", slug)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: "News post not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    const updateData: Record<string, unknown> = {};

    const updatableFields = [
      "title",
      "slug",
      "excerpt",
      "content",
      "cover_image_url",
      "published",
    ];

    for (const field of updatableFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Set published_at when first publishing
    if (body.published === true && !existing.published) {
      updateData.published_at = new Date().toISOString();
    }

    // Allow unpublishing
    if (body.published === false) {
      updateData.published_at = null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("news_posts")
      .update(updateData)
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating news post:", error);

      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A news post with this slug already exists" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to update news post" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("News slug PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
