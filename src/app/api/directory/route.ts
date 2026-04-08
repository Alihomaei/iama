import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const specialty = searchParams.get("specialty");
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const country = searchParams.get("country");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "25", 10);
    const offset = (page - 1) * limit;

    let query = supabase
      .from("profiles")
      .select(
        "id, full_name, first_name, last_name, avatar_url, specialty, institution, city, state, country, bio",
        { count: "exact" }
      )
      .eq("is_public_directory", true)
      .order("last_name", { ascending: true })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%,specialty.ilike.%${search}%,institution.ilike.%${search}%`
      );
    }

    if (specialty) {
      query = query.ilike("specialty", `%${specialty}%`);
    }

    if (state) {
      query = query.ilike("state", `%${state}%`);
    }

    if (city) {
      query = query.ilike("city", `%${city}%`);
    }

    if (country) {
      query = query.ilike("country", `%${country}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching directory:", error);
      return NextResponse.json(
        { error: "Failed to fetch directory" },
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
    console.error("Directory GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
