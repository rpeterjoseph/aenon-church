import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml, sendFormEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const areaOfInterest = typeof body?.areaOfInterest === 'string' ? body.areaOfInterest.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!firstName || !lastName || !email || !areaOfInterest) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
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
