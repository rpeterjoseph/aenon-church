import { Play } from 'lucide-react';
import { LATEST_SERMON_VIDEO_ID } from '@/lib/config';

export default function LatestSermonEmbed({ className = '' }: { className?: string }) {
  if (!LATEST_SERMON_VIDEO_ID) {
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

  return (
    <div className={`youtube-container shadow-2xl ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${LATEST_SERMON_VIDEO_ID}`}
        title="Latest Sermon - Aenon Church"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
