'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, Heart, ArrowRight } from 'lucide-react';

export default function Conference2026Content() {
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
      {/* Official event banner */}
      <section className="relative h-[42vh] sm:h-[55vh] md:h-[70vh] min-h-[280px] overflow-hidden bg-navy-950">
        <Image
          src="/images/conference-2026-hero.jpg"
          alt="Christ-Centered: Pastors & Leaders Conference 2026"
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
              Christ-Centered
              <br />
              Pastors &amp; Leaders Conference 2026
            </h1>
            <p className="reveal reveal-delay-1 body-lg">
              A gathering for pastors and ministry leaders devoted to
              Christ-centered leadership, renewal, and the work of the Gospel.
            </p>
          </div>

          {/* Event Details — open stat row, no card */}
          <div className="reveal reveal-delay-2 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-silver-200 border-y border-silver-200">
            <div className="py-8 sm:py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <Calendar className="w-6 h-6 text-accent-500 mb-4" />
              <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                Dates
              </p>
              <p className="text-navy-900 font-bold text-xl leading-snug">
                November 12&ndash;15, 2026
              </p>
            </div>
            <div className="py-8 sm:py-10 sm:px-8">
              <Clock className="w-6 h-6 text-accent-500 mb-4" />
              <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                Time
              </p>
              <p className="text-navy-900 font-bold text-xl leading-snug">
                9:00 AM &ndash; 2:00 PM
              </p>
            </div>
            <div className="py-8 sm:py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <MapPin className="w-6 h-6 text-accent-500 mb-4" />
              <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                Venue
              </p>
              <p className="text-navy-900 font-bold text-lg leading-snug">
                ANR Gardens, HMT Nagar,
                <br />
                Secunderabad, Telangana
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="section-gap bg-white">
        <div className="max-w-5xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Speakers</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Hear from voices devoted to Christ-centered ministry.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="reveal reveal-delay-1">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-950 mb-5">
                <Image
                  src="/images/pastor-hero.jpg"
                  alt="Pastor William Cary"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-1">Pastor William Cary</h3>
              <p className="text-silver-400 text-sm uppercase tracking-wider">
                Senior Pastor, Aenon Church
              </p>
            </div>

            <div className="reveal reveal-delay-2 aspect-[4/5] rounded-2xl border-2 border-dashed border-silver-200 flex flex-col items-center justify-center text-center p-8">
              <Users className="w-8 h-8 text-silver-300 mb-4" />
              <p className="text-navy-900 font-semibold mb-1">More Speakers</p>
              <p className="text-silver-400 text-sm">To be announced</p>
            </div>
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

      {/* CTA */}
      <section className="section-gap bg-navy-950 noise-bg">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-white mb-6">
            Partner with us.
          </h2>
          <p className="reveal reveal-delay-1 text-white/50 text-lg mb-10">
            Support this conference through your generosity, or reach out
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
