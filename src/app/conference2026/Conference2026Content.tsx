'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  CalendarPlus,
  Clock,
  MapPin,
  Users,
  Heart,
  ArrowRight,
  Music,
  Mic,
  BookOpen,
  Coffee,
  Users2,
  Utensils,
  ChevronDown,
} from 'lucide-react';
import RelatedEventCard from '@/components/RelatedEventCard';

const SCHEDULE_ITEMS = [
  { icon: Music, label: 'Praise & Worship' },
  { icon: Mic, label: 'Keynote Session' },
  { icon: BookOpen, label: 'Session 1' },
  { icon: Coffee, label: 'Tea Break', note: '20 minutes' },
  { icon: Users2, label: 'Session 2', note: 'Regular or breakout discussion' },
  { icon: Utensils, label: 'Lunch' },
];

const FAQ_ITEMS = [
  {
    question: 'Is there a registration fee?',
    answer:
      "Registration is free. A voluntary contribution is encouraged, but money should never be the reason a pastor or leader doesn't attend.",
  },
  {
    question: 'Is lunch provided?',
    answer: 'Yes, lunch is provided each day of the conference.',
  },
  {
    question: 'What language will the conference be in?',
    answer: 'The conference will be conducted in both Telugu and English.',
  },
  {
    question: "Can our church's team leaders attend, not just pastors?",
    answer:
      "Yes. While this conference is especially for pastors and leaders, it's encouraging for believers as well, and church team leaders are welcome to attend.",
  },
  {
    question: 'Is accommodation provided?',
    answer:
      "No accommodation is provided. Travel and lodging are the registrant's own responsibility.",
  },
];

export default function Conference2026Content() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                November 12&ndash;14, 2026
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

          <div className="reveal reveal-delay-3 flex justify-center mt-10">
            <a href="/conference-2026.ics" download className="btn-outline">
              Add to Calendar
              <CalendarPlus className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-5xl mx-auto section-padding text-center">
          <p className="reveal label-text text-navy-900/40 mb-4">Who Should Attend</p>
          <h2 className="reveal heading-md text-navy-900 mb-8 max-w-2xl mx-auto">
            For pastors, leaders, and everyone who serves alongside them.
          </h2>
          <p className="reveal reveal-delay-1 body-lg max-w-2xl mx-auto mb-8">
            Pastors of local churches and leaders in the church are encouraged to
            attend. Worship and youth leaders, and ministry staff, are also
            encouraged to attend.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-3">
            {['Pastors', 'Church Leaders', 'Worship & Youth Leaders', 'Ministry Staff'].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-5 py-2 rounded-full border border-silver-200 bg-white text-navy-900 text-sm font-medium"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Theme */}
      <section className="section-gap bg-white">
        <div className="max-w-5xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">This Year&apos;s Theme</p>
          <h2 className="reveal heading-md text-navy-900 mb-8 max-w-2xl">
            Christ-centered.
          </h2>
          <p className="reveal reveal-delay-1 body-lg max-w-2xl mb-12">
            At Aenon Church, there are three core values we live by as a
            church: Christ-centered, Gospel-focused, and Bible-based. This
            year&apos;s conference theme explores the first &mdash; the
            centrality of Jesus Christ in our identity, beliefs, and actions
            as believers &mdash; and that&apos;s what we&apos;ll be focusing
            on across these three days.
          </p>

          <div className="reveal reveal-delay-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border-2 border-accent-500 bg-accent-500/5 p-6">
              <span className="inline-block px-3 py-1 bg-accent-500 text-white text-[10px] font-medium rounded-full uppercase tracking-wider mb-4">
                2026 Focus
              </span>
              <h3 className="text-navy-900 font-bold text-lg">Christ-Centered</h3>
            </div>
            <div className="rounded-2xl border border-silver-200 p-6 opacity-50">
              <h3 className="text-navy-900 font-bold text-lg">Gospel-Focused</h3>
            </div>
            <div className="rounded-2xl border border-silver-200 p-6 opacity-50">
              <h3 className="text-navy-900 font-bold text-lg">Bible-Based</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-5xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Daily Schedule</p>
          <h2 className="reveal heading-md text-navy-900 mb-4">
            9:00 AM &ndash; 2:00 PM, all three days.
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-12">
            The same schedule runs each day, November 12&ndash;14.
          </p>

          <div className="reveal reveal-delay-2 relative max-w-md">
            <div className="absolute left-[21px] top-0 bottom-0 w-px bg-silver-200" />
            <div className="space-y-2">
              {SCHEDULE_ITEMS.map((item) => (
                <div key={item.label} className="relative flex items-start gap-5 py-3">
                  <div className="relative z-10 w-11 h-11 rounded-full bg-accent-500/10 border-4 border-silver-100 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent-500" />
                  </div>
                  <div className="pt-2.5">
                    <p className="font-semibold text-navy-900">{item.label}</p>
                    {item.note && <p className="text-silver-400 text-sm mt-0.5">{item.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights from 2025 */}
      <section className="section-gap bg-white">
        <div className="max-w-5xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Highlights</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Highlights from previous years&apos; conferences.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { src: '/images/conference-2025-worship.jpg', alt: 'Worship team leading the congregation in song at the 2025 conference' },
              { src: '/images/conference-2025-audience.jpg', alt: 'Pastors and leaders seated together at the 2025 conference' },
              { src: '/images/conference-2025-moment.jpg', alt: 'A worship leader addressing a standing congregation at the 2025 conference' },
              { src: '/images/grace-festivals-2025-crowd.jpg', alt: 'The congregation celebrating together at a past Grace Festivals' },
              { src: '/images/grace-festivals-2025-worship.jpg', alt: 'The congregation in worship with hands raised at a past Grace Festivals' },
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

      {/* Speakers */}
      <section className="section-gap bg-silver-100">
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

      {/* FAQ */}
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">FAQ</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Common questions.
          </h2>

          <div className="reveal reveal-delay-1 divide-y divide-silver-200 border-y border-silver-200">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="font-semibold text-navy-900">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-navy-900/40 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-silver-400 leading-relaxed pb-6 -mt-2">{item.answer}</p>
                  )}
                </div>
              );
            })}
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
              href="/gracefestivals2026"
              eyebrow="Aenon Events 2026"
              title="Grace Festivals"
              meta="November 12–15, 2026 · Starts at 6:00 PM"
              variant="blue"
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
