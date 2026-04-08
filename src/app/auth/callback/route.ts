import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { sendWelcomeEmail } from "@/lib/email";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("redirect") ?? searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth callback error:", error.message);
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
  }

  // Send welcome email for new users (profile just created by trigger)
  if (data.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, created_at")
      .eq("id", data.user.id)
      .single();

    if (profile) {
      const createdAt = new Date(profile.created_at);
      const now = new Date();
      const isNewUser = now.getTime() - createdAt.getTime() < 60_000; // within 1 minute

      if (isNewUser) {
        try {
          await sendWelcomeEmail({
            to: data.user.email!,
            name: profile.full_name || data.user.email!,
          });
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
