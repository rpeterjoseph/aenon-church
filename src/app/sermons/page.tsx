'use client';

import { useEffect } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

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
            <div className="youtube-container shadow-2xl max-w-4xl mx-auto">
              <iframe
                src="https://www.youtube.com/embed?listType=user_uploads&list=aenonchurch"
                title="Latest Sermon - Aenon Church"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Grid */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Recent Sermons</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Catch up on what you missed.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Walking in Faith', speaker: 'Senior Pastor', date: 'Mar 2, 2026' },
              { title: 'The Power of Prayer', speaker: 'Senior Pastor', date: 'Feb 23, 2026' },
              { title: 'Grace That Transforms', speaker: 'Associate Pastor', date: 'Feb 16, 2026' },
              { title: 'Living in the Spirit', speaker: 'Senior Pastor', date: 'Feb 9, 2026' },
              { title: 'Unshakeable Hope', speaker: 'Guest Speaker', date: 'Feb 2, 2026' },
              { title: 'The Heart of Worship', speaker: 'Senior Pastor', date: 'Jan 26, 2026' },
            ].map((sermon, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i % 3} card-light group cursor-pointer hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="relative aspect-video bg-accent-500/5 rounded-xl mb-5 flex items-center justify-center group-hover:bg-accent-500/10 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <p className="text-xs text-silver-400 mb-2">{sermon.date}</p>
                <h3 className="text-lg font-bold text-navy-900 mb-1 group-hover:text-navy-600 transition-colors">
                  {sermon.title}
                </h3>
                <p className="text-sm text-silver-400">{sermon.speaker}</p>
              </div>
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
