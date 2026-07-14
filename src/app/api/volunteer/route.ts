import { NextRequest, NextResponse } from 'next/server';
import { sendTeamEmail, escapeHtml } from '@/lib/mail';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, phone, area, about, company } = body;

  // Honeypot — bots fill hidden fields, humans never see them.
  if (company) return NextResponse.json({ ok: true });

  if (!firstName || !lastName || !email || !area) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  try {
    await sendTeamEmail({
      subject: `New volunteer interest: ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <h2>New Volunteer Interest</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Area of Interest:</strong> ${escapeHtml(area)}</p>
        ${about ? `<p><strong>About:</strong></p><p>${escapeHtml(about).replace(/\n/g, '<br />')}</p>` : ''}
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Volunteer form email failed:', err);
    return NextResponse.json({ error: 'Failed to send interest form.' }, { status: 500 });
  }
}
