import { Play } from 'lucide-react';
import { LATEST_SERMON_VIDEO_ID, LATEST_SERMON_PLAYLIST_ID } from '@/lib/config';
import { getLatestSermonVideo } from '@/lib/youtube';

export default async function LatestSermonEmbed({ className = '' }: { className?: string }) {
  const latest = await getLatestSermonVideo();
  const videoId = latest?.videoId || LATEST_SERMON_VIDEO_ID;

  if (!videoId) {
    return (
      <div className={`youtube-container shadow-2xl bg-navy-950 flex items-center justify-center ${className}`}>
        <a
          href="https://www.youtube.com/aenonchurch"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-accent-500 flex items-center justify-center">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>
          <span className="text-sm font-medium">Watch on YouTube</span>
        </a>
      </div>
    );
  }

  const title = latest ? `${latest.title} | Aenon Church` : 'Latest Sermon - Aenon Church';

  // Only the manual fallback video has a configured playlist to attach;
  // a live-fetched video is already confirmed as the latest upload.
  const src =
    !latest && LATEST_SERMON_PLAYLIST_ID
      ? `https://www.youtube.com/embed/${videoId}?list=${LATEST_SERMON_PLAYLIST_ID}`
      : `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={`youtube-container shadow-2xl ${className}`}>
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
