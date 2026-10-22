import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, sendFormEmail } from '@/lib/email';

const TOPIC_LABELS: Record<string, string> = {
  visit: 'Planning a Visit',
  prayer: 'Prayer Request',
  volunteer: 'Volunteering',
  ministries: 'Joining a Ministry',
  general: 'General Question',
  other: 'Other',
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const topic = typeof body?.topic === 'string' ? body.topic.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }

  const topicLabel = TOPIC_LABELS[topic] ?? 'General Question';

  try {
    await sendFormEmail({
      subject: `Contact form: ${firstName} ${lastName} (${topicLabel})`,
      replyTo: email,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Topic: ${topicLabel}`,
        '',
        message,
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Topic:</strong> ${escapeHtml(topicLabel)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to send message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
