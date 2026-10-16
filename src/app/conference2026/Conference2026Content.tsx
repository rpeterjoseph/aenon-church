'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

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

      {/* Intro + Event Details */}
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

          <div className="reveal reveal-delay-2 bg-silver-100 rounded-2xl p-8 md:p-14">
            <p className="text-xs uppercase tracking-[0.2em] text-navy-900/40 font-medium mb-10">
              Event Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              <div>
                <Calendar className="w-6 h-6 text-accent-500 mb-4" />
                <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                  Dates
                </p>
                <p className="text-navy-900 font-bold text-xl leading-snug">
                  November 12&ndash;15, 2026
                </p>
              </div>
              <div>
                <Clock className="w-6 h-6 text-accent-500 mb-4" />
                <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                  Time
                </p>
                <p className="text-navy-900 font-bold text-xl leading-snug">
                  9:00 AM &ndash; 2:00 PM
                </p>
              </div>
              <div>
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
              <div>
                <Users className="w-6 h-6 text-accent-500 mb-4" />
                <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3">
                  Speakers
                </p>
                <p className="text-navy-900 font-bold text-lg leading-snug">
                  Pastor William Cary
                  <br />
                  &amp; other speakers
                </p>
              </div>
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
            Questions about the conference?
          </h2>
          <p className="reveal reveal-delay-1 text-white/50 text-lg mb-10">
            Reach out to our team and we&apos;ll be glad to help.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
