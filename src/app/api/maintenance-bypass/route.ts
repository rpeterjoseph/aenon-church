import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'aenon-bypass-expires';
const BYPASS_DURATION_MS = 5 * 60 * 1000;

export async function POST(request: NextRequest) {
  const { secret } = await request.json().catch(() => ({ secret: null }));
  const expected = process.env.MAINTENANCE_BYPASS_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const expiresAt = Date.now() + BYPASS_DURATION_MS;
  const response = NextResponse.json({ ok: true, expiresAt });
  response.cookies.set(COOKIE_NAME, String(expiresAt), {
    path: '/',
    maxAge: BYPASS_DURATION_MS / 1000,
    sameSite: 'lax',
  });
  return response;
}
