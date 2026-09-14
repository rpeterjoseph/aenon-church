'use client';

import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import LatestSermonEmbed from '@/components/LatestSermonEmbed';

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

      {/* More Sermons */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <p className="reveal label-text text-navy-900/40 mb-4">More Sermons</p>
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Catch up on what you missed.
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Browse our full library of past messages and sermon series
            on our YouTube channel.
          </p>
          <div className="reveal reveal-delay-2">
            <a
              href="https://www.youtube.com/aenonchurch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View All Sermons on YouTube
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
