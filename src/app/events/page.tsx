'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const events = [
  {
    title: 'Easter Sunday Celebration',
    date: 'April 5, 2026',
    time: '8:00 AM, 11:00 AM & 7:00 PM',
    location: 'Aenon Church, Tarnaka',
    desc: 'Celebrate the resurrection of our Lord Jesus Christ with special worship services, a powerful message of hope, and fellowship with the church family.',
    tag: 'Special Service',
  },
  {
    title: 'Good Friday Service',
    date: 'April 3, 2026',
    time: '6:00 PM',
    location: 'Aenon Church, Tarnaka',
    desc: 'A solemn evening of reflection, worship, and communion as we remember the sacrifice of Jesus on the cross.',
    tag: 'Special Service',
  },
  {
    title: 'Youth Weekend Retreat',
    date: 'March 28-29, 2026',
    time: 'All Day',
    location: 'TBA',
    desc: 'A weekend getaway for young adults — packed with worship, teaching, games, and community-building. Registration open now.',
    tag: 'Youth',
  },
  {
    title: 'Wednesday Bible Study Series',
    date: 'Every Wednesday',
    time: '7:00 PM',
    location: 'Aenon Church, Tarnaka',
    desc: 'Dive deeper into God\'s Word with our ongoing Wednesday evening Bible study. Currently studying the Book of Acts.',
    tag: 'Weekly',
  },
  {
    title: 'Volunteer Orientation',
    date: 'March 15, 2026',
    time: '10:00 AM',
    location: 'Aenon Church, Tarnaka',
    desc: 'Interested in serving? Join our volunteer orientation to learn about ministry teams and find your place to serve.',
    tag: 'Open',
  },
];

export default function EventsPage() {
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
            {events.map((event, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i % 3} py-10 border-b border-silver-200 last:border-0`}
              >
                <div className="flex items-start justify-between gap-6 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-navy-900/5 text-navy-900/70 text-[10px] font-semibold uppercase tracking-wider rounded-full">
                      {event.tag}
                    </span>
                  </div>
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
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-navy-950 noise-bg py-24">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-white mb-6">
            Never miss an update.
          </h2>
          <p className="reveal reveal-delay-1 text-white/50 text-lg mb-10">
            Stay connected with Aenon Church. Follow us on social media
            for the latest announcements, events, and encouragement.
          </p>
          <div className="reveal reveal-delay-2">
            <Link href="/contact" className="btn-white">
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
