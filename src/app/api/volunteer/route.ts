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
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const areaOfInterest = typeof body?.areaOfInterest === 'string' ? body.areaOfInterest.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  // Honeypot: a hidden field real visitors never fill; a bot that fills it
  // gets a fake success response so it doesn't adapt, but nothing is sent.
  if (typeof body?.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  if (!firstName || !lastName || !email || !areaOfInterest) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }

  if (
    firstName.length > MAX_FIELD_LENGTHS.name ||
    lastName.length > MAX_FIELD_LENGTHS.name ||
    email.length > MAX_FIELD_LENGTHS.email ||
    phone.length > MAX_FIELD_LENGTHS.phone ||
    areaOfInterest.length > MAX_FIELD_LENGTHS.topic ||
    message.length > MAX_FIELD_LENGTHS.message
  ) {
    return NextResponse.json({ ok: false, error: 'One or more fields are too long.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    await sendFormEmail({
      subject: `Volunteer sign-up: ${firstName} ${lastName} (${areaOfInterest})`,
      replyTo: email,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Area of interest: ${areaOfInterest}`,
        '',
        message || 'No additional notes.',
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Area of interest:</strong> ${escapeHtml(areaOfInterest)}</p>
        <p><strong>Notes:</strong></p>
        <p>${escapeHtml(message || 'No additional notes.').replace(/\n/g, '<br />')}</p>
      `,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to send message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
