import { NextRequest, NextResponse } from 'next/server';
import { sendTeamEmail, escapeHtml } from '@/lib/mail';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, request, isPrivate, company } = body;

  // Honeypot — bots fill hidden fields, humans never see them.
  if (company) return NextResponse.json({ ok: true });

  if (!firstName || !request) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  try {
    await sendTeamEmail({
      subject: `New prayer request from ${firstName}${lastName ? ` ${lastName}` : ''}`,
      replyTo: email || undefined,
      html: `
        <h2>New Prayer Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)}${lastName ? ` ${escapeHtml(lastName)}` : ''}</p>
        ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ''}
        <p><strong>Keep private (pastoral team only):</strong> ${isPrivate ? 'Yes' : 'No'}</p>
        <p><strong>Request:</strong></p>
        <p>${escapeHtml(request).replace(/\n/g, '<br />')}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Prayer request email failed:', err);
    return NextResponse.json({ error: 'Failed to send request.' }, { status: 500 });
  }
}
