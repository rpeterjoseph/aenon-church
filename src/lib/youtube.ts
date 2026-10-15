const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const REVALIDATE_SECONDS = 3600;

// How many of the most recent uploads to scan for qualifying sermons.
// The uploads playlist mixes Shorts, livestreams, and clips in with real
// sermons, so both the single "latest" lookup and the carousel need a
// decent buffer to find enough that qualify. 50 is the API's max per call,
// and costs the same 1 quota unit as asking for fewer.
const CANDIDATE_COUNT = 50;

// Full sermons run well over this; filtering by it excludes Shorts and
// shorter clips/announcements mixed into the uploads playlist.
const SERMON_MIN_SECONDS = 50 * 60;

const RECENT_SERMONS_COUNT = 12;

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

interface VideoMeta {
  durationSeconds: number;
  isLiveStream: boolean;
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

// Over 50 minutes and not a livestream (live, upcoming, or an archived
// past broadcast — the API marks all three with a liveStreamingDetails
// block that a plain upload never has).
function qualifiesAsSermon(meta: VideoMeta | undefined): boolean {
  return !!meta && meta.durationSeconds > SERMON_MIN_SECONDS && !meta.isLiveStream;
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

async function fetchVideoMeta(videoIds: string[], apiKey: string): Promise<Map<string, VideoMeta>> {
  const res = await fetch(
    `${YOUTUBE_API_BASE}/videos?part=contentDetails,liveStreamingDetails&id=${videoIds.join(',')}&key=${apiKey}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!res.ok) return new Map();

  const data = await res.json();
  const items: unknown[] = data?.items ?? [];

  return new Map(
    items.map((item) => {
      const typed = item as {
        id: string;
        contentDetails?: { duration?: string };
        liveStreamingDetails?: unknown;
      };
      return [
        typed.id,
        {
          durationSeconds: parseISO8601DurationSeconds(typed.contentDetails?.duration ?? 'PT0S'),
          isLiveStream: typed.liveStreamingDetails !== undefined,
        },
      ];
    })
  );
}

// Fetches the most recent qualifying sermon from the Aenon Church YouTube
// channel (youtube.com/aenonchurch) for the Latest Sermon embed. Requires
// YOUTUBE_API_KEY to be set; returns null (caller falls back to the
// manual video ID in src/lib/config.ts) if the key is missing, nothing
// qualifies, or any call fails, so a quota error or API outage never
// breaks the page.
export async function getLatestSermonVideo(): Promise<LatestVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey);
    if (!uploadsPlaylistId) return null;

    const candidates = await fetchRecentUploads(uploadsPlaylistId, apiKey, CANDIDATE_COUNT);
    if (candidates.length === 0) return null;

    const meta = await fetchVideoMeta(
      candidates.map((c) => c.videoId),
      apiKey
    );

    const latestSermon = candidates.find((c) => qualifiesAsSermon(meta.get(c.videoId)));
    if (!latestSermon) return null;

    return { videoId: latestSermon.videoId, title: latestSermon.title };
  } catch {
    return null;
  }
}

// Fetches the 10 most recent qualifying sermons (over 50 minutes, not a
// livestream — so Shorts, clips, announcements, and streamed services are
// all excluded) for the Recent Sermons carousel. Requires YOUTUBE_API_KEY;
// returns null (caller falls back to its own hardcoded list) if the key is
// missing, nothing qualifies, or any call fails.
export async function getRecentSermons(): Promise<SermonSummary[] | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey);
    if (!uploadsPlaylistId) return null;

    const candidates = await fetchRecentUploads(uploadsPlaylistId, apiKey, CANDIDATE_COUNT);
    if (candidates.length === 0) return null;

    const meta = await fetchVideoMeta(
      candidates.map((c) => c.videoId),
      apiKey
    );

    const sermons = candidates
      .filter((c) => qualifiesAsSermon(meta.get(c.videoId)))
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
