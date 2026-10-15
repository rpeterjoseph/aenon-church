'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { SermonSummary } from '@/lib/youtube';

const CARD_GAP_PX = 20;

export default function SermonCarousel({ sermons }: { sermons: SermonSummary[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (direction: 1 | -1) => {
    const el = scrollRef.current;
    const card = el?.querySelector<HTMLElement>('[data-card]');
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.offsetWidth + CARD_GAP_PX) * 2, behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide py-3 -mx-1 px-1"
      >
        {sermons.map((sermon) => (
          <a
            key={sermon.videoId}
            data-card
            href={`https://youtu.be/${sermon.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 w-[200px] sm:w-[240px] snap-start z-0 hover:z-10"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-navy-950 shadow-md transition-all duration-300 origin-center group-hover:scale-105 group-hover:shadow-2xl">
              <Image
                src={`https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`}
                alt={sermon.title}
                fill
                sizes="(min-width: 640px) 240px, 200px"
                className="object-cover"
              />

              {/* Bottom scrim so the overlaid title/metadata stay legible
                  over any thumbnail */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              {/* Play icon, revealed on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-4 h-4 text-navy-950 ml-0.5" fill="currentColor" />
                </div>
              </div>

              {/* Title + metadata overlaid on the poster, OTT-style */}
              <div className="absolute inset-x-0 bottom-0 p-3">
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {sermon.title}
                </h3>
                <p className="text-[11px] text-white/60 mt-1">
                  {sermon.dateLabel} &middot; Ps. William Cary
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCards(-1)}
        aria-label="Scroll to previous sermons"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-11 h-11 rounded-full bg-white shadow-xl border border-silver-200 items-center justify-center text-navy-900 opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-silver-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCards(1)}
        aria-label="Scroll to next sermons"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-11 h-11 rounded-full bg-white shadow-xl border border-silver-200 items-center justify-center text-navy-900 opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-silver-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
