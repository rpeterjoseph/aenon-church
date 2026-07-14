import { Resend } from 'resend';

let client: Resend | null = null;

function getClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not set');
    client = new Resend(apiKey);
  }
  return client;
}

export async function sendTeamEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const to = process.env.RESEND_TO_EMAIL || 'aenonchurch@gmail.com';
  const from = process.env.RESEND_FROM_EMAIL || 'Aenon Church Website <onboarding@resend.dev>';

  const { error } = await getClient().emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  });

  if (error) throw new Error(error.message);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
