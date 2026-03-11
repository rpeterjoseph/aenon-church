'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Heart, BookOpen, Users, Sparkles } from 'lucide-react';

export default function WomensMinistryPage() {
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
          <p className="label-text text-white/40 mb-6">Women&apos;s Ministry</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Rooted in
            <br />
            grace.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Empowering women to grow in faith, friendship,
            and spiritual depth.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto section-padding pt-16">
          <div className="reveal rounded-2xl overflow-hidden aspect-[21/9] bg-gradient-to-br from-navy-700 to-navy-900 border border-silver-200">
            <img src="/images/womens-ministry.jpg" alt="Women's Ministry gathering" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
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
                Women growing together
                in Christ.
              </h2>
              <p className="reveal reveal-delay-1 body-lg mb-6">
                Our Women&apos;s Ministry is a place where women of all ages and
                backgrounds can come together to be encouraged, strengthened, and
                equipped in their faith journey.
              </p>
              <p className="reveal reveal-delay-2 body-md">
                Through Bible studies, retreats, prayer groups, and community
                gatherings, we create a space where women can be vulnerable,
                supported, and empowered to live out their God-given purpose.
              </p>
            </div>
            <div className="reveal reveal-delay-1 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-navy-600 to-navy-800 border border-silver-200">
              <img src="/images/womens-fellowship.jpg" alt="Women's fellowship" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
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
              { icon: BookOpen, title: 'Bible Study', desc: 'In-depth study of Scripture that equips women to understand and apply God\'s Word in daily life.' },
              { icon: Heart, title: 'Prayer & Support', desc: 'A safe space to share, pray, and support one another through every season of life.' },
              { icon: Sparkles, title: 'Retreats', desc: 'Special gatherings and retreats for rest, renewal, and deeper connection with God and each other.' },
              { icon: Users, title: 'Community', desc: 'Regular fellowship events, meals, and gatherings that build authentic friendships and sisterhood.' },
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
          <h2 className="reveal heading-md text-navy-900 mb-4">Monthly gatherings</h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            We meet monthly for fellowship, study, and prayer.
            Every woman is welcome — come and be part of our community.
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
