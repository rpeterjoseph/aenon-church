'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Clock, Music, Users, Heart, Coffee, BookOpen } from 'lucide-react';

export default function WhatToExpectPage() {
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
          <p className="label-text text-white/40 mb-6">What to Expect</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Your first
            <br />
            visit.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            We know visiting a new church can feel unfamiliar.
            Here&apos;s what you can expect when you walk through our doors.
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="max-w-3xl mb-16">
            <p className="reveal label-text text-navy-900/40 mb-4">When You Arrive</p>
            <h2 className="reveal heading-md text-navy-900 mb-8">
              Come as you are.
            </h2>
            <p className="reveal reveal-delay-1 body-lg">
              There&apos;s no dress code and no pressure. Whether you come in
              a suit or jeans, you&apos;re welcome. Our friendly team will greet
              you at the door and help you feel at home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Service Times',
                desc: 'Sunday services run at 8 AM, 10 AM, and 7 PM. Each service is approximately 90 minutes. We also have midweek gatherings throughout the week.',
              },
              {
                icon: Music,
                title: 'Worship',
                desc: 'Our worship is vibrant and heartfelt. Expect a blend of contemporary and traditional songs — all focused on glorifying God and drawing us closer to Him.',
              },
              {
                icon: BookOpen,
                title: 'The Message',
                desc: 'Our pastors preach Bible-centered, practical messages that are relevant to everyday life. We believe the Word of God has the power to transform.',
              },
              {
                icon: Users,
                title: 'Community',
                desc: 'You\'ll find warm, genuine people here. After the service, stick around — grab a cup of chai and meet some of our church family.',
              },
              {
                icon: Heart,
                title: 'Kids & Youth',
                desc: 'We have dedicated programs for children and young adults. Your kids will be in safe hands while they learn about Jesus in an age-appropriate environment.',
              },
              {
                icon: Coffee,
                title: 'Fellowship',
                desc: 'After every service there\'s a time for fellowship. It\'s a great opportunity to connect, ask questions, and get to know people.',
              },
            ].map((item, i) => (
              <div key={item.title} className={`reveal reveal-delay-${Math.min(i, 3)} card-light !p-8`}>
                <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-accent-500" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-silver-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-3xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Common Questions</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            You might be wondering...
          </h2>

          <div className="space-y-0">
            {[
              { q: 'What should I wear?', a: 'Whatever you\'re comfortable in. There\'s no dress code — come as you are.' },
              { q: 'How long is the service?', a: 'Services typically last around 90 minutes, including worship and the message.' },
              { q: 'Is there parking?', a: 'Yes, there is parking available near the church. Our team can help direct you when you arrive.' },
              { q: 'Do I need to bring anything?', a: 'Just yourself! Bibles are available if you need one, though you\'re welcome to bring your own.' },
              { q: 'What about my children?', a: 'We have kids\' programs during the services. Our team will help check in your children when you arrive.' },
            ].map((item, i) => (
              <div key={i} className={`reveal py-6 border-b border-silver-200 last:border-0`}>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{item.q}</h3>
                <p className="text-silver-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Ready to visit?
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            We can&apos;t wait to meet you. Plan your visit today and
            let us know you&apos;re coming — we&apos;ll make sure you feel right at home.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Plan Your Visit
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
