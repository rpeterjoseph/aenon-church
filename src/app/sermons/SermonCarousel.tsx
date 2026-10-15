'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { SermonSummary } from '@/lib/youtube';

const CARD_GAP_PX = 24;

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
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1"
      >
        {sermons.map((sermon) => (
          <a
            key={sermon.videoId}
            data-card
            href={`https://youtu.be/${sermon.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-[240px] sm:w-[280px] snap-start"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-950 shadow-sm group-hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.04] group-hover:-translate-y-1">
              <Image
                src={`https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`}
                alt={sermon.title}
                fill
                sizes="(min-width: 640px) 280px, 240px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                </div>
              </div>
            </div>
            <p className="text-xs text-silver-400 mt-4 mb-1">{sermon.dateLabel}</p>
            <h3 className="text-base font-bold text-navy-900 group-hover:text-navy-600 transition-colors line-clamp-2">
              {sermon.title}
            </h3>
            <p className="text-sm text-silver-400">Ps. William Cary</p>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCards(-1)}
        aria-label="Scroll to previous sermons"
        className="hidden md:flex absolute left-0 top-[35%] -translate-y-1/2 -translate-x-5 w-11 h-11 rounded-full bg-white shadow-xl border border-silver-200 items-center justify-center text-navy-900 opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-silver-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCards(1)}
        aria-label="Scroll to next sermons"
        className="hidden md:flex absolute right-0 top-[35%] -translate-y-1/2 translate-x-5 w-11 h-11 rounded-full bg-white shadow-xl border border-silver-200 items-center justify-center text-navy-900 opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-silver-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
