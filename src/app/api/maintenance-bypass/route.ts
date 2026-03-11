import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BYPASS_SECRET =
  process.env.MAINTENANCE_BYPASS_SECRET || 'aenon-preview-2026';
const COOKIE_NAME = 'aenon-maintenance-bypass';
const COOKIE_MAX_AGE = 5 * 60; // 5 minutes in seconds

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== BYPASS_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 403 });
  }

  const expiresAt = Date.now() + COOKIE_MAX_AGE * 1000;

  // Set bypass cookie and redirect to homepage
  const response = NextResponse.redirect(new URL('/', request.url));

  // HttpOnly cookie for middleware auth check
  response.cookies.set(COOKIE_NAME, 'active', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  // Readable cookie for client-side countdown display
  response.cookies.set('aenon-bypass-expires', String(expiresAt), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}
