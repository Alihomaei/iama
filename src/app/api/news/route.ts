import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from("news_posts")
      .select(
        "id, title, slug, excerpt, cover_image_url, published_at, author_id, profiles!news_posts_author_id_fkey(full_name, avatar_url)",
        { count: "exact" }
      )
      .eq("published", true)
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching news:", error);
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    });
  } catch (error) {
    console.error("News GET error:", error);
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

    // Admin or content_editor only
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

    const body = await request.json();

    const { title, slug, excerpt, content, cover_image_url, published } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "title and slug are required" },
        { status: 400 }
      );
    }

    // Validate slug format
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json(
        { error: "slug must be lowercase alphanumeric with hyphens" },
        { status: 400 }
      );
    }

    const insertData: Record<string, unknown> = {
      title,
      slug,
      excerpt: excerpt || null,
      content: content || null,
      author_id: user.id,
      cover_image_url: cover_image_url || null,
      published: published || false,
    };

    if (published) {
      insertData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("news_posts")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Error creating news post:", error);

      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A news post with this slug already exists" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create news post" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("News POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
