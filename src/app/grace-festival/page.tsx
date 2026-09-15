'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Mic, Phone, UtensilsCrossed, ArrowRight } from 'lucide-react';

export default function GraceFestivalPage() {
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
          <p className="label-text text-white/40 mb-6">Save the Date</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Grace Festival
            <br />
            2026.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Four nights of worship, the Word, and community — all are welcome.
          </p>
        </div>
      </section>

      {/* Poster + Key Facts */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Poster */}
            <div className="reveal">
              <div className="relative rounded-2xl overflow-hidden aspect-[1035/1600] shadow-2xl border border-silver-200 max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/grace-festival-2026.jpg"
                  alt="Grace Festival 2026 poster"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Key Facts */}
            <div className="reveal reveal-delay-1 space-y-6">
              {[
                {
                  icon: Calendar,
                  title: 'November 12–15, 2026',
                  desc: 'Thursday through Sunday',
                },
                {
                  icon: Clock,
                  title: '6:00 PM, every evening',
                  desc: 'All four nights of the festival',
                },
                {
                  icon: MapPin,
                  title: 'A.N.R. Gardens',
                  desc: 'Near H.M.T. Nagar, next to Ramakrishna Cine Studio, Nacharam, Hyderabad',
                },
                {
                  icon: Mic,
                  title: 'Rev. R. William Cary',
                  desc: 'Aenon Ministries Senior Pastor & Founder, along with other anointed guest speakers',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-silver-100">
                  <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">{item.title}</h3>
                    <p className="text-silver-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4 p-5 rounded-xl bg-silver-100">
                <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                  <UtensilsCrossed className="w-5 h-5 text-accent-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Meals provided</h3>
                  <p className="text-silver-400 text-sm">Meal arrangements are available for all attendees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pastors & Leaders Conference */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-4xl mx-auto section-padding text-center">
          <p className="reveal label-text text-navy-900/40 mb-4">Also This Week</p>
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Pastors &amp; Leaders Conference
          </h2>
          <p className="reveal reveal-delay-1 body-lg max-w-xl mx-auto mb-6">
            Held alongside Grace Festival for pastors and church leaders,
            starting at 9:30 AM at the same venue.
          </p>
          <div className="reveal reveal-delay-2 inline-flex items-center gap-2 text-navy-900 font-medium">
            <Clock className="w-4 h-4 text-accent-500" />
            9:30 AM &middot; A.N.R. Gardens, Nacharam
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 noise-bg" />
        <div className="relative z-10 max-w-3xl mx-auto text-center section-padding">
          <p className="reveal label-text text-white/40 mb-6">All Are Welcome</p>
          <h2 className="reveal heading-md text-white mb-8">
            We&apos;d love to see you there.
          </h2>
          <p className="reveal reveal-delay-1 text-white/50 text-lg mb-10">
            Bring your family and friends — join us for a special season of
            worship, the Word, and community.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-6">
            <a href="tel:+919849613247" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-accent-400" />
              98496 13247
            </a>
            <a href="tel:+918790671315" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-accent-400" />
              87906 71315
            </a>
          </div>
          <div className="reveal reveal-delay-3 mt-10">
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
