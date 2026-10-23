// Shared server-side guards for the Contact, Volunteer, and Prayer Request
// API routes. Client-side `maxLength` on the <input>/<textarea> is cosmetic
// only — anyone can POST directly to these routes, so the caps that matter
// are enforced here.

export const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 200,
  phone: 30,
  topic: 50,
  message: 5000,
} as const;

// Generous enough for the largest legitimate submission (a long prayer
// request or volunteer note) while rejecting a deliberately oversized
// payload before it's even parsed as JSON.
export const MAX_BODY_BYTES = 20_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function isRequestBodyTooLarge(request: Request): boolean {
  const contentLength = request.headers.get('content-length');
  if (!contentLength) return false;
  const bytes = Number(contentLength);
  return Number.isFinite(bytes) && bytes > MAX_BODY_BYTES;
}
