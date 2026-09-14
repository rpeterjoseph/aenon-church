'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Play, ArrowUpRight } from 'lucide-react';
import LatestSermonEmbed from '@/components/LatestSermonEmbed';

const recentSermons = [
  { id: '_agFfQPeRD8', title: 'Title coming soon' },
  { id: 'mBmmbpz1Wis', title: 'Title coming soon' },
  { id: 'eEICprqD-RA', title: 'Title coming soon' },
  { id: 'X594juRoIDc', title: 'Title coming soon' },
  { id: 'I-UMeoJX8kQ', title: 'Title coming soon' },
  { id: 'aKNKoDgZjNw', title: 'Title coming soon' },
];

export default function SermonsPage() {
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

          <div className="reveal">
            <LatestSermonEmbed className="max-w-4xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Recent Sermons */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Recent Sermons</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Catch up on what you missed.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentSermons.map((sermon, i) => (
              <a
                key={sermon.id}
                href={`https://youtu.be/${sermon.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal reveal-delay-${i % 3} card-light group block hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="relative aspect-video rounded-xl mb-5 overflow-hidden bg-navy-950">
                  <Image
                    src={`https://img.youtube.com/vi/${sermon.id}/hqdefault.jpg`}
                    alt={sermon.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-1 group-hover:text-navy-600 transition-colors">
                  {sermon.title}
                </h3>
                <p className="text-sm text-silver-400">Ps. William Cary</p>
              </a>
            ))}
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
