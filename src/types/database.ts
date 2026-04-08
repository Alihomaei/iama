export type MembershipTier = "fellow" | "associate" | "student" | "international" | "faculty";
export type MembershipStatus = "pending" | "active" | "expired" | "cancelled";
export type RegistrationCategory = "physician" | "resident" | "student" | "virtual";
export type PricingTier = "early_bird" | "regular" | "late";
export type AbstractStatus = "draft" | "submitted" | "under_review" | "accepted" | "rejected" | "revision_requested";
export type AdminRole = "super_admin" | "content_editor" | "abstract_reviewer" | "event_manager";
export type PaymentProvider = "stripe" | "paypal";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  phone: string | null;
  specialty: string | null;
  institution: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  bio: string | null;
  is_public_directory: boolean;
  admin_role: AdminRole | null;
  created_at: string;
  updated_at: string;
}

export interface Membership {
  id: string;
  user_id: string;
  tier: MembershipTier;
  status: MembershipStatus;
  starts_at: string;
  expires_at: string;
  auto_renew: boolean;
  payment_id: string | null;
  created_at: string;
}

export interface CongressEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  early_bird_deadline: string | null;
  regular_deadline: string | null;
  abstract_deadline: string | null;
  is_active: boolean;
  banner_url: string | null;
  created_at: string;
}

export interface CongressPricing {
  id: string;
  event_id: string;
  category: RegistrationCategory;
  tier: PricingTier;
  price: number; // in cents
  member_price: number; // in cents
}

export interface Registration {
  id: string;
  user_id: string;
  event_id: string;
  category: RegistrationCategory;
  pricing_tier: PricingTier;
  payment_status: PaymentStatus;
  payment_provider: PaymentProvider | null;
  payment_id: string | null;
  amount_paid: number;
  is_member_rate: boolean;
  created_at: string;
}

export interface Abstract {
  id: string;
  user_id: string;
  event_id: string;
  title: string;
  authors: AbstractAuthor[];
  body_background: string;
  body_methods: string;
  body_results: string;
  body_conclusion: string;
  keywords: string[];
  category: string;
  conflict_of_interest: string;
  status: AbstractStatus;
  reviewer_id: string | null;
  reviewer_comments: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AbstractAuthor {
  name: string;
  affiliation: string;
  email: string;
  is_presenting: boolean;
}

export interface Speaker {
  id: string;
  event_id: string;
  name: string;
  title: string;
  institution: string;
  bio: string;
  photo_url: string | null;
  sessions: string[];
  created_at: string;
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EducationResource {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  type: "cme" | "webinar" | "article" | "guideline";
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
}
