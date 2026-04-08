import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const active = searchParams.get("active");
    const upcoming = searchParams.get("upcoming");

    let query = supabase
      .from("congress_events")
      .select("*")
      .order("start_date", { ascending: false });

    if (active === "true") {
      query = query.eq("is_active", true);
    }

    if (upcoming === "true") {
      query = query.gte("start_date", new Date().toISOString().split("T")[0]);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching events:", error);
      return NextResponse.json(
        { error: "Failed to fetch events" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Events GET error:", error);
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

    // Admin only
    const { data: profile } = await supabase
      .from("profiles")
      .select("admin_role")
      .eq("id", user.id)
      .single();

    const canManageEvents =
      profile?.admin_role === "super_admin" ||
      profile?.admin_role === "event_manager";

    if (!canManageEvents) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const {
      title,
      slug,
      description,
      location,
      venue,
      start_date,
      end_date,
      early_bird_deadline,
      regular_deadline,
      abstract_deadline,
      is_active,
      banner_url,
    } = body;

    // Validate required fields
    if (!title || !slug || !start_date || !end_date) {
      return NextResponse.json(
        { error: "title, slug, start_date, and end_date are required" },
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

    // Validate dates
    if (new Date(end_date) < new Date(start_date)) {
      return NextResponse.json(
        { error: "end_date must be after start_date" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("congress_events")
      .insert({
        title,
        slug,
        description: description || null,
        location: location || null,
        venue: venue || null,
        start_date,
        end_date,
        early_bird_deadline: early_bird_deadline || null,
        regular_deadline: regular_deadline || null,
        abstract_deadline: abstract_deadline || null,
        is_active: is_active ?? true,
        banner_url: banner_url || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating event:", error);

      if (error.code === "23505") {
        return NextResponse.json(
          { error: "An event with this slug already exists" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create event" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Events POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
