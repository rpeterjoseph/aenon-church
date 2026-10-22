import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, sendFormEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const keepPrivate = body?.keepPrivate === true;

  if (!firstName || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }

  try {
    await sendFormEmail({
      subject: `Prayer request: ${firstName}${lastName ? ` ${lastName}` : ''}${keepPrivate ? ' (private)' : ''}`,
      replyTo: email || undefined,
      text: [
        `Name: ${firstName}${lastName ? ` ${lastName}` : ''}`,
        `Email: ${email || 'Not provided'}`,
        `Keep private (pastoral team only): ${keepPrivate ? 'Yes' : 'No'}`,
        '',
        message,
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(firstName)}${lastName ? ` ${escapeHtml(lastName)}` : ''}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
        <p><strong>Keep private (pastoral team only):</strong> ${keepPrivate ? 'Yes' : 'No'}</p>
        <p><strong>Request:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to send message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
