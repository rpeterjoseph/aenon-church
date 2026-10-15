'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export default function YouTubeFacade({
  videoId,
  title,
  playlistId,
  className = '',
}: {
  videoId: string;
  title: string;
  playlistId?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );

  if (playing) {
    const src = playlistId
      ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}&autoplay=1`
      : `https://www.youtube.com/embed/${videoId}?autoplay=1`;

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

  return (
    <div className={`youtube-container shadow-2xl bg-black ${className}`}>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="absolute inset-0 w-full h-full group"
        aria-label={`Play: ${title}`}
      >
        <Image
          src={thumbnailSrc}
          alt={title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain"
          // maxresdefault.jpg doesn't exist for every video; fall back to
          // hqdefault.jpg (always available) rather than show a broken image.
          onError={() => setThumbnailSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)}
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </div>
        </div>
      </button>
    </div>
  );
}
