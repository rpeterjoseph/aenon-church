'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function LeadershipPage() {
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
      <section className="relative pt-40 pb-24 bg-navy-950 noise-bg overflow-hidden">
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <Link href="/about" className="inline-flex items-center gap-2 text-white/40 text-sm font-medium uppercase tracking-[0.15em] hover:text-white/60 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            About Us
          </Link>
          <p className="label-text text-white/40 mb-6">Leadership</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Meet our
            <br />
            team.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            The leaders God has placed to shepherd, teach, and serve
            the Aenon Church family.
          </p>
        </div>
      </section>

      {/* Senior Leadership */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Senior Leadership</p>
          <h2 className="reveal heading-md text-navy-900 mb-16">
            Shepherds of the flock.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="reveal relative aspect-[4/5] rounded-2xl overflow-hidden border border-silver-200">
              <Image
                src="/images/history/history-1996.jpg"
                alt="Pastor William Cary and Hepsibha William"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="reveal reveal-delay-1">
              <h3 className="text-2xl font-bold text-navy-900 mb-1">Pastor William Cary</h3>
              <p className="text-accent-500 text-sm font-medium uppercase tracking-wider mb-4">Founder &amp; Senior Pastor</p>
              <p className="text-silver-400 text-sm leading-relaxed mb-6">
                Pastor William Cary has led Aenon Church since its founding in 1989, with a heart for discipleship and a passion for seeing lives transformed by the Gospel.
              </p>
              <h3 className="text-xl font-bold text-navy-900 mb-1">Hepsibha William</h3>
              <p className="text-accent-500 text-sm font-medium uppercase tracking-wider mb-4">Serving Alongside Pastor William</p>
              <p className="text-silver-400 text-sm leading-relaxed">
                Hepsibha William has served alongside her husband since their marriage in 1996. Together, their partnership in ministry has shepherded the church's growth for over three decades.
              </p>
            </div>
          </div>

          {/* Ministry Leaders */}
          <p className="reveal label-text text-navy-900/40 mb-4">Ministry Leaders</p>
          <h2 className="reveal heading-sm text-navy-900 mb-12">
            Serving with purpose.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Leader Name', role: 'Worship Director', initials: 'WD' },
              { name: 'Leader Name', role: 'Youth Ministry', initials: 'YM' },
              { name: 'Leader Name', role: 'Children\'s Ministry', initials: 'CM' },
              { name: 'Leader Name', role: 'Women\'s Ministry', initials: 'WM' },
              { name: 'Leader Name', role: 'Men\'s Ministry', initials: 'MM' },
              { name: 'Leader Name', role: 'Outreach & Missions', initials: 'OM' },
            ].map((leader, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i, 3)} text-center card-light !p-8`}>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 mx-auto mb-5 border border-white/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-white/25 font-nav">{leader.initials}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-1">{leader.name}</h3>
                <p className="text-silver-400 text-xs uppercase tracking-wider">{leader.role}</p>
              </div>
            ))}
          </div>

          <p className="reveal text-center text-silver-400 text-sm mt-12">
            Leadership photos and details are being updated.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Want to connect with a leader?
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Our pastoral team is here for you — whether you need prayer,
            guidance, or just someone to talk to.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-outline">
              Back to About
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
