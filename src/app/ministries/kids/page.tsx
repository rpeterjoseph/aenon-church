'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, BookOpen, Heart, Shield, Star } from 'lucide-react';

export default function KidsMinistryPage() {
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
          <p className="label-text text-white/40 mb-6">Children&apos;s Ministry</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Growing little
            <br />
            hearts.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            A safe, fun, and engaging environment where kids learn
            about the love of Jesus.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto section-padding pt-16">
          <div className="reveal rounded-2xl overflow-hidden aspect-[21/9] bg-gradient-to-br from-navy-700 to-navy-950 border border-silver-200">
            <img src="/images/kids-ministry.jpg" alt="Children's Ministry" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
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
                Building strong
                foundations of faith.
              </h2>
              <p className="reveal reveal-delay-1 body-lg mb-6">
                We believe that children are a gift from God and that the early
                years are crucial for building a foundation of faith. Our
                Children&apos;s Ministry is designed to teach kids about Jesus in
                a way that is fun, engaging, and age-appropriate.
              </p>
              <p className="reveal reveal-delay-2 body-md">
                We partner with parents to nurture the spiritual growth of the
                next generation. Your children will be in safe, caring hands while
                they learn Bible stories, worship, and build friendships.
              </p>
            </div>
            <div className="reveal reveal-delay-1 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-navy-700 to-navy-950 border border-silver-200">
              <img src="/images/kids-fellowship.jpg" alt="Kids learning" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">What We Offer</p>
          <h2 className="reveal heading-sm text-navy-900 mb-12">
            A place for your kids to thrive.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'Bible Teaching', desc: 'Age-appropriate lessons that bring the Bible to life through stories, songs, and interactive activities.' },
              { icon: Shield, title: 'Safe Environment', desc: 'Trained and screened volunteers who ensure your child is safe, cared for, and loved at all times.' },
              { icon: Star, title: 'Fun Activities', desc: 'Games, crafts, music, and creative activities that make learning about Jesus exciting and memorable.' },
              { icon: Heart, title: 'Caring Leaders', desc: 'Dedicated teachers who love children and are passionate about helping them grow in their faith.' },
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
          <h2 className="reveal heading-md text-navy-900 mb-4">Every Sunday</h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Kids&apos; programs run during all Sunday services. Our team will
            help you check in your children when you arrive.
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
