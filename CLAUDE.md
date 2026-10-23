# Aenon Church website

Next.js 14 (App Router) marketing/ministry site for Aenon Church, Tarnaka,
Hyderabad. No database or backend — content is static JSX plus one external
data source (YouTube). Hosted on Vercel, connected to this GitHub repo;
pushing/merging to `main` triggers a production deploy automatically.

## Conventions established in this codebase

- **Styling**: Tailwind, with custom utility classes in `src/app/globals.css`
  (`section-padding`, `section-gap`, `heading-xl/lg/md/sm`, `label-text`,
  `body-lg/md`, `btn-primary/outline/white`, `card-light/dark`). Reuse these
  instead of ad hoc spacing/typography.
- **Scroll-reveal animation**: nearly every page has a `useEffect` that wires
  an `IntersectionObserver` to add a `.visible` class to any `.reveal`
  element when it scrolls into view (see `globals.css` for the CSS). This
  means content wrapped in `.reveal` is invisible until actually scrolled
  past — expected behavior, not a bug, and it also means a single
  `fullPage` screenshot taken without scrolling will show blank sections.
- **Server/Client split for pages needing both metadata and hooks**: Next.js
  App Router won't let a `'use client'` file export `metadata`. Pages that
  need a real per-page `<title>` *and* the scroll-reveal hook (or other
  client-only behavior) are split into a server `page.tsx` (exports
  `metadata`, renders the client component) plus a client
  `XxxContent.tsx` (`'use client'`, holds the actual hooks/markup). See
  `src/app/terms/`, `src/app/sermons/`, `src/app/conference2026/` for the
  pattern.
- **MaintenanceGate** (`src/components/MaintenanceGate.tsx`): a site-wide
  gate controlled by the `MAINTENANCE_ENABLED` constant at the top of the
  file (currently `false`, i.e. the live site is up). When `true`, it blocks
  all page content — including in SSR output — until a visitor enters the
  admin bypass code (now checked server-side via
  `src/app/api/maintenance-bypass/route.ts`, not in client code).
- **External data (YouTube)**: `src/lib/youtube.ts` fetches from
  youtube.com/aenonchurch via the YouTube Data API v3. Every function in
  that file **must** degrade gracefully (return `null` on any failure —
  missing key, bad key, quota, network) because callers fall back to a
  static default (`LATEST_SERMON_VIDEO_ID` in `src/lib/config.ts`, or a
  hardcoded `FALLBACK_SERMONS` array). Never let a YouTube API failure
  break a page. "Qualifying sermon" = duration > 50 minutes AND not a
  livestream (checked via the `liveStreamingDetails` field, which is
  present even on an archived/VOD past broadcast, not just a live one).
- **Secrets**: never commit a real secret or paste one into chat. Real
  values go in the hosting provider's (Vercel) environment variables
  dashboard for production, or this session's own "Network secrets" /
  environment settings (cloud environment menu → Edit) if a session needs
  one to test against the real API. `.env.example` documents variable
  names only, with empty values.
- **Workflow**: feature branch → push → open a PR → merge via PR (not a
  direct push to `main`), unless explicitly told otherwise. `main` is what
  Vercel deploys to production from.
- **Form submissions (Resend)**: the Contact, Volunteer, and Prayer Request
  forms (`src/app/contact`, `src/app/volunteer`, `src/app/prayer-request`)
  each POST JSON to their own route handler
  (`src/app/api/{contact,volunteer,prayer-request}/route.ts`), which
  validates required fields server-side and calls `sendFormEmail()` in
  `src/lib/email.ts` (a thin wrapper around the `resend` SDK). Unlike
  `youtube.ts`, this **must not** fail silently — a send failure throws and
  the route returns a non-2xx status so the page can show the visitor an
  error instead of a false "Message Sent!". Requires `RESEND_API_KEY`,
  `CONTACT_EMAIL_TO` (staff inbox), and `CONTACT_EMAIL_FROM` (an address on
  a domain verified in the Resend dashboard) — see `.env.example`. All
  three set/verified in Vercel and Resend as of 2026-10-23, but an actual
  end-to-end send (submit on the live site → email arrives) hasn't been
  confirmed back in conversation yet.
