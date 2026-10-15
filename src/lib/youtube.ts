const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const REVALIDATE_SECONDS = 3600;

// How many of the most recent uploads to check when looking for a single
// non-Short (the uploads playlist mixes Shorts and full videos, so the
// single newest upload is often a Short rather than a sermon).
const LATEST_CANDIDATE_COUNT = 10;

// How many of the most recent uploads to check when building the recent
// sermons carousel. 50 is the API's max per call.
const RECENT_CANDIDATE_COUNT = 50;

// YouTube Shorts are capped at 3 minutes; there's no explicit "is this a
// Short" field in the API, so duration is the reliable way to tell them
// apart from a full-length sermon.
const SHORT_MAX_SECONDS = 180;

// Full sermons run well over this; filtering by it also excludes any
// shorter clips/announcements mixed into the uploads playlist.
const SERMON_MIN_SECONDS = 50 * 60;

const RECENT_SERMONS_COUNT = 10;

const dateLabelFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export interface LatestVideo {
  videoId: string;
  title: string;
}

export interface SermonSummary {
  videoId: string;
  title: string;
  dateLabel: string;
}

interface UploadCandidate {
  videoId: string;
  title: string;
  publishedAt: string;
}

function parseISO8601DurationSeconds(duration: string): number {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(duration);
  if (!match) return 0;
  const [, hours, minutes, seconds] = match;
  return (
    parseInt(hours ?? '0', 10) * 3600 +
    parseInt(minutes ?? '0', 10) * 60 +
    parseInt(seconds ?? '0', 10)
  );
}

async function resolveChannelId(apiKey: string): Promise<string | null> {
  const directId = process.env.YOUTUBE_CHANNEL_ID;
  if (directId) return directId;

  const handle = (process.env.YOUTUBE_CHANNEL_HANDLE || 'aenonchurch').replace(/^@/, '');
  const res = await fetch(
    `${YOUTUBE_API_BASE}/channels?part=id&forHandle=@${handle}&key=${apiKey}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!res.ok) return null;

  const data = await res.json();
  return data?.items?.[0]?.id ?? null;
}

async function getUploadsPlaylistId(apiKey: string): Promise<string | null> {
  const channelId = await resolveChannelId(apiKey);
  if (!channelId) return null;

  // A channel's "uploads" playlist ID is its channel ID with the UC prefix
  // replaced by UU — avoids a second API call just to look it up.
  return `UU${channelId.slice(2)}`;
}

async function fetchRecentUploads(
  uploadsPlaylistId: string,
  apiKey: string,
  maxResults: number
): Promise<UploadCandidate[]> {
  const res = await fetch(
    `${YOUTUBE_API_BASE}/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!res.ok) return [];

  const data = await res.json();
  const items: unknown[] = data?.items ?? [];

  return items
    .map((item) => {
      const snippet = (
        item as {
          snippet?: { resourceId?: { videoId?: string }; title?: string; publishedAt?: string };
        }
      ).snippet;
      return {
        videoId: snippet?.resourceId?.videoId ?? '',
        title: snippet?.title ?? 'Sermon',
        publishedAt: snippet?.publishedAt ?? '',
      };
    })
    .filter((candidate): candidate is UploadCandidate => candidate.videoId !== '');
}

async function fetchDurationsSeconds(videoIds: string[], apiKey: string): Promise<Map<string, number>> {
  const res = await fetch(
    `${YOUTUBE_API_BASE}/videos?part=contentDetails&id=${videoIds.join(',')}&key=${apiKey}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!res.ok) return new Map();

  const data = await res.json();
  const items: unknown[] = data?.items ?? [];

  return new Map(
    items.map((item) => {
      const typed = item as { id: string; contentDetails?: { duration?: string } };
      return [typed.id, parseISO8601DurationSeconds(typed.contentDetails?.duration ?? 'PT0S')];
    })
  );
}

// Fetches the most recent non-Short upload from the Aenon Church YouTube
// channel (youtube.com/aenonchurch) for the Latest Sermon embed. Requires
// YOUTUBE_API_KEY to be set; returns null (caller falls back to the
// manual video ID in src/lib/config.ts) if the key is missing, no call
// qualifies, or any call fails, so a quota error or API outage never
// breaks the page.
export async function getLatestSermonVideo(): Promise<LatestVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey);
    if (!uploadsPlaylistId) return null;

    const candidates = await fetchRecentUploads(uploadsPlaylistId, apiKey, LATEST_CANDIDATE_COUNT);
    if (candidates.length === 0) return null;

    const durations = await fetchDurationsSeconds(
      candidates.map((c) => c.videoId),
      apiKey
    );

    const latestFullLength = candidates.find(
      (c) => (durations.get(c.videoId) ?? 0) > SHORT_MAX_SECONDS
    );
    if (!latestFullLength) return null;

    return { videoId: latestFullLength.videoId, title: latestFullLength.title };
  } catch {
    return null;
  }
}

// Fetches the 10 most recent full-length sermons (over 50 minutes, so
// Shorts and shorter clips/announcements are excluded) for the Recent
// Sermons carousel. Requires YOUTUBE_API_KEY; returns null (caller falls
// back to its own hardcoded list) if the key is missing, nothing
// qualifies, or any call fails.
export async function getRecentSermons(): Promise<SermonSummary[] | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey);
    if (!uploadsPlaylistId) return null;

    const candidates = await fetchRecentUploads(uploadsPlaylistId, apiKey, RECENT_CANDIDATE_COUNT);
    if (candidates.length === 0) return null;

    const durations = await fetchDurationsSeconds(
      candidates.map((c) => c.videoId),
      apiKey
    );

    const sermons = candidates
      .filter((c) => (durations.get(c.videoId) ?? 0) > SERMON_MIN_SECONDS)
      .slice(0, RECENT_SERMONS_COUNT)
      .map((c) => ({
        videoId: c.videoId,
        title: c.title,
        dateLabel: c.publishedAt ? dateLabelFmt.format(new Date(c.publishedAt)) : '',
      }));

    return sermons.length > 0 ? sermons : null;
  } catch {
    return null;
  }
}
