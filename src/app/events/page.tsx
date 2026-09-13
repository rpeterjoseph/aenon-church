'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { generateRecurringEvents, MAPS_URL } from '@/lib/events';

const PAGE_SIZE = 8;

export default function EventsPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const events = useMemo(() => generateRecurringEvents(), []);
  const visible = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-navy-950 noise-bg">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="label-text text-white/40 mb-6">Events & Announcements</p>
          <h1 className="heading-xl text-white max-w-3xl">
            What&apos;s
            <br />
            happening.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Stay up to date with everything going on at Aenon Church.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="section-gap bg-white">
        <div className="max-w-4xl mx-auto section-padding">
          <div className="space-y-0">
            {visible.map((event, i) => (
              <div
                key={event.id}
                className="py-10 border-b border-silver-200 last:border-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  {i === 0 && (
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 text-[10px] font-semibold uppercase tracking-wider rounded-full">
                      Next Up
                    </span>
                  )}
                  <span className="px-3 py-1 bg-accent-500/10 text-accent-500 text-[10px] font-semibold uppercase tracking-wider rounded-full">
                    {event.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  {event.title}
                </h3>

                <p className="text-silver-400 text-base leading-relaxed mb-6">
                  {event.desc}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-silver-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.dateLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-accent-500 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy-900 text-navy-900 font-semibold text-sm uppercase tracking-wider hover:bg-navy-900 hover:text-white transition-colors duration-200"
              >
                Show More
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-navy-950 noise-bg py-24">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="heading-md text-white mb-6">
            Never miss an update.
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Stay connected with Aenon Church. Follow us on social media
            for the latest announcements, events, and encouragement.
          </p>
          <Link href="/contact" className="btn-white">
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