- **Honeypot spam protection**: each of the three forms above has a hidden
  `name="website"` input (`sr-only`, `tabIndex={-1}`, `aria-hidden`) that
  real visitors never see or fill. Each route handler checks it *before*
  calling Resend — if filled, it returns a fake `{ ok: true }` without
  sending, so bots don't learn to adapt. This is bot-pattern detection
  only, not rate limiting — there's no per-IP throttling (see open items).
- **`.reveal` gotcha**: the scroll-reveal `useEffect` queries
  `document.querySelectorAll('.reveal')` once, on mount, and observes only
  those elements. Anything that mounts later — a conditionally-rendered
  success/error state after a form submit, for example — will never be
  observed, so if it carries the `.reveal` class it stays at
  `opacity: 0` forever (looks like blank space, not an error). Don't put
  `.reveal` on content that only appears after user interaction; reserve
  it for content present at initial render. Separately, `.reveal` also
  carries `contain: paint` — needed because its CSS `transform` triggers a
  Chromium/WebKit bug where text-selection highlights bleed past the
  element into following content; don't remove it.
- **Homepage promo system**: `SiteChrome` (wraps all pages, in
  `src/app/layout.tsx`) renders `AnnouncementBar` only on `/`, dismissible
  via a `localStorage` flag. `PromoModal` (rendered from `HomeContent.tsx`,
  homepage only) is the "You're Invited" lightbox cross-promoting
  `/conference2026` and `/gracefestivals2026`. This is currently the only
  way `/conference2026` is reachable from the homepage — it's still not in
  the primary nav or footer.

## Known open items (as of 2026-10-23)

- **No per-IP rate limiting on the form API routes.** The honeypot (see
  above) stops basic bots but not someone deliberately hammering
  `/api/{contact,volunteer,prayer-request}` by hand — nothing currently
  caps volume per visitor. Serverless functions here are stateless between
  invocations, so real rate limiting needs either Vercel's own Firewall
  rate-limit rules (dashboard config, no code/new dependency — the better
  fit for this "no backend" site) or an external store like Upstash Redis
  (adds a dependency). Nobody's set up the Firewall rules yet.
- **`npm audit` reports 14 vulnerabilities (2 moderate, 11 high, 1
  critical)** as of this date, including high-severity CVEs in `sharp`
  (image optimization) and `source-map-js`. `npm audit fix` resolves some;
  check whether the rest need `--force` (review for breaking changes
  first) before using it.
- **No security headers configured** — `next.config.js` has no `headers()`
  block at all: no CSP, `X-Frame-Options`, `Referrer-Policy`,
  `X-Content-Type-Options`, `Strict-Transport-Security`, etc.
- **No ESLint config exists** — `npm run lint` / `next lint` hits an
  interactive "how would you like to configure ESLint?" prompt instead of
  running, so lint has not actually been run as part of any change in this
  codebase's history. Worth setting up non-interactively (`next lint` with
  a committed config, or migrate to ESLint 9 flat config) — would also
  help surface unused imports/vars automatically.
- **Verify in production** (not yet confirmed there, only on Vercel
  previews, since this sandbox can't reach youtube.com/img.youtube.com/
  google.com/maps to test directly): the Latest Sermon embed shows a real
  video, the Recent Sermons 3×3 grid shows real non-Short/non-livestream
  sermons, and the conference page's Google Maps embed actually renders.
- **Confirm `YOUTUBE_API_KEY` is scoped to Production in Vercel**, not just
  Preview — this was fixed for Preview but Production scope was never
  explicitly confirmed in conversation.
