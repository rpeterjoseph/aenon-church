import { resolveMx, resolve } from 'dns/promises';

const EMAIL_FORMAT_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOOKUP_TIMEOUT_MS = 3000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('DNS lookup timed out')), ms)),
  ]);
}

async function domainAcceptsMail(domain: string): Promise<boolean> {
  try {
    const records = await withTimeout(resolveMx(domain), LOOKUP_TIMEOUT_MS);
    if (records.length > 0) return true;
  } catch {
    // No MX records — some domains still accept mail via their A record.
  }
  try {
    await withTimeout(resolve(domain), LOOKUP_TIMEOUT_MS);
    return true;
  } catch {
    return false;
  }
}

export async function validateEmail(
  email: string
): Promise<{ valid: true } | { valid: false; reason: string }> {
  if (!EMAIL_FORMAT_RE.test(email)) {
    return { valid: false, reason: "That doesn't look like a valid email address." };
  }

  const domain = email.split('@')[1];
  const hasMailServer = await domainAcceptsMail(domain);
  if (!hasMailServer) {
    return { valid: false, reason: "We couldn't verify that email's domain — please double-check it." };
  }

  return { valid: true };
}
