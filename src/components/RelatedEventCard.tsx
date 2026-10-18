'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface RelatedEventCardProps {
  href: string;
  eyebrow: string;
  title: string;
  meta: string;
  variant: 'orange' | 'blue';
}

export default function RelatedEventCard({ href, eyebrow, title, meta, variant }: RelatedEventCardProps) {
  const isBlue = variant === 'blue';

  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-all duration-300 ${
        isBlue
          ? 'bg-gradient-to-br from-navy-950 via-blue-900 to-blue-400 noise-bg'
          : 'bg-white border border-silver-200 hover:border-orange-300 hover:shadow-lg'
      }`}
    >
      <div
        className={`absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 ${
          isBlue ? 'bg-white/10' : 'bg-orange-500/5'
        }`}
      />

      <div className="relative z-10">
        <span
          className={`inline-block px-3 py-1 text-[10px] font-medium rounded-full uppercase tracking-wider mb-4 ${
            isBlue ? 'bg-white/15 text-sky-200 backdrop-blur-sm' : 'bg-orange-500/10 text-orange-600'
          }`}
        >
          {eyebrow}
        </span>
        <h3 className={`font-bold text-xl sm:text-2xl leading-snug mb-2 ${isBlue ? 'text-white' : 'text-navy-900'}`}>
          {title}
        </h3>
        <div className={`flex items-center gap-2 text-sm ${isBlue ? 'text-white/70' : 'text-silver-400'}`}>
          <Calendar className={`w-4 h-4 ${isBlue ? '' : 'text-orange-500'}`} />
          {meta}
        </div>
      </div>

      <div
        className={`relative z-10 shrink-0 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider ${
          isBlue ? 'text-white' : 'text-orange-600'
        }`}
      >
        Learn More
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
