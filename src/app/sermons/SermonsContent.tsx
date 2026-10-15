'use client';

import { useEffect, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { SermonSummary } from '@/lib/youtube';
import SermonCarousel from './SermonCarousel';

// Used only if YOUTUBE_API_KEY isn't set or the API call fails — keeps the
// carousel populated instead of showing nothing.
const FALLBACK_SERMONS: SermonSummary[] = [
  { videoId: '_agFfQPeRD8', title: "Dimensions of God's Love", dateLabel: 'Sep 1, 2026' },
  { videoId: 'eEICprqD-RA', title: 'Rest in God', dateLabel: 'Aug 21, 2026' },
  { videoId: 'mBmmbpz1Wis', title: 'Comfort in Chaos', dateLabel: 'Mar 19, 2026' },
  { videoId: 'X594juRoIDc', title: 'Jesus is Enough', dateLabel: 'Jan 5, 2026' },
  { videoId: 'I-UMeoJX8kQ', title: "Christ's Blood and Abel's Blood", dateLabel: 'Aug 30, 2025' },
  { videoId: 'aKNKoDgZjNw', title: 'Gospel changes Greedy to Generous', dateLabel: 'Feb 5, 2025' },
];

export default function SermonsContent({
  latestSermonEmbed,
  recentSermons,
}: {
  latestSermonEmbed: ReactNode;
  recentSermons: SermonSummary[] | null;
}) {
  const sermonsToShow = recentSermons && recentSermons.length > 0 ? recentSermons : FALLBACK_SERMONS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-navy-950 noise-bg">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="label-text text-white/40 mb-6">Sermons</p>
          <h1 className="heading-xl text-white max-w-3xl">
            The Word,
            <br />
            proclaimed.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Watch our latest messages and sermon series. Let the Word of God
            transform your life.
          </p>
        </div>
      </section>

      {/* Featured / Latest Sermon */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Latest Message</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Watch the latest sermon.
          </h2>

          <div className="reveal">{latestSermonEmbed}</div>
        </div>
      </section>

      {/* Recent Sermons */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Recent Sermons</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Catch up on what you missed.
          </h2>

          <div className="reveal">
            <SermonCarousel sermons={sermonsToShow} />
          </div>

          {/* YouTube CTA */}
          <div className="reveal mt-16 text-center">
            <a
              href="https://www.youtube.com/aenonchurch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View All on YouTube
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
