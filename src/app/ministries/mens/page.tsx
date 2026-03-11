'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Users, BookOpen, Shield, Handshake } from 'lucide-react';

export default function MensMinistryPage() {
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
          <Link href="/ministries" className="inline-flex items-center gap-2 text-white/40 text-sm font-medium uppercase tracking-[0.15em] hover:text-white/60 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Ministries
          </Link>
          <p className="label-text text-white/40 mb-6">Men&apos;s Ministry</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Iron sharpens
            <br />
            iron.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Building men of faith through accountability, discipleship,
            and brotherhood.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto section-padding pt-16">
          <div className="reveal rounded-2xl overflow-hidden aspect-[21/9] bg-gradient-to-br from-navy-800 to-navy-950 border border-silver-200">
            <img src="/images/mens-ministry.jpg" alt="Men's Ministry gathering" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="reveal label-text text-navy-900/40 mb-4">About This Ministry</p>
              <h2 className="reveal heading-md text-navy-900 mb-8">
                Men leading with
                purpose and integrity.
              </h2>
              <p className="reveal reveal-delay-1 body-lg mb-6">
                Our Men&apos;s Ministry exists to equip men to lead with integrity in
                their families, workplaces, and communities. We believe that strong
                men of faith are the backbone of a strong church and a strong society.
              </p>
              <p className="reveal reveal-delay-2 body-md">
                Through regular Bible study, prayer, fellowship meals, and
                accountability groups, we help men grow deeper in their walk with
                Christ and step into the calling God has placed on their lives.
              </p>
            </div>
            <div className="reveal reveal-delay-1 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-navy-700 to-navy-900 border border-silver-200">
              <img src="/images/mens-fellowship.jpg" alt="Men's fellowship" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">What We Do</p>
          <h2 className="reveal heading-sm text-navy-900 mb-12">
            How we grow together.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'Bible Study', desc: 'Weekly study of God\'s Word, diving deep into Scripture and applying it to everyday life.' },
              { icon: Shield, title: 'Accountability', desc: 'Small groups where men encourage one another and hold each other accountable in faith.' },
              { icon: Handshake, title: 'Fellowship', desc: 'Regular gatherings, meals, and events that build authentic brotherhood and lasting friendships.' },
              { icon: Users, title: 'Service', desc: 'Opportunities to serve the church and community together, putting our faith into action.' },
            ].map((item, i) => (
              <div key={item.title} className={`reveal reveal-delay-${Math.min(i, 3)} card-light !p-8`}>
                <item.icon className="w-8 h-8 text-accent-500 mb-6" />
                <h3 className="text-lg font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-silver-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule + CTA */}
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <p className="reveal label-text text-navy-900/40 mb-4">Schedule</p>
          <h2 className="reveal heading-md text-navy-900 mb-4">Monthly gatherings</h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            We meet monthly for fellowship, prayer, and study.
            All men are welcome — whether you&apos;ve been walking with Christ
            for decades or are just beginning.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get Connected
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ministries" className="btn-outline">
              All Ministries
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
