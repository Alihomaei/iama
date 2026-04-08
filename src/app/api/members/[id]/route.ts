import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    // Allow self or admin
    const isSelf = user.id === id;

    if (!isSelf) {
      const { data: callerProfile } = await supabase
        .from("profiles")
        .select("admin_role")
        .eq("id", user.id)
        .single();

      if (!callerProfile || callerProfile.admin_role !== "super_admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const { data: memberships } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    const { data: registrations } = await supabase
      .from("registrations")
      .select("*, congress_events(title, slug, start_date, end_date)")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    return NextResponse.json({
      profile,
      memberships: memberships || [],
      registrations: registrations || [],
    });
  } catch (error) {
    console.error("Member GET error:", error);
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

    const isSelf = user.id === id;
    let isAdmin = false;

    if (!isSelf) {
      const { data: callerProfile } = await supabase
        .from("profiles")
        .select("admin_role")
        .eq("id", user.id)
        .single();

      isAdmin = callerProfile?.admin_role === "super_admin";

      if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const body = await request.json();

    // Fields that regular users can update
    const userUpdatableFields = [
      "full_name",
      "first_name",
      "last_name",
      "phone",
      "specialty",
      "institution",
      "city",
      "state",
      "country",
      "bio",
      "is_public_directory",
      "avatar_url",
    ];

    // Additional fields admins can update
    const adminOnlyFields = ["admin_role", "email"];

    const allowedFields = isAdmin
      ? [...userUpdatableFields, ...adminOnlyFields]
      : userUpdatableFields;

    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Member PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
