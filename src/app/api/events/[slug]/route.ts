import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: event, error } = await supabase
      .from("congress_events")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Fetch pricing for this event
    const { data: pricing } = await supabase
      .from("congress_pricing")
      .select("*")
      .eq("event_id", event.id)
      .order("category")
      .order("tier");

    // Fetch speakers
    const { data: speakers } = await supabase
      .from("speakers")
      .select("*")
      .eq("event_id", event.id)
      .order("sort_order");

    // Fetch schedule
    const { data: schedule } = await supabase
      .from("congress_schedule")
      .select("*")
      .eq("event_id", event.id)
      .order("day_date")
      .order("start_time");

    // Determine current pricing tier
    const now = new Date();
    let currentTier = "late";

    if (event.early_bird_deadline && now <= new Date(event.early_bird_deadline)) {
      currentTier = "early_bird";
    } else if (event.regular_deadline && now <= new Date(event.regular_deadline)) {
      currentTier = "regular";
    }

    return NextResponse.json({
      ...event,
      pricing: pricing || [],
      speakers: speakers || [],
      schedule: schedule || [],
      currentPricingTier: currentTier,
    });
  } catch (error) {
    console.error("Event GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
