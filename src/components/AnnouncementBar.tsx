'use client';

import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';

export default function AnnouncementBar({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-9 sm:h-10 flex items-center justify-center gap-3">
        <Link
          href="/events"
          className="flex-1 flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs font-medium tracking-wide hover:opacity-90 transition-opacity truncate"
        >
          <span className="truncate">
            <span className="font-semibold">Grace Festivals</span> &mdash; You are invited. Click here for more.
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
        </Link>
        <button
          onClick={onDismiss}
          aria-label="Dismiss announcement"
          className="shrink-0 p-1 -mr-1 rounded-full hover:bg-white/15 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
