import Image from 'next/image';
import { Play } from 'lucide-react';
import type { SermonSummary } from '@/lib/youtube';

export default function SermonGrid({ sermons }: { sermons: SermonSummary[] }) {
  return (
    <div className="flex flex-wrap gap-6">
      {sermons.map((sermon) => (
        <a
          key={sermon.videoId}
          href={`https://youtu.be/${sermon.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-[300px] sm:w-[360px]"
        >
          <div className="relative aspect-video rounded-lg overflow-hidden bg-navy-950 shadow-md transition-all duration-300 origin-center group-hover:scale-105 group-hover:shadow-2xl">
            <Image
              src={`https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`}
              alt={sermon.title}
              fill
              sizes="(min-width: 640px) 360px, 300px"
              className="object-cover"
            />

            {/* Scrim + play icon + title/metadata, all hidden until hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-5 h-5 text-navy-950 ml-0.5" fill="currentColor" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-xl font-bold text-white leading-snug line-clamp-2">
                  {sermon.title}
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  {sermon.dateLabel} &middot; Ps. William Cary
                </p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
