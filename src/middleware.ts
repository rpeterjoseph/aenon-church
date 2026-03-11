import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAINTENANCE_ENABLED =
  process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
const COOKIE_NAME = 'aenon-maintenance-bypass';

const EXCLUDED_PATHS = [
  '/maintenance',
  '/api/maintenance-bypass',
  '/_next',
  '/fonts',
  '/images',
  '/logo.png',
  '/logo.avif',
  '/favicon.png',
  '/icon.png',
  '/apple-icon.png',
];

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_ENABLED) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow excluded paths through (maintenance page, assets, bypass API)
  const isExcluded = EXCLUDED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );
  if (isExcluded) {
    return NextResponse.next();
  }

  // Check for bypass cookie
  const bypassCookie = request.cookies.get(COOKIE_NAME);
  if (bypassCookie?.value === 'active') {
    return NextResponse.next();
  }

  // Show maintenance page at whatever URL was visited (no redirect)
  const maintenanceUrl = new URL('/maintenance', request.url);
  return NextResponse.rewrite(maintenanceUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
