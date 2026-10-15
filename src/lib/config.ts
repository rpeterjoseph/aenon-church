// Fallback YouTube video ID for the latest sermon embed (the part after "v="
// in the video's URL), used only if YOUTUBE_API_KEY isn't set or the
// YouTube Data API call in src/lib/youtube.ts fails. When the key is
// configured, the embed auto-updates from the latest upload on
// youtube.com/aenonchurch instead, and this value is never shown.
export const LATEST_SERMON_VIDEO_ID = 'FdqPgFumh-Y';

// Optional: the sermon series playlist the video above belongs to (the part
// after "list=" in the URL). Leave blank to embed just the single video.
export const LATEST_SERMON_PLAYLIST_ID = '';
