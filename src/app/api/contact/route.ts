import { NextRequest, NextResponse } from 'next/server';
import { sendTeamEmail, escapeHtml } from '@/lib/mail';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, topic, message, company } = body;

  // Honeypot — bots fill hidden fields, humans never see them.
  if (company) return NextResponse.json({ ok: true });

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  try {
    await sendTeamEmail({
      subject: `New contact form message from ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${topic ? `<p><strong>Topic:</strong> ${escapeHtml(topic)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form email failed:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
