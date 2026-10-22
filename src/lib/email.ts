import { Resend } from 'resend';

interface SendFormEmailInput {
  subject: string;
  replyTo?: string;
  html: string;
  text: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Sends a form submission email via Resend. Requires RESEND_API_KEY,
// CONTACT_EMAIL_TO (the staff inbox that receives submissions), and
// CONTACT_EMAIL_FROM (a sender address on a domain verified in the Resend
// dashboard) — throws if any is missing or the send fails, so the calling
// API route can report the failure back to the visitor instead of
// silently losing their submission.
export async function sendFormEmail({ subject, replyTo, html, text }: SendFormEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    throw new Error('Email is not configured on this server.');
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }
}
