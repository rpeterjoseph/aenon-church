const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const REVALIDATE_SECONDS = 3600;

export interface LatestVideo {
  videoId: string;
  title: string;
}

async function resolveChannelId(apiKey: string): Promise<string | null> {
  const directId = process.env.YOUTUBE_CHANNEL_ID;
  if (directId) {
    console.log('[youtube] using YOUTUBE_CHANNEL_ID directly:', directId);
    return directId;
  }

  const handle = (process.env.YOUTUBE_CHANNEL_HANDLE || 'aenonchurch').replace(/^@/, '');
  const res = await fetch(
    `${YOUTUBE_API_BASE}/channels?part=id&forHandle=@${handle}&key=${apiKey}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => '<unreadable>');
    console.error(`[youtube] channels.list forHandle=@${handle} failed: ${res.status} ${body.slice(0, 500)}`);
    return null;
  }

  const data = await res.json();
  const id = data?.items?.[0]?.id ?? null;
  console.log(`[youtube] resolved @${handle} -> channelId:`, id, '| raw items:', JSON.stringify(data?.items));
  return id;
}

// Fetches the most recent upload from the Aenon Church YouTube channel
// (youtube.com/aenonchurch) for the Latest Sermon embed. Requires
// YOUTUBE_API_KEY to be set; returns null (caller falls back to the
// manual video ID in src/lib/config.ts) if the key is missing or any
// call fails, so a quota error or API outage never breaks the page.
export async function getLatestSermonVideo(): Promise<LatestVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.log('[youtube] YOUTUBE_API_KEY not set, using fallback video');
    return null;
  }

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
    if (!res.ok) {
      const body = await res.text().catch(() => '<unreadable>');
      console.error(`[youtube] playlistItems.list playlistId=${uploadsPlaylistId} failed: ${res.status} ${body.slice(0, 500)}`);
      return null;
    }

    const data = await res.json();
    const item = data?.items?.[0];
    const videoId = item?.snippet?.resourceId?.videoId;
    if (!videoId) {
      console.error('[youtube] playlistItems.list returned no items:', JSON.stringify(data));
      return null;
    }

    console.log('[youtube] resolved latest video:', videoId, item?.snippet?.title);
    return { videoId, title: item?.snippet?.title ?? 'Latest Sermon' };
  } catch (err) {
    console.error('[youtube] unexpected error:', err);
    return null;
  }
}
