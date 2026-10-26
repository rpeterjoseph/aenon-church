'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, Heart, Globe2, BookOpen, ArrowRight } from 'lucide-react';
import RelatedEventCard from '@/components/RelatedEventCard';

export default function GraceFestivals2026Content() {
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
      {/* Official event banner — matches the poster's native 16:9 aspect so it's never cropped */}
      <section className="relative w-full max-w-[1800px] mx-auto aspect-video overflow-hidden bg-navy-950">
        <Image
          src="/images/grace-festivals-2026-hero.jpg"
          alt="Grace Festivals 2026"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Intro */}
      <section className="section-gap bg-white">
        <div className="max-w-5xl mx-auto section-padding">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="reveal label-text text-navy-900/40 mb-4">Aenon Church Presents</p>
            <h1 className="reveal heading-lg text-navy-900 mb-6">
              Grace Festivals 2026
            </h1>
            <p className="reveal reveal-delay-1 body-lg">
              A yearly program conducted by Aenon Church in partnership with
              Aenon Ministries and Trust &mdash; bringing together one big
              event for people from every background to come, hear the
              Gospel, and so much more.
            </p>
          </div>

          {/* Event Details — open stat row, no card */}
          <div className="reveal reveal-delay-2 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-silver-200 border-y border-silver-200">
            <div className="py-8 sm:py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <Calendar className="w-6 h-6 text-blue-600 mb-4" />
              <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                Dates
              </p>
              <p className="text-navy-900 font-bold text-xl leading-snug">
                November 12&ndash;15, 2026
              </p>
            </div>
            <div className="py-8 sm:py-10 sm:px-8">
              <Clock className="w-6 h-6 text-blue-600 mb-4" />
              <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                Time
              </p>
              <p className="text-navy-900 font-bold text-xl leading-snug">
                Starts at 6:00 PM
              </p>
            </div>
            <div className="py-8 sm:py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <MapPin className="w-6 h-6 text-blue-600 mb-4" />
              <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                Venue
              </p>
              <p className="text-navy-900 font-bold text-lg leading-snug">
                ANR Gardens, HMT Nagar,
                <br />
                Secunderabad, Telangana, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Presented By / Partnership */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-5xl mx-auto section-padding">
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            <div>
              <p className="label-text text-navy-900/40 mb-4">In Partnership</p>
              <h2 className="heading-md text-navy-900 mb-6">
                One big event,
                <br />
                every background welcome.
              </h2>
              <p className="body-lg">
                Grace Festivals is held each year by Aenon Church together
                with Aenon Ministries and Trust, uniting people from every
                walk of life for a season of worship, the Gospel, and
                genuine community.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="reveal reveal-delay-1 flex items-center gap-4 bg-white rounded-xl p-5 border border-silver-200">
                <div className="w-11 h-11 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">Every Background</p>
                  <p className="text-silver-400 text-xs">All are welcome, wherever you&apos;re from</p>
                </div>
              </div>
              <div className="reveal reveal-delay-2 flex items-center gap-4 bg-white rounded-xl p-5 border border-silver-200">
                <div className="w-11 h-11 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">The Gospel, Shared Simply</p>
                  <p className="text-silver-400 text-xs">A clear opportunity to hear the good news</p>
                </div>
              </div>
              <div className="reveal reveal-delay-3 flex items-center gap-4 bg-white rounded-xl p-5 border border-silver-200">
                <div className="w-11 h-11 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">Aenon Church &amp; Aenon Ministries and Trust</p>
                  <p className="text-silver-400 text-xs">Presented together, one yearly festival</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights from 2025 */}
      <section className="section-gap bg-white">
        <div className="max-w-5xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Highlights</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Highlights from previous years&apos; festivals.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { src: '/images/grace-festivals-2025-crowd.jpg', alt: 'The congregation celebrating together at a past Grace Festivals' },
              { src: '/images/grace-festivals-2025-worship.jpg', alt: 'The congregation in worship with hands raised at a past Grace Festivals' },
              { src: '/images/conference-2025-worship.jpg', alt: 'Worship team leading the congregation in song' },
              { src: '/images/conference-2025-audience.jpg', alt: 'The congregation gathered together' },
              { src: '/images/conference-2025-moment.jpg', alt: 'A worship leader addressing a standing congregation' },
            ].map((img, i) => (
              <div
                key={img.src}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy-950`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Map */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-5xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Venue</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            ANR Gardens, HMT Nagar.
          </h2>
          <div className="reveal reveal-delay-1 rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
            <iframe
              src="https://www.google.com/maps?q=ANR+Gardens,+HMT+Nagar,+Secunderabad,+Telangana&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="ANR Gardens, HMT Nagar, Secunderabad"
            />
          </div>
        </div>
      </section>

      {/* Related Event */}
      <section className="section-gap bg-white">
        <div className="max-w-5xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Also This November</p>
          <h2 className="reveal heading-md text-navy-900 mb-10">
            More from Aenon Church.
          </h2>
          <div className="reveal reveal-delay-1">
            <RelatedEventCard
              href="/conference2026"
              eyebrow="Conference 2026"
              title="Christ-Centered Pastors & Leaders Conference"
              meta="November 12–14, 2026"
              variant="orange"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-navy-950 noise-bg">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-white mb-6">
            Come, and bring someone.
          </h2>
          <p className="reveal reveal-delay-1 text-white/50 text-lg mb-10">
            Support Grace Festivals through your generosity, or reach out
            with any questions.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/give" className="btn-white">
              Give Online
              <Heart className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white text-sm font-medium uppercase tracking-[0.15em] rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
