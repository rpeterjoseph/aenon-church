import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, sendFormEmail } from '@/lib/email';
import { MAX_FIELD_LENGTHS, isRequestBodyTooLarge, isValidEmail } from '@/lib/formValidation';

export async function POST(request: NextRequest) {
  if (isRequestBodyTooLarge(request)) {
    return NextResponse.json({ ok: false, error: 'Submission is too large.' }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  const firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const keepPrivate = body?.keepPrivate === true;

  // Honeypot: a hidden field real visitors never fill; a bot that fills it
  // gets a fake success response so it doesn't adapt, but nothing is sent.
  if (typeof body?.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  if (!firstName || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }

  if (
    firstName.length > MAX_FIELD_LENGTHS.name ||
    lastName.length > MAX_FIELD_LENGTHS.name ||
    email.length > MAX_FIELD_LENGTHS.email ||
    message.length > MAX_FIELD_LENGTHS.message
  ) {
    return NextResponse.json({ ok: false, error: 'One or more fields are too long.' }, { status: 400 });
  }

  if (email && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
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
