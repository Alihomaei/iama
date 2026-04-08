import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || "");
  }
  return _resend;
}

const FROM_EMAIL = process.env.EMAIL_FROM || "IAMA <noreply@iama.org>";
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://iama.org";

export async function sendWelcomeEmail(params: {
  to: string;
  name: string;
}) {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: "Welcome to IAMA",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">Welcome to IAMA</h1>
        <p>Dear ${params.name},</p>
        <p>Thank you for creating your account with the Iranian American Medical Association. We are delighted to have you join our community of medical professionals.</p>
        <p>With your account you can:</p>
        <ul>
          <li>Apply for IAMA membership</li>
          <li>Register for our annual congress</li>
          <li>Submit research abstracts</li>
          <li>Access educational resources</li>
        </ul>
        <p>
          <a href="${SITE_URL}/dashboard" style="display: inline-block; background-color: #0d9488; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Go to Dashboard</a>
        </p>
        <p>If you have any questions, please do not hesitate to contact us.</p>
        <p>Sincerely,<br/>The IAMA Team</p>
      </div>
    `,
  });
}

export async function sendMembershipConfirmation(params: {
  to: string;
  name: string;
  tier: string;
  expiresAt: string;
}) {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: "IAMA Membership Confirmed",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">Membership Confirmed</h1>
        <p>Dear ${params.name},</p>
        <p>Your IAMA <strong>${params.tier}</strong> membership is now active.</p>
        <p><strong>Valid through:</strong> ${params.expiresAt}</p>
        <p>As an active member you now enjoy the full range of IAMA benefits including congress registration discounts, journal access, and more.</p>
        <p>
          <a href="${SITE_URL}/dashboard" style="display: inline-block; background-color: #0d9488; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Membership</a>
        </p>
        <p>Thank you for your support.</p>
        <p>Sincerely,<br/>The IAMA Team</p>
      </div>
    `,
  });
}

export async function sendRegistrationConfirmation(params: {
  to: string;
  name: string;
  eventTitle: string;
  category: string;
  amount: string;
}) {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Registration Confirmed — ${params.eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">Registration Confirmed</h1>
        <p>Dear ${params.name},</p>
        <p>Your registration for <strong>${params.eventTitle}</strong> has been confirmed.</p>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 4px 16px 4px 0; font-weight: bold;">Category:</td><td>${params.category}</td></tr>
          <tr><td style="padding: 4px 16px 4px 0; font-weight: bold;">Amount Paid:</td><td>${params.amount}</td></tr>
        </table>
        <p>You will receive further details about the event as the date approaches.</p>
        <p>
          <a href="${SITE_URL}/dashboard" style="display: inline-block; background-color: #0d9488; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Registration</a>
        </p>
        <p>Sincerely,<br/>The IAMA Team</p>
      </div>
    `,
  });
}

export async function sendAbstractStatusNotification(params: {
  to: string;
  name: string;
  abstractTitle: string;
  status: "accepted" | "rejected" | "revision_requested";
  comments?: string;
}) {
  const statusMessages: Record<string, { subject: string; message: string }> = {
    accepted: {
      subject: "Abstract Accepted",
      message:
        "We are pleased to inform you that your abstract has been <strong style='color: #16a34a;'>accepted</strong> for presentation.",
    },
    rejected: {
      subject: "Abstract Decision",
      message:
        "After careful review, we regret to inform you that your abstract has not been selected for presentation at this time.",
    },
    revision_requested: {
      subject: "Abstract — Revision Requested",
      message:
        "The reviewers have requested <strong>revisions</strong> to your abstract. Please review the comments below and resubmit.",
    },
  };

  const { subject, message } = statusMessages[params.status];

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `${subject} — ${params.abstractTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">${subject}</h1>
        <p>Dear ${params.name},</p>
        <p>${message}</p>
        <p><strong>Abstract:</strong> ${params.abstractTitle}</p>
        ${
          params.comments
            ? `<div style="background-color: #f0fdfa; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #0d9488;"><strong>Reviewer Comments:</strong><br/>${params.comments}</div>`
            : ""
        }
        <p>
          <a href="${SITE_URL}/abstracts/status" style="display: inline-block; background-color: #0d9488; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Abstract</a>
        </p>
        <p>Sincerely,<br/>The IAMA Team</p>
      </div>
    `,
  });
}
