'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Globe, Heart, Target, Eye } from 'lucide-react';

export default function VisionMissionPage() {
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
          <p className="label-text text-white/40 mb-6">Vision & Mission</p>
          <h1 className="heading-xl text-white max-w-3xl">
            What drives
            <br />
            everything we do.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Every ministry, every gathering, every act of service flows
            from a God-given vision and a clear mission.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="reveal w-16 h-16 rounded-full bg-accent-500/10 flex items-center justify-center mb-8">
                <Eye className="w-7 h-7 text-accent-500" />
              </div>
              <p className="reveal label-text text-navy-900/40 mb-4">Our Vision</p>
              <h2 className="reveal heading-md text-navy-900 mb-8">
                To see lives transformed
                by the Gospel.
              </h2>
              <p className="reveal reveal-delay-1 body-lg mb-6">
                We envision a Christ-centered community that transforms lives,
                families, and neighborhoods through the power of the Gospel —
                reaching Hyderabad and beyond with the love of Jesus.
              </p>
              <p className="reveal reveal-delay-2 body-md">
                We dream of a church where every person who walks through
                our doors encounters the living God, finds authentic community,
                and is equipped to live out their God-given purpose.
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="bg-navy-950 noise-bg rounded-2xl p-10 md:p-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -translate-y-1/3 translate-x-1/3" />
                <Globe className="w-10 h-10 text-accent-500/40 mb-8 relative z-10" />
                <blockquote className="text-xl md:text-2xl text-white/80 leading-relaxed italic relative z-10">
                  &ldquo;Go therefore and make disciples of all nations, baptizing them
                  in the name of the Father and of the Son and of the Holy Spirit.&rdquo;
                </blockquote>
                <p className="text-white/30 text-sm mt-6 uppercase tracking-wider font-medium relative z-10">Matthew 28:19</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center mb-16">
            <div className="reveal w-16 h-16 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-8">
              <Target className="w-7 h-7 text-accent-500" />
            </div>
            <p className="reveal label-text text-navy-900/40 mb-4">Our Mission</p>
            <h2 className="reveal heading-md text-navy-900 max-w-2xl mx-auto">
              To glorify God by making disciples.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Worship', desc: 'We gather to worship God passionately in spirit and in truth, giving Him the praise and honor He deserves.', icon: Heart },
              { title: 'Grow', desc: 'We grow deeply in the Word of God through teaching, study, and personal devotion — being transformed daily.', icon: Globe },
              { title: 'Connect', desc: 'We connect authentically in community, building relationships that encourage, challenge, and support.', icon: Heart },
              { title: 'Serve', desc: 'We serve selflessly in the world around us, reflecting the love of Christ through our actions and generosity.', icon: Target },
            ].map((item, i) => (
              <div key={item.title} className={`reveal reveal-delay-${i} card-light !p-8`}>
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
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Be part of the mission.
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Whether it&apos;s your first Sunday or you&apos;ve been here for years,
            there&apos;s a place for you to serve, grow, and make an impact.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get Involved
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
