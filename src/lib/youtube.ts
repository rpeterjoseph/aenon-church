const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const REVALIDATE_SECONDS = 3600;

export interface LatestVideo {
  videoId: string;
  title: string;
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

// Fetches the most recent upload from the Aenon Church YouTube channel
// (youtube.com/aenonchurch) for the Latest Sermon embed. Requires
// YOUTUBE_API_KEY to be set; returns null (caller falls back to the
// manual video ID in src/lib/config.ts) if the key is missing or any
// call fails, so a quota error or API outage never breaks the page.
export async function getLatestSermonVideo(): Promise<LatestVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const channelId = await resolveChannelId(apiKey);
    if (!channelId) return null;

    // A channel's "uploads" playlist ID is its channel ID with the UC
    // prefix replaced by UU — avoids a second API call just to look it up.
    const uploadsPlaylistId = `UU${channelId.slice(2)}`;

    const res = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?part=snippet&maxResults=1&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const item = data?.items?.[0];
    const videoId = item?.snippet?.resourceId?.videoId;
    if (!videoId) return null;

    return { videoId, title: item?.snippet?.title ?? 'Latest Sermon' };
  } catch {
    return null;
  }
}
