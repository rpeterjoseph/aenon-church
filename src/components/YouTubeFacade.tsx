'use client';

import { useState } from 'react';
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
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl bg-black ${className}`}>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="relative block w-full group"
        aria-label={`Play: ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- sized by its
            own natural dimensions so the box always matches the real
            thumbnail with no letterboxing or cropping */}
        <img
          src={thumbnailSrc}
          alt={title}
          className="w-full h-auto block"
          loading="lazy"
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
