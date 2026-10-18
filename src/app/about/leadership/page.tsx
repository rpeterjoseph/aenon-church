'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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

          <div className="max-w-2xl">
            <div className="reveal">
              <h3 className="text-2xl font-bold text-navy-900 mb-1">Pastor William Cary and Hepsibha William</h3>
              <p className="text-accent-500 text-sm font-medium uppercase tracking-wider mb-4">Founder &amp; Senior Pastor</p>
              <p className="text-silver-400 text-sm leading-relaxed">
                Pastor William Cary has led Aenon Church since its founding in 1989, with a heart for discipleship and a passion for seeing lives transformed by the Gospel. His wife, Hepsibha William, has served alongside him since their marriage in 1996 — together, their partnership in ministry has shepherded the church's growth for over three decades.
              </p>
            </div>
          </div>
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
