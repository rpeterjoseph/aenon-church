'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Flame, Music, Users, Gamepad2 } from 'lucide-react';

export default function YouthMinistryPage() {
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
          <p className="label-text text-white/40 mb-6">Aenon Youth</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Bold faith,
            <br />
            starting young.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Helping teens grow in faith, build lasting friendships, and
            live boldly for Christ.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto section-padding pt-16">
          <div className="reveal rounded-2xl overflow-hidden aspect-[21/9] bg-gradient-to-br from-navy-900 to-navy-950 border border-silver-200">
            <img src="/images/youth-ministry.jpg" alt="Aenon Youth gathering" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
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
                A place for teens
                to belong.
              </h2>
              <p className="reveal reveal-delay-1 body-lg mb-6">
                Aenon Youth is for middle and high schoolers who want a fun,
                honest place to figure out what it means to follow Jesus —
                surrounded by friends who get it.
              </p>
              <p className="reveal reveal-delay-2 body-md">
                Through games, worship, small groups, and real conversations,
                we help students build a genuine faith of their own — one that
                holds up at school, at home, and everywhere in between.
              </p>
            </div>
            <div className="reveal reveal-delay-1 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-navy-900 to-navy-950 border border-silver-200">
              <img src="/images/youth-fellowship.jpg" alt="Aenon Youth fellowship" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
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
              { icon: Music, title: 'Worship', desc: 'High-energy worship nights where students encounter God together in an authentic, welcoming space.' },
              { icon: Gamepad2, title: 'Games & Hangouts', desc: 'Game nights, outings, and events that make Aenon Youth a place teens genuinely want to be.' },
              { icon: Flame, title: 'Small Groups', desc: 'Age and gender-grouped discipleship groups where students dig into Scripture and real-life questions.' },
              { icon: Users, title: 'Mentorship', desc: 'Caring leaders who invest in students one-on-one, walking alongside them through the teenage years.' },
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

      {/* CTA */}
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <p className="reveal label-text text-navy-900/40 mb-4">Schedule</p>
          <h2 className="reveal heading-md text-navy-900 mb-4">Saturdays at 7:00 PM</h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Join us every Saturday evening for worship, the Word, and community.
            Bring a friend — everyone is welcome.
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
