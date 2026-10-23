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
  Each route also rejects an oversized request body up front and caps
  individual field lengths (`src/lib/formValidation.ts`,
  `MAX_FIELD_LENGTHS`/`isRequestBodyTooLarge`/`isValidEmail`) — client-side
  `maxLength` is cosmetic only, so these are the limits that actually hold
  against a direct POST to the API route.
- **Security headers**: `next.config.js`'s `headers()` sets a
  Content-Security-Policy plus `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Strict-Transport-Security`, and `Permissions-Policy`
  on every route. The CSP's `script-src`/`style-src` include
  `'unsafe-inline'` deliberately: almost every page here is statically
  prerendered at build time, so a per-request nonce (the usual way to drop
  `'unsafe-inline'`) can never match what's baked into that static HTML —
  nonce-based CSP needs dynamic rendering, which this site doesn't use.
  Verified with a real headless-browser run (no CSP console violations,
  mobile menu + YouTube facade still interactive) before this was committed.
- **ESLint**: `eslint.config.mjs` (flat config) imports
  `eslint-config-next/core-web-vitals` and is pinned to `eslint@^9` +
  `eslint-config-next@16.4.x` (matching the installed `next` version
  exactly — `eslint-config-next` is tightly coupled to the `next` version
  it ships alongside, and `eslint-config-next@16.x` requires ESLint 9's
  flat config format; it will not load under `.eslintrc.json`/ESLint 8).
  `@typescript-eslint/no-unused-vars` is explicitly enabled (off by default
  in `core-web-vitals`) since catching dead imports/vars was the main point
  of setting this up — note the plugin has to be re-declared in that same
  config object (`plugins: { '@typescript-eslint': tseslint.plugin }`) since
  flat config scopes plugins per config object, unlike `.eslintrc`'s global
  plugin list. **`next lint` was removed in Next.js 16** — the `lint` script
  is `eslint .` directly now. `npm run lint` runs non-interactively and
  exits 0.
  - `react-hooks/set-state-in-effect` (new default-error rule in the v7
    `eslint-plugin-react-hooks` that ships with `eslint-config-next@16`, part
    of React Compiler readiness) is downgraded to `warn` in
    `eslint.config.mjs`. It flags `MaintenanceGate.tsx` and `SiteChrome.tsx`,
    which both deliberately read a browser-only API (a cookie /
    `localStorage`) in an effect and `setState` from it — the standard
    SSR-hydration pattern, not something computable during render. Don't
    "fix" these by restructuring them to satisfy the rule; the pattern is
    intentional and SSR-behavior-sensitive (see the MaintenanceGate bullet
    above).
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
  (adds a dependency). Nobody's set up the Firewall rules yet — this is
  dashboard configuration in Vercel's project settings, not something a
  session working in this repo checkout can do. Steps: Vercel dashboard →
  project → Firewall tab → add a rate-limit rule scoped to
  `/api/contact`, `/api/volunteer`, `/api/prayer-request` (e.g. a handful
  of requests per IP per minute) → Save, then confirm it's enabled for
  Production (not just Preview).
- **`npm audit`: 0 vulnerabilities** (confirmed 2026-10-23) via `next` 14→16
  and `tailwindcss` 3→4 (see the Next.js 16 / Tailwind 4 bullet below) plus
  the earlier non-breaking `npm audit fix`. A `braces` ReDoS finding briefly
  showed up via `eslint-config-next`'s own dependency chain
  (`@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`) right
  after that upgrade, but it cleared on its own on a later `npm audit` run
  with the exact same lockfile — an npm/GitHub Advisory Database correction
  upstream, not a change on our end. If `npm audit` ever shows it again,
  check the exact resolved version against the registry's advisory bulk
  endpoint before assuming it's real (it wasn't, last time).
- **Next.js 14→16 and Tailwind 3→4**: code-complete on PR #28
  (`chore/upgrade-next16-tailwind4`), not yet merged to `main`. `next` is
  16.4.x, `tailwindcss` is 4.3.x. `postcss.config.js` uses
  `@tailwindcss/postcss`; `globals.css` uses `@import 'tailwindcss'` plus
  `@config '../../tailwind.config.js'` to keep the existing JS theme config
  (custom `navy`/`accent`/`silver` colors, fonts, keyframes) working as-is
  rather than rewriting into v4's CSS-first `@theme` syntax. `autoprefixer`
  was removed (Tailwind v4 handles vendor prefixing internally). React
  stays on 18.x (still a supported peer of Next 16). Verified: clean build,
  `tsc --noEmit` clean, a real headless-browser pass across every route
  (zero console errors, zero CSP violations), a mobile-menu screenshot
  confirming fonts/colors/layout/interactivity, and — manually confirmed on
  the PR's Vercel preview, 2026-10-23, since this sandbox can't reach
  `youtube.com`/`google.com` to test those itself — the YouTube embed,
  Google Maps iframe, and form submissions all work.
- **Security headers and ESLint are now set up** — see the two new bullets
  above in "Conventions established in this codebase". Still open: the
  `<img>` → `next/image` warnings `next lint` surfaces in `about/page.tsx`
  and the four `ministries/*/page.tsx` pages (performance only, not a
  correctness/dead-code issue — left alone since switching to `next/image`
  needs explicit width/height and wasn't asked for here).
- **Verify in production** (not yet confirmed there, only on Vercel
  previews, since this sandbox can't reach youtube.com/img.youtube.com/
  google.com/maps to test directly): the Latest Sermon embed shows a real
  video, the Recent Sermons 3×3 grid shows real non-Short/non-livestream
  sermons, and the conference page's Google Maps embed actually renders.
- **Confirm `YOUTUBE_API_KEY` is scoped to Production in Vercel**, not just
  Preview — this was fixed for Preview but Production scope was never
  explicitly confirmed in conversation.
